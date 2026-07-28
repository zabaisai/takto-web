import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "ink" | "gold" | "outline" | "outlineDark";
type Size = "md" | "lg";

type LinkButtonProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Enlaces externos: añade rel y target. */
  external?: boolean;
};

const base =
  "inline-flex items-center justify-center rounded-xl font-semibold leading-none " +
  "transition-[transform,box-shadow,border-color,filter] duration-200 motion-reduce:transition-none";

const variants: Record<Variant, string> = {
  // Botón principal oscuro con filo dorado interior
  ink:
    "bg-ink text-bone hover:text-white " +
    "shadow-[0_1px_0_rgba(229,185,79,.55)_inset,0_10px_26px_rgba(11,14,15,.2)] " +
    "hover:shadow-[0_1px_0_rgba(229,185,79,.9)_inset,0_14px_30px_rgba(11,14,15,.28)] " +
    "hover:-translate-y-0.5 motion-reduce:hover:translate-y-0",
  // Botón dorado sobre superficies oscuras
  gold:
    "bg-linear-[160deg,var(--color-brand-gold),var(--color-brand)] text-ink " +
    "hover:brightness-[1.06] hover:-translate-y-0.5 motion-reduce:hover:translate-y-0",
  // Secundario sobre fondo claro
  outline:
    "bg-surface text-ink border border-line hover:border-brand " +
    "hover:-translate-y-0.5 motion-reduce:hover:translate-y-0",
  // Secundario sobre fondo oscuro
  outlineDark:
    "text-bone border border-bone/25 hover:border-brand-gold hover:text-white",
};

const sizes: Record<Size, string> = {
  md: "px-[22px] py-[15px] text-[15px] min-h-11",
  lg: "px-[26px] py-4 text-[15px] min-h-12",
};

export function LinkButton({
  href,
  children,
  variant = "ink",
  size = "md",
  className = "",
  external = false,
}: LinkButtonProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (external) {
    return (
      <a href={href} className={classes} rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
