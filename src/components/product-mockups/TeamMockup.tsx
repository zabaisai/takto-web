import { demoData } from "@/data/landing-content";
import { Avatar } from "./primitives";

/** Panel de usuarios de la empresa y registro de actividad. Datos ficticios. */
export function TeamMockup() {
  return (
    <>
      <div
        role="img"
        aria-label="Listado de usuarios de una empresa en TAKTO con su rol, cantidad de clientes asignados y estado de sesión. Datos de ejemplo."
        className="overflow-hidden rounded-[18px] border border-line"
      >
        <div className="flex items-center justify-between border-b border-line-soft bg-surface-soft px-4 py-3">
          <b className="font-display text-[12.5px] leading-none font-semibold">
            Usuarios de la empresa
          </b>
          <span className="text-[10.5px] leading-none font-semibold text-muted">4 activos</span>
        </div>
        <div className="grid bg-surface">
          {demoData.users.map((user, index) => (
            <span
              key={user.name}
              className={`flex items-center gap-[11px] px-4 py-3 ${
                index < demoData.users.length - 1 ? "border-b border-line-softer" : ""
              }`}
            >
              <Avatar
                initials={user.initials}
                tone={user.tone === "active" ? "ink" : user.tone === "admin" ? "brand" : "muted"}
              />
              <span className="min-w-0 flex-1">
                <b className="block text-[12.5px] leading-[1.3] font-semibold">{user.name}</b>
                <i className="text-[11px] leading-[1.3] text-subtle not-italic">{user.meta}</i>
              </span>
              <i
                className={`flex-none rounded-[5px] px-[7px] py-[5px] text-[9.5px] leading-none font-semibold not-italic ${
                  user.tone === "active"
                    ? "bg-wa/[0.16] text-ink"
                    : user.tone === "admin"
                      ? "border border-brand/30 text-brand"
                      : "bg-line-softer text-muted"
                }`}
              >
                {user.badge}
              </i>
            </span>
          ))}
        </div>
      </div>

      <div className="rounded-[18px] border border-line bg-surface-soft p-[18px]">
        <b className="font-display text-[12.5px] leading-none font-semibold">
          Actividad y sesiones
        </b>
        <div className="mt-3.5 grid gap-2.5">
          {demoData.activity.map((entry) => (
            <span key={entry.title} className="flex items-start gap-2.5">
              <span
                aria-hidden="true"
                className={`mt-[5px] h-[7px] w-[7px] flex-none rounded-full ${
                  entry.current ? "bg-brand" : "bg-line"
                }`}
              />
              <span>
                <b className="block text-[12.5px] leading-[1.35] font-medium">{entry.title}</b>
                <i className="text-[11px] leading-[1.3] text-subtle not-italic">{entry.meta}</i>
              </span>
            </span>
          ))}
        </div>
        <span className="mt-4 inline-block rounded-[9px] border border-danger/30 bg-danger/5 px-3 py-[9px] text-[11.5px] leading-none font-semibold text-danger">
          Revocar sesiones del usuario
        </span>
      </div>
    </>
  );
}
