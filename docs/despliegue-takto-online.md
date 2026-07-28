# Despliegue de takto.online

> **Estado: NO EJECUTADO.** Ningún paso de este documento se ha aplicado.
> Requiere autorización explícita.

## Principio

La web es un proyecto, repositorio, imagen y contenedor **independientes**.
Caddy solo la enruta. No se comparte código, dependencias, variables, volúmenes
ni base de datos con el CRM.

**Nunca**: `docker compose down -v`, `docker system prune`, `git reset --hard`,
`git clean`, force push, reinicio del VPS, cambios en el CRM o en PostgreSQL.

## Arquitectura resuelta

Caddy corre **dentro de un contenedor** del stack del CRM y es dueño de 80/443.
Se comprobó en el servidor que **no alcanza el loopback del host**, así que
`reverse_proxy 127.0.0.1:3100` no funcionaría.

La web se une a la red de borde `tehus-crm-staging_proxy` —donde ya están
`caddy`, `frontend` y `backend`— declarada como **externa**: este compose nunca
la crea ni la borra. Caddy la resuelve como `takto-web:3000`.

**No** se une a `tehus-crm-staging_internal`, la única red donde vive PostgreSQL.

| Red | Contenedores | ¿Se une takto-web? |
| --- | --- | --- |
| `tehus-crm-staging_proxy` (172.19.0.0/16) | caddy, frontend, backend | **Sí** |
| `tehus-crm-staging_internal` (172.18.0.0/16) | backend, **postgres** | **No** |

El puerto `127.0.0.1:3100` se publica solo para el smoke test desde el host.
Verificado libre; sin colisión con CRM, API, PostgreSQL, pgAdmin ni Caddy.

---

## Procedimiento (idempotente)

Cada paso puede repetirse sin efectos acumulativos.

### 1 · Backup si el directorio ya existe

```bash
if [ -d /opt/takto-web ]; then
  sudo tar czf /opt/takto-web.bak.$(date +%Y%m%d-%H%M%S).tar.gz -C /opt takto-web
  ls -lh /opt/takto-web.bak.*.tar.gz | tail -1
fi
```

### 2 · Código

```bash
sudo mkdir -p /opt/takto-web && sudo chown deploy:deploy /opt/takto-web
cd /opt/takto-web

if [ -d .git ]; then
  git fetch --all --prune
  git checkout feature/takto-rebrand
  git pull --ff-only            # nunca reset --hard
else
  git clone <REMOTO-DE-TAKTO-WEB> .
  git checkout feature/takto-rebrand
fi
git rev-parse HEAD
```

> El remoto todavía no existe. Alternativa sin remoto: `rsync` del repositorio
> local excluyendo `node_modules`, `.next` y `public/_qa-viewports.*`.

### 3 · Build

```bash
cd /opt/takto-web
docker compose build            # NO pasar CSP_ALLOW_INSECURE_PREVIEW
docker compose config           # debe resolver sin errores
```

### 4 · Arranque exclusivo de takto-web

```bash
docker compose up -d takto-web  # solo este servicio
docker compose ps
```

### 5 · Esperar healthcheck

```bash
for i in $(seq 1 30); do
  s=$(docker inspect takto-web --format '{{.State.Health.Status}}' 2>/dev/null)
  echo "$i: $s"
  [ "$s" = "healthy" ] && break
  sleep 2
done
[ "$s" = "healthy" ] || { echo "NO LEVANTO"; docker logs --tail 50 takto-web; exit 1; }
```

### 6 · Prueba local (antes de tocar Caddy)

```bash
curl -sS -o /dev/null -w "host loopback  -> %{http_code}\n" http://127.0.0.1:3100/
curl -sS -o /dev/null -w "health         -> %{http_code}\n" http://127.0.0.1:3100/api/health
docker exec tehus-crm-staging-caddy-1 wget -qO- -T5 http://takto-web:3000/api/health && echo " <- Caddy alcanza el contenedor"
```

Si Caddy no lo alcanza, **detenerse aquí**: el problema es de red, no de Caddy.

### 7 · Caddy: backup, aplicar, validar

```bash
cd /opt/tehus-crm
cp deploy/Caddyfile /opt/Caddyfile.bak.$(date +%Y%m%d-%H%M%S)
ls -l /opt/Caddyfile.bak.*

git fetch origin
git checkout feature/takto-domain-routing   # rama ya commiteada, cambio aditivo
git --no-pager diff main --stat             # debe ser: deploy/Caddyfile | +32

docker exec tehus-crm-staging-caddy-1 caddy validate \
  --config /etc/caddy/Caddyfile --adapter caddyfile
```

