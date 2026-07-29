import type { MetadataRoute } from "next";
import { allowIndexing, isBeta, siteUrl } from "@/lib/site";

/**
 * Rastreadores de Meta que validan las URLs declaradas en la app de Facebook
 * (política de privacidad, eliminación de datos, tarjetas al compartir).
 *
 * Se les permite el acceso SIEMPRE, también en beta: si `robots.txt` los
 * bloquea, el Sharing Debugger reporta la URL como 403 y Meta rechaza la
 * declaración, aunque el servidor responda 200. Permitir el rastreo no implica
 * indexación: las páginas conservan su `noindex` y ningún buscador general
 * queda desbloqueado.
 */
const META_CRAWLERS = ["facebookexternalhit", "Facebot"] as const;

const metaCrawlerRules = META_CRAWLERS.map((userAgent) => ({
  userAgent,
  allow: "/",
}));

/**
 * En preview y staging (`NEXT_PUBLIC_ALLOW_INDEXING=false`) se bloquea el
 * rastreo por completo, para que ningún entorno intermedio acabe indexado.
 */
export default function robots(): MetadataRoute.Robots {
  // En beta se bloquea el rastreo entero salvo para Meta, pero el sitemap
  // sigue accesible para poder revisarlo durante el QA.
  if (!allowIndexing) {
    return {
      rules: [...metaCrawlerRules, { userAgent: "*", disallow: "/" }],
      ...(isBeta ? { sitemap: `${siteUrl}/sitemap.xml` } : {}),
    };
  }

  return {
    rules: [
      ...metaCrawlerRules,
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/gracias"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
