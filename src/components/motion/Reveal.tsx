"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

/**
 * Entrada progresiva de un bloque de contenido.
 *
 * REGLA DE SEGURIDAD (Fase 6): el estado base es VISIBLE.
 *
 * El servidor renderiza `data-reveal="idle"`, que en CSS es opacidad 1 y sin
 * transformar. Solo después de hidratar, y solo si el elemento está por debajo
 * del pliegue, se pasa a `armed` (oculto) y se observa su entrada. Por tanto:
 *
 * - Sin JavaScript            -> visible.
 * - Sin IntersectionObserver  -> visible.
 * - `prefers-reduced-motion`  -> visible (además el CSS lo fuerza).
 * - Recarga a media página    -> lo que ya está en pantalla, visible.
 * - Volver atrás              -> visible.
 * - El observer nunca dispara -> un temporizador de respaldo lo revela.
 *
 * Nunca se oculta contenido que el usuario ya podría estar viendo.
 */

type RevealProps = {
  children: ReactNode;
  /** Retardo del escalonado, en milisegundos. */
  delay?: number;
  as?: ElementType;
  className?: string;
  id?: string;
  /** Solo para bloques puramente decorativos. Nunca para contenido esencial. */
  "aria-hidden"?: boolean;
};

/** Si el observer no responde en este tiempo, el contenido se muestra igual. */
const FAILSAFE_MS = 1200;

export function Reveal({
  children,
  delay = 0,
  as,
  className = "",
  id,
  "aria-hidden": ariaHidden,
}: RevealProps) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement>(null);
  const [state, setState] = useState<"idle" | "armed" | "in">("idle");

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion || typeof IntersectionObserver === "undefined") return;

    // Si ya está a la vista (o casi), no se oculta: se deja como está.
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) return;

    setState("armed");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          setState("in");
          observer.disconnect();
          clearTimeout(failsafe);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.01 },
    );

    observer.observe(element);

    // Respaldo: pase lo que pase, el contenido acaba visible.
    const failsafe = setTimeout(() => {
      setState("in");
      observer.disconnect();
    }, FAILSAFE_MS);

    return () => {
      observer.disconnect();
      clearTimeout(failsafe);
    };
  }, []);

  return (
    <Tag
      ref={ref}
      id={id}
      className={className}
      aria-hidden={ariaHidden}
      data-reveal={state}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
