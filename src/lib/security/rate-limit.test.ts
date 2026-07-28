import { beforeEach, describe, expect, it } from "vitest";
import { checkRateLimit, clientKeyFromHeaders, resetRateLimit } from "./rate-limit";

describe("checkRateLimit", () => {
  beforeEach(() => {
    resetRateLimit();
  });

  it("permite hasta el máximo configurado y bloquea el siguiente", () => {
    const now = 1_000_000;
    for (let i = 0; i < 3; i += 1) {
      expect(checkRateLimit("ip", 3, 60_000, now).allowed, `intento ${i + 1}`).toBe(true);
    }
    expect(checkRateLimit("ip", 3, 60_000, now).allowed).toBe(false);
  });

  it("informa cuántos intentos quedan", () => {
    const now = 1_000_000;
    expect(checkRateLimit("ip", 3, 60_000, now).remaining).toBe(2);
    expect(checkRateLimit("ip", 3, 60_000, now).remaining).toBe(1);
    expect(checkRateLimit("ip", 3, 60_000, now).remaining).toBe(0);
  });

  it("devuelve los segundos que faltan para reintentar", () => {
    const now = 1_000_000;
    checkRateLimit("ip", 1, 60_000, now);
    const blocked = checkRateLimit("ip", 1, 60_000, now + 10_000);
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfter).toBe(50);
  });

  it("reinicia la ventana cuando expira", () => {
    const now = 1_000_000;
    checkRateLimit("ip", 1, 60_000, now);
    expect(checkRateLimit("ip", 1, 60_000, now + 60_001).allowed).toBe(true);
  });

  it("aísla las claves entre sí", () => {
    const now = 1_000_000;
    checkRateLimit("a", 1, 60_000, now);
    expect(checkRateLimit("b", 1, 60_000, now).allowed).toBe(true);
  });
});

describe("clientKeyFromHeaders", () => {
  it("usa la primera IP de x-forwarded-for", () => {
    const headers = new Headers({ "x-forwarded-for": "203.0.113.5, 10.0.0.1" });
    expect(clientKeyFromHeaders(headers)).toBe("203.0.113.5");
  });

  it("recurre a x-real-ip", () => {
    expect(clientKeyFromHeaders(new Headers({ "x-real-ip": "203.0.113.9" }))).toBe("203.0.113.9");
  });

  it("devuelve un valor estable si no hay cabeceras", () => {
    expect(clientKeyFromHeaders(new Headers())).toBe("desconocido");
  });
});
