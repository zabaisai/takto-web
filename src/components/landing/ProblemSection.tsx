import { problem } from "@/data/landing-content";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Eyebrow, SectionTitle } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";

export function ProblemSection() {
  return (
    <Section id="producto" tone="surface" border="both" aria-labelledby="problema-title">
      <Container width="narrow">
        <Eyebrow>{problem.eyebrow}</Eyebrow>
        <SectionTitle id="problema-title" size="lg" className="max-w-[24ch]">
          {problem.title}
        </SectionTitle>
      </Container>

      <Container className="mt-[clamp(34px,4vw,54px)] grid gap-3.5 [grid-template-columns:repeat(auto-fit,minmax(min(100%,250px),1fr))]">
        {problem.items.map((item, index) => (
          <Reveal
            key={item.number}
            as="article"
            delay={index * 90}
            className="rounded-2xl border border-line bg-bone p-[22px] transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-[3px] hover:border-brand/40 hover:shadow-[0_18px_34px_-22px_rgba(11,14,15,.3)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
          >
            <span className="font-mono text-[11px] leading-none font-semibold text-brand">
              {item.number}
            </span>
            <h3 className="mt-3 font-display text-[17px] leading-[1.3] font-semibold">
              {item.title}
            </h3>
            <p className="mt-[9px] text-[14px] leading-[1.55] text-muted">{item.body}</p>
          </Reveal>
        ))}
      </Container>

      <Container className="on-dark mt-[clamp(32px,4vw,52px)] rounded-[20px] bg-ink p-[clamp(24px,3vw,40px)] text-bone">
        <p className="max-w-[58ch] font-display text-[clamp(17px,1.7vw,23px)] leading-[1.5] font-medium [text-wrap:pretty]">
          {problem.statement.lead}
          <span className="text-brand-gold">{problem.statement.highlightA}</span>
          {problem.statement.middle}
          <span className="text-brand-gold">{problem.statement.highlightB}</span>
          {problem.statement.tail}
        </p>

        <div className="mt-7 grid gap-3.5 [grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr))]">
          <div className="rounded-[14px] border border-bone/[0.14] p-[18px]">
            <h3 className="font-sans text-[11px] leading-none font-semibold tracking-[0.1em] text-bone/50 uppercase">
              {problem.before.label}
            </h3>
            <ul className="mt-3.5 grid gap-2.5">
              {problem.before.items.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2.5 text-[14.5px] leading-[1.4] text-bone/[0.62]"
                >
                  <span aria-hidden="true" className="h-[1.5px] w-3.5 flex-none bg-bone/35" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[14px] border border-brand-gold/40 bg-linear-[160deg,rgba(229,185,79,.13),rgba(229,185,79,.02)] p-[18px]">
            <h3 className="font-sans text-[11px] leading-none font-semibold tracking-[0.1em] text-brand-gold uppercase">
              {problem.after.label}
            </h3>
            <ul className="mt-3.5 grid gap-2.5">
              {problem.after.items.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2.5 text-[14.5px] leading-[1.4] font-medium text-white"
                >
                  <span
                    aria-hidden="true"
                    className="flex h-4 w-4 flex-none items-center justify-center rounded-full bg-brand-gold/20 text-[10px] font-bold text-brand-gold"
                  >
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
