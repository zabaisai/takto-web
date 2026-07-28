import { tasks } from "@/data/landing-content";
import { TasksMockup } from "@/components/product-mockups/TasksMockup";
import { Container } from "@/components/ui/Container";
import { Eyebrow, SectionLead, SectionTitle } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";

export function TasksSection() {
  return (
    <Section id="tareas" border="both" aria-labelledby="tareas-title">
      <Container className="grid items-center gap-[clamp(28px,3.5vw,52px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,340px),1fr))]">
        <div>
          <Eyebrow>{tasks.eyebrow}</Eyebrow>
          <SectionTitle id="tareas-title">{tasks.title}</SectionTitle>
          <SectionLead className="max-w-[50ch]">{tasks.body}</SectionLead>

          <ul className="mt-6 flex flex-wrap gap-2.5">
            {tasks.chips.map((chip) => (
              <li
                key={chip}
                className="rounded-full border border-line bg-surface px-[13px] py-2.5 text-[13px] leading-none font-medium text-ink"
              >
                {chip}
              </li>
            ))}
          </ul>
        </div>

        <TasksMockup />
      </Container>
    </Section>
  );
}
