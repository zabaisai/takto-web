import { describe, expect, it } from "vitest";
import robots from "./robots";
import { allowIndexing, isBeta } from "@/lib/site";

/**
 * Next serializa cada entrada de `rules` como un grupo independiente de
 * `robots.txt`. Se normaliza a esa forma para poder afirmar sobre grupos
 * («hay un grupo para facebookexternalhit con Allow: /») y no sobre la
 * estructura interna del objeto.
 */
function groupsOf(rules: ReturnType<typeof robots>["rules"]) {
  const list = Array.isArray(rules) ? rules : rules ? [rules] : [];
  return list.map((rule) => ({
    userAgents: [rule.userAgent ?? "*"].flat(),
    allow: [rule.allow ?? []].flat(),
    disallow: [rule.disallow ?? []].flat(),
  }));
}

function groupFor(userAgent: string) {
  return groupsOf(robots().rules).find((group) => group.userAgents.includes(userAgent));
}

describe("robots.txt", () => {
  it("la web sigue en beta y sin indexación general", () => {
    // Guarda de contexto: el resto de expectativas describen la beta.
    expect(isBeta).toBe(true);
    expect(allowIndexing).toBe(false);
  });

  it("permite explícitamente a facebookexternalhit", () => {
    expect(groupFor("facebookexternalhit")).toMatchObject({ allow: ["/"] });
  });

  it("permite explícitamente a Facebot", () => {
    expect(groupFor("Facebot")).toMatchObject({ allow: ["/"] });
  });

  it("no bloquea ninguna ruta a los rastreadores de Meta", () => {
    for (const agent of ["facebookexternalhit", "Facebot"]) {
      expect(groupFor(agent)?.disallow).toEqual([]);
    }
  });

  it("mantiene bloqueados al resto de robots mientras dure la beta", () => {
    const general = groupFor("*");
    expect(general).toMatchObject({ disallow: ["/"] });
    expect(general?.allow).toEqual([]);
  });

  it("declara los grupos de Meta antes del grupo general", () => {
    // Un grupo específico gana al comodín en cualquier rastreador conforme,
    // pero el orden deja la intención explícita y evita implementaciones laxas.
    const agents = groupsOf(robots().rules).flatMap((group) => group.userAgents);
    expect(agents).toEqual(["facebookexternalhit", "Facebot", "*"]);
  });

  it("sigue publicando el sitemap en beta", () => {
    expect(robots().sitemap).toBe("https://takto.online/sitemap.xml");
  });
});
