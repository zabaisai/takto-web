import { demo } from "@/data/landing-content";
import { sinkPersistsLeads } from "@/lib/leads/sink";
import { DemoForm } from "@/components/forms/DemoForm";
import { CheckDot } from "@/components/product-mockups/primitives";
import { Container } from "@/components/ui/Container";
import { Eyebrow, SectionLead, SectionTitle } from "@/components/ui/Eyebrow";
import { LinkButton } from "@/components/ui/LinkButton";
import { Section } from "@/components/ui/Section";

export function DemoSection() {
  // Se evalúa en el servidor: la variable del destino nunca llega al cliente.
  const leadsArePersisted = sinkPersistsLeads();

  return (
    <Section id="demo" aria-labelledby="demo-title">
      <Container className="grid items-start gap-[clamp(28px,3.5vw,52px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,340px),1fr))]">
        <div>
          <Eyebrow>{demo.eyebrow}</Eyebrow>
          <SectionTitle id="demo-title" className="text-[clamp(28px,3.6vw,46px)]">
            {demo.title}
          </SectionTitle>
          <SectionLead className="max-w-[46ch]">{demo.body}</SectionLead>

          <ul className="mt-[26px] grid max-w-[420px] gap-3">
            {demo.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-2.5 text-[14.5px] leading-[1.45] text-ink">
                <CheckDot />
                {bullet}
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <LinkButton href="#contacto" variant="outline">
              {demo.secondaryCta}
            </LinkButton>
          </div>
        </div>

        <div className="rounded-[20px] border border-line bg-surface p-[clamp(20px,2.4vw,32px)] shadow-[0_34px_70px_-46px_rgba(11,14,15,.5)]">
          {/*
            Mientras el destino del formulario sea el adaptador `log`, la
            solicitud NO se envía ni se almacena. Se avisa en la propia página
            en lugar de simular un envío correcto.
          */}
          {!leadsArePersisted ? (
            <p
              role="note"
              className="mb-5 rounded-[12px] border border-brand/30 bg-brand/[0.06] px-4 py-3 text-[12.5px] leading-[1.5] text-brand-deep"
            >
              <b className="font-semibold">Formulario en configuración.</b> Todavía no hay un
              destino aprobado para las solicitudes, así que este envío no se guarda ni se remite a
              nadie. Escríbenos por los canales del pie de página mientras tanto.
            </p>
          ) : null}
          <DemoForm />
        </div>
      </Container>
    </Section>
  );
}
