"use client";

import { useActionState } from "react";
import { sendContact, type ContactState } from "@/app/actions";

const initialState: ContactState = { status: "idle" };

const inputClass =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted/70 focus:border-accent focus:ring-4 focus:ring-ring";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContact, initialState);
  const fields = state.status === "success" ? {} : (state.fields ?? {});

  return (
    // React resets the form after each submit; defaultValues restore input when validation fails.
    <form action={formAction} noValidate className="grid gap-4">
      <div className="hidden" aria-hidden>
        <label>
          Company <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" name="name" error={state.errors?.name?.[0]}>
          <input id="name" name="name" autoComplete="name" defaultValue={fields.name} className={inputClass} />
        </Field>
        <Field label="Email" name="email" error={state.errors?.email?.[0]}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            defaultValue={fields.email}
            className={inputClass}
          />
        </Field>
      </div>
      <Field label="Message" name="message" error={state.errors?.message?.[0]}>
        <textarea id="message" name="message" rows={5} defaultValue={fields.message} className={`${inputClass} resize-y`} />
      </Field>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center justify-center rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {pending ? "Sending…" : "Send message"}
        </button>
        <p
          aria-live="polite"
          className={`text-sm ${state.status === "error" ? "text-red-500" : "text-emerald-600 dark:text-emerald-400"}`}
        >
          {state.message}
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  error,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <label htmlFor={name} className="text-sm font-medium">
        {label}
      </label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
