import type { DemoRequestInput } from "@/lib/validation/demo-request";

/**
 * Destino de las solicitudes de demostración.
 *
 * ESTADO: pendiente de aprobación del destino real.
 *
 * Mientras no exista una opción aprobada y un correo destinatario confirmado,
 * el adaptador activo es `log`: registra que llegó una solicitud, con los datos
 * enmascarados, y NO envía correos ni escribe en ningún sistema.
 *
 * Alternativas documentadas (se selecciona con la variable `DEMO_LEAD_SINK`):
 *
 *   A. `smtp`  — Envío por SMTP a un correo comercial.
 *                Requiere: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD,
 *                SMTP_FROM, DEMO_LEAD_TO y añadir un cliente SMTP como
 *                dependencia (aún no instalada, para no sumar peso sin decisión).
 *                Ventaja: sin terceros. Contra: hay que mantener credenciales.
 *
 *   B. `crm`   — POST a un endpoint del CRM que cree el lead.
 *                Requiere: CRM_LEADS_ENDPOINT, CRM_LEADS_TOKEN y trabajo en el
 *                backend del CRM. NO se activa sin autorización explícita:
 *                implica escribir en sistemas del CRM.
 *                Ventaja: el lead nace dentro del pipeline. Contra: acopla la
 *                landing al CRM y obliga a coordinar despliegues.
 *
 *   C. `forms` — Servicio externo de formularios (Formspree, Resend, etc.).
 *                Requiere: FORMS_ENDPOINT, FORMS_TOKEN.
 *                Ventaja: cero infraestructura. Contra: los datos personales
 *                salen a un tercero, lo que exige revisarlo en la política de
 *                tratamiento de datos.
 *
 *   D. Notificación a un correo comercial — es el caso concreto de la opción A
 *                o C apuntando a una única casilla de ventas.
 *
 * Ninguna opción se activa por defecto. `log` es deliberadamente inerte.
 */

export type LeadSinkKind = "log" | "smtp" | "crm" | "forms";

export type LeadSinkResult =
  | { ok: true; kind: LeadSinkKind; stored: boolean }
  | { ok: false; kind: LeadSinkKind; reason: string };

export type LeadPayload = DemoRequestInput & {
  receivedAt: string;
};

function resolveSinkKind(): LeadSinkKind {
  const raw = process.env.DEMO_LEAD_SINK?.trim().toLowerCase();
  if (raw === "smtp" || raw === "crm" || raw === "forms") return raw;
  return "log";
}

/** Enmascara el correo para que los logs no contengan datos personales completos. */
function maskEmail(email: string): string {
  const [user, domain] = email.split("@");
  if (!user || !domain) return "***";
  const visible = user.slice(0, 2);
  return `${visible}${"*".repeat(Math.max(1, user.length - 2))}@${domain}`;
}

/** Enmascara el teléfono dejando solo los dos últimos dígitos. */
function maskPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 3) return "***";
  return `${"*".repeat(digits.length - 2)}${digits.slice(-2)}`;
}

async function sinkToLog(payload: LeadPayload): Promise<LeadSinkResult> {
  // Se registra lo mínimo para saber que el formulario funciona,
  // sin volcar datos personales completos en los logs del servidor.
  console.info("[demo] solicitud recibida", {
    receivedAt: payload.receivedAt,
    empresa: payload.empresa,
    correo: maskEmail(payload.correo),
    telefono: maskPhone(payload.telefono),
    asesores: payload.asesores || "(sin especificar)",
    necesidadLength: payload.necesidad.length,
    sink: "log",
    nota: "destino real pendiente de aprobación: no se envió correo ni se almacenó nada",
  });

  return { ok: true, kind: "log", stored: false };
}

/**
 * Adaptador aún no implementado. Devuelve un fallo controlado en lugar de
 * fingir éxito, para que el problema sea visible en los logs sin exponer
 * detalles internos al visitante.
 */
function notConfigured(kind: LeadSinkKind): LeadSinkResult {
  console.error(
    `[demo] el destino "${kind}" está seleccionado pero no está implementado ni configurado`,
  );
  return { ok: false, kind, reason: "sink-not-configured" };
}

export async function deliverLead(payload: LeadPayload): Promise<LeadSinkResult> {
  const kind = resolveSinkKind();

  switch (kind) {
    case "log":
      return sinkToLog(payload);
    case "smtp":
    case "crm":
    case "forms":
      return notConfigured(kind);
  }
}

export function currentSinkKind(): LeadSinkKind {
  return resolveSinkKind();
}
