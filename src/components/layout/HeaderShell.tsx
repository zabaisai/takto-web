"use client";

import { useEffect, useState, type ReactNode } from "react";

/**
 * Envoltura del header que reacciona al scroll.
 *
 * En el estado inicial el header es plano; al bajar más de 8 px gana opacidad
 * de fondo, desenfoque y una sombra sutil. El estado inicial ya es legible y
 * el borde inferior está siempre presente, así que si el listener no llega a
 * registrarse el header sigue siendo perfectamente usable.
 *
 * El listener es pasivo y se retira al desmontar.
 */
export function HeaderShell({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-scrolled={scrolled}
      // El desenfoque de fondo es caro: se mantiene en un único valor para que
      // el compositor no tenga que rehacer la capa al cambiar de estado, y solo
      // cambian color, borde y sombra.
      className={`sticky top-0 z-60 border-b backdrop-blur-[12px] transition-[background-color,box-shadow,border-color] duration-300 motion-reduce:transition-none ${
        scrolled
          ? "border-line bg-bone/90 shadow-[0_10px_30px_-24px_rgba(11,14,15,.5)]"
          : "border-line/60 bg-bone/70"
      }`}
    >
      {children}
    </header>
  );
}
