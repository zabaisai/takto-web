/**
 * Configuración del sitio — fuente central de la identidad pública.
 *
 * Ningún componente escribe a mano el nombre de la marca, el dominio ni la
 * URL de acceso al CRM. Todo sale de aquí.
 */

const DEFAULT_SITE_URL = "https://takto.online";

/**
 * Acceso funcional al CRM de pruebas. Es un enlace operativo, NO identidad de
 * marca: por eso conserva el dominio de staging aunque la web sea TAKTO.
 * Se cambiará cuando el CRM se mueva a su dominio definitivo.
 */
const DEFAULT_LOGIN_URL = "https://crm-staging.tehusrattan.com/login";
const DEFAULT_ONBOARDING_URL = "https://crm-staging.tehusrattan.com/onboarding";

function stripTrailingSlash(value: string): string {
  return value.endsWith("/") ? value.slice(0, -1) : value;
}

export const siteUrl = stripTrailingSlash(
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || DEFAULT_SITE_URL,
);

/** Destino del botón «Ingresar». Configurable vía NEXT_PUBLIC_CRM_LOGIN_URL. */
export const crmLoginUrl = process.env.NEXT_PUBLIC_CRM_LOGIN_URL?.trim() || DEFAULT_LOGIN_URL;

/**
 * Destino del botón «Activar mi empresa».
 *
 * El onboarding exige código de invitación, así que NO se presenta como
 * registro libre: el botón va acompañado de una aclaración visible.
 */
export const crmOnboardingUrl =
  process.env.NEXT_PUBLIC_CRM_ONBOARDING_URL?.trim() || DEFAULT_ONBOARDING_URL;

/**
 * En preview y staging debe emitirse `noindex`. Solo se indexa cuando la
 * variable vale explícitamente "true" (o no está definida en producción).
 */
export const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING?.trim() !== "false";

export const brand = {
  /** Marca completa. */
  name: "TAKTO",
  /** División cromática del logotipo: TAK = principal, TO = secundario. */
  wordmark: { primary: "TAK", secondary: "TO" },
  concept: "La jugada",
  /** Frase principal, la del hero. */
  claim: "Cada oportunidad, un siguiente movimiento.",
  /** Frase comercial, para cierres y material de apoyo. */
  pitch: "Mueve oportunidades. Cierra ventas.",
} as const;

export const site = {
  name: brand.name,
  title: "TAKTO | CRM de ventas para mover oportunidades y cerrar más",
  description:
    "Centraliza conversaciones, prospectos, tareas, cotizaciones y resultados. TAKTO ayuda a tu equipo comercial a convertir cada oportunidad en un siguiente movimiento.",
  /** Descripción corta, para el manifest y las tarjetas sociales compactas. */
  shortDescription:
    "CRM comercial para organizar conversaciones, oportunidades, seguimientos, cotizaciones y cierres.",
  locale: "es_CO",
  lang: "es-CO",
  url: siteUrl,
  loginUrl: crmLoginUrl,
  onboardingUrl: crmOnboardingUrl,
} as const;

export function absoluteUrl(path: string): string {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
