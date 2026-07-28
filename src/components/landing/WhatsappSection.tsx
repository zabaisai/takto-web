import { whatsapp } from "@/data/landing-content";
import { WhatsappFlowMockup } from "@/components/product-mockups/WhatsappFlowMockup";
import { CheckDot } from "@/components/product-mockups/primitives";
import { LinkButton } from "@/components/ui/LinkButton";
import { SectionTitle } from "@/components/ui/Eyebrow";

export function WhatsappSection() {
  return (
    <section
      id="whatsapp"
      aria-labelledby="whatsapp-title"
      className="on-dark relative bg-[radial-gradient(900px_500px_at_85%_0%,rgba(37,211,102,.12),transparent_60%),var(--color-ink)] px-[clamp(18px,4vw,44px)] py-[clamp(56px,6vw,104px)] text-bone"
    >
      <div className="mx-auto grid w-full max-w-[1240px] items-center gap-[clamp(30px,4vw,56px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,400px),1fr))]">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-wa/30 bg-wa/12 px-3 py-2 text-[12px] leading-none font-semibold tracking-[0.1em] text-wa uppercase">
            {whatsapp.eyebrow}
          </span>

          <SectionTitle id="whatsapp-title" className="mt-5">
            {whatsapp.title}
          </SectionTitle>

          <p className="mt-[18px] max-w-[52ch] text-[clamp(16px,1.3vw,18px)] leading-[1.6] text-bone/[0.68] [text-wrap:pretty]">
            {whatsapp.body}
          </p>

          <ul className="mt-[26px] grid gap-x-[22px] gap-y-3 [grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr))]">
            {whatsapp.items.map((item) => (
              <li
                key={item}
                className="flex gap-2.5 text-[14.5px] leading-[1.45] text-bone/[0.82]"
              >
                <CheckDot tone="wa" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap gap-3">
            <LinkButton href="#demo" variant="gold">
              {whatsapp.ctaPrimary}
            </LinkButton>
            <LinkButton href="#conversaciones" variant="outlineDark">
              {whatsapp.ctaSecondary}
            </LinkButton>
          </div>

          <p className="mt-5 max-w-[56ch] text-[12.5px] leading-[1.5] text-bone/[0.55]">
            {whatsapp.disclaimer}
          </p>
        </div>

        <WhatsappFlowMockup />
      </div>
    </section>
  );
}
