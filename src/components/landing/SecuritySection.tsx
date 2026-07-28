import { security } from "@/data/landing-content";
import { Eyebrow, SectionTitle } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

export function SecuritySection() {
  return (
    <Section id="seguridad" tone="ink" aria-labelledby="seguridad-title">
      <Container className="grid gap-[clamp(28px,3.5vw,52px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr))]">
        <div>
          <Eyebrow tone="gold">{security.eyebrow}</Eyebrow>
          <SectionTitle id="seguridad-title">{security.title}</SectionTitle>
          <p className="mt-4 max-w-[48ch] text-[clamp(16px,1.3vw,18px)] leading-[1.6] text-bone/[0.66] [text-wrap:pretty]">
            {security.body}
          </p>
        </div>

        <ul className="grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr))]">
          {security.items.map((item) => (
            <li key={item.title} className="rounded-[14px] border border-bone/[0.14] p-4">
              <b className="block font-display text-[13.5px] leading-[1.3] font-semibold">
                {item.title}
              </b>
              <i className="mt-[7px] block text-[13px] leading-[1.5] text-bone/60 not-italic">
                {item.body}
              </i>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
