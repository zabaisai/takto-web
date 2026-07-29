import { describe, expect, it } from "vitest";
import { GET, CACHE_CONTROL } from "./robots.txt/route";

describe("robots.txt (prueba RFC 9309: 404)", () => {
  it("responde HTTP 404", () => {
    expect(GET().status).toBe(404);
  });

  it("no es una redirección ni un 401/403/429/5xx", () => {
    const { status } = GET();
    expect([301, 302, 303, 307, 308, 401, 403, 429]).not.toContain(status);
    expect(status).toBeLessThan(500);
  });

  it("usa Cache-Control sin almacenamiento", () => {
    expect(GET().headers.get("cache-control")).toBe(CACHE_CONTROL);
    expect(CACHE_CONTROL).toBe(
      "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
    );
  });

  it("responde text/plain con un cuerpo mínimo", () => {
    expect(GET().headers.get("content-type")).toContain("text/plain");
  });

  it("no devuelve reglas robots ni Sitemap durante la prueba", async () => {
    const body = await GET().text();
    expect(body).not.toMatch(/User-agent/i);
    expect(body).not.toMatch(/Disallow/i);
    expect(body).not.toMatch(/Allow/i);
    expect(body).not.toMatch(/Sitemap/i);
  });
});
