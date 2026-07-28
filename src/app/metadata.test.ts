import { describe, expect, it } from "vitest";
import { metadata } from "./layout";
import { metadata as homeMetadata } from "./page";
import { metadata as privacidadMetadata } from "./privacidad/page";
import { metadata as graciasMetadata } from "./gracias/page";
import sitemap from "./sitemap";
import manifest from "./manifest";
import { site } from "@/lib/site";

describe("metadata crítica", () => {
  it("usa el título exacto acordado", () => {
    expect(homeMetadata.title).toBe("Tehus CRM | Organiza WhatsApp, clientes y ventas");
  });

  it("usa la meta description exacta acordada", () => {
    expect(homeMetadata.description).toBe(
      "Centraliza conversaciones de WhatsApp, organiza clientes, asigna asesores y administra el seguimiento comercial de tu empresa con Tehus CRM.",
    );
  });

  it("declara canonical en la portada", () => {
    expect(homeMetadata.alternates?.canonical).toBe("/");
  });

  it("declara metadataBase para resolver las URLs absolutas", () => {
    expect(metadata.metadataBase?.toString()).toContain("crm.tehusrattan.com");
  });

  it("publica Open Graph y Twitter Card", () => {
    expect(metadata.openGraph?.title).toBe(site.title);
    expect(metadata.openGraph?.locale).toBe("es_CO");
    // `Twitter` es una unión discriminada por `card`: se estrecha antes de leerla.
    const twitter = metadata.twitter as { card?: string } | null | undefined;
    expect(twitter?.card).toBe("summary_large_image");
  });

  it("enlaza el manifest", () => {
    expect(metadata.manifest).toBe("/manifest.webmanifest");
  });
});

describe("páginas no indexables", () => {
  it("marca las legales en borrador como noindex", () => {
    expect(privacidadMetadata.robots).toMatchObject({ index: false });
  });

  it("marca la página de agradecimiento como noindex", () => {
    expect(graciasMetadata.robots).toMatchObject({ index: false });
  });
});

describe("sitemap y manifest", () => {
  it("el sitemap solo contiene la portada, con URL absoluta", () => {
    const entries = sitemap();
    expect(entries).toHaveLength(1);
    expect(entries[0]?.url).toBe("https://crm.tehusrattan.com/");
  });

  it("el manifest usa los colores de marca", () => {
    const result = manifest();
    expect(result.theme_color).toBe("#0B0E0F");
    expect(result.background_color).toBe("#F8F5EF");
    expect(result.lang).toBe("es-CO");
  });
});
