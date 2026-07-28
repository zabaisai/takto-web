import { companies } from "@/data/landing-content";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Eyebrow, SectionLead, SectionTitle } from "@/components/ui/Eyebrow";

export function CompaniesSection() {
  return (
    <section
      id="empresas"
      aria-labelledby="empresas-title"
      className="surface-bone-gold border-t border-line px-[clamp(18px,4vw,44px)] py-[clamp(56px,6vw,96px)]"
    >
      <Container>
        <div className="max-w-[680px]">
          <Eyebrow>{companies.eyebrow}</Eyebrow>
          <SectionTitle id="empresas-title">{companies.title}</SectionTitle>
          <SectionLead>{companies.body}</SectionLead>
        </div>

        <ul className="mt-[clamp(26px,3.2vw,44px)] grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr))]">
          {companies.samples.map((sample, index) => (
            <Reveal
              key={sample.name}
              as="li"
              delay={index * 110}
              className="seq-brand-card overflow-hidden rounded-[18px] border border-line bg-surface shadow-[0_26px_52px_-36px_rgba(11,14,15,.4)] transition-transform duration-200 hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              {/*
                Un barrido dorado recorre las tres tarjetas por turnos para
                mostrar que es el mismo CRM con otra identidad. Es un halo
                superpuesto: no altera el contenido ni lo oculta.
              */}
              <div className="relative">
                <span
                  aria-hidden="true"
                  className="seq-brand pointer-events-none absolute inset-0 z-10 rounded-[18px] ring-2 ring-inset"
                  style={{
                    ["--tw-ring-color" as string]: sample.color,
                    animationName: "seq-brand",
                    animationDuration: "9s",
                    animationDelay: `${index * 3}s`,
                    animationIterationCount: "infinite",
                    animationFillMode: "both",
                  }}
                />
              </div>
              <div aria-hidden="true" className="h-[5px]" style={{ background: sample.color }} />
              <div className="p-4">
                <span className="flex items-center gap-[9px]">
                  <span
                    aria-hidden="true"
                    className="h-[26px] w-[26px] flex-none rounded-lg"
                    style={{ background: sample.color }}
                  />
                  <b className="font-display text-[13px] leading-none font-semibold">
                    {sample.name}
                  </b>
                </span>
                <div aria-hidden="true" className="mt-3.5 grid gap-2">
                  <span className="block h-2 rounded-full bg-line-faint" />
                  <span
                    className="block h-2 rounded-full bg-line-faint"
                    style={{ width: `${sample.fill}%` }}
                  />
                  <span className="mt-1.5 flex gap-[7px]">
                    <span
                      className="h-9 flex-1 rounded-[9px]"
                      style={{ background: `${sample.color}1F` }}
                    />
                    <span className="h-9 flex-1 rounded-[9px] bg-surface-tint" />
                    <span className="h-9 flex-1 rounded-[9px] bg-surface-tint" />
                  </span>
                </div>
                <span
                  className="mt-3.5 inline-block rounded-[5px] px-2 py-[5px] text-[10px] leading-none font-semibold"
                  style={{ color: sample.color, background: `${sample.color}1A` }}
                >
                  {sample.label}
                </span>
              </div>
            </Reveal>
          ))}
        </ul>

        <p className="mt-3.5 text-[12.5px] leading-[1.5] text-subtle">{companies.disclaimer}</p>

        <div className="mt-[clamp(30px,3.6vw,48px)] rounded-[20px] border border-line bg-surface p-[clamp(20px,2.4vw,32px)]">
          <h3 className="font-display text-[clamp(17px,1.7vw,21px)] leading-[1.3] font-semibold">
            {companies.onboardingTitle}
          </h3>
          <ol className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(min(100%,150px),1fr))]">
            {companies.onboarding.map((step, index) => {
              const isLast = index === companies.onboarding.length - 1;
              return (
                <li
                  key={step}
                  className={`rounded-xl p-[13px] ${
                    isLast
                      ? "border border-brand bg-brand/[0.06]"
                      : "border border-line bg-surface-soft"
                  }`}
                >
                  <i className="block font-mono text-[10px] leading-none font-semibold text-brand not-italic">
                    {String(index + 1).padStart(2, "0")}
                  </i>
                  <b className="mt-2 block text-[12.5px] leading-[1.3] font-semibold">{step}</b>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
