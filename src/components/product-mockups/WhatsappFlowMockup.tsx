import { demoData, whatsapp } from "@/data/landing-content";
import { Sequence } from "@/components/motion/Sequence";
import { Avatar, TaskBox } from "./primitives";

/**
 * Demostración animada: un mensaje de WhatsApp Business entra, viaja al CRM,
 * identifica al contacto, se asigna, genera una oportunidad y deja una tarea
 * de seguimiento con su notificación.
 *
 * El ciclo dura 8 s y cada etapa se ilumina y SE QUEDA encendida. Ningún
 * elemento desaparece entre ciclos: sin animación, el bloque se lee como el
 * resultado final del proceso. Datos ficticios.
 */

/** Cadencia del ciclo. Un único valor gobierna todas las capas. */
const CYCLE = "8s";

function StageChip({
  label,
  index,
  active,
}: {
  label: string;
  index: number;
  active?: boolean;
}) {
  return (
    <li
      className={`seq-stage flex items-center gap-2 rounded-full border px-2.5 py-1.5 text-[10.5px] leading-none font-semibold whitespace-nowrap ${
        active
          ? "border-wa/40 bg-wa/12 text-wa"
          : "border-bone/15 bg-bone/[0.04] text-bone/70"
      }`}
      style={{
        animationName: "seq-step",
        animationDuration: CYCLE,
        animationDelay: `${index * 0.9}s`,
        animationIterationCount: "infinite",
        animationFillMode: "both",
      }}
    >
      <span
        aria-hidden="true"
        className={`h-1.5 w-1.5 flex-none rounded-full ${active ? "bg-wa" : "bg-brand-gold"}`}
      />
      {label}
    </li>
  );
}

