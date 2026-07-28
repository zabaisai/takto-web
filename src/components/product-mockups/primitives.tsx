import type { ReactNode } from "react";

/**
 * Piezas compartidas por los mockups de producto.
 *
 * Todas las interfaces del CRM se recrean con HTML y CSS: no hay capturas de
 * pantalla, así que el texto es real, seleccionable, accesible y nítido en
 * cualquier densidad. Los datos mostrados son ficticios.
 */

export function Avatar({
  initials,
  size = 28,
  tone = "ink",
}: {
  initials: string;
  size?: number;
  tone?: "ink" | "muted" | "brand" | "gold";
}) {
  const tones = {
    ink: "bg-ink text-brand-gold",
    muted: "bg-line-soft text-muted",
    brand: "bg-brand/15 text-brand",
    gold: "bg-brand-gold/20 text-brand-gold",
  } as const;

  return (
    <span
      aria-hidden="true"
      className={`flex flex-none items-center justify-center rounded-full text-[11px] font-semibold ${tones[tone]}`}
      style={{ width: size, height: size, fontSize: Math.max(9, Math.round(size * 0.38)) }}
    >
      {initials}
    </span>
  );
}

/** Barra de ventana del navegador que enmarca el mockup principal. */
export function BrowserChrome({ path }: { path: string }) {
  return (
    <div className="flex items-center gap-[10px] border-b border-line-soft bg-surface-soft px-[14px] py-[11px]">
      <span aria-hidden="true" className="h-[9px] w-[9px] rounded-full bg-line" />
      <span aria-hidden="true" className="h-[9px] w-[9px] rounded-full bg-line" />
      <span aria-hidden="true" className="h-[9px] w-[9px] rounded-full bg-line" />
      <span className="ml-2 truncate font-mono text-[11.5px] leading-none text-subtle">{path}</span>
    </div>
  );
}

/** Etiqueta pequeña de estado usada en toda la interfaz. */
export function Chip({
  children,
  tone = "brand",
  className = "",
}: {
  children: ReactNode;
  tone?: "brand" | "wa" | "muted" | "ink" | "danger" | "warning";
  className?: string;
}) {
  // Las etiquetas rondan los 9,5 px: siempre el tono reforzado sobre claro.
  const tones = {
    brand: "bg-brand/10 text-brand-text",
    wa: "bg-wa/[0.16] text-ink",
    muted: "bg-line-soft text-muted",
    ink: "bg-bone text-ink",
    danger: "bg-danger/5 text-danger border border-danger/30",
    warning: "bg-brand-gold/[0.22] text-brand-deep",
  } as const;

  return (
    <span
      className={`inline-block rounded-[5px] px-1.5 py-1 text-[9.5px] leading-none font-semibold ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

/** Casilla de tarea, vacía o marcada. */
export function TaskBox({
  tone = "brand",
  checked = false,
  size = 13,
}: {
  tone?: "brand" | "gold" | "danger" | "dim" | "wa";
  checked?: boolean;
  size?: number;
}) {
  const tones = {
    brand: "border-brand",
    gold: "border-brand-gold",
    danger: "border-danger",
    dim: "border-line-dim",
    wa: "border-wa bg-wa text-white",
  } as const;

  return (
    <span
      aria-hidden="true"
      className={`flex flex-none items-center justify-center rounded-[4px] border-2 text-[9px] font-bold ${tones[tone]}`}
      style={{ width: size, height: size }}
    >
      {checked ? "✓" : ""}
    </span>
  );
}

/** Marca de verificación circular de las listas de beneficios. */
export function CheckDot({ tone = "brand" }: { tone?: "brand" | "wa" | "gold" }) {
  const tones = {
    brand: "bg-brand/[0.13] text-brand",
    wa: "bg-wa/[0.18] text-wa",
    gold: "bg-brand-gold/20 text-brand-gold",
  } as const;

  return (
    <span
      aria-hidden="true"
      className={`mt-0.5 flex h-[17px] w-[17px] flex-none items-center justify-center rounded-full text-[10px] font-bold ${tones[tone]}`}
    >
      ✓
    </span>
  );
}

/** Barra de carga simulada: representa contenido sin inventar texto. */
export function SkeletonBar({
  width = "100%",
  height = 6,
  tone = "line",
}: {
  width?: string;
  height?: number;
  tone?: "line" | "faint" | "dark";
}) {
  const tones = {
    line: "bg-line",
    faint: "bg-line-faint",
    dark: "bg-bone/[0.16]",
  } as const;

  return (
    <span
      aria-hidden="true"
      className={`block rounded-full ${tones[tone]}`}
      style={{ width, height }}
    />
  );
}
