import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Hero } from "./Hero";
import { WhatsappSection } from "./WhatsappSection";
import { PipelineSection } from "./PipelineSection";
import { CompaniesSection } from "./CompaniesSection";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { demoData, hero, whatsapp } from "@/data/landing-content";

describe("Hero", () => {
  it("declara un único H1 con el mensaje del mockup", () => {
    render(<Hero />);

    const headings = screen.getAllByRole("heading", { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent(/convierte cada conversación/i);
    expect(headings[0]).toHaveTextContent(/oportunidad de venta/i);
  });

  it("ofrece el CTA principal y el secundario como enlaces reales", () => {
    render(<Hero />);

    expect(screen.getByRole("link", { name: /solicitar una demostración/i })).toHaveAttribute(
      "href",
      "#demo",
    );
    expect(screen.getByRole("link", { name: /ver cómo funciona/i })).toHaveAttribute(
      "href",
      "#producto",
    );
  });

  it("mantiene el subtítulo como texto seleccionable, no como imagen", () => {
    render(<Hero />);
    expect(screen.getByText(hero.subtitle)).toBeInTheDocument();
  });

  it("describe el mockup del producto para lectores de pantalla", () => {
    render(<Hero />);

    const mockup = screen.getByRole("img", { name: /módulo de conversaciones/i });
    expect(mockup).toHaveAccessibleName(/datos de ejemplo/i);
  });
});

describe("WhatsappSection", () => {
  it("incluye la aclaración sobre la dependencia de Meta", () => {
    render(<WhatsappSection />);
    expect(screen.getByText(whatsapp.disclaimer)).toBeInTheDocument();
  });

  it("no promete conexión instantánea ni aprobación garantizada", () => {
    const { container } = render(<WhatsappSection />);
    const text = container.textContent ?? "";

    expect(text).not.toMatch(/instantáne/i);
    expect(text).not.toMatch(/garantiza/i);
    expect(text).not.toMatch(/ilimitad/i);
    expect(text).not.toMatch(/cualquier número/i);
  });

  it("condiciona la conservación del número a la modalidad de conexión", () => {
    render(<WhatsappSection />);
    expect(screen.getByText(/cuando la modalidad de conexión lo permita/i)).toBeInTheDocument();
  });
});

describe("PipelineSection", () => {
  it("muestra las seis etapas del tablero", () => {
    render(<PipelineSection />);

    for (const column of demoData.pipelineColumns) {
      expect(screen.getByText(column.name)).toBeInTheDocument();
    }
  });

  it("permite desplazamiento horizontal en lugar de desbordar la página", () => {
    render(<PipelineSection />);
    const board = screen.getByRole("img", { name: /tablero de pipeline/i });
    expect(board.className).toContain("overflow-x-auto");
  });
});

describe("CompaniesSection", () => {
  it("advierte de que las empresas mostradas son ficticias", () => {
    render(<CompaniesSection />);
    expect(screen.getByText(/las empresas mostradas son ficticias/i)).toBeInTheDocument();
  });

  it("nombra las empresas de ejemplo con la palabra «Ejemplo»", () => {
    render(<CompaniesSection />);

    expect(screen.getByText("Distribuidora Ejemplo")).toBeInTheDocument();
    expect(screen.getByText("Clínica Ejemplo")).toBeInTheDocument();
    expect(screen.getByText("Agroservicios Ejemplo")).toBeInTheDocument();
  });
});

describe("SiteFooter", () => {
  it("enlaza las tres páginas legales", () => {
    render(<SiteFooter />);

    expect(screen.getByRole("link", { name: /política de privacidad/i })).toHaveAttribute(
      "href",
      "/privacidad",
    );
    expect(screen.getByRole("link", { name: /términos y condiciones/i })).toHaveAttribute(
      "href",
      "/terminos",
    );
    expect(
      screen.getByRole("link", { name: /política de tratamiento de datos/i }),
    ).toHaveAttribute("href", "/tratamiento-datos");
  });

  it("no publica un correo ni un teléfono inventados", () => {
    const { container } = render(<SiteFooter />);
    const text = container.textContent ?? "";

    expect(text).toContain("pendiente de confirmar");
    expect(text).not.toMatch(/[\w.+-]+@[\w-]+\.[a-z]{2,}/i);
  });

  it("aclara que Tehus CRM no está afiliado a Meta", () => {
    render(<SiteFooter />);
    expect(screen.getByText(/no está afiliado a meta/i)).toBeInTheDocument();
  });

  it("usa la variable de entorno para el acceso al CRM", () => {
    render(<SiteFooter />);

    const footer = screen.getByRole("contentinfo");
    expect(within(footer).getByRole("link", { name: /iniciar sesión/i })).toHaveAttribute(
      "href",
      "https://crm-staging.tehusrattan.com/login",
    );
  });
});
