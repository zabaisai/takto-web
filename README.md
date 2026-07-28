# tehus-crm-web

Página web comercial pública de **Tehus CRM**.

Proyecto **independiente**: no forma parte, no depende y no se despliega junto al repositorio
del CRM (`Tehus_Rattan`). Puede desarrollarse, desplegarse y revertirse sin afectarlo.

## Estado

| | |
| --- | --- |
| Landing | Implementada a partir del mockup aprobado |
| Preview | Local (`npm run start` o Docker) |
| Despliegue público | **No realizado.** Pendiente de aprobación visual y de DNS |
| Formulario | Funcional. Destino real **pendiente de aprobación** (adaptador `log`: no envía ni almacena) |
| Textos legales | **Borrador**, pendientes de revisión jurídica |

## Stack

- Next.js 16 · App Router · `output: standalone`
- React 19 · TypeScript en modo estricto reforzado
- Tailwind CSS v4 (tokens del mockup en `src/styles/globals.css`)
- Vitest + Testing Library
- ESLint (`eslint-config-next`)
- Fuentes autoalojadas con `next/font` (Sora, Instrument Sans, JetBrains Mono)
- **Cero dependencias de UI, iconos, analítica o formularios**

## Comandos

```bash
npm ci            # instalar
npm run dev       # desarrollo
npm test          # 82 pruebas
npm run lint      # ESLint
npm run typecheck # tsc --noEmit
npm run build     # build de producción
npm run start     # servir el build
```

## Estructura

```
src/
  app/                    rutas, metadata, sitemap, robots, manifest, OG
    api/demo/             endpoint del formulario
    api/health/           healthcheck del contenedor
    privacidad|terminos|tratamiento-datos/
    gracias/  not-found.tsx
  components/
    layout/               header sticky, menú móvil, footer
    landing/              las 18 secciones de la landing
    product-mockups/      interfaces del CRM recreadas en HTML/CSS
    forms/                formulario de demostración
    legal/                marco de las páginas legales
    ui/                   Section, Container, Eyebrow, LinkButton
  data/landing-content.ts todos los textos y datos demostrativos
  lib/
    site.ts               URLs y flags de entorno
    validation/           validación compartida cliente/servidor
    security/             rate limiting
    leads/                abstracción del destino del formulario
  styles/globals.css      tokens de diseño y animaciones

mockup/                   mockup aprobado (referencia, fuera del build)
docs/                     auditoría, decisiones y runbook de despliegue
```

## Mockups del producto

Todas las interfaces del CRM (dashboard, conversaciones, contactos, pipeline, tareas,
cotizaciones, notificaciones, equipo y conexión de WhatsApp) están **recreadas en HTML y CSS**.
No hay capturas de pantalla ni imágenes rasterizadas: el texto es real, nítido y accesible.

Los datos son ficticios y no contienen correos, teléfonos, tokens, credenciales, información
del VPS ni clientes reales.

## Variables de entorno

Ver `.env.example`. Ningún secreto lleva el prefijo `NEXT_PUBLIC_`.

La URL de acceso al CRM se resuelve en un único lugar (`src/lib/site.ts`) a partir de
`NEXT_PUBLIC_CRM_LOGIN_URL`; ningún componente la escribe a mano.

En preview y staging hay que exportar `NEXT_PUBLIC_ALLOW_INDEXING=false` para emitir
`noindex` y bloquear el rastreo.

## Despliegue

Procedimiento completo, backups, validación de Caddy y rollback: [`docs/runbook-despliegue.md`](docs/runbook-despliegue.md).

**Nada del CRM se toca en ningún paso**: ni base de datos, ni backend, ni variables, ni Meta,
ni WhatsApp, ni el webhook, ni `crm-staging`, ni `api.crm-staging`, ni PostgreSQL.
