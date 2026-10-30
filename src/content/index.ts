import { cache } from "react";
import { sanityFetch } from "@/sanity/lib/live";
import {
  CATEGORIES_QUERY,
  POST_QUERY,
  POSTS_QUERY,
  PROJECT_QUERY,
  PROJECT_TESTIMONIAL_QUERY,
  PROJECTS_QUERY,
  RESUME_QUERY,
  SERVICES_QUERY,
  SETTINGS_QUERY,
  TESTIMONIALS_QUERY,
} from "@/sanity/queries";
import {
  fallbackProcess,
  fallbackProjects,
  fallbackResume,
  fallbackServices,
  fallbackSettings,
  fallbackTestimonials,
  googleScholarSocial,
} from "./fallback";
import type {
  Category,
  Post,
  PostSummary,
  ProcessStep,
  Project,
  Resume,
  SectionKey,
  Service,
  SiteSettings,
  Testimonial,
} from "./types";

export type * from "./types";

async function fetchData<T>(query: string, params: Record<string, unknown> = {}): Promise<T> {
  const { data } = await sanityFetch({ query, params, stega: false });
  return data as T;
}

/**
 * Until a "Site settings" document is published in Sanity, the site renders the
 * bundled fallback content (src/content/fallback.ts) so it never shows up empty.
 * Set CONTENT_FALLBACK=1 to preview the bundled content locally (blog posts still come from Sanity).
 */
const getCmsSettings = cache(() =>
  process.env.CONTENT_FALLBACK === "1" ? null : fetchData<SiteSettings | null>(SETTINGS_QUERY),
);

export const getSettings = cache(async (): Promise<SiteSettings> => {
  const settings = (await getCmsSettings()) ?? fallbackSettings;
  return {
    ...settings,
    socials: settings.socials.some(({ href }) => href === googleScholarSocial.href)
      ? settings.socials
      : [...settings.socials, googleScholarSocial],
  };
});

export const getResume = cache(async (): Promise<Resume> => {
  if (!(await getCmsSettings())) return fallbackResume;
  return (await fetchData<Resume | null>(RESUME_QUERY)) ?? fallbackResume;
});

export const getProjects = cache(async (): Promise<Project[]> => {
  if (!(await getCmsSettings())) return fallbackProjects;
  return fetchData<Project[]>(PROJECTS_QUERY);
});

export const getProject = cache(async (slug: string): Promise<Project | null> => {
  if (!(await getCmsSettings())) return fallbackProjects.find((p) => p.slug === slug) ?? null;
  return fetchData<Project | null>(PROJECT_QUERY, { slug });
});

export const getServices = cache(async (): Promise<Service[]> => {
  if (!(await getCmsSettings())) return fallbackServices;
  return fetchData<Service[]>(SERVICES_QUERY);
});

export const getTestimonials = cache(async ({ featured = false }: { featured?: boolean } = {}): Promise<Testimonial[]> => {
  if (!(await getCmsSettings())) return fallbackTestimonials.filter((t) => !featured || t.featured);
  return fetchData<Testimonial[]>(TESTIMONIALS_QUERY, { featured });
});

export const getProjectTestimonial = cache(async (slug: string): Promise<Testimonial | null> => {
  if (!(await getCmsSettings())) return fallbackTestimonials.find((t) => t.projectSlug === slug) ?? null;
  return fetchData<Testimonial | null>(PROJECT_TESTIMONIAL_QUERY, { slug });
});

export const getPosts = cache(
  async ({ category, limit = 1000 }: { category?: string; limit?: number } = {}): Promise<PostSummary[]> =>
    fetchData<PostSummary[]>(POSTS_QUERY, { category: category ?? null, limit }),
);

export const getPost = cache((slug: string) => fetchData<Post | null>(POST_QUERY, { slug }));

export const getCategories = cache(() => fetchData<Category[]>(CATEGORIES_QUERY));

const defaultHeadings: Record<SectionKey, { eyebrow: string; title: string }> = {
  services: { eyebrow: "Services", title: "How I can help" },
  experience: { eyebrow: "Background", title: "Where I've done this before" },
  projects: { eyebrow: "Selected work", title: "Case studies" },
  testimonials: { eyebrow: "Testimonials", title: "What people I've worked with say" },
  process: { eyebrow: "How I work", title: "From first call to hand-over" },
  research: { eyebrow: "Research & patents", title: "Publications, patents and research projects" },
  skills: { eyebrow: "How I deliver", title: "Tools for each stage" },
  education: { eyebrow: "Education", title: "Education" },
  sideProjects: { eyebrow: "Side projects", title: "Built on the side" },
  blog: { eyebrow: "Journal", title: "Life beyond the code" },
  contact: { eyebrow: "Contact", title: "Let's build something together" },
};

/** Section eyebrow/title from Site settings, falling back to the built-in defaults per field. */
export function heading(settings: SiteSettings, key: SectionKey) {
  const custom = settings.headings?.[key];
  return {
    eyebrow: custom?.eyebrow || defaultHeadings[key].eyebrow,
    title: custom?.title || defaultHeadings[key].title,
  };
}

/** Process steps from Site settings, or the built-in Discover → Build → Optimize → Hand over. */
export function processSteps(settings: SiteSettings): ProcessStep[] {
  return settings.process?.length ? settings.process : fallbackProcess;
}

/** Client case studies for the homepage: featured client work, or all client work if none is featured. */
export function selectedWork(projects: Project[]) {
  const client = projects.filter((p) => p.kind !== "research");
  const featured = client.filter((p) => p.featured);
  return (featured.length ? featured : client).slice(0, 4);
}

/** Primary call-to-action target: the booking link when set, otherwise the contact form. */
export function bookingHref(settings: SiteSettings) {
  return settings.bookingUrl || "/#contact";
}

/** Header navigation, showing only sections that have content. */
export async function getNav() {
  const [resume, projects, services, posts] = await Promise.all([
    getResume(),
    getProjects(),
    getServices(),
    getPosts({ limit: 1 }),
  ]);
  return [
    services.length > 0 && { label: "Services", href: "/#services" },
    selectedWork(projects).length > 0 && { label: "Work", href: "/#projects" },
    { label: "Process", href: "/#process" },
    (resume.publications.length > 0 || resume.patents.length > 0) && { label: "Research", href: "/#research" },
    posts.length > 0 && { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/#contact" },
  ].filter((item): item is { label: string; href: string } => Boolean(item));
}
