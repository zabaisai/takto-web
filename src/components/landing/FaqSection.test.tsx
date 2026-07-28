import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { FaqSection } from "./FaqSection";
import { faq } from "@/data/landing-content";

describe("FaqSection", () => {
  it("renderiza las diez preguntas como botones accesibles", () => {
    render(<FaqSection />);

    for (const item of faq.items) {
      expect(screen.getByRole("button", { name: item.q })).toBeInTheDocument();
    }
    expect(screen.getAllByRole("button")).toHaveLength(faq.items.length);
  });

  it("abre la primera respuesta por defecto y mantiene el resto cerrado", () => {
    render(<FaqSection />);

    const first = faq.items[0]!;
    const second = faq.items[1]!;
    expect(screen.getByRole("button", { name: first.q })).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("button", { name: second.q })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });

  it("abre una respuesta al pulsar su pregunta", async () => {
    const user = userEvent.setup();
    render(<FaqSection />);

    const target = faq.items[2]!;
    const button = screen.getByRole("button", { name: target.q });
    await user.click(button);

    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText(target.a)).toBeVisible();
  });

  it("cierra la respuesta abierta al volver a pulsarla", async () => {
    const user = userEvent.setup();
    render(<FaqSection />);

    const first = faq.items[0]!;
    const button = screen.getByRole("button", { name: first.q });
    await user.click(button);

    expect(button).toHaveAttribute("aria-expanded", "false");
  });

  it("es operable con teclado", async () => {
    const user = userEvent.setup();
    render(<FaqSection />);

    const target = faq.items[1]!;
    const button = screen.getByRole("button", { name: target.q });
    button.focus();
    await user.keyboard("{Enter}");

    expect(button).toHaveAttribute("aria-expanded", "true");
  });

  it("asocia cada respuesta con su pregunta mediante aria-controls", () => {
    render(<FaqSection />);

    const first = faq.items[0]!;
    const button = screen.getByRole("button", { name: first.q });
    const panelId = button.getAttribute("aria-controls");
    expect(panelId).toBeTruthy();

    const panel = document.getElementById(panelId!);
    expect(panel).not.toBeNull();
    expect(panel).toHaveAttribute("aria-labelledby", button.id);
  });
});
