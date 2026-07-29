import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Observabilidad de los rastreadores de Meta.
 *
 * Ni Caddy (sin `log` en el bloque de takto.online) ni Next standalone
 * registran las peticiones. Este middleware SOLO observa: cuando el
 * User-Agent es de Meta, escribe una línea con el método y la ruta, para poder
 * confirmar en `docker logs takto-web` que Meta re-consulta primero
 * `/robots.txt` y luego la página (p. ej. `/eliminacion-datos`). No modifica la
 * respuesta ni afecta a ninguna otra petición.
 */
const META_CRAWLER = /facebookexternalhit|facebot/i;

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get("user-agent") ?? "";
  if (META_CRAWLER.test(userAgent)) {
    console.info(
      `[meta-crawler] ${request.method} ${request.nextUrl.pathname} ua="${userAgent}"`,
    );
  }
  return NextResponse.next();
}

export const config = {
  // Páginas y robots.txt; se excluyen los assets internos de Next.
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
