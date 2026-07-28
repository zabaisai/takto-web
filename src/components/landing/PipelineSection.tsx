import { pipeline } from "@/data/landing-content";
import { PipelineMockup } from "@/components/product-mockups/PipelineMockup";
import { Container } from "@/components/ui/Container";
import { Eyebrow, SectionTitle } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";

export function PipelineSection() {
  return (
    <Section id="pipeline" tone="surface" aria-labelledby="pipeline-title">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-[22px]">
          <div className="max-w-[600px]">
            <Eyebrow>{pipeline.eyebrow}</Eyebrow>
            <SectionTitle id="pipeline-title">{pipeline.title}</SectionTitle>
          </div>
          <ul className="grid max-w-[460px] gap-x-5 gap-y-2 [grid-template-columns:repeat(auto-fit,minmax(150px,1fr))]">
            {pipeline.items.map((item) => (
              <li key={item} className="text-[13.5px] leading-[1.4] text-muted">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-[clamp(26px,3.2vw,42px)]">
          <PipelineMockup />
        </div>
      </Container>
    </Section>
  );
}
