import { cta, hero } from "@/data/landing-content";
import { DashboardMockup } from "@/components/product-mockups/DashboardMockup";
import { LinkButton } from "@/components/ui/LinkButton";

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="surface-hero relative px-[clamp(18px,4vw,44px)] pt-[clamp(48px,6vw,92px)] pb-[clamp(40px,5vw,72px)]"
    >
      <div className="mx-auto grid w-full max-w-[1280px] items-center gap-[clamp(32px,4vw,56px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr))]">
        {/*
          El hero está siempre sobre el pliegue, así que `Reveal` lo deja
          visible sin animar. La entrada escalonada la da una animación CSS
          pura, que no depende de JavaScript en ningún caso.
        */}
        <div>
          <span
            className="hero-in inline-flex items-center gap-2 rounded-full border border-brand/[0.22] bg-brand/[0.09] px-3 py-2 text-[12px] leading-none font-semibold tracking-[0.1em] text-brand uppercase"
            style={{ animationDelay: "0ms" }}
          >
            <span aria-hidden="true" className="block h-1.5 w-1.5 rounded-full bg-wa" />
            {hero.eyebrow}
          </span>

          <h1
            id="hero-title"
            className="hero-in mt-[22px] font-display text-[clamp(36px,5.2vw,66px)] leading-[1.04] font-semibold tracking-[-0.03em]"
            style={{ animationDelay: "90ms" }}
          >
            {hero.title.lead}
            <span className="text-brand">{hero.title.highlight}</span>
          </h1>

          <p
            className="hero-in mt-5 max-w-[52ch] text-[clamp(17px,1.35vw,20px)] leading-[1.6] text-muted [text-wrap:pretty]"
            style={{ animationDelay: "180ms" }}
          >
            {hero.subtitle}
          </p>

          <div
            className="hero-in mt-[30px] flex flex-wrap gap-3"
            style={{ animationDelay: "270ms" }}
          >
            <LinkButton href="#demo" variant="ink" size="lg">
              {cta.primary}
            </LinkButton>
            <LinkButton href="#producto" variant="outline" size="lg">
              {cta.secondary}
            </LinkButton>
          </div>

          <p
            className="hero-in mt-[18px] text-[13.5px] leading-[1.5] font-medium text-subtle"
            style={{ animationDelay: "350ms" }}
          >
            {hero.note}
          </p>
        </div>

        <DashboardMockup />
      </div>
    </section>
  );
}
