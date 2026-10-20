import type { SideProject } from "@/content/types";
import { ExternalIcon } from "./icons";

export function SideProjectCard({ project }: { project: SideProject }) {
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-[0_8px_40px_-12px_var(--ring)]"
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-semibold tracking-tight group-hover:text-accent">{project.title}</h3>
        <ExternalIcon width={14} height={14} className="shrink-0 text-muted group-hover:text-accent" />
      </div>
      <p className="mt-1 font-mono text-xs text-muted">{new URL(project.href).hostname.replace(/^www\./, "")}</p>
      {project.description && <p className="mt-3 text-sm leading-relaxed text-muted">{project.description}</p>}
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}
