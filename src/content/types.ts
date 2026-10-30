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
  | "services"
  | "experience"
  | "projects"
  | "testimonials"
  | "research"
  | "skills"
  | "process"
  | "education"
  | "sideProjects"
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
  /** Hero H1; falls back to "name - role". */
  heroTitle?: string;
  headline?: string;
  /** Cal.com / Calendly link used by every "Book an intro call" button. */
  bookingUrl?: string;
  engagements?: string;
  resumeUrl?: string;
  aboutTitle?: string;
  about: RichText;
  stats: Metric[];
  email?: string;
  contactBlurb?: string;
  socials: Social[];
  sideProjects: SideProject[];
  process: ProcessStep[];
  headings: Partial<Record<SectionKey, { eyebrow?: string; title?: string }>>;
};

export type ProcessStep = { title: string; description?: string };

export type Service = {
  id: string;
  title: string;
  /** Who it's for. */
  audience?: string;
  deliverables: string[];
  timeline?: string;
  /** Short track-record line, e.g. "Backed by 4 filed patents". */
  proof?: string;
  ctaLabel?: string;
};

export type Metric = { value: string; label: string };

export type SideProject = {
  title: string;
  href: string;
  description?: string;
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  /** Client work is shown under Selected work; research under Research & patents. */
  kind: "client" | "research";
  context?: string;
  problem: RichText;
  approach: RichText;
  /** Key metrics shown as large figures at the top of the case study. */
  results: Metric[];
  stack: string[];
  image?: { asset?: { _ref: string }; alt?: string; caption?: string };
  /** Legacy free-form write-up, shown when `approach` is empty. */
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
  /** The recommender's own LinkedIn profile. */
  linkedinUrl?: string;
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
  /** One line for the homepage Background block. */
  summary?: string;
  /** Internships are kept in the CMS (and the PDF resume) but hidden on the homepage. */
  internship?: boolean;
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
