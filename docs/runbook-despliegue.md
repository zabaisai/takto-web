# Runbook de despliegue — tehus-crm-web

> **Estado: NO DESPLEGADO.** Este documento describe el procedimiento propuesto.
> No se ha ejecutado ningún paso contra el VPS, el DNS ni Caddy.

## Principio rector

La landing es un servicio **independiente**. En ningún paso se toca el CRM, su base de datos,
su backend, sus variables, Meta, WhatsApp ni el webhook. Si algún paso obligara a hacerlo,
el procedimiento se detiene.

---

## 0 · Requisitos previos (pendientes de tu confirmación)

| # | Pendiente | Por qué bloquea |
| --- | --- | --- |
| 1 | Registro DNS de `crm.tehusrattan.com` | Hoy es `NXDOMAIN`. Sin él no hay certificado |
| 2 | Host y usuario SSH del VPS de destino | No hay `~/.ssh/config`; no se inventa ninguna IP |
| 3 | Destino aprobado del formulario + correo comercial | Hoy el adaptador es `log`: no envía ni guarda nada |
| 4 | Usuario/organización de GitHub | Sin remoto configurado |
| 5 | Aprobación visual del preview | Requisito explícito antes de publicar |

### Registro DNS a crear en Hostinger

`crm.tehusrattan.com` **no existe**. Los registros actuales del dominio son:

| Nombre | Tipo | Valor |
| --- | --- | --- |
| `crm-staging.tehusrattan.com` | A | IP del VPS del CRM |
| `api.crm-staging.tehusrattan.com` | A | la misma IP del VPS del CRM |
| `tehusrattan.com` | A | dos IP de Hostinger (infraestructura distinta) |
| `www.tehusrattan.com` | CNAME | CDN de Hostinger |

Para consultar los valores actuales sin escribirlos en el repositorio:

```bash
dig +short crm-staging.tehusrattan.com A
dig +short tehusrattan.com A
```

Hay que crear:

```
Tipo:  A
Nombre: crm
Valor:  <IP DEL SERVIDOR DONDE SE ALOJARÁ LA LANDING>
TTL:    3600
```

**La IP no se rellena aquí a propósito.** Si la landing va al mismo VPS del CRM, el valor es el
que devuelve `dig +short crm-staging.tehusrattan.com A` — pero esa decisión es tuya y debes
confirmarla antes de crear el registro. No se creará ni modificará ningún registro DNS sin tu
autorización expresa.

Verificación posterior:

```bash
dig +short crm.tehusrattan.com A
```

---

## 1 · Preparación local (ya hecho)

```bash
npm ci
npm test          # 82 pruebas
npm run lint
npm run typecheck
npm run build
```

## 2 · Preview aislado

```bash
docker compose build
docker compose up -d
curl -i http://127.0.0.1:3100/api/health   # -> 200 {"status":"ok"}
curl -i http://127.0.0.1:3100/             # -> 200
```

El contenedor publica el puerto **solo en loopback** (`127.0.0.1:3100`). No abre ningún puerto
al exterior y no colisiona con los servicios del CRM.

Antes de continuar, comprobar en el VPS que 3100 está libre:

```bash
ss -ltnp | grep -E ':(3100)\b' || echo "3100 libre"
docker ps --format '{{.Names}}\t{{.Ports}}'
```

Si estuviera ocupado, cambiar el mapeo en `docker-compose.yml` (`127.0.0.1:3101:3000`) y
ajustar el bloque de Caddy en consecuencia. **No detener ni reconfigurar ningún contenedor del CRM.**

## 3 · Comprobaciones previas en el servidor

```bash
df -h /            # espacio en disco
free -m            # memoria disponible
docker ps          # servicios del CRM en marcha: NO tocarlos
```

## 4 · Backup de la configuración de Caddy

**Obligatorio antes de editar nada.**

```bash
sudo cp /etc/caddy/Caddyfile /etc/caddy/Caddyfile.bak.$(date +%Y%m%d-%H%M%S)
sudo ls -l /etc/caddy/Caddyfile.bak.*
```

## 5 · Bloque de Caddy a añadir

Se **añade** un bloque nuevo al final. No se modifica, reordena ni toca ninguna línea
de los bloques existentes de `crm-staging` y `api.crm-staging`.

```caddyfile
crm.tehusrattan.com {
    encode zstd gzip

    header {
        Strict-Transport-Security "max-age=63072000; includeSubDomains; preload"
        X-Content-Type-Options    "nosniff"
        Referrer-Policy           "strict-origin-when-cross-origin"
        -Server
    }

    reverse_proxy 127.0.0.1:3100 {
        header_up X-Real-IP {remote_host}
    }
}
```

