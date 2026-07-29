import { siteUrl } from "@/lib/site";

/**
 * robots.txt servido por un route handler (no por el metadata route de Next).
 *
 * Declara UN ÚNICO grupo `User-agent: *` con `Disallow:` VACÍO (acceso total):
 * sin `Allow: /`, sin `Disallow: /` y sin grupos específicos por rastreador.
 * Meta interpretaba un grupo `User-agent: * / Disallow: /` como bloqueo global
 * —pese al grupo específico para sus crawlers—, así que el permiso general es
 * deliberado para superar su parser de robots.txt.
 *
 * Permitir el rastreo NO indexa la web: la protección contra indexación vive en
 * el `<meta name="robots" content="noindex, follow">` de cada página.
 *
 * `Cache-Control: no-store, …` evita que Meta sirva una copia cacheada;
 * `force-dynamic` deja fuera el cacheo estático de Next (sin `X-Nextjs-Cache`).
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
