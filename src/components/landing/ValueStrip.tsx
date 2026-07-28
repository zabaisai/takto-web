import { valueStrip } from "@/data/landing-content";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";

export function ValueStrip() {
  return (
    <section
      aria-label="Resumen de beneficios"
      className="px-[clamp(18px,4vw,44px)] pb-[clamp(40px,5vw,68px)]"
    >
      <Container>
        <ul className="grid gap-[18px] border-y border-line py-[22px] [grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr))]">
          {valueStrip.map((item, index) => (
            <Reveal
              key={item}
              as="li"
              delay={index * 70}
              className="group flex items-center gap-2.5 px-[clamp(0px,1vw,14px)]"
            >
              <span
                aria-hidden="true"
                className="h-2 w-2 flex-none rounded-full border-2 border-brand transition-[transform,background-color] duration-200 group-hover:scale-125 group-hover:bg-brand motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
              <b className="text-[14.5px] leading-[1.3] font-medium text-ink">{item}</b>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
