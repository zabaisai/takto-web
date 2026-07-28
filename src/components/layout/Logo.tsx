import { brand } from "@/lib/site";

type LogoProps = {
  /** 32px en el header, 30px en el footer. */
  size?: number;
  className?: string;
};

/**
 * Marca de TAKTO: cuadro oscuro con una pieza que avanza — la jugada.
 *
 * Reproducida en CSS puro, sin imágenes. Los colores salen de los tokens
 * `--color-tak` y `--color-to`, nunca de valores literales.
 */
export function LogoMark({ size = 32, className = "" }: LogoProps) {
  const inner = Math.round(size * 0.44);

  return (
    <span
      aria-hidden="true"
      className={`grid flex-none place-items-center rounded-[9px] bg-linear-[145deg,var(--color-ink-raised),var(--color-ink)] shadow-[0_2px_10px_rgba(11,14,15,.28)] ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Punto de origen + trazo del movimiento hacia adelante */}
      <span className="relative block" style={{ width: inner, height: inner }}>
        <span className="absolute bottom-0 left-0 block h-[38%] w-[38%] rounded-full bg-brand" />
        <span
          className="absolute top-0 right-0 block h-[38%] w-[38%] rounded-[2px] bg-brand-gold"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%)" }}
        />
        <span className="absolute inset-0 block rotate-45 border-t-2 border-brand-gold/50" />
      </span>
    </span>
  );
}

/**
 * Logotipo tipográfico con la división cromática obligatoria:
 * TAK en el color principal, TO en el secundario.
 *
 * `tone` decide qué tono usar según el fondo, para no perder contraste:
 * sobre marfil el secundario no es legible como texto, así que TAK va en
 * tinta y solo TO lleva el acento.
 */
export function LogoWordmark({
  className = "",
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "dark";
}) {
  const primary = tone === "dark" ? "text-bone" : "text-ink";
  const secondary = tone === "dark" ? "text-brand-gold" : "text-brand-text";

  return (
    <span
      className={`font-display text-[17px] leading-none font-semibold tracking-[-0.02em] ${className}`}
    >
      <span className={primary}>{brand.wordmark.primary}</span>
      <span className={secondary}>{brand.wordmark.secondary}</span>
    </span>
  );
}
