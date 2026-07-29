import { describe, expect, it } from "vitest";
import { config, proxy } from "./proxy";

describe("proxy", () => {
  it("deja pasar la petición sin modificarla", () => {
    const res = proxy();
    expect(res.headers.get("x-middleware-next")).toBe("1");
  });

  it("conserva un matcher que cubre las páginas y excluye los assets internos", () => {
    expect(config.matcher).toContain("/((?!_next/static|_next/image|favicon.ico).*)");
  });
});