> La CSP, `X-Frame-Options` y `Permissions-Policy` los emite la propia aplicación
> (`next.config.ts`), así que no se duplican aquí.

## 6 · Validar y recargar Caddy sin cortar servicio

```bash
sudo caddy validate --config /etc/caddy/Caddyfile     # debe pasar ANTES de recargar
sudo systemctl reload caddy                           # reload, NUNCA restart
sudo systemctl status caddy --no-pager
```

`reload` aplica la configuración sin cerrar las conexiones existentes:
`crm-staging` y `api.crm-staging` no sufren downtime.

Si `validate` falla:

```bash
sudo cp /etc/caddy/Caddyfile.bak.<timestamp> /etc/caddy/Caddyfile
sudo systemctl reload caddy
```

## 7 · Certificado

Caddy solicita el certificado automáticamente en el primer acceso. Requiere que el DNS ya resuelva.

```bash
curl -sSI https://crm.tehusrattan.com | head -n 1
echo | openssl s_client -connect crm.tehusrattan.com:443 -servername crm.tehusrattan.com 2>/dev/null \
  | openssl x509 -noout -subject -dates
```

---

## Verificación post-despliegue

```bash
curl -sSI https://crm.tehusrattan.com/                 # 200
curl -sS  https://crm.tehusrattan.com/api/health       # {"status":"ok"}
curl -sSI https://crm.tehusrattan.com/privacidad       # 200
curl -sSI https://crm.tehusrattan.com/terminos         # 200
curl -sSI https://crm.tehusrattan.com/tratamiento-datos # 200
curl -sSI https://crm.tehusrattan.com/gracias          # 200
curl -sS  https://crm.tehusrattan.com/robots.txt
curl -sS  https://crm.tehusrattan.com/sitemap.xml
curl -sSI https://crm.tehusrattan.com/icon.svg
curl -sSI https://crm.tehusrattan.com/opengraph-image
curl -sSI https://crm.tehusrattan.com/no-existe         # 404
```

Comprobar además, sin modificar nada:

```bash
curl -sSI https://crm-staging.tehusrattan.com      | head -n 1   # sigue sano
curl -sSI https://api.crm-staging.tehusrattan.com  | head -n 1   # sigue sano
docker ps --filter name=tehus-crm-web
docker inspect --format '{{.State.Health.Status}}' tehus-crm-web
```

Y en el navegador: cero errores de consola, cero peticiones fallidas, botón «Iniciar sesión»
apuntando a `crm-staging.tehusrattan.com/login`, formulario operativo y responsive en los
seis viewports.

**PostgreSQL no se toca en ningún paso.** No se ejecutan migraciones. No se reinicia ningún
servicio del CRM.

---

## Rollback

### A · Revertir solo la aplicación

```bash
docker compose down
docker compose up -d --force-recreate   # con la imagen anterior
```

### B · Revertir Caddy

```bash
sudo cp /etc/caddy/Caddyfile.bak.<timestamp> /etc/caddy/Caddyfile
sudo caddy validate --config /etc/caddy/Caddyfile
sudo systemctl reload caddy
```

### C · Retirada completa

```bash
docker compose down --rmi local
# eliminar el bloque crm.tehusrattan.com del Caddyfile
sudo caddy validate --config /etc/caddy/Caddyfile
sudo systemctl reload caddy
```

Tras cualquier rollback, el CRM queda exactamente como estaba: la landing nunca comparte
red, volúmenes, base de datos ni configuración con él.

---

## Variables requeridas

| Variable | Ámbito | Momento | Secreto |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Cliente | Build | No |
| `NEXT_PUBLIC_CRM_LOGIN_URL` | Cliente | Build | No |
| `NEXT_PUBLIC_ALLOW_INDEXING` | Cliente | Build | No |
| `DEMO_LEAD_SINK` | Servidor | Runtime | No |
| `DEMO_LEAD_TO` | Servidor | Runtime | No |
| `SMTP_*` | Servidor | Runtime | **Sí** |
| `CRM_LEADS_TOKEN` | Servidor | Runtime | **Sí** |
| `FORMS_TOKEN` | Servidor | Runtime | **Sí** |
| `DEMO_RATE_LIMIT_MAX` | Servidor | Runtime | No |
| `DEMO_RATE_LIMIT_WINDOW_MS` | Servidor | Runtime | No |

Los valores no se documentan en el repositorio. Ningún secreto lleva el prefijo `NEXT_PUBLIC_`.

## Entornos de preview

En cualquier entorno que no sea producción hay que exportar:

```
NEXT_PUBLIC_ALLOW_INDEXING=false
```

Eso emite `noindex, nofollow` y hace que `robots.txt` bloquee todo el rastreo.
