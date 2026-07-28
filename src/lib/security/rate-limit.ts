/**
 * Limitador de peticiones en memoria.
 *
 * Suficiente para una landing servida por un único contenedor. Si en el futuro
 * se escala a varias réplicas habrá que moverlo a un almacén compartido; el
 * contrato de `checkRateLimit` no cambiaría.
 */

type Bucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, Bucket>();

/** Evita que el mapa crezca sin límite si llegan muchas claves distintas. */
const MAX_BUCKETS = 5_000;

function pruneExpired(now: number): void {
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  /** Segundos hasta que la ventana se reinicia. */
  retryAfter: number;
};

export function checkRateLimit(
  key: string,
  max: number,
  windowMs: number,
  now: number = Date.now(),
): RateLimitResult {
  if (buckets.size > MAX_BUCKETS) pruneExpired(now);

  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: max - 1, retryAfter: 0 };
  }

  if (existing.count >= max) {
    return {
      allowed: false,
      remaining: 0,
      retryAfter: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }

  existing.count += 1;
  return { allowed: true, remaining: max - existing.count, retryAfter: 0 };
}

/** Solo para pruebas: deja el limitador en su estado inicial. */
export function resetRateLimit(): void {
  buckets.clear();
}

/**
 * Deriva la IP del cliente de las cabeceras del proxy inverso.
 * Detrás de Caddy llega en `X-Forwarded-For`.
 */
export function clientKeyFromHeaders(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return headers.get("x-real-ip")?.trim() || "desconocido";
}
