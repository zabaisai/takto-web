/**
 * Configuración del canal comercial.
 *
 * Centraliza la futura activación del formulario. HOY NO HAY NINGÚN VALOR
 * REAL: el modo por defecto es `pending`, que significa que la web no puede
 * entregar la solicitud a nadie y así se lo dice al visitante.
 *
 * Reglas mientras siga en `pending`:
 * - No se almacena información personal.
 * - No se envía nada a servicios externos.
 * - No se publica ninguna dirección de correo.
 * - El resto del sitio funciona con normalidad.
 */

export type ContactMode = "pending" | "endpoint" | "whatsapp";

const RAW_MODE = process.env.NEXT_PUBLIC_CONTACT_MODE?.trim().toLowerCase();

/** Endpoint al que se enviaría la solicitud. Vacío mientras no se apruebe. */
export const contactEndpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT?.trim() ?? "";

/** Número comercial de WhatsApp. Vacío: no se inventa ninguno. */
export const contactWhatsapp = process.env.NEXT_PUBLIC_CONTACT_WHATSAPP?.trim() ?? "";

/**
 * Un modo solo se considera activo si además tiene su destino configurado.
 * Así una variable a medias nunca hace creer que el formulario funciona.
 */
export function resolveContactMode(): ContactMode {
  if (RAW_MODE === "endpoint" && contactEndpoint) return "endpoint";
  if (RAW_MODE === "whatsapp" && contactWhatsapp) return "whatsapp";
  return "pending";
}

export const contactMode: ContactMode = resolveContactMode();

/** ¿Puede la web entregar realmente la solicitud a alguien? */
export const contactIsActive = contactMode !== "pending";

/**
 * Enlace de WhatsApp, solo si hay número configurado.
 * Devuelve null en lugar de fabricar una URL con un número inventado.
 */
export function whatsappLink(message?: string): string | null {
  if (!contactWhatsapp) return null;
  const digits = contactWhatsapp.replace(/\D/g, "");
  if (!digits) return null;
  const query = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${digits}${query}`;
}
