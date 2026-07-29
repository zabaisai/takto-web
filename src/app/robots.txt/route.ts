import { allowIndexing, siteUrl } from "@/lib/site";

/**
 * `robots.txt` servido por un route handler (no por el metadata route de Next)
 * para controlar dos cosas que ese metadata route no permite:
 *
 *  1. Un `Disallow:` VACÍO para los rastreadores de Meta, en lugar de `Allow: /`.
 *     Es la forma de máxima compatibilidad con los parsers de robots.txt: el
 *     metadata route solo sabe emitir `Allow: /`.
 *  2. Una cabecera `Cache-Control` sin almacenamiento, para que el Sharing
 *     Debugger de Meta no siga sirviendo una versión cacheada anterior.
 *
 * `force-dynamic` evita el cacheo estático de Next (sin `X-Nextjs-Cache: HIT`),
 * garantiza que la cabecera manda y permite registrar cada consulta de Meta.
 *
 * Permitir el rastreo NO implica indexación: las páginas conservan su `noindex`
 * y, fuera de Meta, todo sigue bloqueado mientras la web esté en beta.
 */
export const dynamic = "force-dynamic";

export const CACHE_CONTROL =
  "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0";

const META_CRAWLERS = ["facebookexternalhit", "Facebot"] as const;

/** Genera el cuerpo exacto de robots.txt según la etapa del sitio. */
export function buildRobots(): string {
  // `Disallow:` vacío = acceso total, sin usar `Allow: /`.
  const metaGroups = META_CRAWLERS.map(
    (userAgent) => `User-agent: ${userAgent}\nDisallow:`,
  ).join("\n\n");

  // En beta/preview el rastreo general está bloqueado (nadie indexa la web);
  // en producción se permite salvo las rutas internas.
  const generalGroup = allowIndexing
    ? "User-agent: *\nDisallow: /api/\nDisallow: /gracias"
    : "User-agent: *\nDisallow: /";

  return `${metaGroups}\n\n${generalGroup}\n\nSitemap: ${siteUrl}/sitemap.xml\n`;
}

export function GET(request: Request): Response {
  // Visibilidad mínima para confirmar si Meta vuelve a consultar: ni Caddy ni
  // Next standalone registran las peticiones. Solo se registra el UA de Meta.
  const userAgent = request.headers.get("user-agent") ?? "";
  if (/facebookexternalhit|facebot/i.test(userAgent)) {
    console.info(`[robots] meta-crawler ua="${userAgent}"`);
  }

  return new Response(buildRobots(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": CACHE_CONTROL,
    },
  });
}
