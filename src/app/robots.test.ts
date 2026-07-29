import { describe, expect, it } from "vitest";
import { GET, buildRobots, CACHE_CONTROL } from "./robots.txt/route";
import { allowIndexing, isBeta } from "@/lib/site";

function metaRequest(userAgent = "facebookexternalhit/1.1") {
  return new Request("https://takto.online/robots.txt", {
    headers: { "user-agent": userAgent },
  });
}

describe("robots.txt", () => {
  it("la web sigue en beta y sin indexación general", () => {
    // Guarda de contexto: el resto de expectativas describen la beta.
    expect(isBeta).toBe(true);
    expect(allowIndexing).toBe(false);
  });

  it("permite a los rastreadores de Meta con `Disallow:` vacío, no `Allow: /`", () => {
    const body = buildRobots();
    expect(body).toContain("User-agent: facebookexternalhit\nDisallow:");
    expect(body).toContain("User-agent: Facebot\nDisallow:");
    // Máxima compatibilidad de parsers: nunca se usa `Allow: /`.
    expect(body).not.toContain("Allow: /");
  });

  it("mantiene bloqueados al resto de robots mientras dure la beta", () => {
    expect(buildRobots()).toContain("User-agent: *\nDisallow: /");
  });

  it("declara los grupos de Meta antes del comodín", () => {
    const body = buildRobots();
    expect(body.indexOf("facebookexternalhit")).toBeLessThan(body.indexOf("Facebot"));
    expect(body.indexOf("Facebot")).toBeLessThan(body.indexOf("User-agent: *"));
  });

  it("sigue publicando el sitemap en beta", () => {
    expect(buildRobots()).toContain("Sitemap: https://takto.online/sitemap.xml");
  });

  it("responde como text/plain con Cache-Control sin almacenamiento", () => {
    const res = GET(metaRequest());
    expect(res.headers.get("content-type")).toContain("text/plain");
    expect(res.headers.get("cache-control")).toBe(CACHE_CONTROL);
    expect(CACHE_CONTROL).toBe(
      "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
    );
  });

  it("el GET sirve exactamente el cuerpo generado", async () => {
    const res = GET(metaRequest());
    expect(await res.text()).toBe(buildRobots());
  });
});
