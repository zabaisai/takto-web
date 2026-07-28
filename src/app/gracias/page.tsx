import type { Metadata } from "next";
import { AnchorLink } from "@/components/ui/AnchorLink";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/LinkButton";
import { demo } from "@/data/landing-content";

export const metadata: Metadata = {
  title: "Solicitud recibida",
  description: "Hemos recibido tu solicitud de demostración de TAKTO.",
  alternates: { canonical: "/gracias" },
  robots: { index: false, follow: true },
};

const steps = [
  {
    number: "01",
    title: "Revisamos tu solicitud",
    body: "Leemos lo que nos contaste sobre el proceso comercial de tu empresa.",
  },
  {
    number: "02",
    title: "Te contactamos con horarios",
    body: "Te escribimos al correo o al teléfono que registraste para agendar la sesión.",
  },
  {
    number: "03",
    title: "Preparamos la demostración",
    body: "Adaptamos la sesión a tu caso: conversaciones, pipeline, tareas y cotizaciones.",
  },
];

export default function GraciasPage() {
  return (
    <section className="bg-surface px-[clamp(18px,4vw,44px)] pt-[clamp(48px,6vw,88px)] pb-[clamp(56px,6vw,96px)]">
      <Container width="prose">
        <span
          aria-hidden="true"
          className="flex h-16 w-16 items-center justify-center rounded-full bg-wa/[0.14] text-[26px] font-bold text-wa-deep"
        >
          ✓
        </span>

        <h1 className="mt-6 font-display text-[clamp(30px,4.2vw,50px)] leading-[1.08] font-semibold tracking-[-0.025em]">
          Recibimos tu solicitud
        </h1>

        <p className="mt-4 max-w-[52ch] text-[clamp(16px,1.3vw,18px)] leading-[1.6] text-muted">
          Gracias por escribirnos. Un asesor de TAKTO te contactará para agendar la
          demostración. {demo.footnote}
        </p>

        <ol className="mt-9 grid gap-3.5 [grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr))]">
          {steps.map((step, index) => (
            <li
              key={step.number}
              className={`pt-4 ${index === 0 ? "border-t-2 border-ink" : "border-t-2 border-line"}`}
            >
              <span className="font-mono text-[11px] leading-none font-semibold text-brand">
                {step.number}
              </span>
              <h2 className="mt-2.5 font-display text-[17px] leading-[1.3] font-semibold">
                {step.title}
              </h2>
              <p className="mt-2 text-[14px] leading-[1.55] text-muted">{step.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-wrap gap-3">
          <LinkButton href="/" variant="ink">
            Volver al inicio
          </LinkButton>
          <LinkButton href="/#funciones" variant="outline">
            Seguir explorando las funciones
          </LinkButton>
        </div>

        <p className="mt-8 text-[13px] leading-[1.6] text-subtle">
          Si necesitas corregir algún dato, puedes{" "}
          <AnchorLink href="/#demo" className="text-brand underline underline-offset-2">
            enviar una nueva solicitud
          </AnchorLink>
          .
        </p>
      </Container>
    </section>
  );
}
