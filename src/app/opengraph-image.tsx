import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Tehus CRM · Organiza WhatsApp, clientes y ventas";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Imagen social generada en el build a partir de los tokens del mockup.
 * Sin fuentes ni recursos externos: se usa la pila del sistema.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "radial-gradient(900px 500px at 82% -10%, rgba(229,185,79,0.20), transparent 62%), #0B0E0F",
          padding: 72,
          color: "#F8F5EF",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "#12161A",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: 999,
                border: "5px solid #E5B94F",
                borderRightColor: "transparent",
              }}
            />
          </div>
          <div style={{ display: "flex", fontSize: 34, fontWeight: 600, letterSpacing: -1 }}>
            <span>Tehus&nbsp;</span>
            <span style={{ color: "#B7790B" }}>CRM</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: 66,
              fontWeight: 700,
              lineHeight: 1.06,
              letterSpacing: -2.4,
              maxWidth: 900,
            }}
          >
            <span>Convierte cada conversación en una&nbsp;</span>
            <span style={{ color: "#E5B94F" }}>oportunidad de venta</span>
          </div>
          <div
            style={{
              marginTop: 26,
              fontSize: 28,
              lineHeight: 1.45,
              color: "rgba(248,245,239,0.66)",
              maxWidth: 820,
            }}
          >
            Centraliza WhatsApp, organiza tus clientes y haz seguimiento comercial desde un solo
            lugar.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 12, height: 12, borderRadius: 999, background: "#25D366" }} />
          <div style={{ fontSize: 22, color: "rgba(248,245,239,0.55)" }}>
            CRM para equipos que venden por WhatsApp
          </div>
        </div>
      </div>
    ),
    size,
  );
}
