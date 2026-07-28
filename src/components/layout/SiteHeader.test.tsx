import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { SiteHeader } from "./SiteHeader";
import { nav } from "@/data/landing-content";

describe("SiteHeader", () => {
  it("muestra la marca y todos los enlaces de navegación", () => {
    render(<SiteHeader />);

    const navigation = screen.getByRole("navigation", { name: /navegación principal/i });
    for (const item of nav) {
      expect(within(navigation).getByRole("link", { name: item.label })).toBeInTheDocument();
    }
  });

  it("apunta «Iniciar sesión» a la URL del CRM que resuelve la configuración", () => {
    render(<SiteHeader />);

    const login = screen.getAllByRole("link", { name: /iniciar sesión/i })[0];
    expect(login).toHaveAttribute("href", "https://crm-staging.tehusrattan.com/login");
  });

  it("lleva el CTA principal al formulario de demostración", () => {
    render(<SiteHeader />);

    const ctaLink = screen.getByRole("link", { name: /solicitar demostración/i });
    expect(ctaLink).toHaveAttribute("href", "/#demo");
  });
});

describe("navegación móvil", () => {
  it("empieza cerrada y anuncia su estado", () => {
    render(<SiteHeader />);

    const toggle = screen.getByRole("button", { name: /abrir menú/i });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it("abre el panel y expone los enlaces al pulsarlo", async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);

    await user.click(screen.getByRole("button", { name: /abrir menú/i }));

    const toggle = screen.getByRole("button", { name: /cerrar menú/i });
    expect(toggle).toHaveAttribute("aria-expanded", "true");

    const panels = screen.getAllByRole("navigation", { name: /navegación principal/i });
    const mobilePanel = panels[panels.length - 1];
    expect(mobilePanel).toBeDefined();
    expect(within(mobilePanel!).getByRole("link", { name: "WhatsApp" })).toBeInTheDocument();
  });

  it("se cierra con la tecla Escape", async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);

    await user.click(screen.getByRole("button", { name: /abrir menú/i }));
    await user.keyboard("{Escape}");

    expect(screen.getByRole("button", { name: /abrir menú/i })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });

  it("se cierra al elegir un enlace", async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);

    await user.click(screen.getByRole("button", { name: /abrir menú/i }));
    const panels = screen.getAllByRole("navigation", { name: /navegación principal/i });
    const mobilePanel = panels[panels.length - 1]!;
    await user.click(within(mobilePanel).getByRole("link", { name: "Seguridad" }));

    expect(screen.getByRole("button", { name: /abrir menú/i })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });
});
