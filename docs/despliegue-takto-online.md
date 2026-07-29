# Despliegue de takto.online

> **Método oficial y vigente.** El sitio se despliega desde un **artefacto
> reproducible** (`git archive` del commit exacto de `main`), transferido por SSH
> y verificado por **SHA-256**. Se despliega **únicamente** el servicio
> `takto-web`.

## Fuente y commit

| Concepto | Valor |
| --- | --- |
| Fuente oficial | rama `main` (única fuente de despliegue) |
| Commit desplegable | el `HEAD` verificado de `origin/main` |
| Método oficial | artefacto `git archive` + verificación **SHA-256** |
| Alcance | solo el servicio `takto-web` |

## Reglas absolutas (nunca)

- **Nunca** clonar el repositorio dentro del VPS (`git clone`), ni hacer `git
  pull`/`git fetch`/`git checkout` en `/opt/takto-web`: en el VPS solo hay código
  extraído de un artefacto, no un repositorio.
- **Nunca** copiar una clave privada de GitHub al VPS.
- **Nunca** usar `rsync`.
- **Nunca** `docker compose down -v`, `docker system prune`, `git reset --hard`
  ni `git clean`.
- **Nunca** modificar, validar ni recargar **Caddy** durante una actualización
  normal. El bloque de `takto.online` ya existe; una actualización de la app no
  lo toca.
- **Nunca** recrear ni reiniciar Caddy, backend, frontend, PostgreSQL o pgAdmin.
- **Nunca** ejecutar migraciones: `takto-web` no tiene base de datos.

## Arquitectura

`takto-web` es un contenedor **aislado** unido a la red de borde externa
`tehus-crm-staging_proxy` (donde Caddy lo resuelve como `takto-web:3000`). **No**
se une a `tehus-crm-staging_internal`, la red donde vive PostgreSQL. Publica
`127.0.0.1:3100` solo para el smoke test local. No comparte código, variables,
volúmenes ni base de datos con el CRM.

---

## Procedimiento (idempotente)

### 1 · Confirmar `main = origin/main`

```bash
cd <repo-local-takto-web>
git fetch origin
git checkout main
[ "$(git rev-parse HEAD)" = "$(git ls-remote origin refs/heads/main | cut -f1)" ] \
  && echo "main == origin/main" || { echo "DIFIEREN — detente"; exit 1; }
[ -z "$(git status --porcelain)" ] && echo "arbol limpio" || { echo "arbol sucio — detente"; exit 1; }
COMMIT=$(git rev-parse HEAD)
```

### 2 · Confirmar el CI remoto en verde

El CI (`.github/workflows/ci.yml`) corre en `push`/`pull_request` sobre `main`.
Antes de desplegar, el commit `$COMMIT` debe figurar **verde** en GitHub Actions
(job `verify`). Si no hay `gh`/token, lo confirma el operador visualmente. **No
se despliega un commit en progreso o fallido.**

### 3 · Crear el artefacto con `git archive` del commit exacto

```bash
git archive --format=tar.gz -o /tmp/takto-web-$COMMIT.tar.gz "$COMMIT"
# git archive incluye SOLO archivos rastreados: sin .git, .env, node_modules ni .next.
tar tzf /tmp/takto-web-$COMMIT.tar.gz | grep -E '(^|/)\.git(/|$)|node_modules/|(^|/)\.next/|(^|/)\.env$' \
  && { echo "artefacto sucio — detente"; exit 1; } || echo "artefacto limpio"
```

### 4 · Calcular el SHA-256 local

```bash
sha256sum /tmp/takto-web-$COMMIT.tar.gz   # anota el valor: SHA_LOCAL
```

### 5 · Transferir el artefacto por SCP

```bash
scp /tmp/takto-web-$COMMIT.tar.gz deploy@<VPS>:/tmp/
```

### 6 · Verificar el SHA-256 en el VPS

```bash
ssh deploy@<VPS> "sha256sum /tmp/takto-web-$COMMIT.tar.gz"
# Debe COINCIDIR con SHA_LOCAL. Si no coincide, detente: artefacto no integro.
```

### 7 · Inspeccionar el contenido (en el VPS)

```bash
rm -rf /tmp/takto-web-new && mkdir -p /tmp/takto-web-new
tar xzf /tmp/takto-web-$COMMIT.tar.gz -C /tmp/takto-web-new
# No debe contener: .env real, claves, tokens, node_modules, .next, .git,
# ni secretos del CRM. `.env.example` (plantilla) si es correcto.
```

