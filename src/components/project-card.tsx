import Link from "next/link";
import type { Project } from "@/content/site";
import { ArrowRightIcon } from "./icons";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative flex flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-[0_8px_40px_-12px_var(--ring)]"
    >
      <div className="flex items-center justify-between font-mono text-xs text-muted">
        <span>{project.year}</span>
        {project.featured && <span className="rounded-full bg-accent/10 px-2 py-0.5 text-accent">Featured</span>}
      </div>
      <h3 className="mt-4 text-lg font-semibold tracking-tight">{project.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{project.summary}</p>
      <ul className="mt-5 flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <li key={tag} className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted">
            {tag}
          </li>
        ))}
      </ul>
      <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-accent">
        Read case study
        <ArrowRightIcon width={16} height={16} className="transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
