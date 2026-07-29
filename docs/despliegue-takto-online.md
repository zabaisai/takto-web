# Despliegue de takto.online

> **Método oficial y vigente.** El sitio se despliega desde un **artefacto
> reproducible** generado con `git archive` desde `main`, transferido por SSH y
> verificado por SHA-256. No se clona el repositorio en el VPS, no se copian
> claves privadas al VPS y no se usa `rsync`.

## Fuente y commit

| Concepto | Valor |
| --- | --- |
| **Fuente oficial** | rama `main` |
| **Commit desplegable** | el `HEAD` verificado de `origin/main` (p. ej. `git ls-remote origin refs/heads/main`) |
| **Método oficial** | artefacto `git archive` + verificación **SHA-256** |
| **Alcance** | únicamente el servicio `takto-web` |

La rama `feature/takto-rebrand` **queda obsoleta como fuente de despliegue**: no
se despliega desde ella. Todo cambio se integra a `main` (PR o `merge --no-ff`)
y se despliega el artefacto de `main`.

## Principio

La web es un proyecto, repositorio, imagen y contenedor **independientes**.
Caddy solo la enruta. No se comparte código, dependencias, variables, volúmenes
ni base de datos con el CRM.

**Nunca**: clonar el repositorio privado dentro del VPS · copiar una clave
privada de GitHub al VPS · `rsync` improvisado · `docker compose down -v` ·
`docker system prune` · `git reset --hard` · `git clean` · force push · reinicio
del VPS · recrear o reiniciar Caddy, backend, frontend, PostgreSQL o pgAdmin ·
migraciones (takto-web no tiene base de datos).

## Arquitectura resuelta

Caddy corre **dentro de un contenedor** del stack del CRM y es dueño de 80/443.
La web se une a la red de borde `tehus-crm-staging_proxy` —donde ya están
`caddy`, `frontend` y `backend`— declarada como **externa**: este compose nunca
la crea ni la borra. Caddy la resuelve como `takto-web:3000`.

**No** se une a `tehus-crm-staging_internal`, la única red donde vive PostgreSQL.
El puerto `127.0.0.1:3100` se publica solo para el smoke test desde el host.

El bloque de Caddy para `takto.online` ya existe y funciona; **una actualización
de la aplicación no lo toca**. Solo se revisa Caddy en el alta inicial del dominio.

---

## Procedimiento de actualización (idempotente)

### 1 · Preparar el artefacto en local, desde el commit exacto

```bash
# En el repositorio local, sobre main ya fusionado y con CI verde:
git fetch origin
git checkout main
git rev-parse HEAD                        # == origin/main == commit desplegable
[ -z "$(git status --porcelain)" ]        # working tree limpio

COMMIT=$(git rev-parse HEAD)
git archive --format=tar.gz -o /tmp/takto-web-$COMMIT.tar.gz "$COMMIT"
sha256sum /tmp/takto-web-$COMMIT.tar.gz    # anota el SHA-256
```

`git archive` incluye **solo archivos rastreados**: no lleva `.git`, `.env`,
`node_modules` ni `.next`. Verifícalo antes de transferir:

```bash
tar tzf /tmp/takto-web-$COMMIT.tar.gz | grep -E '(^|/)\.git(/|$)|node_modules/|(^|/)\.next/|(^|/)\.env$' \
  && echo "ARTEFACTO SUCIO" || echo "artefacto limpio"
```

### 2 · Transferir por SSH y verificar el SHA-256 en el VPS

```bash
scp /tmp/takto-web-$COMMIT.tar.gz deploy@<VPS>:/tmp/
ssh deploy@<VPS> "sha256sum /tmp/takto-web-$COMMIT.tar.gz"   # debe COINCIDIR con el local
```

Si el SHA-256 no coincide, **detenerse**: no se despliega un artefacto no íntegro.

### 3 · Extraer en un directorio temporal y validar el contenido (en el VPS)

```bash
rm -rf /tmp/takto-web-new && mkdir -p /tmp/takto-web-new
tar xzf /tmp/takto-web-$COMMIT.tar.gz -C /tmp/takto-web-new
# No debe contener: .env real, claves, tokens, node_modules, .next, .git,
# ni secretos del CRM. .env.example (plantilla) sí es correcto.
```

### 4 · Backup recuperable + reemplazo del código (preservando la config beta)

