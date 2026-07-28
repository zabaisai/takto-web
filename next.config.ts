import type { NextConfig } from "next";

/**
 * Content Security Policy.
 *
 * La landing no carga recursos de terceros: las fuentes se autoalojan con `next/font`,
 * no hay analítica ni scripts externos y todas las imágenes son SVG locales o CSS puro.
 * Eso permite una CSP estricta sin `unsafe-eval`.
 *
 * `'unsafe-inline'` en `style-src` es necesario porque React inyecta estilos inline
 * (atributo `style`) y Next inserta la hoja de estilos crítica inline durante la hidratación.
 */
/**
 * `upgrade-insecure-requests` obliga al navegador a pedir por HTTPS todos los
 * subrecursos. En producción es lo correcto y va activado.
 *
 * En un preview servido por HTTP sobre una IP de red hace inservible la
 * página: el navegador no considera de confianza esa IP (a diferencia de
 * localhost), fuerza la hoja de estilos a https:// y la petición falla, así
 * que el sitio se muestra sin CSS. Por eso puede desactivarse SOLO en preview,
 * mediante `CSP_ALLOW_INSECURE_PREVIEW=1`. Nunca debe activarse en producción.
 */
const allowInsecurePreview = process.env.CSP_ALLOW_INSECURE_PREVIEW === "1";

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  /*
   * En producción el sitio no se puede enmarcar. En preview se permite el
   * enmarcado del MISMO origen para poder auditar los viewports estrechos:
   * la ventana de Chrome en Windows no baja de ~1536 px, así que la única
   * forma de ver el layout real a 360/390/430 px es renderizarlo dentro de
   * un iframe de ese ancho (`/_qa-viewports.html`).
   */
  allowInsecurePreview ? "frame-ancestors 'self'" : "frame-ancestors 'none'",
  "object-src 'none'",
  "script-src 'self'" + (process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : ""),
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "manifest-src 'self'",
  ...(allowInsecurePreview ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Cabecera heredada, redundante con `frame-ancestors`. Se omite en preview
  // por la misma razón: permitir el banco de viewports del mismo origen.
  ...(allowInsecurePreview ? [] : [{ key: "X-Frame-Options", value: "DENY" }]),
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-DNS-Prefetch-Control", value: "off" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    // La landing no usa ni una imagen rasterizada: los mockups son HTML+CSS y
    // los únicos recursos gráficos son SVG. Desactivar el optimizador deja
    // inalcanzable la ruta /_next/image, que es la que pasaría entrada
    // no confiable a libvips (`sharp`). Reversible en cuanto se añadan fotos.
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },

  /**
   * Los navegadores piden `/favicon.ico` aunque el documento declare
   * `<link rel="icon">`. Sin esto la petición devuelve 404 en cada visita.
   * El icono es un SVG generado desde `app/icon.svg`, así que se reescribe
   * en lugar de duplicar un binario.
   */
  async rewrites() {
    return [{ source: "/favicon.ico", destination: "/icon.svg" }];
  },
};

export default nextConfig;
