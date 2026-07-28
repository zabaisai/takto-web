import { render, screen, act } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Reveal } from "./Reveal";
import { Sequence } from "./Sequence";

/**
 * Seguridad del sistema de movimiento (Fase 6).
 *
 * Lo que se fija aquí: el contenido nunca depende de que el movimiento
 * funcione, y los componentes animados limpian lo que registran.
 */

type ObserverInstance = {
  observe: ReturnType<typeof vi.fn>;
  disconnect: ReturnType<typeof vi.fn>;
  unobserve: ReturnType<typeof vi.fn>;
  trigger: (isIntersecting: boolean) => void;
};

const instances: ObserverInstance[] = [];

function installObserver() {
  class FakeObserver {
    private callback: IntersectionObserverCallback;
    observe = vi.fn();
    disconnect = vi.fn();
    unobserve = vi.fn();

    constructor(callback: IntersectionObserverCallback) {
      this.callback = callback;
      instances.push({
        observe: this.observe,
        disconnect: this.disconnect,
        unobserve: this.unobserve,
        trigger: (isIntersecting: boolean) =>
          this.callback(
            [{ isIntersecting } as IntersectionObserverEntry],
            this as unknown as IntersectionObserver,
          ),
      });
    }

    takeRecords = () => [];
    root = null;
    rootMargin = "";
    thresholds = [];
  }

  vi.stubGlobal("IntersectionObserver", FakeObserver);
}

function setReducedMotion(reduce: boolean) {
  vi.stubGlobal("matchMedia", (query: string) => ({
    matches: reduce && query.includes("prefers-reduced-motion"),
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }));
}

/** Coloca el elemento por debajo del pliegue para que `Reveal` se arme. */
function placeBelowFold() {
  vi.spyOn(Element.prototype, "getBoundingClientRect").mockReturnValue({
    top: 5000,
    bottom: 5400,
    left: 0,
    right: 0,
    width: 300,
    height: 400,
    x: 0,
    y: 5000,
    toJSON: () => ({}),
  } as DOMRect);
}

describe("Reveal", () => {
  beforeEach(() => {
    instances.length = 0;
    installObserver();
    setReducedMotion(false);
    vi.stubGlobal("innerHeight", 800);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it("renderiza su contenido visible por defecto", () => {
    render(<Reveal>Contenido esencial</Reveal>);
    expect(screen.getByText("Contenido esencial")).toBeInTheDocument();
  });

  it("no oculta un elemento que ya está a la vista", () => {
    vi.spyOn(Element.prototype, "getBoundingClientRect").mockReturnValue({
      top: 100,
      height: 200,
    } as DOMRect);

    const { container } = render(<Reveal>Visible</Reveal>);
    expect(container.firstElementChild).toHaveAttribute("data-reveal", "idle");
  });

  it("arma la entrada solo si el elemento está bajo el pliegue", () => {
    placeBelowFold();
    const { container } = render(<Reveal>Abajo</Reveal>);
    expect(container.firstElementChild).toHaveAttribute("data-reveal", "armed");
  });

  it("revela el elemento cuando el observer dispara", () => {
    placeBelowFold();
    const { container } = render(<Reveal>Abajo</Reveal>);

    act(() => instances[0]?.trigger(true));
    expect(container.firstElementChild).toHaveAttribute("data-reveal", "in");
  });

  it("revela igualmente si el observer nunca dispara", () => {
    vi.useFakeTimers();
    placeBelowFold();
    const { container } = render(<Reveal>Abajo</Reveal>);

    expect(container.firstElementChild).toHaveAttribute("data-reveal", "armed");
    act(() => {
      vi.advanceTimersByTime(1500);
    });
    expect(container.firstElementChild).toHaveAttribute("data-reveal", "in");
  });

  it("no oculta nada con prefers-reduced-motion", () => {
    setReducedMotion(true);
    placeBelowFold();

    const { container } = render(<Reveal>Sin movimiento</Reveal>);
    expect(container.firstElementChild).toHaveAttribute("data-reveal", "idle");
    expect(screen.getByText("Sin movimiento")).toBeInTheDocument();
  });

  it("no oculta nada si no hay IntersectionObserver", () => {
    vi.stubGlobal("IntersectionObserver", undefined);
    placeBelowFold();

    const { container } = render(<Reveal>Sin observer</Reveal>);
    expect(container.firstElementChild).toHaveAttribute("data-reveal", "idle");
  });

  it("desconecta el observer y cancela el temporizador al desmontar", () => {
    vi.useFakeTimers();
    placeBelowFold();
    const clear = vi.spyOn(globalThis, "clearTimeout");

    const { unmount } = render(<Reveal>Abajo</Reveal>);
    unmount();

    expect(instances[0]?.disconnect).toHaveBeenCalled();
    expect(clear).toHaveBeenCalled();
  });
});

describe("Sequence", () => {
  beforeEach(() => {
    instances.length = 0;
    installObserver();
    setReducedMotion(false);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("arranca en pausa y describe el proceso", () => {
    render(
      <Sequence label="Proceso de ejemplo">
        <span>Paso</span>
      </Sequence>,
    );

    const block = screen.getByRole("img", { name: "Proceso de ejemplo" });
    expect(block).toHaveAttribute("data-seq", "idle");
    expect(screen.getByText("Paso")).toBeInTheDocument();
  });

  it("arranca la secuencia al entrar en pantalla", () => {
    render(<Sequence label="Proceso">contenido</Sequence>);

    act(() => instances[0]?.trigger(true));
    expect(screen.getByRole("img", { name: "Proceso" })).toHaveAttribute("data-seq", "run");
  });

  it("se pausa al salir de pantalla", () => {
    render(<Sequence label="Proceso">contenido</Sequence>);

    act(() => instances[0]?.trigger(true));
    act(() => instances[0]?.trigger(false));
    expect(screen.getByRole("img", { name: "Proceso" })).toHaveAttribute("data-seq", "idle");
  });

  it("se pausa cuando la pestaña deja de estar visible", () => {
    render(<Sequence label="Proceso">contenido</Sequence>);
    act(() => instances[0]?.trigger(true));

    const original = Object.getOwnPropertyDescriptor(Document.prototype, "visibilityState");
    Object.defineProperty(document, "visibilityState", {
      configurable: true,
      get: () => "hidden",
    });
    act(() => document.dispatchEvent(new Event("visibilitychange")));

    expect(screen.getByRole("img", { name: "Proceso" })).toHaveAttribute("data-seq", "idle");

    if (original) Object.defineProperty(Document.prototype, "visibilityState", original);
  });

  it("nunca arranca con prefers-reduced-motion", () => {
    setReducedMotion(true);
    render(<Sequence label="Proceso">contenido</Sequence>);

    expect(instances).toHaveLength(0);
    expect(screen.getByRole("img", { name: "Proceso" })).toHaveAttribute("data-seq", "idle");
    expect(screen.getByText("contenido")).toBeInTheDocument();
  });

  it("retira observer y listener al desmontar", () => {
    const removeListener = vi.spyOn(document, "removeEventListener");
    const { unmount } = render(<Sequence label="Proceso">contenido</Sequence>);

    unmount();

    expect(instances[0]?.disconnect).toHaveBeenCalled();
    expect(removeListener).toHaveBeenCalledWith("visibilitychange", expect.any(Function));
  });
});
