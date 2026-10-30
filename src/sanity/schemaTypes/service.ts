import { defineField, defineType } from "sanity";

/** A consulting offer shown in the homepage Services section and the contact form's project-type select. */
export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "audience",
      title: "Who it's for",
      type: "text",
      rows: 2,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "deliverables",
      title: "What they get",
      type: "array",
      of: [{ type: "string" }],
      validation: (r) => r.required().min(1).max(4),
    }),
    defineField({ name: "timeline", title: "Typical timeline", type: "string", description: "e.g. 2–3 weeks" }),
    defineField({
      name: "proof",
      title: "Track record",
      type: "string",
      description: "Optional one-liner, e.g. “Backed by 4 filed patents”. Facts only.",
    }),
    defineField({ name: "ctaLabel", title: "Button label", type: "string", initialValue: "Discuss this" }),
    defineField({ name: "order", type: "number", description: "Lower numbers appear first", initialValue: 100 }),
  ],
  orderings: [{ title: "Display order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "timeline" } },
});
