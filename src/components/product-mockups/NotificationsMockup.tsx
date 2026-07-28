import { demoData } from "@/data/landing-content";
import { Sequence } from "@/components/motion/Sequence";

const dotTones = {
  wa: "bg-wa",
  danger: "bg-danger",
  brand: "bg-brand",
  muted: "bg-line",
} as const;

/** Centro de notificaciones del CRM. Datos ficticios. */
export function NotificationsMockup() {
  return (
    <Sequence
      label="Centro de notificaciones de Tehus CRM: llega un aviso nuevo, el contador pasa a uno y se listan la nueva conversación, una tarea vencida, una tarea próxima y la asignación de una oportunidad. Datos de ejemplo."
      className="w-[min(400px,100%)] overflow-hidden rounded-[18px] border border-line bg-surface-soft shadow-[0_30px_60px_-38px_rgba(11,14,15,.45)]"
    >
      <div className="flex items-center gap-2.5 border-b border-line-soft bg-surface px-4 py-[13px]">
        <span aria-hidden="true" className="relative grid h-[26px] w-[26px] place-items-center">
          {/* La campana hace un único movimiento corto por ciclo */}
          <span
            className="seq-bell block h-[13px] w-[13px] rounded-t-[5px] rounded-b-[3px] border-2 border-ink"
            style={{
              transformOrigin: "top center",
              animationName: "t-bell",
              animationDuration: "8s",
              animationIterationCount: "infinite",
            }}
          />
          <span
            className="seq-badge absolute -top-px -right-px grid h-[13px] w-[13px] place-items-center rounded-full border-2 border-white bg-danger text-[7px] leading-none font-bold text-white"
            style={{
              animationName: "seq-badge",
              animationDuration: "8s",
              animationIterationCount: "infinite",
              animationFillMode: "both",
            }}
          >
            1
          </span>
        </span>
        <b className="font-display text-[13px] leading-none font-semibold">Notificaciones</b>
        <span className="ml-auto text-[10.5px] leading-none font-semibold text-brand">
          Marcar todas
        </span>
      </div>

      <div className="grid bg-surface">
        {demoData.notifications.map((item, index) => (
          <span
            key={item.title}
            className={`${index === 0 ? "seq-toast" : ""} flex gap-[11px] px-4 py-[13px] ${
              index < demoData.notifications.length - 1 ? "border-b border-line-softer" : ""
            } ${item.unread ? "bg-brand/[0.04]" : ""}`}
            style={
              index === 0
                ? {
                    animationName: "seq-toast",
                    animationDuration: "8s",
                    animationIterationCount: "infinite",
                    animationFillMode: "both",
                  }
                : undefined
            }
          >
            <span
              aria-hidden="true"
              className={`mt-[5px] h-2 w-2 flex-none rounded-full ${dotTones[item.tone]}`}
            />
            <span>
              <b className="block text-[12.5px] leading-[1.35] font-semibold">{item.title}</b>
              <i className="text-[11px] leading-[1.3] text-subtle not-italic">{item.meta}</i>
            </span>
          </span>
        ))}
      </div>
    </Sequence>
  );
}
