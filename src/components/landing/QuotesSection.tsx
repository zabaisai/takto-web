import { quotes } from "@/data/landing-content";
import { QuoteMockup } from "@/components/product-mockups/QuoteMockup";
import { Container } from "@/components/ui/Container";
import { Eyebrow, SectionLead, SectionTitle } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";

export function QuotesSection() {
  return (
    <Section id="cotizaciones" tone="surface" aria-labelledby="cotizaciones-title">
      <Container className="grid items-center gap-[clamp(28px,3.5vw,52px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,340px),1fr))]">
        <div className="order-1 lg:order-2">
          <Eyebrow>{quotes.eyebrow}</Eyebrow>
          <SectionTitle id="cotizaciones-title">{quotes.title}</SectionTitle>
          <SectionLead className="max-w-[50ch]">{quotes.body}</SectionLead>

          <ol className="mt-6 grid max-w-[440px] gap-[11px]">
            {quotes.steps.map((step, index) => (
              <li key={step} className="flex gap-2.5 text-[14.5px] leading-[1.45] text-ink">
                <span
                  aria-hidden="true"
                  className="flex h-[18px] w-[18px] flex-none items-center justify-center rounded-md bg-brand/12 text-[10px] font-bold text-brand"
                >
                  {index + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        <div className="order-2 lg:order-1">
          <QuoteMockup />
        </div>
      </Container>
    </Section>
  );
}
