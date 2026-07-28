import { notifications } from "@/data/landing-content";
import { NotificationsMockup } from "@/components/product-mockups/NotificationsMockup";
import { Container } from "@/components/ui/Container";
import { Eyebrow, SectionLead, SectionTitle } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";

export function NotificationsSection() {
  return (
    <Section id="notificaciones" tone="surface" aria-labelledby="notificaciones-title">
      <Container className="grid items-center gap-[clamp(28px,3.5vw,52px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr))]">
        <div>
          <Eyebrow>{notifications.eyebrow}</Eyebrow>
          <SectionTitle id="notificaciones-title">{notifications.title}</SectionTitle>
          <SectionLead className="max-w-[48ch]">{notifications.body}</SectionLead>

          <ul className="mt-[22px] grid max-w-[400px] gap-[9px]">
            {notifications.preferences.map((preference) => (
              <li
                key={preference.label}
                className="flex items-center justify-between rounded-[11px] border border-line bg-surface-soft px-3.5 py-3"
              >
                <b className="text-[13px] leading-none font-medium">{preference.label}</b>
                <i
                  aria-hidden="true"
                  className={`relative block h-[19px] w-[34px] rounded-full not-italic ${
                    preference.enabled ? "bg-brand" : "bg-line"
                  }`}
                >
                  <i
                    className={`absolute top-[2.5px] block h-3.5 w-3.5 rounded-full bg-white not-italic ${
                      preference.enabled ? "right-[2.5px]" : "left-[2.5px]"
                    }`}
                  />
                </i>
                <span className="sr-only">
                  {preference.enabled ? "activado" : "desactivado"} en el ejemplo
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-center">
          <NotificationsMockup />
        </div>
      </Container>
    </Section>
  );
}