> El Caddyfile está bind-mounteado desde el repo del CRM, así que cambiar de
> rama ya actualiza el archivo que ve el contenedor. **No se edita a mano.**

### 8 · Recarga sin reiniciar

```bash
docker exec tehus-crm-staging-caddy-1 caddy reload \
  --config /etc/caddy/Caddyfile --adapter caddyfile

docker ps --filter name=tehus-crm-staging-caddy-1 --format '{{.Status}}'
```

`reload` aplica en caliente. **Nunca** `docker restart` ni `docker compose up`
sobre el contenedor de Caddy: eso sí cortaría el CRM.

### 9 · Certificado

```bash
for i in $(seq 1 30); do
  code=$(curl -sS -o /dev/null -w '%{http_code}' --max-time 10 https://takto.online/ || echo 000)
  echo "$i: $code"
  [ "$code" = "200" ] && break
  sleep 5
done
echo | openssl s_client -connect takto.online:443 -servername takto.online 2>/dev/null \
  | openssl x509 -noout -subject -issuer -dates
```

### 10 · Verificación

```bash
curl -sS -o /dev/null -w "https raiz      -> %{http_code}\n" https://takto.online/
curl -sSI http://takto.online/  | head -2      # 308 a https
curl -sSI https://www.takto.online/ | head -3  # 301 a https://takto.online
for p in /privacidad /terminos /tratamiento-datos /gracias /robots.txt /sitemap.xml /icon.svg /favicon.ico /api/health; do
  printf "%-22s %s\n" "$p" "$(curl -sS -o /dev/null -w '%{http_code}' https://takto.online$p)"
done
curl -sS -o /dev/null -w "404 -> %{http_code}\n" https://takto.online/no-existe
```

**Y que el CRM sigue intacto:**

```bash
curl -sS -o /dev/null -w "crm-staging     -> %{http_code}\n" https://crm-staging.tehusrattan.com
curl -sS -o /dev/null -w "api health      -> %{http_code}\n" https://api.crm-staging.tehusrattan.com/api/health
docker ps --format '{{.Names}} {{.Status}}' | grep tehus-crm-staging
```

---

## Rollback

Revierte **solo** lo nuevo. El CRM no se toca en ningún caso.

### A · Solo Caddy (la web sigue arriba, deja de ser pública)

```bash
cd /opt/tehus-crm
git checkout main                       # vuelve al Caddyfile sin takto
docker exec tehus-crm-staging-caddy-1 caddy validate --config /etc/caddy/Caddyfile --adapter caddyfile
docker exec tehus-crm-staging-caddy-1 caddy reload --config /etc/caddy/Caddyfile --adapter caddyfile
```

Si el repo no colaborara, restaurar el backup:

```bash
cp /opt/Caddyfile.bak.<timestamp> /opt/tehus-crm/deploy/Caddyfile
docker exec tehus-crm-staging-caddy-1 caddy validate --config /etc/caddy/Caddyfile --adapter caddyfile
docker exec tehus-crm-staging-caddy-1 caddy reload  --config /etc/caddy/Caddyfile --adapter caddyfile
```

### B · Solo el servicio de la web

```bash
cd /opt/takto-web
docker compose stop takto-web
docker compose rm -f takto-web          # SIN -v: no hay volúmenes que borrar
```

### C · Retirada completa

Ejecutar A y B, y opcionalmente:

```bash
docker image rm takto-web:latest
```

Tras cualquier rollback, comprobar que `crm-staging` y `api.crm-staging` siguen
en 200 y que los cuatro contenedores del CRM siguen *healthy*.

---

## Variables

| Variable | Momento | Valor |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | build | `https://takto.online` |
| `NEXT_PUBLIC_CRM_LOGIN_URL` | build | login del CRM de pruebas |
| `NEXT_PUBLIC_CRM_ONBOARDING_URL` | build | onboarding del CRM de pruebas |
| `NEXT_PUBLIC_ALLOW_INDEXING` | build | `true` en producción |
| `NEXT_PUBLIC_CONTACT_MODE` | build | `pending` (sin canal activo) |
| `NEXT_PUBLIC_CONTACT_ENDPOINT` | build | vacío |
| `NEXT_PUBLIC_CONTACT_WHATSAPP` | build | vacío |
| `CSP_ALLOW_INSECURE_PREVIEW` | build | **sin definir** en producción |
| `TAKTO_EDGE_NETWORK` | runtime | por defecto `tehus-crm-staging_proxy` |

Ningún secreto. Ninguna variable del CRM.