export function WhatsappFlowMockup() {
  return (
    <Sequence
      label="Demostración: un mensaje de WhatsApp Business entra al CRM de Tehus, se identifica el contacto Distribuciones del Valle, se asigna al asesor Camilo Restrepo, se crea la oportunidad Dotación oficina por 8.400.000 pesos y se programa la tarea de enviar la cotización hoy a las 4 de la tarde. Datos de ejemplo."
      className="grid gap-5"
    >
      {/* Indicadores de etapa */}
      <ul className="flex flex-wrap gap-2">
        {whatsapp.stages.map((stage, index) => (
          <StageChip
            key={stage.id}
            label={stage.label}
            index={index}
            active={index === 0}
          />
        ))}
      </ul>

      <div className="grid items-start gap-4 sm:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        {/* --- Teléfono --------------------------------------------------- */}
        <div className="relative mx-auto w-full max-w-[230px] sm:mx-0">
          <div className="overflow-hidden rounded-[28px] border-8 border-ink-raised bg-[#0f1214] shadow-[0_30px_60px_-24px_rgba(0,0,0,.7)]">
            <div aria-hidden="true" className="grid h-5 place-items-center bg-[#0f1214]">
              <span className="h-[5px] w-11 rounded-full bg-[#2a2e31]" />
            </div>

            <div className="flex items-center gap-2 bg-wa-header px-[11px] py-2.5">
              <span aria-hidden="true" className="h-[22px] w-[22px] rounded-full bg-white/20" />
              <span className="min-w-0">
                <b className="block truncate text-[11px] leading-[1.2] font-semibold text-white">
                  María Gómez
                </b>
                <i className="text-[9px] leading-[1.2] text-white/65 not-italic">en línea</i>
              </span>
            </div>

            <div className="grid min-h-[178px] content-start gap-2 bg-wa-bg px-2.5 py-3">
              {demoData.thread.map((message, index) => (
                <span
                  key={`wa-${message.text}`}
                  className="seq-bubble max-w-[86%] rounded-[9px] px-2.5 py-2 text-[11px] leading-[1.4] text-wa-text"
                  style={{
                    justifySelf: message.from === "cliente" ? "start" : "end",
                    background:
                      message.from === "cliente" ? "var(--color-wa-in)" : "var(--color-wa-out)",
                    borderBottomLeftRadius: message.from === "cliente" ? "2px" : undefined,
                    borderBottomRightRadius: message.from === "empresa" ? "2px" : undefined,
                    animationName: "seq-bubble",
                    animationDuration: CYCLE,
                    animationDelay: `${index * 0.45}s`,
                    animationIterationCount: "infinite",
                    animationFillMode: "both",
                  }}
                >
                  {message.text}
                </span>
              ))}

              {/* Indicador de escritura, discreto y sin texto esencial */}
              <span
                aria-hidden="true"
                className="flex w-fit items-center gap-1 rounded-[9px] bg-wa-in px-2.5 py-2"
              >
                {[0, 1, 2].map((dot) => (
                  <span
                    key={dot}
                    className="seq-typing block h-1.5 w-1.5 rounded-full bg-wa-text"
                    style={{
                      animationName: "seq-typing",
                      animationDuration: "1.4s",
                      animationDelay: `${dot * 0.16}s`,
                      animationIterationCount: "infinite",
                    }}
                  />
                ))}
              </span>
            </div>
          </div>

          {/* Mensaje viajando del teléfono al CRM. Puramente decorativo. */}
          <span
            aria-hidden="true"
            className="seq-travel pointer-events-none absolute top-1/2 -right-2 hidden h-2.5 w-2.5 rounded-full bg-wa shadow-[0_0_16px_4px_rgba(37,211,102,.45)] sm:block"
            style={{
              ["--seq-travel-distance" as string]: "42px",
              animationName: "seq-travel",
              animationDuration: CYCLE,
              animationIterationCount: "infinite",
              animationFillMode: "both",
            }}
          />
        </div>

        {/* --- Lo que ocurre dentro del CRM ------------------------------- */}
        <div className="relative grid gap-2.5">
          {/* Riel de progreso vertical */}
          <span
            aria-hidden="true"
            className="absolute top-2 bottom-2 -left-3 hidden w-px bg-bone/12 sm:block"
          >
            <span
              className="seq-rail block h-full w-full origin-top bg-linear-to-b from-wa via-brand-gold to-brand"
              style={{
                animationName: "seq-progress",
                animationDuration: CYCLE,
                animationIterationCount: "infinite",
                animationFillMode: "both",
              }}
            />
          </span>

          <FlowCard delay="0.6s" tone="wa">
            <span className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="seq-dot h-2 w-2 flex-none rounded-full bg-wa"
                style={{
                  animationName: "seq-dot",
                  animationDuration: CYCLE,
                  animationDelay: "0.6s",
                  animationIterationCount: "infinite",
                  animationFillMode: "both",
                }}
              />
              <b className="text-[12px] leading-none font-semibold text-bone">
                Conversación recibida en el CRM
              </b>
            </span>
            <p className="mt-2 text-[11.5px] leading-[1.45] text-bone/60">
              María Gómez · WhatsApp Business
            </p>
          </FlowCard>

          <FlowCard delay="1.5s">
            <span className="block text-[9.5px] leading-none font-semibold tracking-[0.1em] text-brand-gold uppercase">
              Contacto identificado
            </span>
            <span className="mt-2 flex items-center gap-2">
              <Avatar initials="DV" size={24} tone="gold" />
              <b className="text-[12.5px] leading-none font-medium text-bone">
                Distribuciones del Valle
              </b>
            </span>
          </FlowCard>

          <FlowCard delay="2.4s">
            <span className="block text-[9.5px] leading-none font-semibold tracking-[0.1em] text-brand-gold uppercase">
              Asignada a
            </span>
            <span className="mt-2 flex items-center gap-2">
              <Avatar initials="CR" size={24} tone="gold" />
              <b className="text-[12.5px] leading-none font-medium text-bone">
                Camilo Restrepo · Asesor
              </b>
            </span>
          </FlowCard>

          <FlowCard delay="3.3s" tone="gold">
            <span className="block text-[9.5px] leading-none font-semibold tracking-[0.1em] text-brand-gold uppercase">
              Oportunidad relacionada
            </span>
            <b className="mt-[7px] block font-display text-[13px] leading-[1.3] font-semibold text-white">
              {demoData.opportunity.name}
            </b>
            <span className="mt-2 flex justify-between">
              <i className="font-mono text-[11.5px] leading-none font-semibold text-bone/70 not-italic">
                {demoData.opportunity.value}
              </i>
              <i className="text-[10px] leading-none font-semibold text-brand-gold not-italic">
                {demoData.opportunity.stage}
              </i>
            </span>
          </FlowCard>

          <FlowCard delay="4.2s">
            <span className="flex items-center gap-[9px]">
              <TaskBox tone="gold" size={14} />
              <b className="text-[12.5px] leading-[1.3] font-medium text-bone">
                Tarea creada: enviar cotización hoy 4:00 p.m.
              </b>
            </span>
          </FlowCard>

          {/* Notificación final: entra desde arriba y se queda */}
          <div
            className="seq-toast flex items-center gap-2.5 rounded-[14px] border border-wa/30 bg-wa/[0.08] p-3"
            style={{
              animationName: "seq-toast",
              animationDuration: CYCLE,
              animationDelay: "5.1s",
              animationIterationCount: "infinite",
              animationFillMode: "both",
            }}
          >
            <span
              aria-hidden="true"
              className="grid h-6 w-6 flex-none place-items-center rounded-lg bg-wa/20"
            >
              <span className="block h-2 w-2 rounded-full bg-wa" />
            </span>
            <b className="text-[11.5px] leading-[1.3] font-semibold text-bone">
              Notificación enviada al asesor
            </b>
          </div>
        </div>
      </div>
    </Sequence>
  );
}

function FlowCard({
  children,
  delay,
  tone = "neutral",
}: {
  children: React.ReactNode;
  delay: string;
  tone?: "neutral" | "wa" | "gold";
}) {
  const tones = {
    neutral: "border-bone/12",
    wa: "border-wa/25",
    gold: "border-brand-gold/30",
  } as const;

  return (
    <div
      className={`seq-card rounded-[14px] border bg-ink-panel p-3.5 ${tones[tone]}`}
      style={{
        animationName: "seq-step",
        animationDuration: CYCLE,
        animationDelay: delay,
        animationIterationCount: "infinite",
        animationFillMode: "both",
      }}
    >
      {children}
    </div>
  );
}
