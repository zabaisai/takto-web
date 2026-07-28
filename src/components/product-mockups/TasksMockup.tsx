import { demoData } from "@/data/landing-content";
import { Sequence } from "@/components/motion/Sequence";
import { TaskBox } from "./primitives";

const rowStyles = {
  overdue: "border border-danger/20 border-l-[3px] border-l-danger",
  today: "border border-line border-l-[3px] border-l-brand",
  upcoming: "border border-line",
  done: "border border-line opacity-[0.62]",
} as const;

/** Lista de tareas del día con una vencida y una completada. Datos ficticios. */
export function TasksMockup() {
  return (
    <Sequence
      label="Lista de tareas del día en Tehus CRM: una tarea vencida, una para hoy que se marca como completada durante la demostración, una para mañana y una ya completada, cada una con su responsable y su hora. Datos de ejemplo."
      className="rounded-[18px] border border-line bg-surface-soft p-[clamp(14px,1.6vw,20px)] shadow-[0_30px_60px_-40px_rgba(11,14,15,.4)]"
    >
      <div className="mb-3 flex items-center justify-between">
        <b className="font-display text-[13px] leading-none font-semibold">Mis tareas · hoy</b>
        <span className="rounded-full bg-brand/10 px-2 py-[5px] text-[10.5px] leading-none font-semibold text-brand">
          1 vencida
        </span>
      </div>

      <div className="grid gap-[9px]">
        {demoData.tasks.map((task) => (
          <div
            key={task.title}
            className={`flex items-center gap-[11px] rounded-[11px] bg-surface p-3 ${rowStyles[task.state]}`}
          >
            <span className="relative flex flex-none items-center">
              <TaskBox
                size={15}
                tone={
                  task.state === "overdue"
                    ? "danger"
                    : task.state === "today"
                      ? "brand"
                      : task.state === "done"
                        ? "wa"
                        : "dim"
                }
                checked={task.state === "done"}
              />
              {/*
                La tarea de hoy se marca a mitad del ciclo y vuelve a su estado
                inicial. Es una capa superpuesta: la casilla real nunca
                desaparece, así que sin animación la lista se lee igual.
              */}
              {task.state === "today" ? (
                <span
                  aria-hidden="true"
                  className="seq-check absolute inset-0 grid place-items-center rounded-[4px] bg-wa text-[9px] font-bold text-white"
                  style={{
                    animationName: "seq-check",
                    animationDuration: "8s",
                    animationIterationCount: "infinite",
                    animationFillMode: "both",
                  }}
                >
                  ✓
                </span>
              ) : null}
            </span>

            <span className="min-w-0">
              <b
                className={`block text-[13px] leading-[1.3] font-semibold ${
                  task.state === "done" ? "line-through" : ""
                }`}
              >
                {task.title}
              </b>
              <i
                className={`text-[11.5px] leading-[1.3] not-italic ${
                  task.state === "overdue" ? "text-danger" : "text-muted"
                }`}
              >
                {task.meta}
              </i>
            </span>
          </div>
        ))}
      </div>
    </Sequence>
  );
}
