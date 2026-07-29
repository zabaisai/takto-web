import { afterEach, describe, expect, it, vi } from "vitest";
import { config, metaCrawlerFamily, proxy } from "./proxy";
import type { NextRequest } from "next/server";

function fakeRequest(pathname: string, userAgent: string): NextRequest {
  return {
    headers: new Headers(userAgent ? { "user-agent": userAgent } : {}),
    nextUrl: { pathname },
  } as unknown as NextRequest;
}

const FB_UA = "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)";

describe("metaCrawlerFamily", () => {
  it("detecta facebookexternalhit (con o sin sufijos)", () => {
    expect(metaCrawlerFamily(FB_UA)).toBe("facebookexternalhit");
    expect(metaCrawlerFamily("facebookexternalhit/1.1")).toBe("facebookexternalhit");
  });

  it("detecta Facebot en cualquier caja", () => {
    expect(metaCrawlerFamily("Facebot/1.0")).toBe("Facebot");
    expect(metaCrawlerFamily("mozilla facebot")).toBe("Facebot");
  });

  it("devuelve null para UA que no es de Meta o vacío", () => {
    expect(metaCrawlerFamily("Mozilla/5.0 (Windows NT 10.0)")).toBeNull();
    expect(metaCrawlerFamily("Googlebot/2.1")).toBeNull();
    expect(metaCrawlerFamily("")).toBeNull();
  });
});

describe("proxy", () => {
  afterEach(() => vi.restoreAllMocks());

  it("registra SOLO ruta + familia para un rastreador de Meta", () => {
    const info = vi.spyOn(console, "info").mockImplementation(() => {});
    proxy(fakeRequest("/eliminacion-datos", FB_UA));

    expect(info).toHaveBeenCalledTimes(1);
    const line = info.mock.calls[0]?.[0] as string;
    expect(line).toBe("[meta-crawler] /eliminacion-datos ua-family=facebookexternalhit");
  });

  it("no filtra datos sensibles: sin UA completo, método, query, IP ni cabeceras", () => {
    const info = vi.spyOn(console, "info").mockImplementation(() => {});
    proxy(fakeRequest("/robots.txt", FB_UA));

    const line = info.mock.calls[0]?.[0] as string;
    expect(line).not.toContain("+http"); // no incluye el User-Agent completo
    expect(line).not.toMatch(/\bGET\b|\bPOST\b/); // no incluye el método
    expect(line).not.toContain("?"); // no incluye query string
    expect(line).not.toMatch(/\d+\.\d+\.\d+\.\d+/); // no incluye IP
  });

  it("no registra nada para un User-Agent que no es de Meta", () => {
    const info = vi.spyOn(console, "info").mockImplementation(() => {});
    proxy(fakeRequest("/", "Mozilla/5.0"));
    expect(info).not.toHaveBeenCalled();
  });

  it("conserva un matcher que cubre las páginas y excluye los assets internos", () => {
    expect(config.matcher).toContain("/((?!_next/static|_next/image|favicon.ico).*)");
  });
});
