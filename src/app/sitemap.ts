import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

/**
 * Solo se listan las páginas indexables. Las legales están en borrador y las
 * de confirmación no aportan valor de búsqueda, así que quedan fuera.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-07-28");

  return [
    {
      url: `${siteUrl}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
