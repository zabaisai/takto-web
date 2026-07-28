import { demoData } from "@/data/landing-content";
import { Avatar, BrowserChrome, Chip } from "./primitives";

/**
 * Mockup principal del hero: vista de conversaciones del CRM con la barra
 * lateral, la lista de conversaciones y el panel de contexto del cliente.
 * Datos ficticios.
 */
export function DashboardMockup() {
  const [first, second, third] = demoData.conversations;

  return (
    <div
      // El padding superior e inferior reserva sitio a las tarjetas flotantes
      // para que no se solapen con el contenido del panel.
      className="relative min-h-[clamp(380px,42vw,520px)] animate-(--animate-t-rise-slow) pt-12 pb-10 sm:pt-14"
      role="img"
      aria-label="Vista del módulo de conversaciones de TAKTO con la lista de chats, el detalle del cliente y su oportunidad asociada. Datos de ejemplo."
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-[-2%] bottom-[6%] h-[72%] bg-[radial-gradient(60%_60%_at_50%_50%,rgba(183,121,11,.16),transparent_70%)] blur-[6px]"
      />

      <div className="relative overflow-hidden rounded-[18px] border border-line bg-surface shadow-[0_30px_70px_-24px_rgba(11,14,15,.34),0_2px_6px_rgba(11,14,15,.06)]">
        <BrowserChrome path="app.takto.online / conversaciones" />

        <div className="grid min-h-[clamp(300px,32vw,400px)] grid-cols-[44px_minmax(0,1fr)] sm:grid-cols-[52px_minmax(0,1fr)_minmax(0,.9fr)]">
          {/* Barra lateral */}
          <div aria-hidden="true" className="flex flex-col items-center gap-4 bg-ink py-4">
            <span className="h-[22px] w-[22px] rounded-[7px] bg-linear-[145deg,var(--color-brand-gold),var(--color-brand)]" />
            <span className="h-[3px] w-5 rounded-full bg-brand-gold" />
            <span className="h-[3px] w-5 rounded-full bg-bone/[0.28]" />
            <span className="h-[3px] w-5 rounded-full bg-bone/[0.28]" />
            <span className="h-[3px] w-5 rounded-full bg-bone/[0.28]" />
            <span className="h-[3px] w-5 rounded-full bg-bone/[0.28]" />
          </div>

          {/* Lista de conversaciones */}
          <div className="flex min-w-0 flex-col gap-[9px] border-r border-line-soft px-3 py-[14px]">
            <div className="flex items-center justify-between">
              <span className="font-display text-[13px] leading-none font-semibold">
                Conversaciones
              </span>
              <Chip tone="wa" className="rounded-full px-2 py-[5px] text-[10.5px]">
                3 nuevas
              </Chip>
            </div>

            {first ? (
              <div className="flex gap-[9px] rounded-[11px] border border-line bg-surface-soft p-[10px] shadow-[0_6px_16px_-10px_rgba(11,14,15,.3)]">
                <Avatar initials={first.initials} />
                <span className="min-w-0 flex-1">
                  <span className="flex justify-between gap-1.5">
                    <b className="text-[12.5px] leading-[1.2] font-semibold">{first.name}</b>
                    <i className="font-mono text-[10.5px] leading-[1.2] text-subtle not-italic">
                      {first.time}
                    </i>
                  </span>
                  <span className="block truncate text-[11.5px] leading-[1.4] text-muted">
                    {first.preview}
                  </span>
                  <Chip className="mt-[5px]">Asesor · {first.agent}</Chip>
                </span>
              </div>
            ) : null}

            {[second, third].map((item, index) =>
              item ? (
                <div
                  key={item.name}
                  className={`flex gap-[9px] rounded-[11px] border border-line-soft p-[10px] ${
                    index === 1 ? "opacity-75" : ""
                  }`}
                >
                  <Avatar initials={item.initials} tone="muted" />
                  <span className="min-w-0 flex-1">
                    <span className="flex justify-between gap-1.5">
                      <b className="text-[12.5px] leading-[1.2] font-semibold">{item.name}</b>
                      <i className="font-mono text-[10.5px] leading-[1.2] text-subtle not-italic">
                        {item.time}
                      </i>
                    </span>
                    <span className="block truncate text-[11.5px] leading-[1.4] text-muted">
                      {item.preview}
                    </span>
                  </span>
                </div>
              ) : null,
            )}
          </div>

          {/* Panel de contexto — se oculta en móvil para no comprimir el texto */}
          <div className="hidden min-w-0 flex-col gap-[10px] bg-surface-soft px-[13px] py-[14px] sm:flex">
            <div className="flex items-center gap-[9px]">
              <Avatar initials="MG" size={30} />
              <span className="min-w-0">
                <b className="block font-display text-[13px] leading-[1.2] font-semibold">
                  María Gómez
                </b>
                <i className="text-[11px] leading-[1.3] text-subtle not-italic">
                  {demoData.account.company}
                </i>
              </span>
            </div>

            <div className="rounded-[11px] border border-line bg-surface p-[11px]">
              <span className="block text-[10px] leading-none font-semibold tracking-[0.08em] text-subtle uppercase">
                Oportunidad
              </span>
              <span className="mt-1.5 block font-display text-[13.5px] leading-[1.3] font-semibold">
                {demoData.opportunity.name}
              </span>
              <span className="mt-[9px] flex items-center justify-between">
                <i className="font-mono text-[12px] leading-none font-semibold text-ink not-italic">
                  {demoData.opportunity.value}
                </i>
                <Chip>{demoData.opportunity.stage}</Chip>
              </span>
            </div>

            <div className="rounded-[11px] border border-line bg-surface p-[11px]">
              <span className="block text-[10px] leading-none font-semibold tracking-[0.08em] text-subtle uppercase">
                Próxima tarea
              </span>
              <span className="mt-[7px] flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="h-[7px] w-[7px] flex-none animate-(--animate-t-pulse) rounded-full bg-brand"
                />
                <b className="text-[12.5px] leading-[1.35] font-medium">{demoData.nextTask}</b>
              </span>
            </div>

            <div aria-hidden="true" className="mt-auto flex items-end gap-[5px]">
              <span className="h-[26px] flex-1 rounded-t-[5px] bg-line" />
              <span className="h-[40px] flex-1 rounded-t-[5px] bg-line" />
              <span className="h-[33px] flex-1 rounded-t-[5px] bg-brand-gold" />
              <span className="h-[52px] flex-1 rounded-t-[5px] bg-brand" />
              <span className="h-[44px] flex-1 rounded-t-[5px] bg-line" />
            </div>
          </div>
        </div>
      </div>

      {/* Tarjeta flotante superior. Vive en el espacio reservado por el
          padding, así que no cubre ningún dato del panel. */}
      <div className="absolute top-0 right-0 w-[min(240px,66%)] animate-(--animate-t-float) rounded-[14px] border border-line bg-surface p-3 shadow-[0_22px_46px_-18px_rgba(11,14,15,.36)]">
        <div className="flex items-center gap-[9px]">
          <span
            aria-hidden="true"
            className="grid h-[26px] w-[26px] flex-none place-items-center rounded-lg bg-wa/[0.14]"
          >
            <span className="block h-[10px] w-[10px] rounded-full bg-wa" />
          </span>
          <b className="text-[12px] leading-[1.2] font-semibold">Nueva conversación</b>
        </div>
        <p className="mt-2 text-[11.5px] leading-[1.45] text-muted">
          WhatsApp Business · asignada a <b className="text-ink">Camilo R.</b>
        </p>
      </div>

      {/* Tarjeta flotante inferior */}
      <div className="on-dark absolute bottom-0 left-0 w-[min(220px,62%)] animate-(--animate-t-float-slow) rounded-[14px] bg-ink px-[13px] py-3 text-bone shadow-[0_22px_46px_-18px_rgba(11,14,15,.5)]">
        <span className="block text-[9.5px] leading-none font-semibold tracking-[0.1em] text-brand-gold uppercase">
          Pipeline
        </span>
        <div aria-hidden="true" className="mt-[9px] flex gap-1.5">
          <span className="h-[5px] flex-1 rounded-full bg-brand-gold" />
          <span className="h-[5px] flex-1 rounded-full bg-brand" />
          <span className="h-[5px] flex-1 rounded-full bg-bone/[0.22]" />
          <span className="h-[5px] flex-1 rounded-full bg-bone/[0.22]" />
        </div>
        <p className="mt-[9px] text-[11.5px] leading-[1.4] font-medium text-bone/[0.72]">
          Oportunidad movida a <b className="text-white">Negociación</b>
        </p>
      </div>
    </div>
  );
}
