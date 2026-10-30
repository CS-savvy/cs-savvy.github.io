import type { Metadata } from "next";
import Link from "next/link";
import { Background } from "@/components/background";
import { ContactForm } from "@/components/contact-form";
import { JsonLd } from "@/components/json-ld";
import { NeuralGraphic } from "@/components/neural-graphic";
import { ProjectCard } from "@/components/project-card";
import { Section } from "@/components/section";
import { PostCard } from "@/components/post-card";
import { RichText } from "@/components/rich-text";
import { ServiceCard } from "@/components/service-card";
import { SideProjectCard } from "@/components/side-project-card";
import { SocialLinks } from "@/components/social-links";
import { LINKEDIN_RECOMMENDATIONS_URL, TestimonialCard } from "@/components/testimonial";
import {
  bookingHref,
  getPosts,
  getProjects,
  getResume,
  getServices,
  getSettings,
  getTestimonials,
  heading,
  processSteps,
  selectedWork,
  type Resume,
  type Service,
  type SiteSettings,
} from "@/content";
import { ArrowRightIcon, CalendarIcon, ExternalIcon, LinkedInIcon } from "@/components/icons";
import { pageMetadata } from "@/lib/seo";

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata({ path: "/" });
}

/** Opens external booking links (Cal.com, Calendly) in a new tab; in-page anchors stay in place. */
function externalProps(href: string) {
  return href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {};
}

