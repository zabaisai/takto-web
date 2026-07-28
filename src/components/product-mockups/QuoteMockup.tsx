import { demoData } from "@/data/landing-content";
import { Chip } from "./primitives";

/** Documento de cotización con encabezado fiscal, líneas y total. Datos ficticios. */
export function QuoteMockup() {
  const { quote } = demoData;

  return (
    <div className="relative">
      <div
        role="img"
        aria-label={`Cotización ${quote.number} de una empresa de ejemplo, con dos líneas de producto y un total de ${quote.total}. Datos de ejemplo.`}
        className="rounded-2xl border border-line bg-surface p-[clamp(18px,2vw,26px)] shadow-[0_34px_66px_-40px_rgba(11,14,15,.45)]"
      >
        <div className="flex items-start justify-between gap-3.5 border-b border-line-soft pb-3.5">
          <span>
            <span className="flex items-center gap-2">
              <span aria-hidden="true" className="h-[22px] w-[22px] rounded-md bg-ink" />
              <b className="font-display text-[13px] leading-none font-semibold">{quote.company}</b>
            </span>
            <i className="mt-1.5 block text-[11px] leading-[1.4] text-subtle not-italic">
              {quote.fiscalNote}
            </i>
          </span>
          <span className="text-right">
            <b className="block font-mono text-[12px] leading-none font-semibold">{quote.number}</b>
            <Chip className="mt-[7px]">{quote.status}</Chip>
          </span>
        </div>

        <div className="grid gap-[9px] py-3.5">
          <span className="grid grid-cols-[1fr_46px_88px] gap-2 text-[9.5px] leading-none font-semibold tracking-[0.07em] text-subtle uppercase">
            <i className="not-italic">Producto</i>
            <i className="text-center not-italic">Cant.</i>
            <i className="text-right not-italic">Valor</i>
          </span>
          {quote.lines.map((line) => (
            <span
              key={line.product}
              className="grid grid-cols-[1fr_46px_88px] gap-2 border-t border-line-soft pt-2 text-[12.5px] leading-[1.4] text-ink"
            >
              <i className="not-italic">{line.product}</i>
              <i className="text-center not-italic">{line.qty}</i>
              <i className="text-right font-mono text-[12px] leading-[1.4] font-medium not-italic">
                {line.amount}
              </i>
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-ink pt-3.5">
          <b className="font-display text-[13px] leading-none font-semibold">Total</b>
          <b className="font-mono text-[16px] leading-none font-semibold text-brand">
            {quote.total}
          </b>
        </div>
      </div>

      <div className="on-dark absolute right-[-8px] bottom-[-16px] max-w-[70%] rounded-xl bg-ink px-3.5 py-[11px] text-bone shadow-[0_20px_40px_-18px_rgba(11,14,15,.6)]">
        <span className="text-[11px] leading-[1.3] font-semibold">{quote.relatedLabel}</span>
        <i className="mt-1 block text-[10.5px] leading-[1.3] text-bone/60 not-italic">
          {quote.related}
        </i>
      </div>
    </div>
  );
}
