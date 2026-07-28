import { conversations } from "@/data/landing-content";
import { InboxMockup } from "@/components/product-mockups/InboxMockup";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Eyebrow, SectionLead, SectionTitle } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";

export function ConversationsSection() {
  return (
    <Section id="conversaciones" tone="surface" border="bottom" aria-labelledby="conversaciones-title">
      <Container>
        <Reveal className="max-w-[680px]">
          <Eyebrow>{conversations.eyebrow}</Eyebrow>
          <SectionTitle id="conversaciones-title">{conversations.title}</SectionTitle>
          <SectionLead>{conversations.body}</SectionLead>
        </Reveal>

        <Reveal delay={120} className="mt-[clamp(28px,3.4vw,44px)]">
          <InboxMockup />
        </Reveal>
      </Container>
    </Section>
  );
}