### 8 · Backup recuperable del release actual

```bash
TS=$(date +%Y%m%d-%H%M%S)
docker tag takto-web:latest takto-web:prev-$TS                 # imagen de rollback
sudo tar czf /opt/takto-web.bak.$TS.tar.gz -C /opt takto-web   # copia recuperable
sudo chown deploy:deploy /opt/takto-web.bak.$TS.tar.gz && sudo chmod 600 /opt/takto-web.bak.$TS.tar.gz
```

### 9 · Preservar `/opt/takto-web/.env`

```bash
cp -p /opt/takto-web/.env /tmp/takto-web-new/.env && chmod 600 /tmp/takto-web-new/.env
# El .env de la web (variables beta, sin secretos NEXT_PUBLIC_) se conserva SIEMPRE.
```

### 10 · Reemplazar solo el código de takto-web

```bash
sudo mv /opt/takto-web /opt/takto-web.old.$TS      # dir anterior (rollback)
sudo mv /tmp/takto-web-new /opt/takto-web
sudo chown -R deploy:deploy /opt/takto-web && chmod 600 /opt/takto-web/.env
```

### 11 · Construir la imagen de takto-web

```bash
cd /opt/takto-web
docker compose build takto-web
```

### 12 · Recrear únicamente el contenedor takto-web

```bash
docker compose up -d takto-web        # solo este servicio; nunca Caddy/backend/frontend/postgres
```

### 13 · Esperar el estado healthy

```bash
for i in $(seq 1 40); do
  s=$(docker inspect takto-web --format '{{.State.Health.Status}}' 2>/dev/null)
  echo "$i: $s"; [ "$s" = "healthy" ] && break; sleep 3
done
[ "$s" = "healthy" ] || { echo "NO HEALTHY — ir a Rollback (paso 16)"; docker logs --tail 50 takto-web; exit 1; }
```

### 14 · Verificar las URLs públicas

```bash
for p in / /eliminacion-datos /privacidad /terminos /tratamiento-datos /sitemap.xml /robots.txt; do
  printf "%-22s %s\n" "$p" "$(curl -sS -o /dev/null -w '%{http_code}' https://takto.online$p)"
done
curl -sS -o /dev/null -w "404 -> %{http_code}\n" https://takto.online/no-existe
# Comprobar ademas: canonical correcto, noindex (beta) en la home y en robots.txt,
# la pagina en el sitemap, enlaces legales visibles y sin secretos en el HTML.
```

### 15 · Confirmar que el CRM y PostgreSQL siguen intactos

```bash
curl -sS -o /dev/null -w "crm-staging -> %{http_code}\n" https://crm-staging.tehusrattan.com/login
curl -sS -o /dev/null -w "api health  -> %{http_code}\n" https://api.crm-staging.tehusrattan.com/api/health
docker ps --format '{{.Names}} {{.Status}}' | grep tehus-crm-staging
# PostgreSQL NO recreado: su StartedAt no cambia con el despliegue.
docker inspect tehus-crm-staging-postgres-1 --format 'postgres StartedAt={{.State.StartedAt}} Health={{.State.Health.Status}}'
```

### 16 · Rollback exclusivo de takto-web

Solo revierte la web. **El CRM, Caddy y PostgreSQL no se tocan.**

```bash
docker tag takto-web:prev-$TS takto-web:latest          # imagen anterior
sudo rm -rf /opt/takto-web && sudo mv /opt/takto-web.old.$TS /opt/takto-web
cd /opt/takto-web && docker compose up -d --force-recreate takto-web
# Copia recuperable alternativa: /opt/takto-web.bak.$TS.tar.gz
```

Tras el rollback, repetir el paso 15: `crm-staging` y `api.crm-staging` en 200 y
todos los contenedores del CRM *healthy*.

---

## Variables

| Variable | Momento | Valor |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | build | `https://takto.online` |
| `NEXT_PUBLIC_CRM_LOGIN_URL` | build | login del CRM de pruebas |
| `NEXT_PUBLIC_CRM_ONBOARDING_URL` | build | onboarding del CRM de pruebas |
| `NEXT_PUBLIC_ALLOW_INDEXING` | build | la web permanece en beta → `noindex` |
| `NEXT_PUBLIC_CONTACT_MODE` | build | `pending` (sin canal activo) |
| `TAKTO_EDGE_NETWORK` | runtime | por defecto `tehus-crm-staging_proxy` |

Ningún secreto lleva el prefijo `NEXT_PUBLIC_`. Ninguna variable del CRM se usa aquí.
