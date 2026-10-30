import type { Service } from "@/content/types";
import { ArrowRightIcon } from "./icons";

export function ServiceCard({ service, href }: { service: Service; href: string }) {
  const external = href.startsWith("http");
  return (
    <article className="reveal flex flex-col rounded-2xl border border-border bg-card p-6 sm:p-8">
      <h3 className="text-xl font-semibold tracking-tight">{service.title}</h3>
      {service.audience && (
        <>
          <p className="mt-5 font-mono text-xs tracking-wider text-muted uppercase">Who it&apos;s for</p>
          <p className="mt-2 leading-relaxed text-muted">{service.audience}</p>
        </>
      )}
      {service.deliverables.length > 0 && (
        <>
          <p className="mt-5 font-mono text-xs tracking-wider text-muted uppercase">What you get</p>
          <ul className="mt-3 space-y-2">
            {service.deliverables.map((d) => (
              <li key={d} className="flex gap-3 text-sm leading-relaxed">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                {d}
              </li>
            ))}
          </ul>
        </>
      )}
      {service.proof && <p className="mt-5 text-sm text-muted italic">{service.proof}</p>}
      <div className="flex-1" />
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5">
        {service.timeline && <p className="font-mono text-xs text-muted">Typical timeline · {service.timeline}</p>}
        <a
          href={href}
          {...(external && { target: "_blank", rel: "noopener noreferrer" })}
          className="group inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
        >
          {service.ctaLabel || "Discuss this"}
          <span className="sr-only"> - {service.title}</span>
          <ArrowRightIcon width={16} height={16} className="transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </article>
  );
}
