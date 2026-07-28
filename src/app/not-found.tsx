import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/LinkButton";
import { nav } from "@/data/landing-content";

export const metadata: Metadata = {
  title: "Página no encontrada",
  description: "La página que buscas no existe o cambió de dirección.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="bg-surface px-[clamp(18px,4vw,44px)] pt-[clamp(56px,7vw,104px)] pb-[clamp(64px,7vw,120px)]">
      <Container width="prose">
        <span className="font-mono text-[13px] leading-none font-semibold text-brand">
          Error 404
        </span>

        <h1 className="mt-4 font-display text-[clamp(30px,4.2vw,50px)] leading-[1.08] font-semibold tracking-[-0.025em]">
          Esta página no existe
        </h1>

        <p className="mt-4 max-w-[50ch] text-[clamp(16px,1.3vw,18px)] leading-[1.6] text-muted">
          Puede que el enlace esté desactualizado o que la dirección se haya escrito de otra forma.
          Desde aquí puedes volver al inicio o ir directamente a una sección.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <LinkButton href="/" variant="ink">
            Volver al inicio
          </LinkButton>
          <LinkButton href="/#demo" variant="outline">
            Solicitar una demostración
          </LinkButton>
        </div>

        <nav aria-label="Secciones del sitio" className="mt-10 border-t border-line pt-6">
          <h2 className="font-sans text-[11px] leading-none font-semibold tracking-[0.1em] text-subtle uppercase">
            Ir a una sección
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2.5">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={`/${item.href}`}
                  className="inline-flex min-h-11 items-center rounded-full border border-line bg-bone px-[13px] text-[13px] font-medium text-ink hover:border-brand"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </section>
  );
}
