import type { ReactNode } from "react";

type EyebrowProps = {
  children: ReactNode;
  tone?: "brand" | "gold";
  className?: string;
};

/** Etiqueta pequeña en mayúsculas que encabeza cada sección del mockup. */
export function Eyebrow({ children, tone = "brand", className = "" }: EyebrowProps) {
  const color = tone === "gold" ? "text-brand-gold" : "text-brand";
  return (
    <span
      className={`block text-[12px] leading-none font-semibold tracking-[0.1em] uppercase ${color} ${className}`}
    >
      {children}
    </span>
  );
}

type SectionTitleProps = {
  children: ReactNode;
  id?: string;
  className?: string;
  size?: "lg" | "md";
};

/** H2 de sección: Sora 600, `clamp` y tracking negativo como en el mockup. */
export function SectionTitle({
  children,
  id,
  className = "",
  size = "md",
}: SectionTitleProps) {
  const scale =
    size === "lg"
      ? "text-[clamp(28px,3.7vw,50px)]"
      : "text-[clamp(28px,3.6vw,48px)]";
  return (
    <h2
      id={id}
      className={`mt-4 font-display font-semibold ${scale} leading-[1.08] tracking-[-0.025em] ${className}`}
    >
      {children}
    </h2>
  );
}

/** Párrafo introductorio de sección. */
export function SectionLead({
  children,
  tone = "light",
  className = "",
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  const color = tone === "dark" ? "text-bone/[0.66]" : "text-muted";
  return (
    <p
      className={`mt-4 text-[clamp(16px,1.3vw,18px)] leading-[1.6] ${color} [text-wrap:pretty] ${className}`}
    >
      {children}
    </p>
  );
}
