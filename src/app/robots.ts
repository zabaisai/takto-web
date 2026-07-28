import type { MetadataRoute } from "next";
import { allowIndexing, siteUrl } from "@/lib/site";

/**
 * En preview y staging (`NEXT_PUBLIC_ALLOW_INDEXING=false`) se bloquea el
 * rastreo por completo, para que ningún entorno intermedio acabe indexado.
 */
export default function robots(): MetadataRoute.Robots {
  if (!allowIndexing) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
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
