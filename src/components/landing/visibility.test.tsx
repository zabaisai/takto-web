import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { WhatsappSection } from "./WhatsappSection";
import { FlowSection } from "./FlowSection";
import { FinalCta } from "./FinalCta";
import { Hero } from "./Hero";
import { SecuritySection } from "./SecuritySection";
import { ProblemSection } from "./ProblemSection";
import { flow, whatsapp, finalCta } from "@/data/landing-content";

/**
 * Regresión del contenido invisible.
 *
 * La landing perdió el título, la descripción y la lista de dos secciones
 * porque su fondo se declaraba con una utilidad de fondo arbitraria que
 * mezclaba gradientes y un color sólido. Eso produce un `background-image`
 * inválido, la sección se quedaba sin fondo y el texto claro desaparecía
 * sobre el marfil de la página.
 *
 * Estas pruebas fijan dos cosas: que el contenido esencial se renderiza, y
 * que las superficies oscuras usan una clase de fondo propia en lugar de
 * volver a la utilidad arbitraria.
 */

/** Recorre el árbol buscando la clase de superficie en la propia <section>. */
function sectionOf(container: HTMLElement): HTMLElement {
  const section = container.querySelector("section");
  expect(section).not.toBeNull();
  return section as HTMLElement;
}

describe("superficies de sección", () => {
  it("WhatsApp declara su fondo con una clase propia, no con un color dentro de bg-[]", () => {
    const { container } = render(<WhatsappSection />);
    const section = sectionOf(container);

    expect(section.className).toContain("surface-ink-wa");
    expect(section.className).not.toMatch(/bg-\[.*var\(--color-/);
  });

  it("el flujo comercial declara su fondo con una clase propia", () => {
    const { container } = render(<FlowSection />);
    const section = sectionOf(container);

    expect(section.className).toContain("surface-ink-flow");
    expect(section.className).not.toMatch(/bg-\[.*var\(--color-/);
  });

  it("el CTA final declara su fondo con una clase propia", () => {
    const { container } = render(<FinalCta />);
    const section = sectionOf(container);

    expect(section.className).toContain("surface-ink-gold");
    expect(section.className).not.toMatch(/bg-\[.*var\(--color-/);
  });

  it("el hero declara su fondo con una clase propia", () => {
    const { container } = render(<Hero />);
    const section = sectionOf(container);

    expect(section.className).toContain("surface-hero");
    expect(section.className).not.toMatch(/bg-\[.*var\(--color-/);
  });
});

describe("WhatsApp Business: contenido esencial", () => {
  it("renderiza eyebrow, título, descripción, cinco beneficios y CTA", () => {
    render(<WhatsappSection />);

    expect(screen.getByText(whatsapp.eyebrow)).toBeInTheDocument();

    const heading = screen.getByRole("heading", { level: 2, name: whatsapp.title });
    expect(heading).toBeInTheDocument();

    expect(screen.getByText(whatsapp.body)).toBeInTheDocument();

    expect(whatsapp.items).toHaveLength(5);
    for (const item of whatsapp.items) {
      expect(screen.getByText(item)).toBeInTheDocument();
    }

    expect(screen.getByRole("link", { name: whatsapp.ctaPrimary })).toHaveAttribute(
      "href",
      "#demo",
    );
    expect(screen.getByText(whatsapp.disclaimer)).toBeInTheDocument();
  });

  it("no marca el título ni la descripción como ocultos para asistencia técnica", () => {
    const { container } = render(<WhatsappSection />);

    const heading = screen.getByRole("heading", { level: 2, name: whatsapp.title });
    expect(heading.closest("[aria-hidden='true']")).toBeNull();
    expect(heading.closest("[hidden]")).toBeNull();

    const body = screen.getByText(whatsapp.body);
    expect(body.closest("[aria-hidden='true']")).toBeNull();

    // La lista de beneficios es una lista real, no decoración.
    expect(container.querySelectorAll("li").length).toBeGreaterThanOrEqual(5);
  });

  it("expone las cinco etiquetas de estado de la demostración", () => {
    render(<WhatsappSection />);

    // Algunas etiquetas ("Contacto identificado") aparecen además como rótulo
    // dentro del propio mockup, así que se comprueba que exista al menos una.
    for (const stage of whatsapp.stages) {
      expect(screen.getAllByText(stage.label).length).toBeGreaterThan(0);
    }
  });

  it("describe la demostración animada para lectores de pantalla", () => {
    render(<WhatsappSection />);
    expect(screen.getByRole("img", { name: /Demostración/i })).toHaveAccessibleName(
      /datos de ejemplo/i,
    );
  });
});

describe("Flujo comercial", () => {
  it("renderiza título, descripción, los siete pasos y el CTA", () => {
    render(<FlowSection />);

    expect(screen.getByRole("heading", { level: 2, name: flow.title })).toBeInTheDocument();
    expect(screen.getByText(flow.body)).toBeInTheDocument();

    expect(flow.steps).toHaveLength(7);
    for (const step of flow.steps) {
      expect(screen.getByText(step.title)).toBeInTheDocument();
      expect(screen.getByText(step.detail)).toBeInTheDocument();
    }

    expect(screen.getByRole("link", { name: flow.cta })).toHaveAttribute("href", "#demo");
  });

  it("los pasos van en una lista ordenada", () => {
    const { container } = render(<FlowSection />);
    const list = container.querySelector("ol");
    expect(list).not.toBeNull();
    expect(within(list as HTMLElement).getAllByRole("listitem")).toHaveLength(7);
  });

  it("el panel muestra contacto, mensaje, responsable, valor, etapa y próxima actividad", () => {
    render(<FlowSection />);
    const p = flow.panel;

    expect(screen.getByText(`${p.contact} · ${p.company}`)).toBeInTheDocument();
    expect(screen.getByText(p.message)).toBeInTheDocument();
    expect(screen.getByText(p.owner)).toBeInTheDocument();
    expect(screen.getByText(p.value)).toBeInTheDocument();
    expect(screen.getByText(p.next)).toBeInTheDocument();
  });
});

describe("CTA final", () => {
  it("renderiza título, descripción y ambos botones", () => {
    render(<FinalCta />);

    expect(screen.getByRole("heading", { level: 2, name: finalCta.title })).toBeInTheDocument();
    expect(screen.getByText(finalCta.body)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: finalCta.primary })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: finalCta.secondary })).toBeInTheDocument();
  });
});

describe("títulos de sección presentes y semánticos", () => {
  const sections: Array<[string, () => React.ReactElement]> = [
    ["Hero", () => <Hero />],
    ["Problema", () => <ProblemSection />],
    ["WhatsApp", () => <WhatsappSection />],
    ["Flujo", () => <FlowSection />],
    ["Seguridad", () => <SecuritySection />],
    ["CTA final", () => <FinalCta />],
  ];

  for (const [name, renderSection] of sections) {
    it(`${name} tiene un encabezado accesible y visible`, () => {
      render(renderSection());

      const headings = screen.getAllByRole("heading", { level: name === "Hero" ? 1 : 2 });
      expect(headings.length).toBeGreaterThan(0);

      const heading = headings[0]!;
      expect(heading.textContent?.trim().length ?? 0).toBeGreaterThan(0);
      expect(heading.closest("[aria-hidden='true']")).toBeNull();
      expect(heading.closest("[hidden]")).toBeNull();
    });
  }
});

describe("los bloques revelables nacen visibles", () => {
  it("el servidor no emite ningún elemento en estado oculto", () => {
    const { container } = render(<WhatsappSection />);

    // `Reveal` renderiza data-reveal="idle" (visible). Solo pasa a "armed"
    // después de hidratar y únicamente si el bloque está bajo el pliegue.
    const armed = container.querySelectorAll('[data-reveal="armed"]');
    expect(armed).toHaveLength(0);

    const revealables = container.querySelectorAll("[data-reveal]");
    expect(revealables.length).toBeGreaterThan(0);
    for (const element of revealables) {
      expect(element.getAttribute("data-reveal")).toBe("idle");
    }
  });

  it("las secuencias arrancan pausadas, nunca ocultas", () => {
    const { container } = render(<FlowSection />);
    const sequences = container.querySelectorAll("[data-seq]");

    expect(sequences.length).toBeGreaterThan(0);
    for (const element of sequences) {
      expect(element.getAttribute("data-seq")).toBe("idle");
      // Sigue siendo describible: la información no depende del movimiento.
      expect(element.getAttribute("aria-label")).toBeTruthy();
    }
  });
});
