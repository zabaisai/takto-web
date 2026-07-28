import type { MetadataRoute } from "next";
import { allowIndexing, isBeta, siteUrl } from "@/lib/site";

/**
 * En preview y staging (`NEXT_PUBLIC_ALLOW_INDEXING=false`) se bloquea el
 * rastreo por completo, para que ningún entorno intermedio acabe indexado.
 */
export default function robots(): MetadataRoute.Robots {
  // En beta se bloquea el rastreo entero, pero el sitemap sigue accesible
  // para poder revisarlo durante el QA.
  if (!allowIndexing) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
      ...(isBeta ? { sitemap: `${siteUrl}/sitemap.xml` } : {}),
    };
  }

  return {
    rules: [
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
