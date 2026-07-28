import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

afterEach(() => {
  cleanup();
});

// `next/font` no funciona bajo Vitest: se sustituye por objetos con las mismas claves.
vi.mock("next/font/google", () => {
  const font = () => ({ variable: "", className: "", style: { fontFamily: "sans-serif" } });
  return { Sora: font, Instrument_Sans: font, JetBrains_Mono: font };
});

// jsdom no implementa matchMedia y varios componentes lo consultan.
if (!window.matchMedia) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });
}
