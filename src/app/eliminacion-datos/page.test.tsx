import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import EliminacionDatosPage, { metadata } from "./page";

describe("Página de eliminación de datos", () => {
  it("expone metadata con título, canonical, noindex en beta y Open Graph", () => {
    expect(metadata.title).toBe("Eliminación de datos");
    expect(metadata.alternates?.canonical).toBe("/eliminacion-datos");
    expect(metadata.robots).toMatchObject({ index: false });
    expect(metadata.openGraph?.title).toContain("Eliminación de datos");
    expect(typeof metadata.description).toBe("string");
  });

  it("muestra el título y la introducción del producto", () => {
    render(<EliminacionDatosPage />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Eliminación de datos" }),
    ).toBeInTheDocument();
    expect(screen.getByText(/permite solicitar la eliminación/i)).toBeInTheDocument();
    expect(screen.getByText(/marca del producto CRM operado por Tehus Rattan/i)).toBeInTheDocument();
  });

  it("explica los escenarios de usuario del CRM e integración con WhatsApp", () => {
    render(<EliminacionDatosPage />);
    expect(screen.getByRole("heading", { name: /Usuario del CRM/i })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Integración con Meta y WhatsApp/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/desconexión de su cuenta de WhatsApp Business/i)).toBeInTheDocument();
  });

  it("indica el correo real de contacto con el asunto correcto", () => {
    render(<EliminacionDatosPage />);
    const mail = screen.getByRole("link", { name: "info@tehusrattan.com" });
    const href = mail.getAttribute("href") ?? "";
    expect(href).toContain("mailto:info@tehusrattan.com");
    expect(href).toContain(encodeURIComponent("Solicitud de eliminación de datos TAKTO"));
  });

  it("advierte que no se deben compartir secretos", () => {
    render(<EliminacionDatosPage />);
    expect(screen.getByText(/Tu contraseña\./)).toBeInTheDocument();
    expect(screen.getByText(/App Secret/)).toBeInTheDocument();
    expect(screen.getByText(/OTP/)).toBeInTheDocument();
  });

  it("no promete un plazo numérico ni un botón automático", () => {
    const { container } = render(<EliminacionDatosPage />);
    const text = container.textContent ?? "";
    expect(text).toMatch(/plazos legales aplicables/i);
    expect(text).not.toMatch(/botón de eliminación automática/i);
  });

  it("enlaza los documentos legales y el inicio", () => {
    render(<EliminacionDatosPage />);
    expect(screen.getByRole("link", { name: /Política de privacidad/i })).toHaveAttribute(
      "href",
      "/privacidad",
    );
    expect(screen.getByRole("link", { name: /Términos y condiciones/i })).toHaveAttribute(
      "href",
      "/terminos",
    );
    expect(screen.getByRole("link", { name: /tratamiento de datos/i })).toHaveAttribute(
      "href",
      "/tratamiento-datos",
    );
    expect(screen.getByRole("link", { name: /Página de inicio/i })).toHaveAttribute("href", "/");
  });

  it("no muestra marcadores [PENDIENTE] visibles en el contenido", () => {
    const { container } = render(<EliminacionDatosPage />);
    expect(container.textContent ?? "").not.toMatch(/\[PENDIENTE/i);
  });
});
