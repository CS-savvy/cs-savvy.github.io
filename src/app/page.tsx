import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { NeuralGraphic } from "@/components/neural-graphic";
import { ProjectCard } from "@/components/project-card";
import { Section } from "@/components/section";
import { SocialLinks } from "@/components/social-links";
import { certifications, education, experience, patents, projects, publications, site, skills } from "@/content/site";
import { ArrowRightIcon, DownloadIcon, ExternalIcon } from "@/components/icons";

export default function Home() {
  return (
    <>
      <Hero />

      <Section id="about" eyebrow="About" title="Hi, I'm Mukul.">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
          <div className="space-y-4 text-lg leading-relaxed text-muted">
            {site.about.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <dl className="grid h-fit gap-px overflow-hidden rounded-2xl border border-border bg-border">
            {[
              ["Role", site.role],
              ["Focus", "Computer Vision, NLP, GNNs"],
              ["Location", site.location],
              ["Status", site.availability],
            ]
              .filter(([, v]) => v)
              .map(([k, v]) => (
                <div key={k} className="bg-card px-5 py-4">
                  <dt className="font-mono text-xs tracking-wider text-muted uppercase">{k}</dt>
                  <dd className="mt-1 font-medium">{v}</dd>
                </div>
              ))}
          </dl>
        </div>
        <ul className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4">
          {site.stats.map(({ value, label }) => (
            <li key={label} className="bg-card px-5 py-6">
              <p className="text-gradient text-3xl font-semibold tracking-tight sm:text-4xl">{value}</p>
              <p className="mt-1 text-sm text-muted">{label}</p>
            </li>
          ))}
        </ul>
      </Section>

      {experience.length > 0 && (
        <Section id="experience" eyebrow="Career" title="Experience">
          <ol className="relative space-y-10 border-l border-border pl-8">
            {experience.map((job) => (
              <li key={`${job.company}-${job.period}`} className="relative">
                <span className="absolute top-1.5 -left-[37px] size-2.5 rounded-full bg-accent ring-4 ring-background" />
                <p className="font-mono text-xs text-muted">
                  {job.period}
                  {job.location && <span> · {job.location}</span>}
                </p>
                <h3 className="mt-1 text-lg font-semibold">
                  {job.role} <span className="text-muted">· {job.company}</span>
                </h3>
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-muted marker:text-border">
                  {job.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
                {job.stack?.length ? (
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {job.stack.map((t) => (
                      <li key={t} className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted">
                        {t}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ol>
        </Section>
      )}

      <Section id="projects" eyebrow="Selected work" title="Projects">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </Section>

      <Section id="research" eyebrow="Research" title="Publications & patents">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <h3 className="font-mono text-xs tracking-wider text-muted uppercase">Peer-reviewed papers</h3>
            <ul className="mt-4 space-y-4">
              {publications.map((pub) => (
                <li key={pub.title} className="rounded-2xl border border-border bg-card p-6">
                  <p className="font-mono text-xs text-muted">
                    {pub.date} · {pub.venue}
                  </p>
                  <h4 className="mt-2 font-semibold leading-snug">
                    {pub.href ? (
                      <a
                        href={pub.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-start gap-1.5 hover:text-accent"
                      >
                        {pub.title}
                        <ExternalIcon width={14} height={14} className="mt-1 shrink-0" />
                      </a>
                    ) : (
                      pub.title
                    )}
                  </h4>
                  {pub.authors && <p className="mt-2 text-sm text-muted">{pub.authors}</p>}
                  {pub.summary && <p className="mt-3 text-sm leading-relaxed text-muted">{pub.summary}</p>}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-mono text-xs tracking-wider text-muted uppercase">Patents filed</h3>
            <ol className="mt-4 divide-y divide-border rounded-2xl border border-border bg-card">
              {patents.map((pt) => (
                <li key={pt.title} className="px-6 py-4">
                  <p className="text-sm font-medium leading-snug">{pt.title}</p>
                  <p className="mt-1 font-mono text-xs text-muted">
                    Filed {pt.filed}
                    {pt.id && <span> · {pt.id}</span>}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      <Section id="skills" eyebrow="Toolkit" title="What I work with">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map(({ group, items }) => (
            <div key={group} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-semibold">{group}</h3>
              <ul className="mt-4 space-y-2 text-sm text-muted">
                {items.map((s) => (
                  <li key={s} className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-accent" aria-hidden />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section id="education" eyebrow="Background" title="Education & certifications">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
          <ol className="space-y-4">
            {education.map((ed) => (
              <li key={ed.degree} className="rounded-2xl border border-border bg-card p-6">
                <p className="font-mono text-xs text-muted">
                  {ed.period}
                  {ed.location && <span> · {ed.location}</span>}
                </p>
                <h3 className="mt-1 text-lg font-semibold">{ed.degree}</h3>
                <p className="text-muted">{ed.school}</p>
              </li>
            ))}
          </ol>
          <ul className="h-fit space-y-3 rounded-2xl border border-border bg-card p-6 text-sm text-muted">
            {certifications.map((c) => (
              <li key={c} className="flex gap-3">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section id="contact" eyebrow="Contact" title="Let's build something together">
        <div className="grid gap-10 md:grid-cols-[1fr_1.4fr]">
          <div className="space-y-6 text-muted">
            <p className="text-lg leading-relaxed">
              Have a role, a research collaboration or an interesting CV/NLP problem in mind? Send me a message and
              I&apos;ll reply as soon as I can.
            </p>
            <p>
              Or email me directly at{" "}
              <a href={`mailto:${site.email}`} className="text-foreground underline decoration-border underline-offset-4 hover:decoration-accent">
                {site.email}
              </a>
              .
            </p>
            <SocialLinks />
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <ContactForm />
          </div>
        </div>
      </Section>
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10" aria-hidden />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-accent/20 blur-3xl"
        aria-hidden
      />
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pt-16 pb-20 sm:px-6 sm:pt-24 md:grid-cols-[1.3fr_1fr] md:pb-28">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted backdrop-blur">
            <span className="size-2 rounded-full bg-emerald-500" aria-hidden />
            {site.availability}
          </p>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
            {site.name} <span className="text-muted">-</span> <span className="text-gradient">{site.role}</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-muted">{site.headline}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              View projects <ArrowRightIcon width={16} height={16} />
            </Link>
            <Link
              href="/#contact"
              className="rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent"
            >
              Get in touch
            </Link>
            {site.resumeUrl && (
              <a
                href={site.resumeUrl}
                download
                className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent"
              >
                <DownloadIcon width={16} height={16} /> Download résumé
              </a>
            )}
          </div>
        </div>
        <div className="mx-auto w-full max-w-sm md:max-w-none">
          <NeuralGraphic />
        </div>
      </div>
    </section>
  );
}
