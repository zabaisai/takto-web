import { demoData } from "@/data/landing-content";
import { Avatar, Chip, TaskBox } from "./primitives";

/**
 * Ficha completa de contacto: datos de la empresa, personas, oportunidad,
 * conversación y actividad. Datos ficticios.
 */
export function ContactMockup() {
  return (
    <div
      role="img"
      aria-label="Ficha de contacto en TAKTO: datos de la empresa, personas de contacto, asesor responsable, oportunidad abierta, próxima tarea y actividad reciente. Datos de ejemplo."
      className="overflow-hidden rounded-[18px] border border-line bg-surface shadow-[0_30px_60px_-40px_rgba(11,14,15,.42)]"
    >
      <div className="flex flex-wrap items-center gap-3 border-b border-line-soft bg-surface-soft px-4 py-3">
        <Avatar initials="DV" size={34} />
        <span className="min-w-0">
          <b className="block font-display text-[14px] leading-[1.2] font-semibold">
            {demoData.account.company}
          </b>
          <i className="text-[11.5px] leading-[1.3] text-subtle not-italic">
            {demoData.account.since}
          </i>
        </span>
        <Chip className="ml-auto">Camilo R.</Chip>
      </div>

      <div className="grid [grid-template-columns:repeat(auto-fit,minmax(min(100%,230px),1fr))]">
        <div className="grid content-start gap-2.5 border-r border-line-soft p-4">
          <span className="text-[10px] leading-none font-semibold tracking-[0.08em] text-subtle uppercase">
            Personas de contacto
          </span>
          <span className="flex items-center gap-2.5 rounded-[11px] border border-line bg-surface-soft p-2.5">
            <Avatar initials="MG" />
            <span className="min-w-0">
              <b className="block text-[12.5px] leading-[1.3] font-semibold">María Gómez</b>
              <i className="text-[11px] leading-[1.3] text-subtle not-italic">Compras</i>
            </span>
          </span>
          <span className="flex items-center gap-2.5 rounded-[11px] border border-line-soft p-2.5">
            <Avatar initials="RN" tone="muted" />
            <span className="min-w-0">
              <b className="block text-[12.5px] leading-[1.3] font-semibold">Rocío Nieto</b>
              <i className="text-[11px] leading-[1.3] text-subtle not-italic">Administración</i>
            </span>
          </span>
          <span className="mt-1 text-[11px] leading-[1.45] text-subtle">
            Los datos de contacto quedan visibles solo para el asesor asignado y el administrador.
          </span>
        </div>

        <div className="grid content-start gap-2.5 border-r border-line-soft p-4">
          <span className="text-[10px] leading-none font-semibold tracking-[0.08em] text-subtle uppercase">
            Oportunidades
          </span>
          <span className="block rounded-[11px] border border-brand bg-brand/[0.05] p-2.5">
            <b className="block text-[12.5px] leading-[1.3] font-semibold">
              {demoData.opportunity.name}
            </b>
            <span className="mt-1.5 flex items-center justify-between">
              <i className="font-mono text-[11.5px] leading-none font-semibold not-italic">
                {demoData.opportunity.value}
              </i>
              <Chip>{demoData.opportunity.stage}</Chip>
            </span>
          </span>
          <span className="block rounded-[11px] border border-line p-2.5 opacity-75">
            <b className="block text-[12.5px] leading-[1.3] font-semibold">Reposición archivadores</b>
            <i className="mt-1.5 block font-mono text-[11.5px] leading-none font-semibold text-muted not-italic">
              $ 1.950.000
            </i>
          </span>
          <span className="flex items-center gap-2 rounded-[11px] border border-line p-2.5">
            <TaskBox />
            <b className="text-[12px] leading-[1.3] font-medium">{demoData.nextTask}</b>
          </span>
        </div>

        <div className="grid content-start gap-2.5 p-4">
          <span className="text-[10px] leading-none font-semibold tracking-[0.08em] text-subtle uppercase">
            Actividad reciente
          </span>
          {demoData.history.map((entry) => (
            <span key={`contact-${entry}`} className="flex items-start gap-2.5">
              <span aria-hidden="true" className="mt-[6px] h-[6px] w-[6px] flex-none rounded-full bg-line" />
              <b className="text-[12px] leading-[1.4] font-medium text-muted">{entry}</b>
            </span>
          ))}
          <span className="mt-1 flex items-center gap-2 rounded-[11px] border border-line-soft bg-surface-soft p-2.5">
            <span aria-hidden="true" className="h-2 w-2 flex-none rounded-full bg-wa" />
            <b className="text-[11.5px] leading-[1.3] font-medium">
              Última conversación · hoy 10:24
            </b>
          </span>
        </div>
      </div>
    </div>
  );
}
