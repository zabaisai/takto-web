import { beforeEach, describe, expect, it, vi } from "vitest";
import { GET, POST } from "./route";
import { resetRateLimit } from "@/lib/security/rate-limit";

const validBody = {
  nombre: "María Gómez",
  empresa: "Distribuciones del Valle",
  correo: "maria@empresa.com",
  telefono: "3001234567",
  asesores: "4-10",
  necesidad: "Organizar las conversaciones de WhatsApp",
  consent: true,
};

function request(body: unknown, headers: Record<string, string> = {}) {
  return new Request("https://takto.online/api/demo", {
    method: "POST",
    headers: { "content-type": "application/json", ...headers },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

describe("POST /api/demo", () => {
  beforeEach(() => {
    resetRateLimit();
    // `restoreAllMocks` limpia el historial de llamadas entre pruebas: sin esto,
    // la aserción del honeypot vería las llamadas de los casos anteriores.
    vi.restoreAllMocks();
    vi.spyOn(console, "info").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  it("acepta una solicitud válida pero avisa de que el canal no está activo", async () => {
    // Sin NEXT_PUBLIC_CONTACT_MODE configurado el canal está en «pending».
    // La solicitud pasa validación, pero NO se finge un envío correcto.
    const response = await POST(request(validBody, { "x-forwarded-for": "203.0.113.1" }));

    expect(response.status).toBe(503);
    const body = (await response.json()) as { ok: boolean; pending: boolean; message: string };
    expect(body.ok).toBe(false);
    expect(body.pending).toBe(true);
    expect(body.message).toMatch(/no está activado/i);
  });

  it("no almacena ni registra nada mientras el canal esté pendiente", async () => {
    await POST(request(validBody, { "x-forwarded-for": "203.0.113.20" }));

    // El adaptador de destino no llega a ejecutarse: cero rastro de los datos.
    expect(console.info).not.toHaveBeenCalled();
  });

  it("rechaza una solicitud incompleta con 422 y los errores por campo", async () => {
    const response = await POST(
      request({ ...validBody, correo: "no-es-correo", consent: false }, {
        "x-forwarded-for": "203.0.113.2",
      }),
    );

    expect(response.status).toBe(422);
    const body = (await response.json()) as { errors: Record<string, string> };
    expect(body.errors.correo).toBeDefined();
    expect(body.errors.consent).toBeDefined();
  });

  it("no confía en la validación del cliente", async () => {
    const response = await POST(
      request({ nombre: "", empresa: "", correo: "", telefono: "", consent: true }, {
        "x-forwarded-for": "203.0.113.3",
      }),
    );
    expect(response.status).toBe(422);
  });

  it("descarta el envío cuando el honeypot viene relleno, sin revelarlo", async () => {
    const response = await POST(
      request({ ...validBody, website: "http://spam.example" }, {
        "x-forwarded-for": "203.0.113.4",
      }),
    );

    expect(response.status).toBe(200);
    expect(console.info).not.toHaveBeenCalled();
  });

  it("rechaza cuerpos que no son JSON", async () => {
    const response = await POST(
      new Request("https://takto.online/api/demo", {
        method: "POST",
        headers: { "content-type": "text/plain", "x-forwarded-for": "203.0.113.5" },
        body: "hola",
      }),
    );
    expect(response.status).toBe(415);
  });

  it("rechaza JSON mal formado", async () => {
    const response = await POST(request("{ roto", { "x-forwarded-for": "203.0.113.6" }));
    expect(response.status).toBe(400);
  });

  it("rechaza cuerpos excesivamente grandes", async () => {
    const response = await POST(
      request({ ...validBody, necesidad: "x".repeat(20_000) }, {
        "x-forwarded-for": "203.0.113.7",
      }),
    );
    expect(response.status).toBe(413);
  });

  it("aplica rate limiting por IP y devuelve Retry-After", async () => {
    const ip = { "x-forwarded-for": "203.0.113.8" };

    // 503 = pasó el limitador y llegó al canal (que está pendiente).
    for (let i = 0; i < 5; i += 1) {
      const passed = await POST(request(validBody, ip));
      expect(passed.status, `envío ${i + 1}`).toBe(503);
    }

    const blocked = await POST(request(validBody, ip));
    expect(blocked.status).toBe(429);
    expect(blocked.headers.get("Retry-After")).toBeTruthy();
  });

  it("no mezcla los contadores de distintas IP", async () => {
    const a = { "x-forwarded-for": "203.0.113.10" };
    const b = { "x-forwarded-for": "203.0.113.11" };

    for (let i = 0; i < 5; i += 1) await POST(request(validBody, a));
    expect((await POST(request(validBody, a))).status).toBe(429);
    expect((await POST(request(validBody, b))).status).toBe(503);
  });

  it("no filtra datos personales en la respuesta", async () => {
    const response = await POST(request(validBody, { "x-forwarded-for": "203.0.113.12" }));
    const body = JSON.stringify(await response.json());

    expect(body).not.toContain("maria@empresa.com");
    expect(body).not.toContain("3001234567");
    expect(body).not.toContain("María Gómez");
  });
});

describe("GET /api/demo", () => {
  it("no está permitido", async () => {
    const response = await GET();
    expect(response.status).toBe(405);
  });
});
