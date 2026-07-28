import type { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  id?: string;
  /** Fondo de la sección, siguiendo la alternancia del mockup. */
  tone?: "bone" | "surface" | "ink";
  /** Bordes horizontales que separan bloques en el mockup. */
  border?: "none" | "top" | "bottom" | "both";
  className?: string;
  "aria-labelledby"?: string;
};

const tones = {
  bone: "bg-bone text-ink",
  surface: "bg-surface text-ink",
  ink: "bg-ink text-bone on-dark",
} as const;

const borders = {
  none: "",
  top: "border-t border-line",
  bottom: "border-b border-line",
  both: "border-y border-line",
} as const;

/** Espaciado vertical y horizontal fluido idéntico al del mockup. */
export const sectionPadding =
  "px-[clamp(18px,4vw,44px)] py-[clamp(56px,6vw,104px)]";

export function Section({
  children,
  id,
  tone = "bone",
  border = "none",
  className = "",
  ...rest
}: SectionProps) {
  const borderClass = tone === "ink" ? "" : borders[border];
  return (
    <section
      id={id}
      className={`${sectionPadding} ${tones[tone]} ${borderClass} ${className}`}
      {...rest}
    >
      {children}
    </section>
  );
}
