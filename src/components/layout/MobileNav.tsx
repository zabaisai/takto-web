"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { cta, nav } from "@/data/landing-content";
import { crmLoginUrl } from "@/lib/site";

/**
 * Menú de navegación para pantallas pequeñas.
 *
 * El mockup deja que la navegación haga wrap, lo que desborda por debajo de
 * 430 px. Aquí se sustituye por un panel desplegable accesible: `aria-expanded`,
 * cierre con Escape, foco devuelto al botón y bloqueo del scroll de fondo.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    buttonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
      }
    }

    function onPointerDown(event: MouseEvent) {
      const target = event.target as Node;
      if (panelRef.current?.contains(target) || buttonRef.current?.contains(target)) return;
      setOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, close]);

  return (
    <div className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
        onClick={() => setOpen((value) => !value)}
        className="flex h-11 w-11 flex-none items-center justify-center rounded-[10px] border border-line bg-surface"
      >
        <span aria-hidden="true" className="relative block h-[14px] w-[18px]">
          <span
            className={`absolute left-0 block h-[2px] w-full rounded-full bg-ink transition-all duration-200 motion-reduce:transition-none ${
              open ? "top-[6px] rotate-45" : "top-0"
            }`}
          />
          <span
            className={`absolute top-[6px] left-0 block h-[2px] w-full rounded-full bg-ink transition-opacity duration-200 motion-reduce:transition-none ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute left-0 block h-[2px] w-full rounded-full bg-ink transition-all duration-200 motion-reduce:transition-none ${
              open ? "top-[6px] -rotate-45" : "top-[12px]"
            }`}
          />
        </span>
      </button>

      {open ? (
        <div
          id={panelId}
          ref={panelRef}
          className="absolute inset-x-0 top-full border-b border-line bg-bone/95 backdrop-blur-[14px]"
        >
          <nav aria-label="Navegación principal" className="px-[clamp(18px,4vw,44px)] py-4">
            <ul className="grid gap-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={`/${item.href}`}
                    onClick={close}
                    className="flex min-h-12 items-center rounded-[10px] px-3 text-[15px] font-medium text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-3 grid gap-2 border-t border-line pt-4">
              <a
                href={crmLoginUrl}
                rel="noopener noreferrer"
                onClick={close}
                className="flex min-h-12 items-center justify-center rounded-[10px] border border-line bg-surface text-[15px] font-semibold text-ink"
              >
                {cta.login}
              </a>
              <Link
                href="/#demo"
                onClick={close}
                className="flex min-h-12 items-center justify-center rounded-[10px] bg-ink text-[15px] font-semibold text-bone shadow-[0_1px_0_rgba(229,185,79,.55)_inset]"
              >
                {cta.primaryShort}
              </Link>
            </div>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
