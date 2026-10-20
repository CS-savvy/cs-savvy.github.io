import type { PortableTextBlock } from "next-sanity";

export type RichText = (
  PortableTextBlock | { _type: "image"; _key: string; asset?: { _ref: string }; alt?: string; caption?: string }
)[];

export type Social = {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "x" | "scholar" | "mail";
};

export type SectionKey =
  | "experience"
  | "projects"
  | "testimonials"
  | "research"
  | "skills"
  | "education"
  | "blog"
  | "contact";

export type SiteSettings = {
  name: string;
  role: string;
  url: string;
  intro?: string;
  location?: string;
  focus?: string;
  availability?: string;
  headline?: string;
  resumeUrl?: string;
  aboutTitle?: string;
  about: RichText;
  stats: { value: string; label: string }[];
  email?: string;
  contactBlurb?: string;
  socials: Social[];
  headings: Partial<Record<SectionKey, { eyebrow?: string; title?: string }>>;
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  description: RichText;
  tags: string[];
  year?: string;
  highlights?: string[];
  links?: { label: string; href: string }[];
  featured?: boolean;
};

export type Testimonial = {
  id: string;
  quote: string;
  /** 1–2 sentences, used in compact views such as case study pages. Falls back to `quote`. */
  shortQuote?: string;
  name: string;
  title: string;
  company: string;
  /** How they know you, e.g. "Managed Mukul at Blackstraw.ai". */
  relationship: string;
  linkedinUrl: string;
  /** Initials are shown when omitted. */
  avatar?: { asset?: { _ref: string } };
  /** Slug of the project whose case study page should show this testimonial. */
  projectSlug?: string;
  /** Featured testimonials appear on the homepage. */
  featured: boolean;
};

export type Experience = {
  role: string;
  company: string;
  period: string;
  location?: string;
  points?: string[];
  stack?: string[];
};

export type Publication = {
  title: string;
  venue?: string;
  date?: string;
  authors?: string;
  summary?: string;
  href?: string;
};

export type Patent = {
  title: string;
  filed?: string;
  id?: string;
};

export type Education = {
  degree: string;
  school?: string;
  period?: string;
  location?: string;
};

export type Resume = {
  experience: Experience[];
  publications: Publication[];
  patents: Patent[];
  skills: { group: string; items?: string[] }[];
  education: Education[];
  certifications: string[];
};

export type Category = { title: string; slug: string; description?: string };

export type PostSummary = {
  slug: string;
  title: string;
  excerpt?: string;
  publishedAt: string;
  coverImage?: { asset?: { _ref: string }; alt?: string };
  categories: Category[];
  location?: string;
  readingTime: number;
};

export type Post = PostSummary & { body: RichText };
