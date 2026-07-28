import { team } from "@/data/landing-content";
import { TeamMockup } from "@/components/product-mockups/TeamMockup";
import { Container } from "@/components/ui/Container";
import { Eyebrow, SectionLead, SectionTitle } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";

export function TeamSection() {
  return (
    <Section id="equipo" tone="surface" border="top" aria-labelledby="equipo-title">
      <Container>
        <div className="max-w-[660px]">
          <Eyebrow>{team.eyebrow}</Eyebrow>
          <SectionTitle id="equipo-title">{team.title}</SectionTitle>
          <SectionLead>{team.body}</SectionLead>
        </div>

        <div className="mt-[clamp(26px,3.2vw,44px)] grid gap-3.5 [grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr))]">
          {team.roles.map((role) => (
            <article
              key={role.code}
              className={`rounded-[18px] p-[22px] ${
                role.tone === "dark"
                  ? "on-dark bg-ink text-bone"
                  : "border border-line bg-bone"
              }`}
            >
              <span
                className={`font-mono text-[10px] leading-none font-semibold tracking-[0.06em] ${
                  role.tone === "dark"
                    ? "text-brand-gold"
                    : role.code === "ADMIN"
                      ? "text-brand"
                      : "text-muted"
                }`}
              >
                {role.code}
              </span>
              <h3 className="mt-3.5 font-display text-[18px] leading-[1.25] font-semibold">
                {role.title}
              </h3>
              <p
                className={`mt-[9px] text-[14px] leading-[1.55] ${
                  role.tone === "dark" ? "text-bone/[0.66]" : "text-muted"
                }`}
              >
                {role.body}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-4 grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr))]">
          <TeamMockup />
        </div>
      </Container>
    </Section>
  );
}
