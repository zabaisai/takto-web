# Deuda técnica

## DT-1 · Excepción «Connection closed.» en producción

**Estado:** aceptada como incidencia conocida para la beta técnica.
**Aceptada por:** el operador, en la autorización del despliegue beta.
**Prioridad:** baja. No invertir más tiempo durante esta beta.

### Qué es

En cada carga de página de la **build de producción** aparece una excepción en la
consola del navegador:

```
[EXCEPTION] Error: Connection closed.
    at eo (/_next/static/chunks/2-<hash>.js:1:18661)
    at t  (/_next/static/chunks/2-<hash>.js:1:19084)
```

El stack tiene dos marcos, ambos dentro del chunk del framework de React/Next.
**No aparece ningún marco de código de la aplicación.** Se origina en el cliente
Flight de React al leer el payload RSC inlineado en el documento.

### Alcance medido

| Condición | Resultado |
| --- | --- |
| Rutas afectadas | Todas (`/`, `/privacidad`, `/gracias`, …) |
| Producción (`next build`) | 1 excepción por carga |
| Desarrollo (`next dev`) | **0 excepciones** |
| Peticiones HTTP fallidas | **0** — las 32 peticiones devuelven 200 |
| Errores de hidratación | 0 |
| Navegación | Correcta |
| Impacto visible para el usuario | **Ninguno** |

### Qué se descartó

- **No es el JSON-LD.** Se construyó una variante sin ningún
  `<script type="application/ld+json">` y la excepción **seguía apareciendo**.
  Una medición anterior sugirió lo contrario, pero era un artefacto: el buffer
  de consola del navegador se comparte entre puertos del mismo host. Al repetir
  el A/B con pestañas limpias, la variante sin JSON-LD también mostró una.
- **No es la posición del script.** Moverlo a `<head>` tampoco lo evita.
- **No es hidratación, ni fuentes, ni recursos, ni promesas rechazadas.**

### Qué sí se corrigió por el camino

Los enlaces de ancla (`#demo`, `/#funciones`, …) usaban `next/link`. Cabecera y
pie tienen una docena, así que Next hacía *prefetch* del payload RSC de `/` por
cada uno y abortaba los que quedaban a medias.

Medición: **8 `GET /` seguidos por carga → 1**. Corregido en el commit
`fix(web): stop routing in-page anchors through the Next router`.

Eso redujo la frecuencia de la excepción de varias por carga a una, pero no la
eliminó, porque el resto no procede de este proyecto.

### Verificación pendiente

Queda **sin comprobar** que la excepción se reproduzca en una aplicación mínima
de Next.js 16.2.12 sin código propio. Es el control que confirmaría de forma
definitiva que es un artefacto del framework. No se ejecutó.

### Cómo cerrarla

1. Reproducir en una app Next 16.2.12 recién creada (`create-next-app`, build de
   producción, sin código propio).
2. Si se reproduce: abrir incidencia en el repositorio de Next.js con esa
   reproducción mínima, y reevaluar al actualizar de versión.
3. Si **no** se reproduce: volver a bisecar sobre este proyecto, esta vez con
   pestañas limpias por cada medición para no repetir el artefacto de consola.

### Lo que NO se hizo

No se ocultó con mocks de `console.error`, filtros del navegador, `try/catch`
vacíos ni supresión genérica. La excepción sigue siendo visible en consola.

---

## DT-2 · Viewports no verificables por redimensionado

`resize_window` de la automatización de Chrome informa éxito pero el viewport se
queda en 1536 px. La auditoría responsive se hace renderizando la página real
dentro de iframes del ancho exacto (`public/_qa-viewports.*`, excluido de git y
de la imagen), lo que requiere habilitar el enmarcado del mismo origen mediante
`CSP_ALLOW_INSECURE_PREVIEW=1`. En producción el sitio no se puede enmarcar.

## DT-3 · El Caddyfile vive en el repositorio del CRM

`deploy/Caddyfile` pertenece a `tehus-rattan`, que además es un repositorio
**público**. Enrutar `takto.online` obliga a tocar ese archivo, así que la web
comercial y el CRM comparten un punto de acoplamiento en la configuración de
borde, aunque no compartan código, imagen, red interna ni datos.

Mejora futura: mover Caddy a `import /etc/caddy/conf.d/*.caddy` para que cada
sitio aporte su propio fragmento. Requiere modificar el compose del CRM.
