import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/**
 * Icono para iOS. Se genera en el build a partir de los mismos colores de
 * marca, sin depender de un PNG suelto en `public/`.
 */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0B0E0F",
        }}
      >
        <div style={{ display: "flex", position: "relative", width: 96, height: 96 }}>
          <div
            style={{
              position: "absolute",
              left: 6,
              bottom: 6,
              width: 30,
              height: 30,
              borderRadius: 999,
              background: "#B7790B",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 26,
              bottom: 40,
              width: 52,
              height: 7,
              borderRadius: 999,
              background: "#E5B94F",
              transform: "rotate(-45deg)",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: 8,
              top: 8,
              width: 30,
              height: 7,
              borderRadius: 999,
              background: "#E5B94F",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: 8,
              top: 8,
              width: 7,
              height: 30,
              borderRadius: 999,
              background: "#E5B94F",
            }}
          />
        </div>
      </div>
    ),
    size,
  );
}
