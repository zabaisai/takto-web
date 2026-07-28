import { demoData } from "@/data/landing-content";
import { Avatar, Chip, TaskBox } from "./primitives";

/** Bandeja de conversaciones de tres paneles: lista, hilo y ficha del cliente. */
export function InboxMockup() {
  return (
    <div
      role="img"
      aria-label="Bandeja de conversaciones de Tehus CRM: lista de chats a la izquierda, el hilo de la conversación en el centro y la ficha del cliente con su oportunidad y próxima tarea a la derecha. Datos de ejemplo."
      className="overflow-hidden rounded-[18px] border border-line bg-surface-soft shadow-[0_34px_70px_-40px_rgba(11,14,15,.45)]"
    >
      <div className="flex flex-wrap items-center gap-3 border-b border-line-soft bg-surface px-4 py-3">
        <b className="font-display text-[13px] leading-none font-semibold">Conversaciones</b>
        <Chip tone="wa" className="rounded-full px-2 py-[5px] text-[10.5px]">
          WhatsApp Business conectado
        </Chip>
        <span className="ml-auto flex gap-1.5">
          <span className="rounded-lg border border-line px-2.5 py-1.5 text-[11px] leading-none font-medium text-muted">
            Todas
          </span>
          <span className="rounded-lg border border-brand/30 bg-brand/[0.08] px-2.5 py-1.5 text-[11px] leading-none font-semibold text-brand">
            Sin responder
          </span>
        </span>
      </div>

      <div className="grid [grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr))]">
        {/* Lista */}
        <div className="grid content-start gap-[9px] border-r border-line-soft bg-surface p-3">
          {demoData.conversations.map((item, index) => (
            <div
              key={item.name}
              className={`flex gap-[10px] rounded-xl p-[11px] ${
                index === 0
                  ? "border border-brand bg-brand/[0.05]"
                  : "border border-line-soft bg-surface-soft"
              }`}
            >
              <Avatar initials={item.initials} size={32} tone={index === 0 ? "ink" : "muted"} />
              <span className="min-w-0 flex-1">
                <span className="flex justify-between gap-2">
                  <b className="text-[13px] leading-[1.2] font-semibold">{item.name}</b>
                  <i className="font-mono text-[10.5px] leading-[1.2] text-subtle not-italic">
                    {item.time}
                  </i>
                </span>
                <span className="mt-[3px] block truncate text-[12px] leading-[1.4] text-muted">
                  {item.preview}
                </span>
                <span className="mt-[7px] flex flex-wrap gap-1.5">
                  {item.agent ? <Chip>{item.agent}</Chip> : null}
                  {item.state === "Abierta" ? <Chip tone="wa">Abierta</Chip> : null}
                  {item.state === "Sin asignar" ? <Chip tone="muted">Sin asignar</Chip> : null}
                </span>
              </span>
            </div>
          ))}
        </div>

        {/* Hilo */}
        <div className="flex flex-col gap-[10px] border-r border-line-soft bg-surface-soft p-[14px]">
          <span className="flex items-center gap-2 border-b border-line-soft pb-2.5">
            <Avatar initials="MG" size={30} />
            <b className="font-display text-[13px] leading-none font-semibold">María Gómez</b>
            <Chip tone="wa" className="ml-auto">
              WhatsApp
            </Chip>
          </span>

          {demoData.thread.map((message) => (
            <span
              key={message.text}
              className={
                message.from === "cliente"
                  ? "max-w-[88%] self-start rounded-[12px] rounded-bl-[3px] border border-line bg-surface px-3 py-2.5 text-[12.5px] leading-[1.5] text-ink"
                  : "max-w-[88%] self-end rounded-[12px] rounded-br-[3px] bg-ink px-3 py-2.5 text-[12.5px] leading-[1.5] text-bone"
              }
            >
              {message.text}
            </span>
          ))}

          <span className="mt-auto flex items-center gap-2 rounded-[10px] border border-line bg-surface px-3 py-2.5">
            <i className="text-[12px] leading-none text-placeholder not-italic">
              Escribe un mensaje…
            </i>
            <i
              aria-hidden="true"
              className="ml-auto grid h-6 w-6 place-items-center rounded-[7px] bg-wa/[0.16] not-italic"
            >
              <i className="block h-2 w-2 rounded-full bg-wa not-italic" />
            </i>
          </span>
        </div>

        {/* Ficha del cliente */}
        <div className="grid content-start gap-[10px] bg-surface p-[14px]">
          <span className="text-[10px] leading-none font-semibold tracking-[0.08em] text-subtle uppercase">
            Ficha del cliente
          </span>

          <div className="grid gap-[7px] rounded-xl border border-line p-3">
            <b className="font-display text-[13.5px] leading-[1.3] font-semibold">
              {demoData.account.company}
            </b>
            <i className="text-[12px] leading-[1.4] text-muted not-italic">
              {demoData.account.contact}
            </i>
            <i className="text-[12px] leading-[1.4] text-muted not-italic">
              {demoData.account.since}
            </i>
          </div>

          <div className="rounded-xl border border-line p-3">
            <span className="block text-[10px] leading-none font-semibold tracking-[0.08em] text-subtle uppercase">
              Oportunidad
            </span>
            <b className="mt-1.5 block font-display text-[13px] leading-[1.3] font-semibold">
              {demoData.opportunity.name}
            </b>
            <span className="mt-2 flex items-center justify-between">
              <i className="font-mono text-[12px] leading-none font-semibold not-italic">
                {demoData.opportunity.value}
              </i>
              <Chip>{demoData.opportunity.stage}</Chip>
            </span>
          </div>

          <div className="rounded-xl border border-line p-3">
            <span className="block text-[10px] leading-none font-semibold tracking-[0.08em] text-subtle uppercase">
              Próxima tarea
            </span>
            <span className="mt-[7px] flex items-center gap-2">
              <TaskBox />
              <b className="text-[12.5px] leading-[1.35] font-medium">{demoData.nextTask}</b>
            </span>
          </div>

          <div className="rounded-xl border border-line p-3">
            <span className="block text-[10px] leading-none font-semibold tracking-[0.08em] text-subtle uppercase">
              Historial
            </span>
            <span className="mt-2 grid gap-1.5">
              {demoData.history.map((entry) => (
                <i key={entry} className="text-[11.5px] leading-[1.4] text-muted not-italic">
                  · {entry}
                </i>
              ))}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
