/**
 * PRUEBA AISLADA (RFC 9309): `/robots.txt` responde HTTP 404 a propósito.
 *
 * Según la RFC 9309, un 404 en `robots.txt` equivale a "sin restricciones": el
 * rastreador debe asumir acceso total. Esta prueba descarta que el contenido o
 * el parseo del `robots.txt` sea la causa de que Meta no llegue a solicitar
 * `/eliminacion-datos`. Durante la prueba NO se devuelven reglas robots ni
 * Sitemap en esta ruta.
 *
 * Respuesta mínima, sin redirección y sin 401/403/429/5xx. `force-dynamic` +
 * `Cache-Control: no-store, …` evitan cualquier cacheo (propio o de Meta).
 *
 * La protección contra indexación sigue viviendo en el `noindex` de cada página.
 */
export const dynamic = "force-dynamic";

export const CACHE_CONTROL =
  "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0";

export function GET(): Response {
  return new Response("Not Found\n", {
    status: 404,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": CACHE_CONTROL,
    },
  });
}
