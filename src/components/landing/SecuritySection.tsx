import { security } from "@/data/landing-content";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow, SectionTitle } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

export function SecuritySection() {
  return (
    <Section id="seguridad" tone="ink" aria-labelledby="seguridad-title" className="relative overflow-hidden">
      <Container className="relative grid gap-[clamp(28px,3.5vw,52px)] lg:grid-cols-[minmax(0,42fr)_minmax(0,58fr)]">
        <div>
          <Reveal>
            <Eyebrow tone="gold">{security.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <SectionTitle id="seguridad-title">{security.title}</SectionTitle>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-4 max-w-[48ch] text-[clamp(16px,1.3vw,18px)] leading-[1.6] text-bone/70 [text-wrap:pretty]">
              {security.body}
            </p>
          </Reveal>

          {/*
            Representación institucional de la separación entre empresas: tres
            carriles paralelos que no se cruzan. Sin candados ni estética de
            "hacker". Decorativo.
          */}
          <Reveal delay={200} className="mt-9 grid gap-3" aria-hidden>
            {["Empresa A", "Empresa B", "Empresa C"].map((label, index) => (
              <div
                key={label}
                className="flex items-center gap-3 rounded-xl border border-bone/10 bg-bone/[0.03] px-3 py-2.5"
              >
                <span className="text-[10px] leading-none font-semibold tracking-[0.08em] text-bone/45 uppercase">
                  {label}
                </span>
                <span className="relative h-1 flex-1 overflow-hidden rounded-full bg-bone/10">
                  <span
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{
                      width: `${[58, 76, 41][index]}%`,
                      background:
                        index === 1 ? "var(--color-brand-gold)" : "var(--color-brand)",
                      opacity: index === 1 ? 1 : 0.55,
                    }}
                  />
                </span>
                <span className="font-mono text-[10px] leading-none text-bone/35">aislada</span>
              </div>
            ))}
          </Reveal>
        </div>

        <ul className="grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr))]">
          {security.items.map((item, index) => (
            <Reveal
              key={item.title}
              as="li"
              delay={index * 70}
              className="rounded-[14px] border border-bone/[0.14] p-4 transition-colors duration-200 hover:border-brand-gold/35 motion-reduce:transition-none"
            >
              <b className="block font-display text-[13.5px] leading-[1.3] font-semibold">
                {item.title}
              </b>
              <i className="mt-[7px] block text-[13px] leading-[1.5] text-bone/60 not-italic">
                {item.body}
              </i>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
