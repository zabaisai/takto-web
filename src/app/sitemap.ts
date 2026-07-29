import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

/**
 * Se listan la portada y la página de eliminación de datos. Esta última se
 * incluye a propósito aunque la beta siga en noindex: es una URL que Meta
 * (y sus revisores) deben poder descubrir de forma estable. El resto de
 * legales en borrador y las páginas de confirmación quedan fuera.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-07-29");

  return [
    {
      url: `${siteUrl}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/eliminacion-datos`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
