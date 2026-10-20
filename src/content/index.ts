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
  SETTINGS_QUERY,
  TESTIMONIALS_QUERY,
} from "@/sanity/queries";
import { fallbackProjects, fallbackResume, fallbackSettings, fallbackTestimonials } from "./fallback";
import type { Category, Post, PostSummary, Project, Resume, SectionKey, SiteSettings, Testimonial } from "./types";

export type * from "./types";

async function fetchData<T>(query: string, params: Record<string, unknown> = {}): Promise<T> {
  const { data } = await sanityFetch({ query, params, stega: false });
  return data as T;
}

/**
 * Until a "Site settings" document is published in Sanity, the site renders the
 * bundled fallback content (src/content/fallback.ts) so it never shows up empty.
 */
const getCmsSettings = cache(() => fetchData<SiteSettings | null>(SETTINGS_QUERY));

export const getSettings = cache(async (): Promise<SiteSettings> => (await getCmsSettings()) ?? fallbackSettings);

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
  experience: { eyebrow: "Career", title: "Experience" },
  projects: { eyebrow: "Selected work", title: "Projects" },
  testimonials: { eyebrow: "Testimonials", title: "What colleagues say" },
  research: { eyebrow: "Research", title: "Publications & patents" },
  skills: { eyebrow: "Toolkit", title: "What I work with" },
  education: { eyebrow: "Background", title: "Education & certifications" },
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

/** Header navigation, showing only sections that have content. */
export async function getNav() {
  const [resume, projects, posts] = await Promise.all([getResume(), getProjects(), getPosts({ limit: 1 })]);
  return [
    { label: "About", href: "/#about" },
    resume.experience.length > 0 && { label: "Experience", href: "/#experience" },
    projects.length > 0 && { label: "Projects", href: "/#projects" },
    (resume.publications.length > 0 || resume.patents.length > 0) && { label: "Research", href: "/#research" },
    resume.skills.length > 0 && { label: "Skills", href: "/#skills" },
    posts.length > 0 && { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/#contact" },
  ].filter((item): item is { label: string; href: string } => Boolean(item));
}
