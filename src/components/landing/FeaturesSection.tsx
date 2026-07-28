import type { ReactNode } from "react";
import { features } from "@/data/landing-content";
import { Avatar, SkeletonBar } from "@/components/product-mockups/primitives";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Eyebrow, SectionTitle } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";

/** Icono geométrico de cada tarjeta, replicando los del mockup. */
function FeatureIcon({ id }: { id: string }) {
  const shell = "grid h-[34px] w-[34px] place-items-center rounded-[10px]";

  switch (id) {
    case "conversaciones":
      return (
        <span aria-hidden="true" className={`${shell} bg-wa/[0.13]`}>
          <span className="block h-3 w-3 rounded-full bg-wa" />
        </span>
      );
    case "pipeline":
      return (
        <span aria-hidden="true" className={`${shell} bg-brand/12`}>
          <span className="block h-[13px] w-[13px] rounded-[3px] border-2 border-brand" />
        </span>
      );
    case "contactos":
      return (
        <span aria-hidden="true" className={`${shell} bg-brand-gold/[0.16]`}>
          <span className="block h-3 w-3 rounded-[3px] bg-brand-gold" />
        </span>
      );
    case "tareas":
      return (
        <span aria-hidden="true" className={`${shell} bg-brand/12`}>
          <span className="block h-[13px] w-[13px] rounded-full border-2 border-brand border-r-transparent" />
        </span>
      );
    case "cotizaciones":
      return (
        <span aria-hidden="true" className={`${shell} bg-brand/12`}>
          <span className="block h-[14px] w-[11px] rounded-[2px] border-2 border-brand" />
        </span>
      );
    default:
      return (
        <span aria-hidden="true" className={`${shell} bg-brand/12`}>
          <span className="block h-[10px] w-[14px] border-y-2 border-brand" />
        </span>
      );
  }
}

