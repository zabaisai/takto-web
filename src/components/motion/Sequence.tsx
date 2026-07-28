"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Contenedor de una secuencia demostrativa en bucle.
 *
 * Su única función es decidir CUÁNDO corren las animaciones, nunca si el
 * contenido se ve. Alterna `data-seq` entre `"run"` e `"idle"`; el CSS pausa
 * los fotogramas en `"idle"` (`animation-play-state: paused`), de modo que los
 * elementos se congelan donde estén pero siguen siendo legibles.
 *
 * Se pausa cuando:
 * - el bloque sale del viewport (no gastar CPU en algo que nadie ve),
 * - la pestaña deja de estar visible (evita que se acumulen ciclos).
 *
 * Con `prefers-reduced-motion` nunca llega a arrancar, y el CSS deja además
 * cada elemento en su fotograma final legible.
 *
 * Observer y listener se retiran al desmontar.
 */

type SequenceProps = {
  children: ReactNode;
  className?: string;
  /** Descripción del proceso para lectores de pantalla. */
  label: string;
};

export function Sequence({ children, className = "", label }: SequenceProps) {
  const ref = useRef<HTMLDivElement>(null);
  // `running` solo se actualiza desde callbacks del observer y del evento de
  // visibilidad, nunca de forma síncrona dentro del efecto.
  const [running, setRunning] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion || typeof IntersectionObserver === "undefined") return;

    let onScreen = false;

    const sync = () => {
      setRunning(onScreen && document.visibilityState === "visible");
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) onScreen = entry.isIntersecting;
        sync();
      },
      { threshold: 0.15 },
    );
    observer.observe(element);

    document.addEventListener("visibilitychange", sync);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      data-seq={running ? "run" : "idle"}
      role="img"
      aria-label={label}
    >
      {children}
    </div>
  );
}
