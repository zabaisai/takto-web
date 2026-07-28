/**
 * Validación de la solicitud de demostración.
 *
 * El mismo módulo se usa en cliente y servidor: el navegador da respuesta
 * inmediata y el servidor vuelve a validar sin confiar en nada del cliente.
 * Se escribe a mano para no añadir dependencias.
 */

export const ADVISOR_RANGES = ["1-3", "4-10", "11-25", "25+"] as const;
export type AdvisorRange = (typeof ADVISOR_RANGES)[number];

export const LIMITS = {
  nombre: 80,
  empresa: 120,
  correo: 160,
  telefono: 30,
  necesidad: 1000,
} as const;

export type DemoRequestInput = {
  nombre: string;
  empresa: string;
  correo: string;
  telefono: string;
  asesores: string;
  necesidad: string;
  consent: boolean;
  /** Campo trampa: debe llegar vacío. Los humanos no lo ven. */
  website?: string;
};

export type DemoRequestErrors = Partial<Record<keyof DemoRequestInput, string>>;

export const emptyDemoRequest: DemoRequestInput = {
  nombre: "",
  empresa: "",
  correo: "",
  telefono: "",
  asesores: "",
  necesidad: "",
  consent: false,
  website: "",
};

/** Colapsa espacios, recorta y aplica el límite de longitud del campo. */
function normalizeText(value: unknown, maxLength: number): string {
  if (typeof value !== "string") return "";
  return value.replace(/\s+/g, " ").trim().slice(0, maxLength);
}

/** El correo se normaliza además a minúsculas. */
function normalizeEmail(value: unknown): string {
  return normalizeText(value, LIMITS.correo).toLowerCase();
}

/** Conserva dígitos, `+`, espacios, guiones y paréntesis. */
function normalizePhone(value: unknown): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/[^\d+()\-\s]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, LIMITS.telefono);
}

export function normalizeDemoRequest(raw: unknown): DemoRequestInput {
  const source = (typeof raw === "object" && raw !== null ? raw : {}) as Record<string, unknown>;

  return {
    nombre: normalizeText(source.nombre, LIMITS.nombre),
    empresa: normalizeText(source.empresa, LIMITS.empresa),
    correo: normalizeEmail(source.correo),
    telefono: normalizePhone(source.telefono),
    asesores: normalizeText(source.asesores, 10),
    // La necesidad conserva saltos de línea: solo se recorta y se limita.
    necesidad:
      typeof source.necesidad === "string"
        ? source.necesidad.trim().slice(0, LIMITS.necesidad)
        : "",
    consent: source.consent === true || source.consent === "true" || source.consent === "on",
    website: typeof source.website === "string" ? source.website.trim() : "",
  };
}

const EMAIL_PATTERN = /^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i;

export function validateDemoRequest(input: DemoRequestInput): DemoRequestErrors {
  const errors: DemoRequestErrors = {};

  if (!input.nombre) {
    errors.nombre = "Escribe tu nombre";
  } else if (input.nombre.length < 2) {
    errors.nombre = "El nombre es demasiado corto";
  }

  if (!input.empresa) {
    errors.empresa = "Escribe el nombre de tu empresa";
  }

  if (!EMAIL_PATTERN.test(input.correo)) {
    errors.correo = "Ingresa un correo válido";
  }

  if (input.telefono.replace(/\D/g, "").length < 7) {
    errors.telefono = "Ingresa un teléfono de contacto";
  }

  if (input.asesores && !ADVISOR_RANGES.includes(input.asesores as AdvisorRange)) {
    errors.asesores = "Selecciona una opción de la lista";
  }

  if (input.necesidad.length > LIMITS.necesidad) {
    errors.necesidad = `Máximo ${LIMITS.necesidad} caracteres`;
  }

  if (!input.consent) {
    errors.consent = "Necesitamos tu autorización para contactarte";
  }

  return errors;
}

export function hasErrors(errors: DemoRequestErrors): boolean {
  return Object.keys(errors).length > 0;
}

/** El honeypot solo lo rellenan los bots. */
export function isHoneypotTriggered(input: DemoRequestInput): boolean {
  return Boolean(input.website);
}
