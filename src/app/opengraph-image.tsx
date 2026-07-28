import { ImageResponse } from "next/og";
import { brand, site } from "@/lib/site";

export const runtime = "nodejs";
export const alt = `${site.name} · ${brand.pitch}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Imagen social generada en el build.
 *
 * Los literales de color viven aquí porque Satori resuelve los estilos en el
 * servidor y no tiene acceso a las variables CSS de la hoja de estilos. Son
 * los mismos valores de `--color-tak` y `--color-to`: al cambiar la ruta
 * cromática hay que actualizarlos también en este archivo.
 */
const TAK = "#B7790B";
const TO = "#E5B94F";
const INK = "#0B0E0F";
const BONE = "#F8F5EF";

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
          background: `radial-gradient(900px 500px at 82% -10%, rgba(229,185,79,0.22), transparent 62%), ${INK}`,
          padding: 72,
          color: BONE,
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
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 14,
                bottom: 14,
                width: 14,
                height: 14,
                borderRadius: 999,
                background: TAK,
              }}
            />
            <div
              style={{
                position: "absolute",
                right: 13,
                top: 13,
                width: 22,
                height: 5,
                borderRadius: 999,
                background: TO,
              }}
            />
            <div
              style={{
                position: "absolute",
                right: 13,
                top: 13,
                width: 5,
                height: 22,
                borderRadius: 999,
                background: TO,
              }}
            />
          </div>
          <div style={{ display: "flex", fontSize: 36, fontWeight: 700, letterSpacing: -1 }}>
            <span>{brand.wordmark.primary}</span>
            <span style={{ color: TO }}>{brand.wordmark.secondary}</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: 68,
              fontWeight: 700,
              lineHeight: 1.06,
              letterSpacing: -2.4,
              maxWidth: 940,
            }}
          >
            <span>Cada oportunidad, un&nbsp;</span>
            <span style={{ color: TO }}>siguiente movimiento</span>
          </div>
          <div
            style={{
              marginTop: 26,
              fontSize: 28,
              lineHeight: 1.45,
              color: "rgba(248,245,239,0.68)",
              maxWidth: 860,
            }}
          >
            {site.shortDescription}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 12, height: 12, borderRadius: 999, background: TAK }} />
          <div style={{ fontSize: 22, color: "rgba(248,245,239,0.6)" }}>{brand.pitch}</div>
        </div>
      </div>
    ),
    size,
  );
}
