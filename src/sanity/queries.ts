import { defineQuery } from "next-sanity";

export const SETTINGS_QUERY = defineQuery(`*[_id == "siteSettings"][0]{
  name, role, url, intro, location, focus, availability, headline,
  "resumeUrl": *[_id == "resume"][0].pdf.asset->url,
  aboutTitle,
  "about": coalesce(about, []),
  "stats": coalesce(stats, []),
  email, contactBlurb,
  "socials": coalesce(socials, []),
  "sideProjects": coalesce(sideProjects, []),
  "headings": {
    "experience": experienceHeading,
    "projects": projectsHeading,
    "testimonials": testimonialsHeading,
    "research": researchHeading,
    "skills": skillsHeading,
    "education": educationHeading,
    "sideProjects": sideProjectsHeading,
    "blog": blogHeading,
    "contact": contactHeading
  }
}`);

export const RESUME_QUERY = defineQuery(`*[_id == "resume"][0]{
  "experience": coalesce(experience, []),
  "publications": coalesce(publications, []),
  "patents": coalesce(patents, []),
  "skills": coalesce(skills, []),
  "education": coalesce(education, []),
  "certifications": coalesce(certifications, [])
}`);

const projectFields = `
  "slug": slug.current, title, summary, year, featured,
  "description": coalesce(description, []),
  "tags": coalesce(tags, []),
  "highlights": coalesce(highlights, []),
  "links": coalesce(links, [])
`;

export const PROJECTS_QUERY = defineQuery(
  `*[_type == "project" && defined(slug.current)] | order(order asc, _createdAt asc){${projectFields}}`,
);

export const PROJECT_QUERY = defineQuery(`*[_type == "project" && slug.current == $slug][0]{${projectFields}}`);

const testimonialFields = `
  "id": _id, quote, shortQuote, name, title, company, relationship, linkedinUrl, avatar,
  "projectSlug": project->slug.current, "featured": coalesce(featured, false)
`;

export const TESTIMONIALS_QUERY = defineQuery(
  `*[_type == "testimonial" && (!$featured || featured == true)] | order(order asc, _createdAt asc){${testimonialFields}}`,
);

export const PROJECT_TESTIMONIAL_QUERY = defineQuery(
  `*[_type == "testimonial" && project->slug.current == $slug] | order(order asc, _createdAt asc)[0]{${testimonialFields}}`,
);

const postSummaryFields = `
  "slug": slug.current, title, excerpt, publishedAt, coverImage, location,
  "categories": coalesce(categories[]->{title, "slug": slug.current}, []),
  "readingTime": round(length(pt::text(body)) / 5 / 200)
`;

export const POSTS_QUERY = defineQuery(`*[_type == "post" && defined(slug.current)
  && (!defined($category) || $category in categories[]->slug.current)
] | order(publishedAt desc) [0...$limit]{${postSummaryFields}}`);

export const POST_QUERY = defineQuery(`*[_type == "post" && slug.current == $slug][0]{${postSummaryFields}, body}`);

export const CATEGORIES_QUERY =
  defineQuery(`*[_type == "category" && count(*[_type == "post" && references(^._id)]) > 0]
  | order(title asc){title, "slug": slug.current, description}`);
