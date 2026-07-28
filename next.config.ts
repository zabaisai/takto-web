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
const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "script-src 'self'" + (process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : ""),
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "manifest-src 'self'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
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
};

export default nextConfig;