/** Miniatura de producto dentro de cada tarjeta. */
function FeaturePreview({ id }: { id: string }) {
  switch (id) {
    case "conversaciones":
      return (
        <div className="mt-[18px] grid gap-2 rounded-xl border border-line-soft bg-surface-soft p-3">
          <span className="flex items-center justify-between">
            <b className="text-[11.5px] leading-none font-semibold">Bandeja del equipo</b>
            <i className="rounded-[5px] bg-wa/[0.18] px-1.5 py-1 text-[9.5px] leading-none font-semibold text-ink not-italic">
              En línea
            </i>
          </span>
          <span className="flex items-center gap-[7px]">
            <Avatar initials="MG" size={20} />
            <SkeletonBar />
          </span>
          <span className="flex items-center gap-[7px]">
            <Avatar initials="JT" size={20} tone="muted" />
            <SkeletonBar width="70%" />
          </span>
        </div>
      );

    case "pipeline":
      return (
        <div aria-hidden="true" className="mt-[18px] flex gap-2">
          {[
            { label: "Lead", fill: "bg-line" },
            { label: "Cotiza", fill: "bg-brand-gold" },
            { label: "Negocia", fill: "bg-brand" },
            { label: "Ganado", fill: "bg-line" },
          ].map((stage) => (
            <span
              key={stage.label}
              className="flex-1 rounded-[10px] border border-line-soft bg-surface-soft px-[7px] py-2"
            >
              <i className="block text-[8.5px] leading-none font-semibold tracking-[0.06em] text-subtle uppercase not-italic">
                {stage.label}
              </i>
              <i className={`mt-1.5 block h-[22px] rounded-md not-italic ${stage.fill}`} />
            </span>
          ))}
        </div>
      );

    case "contactos":
      return (
        <div className="mt-[18px] grid gap-[9px] rounded-xl border border-bone/[0.14] p-3">
          <span className="flex items-center gap-2">
            <Avatar initials="DV" size={22} tone="gold" />
            <b className="text-[12px] leading-none font-semibold">Distribuciones del Valle</b>
          </span>
          <SkeletonBar height={5} tone="dark" />
          <SkeletonBar height={5} width="65%" tone="dark" />
        </div>
      );

    case "tareas":
      return (
        <div className="mt-[18px] grid gap-2">
          <span className="flex items-center gap-[9px] rounded-[10px] border border-line-soft bg-surface-soft px-2.5 py-[9px]">
            <span
              aria-hidden="true"
              className="h-[13px] w-[13px] flex-none rounded-[4px] border-2 border-brand"
            />
            <b className="text-[12px] leading-none font-medium">Llamar a Jorge Torres</b>
          </span>
          <span className="flex items-center gap-[9px] rounded-[10px] border border-line-soft bg-surface-soft px-2.5 py-[9px] opacity-70">
            <span
              aria-hidden="true"
              className="h-[13px] w-[13px] flex-none rounded-[4px] border-2 border-line-dim"
            />
            <b className="text-[12px] leading-none font-medium">Enviar cotización</b>
          </span>
        </div>
      );

    case "cotizaciones":
      return (
        <div className="mt-[18px] grid gap-[7px] rounded-xl border border-line-soft bg-surface-soft p-3">
          <span className="flex justify-between">
            <i className="text-[11px] leading-none font-medium text-muted not-italic">
              Silla ejecutiva
            </i>
            <i className="font-mono text-[11px] leading-none font-semibold not-italic">
              20 × $420.000
            </i>
          </span>
          <span aria-hidden="true" className="h-px bg-line" />
          <span className="flex justify-between">
            <i className="text-[11px] leading-none font-semibold not-italic">Total</i>
            <i className="font-mono text-[11.5px] leading-none font-semibold text-brand not-italic">
              $8.400.000
            </i>
          </span>
        </div>
      );

    default:
      return (
        <div className="mt-[18px] flex flex-wrap gap-2">
          {["Administrador", "Asesor"].map((role) => (
            <span
              key={role}
              className="rounded-full border border-line bg-bone px-2.5 py-[7px] text-[11px] leading-none font-semibold text-ink"
            >
              {role}
            </span>
          ))}
          <span className="rounded-full border border-brand/25 bg-brand/10 px-2.5 py-[7px] text-[11px] leading-none font-semibold text-brand">
            Sesiones
          </span>
        </div>
      );
  }
}

function FeatureCard({
  id,
  title,
  body,
  dark,
  delay,
}: {
  id: string;
  title: string;
  body: string;
  dark: boolean;
  delay: number;
}): ReactNode {
  return (
    <Reveal
      as="article"
      delay={delay}
      className={`group rounded-[20px] p-6 transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${
        dark
          ? "on-dark border border-ink bg-ink text-bone hover:border-brand-gold/40 hover:shadow-[0_26px_52px_-30px_rgba(11,14,15,.6)]"
          : "border border-line bg-surface hover:border-brand/35 hover:shadow-[0_26px_52px_-30px_rgba(11,14,15,.4)]"
      }`}
    >
      <FeatureIcon id={id} />
      <h3 className="mt-4 font-display text-[19px] leading-[1.25] font-semibold">{title}</h3>
      <p className={`mt-[9px] text-[14.5px] leading-[1.55] ${dark ? "text-bone/[0.66]" : "text-muted"}`}>
        {body}
      </p>
      <FeaturePreview id={id} />
    </Reveal>
  );
}

export function FeaturesSection() {
  return (
    <Section id="funciones" aria-labelledby="funciones-title">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div className="max-w-[620px]">
            <Eyebrow>{features.eyebrow}</Eyebrow>
            <SectionTitle id="funciones-title" size="lg">
              {features.title}
            </SectionTitle>
          </div>
          <p className="max-w-[34ch] text-[16px] leading-[1.6] text-muted">{features.intro}</p>
        </div>

        <div className="mt-[clamp(28px,3.4vw,46px)] grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr))]">
          {features.items.map((item, index) => (
            <FeatureCard
              key={item.id}
              id={item.id}
              title={item.title}
              body={item.body}
              dark={item.id === "contactos"}
              delay={index * 80}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
