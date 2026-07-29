import { describe, expect, it } from "vitest";
import { GET, buildRobots, CACHE_CONTROL } from "./robots.txt/route";

describe("robots.txt", () => {
  it("declara un único grupo `User-agent: *`", () => {
    const body = buildRobots();
    const userAgentLines = body.match(/^User-agent:/gim) ?? [];
    expect(userAgentLines).toHaveLength(1);
    expect(body).toMatch(/^User-agent: \*$/m);
  });

  it("usa `Disallow:` vacío (acceso total)", () => {
    expect(buildRobots()).toMatch(/^Disallow:\s*$/m);
  });

  it("no contiene `Disallow: /`", () => {
    expect(buildRobots()).not.toMatch(/^Disallow:\s*\/\s*$/m);
  });

  it("no contiene ninguna directiva `Allow:`", () => {
    expect(buildRobots()).not.toMatch(/^Allow:/m);
  });

  it("publica el Sitemap correcto", () => {
    expect(buildRobots()).toContain("Sitemap: https://takto.online/sitemap.xml");
  });

  it("sirve el cuerpo exacto esperado", () => {
    expect(buildRobots()).toBe(
      "User-agent: *\nDisallow:\n\nSitemap: https://takto.online/sitemap.xml\n",
    );
  });

  it("responde text/plain con Cache-Control sin almacenamiento", () => {
    const res = GET();
    expect(res.headers.get("content-type")).toContain("text/plain");
    expect(res.headers.get("cache-control")).toBe(CACHE_CONTROL);
    expect(CACHE_CONTROL).toBe(
      "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
    );
  });

  it("el GET sirve exactamente el cuerpo generado", async () => {
    expect(await GET().text()).toBe(buildRobots());
  });
});