```bash
TS=$(date +%Y%m%d-%H%M%S)
docker tag takto-web:latest takto-web:prev-$TS            # imagen de rollback
sudo tar czf /opt/takto-web.bak.$TS.tar.gz -C /opt takto-web   # backup recuperable

cp -p /opt/takto-web/.env /tmp/takto-web-new/.env         # PRESERVAR variables beta
sudo mv /opt/takto-web /opt/takto-web.old.$TS             # dir anterior (rollback)
sudo mv /tmp/takto-web-new /opt/takto-web
sudo chown -R deploy:deploy /opt/takto-web && chmod 600 /opt/takto-web/.env
```

El `.env` del VPS (variables beta, sin secretos con prefijo `NEXT_PUBLIC_`) **se
conserva siempre**. El artefacto nunca lo trae.

### 5 · Construir y recrear ÚNICAMENTE takto-web

```bash
cd /opt/takto-web
docker compose build takto-web
docker compose up -d takto-web            # solo este servicio
```

**Nunca** `docker compose up` sobre Caddy, backend, frontend o PostgreSQL.

### 6 · Esperar healthy; si falla, rollback (sin tocar el CRM)

```bash
for i in $(seq 1 40); do
  s=$(docker inspect takto-web --format '{{.State.Health.Status}}' 2>/dev/null)
  [ "$s" = "healthy" ] && break; sleep 3
done
# Si NO llega a healthy:
#   docker tag takto-web:prev-$TS takto-web:latest
#   sudo rm -rf /opt/takto-web && sudo mv /opt/takto-web.old.$TS /opt/takto-web
#   cd /opt/takto-web && docker compose up -d --force-recreate takto-web
```

### 7 · Verificación pública + integridad del CRM

```bash
for p in / /eliminacion-datos /privacidad /terminos /tratamiento-datos /sitemap.xml /robots.txt; do
  printf "%-22s %s\n" "$p" "$(curl -sS -o /dev/null -w '%{http_code}' https://takto.online$p)"
done
curl -sS -o /dev/null -w "404 -> %{http_code}\n" https://takto.online/no-existe

# El CRM sigue intacto:
curl -sS -o /dev/null -w "crm-staging -> %{http_code}\n" https://crm-staging.tehusrattan.com/login
curl -sS -o /dev/null -w "api health  -> %{http_code}\n" https://api.crm-staging.tehusrattan.com/api/health
docker ps --format '{{.Names}} {{.Status}}' | grep tehus-crm-staging
```

Comprobar además: `canonical` correcto, `noindex` (beta) tanto en la home como en
`robots.txt`, la página en el `sitemap`, enlaces legales visibles, y que
**PostgreSQL no fue recreado** (su `StartedAt` no cambia con el despliegue).

---

## Rollback

Revierte **solo** lo nuevo. El CRM no se toca en ningún caso.

- **Aplicación:** restaurar la imagen `takto-web:prev-<TS>` como `:latest`,
  devolver `/opt/takto-web.old.<TS>` a su sitio y `docker compose up -d
  --force-recreate takto-web`. El backup `/opt/takto-web.bak.<TS>.tar.gz` es la
  copia recuperable.
- **Caddy (solo si se hubiera tocado el alta del dominio):** restaurar el bloque
  desde el repositorio del CRM o desde el backup del `Caddyfile`, `caddy validate`
  y `caddy reload` (nunca `restart`).

Tras cualquier rollback, comprobar que `crm-staging` y `api.crm-staging` siguen
en 200 y que los contenedores del CRM siguen *healthy*.

---

## Variables

| Variable | Momento | Valor |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | build | `https://takto.online` |
| `NEXT_PUBLIC_CRM_LOGIN_URL` | build | login del CRM de pruebas |
| `NEXT_PUBLIC_CRM_ONBOARDING_URL` | build | onboarding del CRM de pruebas |
| `NEXT_PUBLIC_ALLOW_INDEXING` | build | (la web permanece en beta → `noindex`) |
| `NEXT_PUBLIC_CONTACT_MODE` | build | `pending` (sin canal activo) |
| `TAKTO_EDGE_NETWORK` | runtime | por defecto `tehus-crm-staging_proxy` |

Ningún secreto lleva el prefijo `NEXT_PUBLIC_`. Ninguna variable del CRM se usa aquí.
