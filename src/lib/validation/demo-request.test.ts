import { describe, expect, it } from "vitest";
import {
  LIMITS,
  emptyDemoRequest,
  hasErrors,
  isHoneypotTriggered,
  normalizeDemoRequest,
  validateDemoRequest,
} from "./demo-request";

describe("normalizeDemoRequest", () => {
  it("recorta, colapsa espacios y pasa el correo a minúsculas", () => {
    const result = normalizeDemoRequest({
      nombre: "  María   Gómez  ",
      empresa: " Distribuciones  del Valle ",
      correo: "  MARIA@EMPRESA.COM ",
      telefono: " +57 (300) 123-4567 ",
      asesores: "4-10",
      necesidad: "  Organizar WhatsApp  ",
      consent: true,
    });

    expect(result.nombre).toBe("María Gómez");
    expect(result.empresa).toBe("Distribuciones del Valle");
    expect(result.correo).toBe("maria@empresa.com");
    expect(result.telefono).toBe("+57 (300) 123-4567");
    expect(result.necesidad).toBe("Organizar WhatsApp");
    expect(result.consent).toBe(true);
  });

  it("aplica el límite de longitud de cada campo", () => {
    const result = normalizeDemoRequest({
      nombre: "a".repeat(500),
      necesidad: "b".repeat(5000),
    });

    expect(result.nombre).toHaveLength(LIMITS.nombre);
    expect(result.necesidad).toHaveLength(LIMITS.necesidad);
  });

  it("descarta caracteres no telefónicos", () => {
    const result = normalizeDemoRequest({ telefono: "300<script>111</script>" });
    expect(result.telefono).not.toContain("<");
    expect(result.telefono).not.toContain("script");
  });

  it("no falla con entradas que no son objetos", () => {
    expect(normalizeDemoRequest(null)).toEqual({ ...emptyDemoRequest });
    expect(normalizeDemoRequest("texto")).toEqual({ ...emptyDemoRequest });
    expect(normalizeDemoRequest(42).consent).toBe(false);
  });

  it("interpreta el consentimiento enviado como cadena", () => {
    expect(normalizeDemoRequest({ consent: "true" }).consent).toBe(true);
    expect(normalizeDemoRequest({ consent: "on" }).consent).toBe(true);
    expect(normalizeDemoRequest({ consent: "no" }).consent).toBe(false);
  });
});

describe("validateDemoRequest", () => {
  const valid = normalizeDemoRequest({
    nombre: "María Gómez",
    empresa: "Distribuciones del Valle",
    correo: "maria@empresa.com",
    telefono: "3001234567",
    asesores: "4-10",
    necesidad: "Organizar las conversaciones",
    consent: true,
  });

  it("acepta una solicitud completa", () => {
    expect(hasErrors(validateDemoRequest(valid))).toBe(false);
  });

  it("exige nombre, empresa, correo, teléfono y consentimiento", () => {
    const errors = validateDemoRequest(emptyDemoRequest);
    expect(errors.nombre).toBeDefined();
    expect(errors.empresa).toBeDefined();
    expect(errors.correo).toBeDefined();
    expect(errors.telefono).toBeDefined();
    expect(errors.consent).toBeDefined();
  });

  it("rechaza correos mal formados", () => {
    for (const correo of ["sin-arroba", "a@b", "a@b.c", "@empresa.com"]) {
      const errors = validateDemoRequest({ ...valid, correo });
      expect(errors.correo, correo).toBeDefined();
    }
  });

  it("rechaza teléfonos con menos de siete dígitos", () => {
    expect(validateDemoRequest({ ...valid, telefono: "12345" }).telefono).toBeDefined();
    expect(validateDemoRequest({ ...valid, telefono: "3001234" }).telefono).toBeUndefined();
  });

  it("rechaza un rango de asesores que no está en la lista", () => {
    expect(validateDemoRequest({ ...valid, asesores: "999" }).asesores).toBeDefined();
  });

  it("acepta que el rango de asesores quede vacío", () => {
    expect(validateDemoRequest({ ...valid, asesores: "" }).asesores).toBeUndefined();
  });

  it("no envía sin autorización de tratamiento de datos", () => {
    expect(validateDemoRequest({ ...valid, consent: false }).consent).toBeDefined();
  });
});

describe("isHoneypotTriggered", () => {
  it("detecta el campo trampa relleno", () => {
    expect(isHoneypotTriggered({ ...emptyDemoRequest, website: "http://spam" })).toBe(true);
  });

  it("no marca las solicitudes legítimas", () => {
    expect(isHoneypotTriggered(emptyDemoRequest)).toBe(false);
  });
});
