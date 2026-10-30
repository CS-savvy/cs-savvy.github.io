"use client";

import { useActionState } from "react";
import { sendContact, type ContactState } from "@/app/actions";
import { BUDGET_OPTIONS, OTHER_PROJECT_TYPE, TIMELINE_OPTIONS } from "@/lib/contact-options";

const initialState: ContactState = { status: "idle" };

const inputClass =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted/70 focus:border-accent focus:ring-4 focus:ring-ring";

const selectClass = `${inputClass} appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='%239a9aa8' stroke-width='2' viewBox='0 0 24 24'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")] bg-[position:right_1rem_center] bg-no-repeat pr-10`;

function Select({ name, options, placeholder, value }: { name: string; options: readonly string[]; placeholder: string; value?: string }) {
  return (
    // `key` remounts the select so defaultValue is restored after a failed submit.
    <select key={value} id={name} name={name} defaultValue={value ?? ""} className={selectClass}>
      <option value="">{placeholder}</option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}

/** `projectTypes` are the service titles, so enquiries map onto what's offered. */
export function ContactForm({ projectTypes }: { projectTypes: string[] }) {
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
      <Field label="Project type" name="projectType" error={state.errors?.projectType?.[0]}>
        <Select
          name="projectType"
          options={[...projectTypes, OTHER_PROJECT_TYPE]}
          placeholder="Choose one…"
          value={fields.projectType}
        />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Budget (optional)" name="budget" error={state.errors?.budget?.[0]}>
          <Select name="budget" options={BUDGET_OPTIONS} placeholder="Select a range…" value={fields.budget} />
        </Field>
        <Field label="Timeline (optional)" name="timeline" error={state.errors?.timeline?.[0]}>
          <Select name="timeline" options={TIMELINE_OPTIONS} placeholder="When do you want to start?" value={fields.timeline} />
        </Field>
      </div>
      <Field label="About the project" name="message" error={state.errors?.message?.[0]}>
        <textarea
          id="message"
          name="message"
          rows={5}
          defaultValue={fields.message}
          placeholder="What are you building, what's in the way, and what does success look like?"
          className={`${inputClass} resize-y`}
        />
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
