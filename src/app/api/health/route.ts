import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Healthcheck del contenedor.
 *
 * No expone versiones, rutas del sistema, variables ni nada del entorno:
 * solo confirma que el proceso responde.
 */
export function GET() {
  return NextResponse.json(
    { status: "ok" },
    { status: 200, headers: { "Cache-Control": "no-store" } },
  );
}
