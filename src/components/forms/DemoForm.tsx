"use client";

import { useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cta, demo } from "@/data/landing-content";
import {
  ADVISOR_RANGES,
  LIMITS,
  emptyDemoRequest,
  hasErrors,
  normalizeDemoRequest,
  validateDemoRequest,
  type DemoRequestErrors,
  type DemoRequestInput,
} from "@/lib/validation/demo-request";

type Status = "normal" | "sending" | "sent" | "error";

const advisorLabels: Record<string, string> = {
  "1-3": "1 a 3",
  "4-10": "4 a 10",
  "11-25": "11 a 25",
  "25+": "Más de 25",
};

const fieldClass =
  "w-full rounded-[11px] border bg-surface-soft px-3.5 py-3 text-[14px] leading-[1.2] text-ink " +
  "transition-colors duration-150 focus:border-brand focus:bg-surface motion-reduce:transition-none";

export function DemoForm() {
  const router = useRouter();
  const formId = useId();
  const [values, setValues] = useState<DemoRequestInput>(emptyDemoRequest);
  const [errors, setErrors] = useState<DemoRequestErrors>({});
  const [status, setStatus] = useState<Status>("normal");
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  /** Bloquea reenvíos mientras una petición está en vuelo. */
  const inFlight = useRef(false);

  function update<K extends keyof DemoRequestInput>(field: K, value: DemoRequestInput[K]) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!(field in current)) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;

    const normalized = normalizeDemoRequest(values);
    const nextErrors = validateDemoRequest(normalized);

    if (hasErrors(nextErrors)) {
      setErrors(nextErrors);
      setStatus("error");
      setServerMessage(null);
      return;
    }

    inFlight.current = true;
    setErrors({});
    setStatus("sending");
    setServerMessage(null);

    try {
      const response = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(normalized),
      });

      const payload: unknown = await response.json().catch(() => null);

      if (!response.ok) {
        const body = (payload ?? {}) as { message?: string; errors?: DemoRequestErrors };
        if (body.errors) setErrors(body.errors);
        setStatus("error");
        setServerMessage(
          body.message ?? "No pudimos enviar tu solicitud. Inténtalo de nuevo en unos minutos.",
        );
        return;
      }

      setStatus("sent");
      setValues(emptyDemoRequest);
      // Confirmación en la propia página; la redirección a /gracias es un extra.
      router.prefetch("/gracias");
    } catch {
      setStatus("error");
      setServerMessage(
        "No pudimos enviar tu solicitud. Revisa tu conexión e inténtalo de nuevo.",
      );
    } finally {
      inFlight.current = false;
    }
  }

  if (status === "sent") {
    return (
      <div
        className="grid justify-items-center gap-3.5 px-1.5 py-[26px] text-center"
        role="status"
        aria-live="polite"
      >
        <span
          aria-hidden="true"
          className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-wa/[0.14] text-[22px] font-bold text-wa-deep"
        >
          ✓
        </span>
        <b className="font-display text-[22px] leading-[1.25] font-semibold">Solicitud enviada</b>
        <p className="max-w-[36ch] text-[14.5px] leading-[1.6] text-muted">
          Gracias. Un asesor de Tehus CRM te contactará para agendar la demostración.
        </p>
        <div className="mt-1 flex flex-wrap justify-center gap-2.5">
          <Link
            href="/gracias"
            className="inline-flex min-h-11 items-center rounded-[11px] bg-ink px-[18px] text-[13.5px] font-semibold text-bone"
          >
            Ver los siguientes pasos
          </Link>
          <button
            type="button"
            onClick={() => setStatus("normal")}
            className="inline-flex min-h-11 cursor-pointer items-center rounded-[11px] border border-line bg-surface px-[18px] text-[13.5px] font-semibold text-ink hover:border-brand"
          >
            Enviar otra solicitud
          </button>
        </div>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-4">
      {/* Campo trampa: invisible y fuera del orden de tabulación. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${formId}-website`}>No completar este campo</label>
        <input
          id={`${formId}-website`}
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={values.website ?? ""}
          onChange={(event) => update("website", event.target.value)}
        />
      </div>

      <div className="grid gap-3.5 [grid-template-columns:repeat(auto-fit,minmax(min(100%,180px),1fr))]">
        <Field
          id={`${formId}-nombre`}
          label="Nombre"
          error={errors.nombre}
          input={
            <input
              id={`${formId}-nombre`}
              name="nombre"
              type="text"
              autoComplete="name"
              maxLength={LIMITS.nombre}
              placeholder="Tu nombre"
              value={values.nombre}
              onChange={(event) => update("nombre", event.target.value)}
              aria-invalid={errors.nombre ? true : undefined}
              aria-describedby={errors.nombre ? `${formId}-nombre-error` : undefined}
              className={`${fieldClass} ${errors.nombre ? "border-danger" : "border-line"}`}
            />
          }
          errorId={`${formId}-nombre-error`}
        />

        <Field
          id={`${formId}-empresa`}
          label="Empresa"
          error={errors.empresa}
          input={
            <input
              id={`${formId}-empresa`}
              name="empresa"
              type="text"
              autoComplete="organization"
              maxLength={LIMITS.empresa}
              placeholder="Nombre de tu empresa"
              value={values.empresa}
              onChange={(event) => update("empresa", event.target.value)}
              aria-invalid={errors.empresa ? true : undefined}
              aria-describedby={errors.empresa ? `${formId}-empresa-error` : undefined}
              className={`${fieldClass} ${errors.empresa ? "border-danger" : "border-line"}`}
            />
          }
          errorId={`${formId}-empresa-error`}
        />
      </div>

      <div className="grid gap-3.5 [grid-template-columns:repeat(auto-fit,minmax(min(100%,180px),1fr))]">
        <Field
          id={`${formId}-correo`}
          label="Correo corporativo"
          error={errors.correo}
          input={
            <input
              id={`${formId}-correo`}
              name="correo"
              type="email"
              autoComplete="email"
              maxLength={LIMITS.correo}
              placeholder="nombre@empresa.com"
              value={values.correo}
              onChange={(event) => update("correo", event.target.value)}
              aria-invalid={errors.correo ? true : undefined}
              aria-describedby={errors.correo ? `${formId}-correo-error` : undefined}
              className={`${fieldClass} ${errors.correo ? "border-danger" : "border-line"}`}
            />
          }
          errorId={`${formId}-correo-error`}
        />

        <Field
          id={`${formId}-telefono`}
          label="Teléfono"
          error={errors.telefono}
          input={
            <input
              id={`${formId}-telefono`}
              name="telefono"
              type="tel"
              autoComplete="tel"
              maxLength={LIMITS.telefono}
              placeholder="Número de contacto"
              value={values.telefono}
              onChange={(event) => update("telefono", event.target.value)}
              aria-invalid={errors.telefono ? true : undefined}
              aria-describedby={errors.telefono ? `${formId}-telefono-error` : undefined}
              className={`${fieldClass} ${errors.telefono ? "border-danger" : "border-line"}`}
            />
          }
          errorId={`${formId}-telefono-error`}
        />
      </div>

      <Field
        id={`${formId}-asesores`}
        label="Cantidad aproximada de asesores"
        error={errors.asesores}
        errorId={`${formId}-asesores-error`}
        input={
          <select
            id={`${formId}-asesores`}
            name="asesores"
            value={values.asesores}
            onChange={(event) => update("asesores", event.target.value)}
            className={`${fieldClass} border-line`}
          >
            <option value="">Selecciona una opción</option>
            {ADVISOR_RANGES.map((range) => (
              <option key={range} value={range}>
                {advisorLabels[range]}
              </option>
            ))}
          </select>
        }
      />

      <Field
        id={`${formId}-necesidad`}
        label="Principal necesidad"
        error={errors.necesidad}
        errorId={`${formId}-necesidad-error`}
        input={
          <textarea
            id={`${formId}-necesidad`}
            name="necesidad"
            rows={3}
            maxLength={LIMITS.necesidad}
            placeholder="Ej.: organizar las conversaciones de WhatsApp y no perder seguimientos"
            value={values.necesidad}
            onChange={(event) => update("necesidad", event.target.value)}
            className={`${fieldClass} resize-y border-line leading-[1.5]`}
          />
        }
      />

      <div>
        <label htmlFor={`${formId}-consent`} className="flex cursor-pointer items-start gap-[11px]">
          <input
            id={`${formId}-consent`}
            name="consent"
            type="checkbox"
            checked={values.consent}
            onChange={(event) => update("consent", event.target.checked)}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? `${formId}-consent-error` : undefined}
            className="mt-0.5 h-[18px] w-[18px] flex-none accent-brand"
          />
          <span className="text-[12.5px] leading-[1.5] text-muted">
            Autorizo el tratamiento de mis datos para ser contactado sobre esta solicitud, según la{" "}
            <Link href="/tratamiento-datos" className="text-brand underline underline-offset-2">
              política de tratamiento de datos
            </Link>
            .
          </span>
        </label>
        {errors.consent ? (
          <p
            id={`${formId}-consent-error`}
            className="mt-1.5 text-[11.5px] leading-[1.3] font-medium text-danger"
          >
            {errors.consent}
          </p>
        ) : null}
      </div>

      <div aria-live="polite">
        {status === "error" ? (
          <div className="rounded-[11px] border border-danger/30 bg-danger/5 px-3.5 py-3 text-[12.5px] leading-[1.45] font-medium text-danger">
            {serverMessage ?? "Revisa los campos marcados para poder enviar tu solicitud."}
          </div>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={sending}
        className="w-full cursor-pointer rounded-xl bg-ink px-[22px] py-[17px] text-[15px] leading-none font-semibold text-bone shadow-[0_1px_0_rgba(229,185,79,.55)_inset,0_12px_26px_-12px_rgba(11,14,15,.6)] transition-transform duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
      >
        {sending ? "Enviando…" : cta.primary}
      </button>

      <p className="text-center text-[12px] leading-[1.5] text-subtle">{demo.footnote}</p>
    </form>
  );
}

function Field({
  id,
  label,
  input,
  error,
  errorId,
}: {
  id: string;
  label: string;
  input: React.ReactNode;
  error?: string | undefined;
  errorId: string;
}) {
  return (
    <div className="grid gap-[7px]">
      <label htmlFor={id} className="text-[12.5px] leading-none font-semibold text-ink">
        {label}
      </label>
      {input}
      {error ? (
        <p id={errorId} className="text-[11.5px] leading-[1.3] font-medium text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}
