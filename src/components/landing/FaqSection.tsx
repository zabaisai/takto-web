"use client";

import { useId, useState } from "react";
import { faq } from "@/data/landing-content";
import { Container } from "@/components/ui/Container";
import { Eyebrow, SectionTitle } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";

/**
 * Acordeón de preguntas frecuentes.
 *
 * Se usan botones reales con `aria-expanded` y `aria-controls`, y la respuesta
 * permanece en el DOM (oculta con `hidden`) para que los buscadores y los
 * lectores de pantalla puedan encontrarla.
 */
export function FaqSection() {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section id="faq" tone="surface" border="both" aria-labelledby="faq-title">
      <Container width="prose">
        <Eyebrow>{faq.eyebrow}</Eyebrow>
        <SectionTitle id="faq-title" className="text-[clamp(28px,3.6vw,46px)]">
          {faq.title}
        </SectionTitle>

        <div className="mt-[clamp(24px,3vw,40px)] border-t border-line">
          {faq.items.map((item, index) => {
            const open = openIndex === index;
            const buttonId = `${baseId}-q-${index}`;
            const panelId = `${baseId}-a-${index}`;

            return (
              <div
                key={item.q}
                className={`border-b border-line ${open ? "bg-brand/[0.03]" : ""}`}
              >
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(open ? null : index)}
                    className="flex w-full cursor-pointer items-center gap-4 bg-transparent px-1 py-5 text-left font-display text-[clamp(15px,1.3vw,17.5px)] leading-[1.4] font-semibold text-ink"
                  >
                    <span className="flex-1">{item.q}</span>
                    <span
                      aria-hidden="true"
                      className={`grid h-[22px] w-[22px] flex-none place-items-center text-[19px] leading-none text-brand transition-transform duration-200 motion-reduce:transition-none ${
                        open ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                </h3>
                {/*
                  El panel permanece en el DOM y se colapsa con
                  `grid-template-rows`, no con `hidden`: así la apertura y el
                  cierre son suaves y sin saltos. `inert` evita que el
                  contenido cerrado reciba foco o se anuncie.
                */}
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  data-open={open}
                  inert={!open}
                  className="faq-panel"
                >
                  <div>
                    <p className="m-0 pr-[42px] pb-[22px] pl-1 text-[15px] leading-[1.65] text-muted">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
