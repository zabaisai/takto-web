import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: "Tehus CRM",
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#F8F5EF",
    theme_color: "#0B0E0F",
    lang: "es-CO",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
