import { flow } from "@/data/landing-content";
import { Sequence } from "@/components/motion/Sequence";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Eyebrow, SectionTitle } from "@/components/ui/Eyebrow";
import { LinkButton } from "@/components/ui/LinkButton";

/**
 * Flujo comercial: los siete pasos que dispara una conversación, con el panel
 * del CRM que resulta de recorrerlos.
 *
 * Los pasos se iluminan progresivamente en un ciclo de 8 s y permanecen
 * encendidos. Sin animación se leen todos, en orden y completos: la secuencia
 * añade ritmo, nunca información.
 */

const CYCLE = "8s";
const STEP_GAP = 0.85;

export function FlowSection() {
  return (
    <section
      id="flujo"
      aria-labelledby="flujo-title"
      className="on-dark surface-ink-flow surface-grid relative overflow-hidden px-[clamp(18px,4vw,44px)] py-[clamp(56px,6vw,96px)] text-bone"
    >
      <Container className="relative grid gap-x-[clamp(28px,4vw,52px)] gap-y-9 lg:grid-cols-[minmax(0,50fr)_minmax(0,50fr)] lg:grid-rows-[auto_auto] lg:gap-y-8">
        {/* 1 · Texto */}
        <div className="lg:col-start-1 lg:row-start-1 lg:self-end">
          <Reveal>
            <Eyebrow tone="gold">{flow.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <SectionTitle id="flujo-title" className="max-w-[16ch]">
              {flow.title}
            </SectionTitle>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-[18px] max-w-[48ch] text-[clamp(16px,1.3vw,18px)] leading-[1.6] text-bone/75 [text-wrap:pretty]">
              {flow.body}
            </p>
          </Reveal>

          {/* Línea de tiempo */}
          <Reveal delay={200} className="mt-8">
            <Sequence
              label="Los siete pasos que recorre una conversación en Tehus CRM: nueva conversación, contacto identificado, asesor asignado, oportunidad creada, cotización en preparación, tarea programada y seguimiento realizado."
              className="relative"
            >
              {/* Riel vertical con progreso */}
              <span
                aria-hidden="true"
                className="absolute top-2 bottom-2 left-[10px] w-px bg-bone/12"
              >
                <span
                  className="seq-rail block h-full w-full origin-top bg-linear-to-b from-brand-gold via-brand to-wa"
                  style={{
                    animationName: "seq-progress",
                    animationDuration: CYCLE,
                    animationIterationCount: "infinite",
                    animationFillMode: "both",
                  }}
                />
              </span>

              <ol className="grid gap-3.5">
                {flow.steps.map((step, index) => (
                  <li key={step.title} className="relative flex gap-3.5 pl-0">
                    <span
                      aria-hidden="true"
                      className="seq-dot relative z-10 mt-1 h-[21px] w-[21px] flex-none rounded-full border-2 border-brand-gold bg-ink"
                      style={{
                        animationName: "seq-dot",
                        animationDuration: CYCLE,
                        animationDelay: `${index * STEP_GAP}s`,
                        animationIterationCount: "infinite",
                        animationFillMode: "both",
                      }}
                    >
                      <span className="absolute inset-[3px] rounded-full bg-brand-gold/70" />
                    </span>
                    <span
                      className="seq-step min-w-0 flex-1"
                      style={{
                        animationName: "seq-step",
                        animationDuration: CYCLE,
                        animationDelay: `${index * STEP_GAP}s`,
                        animationIterationCount: "infinite",
                        animationFillMode: "both",
                      }}
                    >
                      <b className="block text-[14px] leading-[1.3] font-semibold text-bone">
                        {step.title}
                      </b>
                      <i className="mt-0.5 block text-[12.5px] leading-[1.45] text-bone/60 not-italic">
                        {step.detail}
                      </i>
                    </span>
                  </li>
                ))}
              </ol>
            </Sequence>
          </Reveal>
        </div>

        {/* 2 · Panel resultante */}
        <Reveal
          delay={120}
          className="min-w-0 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center"
        >
          <FlowPanel />
        </Reveal>

        {/* 3 · CTA */}
        <Reveal delay={260} className="lg:col-start-1 lg:row-start-2 lg:self-start">
          <LinkButton href="#demo" variant="gold" size="lg">
            {flow.cta}
          </LinkButton>
        </Reveal>
      </Container>
    </section>
  );
}

function Row({
  label,
  value,
  accent,
  mono,
}: {
  label: string;
  value: string;
  accent?: "gold" | "wa";
  mono?: boolean;
}) {
  const color =
    accent === "gold" ? "text-brand-gold" : accent === "wa" ? "text-wa" : "text-bone";

  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-bone/10 py-3 last:border-b-0">
      <span className="text-[10.5px] leading-none font-semibold tracking-[0.08em] text-bone/45 uppercase">
        {label}
      </span>
      <span
        className={`text-right text-[13.5px] leading-[1.35] font-semibold ${color} ${
          mono ? "font-mono" : ""
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function FlowPanel() {
  const p = flow.panel;

  return (
    <div className="overflow-hidden rounded-[20px] border border-bone/12 bg-ink-panel shadow-[0_40px_80px_-40px_rgba(0,0,0,.8)]">
      <div className="flex items-center gap-2.5 border-b border-bone/10 bg-bone/[0.03] px-4 py-3">
        <span
          aria-hidden="true"
          className="grid h-7 w-7 flex-none place-items-center rounded-lg bg-wa/15"
        >
          <span className="block h-2.5 w-2.5 rounded-full bg-wa" />
        </span>
        <b className="font-display text-[13px] leading-none font-semibold text-bone">
          Ficha activa en el CRM
        </b>
        <span className="ml-auto rounded-full border border-brand-gold/30 bg-brand-gold/10 px-2 py-1 text-[9.5px] leading-none font-semibold text-brand-gold">
          En seguimiento
        </span>
      </div>

      <div className="px-4 py-1">
        <Row label={p.contactLabel} value={`${p.contact} · ${p.company}`} />
        <Row label={p.messageLabel} value={p.message} />
        <Row label={p.ownerLabel} value={p.owner} />
        <Row label={p.valueLabel} value={p.value} accent="gold" mono />
        <Row label={p.stageLabel} value={p.stage} accent="gold" />
        <Row label={p.nextLabel} value={p.next} accent="wa" />
      </div>

      {/* Barra de avance de etapa */}
      <div className="border-t border-bone/10 px-4 py-4">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-1.5 flex-1 rounded-full bg-brand-gold" />
          <span className="h-1.5 flex-1 rounded-full bg-brand" />
          <span className="h-1.5 flex-1 rounded-full bg-bone/15" />
          <span className="h-1.5 flex-1 rounded-full bg-bone/15" />
        </span>
        <p className="mt-2.5 text-[11.5px] leading-[1.4] text-bone/55">
          Etapa 2 de 4 · el equipo ve el mismo estado que el administrador.
        </p>
      </div>
    </div>
  );
}
