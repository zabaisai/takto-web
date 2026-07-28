import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  /** Ancho máximo del mockup. `wide` = 1280px, `default` = 1240px, `narrow` = 1080px, `prose` = 900px */
  width?: "wide" | "default" | "narrow" | "prose";
  className?: string;
};

const widths = {
  wide: "max-w-[1280px]",
  default: "max-w-[1240px]",
  narrow: "max-w-[1080px]",
  prose: "max-w-[900px]",
} as const;

export function Container({ children, width = "default", className = "" }: ContainerProps) {
  return <div className={`mx-auto w-full ${widths[width]} ${className}`}>{children}</div>;
}
