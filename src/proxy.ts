import { NextResponse } from "next/server";

/**
 * Punto de entrada `proxy` de Next.js 16 (sustituye a `middleware.ts`).
 *
 * No aplica ninguna lógica propia por ahora: se conserva como convención para
 * futuras necesidades (cabeceras, redirecciones, etc.). El logging temporal
 * de rastreadores de Meta usado para diagnosticar la prueba RFC 9309 se
 * retiró al cerrar esa prueba: cumplió su propósito y Meta terminó aceptando
 * una URL de eliminación de datos alojada fuera de este sitio.
 */
export function proxy() {
  return NextResponse.next();
}

export const config = {
  // Páginas y robots.txt; se excluyen los assets internos de Next.
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
