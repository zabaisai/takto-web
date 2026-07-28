import { process } from "@/data/landing-content";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Eyebrow, SectionTitle } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";

export function ProcessSection() {
  return (
    <Section id="comenzar" tone="surface" border="bottom" aria-labelledby="comenzar-title">
      <Container>
        <div className="max-w-[620px]">
          <Eyebrow>{process.eyebrow}</Eyebrow>
          <SectionTitle id="comenzar-title">{process.title}</SectionTitle>
        </div>

        <ol className="mt-[clamp(26px,3.2vw,42px)] grid gap-3.5 [grid-template-columns:repeat(auto-fit,minmax(min(100%,230px),1fr))]">
          {process.steps.map((step, index) => (
            <Reveal key={step.step} as="li" delay={index * 110} className="relative pt-4">
              {/* Riel base siempre visible + barra que se completa al entrar */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-0.5 overflow-hidden bg-line"
              >
                <span
                  className="proc-fill block h-full w-full origin-left bg-ink"
                  style={{ animationDelay: `${index * 110 + 120}ms` }}
                />
              </span>
              <span className="font-mono text-[11px] leading-none font-semibold text-brand">
                {step.step}
              </span>
              <h3 className="mt-[11px] font-display text-[17px] leading-[1.3] font-semibold">
                {step.title}
              </h3>
              <p className="mt-2 text-[14px] leading-[1.55] text-muted">{step.body}</p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
