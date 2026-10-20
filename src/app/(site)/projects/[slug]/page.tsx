import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon, ExternalIcon } from "@/components/icons";
import { RichText } from "@/components/rich-text";
import { CompactTestimonial } from "@/components/testimonial";
import { getProject, getProjectTestimonial, getProjects } from "@/content";

export async function generateStaticParams() {
  return (await getProjects()).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  return project ? { title: project.title, description: project.summary } : {};
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const [project, testimonial] = await Promise.all([getProject(slug), getProjectTestimonial(slug)]);
  if (!project) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <Link href="/#projects" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground">
        <ArrowLeftIcon width={16} height={16} /> All projects
      </Link>

      {project.year && <p className="mt-10 font-mono text-xs text-muted">{project.year}</p>}
      <h1
        className={`${project.year ? "mt-2" : "mt-10"} text-4xl font-semibold tracking-tight text-balance sm:text-5xl`}
      >
        {project.title}
      </h1>
      <p className="mt-4 text-lg text-muted">{project.summary}</p>

      <ul className="mt-6 flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <li key={tag} className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted">
            {tag}
          </li>
        ))}
      </ul>

      <RichText value={project.description} className="mt-12 space-y-5 text-lg leading-relaxed" />

      {project.highlights?.length ? (
        <section className="mt-12 rounded-2xl border border-border bg-card p-6">
          <h2 className="font-semibold">Highlights</h2>
          <ul className="mt-4 space-y-2 text-muted">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-3">
                <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                {h}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {project.links?.length ? (
        <div className="mt-8 flex flex-wrap gap-3">
          {project.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium hover:border-accent"
            >
              {l.label} <ExternalIcon width={14} height={14} />
            </a>
          ))}
        </div>
      ) : null}

      <CompactTestimonial testimonial={testimonial} />
    </article>
  );
}
