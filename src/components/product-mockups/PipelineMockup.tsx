import { demoData } from "@/data/landing-content";
import { Sequence } from "@/components/motion/Sequence";
import { Chip } from "./primitives";

/** Forma común de las tarjetas del tablero: cada etapa usa solo algunos campos. */
type PipelineCard = {
  name: string;
  value?: string;
  note?: string;
  warning?: string;
  agent?: string;
  tag?: string;
  featured?: boolean;
  won?: boolean;
  lost?: boolean;
};

/** Tablero de pipeline con seis etapas. Datos ficticios. */
export function PipelineMockup() {
  return (
    <Sequence
      label="Tablero de pipeline de TAKTO con seis etapas —nuevo lead, calificado, cotización, negociación, cerrado ganado y cerrado perdido— y las oportunidades de cada una con su valor y responsable. Una oportunidad avanza de nuevo lead a calificado. Datos de ejemplo."
      className="overflow-x-auto rounded-[18px] border border-line bg-surface p-[clamp(14px,1.6vw,22px)] shadow-[0_34px_70px_-44px_rgba(11,14,15,.4)]"
    >
      <div className="grid min-w-[1020px] grid-cols-6 gap-3">
        {demoData.pipelineColumns.map((column) => (
          <div
            key={column.name}
            className={`grid content-start gap-[9px] rounded-[14px] p-[11px] ${
              column.highlight
                ? "border border-brand/[0.28] bg-brand/[0.05]"
                : "border border-line-soft bg-surface-soft"
            }`}
          >
            <span className="flex items-center justify-between">
              <b
                className={`text-[11.5px] leading-none font-semibold ${
                  column.highlight ? "text-brand" : "text-ink"
                }`}
              >
                {column.name}
              </b>
              <i
                className={`font-mono text-[10px] leading-none font-semibold not-italic ${
                  column.highlight ? "text-brand" : "text-subtle"
                }`}
              >
                {column.count}
              </i>
            </span>

            {column.cards.map((rawCard) => {
              // Las tarjetas del contenido son una unión de formas distintas;
              // se leen a través de un tipo común para no repetir estrechamientos.
              const card = rawCard as PipelineCard;
              const featured = card.featured === true;
              const lost = card.lost === true;
              const won = card.won === true;
              // «Hotel Marena» es la tarjeta que demuestra el avance de etapa.
              const moving = card.name === "Hotel Marena";

              return (
                <span
                  key={card.name}
                  className={`seq-card-move relative block rounded-[10px] bg-surface p-2.5 ${
                    featured
                      ? "border border-brand shadow-[0_12px_22px_-14px_rgba(183,121,11,.6)]"
                      : lost
                        ? "border border-dashed border-line opacity-70"
                        : won
                          ? "border border-wa/40"
                          : "border border-line"
                  }`}
                  style={
                    // Una sola tarjeta avanza de «Nuevo lead» a «Calificado»
                    // y regresa. Es un desplazamiento corto, no interfiere con
                    // el desplazamiento horizontal del tablero.
                    moving
                      ? {
                          ["--seq-move-x" as string]: "calc(100% + 12px)",
                          animationName: "seq-card-move",
                          animationDuration: "8s",
                          animationIterationCount: "infinite",
                          animationTimingFunction: "cubic-bezier(0.22,0.61,0.36,1)",
                        }
                      : undefined
                  }
                >
                  <b className="block text-[12px] leading-[1.3] font-semibold">{card.name}</b>
                  {card.value ? (
                    <i
                      className={`mt-1.5 block font-mono text-[11px] leading-none font-semibold not-italic ${
                        featured ? "text-ink" : "text-muted"
                      }`}
                    >
                      {card.value}
                    </i>
                  ) : null}
                  {card.note ? (
                    <i className="mt-1.5 block text-[10.5px] leading-[1.3] text-subtle not-italic">
                      {card.note}
                    </i>
                  ) : null}
                  {card.warning ? (
                    <Chip tone="warning" className="mt-[7px]">
                      {card.warning}
                    </Chip>
                  ) : null}
                  {card.agent || card.tag ? (
                    <span className="mt-[7px] flex flex-wrap gap-[5px]">
                      {card.agent ? <Chip>{card.agent}</Chip> : null}
                      {card.tag ? <Chip tone="ink">{card.tag}</Chip> : null}
                    </span>
                  ) : null}
                </span>
              );
            })}
          </div>
        ))}
      </div>
    </Sequence>
  );
}
