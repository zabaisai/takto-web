# Fase 1 — Auditoría previa (2026-07-28)

## Fuente del mockup

- Proyecto Claude Design `d9a62734-b52f-485e-96fe-b2044340df8f`
- Archivo `Tehus CRM Landing.dc.html` — 132 KB, 1018 líneas
- Copia local: `mockup/tehus-crm-landing.mockup.html`
- Formato: HTML declarativo con lógica `DCLogic` (estado de FAQ y de formulario)
- **No contiene imágenes.** Todo es HTML + CSS inline, incluidos los mockups de producto.

## Tokens de diseño

| Rol | Valor |
| --- | --- |
| Fondo base | `#F8F5EF` |
| Superficie | `#FFFFFF` |
| Superficie suave | `#FCFAF6` |
| Tinta | `#0B0E0F` |
| Panel oscuro | `#12161A`, `#1A1D1F` |
| Footer | `#080A0B` |
| Texto secundario | `#62676D` |
| Texto terciario | `#8A8F95` |
| Placeholder | `#A6A29A` |
| Borde | `#E4E0D8` |
| Borde suave | `#EFEBE3`, `#F3F0EA`, `#F0EDE6` |
| Borde apagado | `#C9C4BA` |
| Marca primaria | `#B7790B` |
| Marca oro | `#E5B94F` |
| Marca profunda | `#8A5A0A` |
| WhatsApp | `#25D366` |
| WhatsApp chat | `#075E54`, `#005C4B`, `#0B141A`, `#202C33`, `#E9EDEF` |
| Alerta | `#C0392B` |
| Empresa demo azul | `#1F5C8B` |
| Empresa demo verde | `#2F6B4F` |

## Tipografías

- **Sora** 400/500/600/700 — títulos, `letter-spacing: -.025em`
- **Instrument Sans** 400/500/600 (+ itálica 400) — cuerpo e interfaz
- **JetBrains Mono** 400/500 — cifras, códigos, etiquetas técnicas

En el mockup se cargan desde Google Fonts. En la implementación se autoalojan con `next/font/google`
para eliminar peticiones a terceros (mejora CSP, LCP y CLS).

## Animaciones

`tRise`, `tFloat`, `tPulse`, `tSlideIn`, `tStage`, `tBell`, `tSheen`.
El mockup ya incluye `@media (prefers-reduced-motion: reduce)` anulando todas. Se conserva.

## Secciones presentes en el mockup

1. Header sticky (blur, 6 enlaces, «Iniciar sesión», «Solicitar demostración»)
2. Hero `#top` + mockup de conversaciones + 2 tarjetas flotantes
3. Franja de valor (4 ítems, condicional `showValueStrip`)
4. `#producto` — Problemas comerciales (4 tarjetas) + panel oscuro Antes / Con Tehus CRM
5. `#funciones` — Ecosistema (6 tarjetas, una oscura)
6. `#whatsapp` — sección oscura + teléfono + flujo de conexión
7. `#conversaciones` — mockup de 3 paneles con ficha de cliente
8. `#pipeline` — kanban de 6 columnas
9. Tareas y seguimiento
10. Cotizaciones — documento `COT-0184`
11. `#equipo` — roles SUPER_ADMIN / ADMIN / ASESOR + usuarios + actividad y sesiones
12. Notificaciones — preferencias con toggles + panel
13. `#empresas` — personalización (3 empresas ficticias) + incorporación en 8 pasos
14. `#seguridad` — sección oscura, 6 tarjetas
15. `#comenzar` — implementación en 4 pasos
16. `#demo` — formulario de demostración
17. `#faq` — 10 preguntas
18. CTA final oscura
19. Footer `#contacto` con bloque `#acceso`

## Elementos que deben recrearse (no existen en el mockup)

- **Sección Contactos dedicada.** En el mockup el módulo de contactos aparece repartido entre la
  tarjeta de «Ecosistema» y la ficha de cliente de «Conversaciones». La lista de secciones
  obligatorias la exige como sección propia, así que se construye reutilizando ese lenguaje visual.
- **Páginas legales** (`/privacidad`, `/terminos`, `/tratamiento-datos`). En el mockup los tres
  enlaces del footer apuntan a `#legal`, un marcador.
- **Página `/gracias`** y **404**.
- **Endpoint `/api/demo`** con validación de servidor, rate limiting y honeypot.
- **Menú móvil accesible.** El header del mockup deja que la navegación haga wrap; por debajo de
  430 px eso desborda. Se implementa un menú hamburguesa con foco y `aria-expanded`.
- **Metadata, sitemap, robots, manifest, favicon, Open Graph.**

## Datos demostrativos

El mockup ya usa datos ficticios y lo declara explícitamente
(«Ejemplos ilustrativos. Las empresas mostradas son ficticias»).
No contiene correos reales, teléfonos reales, tokens, credenciales ni información del VPS.
Se conservan tal cual: María Gómez, Jorge Torres, Ana López, Camilo Restrepo, Laura Mejía,
Diana Arias, Distribuciones del Valle, Oficinas Andes, Hotel Marena, Café Bourbon, Clínica Sauce,
Grupo Tarraza, Textiles Norte, Distribuidora Ejemplo S.A.S., COT-0184.

## Auditoría de entorno

| Verificación | Resultado |
| --- | --- |
| Proyecto local `tehus-crm-web` previo | No existe otro. Solo el repo inicializado el 2026-07-28 (commit `c5f62cf`) |
| Repositorio GitHub homónimo | **No verificable**: `gh` CLI no instalado, sin usuario de GitHub configurado |
| Node / npm | v24.18.0 / 11.16.0 |
| Docker | 29.5.3 |
| `crm.tehusrattan.com` | NXDOMAIN — libre, sin colisión |
| `crm-staging.tehusrattan.com` | resuelve al VPS del CRM (`dig +short crm-staging.tehusrattan.com`) |
| `api.crm-staging.tehusrattan.com` | resuelve al VPS del CRM (`dig +short crm-staging.tehusrattan.com`) |
| `tehusrattan.com` | `92.112.198.117`, `148.135.128.11` (Hostinger) |
| `www.tehusrattan.com` | CNAME a `www.tehusrattan.com.cdn.hstgr.net` |
| Acceso a infraestructura | Existe `~/.ssh/tehus_vps_ed25519` pero no hay `~/.ssh/config` con host/usuario. **No se realizó ninguna conexión.** |

## Sistemas NO tocados

CRM desplegado, base de datos, backend, WhatsApp Embedded Signup, Meta, webhook, variables del CRM,
`crm-staging.tehusrattan.com`, `api.crm-staging.tehusrattan.com`, PostgreSQL, Caddy,
`feature/whatsapp-message-templates`, repositorio `Tehus_Rattan`.

## Puntos de detención abiertos

1. **DNS**: `crm.tehusrattan.com` no existe. Se requiere el registro y la IP de destino confirmada.
2. **Destino del formulario**: sin correo destinatario ni opción aprobada. Se implementa una
   abstracción con adaptador `log` por defecto (no envía ni almacena nada).
3. **GitHub**: sin usuario/organización confirmados. No se crea ni se empuja ningún remoto.
4. **Textos legales**: se publican marcados como borrador, con marcadores para razón social,
   NIT, dirección, representante legal y correos.
