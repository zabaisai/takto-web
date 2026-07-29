import type { ReactNode } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { isBeta } from "@/lib/site";

/**
 * Marco común de las páginas legales.
 *
 * Todas se publican explícitamente como BORRADOR: no hay documento jurídico
 * aprobado, así que ningún texto puede presentarse como definitivo.
 */
export function LegalLayout({
  title,
  updated,
  hasPendingFields = true,
  children,
}: {
  title: string;
  updated: string;
  /**
   * Si el documento aún contiene marcadores <Pending>, el aviso explica los
   * códigos [PENDIENTE]. Las páginas sin campos pendientes (p. ej. la de
   * eliminación de datos) lo desactivan para no mostrar códigos que no existen.
   */
  hasPendingFields?: boolean;
  children: ReactNode;
}) {
  return (
    <article className="bg-surface px-[clamp(18px,4vw,44px)] pt-[clamp(40px,5vw,72px)] pb-[clamp(56px,6vw,96px)]">
      <Container width="prose">
        <nav aria-label="Ruta de navegación" className="text-[13px] leading-none text-muted">
          <Link href="/" className="text-brand hover:text-ink">
            Inicio
          </Link>
          <span aria-hidden="true" className="px-2 text-subtle">
            /
          </span>
          <span>{title}</span>
        </nav>

        <h1 className="mt-5 font-display text-[clamp(30px,4vw,46px)] leading-[1.1] font-semibold tracking-[-0.025em]">
          {title}
        </h1>

        <p className="mt-3 font-mono text-[12px] leading-none text-subtle">{updated}</p>

        <div
          role="note"
          className="mt-6 rounded-[14px] border border-brand/30 bg-brand/[0.06] p-4"
        >
          <b className="block text-[13px] leading-[1.4] font-semibold text-brand-deep">
            {isBeta
              ? "Borrador informativo · versión beta · pendiente de revisión jurídica"
              : "Documento en borrador · pendiente de revisión jurídica"}
          </b>
          <p className="mt-1.5 text-[13px] leading-[1.55] text-muted">
            Este texto es una base de trabajo y no constituye un documento legal definitivo.{" "}
            {hasPendingFields ? (
              <>
                Los campos marcados como{" "}
                <code className="font-mono text-[12px]">[PENDIENTE]</code> deben completarse con la
                información societaria real antes de su publicación.{" "}
              </>
            ) : null}
            No debe invocarse como política vigente hasta contar con validación jurídica y
            autorización expresa.
          </p>
        </div>

        <div className="legal-body mt-8">{children}</div>
      </Container>
    </article>
  );
}

/** Encabezado de apartado dentro de un documento legal. */
export function LegalHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="mt-9 font-display text-[clamp(19px,2vw,24px)] leading-[1.3] font-semibold">
      {children}
    </h2>
  );
}

export function LegalText({ children }: { children: ReactNode }) {
  return <p className="mt-3.5 text-[15px] leading-[1.7] text-muted">{children}</p>;
}

export function LegalList({ items }: { items: readonly ReactNode[] }) {
  return (
    <ul className="mt-3.5 grid gap-2.5">
      {items.map((item, index) => (
        <li
          key={index}
          className="flex gap-2.5 text-[15px] leading-[1.6] text-muted"
        >
          <span aria-hidden="true" className="mt-[10px] h-1 w-1 flex-none rounded-full bg-brand" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Marcador visible para la información societaria que aún no existe. */
export function Pending({ children }: { children: ReactNode }) {
  return (
    <mark className="rounded-[4px] bg-brand-gold/25 px-1.5 py-0.5 font-mono text-[13px] text-ink">
      [PENDIENTE: {children}]
    </mark>
  );
}
