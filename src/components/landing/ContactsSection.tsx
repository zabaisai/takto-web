import { contacts } from "@/data/landing-content";
import { ContactMockup } from "@/components/product-mockups/ContactMockup";
import { CheckDot } from "@/components/product-mockups/primitives";
import { Container } from "@/components/ui/Container";
import { Eyebrow, SectionLead, SectionTitle } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";

export function ContactsSection() {
  return (
    <Section id="contactos" aria-labelledby="contactos-title">
      <Container>
        <div className="max-w-[680px]">
          <Eyebrow>{contacts.eyebrow}</Eyebrow>
          <SectionTitle id="contactos-title">{contacts.title}</SectionTitle>
          <SectionLead>{contacts.body}</SectionLead>
        </div>

        <ul className="mt-6 grid max-w-[900px] gap-3 [grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr))]">
          {contacts.items.map((item) => (
            <li key={item} className="flex gap-2.5 text-[14.5px] leading-[1.45] text-ink">
              <CheckDot />
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-[clamp(26px,3.2vw,42px)]">
          <ContactMockup />
        </div>
      </Container>
    </Section>
  );
}
