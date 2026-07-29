import { siteUrl } from "@/lib/site";

/**
 * robots.txt servido por un route handler (no por el metadata route de Next).
 *
 * Declara UN ÚNICO grupo `User-agent: *` con `Disallow:` VACÍO (acceso total):
 * sin `Allow: /`, sin `Disallow: /` y sin grupos específicos por rastreador.
 *
 * Permitir el rastreo NO indexa la web: la protección contra indexación vive en
 * el `<meta name="robots" content="noindex, follow">` de cada página mientras
 * TAKTO siga en beta.
 *
 * Se restaura este cuerpo estándar tras cerrar la prueba aislada RFC 9309 (el
 * 404 temporal descartó que el contenido de robots.txt fuera la causa de que
 * Meta no solicitara `/eliminacion-datos`; Meta terminó aceptando una URL
 * alternativa fuera de este sitio, así que no hace falta variante de código
 * adicional).
 *
 * `Cache-Control: no-store, …` evita cualquier copia cacheada mientras dure la
 * beta; `force-dynamic` deja fuera el cacheo estático de Next.
 */
export const dynamic = "force-dynamic";

export const CACHE_CONTROL =
  "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0";

/** Cuerpo exacto de robots.txt: un solo grupo abierto + sitemap. */
export function buildRobots(): string {
  return `User-agent: *\nDisallow:\n\nSitemap: ${siteUrl}/sitemap.xml\n`;
}

export function GET(): Response {
  return new Response(buildRobots(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": CACHE_CONTROL,
    },
  });
}
