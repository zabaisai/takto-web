import { whatsapp } from "@/data/landing-content";
import { WhatsappFlowMockup } from "@/components/product-mockups/WhatsappFlowMockup";
import { CheckDot } from "@/components/product-mockups/primitives";
import { Reveal } from "@/components/motion/Reveal";
import { LinkButton } from "@/components/ui/LinkButton";
import { SectionTitle } from "@/components/ui/Eyebrow";

/**
 * Sección protagonista de WhatsApp Business. Composición 45/55 en escritorio.
 *
 * El orden de apilado en móvil (eyebrow, título, descripción, beneficios,
 * mockup, CTA) lo gobierna el propio grid: el texto, el mockup y el CTA son
 * tres hijos hermanos. En escritorio se recolocan en dos columnas con el
 * mockup ocupando ambas filas de la derecha.
 *
 * El verde de WhatsApp solo se usa aquí y en elementos de mensajería.
 */
export function WhatsappSection() {
  return (
    <section
      id="whatsapp"
      aria-labelledby="whatsapp-title"
      className="on-dark surface-ink-wa surface-grid relative overflow-hidden px-[clamp(18px,4vw,44px)] py-[clamp(56px,6vw,96px)] text-bone"
    >
      <div className="relative mx-auto grid w-full max-w-[1240px] gap-x-[clamp(28px,4vw,52px)] gap-y-9 lg:grid-cols-[minmax(0,45fr)_minmax(0,55fr)] lg:grid-rows-[auto_auto] lg:gap-y-8">
        {/* 1 · Eyebrow, título, descripción y beneficios */}
        <div className="lg:col-start-1 lg:row-start-1 lg:self-end">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-wa/30 bg-wa/12 px-3 py-2 text-[12px] leading-none font-semibold tracking-[0.1em] text-wa uppercase">
              <span aria-hidden="true" className="block h-1.5 w-1.5 rounded-full bg-wa" />
              {whatsapp.eyebrow}
            </span>
          </Reveal>

          <Reveal delay={80}>
            <SectionTitle id="whatsapp-title" className="mt-5 max-w-[19ch]">
              {whatsapp.title}
            </SectionTitle>
          </Reveal>

          <Reveal delay={140}>
            <p className="mt-[18px] max-w-[50ch] text-[clamp(16px,1.3vw,18px)] leading-[1.6] text-bone/75 [text-wrap:pretty]">
              {whatsapp.body}
            </p>
          </Reveal>

          <Reveal delay={200} as="ul" className="mt-7 grid gap-3">
            {whatsapp.items.map((item) => (
              <li key={item} className="flex gap-3 text-[14.5px] leading-[1.45] text-bone/85">
                <CheckDot tone="wa" />
                {item}
              </li>
            ))}
          </Reveal>
        </div>

        {/* 2 · Demostración animada */}
        <Reveal delay={120} className="min-w-0 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center">
          <WhatsappFlowMockup />
        </Reveal>

        {/* 3 · CTA y aclaración */}
        <Reveal delay={260} className="lg:col-start-1 lg:row-start-2 lg:self-start">
          <LinkButton href="#demo" variant="gold" size="lg">
            {whatsapp.ctaPrimary}
          </LinkButton>
          <p className="mt-5 max-w-[56ch] text-[12.5px] leading-[1.5] text-bone/55">
            {whatsapp.disclaimer}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
