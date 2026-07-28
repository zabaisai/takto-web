import { finalCta } from "@/data/landing-content";
import { TaskBox } from "@/components/product-mockups/primitives";
import { LinkButton } from "@/components/ui/LinkButton";

export function FinalCta() {
  return (
    <section
      aria-labelledby="cta-final-title"
      className="on-dark relative overflow-hidden bg-[radial-gradient(900px_480px_at_78%_10%,rgba(183,121,11,.22),transparent_62%),var(--color-ink)] px-[clamp(18px,4vw,44px)] py-[clamp(60px,7vw,120px)] text-bone"
    >
      <div className="mx-auto grid w-full max-w-[1240px] items-center gap-[clamp(30px,4vw,56px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,340px),1fr))]">
        <div>
          <h2
            id="cta-final-title"
            className="max-w-[26ch] font-display text-[clamp(28px,3.6vw,46px)] leading-[1.12] font-semibold tracking-[-0.025em]"
          >
            {finalCta.title}
          </h2>
          <p className="mt-[18px] max-w-[46ch] text-[clamp(16px,1.3vw,18px)] leading-[1.6] text-bone/[0.68]">
            {finalCta.body}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <LinkButton href="#demo" variant="gold" size="lg">
              {finalCta.primary}
            </LinkButton>
            <LinkButton href="#contacto" variant="outlineDark" size="lg">
              {finalCta.secondary}
            </LinkButton>
          </div>
        </div>

        <div aria-hidden="true" className="grid gap-3">
          <div className="flex animate-(--animate-t-float) items-center gap-[11px] rounded-[14px] border border-bone/12 bg-ink-panel p-3.5">
            <span className="h-[9px] w-[9px] flex-none animate-(--animate-t-pulse) rounded-full bg-wa" />
            <b className="text-[12.5px] leading-[1.3] font-semibold">
              Nueva conversación · WhatsApp Business
            </b>
          </div>

          <div className="rounded-[14px] border border-bone/12 bg-ink-panel p-3.5">
            <span className="flex gap-[7px]">
              <span className="h-1.5 flex-1 rounded-full bg-brand-gold" />
              <span className="h-1.5 flex-1 rounded-full bg-brand" />
              <span className="h-1.5 flex-1 rounded-full bg-bone/[0.18]" />
              <span className="h-1.5 flex-1 rounded-full bg-bone/[0.18]" />
            </span>
            <p className="mt-2.5 text-[12px] leading-[1.4] font-medium text-bone/70">
              Oportunidad en <b className="text-white">Cotización</b> · $ 8.400.000
            </p>
          </div>

          <div className="flex animate-(--animate-t-float-slow) items-center gap-[11px] rounded-[14px] border border-brand-gold/30 bg-ink-panel p-3.5">
            <TaskBox tone="gold" size={14} />
            <b className="text-[12.5px] leading-[1.3] font-semibold">
              Tarea de seguimiento · hoy 4:00 p.m.
            </b>
          </div>
        </div>
      </div>
    </section>
  );
}
