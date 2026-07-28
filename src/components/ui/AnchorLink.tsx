import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Enlace de navegación interna.
 *
 * Decide solo si el destino debe pasar por el router de Next o no:
 *
 * - `#seccion` y `/#seccion` son anclas dentro de la landing. Se renderizan
 *   como `<a>` normal. Si fueran `next/link`, Next haría *prefetch* del
 *   payload RSC de `/` por cada enlace visible —la cabecera y el pie tienen
 *   una docena— y abortaría los que quedan a medias, lo que hace que el
 *   cliente de React lance «Connection closed.» en consola.
 *
 * - Las rutas reales (`/privacidad`, `/gracias`, …) sí usan `next/link`, que
 *   es donde el prefetch aporta algo.
 */
export function AnchorLink({
  href,
  className = "",
  onClick,
  children,
}: {
  href: string;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}) {
  const isAnchor = href.startsWith("#") || href.startsWith("/#");

  if (isAnchor) {
    return (
      <a href={href} className={className} onClick={onClick}>
        {children}
      </a>
    );
  }

  // `exactOptionalPropertyTypes` no admite pasar `onClick` como undefined.
  return onClick ? (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  ) : (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
