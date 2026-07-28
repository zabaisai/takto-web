import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { DemoForm } from "./DemoForm";

const prefetch = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ prefetch, push: vi.fn(), replace: vi.fn() }),
}));

async function fillValidForm(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText("Nombre"), "María Gómez");
  await user.type(screen.getByLabelText("Empresa"), "Distribuciones del Valle");
  await user.type(screen.getByLabelText("Correo corporativo"), "maria@empresa.com");
  await user.type(screen.getByLabelText("Teléfono"), "3001234567");
  await user.selectOptions(screen.getByLabelText(/cantidad aproximada de asesores/i), "4-10");
  await user.click(screen.getByRole("checkbox"));
}

describe("DemoForm", () => {
  beforeEach(() => {
    prefetch.mockClear();
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response(JSON.stringify({ ok: true }), { status: 200 })),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("presenta todos los campos requeridos con etiquetas reales", () => {
    render(<DemoForm />);

    expect(screen.getByLabelText("Nombre")).toBeInTheDocument();
    expect(screen.getByLabelText("Empresa")).toBeInTheDocument();
    expect(screen.getByLabelText("Correo corporativo")).toBeInTheDocument();
    expect(screen.getByLabelText("Teléfono")).toBeInTheDocument();
    expect(screen.getByLabelText(/cantidad aproximada de asesores/i)).toBeInTheDocument();
    expect(screen.getByLabelText("Principal necesidad")).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  it("bloquea el envío vacío y muestra los errores asociados a cada campo", async () => {
    const user = userEvent.setup();
    render(<DemoForm />);

    await user.click(screen.getByRole("button", { name: /solicitar una demostración/i }));

    expect(await screen.findByText("Escribe tu nombre")).toBeInTheDocument();
    expect(screen.getByText("Ingresa un correo válido")).toBeInTheDocument();
    expect(screen.getByText("Necesitamos tu autorización para contactarte")).toBeInTheDocument();
    expect(global.fetch).not.toHaveBeenCalled();

    const nombre = screen.getByLabelText("Nombre");
    expect(nombre).toHaveAttribute("aria-invalid", "true");
    expect(nombre).toHaveAccessibleDescription("Escribe tu nombre");
  });

  it("limpia el error de un campo al corregirlo", async () => {
    const user = userEvent.setup();
    render(<DemoForm />);

    await user.click(screen.getByRole("button", { name: /solicitar una demostración/i }));
    expect(await screen.findByText("Escribe tu nombre")).toBeInTheDocument();

    await user.type(screen.getByLabelText("Nombre"), "María");
    expect(screen.queryByText("Escribe tu nombre")).not.toBeInTheDocument();
  });

  it("envía la solicitud y muestra la confirmación", async () => {
    const user = userEvent.setup();
    render(<DemoForm />);

    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: /solicitar una demostración/i }));

    expect(await screen.findByText("Solicitud enviada")).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledTimes(1);

    const [url, init] = (global.fetch as ReturnType<typeof vi.fn>).mock.calls[0] as [
      string,
      RequestInit,
    ];
    expect(url).toBe("/api/demo");
    expect(init.method).toBe("POST");

    const body = JSON.parse(String(init.body)) as Record<string, unknown>;
    expect(body.correo).toBe("maria@empresa.com");
    expect(body.consent).toBe(true);
  });

  it("ofrece continuar a /gracias tras el envío", async () => {
    const user = userEvent.setup();
    render(<DemoForm />);

    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: /solicitar una demostración/i }));

    const link = await screen.findByRole("link", { name: /siguientes pasos/i });
    expect(link).toHaveAttribute("href", "/gracias");
  });

  it("muestra el estado «Enviando…» mientras la petición está en vuelo", async () => {
    let release: (value: Response) => void = () => {};
    vi.stubGlobal(
      "fetch",
      vi.fn(
        () =>
          new Promise<Response>((resolve) => {
            release = resolve;
          }),
      ),
    );

    const user = userEvent.setup();
    render(<DemoForm />);

    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: /solicitar una demostración/i }));

    const button = await screen.findByRole("button", { name: /enviando/i });
    expect(button).toBeDisabled();

    release(new Response(JSON.stringify({ ok: true }), { status: 200 }));
    await waitFor(() => expect(screen.getByText("Solicitud enviada")).toBeInTheDocument());
  });

  it("no reenvía si se pulsa el botón dos veces seguidas", async () => {
    const user = userEvent.setup();
    render(<DemoForm />);

    await fillValidForm(user);
    const button = screen.getByRole("button", { name: /solicitar una demostración/i });
    await user.dblClick(button);

    await screen.findByText("Solicitud enviada");
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it("informa del error sin revelar detalles internos cuando el servidor falla", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(
        async () =>
          new Response(JSON.stringify({ ok: false, message: "No pudimos registrar tu solicitud." }), {
            status: 502,
          }),
      ),
    );

    const user = userEvent.setup();
    render(<DemoForm />);

    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: /solicitar una demostración/i }));

    expect(await screen.findByText(/no pudimos registrar tu solicitud/i)).toBeInTheDocument();
    expect(screen.queryByText("Solicitud enviada")).not.toBeInTheDocument();
  });

  it("informa cuando la red falla", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        throw new Error("network down");
      }),
    );

    const user = userEvent.setup();
    render(<DemoForm />);

    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: /solicitar una demostración/i }));

    expect(await screen.findByText(/revisa tu conexión/i)).toBeInTheDocument();
  });

  it("incluye un campo trampa fuera del orden de tabulación", () => {
    render(<DemoForm />);

    const honeypot = screen.getByLabelText("No completar este campo");
    expect(honeypot).toHaveAttribute("tabIndex", "-1");
    expect(honeypot).toHaveAttribute("name", "website");
  });

  it("enlaza a la política de tratamiento de datos junto al consentimiento", () => {
    render(<DemoForm />);

    expect(
      screen.getByRole("link", { name: /política de tratamiento de datos/i }),
    ).toHaveAttribute("href", "/tratamiento-datos");
  });
});
