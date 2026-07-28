import { finalCta } from "@/data/landing-content";
import { Reveal } from "@/components/motion/Reveal";
import { TaskBox } from "@/components/product-mockups/primitives";
import { LinkButton } from "@/components/ui/LinkButton";

/**
 * Cierre comercial.
 *
 * El fondo usa `.surface-ink-gold`, con el color y las capas de gradiente
 * declarados por separado.
 *
 * La versión anterior los metía juntos en una utilidad de fondo arbitraria,
 * poniendo un color como última capa. Eso se traduce a `background-image`, que
 * solo admite valores de tipo imagen: la declaración quedaba inválida, la
 * sección se quedaba sin fondo y el texto claro resultaba invisible sobre el
 * marfil de la página. El comentario evita repetir aquí esa sintaxis porque
 * Tailwind escanea los comentarios y volvería a generar la clase muerta.
 */
export function FinalCta() {
  return (
    <section
      aria-labelledby="cta-final-title"
      className="on-dark surface-ink-gold relative overflow-hidden px-[clamp(18px,4vw,44px)] py-[clamp(60px,7vw,110px)] text-bone"
    >
      <div className="relative mx-auto grid w-full max-w-[1240px] items-center gap-[clamp(30px,4vw,56px)] lg:grid-cols-[minmax(0,55fr)_minmax(0,45fr)]">
        <div>
          <Reveal>
            <h2
              id="cta-final-title"
              className="max-w-[24ch] font-display text-[clamp(28px,3.6vw,46px)] leading-[1.12] font-semibold tracking-[-0.025em]"
            >
              {finalCta.title}
            </h2>
          </Reveal>

          <Reveal delay={100}>
            <p className="mt-[18px] max-w-[46ch] text-[clamp(16px,1.3vw,18px)] leading-[1.6] text-bone/75">
              {finalCta.body}
            </p>
          </Reveal>

          <Reveal delay={180} className="mt-8 flex flex-wrap gap-3">
            <LinkButton href="#demo" variant="gold" size="lg">
              {finalCta.primary}
            </LinkButton>
            <LinkButton href="#contacto" variant="outlineDark" size="lg">
              {finalCta.secondary}
            </LinkButton>
          </Reveal>
        </div>

        <Reveal delay={140} as="div" className="grid gap-3">
          <div className="flex items-center gap-[11px] rounded-[14px] border border-bone/12 bg-ink-panel p-3.5 transition-transform duration-200 hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
            <span
              aria-hidden="true"
              className="h-[9px] w-[9px] flex-none animate-(--animate-t-pulse) rounded-full bg-wa"
            />
            <b className="text-[12.5px] leading-[1.3] font-semibold">
              Nueva conversación · WhatsApp Business
            </b>
          </div>

          <div className="rounded-[14px] border border-bone/12 bg-ink-panel p-3.5">
            <span className="flex gap-[7px]" aria-hidden="true">
              <span className="h-1.5 flex-1 rounded-full bg-brand-gold" />
              <span className="h-1.5 flex-1 rounded-full bg-brand" />
              <span className="h-1.5 flex-1 rounded-full bg-bone/[0.18]" />
              <span className="h-1.5 flex-1 rounded-full bg-bone/[0.18]" />
            </span>
            <p className="mt-2.5 text-[12px] leading-[1.4] font-medium text-bone/70">
              Oportunidad en <b className="text-white">Cotización</b> · $ 8.400.000
            </p>
          </div>

          <div className="flex items-center gap-[11px] rounded-[14px] border border-brand-gold/30 bg-ink-panel p-3.5 transition-transform duration-200 hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
            <TaskBox tone="gold" size={14} />
            <b className="text-[12.5px] leading-[1.3] font-semibold">
              Tarea de seguimiento · hoy 4:00 p.m.
            </b>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
