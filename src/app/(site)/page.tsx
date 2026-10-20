import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { NeuralGraphic } from "@/components/neural-graphic";
import { ProjectCard } from "@/components/project-card";
import { Section } from "@/components/section";
import { PostCard } from "@/components/post-card";
import { RichText } from "@/components/rich-text";
import { SocialLinks } from "@/components/social-links";
import { LINKEDIN_RECOMMENDATIONS_URL, TestimonialCard } from "@/components/testimonial";
import { getPosts, getProjects, getResume, getSettings, getTestimonials, heading, type SiteSettings } from "@/content";
import { ArrowRightIcon, DownloadIcon, ExternalIcon, LinkedInIcon } from "@/components/icons";

export default async function Home() {
  const [site, resume, projects, posts, featuredTestimonials] = await Promise.all([
    getSettings(),
    getResume(),
    getProjects(),
    getPosts({ limit: 3 }),
    getTestimonials({ featured: true }),
  ]);
  const { experience, publications, patents, skills, education, certifications } = resume;

  return (
    <>
      <Hero site={site} />

      <Section id="about" eyebrow="About" title={site.aboutTitle || `Hi, I'm ${site.name.split(" ")[0]}.`}>
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
          <RichText value={site.about} className="space-y-4 text-lg leading-relaxed text-muted" />
          <dl className="grid h-fit gap-px overflow-hidden rounded-2xl border border-border bg-border">
            {[
              ["Role", site.role],
              ["Focus", site.focus],
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
        {site.stats.length > 0 && (
          <ul className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4">
            {site.stats.map(({ value, label }) => (
              <li key={label} className="bg-card px-5 py-6">
                <p className="text-gradient text-3xl font-semibold tracking-tight sm:text-4xl">{value}</p>
                <p className="mt-1 text-sm text-muted">{label}</p>
              </li>
            ))}
          </ul>
        )}
      </Section>

      {experience.length > 0 && (
        <Section id="experience" {...heading(site, "experience")}>
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
                  {job.points?.map((pt) => (
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

      {projects.length > 0 && (
        <Section id="projects" {...heading(site, "projects")}>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </Section>
      )}

      {featuredTestimonials.length > 0 && (
        <Section id="testimonials" {...heading(site, "testimonials")}>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {featuredTestimonials.map((t) => (
              <TestimonialCard key={t.id} testimonial={t} />
            ))}
          </div>
          <a
            href={LINKEDIN_RECOMMENDATIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
          >
            <LinkedInIcon width={16} height={16} /> Recommended on LinkedIn
            <ExternalIcon width={14} height={14} />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </Section>
      )}

      {(publications.length > 0 || patents.length > 0) && (
        <Section id="research" {...heading(site, "research")}>
          <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
            {publications.length > 0 && (
              <div>
                <h3 className="font-mono text-xs tracking-wider text-muted uppercase">Peer-reviewed papers</h3>
                <ul className="mt-4 space-y-4">
                  {publications.map((pub) => (
                    <li key={pub.title} className="rounded-2xl border border-border bg-card p-6">
                      <p className="font-mono text-xs text-muted">
                        {[pub.date, pub.venue].filter(Boolean).join(" · ")}
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
            )}
            {patents.length > 0 && (
              <div>
                <h3 className="font-mono text-xs tracking-wider text-muted uppercase">Patents filed</h3>
                <ol className="mt-4 divide-y divide-border rounded-2xl border border-border bg-card">
                  {patents.map((pt) => (
                    <li key={pt.title} className="px-6 py-4">
                      <p className="text-sm font-medium leading-snug">{pt.title}</p>
                      <p className="mt-1 font-mono text-xs text-muted">
                        {[pt.filed && `Filed ${pt.filed}`, pt.id].filter(Boolean).join(" · ")}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </Section>
      )}

      {skills.length > 0 && (
        <Section id="skills" {...heading(site, "skills")}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {skills.map(({ group, items }) => (
              <div key={group} className="rounded-2xl border border-border bg-card p-6">
                <h3 className="font-semibold">{group}</h3>
                <ul className="mt-4 space-y-2 text-sm text-muted">
                  {items?.map((s) => (
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
      )}

      {(education.length > 0 || certifications.length > 0) && (
        <Section id="education" {...heading(site, "education")}>
          <div className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
            <ol className="space-y-4">
              {education.map((ed) => (
                <li key={ed.degree} className="rounded-2xl border border-border bg-card p-6">
                  <p className="font-mono text-xs text-muted">{[ed.period, ed.location].filter(Boolean).join(" · ")}</p>
                  <h3 className="mt-1 text-lg font-semibold">{ed.degree}</h3>
                  <p className="text-muted">{ed.school}</p>
                </li>
              ))}
            </ol>
            {certifications.length > 0 && (
              <ul className="h-fit space-y-3 rounded-2xl border border-border bg-card p-6 text-sm text-muted">
                {certifications.map((c) => (
                  <li key={c} className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                    {c}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Section>
      )}

      {posts.length > 0 && (
        <Section id="blog" {...heading(site, "blog")}>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
          <Link
            href="/blog"
            className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
          >
            Read all posts <ArrowRightIcon width={16} height={16} />
          </Link>
        </Section>
      )}

      <Section id="contact" {...heading(site, "contact")}>
        <div className="grid gap-10 md:grid-cols-[1fr_1.4fr]">
          <div className="space-y-6 text-muted">
            {site.contactBlurb && <p className="text-lg leading-relaxed">{site.contactBlurb}</p>}
            {site.email && (
              <p>
                Or email me directly at{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="text-foreground underline decoration-border underline-offset-4 hover:decoration-accent"
                >
                  {site.email}
                </a>
                .
              </p>
            )}
            <SocialLinks socials={site.socials} />
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <ContactForm />
          </div>
        </div>
      </Section>
    </>
  );
}

/** Sanity's `dl` parameter forces a download with a readable filename (`download` is ignored cross-origin). */
function resumeDownloadUrl({ resumeUrl = "", name }: SiteSettings) {
  if (!resumeUrl.startsWith("https://cdn.sanity.io/")) return resumeUrl;
  return `${resumeUrl}?dl=${encodeURIComponent(`${name.replace(/\s+/g, "-")}-Resume.pdf`)}`;
}

function Hero({ site }: { site: SiteSettings }) {
  return (
    <section className="relative overflow-hidden">
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10" aria-hidden />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-accent/20 blur-3xl"
        aria-hidden
      />
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pt-16 pb-20 sm:px-6 sm:pt-24 md:grid-cols-[1.3fr_1fr] md:pb-28">
        <div>
          {site.availability && (
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted backdrop-blur">
              <span className="size-2 rounded-full bg-emerald-500" aria-hidden />
              {site.availability}
            </p>
          )}
          <h1 className=" text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
            {site.name} <span className="text-muted">-</span> <span className="text-gradient">{site.role}</span>
          </h1>
          {site.headline && (
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-muted">{site.headline}</p>
          )}
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
                href={resumeDownloadUrl(site)}
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
