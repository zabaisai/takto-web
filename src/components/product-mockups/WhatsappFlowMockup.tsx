import { demoData } from "@/data/landing-content";
import { Avatar, TaskBox } from "./primitives";

/**
 * Teléfono con un chat de WhatsApp Business junto al flujo de lo que ocurre
 * dentro del CRM cuando llega esa conversación. Datos ficticios.
 */
export function WhatsappFlowMockup() {
  return (
    <div
      role="img"
      aria-label="Un chat de WhatsApp Business en un teléfono y, al lado, el flujo dentro de Tehus CRM: la conversación se recibe, se asigna a un asesor, se relaciona con una oportunidad y genera una tarea de seguimiento. Datos de ejemplo."
      className="relative flex flex-wrap items-center justify-center gap-[clamp(14px,2vw,26px)]"
    >
      {/* Teléfono */}
      <div className="w-[min(212px,44vw)] flex-none overflow-hidden rounded-[30px] border-8 border-ink-raised bg-[#0f1214] shadow-[0_30px_60px_-24px_rgba(0,0,0,.7)]">
        <div aria-hidden="true" className="grid h-5 place-items-center bg-[#0f1214]">
          <span className="h-[5px] w-11 rounded-full bg-[#2a2e31]" />
        </div>
        <div className="flex items-center gap-2 bg-wa-header px-[11px] py-[9px]">
          <span aria-hidden="true" className="h-[22px] w-[22px] rounded-full bg-white/20" />
          <span>
            <b className="block text-[11px] leading-[1.2] font-semibold text-white">María Gómez</b>
            <i className="text-[9px] leading-[1.2] text-white/65 not-italic">en línea</i>
          </span>
        </div>
        <div className="grid min-h-[180px] content-start gap-2 bg-wa-bg px-2.5 py-3">
          {demoData.thread.map((message) => (
            <span
              key={`wa-${message.text}`}
              className={
                message.from === "cliente"
                  ? "max-w-[82%] justify-self-start rounded-[9px] rounded-bl-[2px] bg-wa-in px-2.5 py-2 text-[11px] leading-[1.4] text-wa-text"
                  : "max-w-[82%] justify-self-end rounded-[9px] rounded-br-[2px] bg-wa-out px-2.5 py-2 text-[11px] leading-[1.4] text-wa-text"
              }
            >
              {message.text}
            </span>
          ))}
        </div>
      </div>

      {/* Flujo en el CRM */}
      <div className="grid min-w-[min(260px,100%)] flex-1 gap-2.5">
        <div
          aria-hidden="true"
          className="flex items-center justify-center gap-2.5 font-mono text-[11px] leading-none text-bone/40"
        >
          <span className="h-px flex-1 bg-linear-to-r from-transparent to-wa/60" />
          conectado
          <span className="h-px flex-1 bg-linear-to-r from-wa/60 to-transparent" />
        </div>

        <div className="animate-(--animate-t-slide-in) rounded-[14px] border border-bone/12 bg-ink-panel p-[14px]">
          <span className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="h-2 w-2 animate-(--animate-t-pulse) rounded-full bg-wa"
            />
            <b className="text-[12px] leading-none font-semibold text-bone">
              Conversación recibida en el CRM
            </b>
          </span>
          <p className="mt-2 text-[11.5px] leading-[1.45] text-bone/60">
            María Gómez · WhatsApp Business
          </p>
        </div>

        <div className="rounded-[14px] border border-bone/12 bg-ink-panel p-[14px]">
          <span className="block text-[9.5px] leading-none font-semibold tracking-[0.1em] text-brand-gold uppercase">
            Asignada a
          </span>
          <span className="mt-2 flex items-center gap-2">
            <Avatar initials="CR" size={24} tone="gold" />
            <b className="text-[12.5px] leading-none font-medium text-bone">
              Camilo Restrepo · Asesor
            </b>
          </span>
        </div>

        <div className="rounded-[14px] border border-brand-gold/[0.28] bg-ink-panel p-[14px]">
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
        </div>

        <div className="rounded-[14px] border border-bone/12 bg-ink-panel p-[14px]">
          <span className="flex items-center gap-[9px]">
            <TaskBox tone="gold" size={14} />
            <b className="text-[12.5px] leading-[1.3] font-medium text-bone">
              Tarea creada: enviar cotización hoy 4:00 p.m.
            </b>
          </span>
        </div>
      </div>
    </div>
  );
}
