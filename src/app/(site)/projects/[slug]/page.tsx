import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { ArrowLeftIcon, ArrowRightIcon, ExternalIcon } from "@/components/icons";
import { RichText } from "@/components/rich-text";
import { SanityImage } from "@/components/sanity-image";
import { CompactTestimonial } from "@/components/testimonial";
import { bookingHref, getProject, getProjectTestimonial, getProjects, getSettings } from "@/content";
import { pageMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  return (await getProjects()).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};
  return pageMetadata({
    path: `/projects/${slug}`,
    title: project.title,
    description: project.summary,
    type: "article",
    ownImage: true,
  });
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="font-mono text-xs tracking-widest text-accent uppercase">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const [project, testimonial, site] = await Promise.all([getProject(slug), getProjectTestimonial(slug), getSettings()]);
  if (!project) notFound();

  const research = project.kind === "research";
  const body = "space-y-5 text-lg leading-relaxed";
  const booking = bookingHref(site);

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <Link
        href={research ? "/#research" : "/#projects"}
        className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground"
      >
        <ArrowLeftIcon width={16} height={16} /> {research ? "Research" : "All case studies"}
      </Link>

      <p className="mt-10 font-mono text-xs text-muted">
        {[research ? "Research" : "Case study", project.year].filter(Boolean).join(" · ")}
      </p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">{project.title}</h1>
      <p className="mt-4 text-lg text-muted">{project.summary}</p>

      {project.results.length > 0 && (
        <ul
          aria-label="Key results"
          className={`mt-10 grid gap-px overflow-hidden rounded-2xl border border-border bg-border ${
            project.results.length > 1 ? "sm:grid-cols-3" : ""
          }`}
        >
          {project.results.map(({ value, label }) => (
            <li key={label} className="bg-card px-5 py-6">
              <p className="text-gradient text-3xl font-semibold tracking-tight sm:text-4xl">{value}</p>
              <p className="mt-1 text-sm text-muted">{label}</p>
            </li>
          ))}
        </ul>
      )}

      {project.context && (
        <Block title="Context">
          <p className="text-lg leading-relaxed text-muted">{project.context}</p>
        </Block>
      )}

      {project.problem.length > 0 && (
        <Block title="Problem">
          <RichText value={project.problem} className={body} />
        </Block>
      )}

      {project.approach.length > 0 ? (
        <Block title="Approach">
          <RichText value={project.approach} className={body} />
        </Block>
      ) : (
        project.description.length > 0 && <RichText value={project.description} className={`mt-12 ${body}`} />
      )}

      {project.image?.asset && (
        <figure className="mt-10">
          <SanityImage
            value={{ ...project.image, alt: project.image.alt ?? "" }}
            sizes="(min-width: 768px) 720px, 100vw"
            className="w-full rounded-2xl border border-border"
          />
          {project.image.caption && (
            <figcaption className="mt-3 text-center text-sm text-muted">{project.image.caption}</figcaption>
          )}
        </figure>
      )}

      {project.highlights?.length ? (
        <Block title="Results">
          <ul className="space-y-2 rounded-2xl border border-border bg-card p-6 text-muted">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-3">
                <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                {h}
              </li>
            ))}
          </ul>
        </Block>
      ) : null}

      {project.stack.length > 0 && (
        <Block title="Stack">
          <ul className="flex flex-wrap gap-1.5">
            {project.stack.map((tool) => (
              <li key={tool} className="rounded-full border border-border px-3 py-1 text-sm text-muted">
                {tool}
              </li>
            ))}
          </ul>
        </Block>
      )}

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
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          ))}
        </div>
      ) : null}

      <CompactTestimonial testimonial={testimonial} />

      <section
        aria-labelledby="cta-title"
        className="mt-16 rounded-2xl border border-border bg-card p-6 sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-8"
      >
        <div>
          <h2 id="cta-title" className="text-xl font-semibold tracking-tight">
            Have a similar problem?
          </h2>
          <p className="mt-1 text-muted">Tell me what you&apos;re working on and I&apos;ll tell you honestly whether I can help.</p>
        </div>
        <a
          href={booking}
          {...(booking.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
          className="mt-5 inline-flex shrink-0 items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90 sm:mt-0"
        >
          Let&apos;s talk <ArrowRightIcon width={16} height={16} />
        </a>
      </section>
    </article>
  );
}