export default async function Home() {
  const [site, resume, projects, services, posts, featuredTestimonials] = await Promise.all([
    getSettings(),
    getResume(),
    getProjects(),
    getServices(),
    getPosts({ limit: 3 }),
    getTestimonials({ featured: true }),
  ]);
  const { experience, publications, patents, skills, education } = resume;
  const work = selectedWork(projects);
  const research = projects.filter((p) => p.kind === "research");
  const steps = processSteps(site);
  const booking = bookingHref(site);
  const toolkit = heading(site, "skills");

  return (
    <>
      <StructuredData site={site} services={services} resume={resume} />
      <Hero site={site} booking={booking} />

      <Section id="about" eyebrow="About" title={site.aboutTitle || `Hi, I'm ${site.name.split(" ")[0]}.`}>
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
          <RichText value={site.about} className="space-y-4 text-lg leading-relaxed text-muted" />
          <dl className="grid h-fit gap-px overflow-hidden rounded-2xl border border-border bg-border">
            {[
              ["Focus", site.focus],
              ["Based in", site.location],
              ["Engagements", site.engagements],
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

      {services.length > 0 && (
        <Section id="services" {...heading(site, "services")}>
          <div className="grid gap-5 md:grid-cols-2">
            {services.map((s) => (
              <ServiceCard key={s.id} service={s} href={booking} />
            ))}
          </div>
        </Section>
      )}

      {work.length > 0 && (
        <Section id="projects" {...heading(site, "projects")}>
          <div className={`grid gap-5 md:grid-cols-2 ${work.length === 4 ? "" : "lg:grid-cols-3"}`}>
            {work.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </Section>
      )}

      {featuredTestimonials.length > 0 && (
        <Section id="testimonials" {...heading(site, "testimonials")}>
          <div
            className={
              featuredTestimonials.length === 1 ? "max-w-3xl" : "grid gap-5 md:grid-cols-2 lg:grid-cols-3"
            }
          >
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

      <Section id="process" {...heading(site, "process")}>
        <ol className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li key={step.title} className="bg-card p-6">
              <p className="font-mono text-xs text-accent" aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 font-semibold">{step.title}</h3>
              {step.description && <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>}
            </li>
          ))}
        </ol>

        {skills.length > 0 && (
          <div className="mt-16">
            <p className="font-mono text-xs tracking-widest text-accent uppercase">{toolkit.eyebrow}</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight">{toolkit.title}</h3>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {skills.map(({ group, items }) => (
                <div key={group} className="rounded-2xl border border-border bg-card p-6">
                  <h4 className="font-semibold">{group}</h4>
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
          </div>
        )}
      </Section>

      {(publications.length > 0 || patents.length > 0 || research.length > 0) && (
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
                            <span className="sr-only">(opens in a new tab)</span>
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
          {research.length > 0 && (
            <div className="mt-12">
              <h3 className="font-mono text-xs tracking-wider text-muted uppercase">Research projects</h3>
              <div className="mt-4 grid gap-5 md:grid-cols-2">
                {research.map((p) => (
                  <ProjectCard key={p.slug} project={p} headingLevel="h4" />
                ))}
              </div>
            </div>
          )}
        </Section>
      )}

      {(experience.length > 0 || education.length > 0) && (
        <Section id="background" {...heading(site, "experience")}>
          <Background experience={experience} education={education} />
        </Section>
      )}

      {site.sideProjects.length > 0 && (
        <Section id="side-projects" {...heading(site, "sideProjects")}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {site.sideProjects.map((p) => (
              <SideProjectCard key={p.href} project={p} />
            ))}
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
            {site.bookingUrl && (
              <div className="rounded-2xl border border-border bg-card p-6">
                <p className="font-medium text-foreground">Prefer to talk?</p>
                <p className="mt-1 text-sm">Book a short intro call and we&apos;ll see whether I can help.</p>
                <a
                  href={site.bookingUrl}
                  {...externalProps(site.bookingUrl)}
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
                >
                  <CalendarIcon width={16} height={16} /> Book an intro call
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </div>
            )}
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
            <ContactForm projectTypes={services.map((s) => s.title)} />
          </div>
        </div>
      </Section>
    </>
  );
}

function Hero({ site, booking }: { site: SiteSettings; booking: string }) {
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
          <p className="font-mono text-xs tracking-widest text-accent uppercase">
            {site.name} · {site.role}
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {site.heroTitle ? (
              <HeroTitle title={site.heroTitle} />
            ) : (
              <>
                {site.name} <span className="text-muted">-</span> <span className="text-gradient">{site.role}</span>
              </>
            )}
          </h1>
          {site.headline && (
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-muted">{site.headline}</p>
          )}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={booking}
              {...externalProps(booking)}
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              Book an intro call <ArrowRightIcon width={16} height={16} />
            </a>
            <Link
              href="/#projects"
              className="rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent"
            >
              See case studies
            </Link>
          </div>
        </div>
        <div className="mx-auto w-full max-w-sm md:max-w-none">
          <NeuralGraphic />
        </div>
      </div>
    </section>
  );
}

/** Highlights the part after an em dash (or the whole title) with the brand gradient. */
function HeroTitle({ title }: { title: string }) {
  const [lead, ...rest] = title.split(" — ");
  if (!rest.length) return <>{title}</>;
  return (
    <>
      {lead} <span className="text-muted">—</span> <span className="text-gradient">{rest.join(" — ")}</span>
    </>
  );
}

function StructuredData({ site, services, resume }: { site: SiteSettings; services: Service[]; resume: Resume }) {
  const personId = `${site.url}/#person`;
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Person",
            "@id": personId,
            name: site.name,
            url: site.url,
            jobTitle: site.role,
            description: site.intro,
            ...(site.email && { email: site.email }),
            image: `${site.url}/opengraph-image`,
            address: { "@type": "PostalAddress", addressLocality: "Bengaluru", addressCountry: "IN" },
            sameAs: site.socials.map((s) => s.href).filter((href) => href.startsWith("http")),
            alumniOf: resume.education
              .filter((ed) => ed.school)
              .map((ed) => ({ "@type": "CollegeOrUniversity", name: ed.school })),
            knowsAbout: ["Computer vision", "Document AI", "OCR", "Deep learning", "Inference optimization", "MLOps"],
          },
          {
            "@type": "ProfessionalService",
            "@id": `${site.url}/#service`,
            name: `${site.name} — ${site.role}`,
            url: site.url,
            description: site.intro,
            ...(site.email && { email: site.email }),
            image: `${site.url}/opengraph-image`,
            founder: { "@id": personId },
            address: { "@type": "PostalAddress", addressLocality: "Bengaluru", addressCountry: "IN" },
            areaServed: ["United States", "European Union", "India"].map((name) => ({ "@type": "Place", name })),
            ...(services.length > 0 && {
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "ML consulting services",
                itemListElement: services.map((s) => ({
                  "@type": "Offer",
                  itemOffered: { "@type": "Service", name: s.title, description: s.audience },
                })),
              },
            }),
          },
        ],
      }}
    />
  );
}
