import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "title", type: "string", description: "Their job title, e.g. Head of AI", validation: (r) => r.required() }),
    defineField({ name: "company", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "relationship",
      type: "string",
      description: "How they know you, e.g. “Managed Mukul at Blackstraw.ai”",
      validation: (r) => r.required(),
    }),
    defineField({ name: "quote", type: "text", rows: 6, validation: (r) => r.required() }),
    defineField({
      name: "shortQuote",
      type: "text",
      rows: 2,
      description: "1–2 sentences for case study pages. Falls back to the full quote.",
    }),
    defineField({
      name: "linkedinUrl",
      title: "LinkedIn URL",
      type: "url",
      validation: (r) => r.required().uri({ scheme: ["https"] }),
    }),
    defineField({
      name: "avatar",
      type: "image",
      options: { hotspot: true },
      description: "Square photo. Initials are shown when empty.",
    }),
    defineField({
      name: "project",
      type: "reference",
      to: [{ type: "project" }],
      description: "Shows this testimonial on that project's case study page",
    }),
    defineField({ name: "featured", type: "boolean", description: "Show on the homepage", initialValue: true }),
    defineField({ name: "order", type: "number", description: "Lower numbers appear first", initialValue: 100 }),
  ],
  orderings: [{ title: "Display order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "company", media: "avatar" } },
});
