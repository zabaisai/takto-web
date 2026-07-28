type LogoProps = {
  /** 32px en el header, 30px en el footer. */
  size?: number;
  className?: string;
};

/**
 * Marca de Tehus CRM: cuadro oscuro con un anillo dorado abierto.
 * Reproducido en CSS puro, igual que en el mockup.
 */
export function LogoMark({ size = 32, className = "" }: LogoProps) {
  const ring = Math.round(size * 0.41);
  return (
    <span
      aria-hidden="true"
      className={`grid flex-none place-items-center rounded-[9px] bg-linear-[145deg,var(--color-ink-raised),var(--color-ink)] shadow-[0_2px_10px_rgba(11,14,15,.28)] ${className}`}
      style={{ width: size, height: size }}
    >
      <span
        className="block rounded-full border-[2.5px] border-brand-gold border-r-transparent"
        style={{ width: ring, height: ring }}
      />
    </span>
  );
}

export function LogoWordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display text-[17px] leading-none font-semibold tracking-[-0.02em] ${className}`}>
      Tehus<span className="text-brand"> CRM</span>
    </span>
  );
}
