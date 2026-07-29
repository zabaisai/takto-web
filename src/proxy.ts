import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Observabilidad de los rastreadores de Meta (convención `proxy` de Next.js 16,
 * sustituye a `middleware`).
 *
 * Ni Caddy (sin `log` en el bloque de takto.online) ni Next standalone
 * registran las peticiones. Este proxy SOLO observa: cuando el User-Agent es de
 * un rastreador de Meta, escribe una línea con la RUTA y la FAMILIA del
 * User-Agent, para confirmar en `docker logs takto-web` que Meta re-consulta
 * primero `/robots.txt` y luego la página (p. ej. `/eliminacion-datos`).
 *
 * Privacidad: NO registra IP, método, cookies, headers, tokens, query string ni
 * el User-Agent completo. Solo la familia (`facebookexternalhit` | `Facebot`) y
 * el `pathname` (sin querystring). El timestamp lo aporta el runtime de logs
 * (`docker logs -t`). No modifica la respuesta ni afecta a otras peticiones.
 */
export type MetaCrawlerFamily = "facebookexternalhit" | "Facebot";

/** Devuelve la familia del rastreador de Meta, o `null` si el UA no es de Meta. */
export function metaCrawlerFamily(userAgent: string): MetaCrawlerFamily | null {
  if (/facebookexternalhit/i.test(userAgent)) return "facebookexternalhit";
  if (/facebot/i.test(userAgent)) return "Facebot";
  return null;
}

export function proxy(request: NextRequest) {
  const family = metaCrawlerFamily(request.headers.get("user-agent") ?? "");
  if (family) {
    console.info(`[meta-crawler] ${request.nextUrl.pathname} ua-family=${family}`);
  }
  return NextResponse.next();
}

export const config = {
  // Páginas y robots.txt; se excluyen los assets internos de Next.
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
