import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";
import { brand, crmLoginUrl, crmOnboardingUrl, site, siteUrl } from "./site";

/**
 * Guardas de identidad de marca.
 *
 * La web comercial es TAKTO. El único rastro admitido del dominio anterior es
 * el enlace funcional al CRM de pruebas (`crm-staging.tehusrattan.com`), que
 * no es identidad sino acceso operativo.
 */

const SRC = join(process.cwd(), "src");

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

/**
 * Se excluyen los propios archivos de prueba: contienen la marca anterior a
 * propósito, dentro de las aserciones que impiden que vuelva.
 */
const sourceFiles = walk(SRC).filter(
  (file) => /\.(ts|tsx|css|svg)$/.test(file) && !/\.test\.[cm]?tsx?$/.test(file),
);

/** Enlace autorizado al CRM de staging: se permite, todo lo demás no. */
const ALLOWED_STAGING = /crm-staging\.tehusrattan\.com/g;

describe("identidad de marca", () => {
  it("expone TAKTO con la división cromática TAK / TO", () => {
    expect(brand.name).toBe("TAKTO");
    expect(brand.wordmark.primary).toBe("TAK");
    expect(brand.wordmark.secondary).toBe("TO");
    expect(`${brand.wordmark.primary}${brand.wordmark.secondary}`).toBe(brand.name);
  });

  it("declara el concepto y las dos frases de marca", () => {
    expect(brand.concept).toBe("La jugada");
    expect(brand.claim).toBe("Cada oportunidad, un siguiente movimiento.");
    expect(brand.pitch).toBe("Mueve oportunidades. Cierra ventas.");
  });

  it("usa takto.online como dominio canónico", () => {
    expect(siteUrl).toBe("https://takto.online");
    expect(site.name).toBe("TAKTO");
  });

  it("conserva el acceso funcional al CRM de pruebas", () => {
    expect(crmLoginUrl).toBe("https://crm-staging.tehusrattan.com/login");
    expect(crmOnboardingUrl).toBe("https://crm-staging.tehusrattan.com/onboarding");
  });
});

describe("sin rastros de la marca anterior", () => {
  it("ningún archivo fuente menciona Tehus como identidad", () => {
    const offenders: string[] = [];

    for (const file of sourceFiles) {
      const contents = readFileSync(file, "utf8");
      // Se descarta primero el enlace autorizado al CRM de staging.
      const withoutAllowed = contents.replace(ALLOWED_STAGING, "");
      if (/tehus/i.test(withoutAllowed)) {
        offenders.push(relative(process.cwd(), file));
      }
    }

    expect(offenders).toEqual([]);
  });

  it("ningún archivo fuente usa el dominio canónico anterior", () => {
    const offenders = sourceFiles.filter((file) =>
      /crm\.tehusrattan\.com|app\.tehuscrm\.com/i.test(readFileSync(file, "utf8")),
    );

    expect(offenders.map((f) => relative(process.cwd(), f))).toEqual([]);
  });
});

describe("paleta centralizada", () => {
  const css = readFileSync(join(SRC, "styles", "globals.css"), "utf8");

  it("define TAK y TO como los únicos valores literales de marca", () => {
    expect(css).toMatch(/--color-tak:\s*#[0-9a-f]{6}/i);
    expect(css).toMatch(/--color-to:\s*#[0-9a-f]{6}/i);
    expect(css).toMatch(/--color-tak-strong:\s*#[0-9a-f]{6}/i);
  });

  it("los alias semánticos apuntan a los tokens, no a valores sueltos", () => {
    expect(css).toMatch(/--color-brand:\s*var\(--color-tak\)/);
    expect(css).toMatch(/--color-brand-gold:\s*var\(--color-to\)/);
    expect(css).toMatch(/--color-brand-text:\s*var\(--color-tak-strong\)/);
  });

  it("no quedan HEX sueltos en componentes ni en los datos de contenido", () => {
    const componentFiles = sourceFiles.filter(
      (file) =>
        (file.includes(join("src", "components")) || file.includes(join("src", "data"))) &&
        /\.(ts|tsx)$/.test(file),
    );

    const offenders = componentFiles.filter((file) =>
      /#[0-9a-f]{6}\b/i.test(readFileSync(file, "utf8")),
    );

    expect(offenders.map((f) => relative(process.cwd(), f))).toEqual([]);
  });
});
