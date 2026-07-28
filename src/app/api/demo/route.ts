import { NextResponse } from "next/server";
import { deliverLead } from "@/lib/leads/sink";
import { checkRateLimit, clientKeyFromHeaders } from "@/lib/security/rate-limit";
import {
  hasErrors,
  isHoneypotTriggered,
  normalizeDemoRequest,
  validateDemoRequest,
} from "@/lib/validation/demo-request";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DEFAULT_MAX = 5;
const DEFAULT_WINDOW_MS = 10 * 60 * 1000;
/** Cuerpos mayores se rechazan sin intentar interpretarlos. */
const MAX_BODY_BYTES = 8 * 1024;

function readNumericEnv(name: string, fallback: number): number {
  const parsed = Number(process.env[name]);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

/** Respuesta genérica: nunca revela por qué falló internamente. */
function genericError(status: number, message: string, extra?: Record<string, string>) {
  return NextResponse.json(
    { ok: false, message },
    extra ? { status, headers: extra } : { status },
  );
}

export async function POST(request: Request) {
  // 1 · Rate limiting por IP
  const key = clientKeyFromHeaders(request.headers);
  const limit = checkRateLimit(
    `demo:${key}`,
    readNumericEnv("DEMO_RATE_LIMIT_MAX", DEFAULT_MAX),
    readNumericEnv("DEMO_RATE_LIMIT_WINDOW_MS", DEFAULT_WINDOW_MS),
  );

  if (!limit.allowed) {
    return genericError(
      429,
      "Has enviado varias solicitudes seguidas. Inténtalo de nuevo en unos minutos.",
      { "Retry-After": String(limit.retryAfter) },
    );
  }

  // 2 · Tipo y tamaño del cuerpo
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return genericError(415, "No pudimos procesar tu solicitud.");
  }

  const declaredLength = Number(request.headers.get("content-length") ?? "0");
  if (declaredLength > MAX_BODY_BYTES) {
    return genericError(413, "La solicitud es demasiado extensa.");
  }

  let raw: unknown;
  try {
    const text = await request.text();
    if (text.length > MAX_BODY_BYTES) {
      return genericError(413, "La solicitud es demasiado extensa.");
    }
    raw = JSON.parse(text);
  } catch {
    return genericError(400, "No pudimos procesar tu solicitud.");
  }

  // 3 · Normalización y validación de servidor
  const input = normalizeDemoRequest(raw);

  // 4 · Honeypot: se responde como si hubiera funcionado para no dar pistas al bot.
  if (isHoneypotTriggered(input)) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const errors = validateDemoRequest(input);
  if (hasErrors(errors)) {
    return NextResponse.json(
      { ok: false, message: "Revisa los campos marcados para poder enviar tu solicitud.", errors },
      { status: 422 },
    );
  }

  // 5 · Entrega al destino configurado
  const result = await deliverLead({ ...input, receivedAt: new Date().toISOString() });

  if (!result.ok) {
    // El motivo queda en los logs del servidor, no en la respuesta.
    return genericError(
      502,
      "No pudimos registrar tu solicitud en este momento. Inténtalo más tarde.",
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}

/** Cualquier otro método se rechaza explícitamente. */
export async function GET() {
  return genericError(405, "Método no permitido.");
}
