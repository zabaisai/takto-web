/**
 * Configuración del sitio.
 *
 * Único punto donde se resuelven las URLs externas. Ningún componente debe
 * escribir a mano la URL de login del CRM.
 */

const DEFAULT_SITE_URL = "https://crm.tehusrattan.com";
const DEFAULT_LOGIN_URL = "https://crm-staging.tehusrattan.com/login";

function stripTrailingSlash(value: string): string {
  return value.endsWith("/") ? value.slice(0, -1) : value;
}

export const siteUrl = stripTrailingSlash(
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || DEFAULT_SITE_URL,
);

/** Destino del botón «Iniciar sesión». Configurable vía NEXT_PUBLIC_CRM_LOGIN_URL. */
export const crmLoginUrl = process.env.NEXT_PUBLIC_CRM_LOGIN_URL?.trim() || DEFAULT_LOGIN_URL;

/**
 * En preview y staging debe emitirse `noindex`. Solo se indexa cuando la
 * variable vale explícitamente "true".
 */
export const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING?.trim() !== "false";

export const site = {
  name: "Tehus CRM",
  title: "Tehus CRM | Organiza WhatsApp, clientes y ventas",
  description:
    "Centraliza conversaciones de WhatsApp, organiza clientes, asigna asesores y administra el seguimiento comercial de tu empresa con Tehus CRM.",
  locale: "es_CO",
  lang: "es-CO",
  url: siteUrl,
  loginUrl: crmLoginUrl,
} as const;

export function absoluteUrl(path: string): string {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
