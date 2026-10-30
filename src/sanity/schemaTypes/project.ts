import { defineArrayMember, defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "year", type: "string", description: "e.g. 2023 – 2026" }),
    defineField({
      name: "summary",
      type: "text",
      rows: 3,
      description: "Shown on the project card",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "kind",
      type: "string",
      description: "Client work appears under Selected work; research under Research & patents",
      options: {
        list: [
          { title: "Client work", value: "client" },
          { title: "Research", value: "research" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      initialValue: "client",
    }),
    defineField({
      name: "results",
      title: "Key results",
      type: "array",
      description: "Shown as large figures at the top of the case study. Use only real numbers.",
      of: [
        defineArrayMember({
          type: "object",
          name: "metric",
          fields: [
            defineField({ name: "value", type: "string", description: "e.g. 45%", validation: (r) => r.required() }),
            defineField({ name: "label", type: "string", validation: (r) => r.required() }),
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        }),
      ],
      validation: (r) => r.max(4),
    }),
    defineField({
      name: "context",
      type: "text",
      rows: 3,
      description: "Who, where and when - one or two sentences",
    }),
    defineField({ name: "problem", type: "richText", description: "The problem in business terms" }),
    defineField({ name: "approach", type: "richText", description: "What was built and how" }),
    defineField({
      name: "image",
      title: "Image / diagram",
      type: "image",
      options: { hotspot: true },
      description: "Optional architecture diagram or screenshot, shown after the approach",
      fields: [
        defineField({ name: "alt", type: "string", title: "Alt text", validation: (r) => r.required() }),
        defineField({ name: "caption", type: "string" }),
      ],
    }),
    defineField({ name: "stack", type: "array", of: [{ type: "string" }], options: { layout: "tags" } }),
    defineField({
      name: "description",
      title: "Case study (legacy)",
      type: "richText",
      description: "Free-form write-up, only shown when Approach is empty",
    }),
    defineField({ name: "tags", type: "array", of: [{ type: "string" }], options: { layout: "tags" } }),
    defineField({
      name: "highlights",
      title: "Results (bullets)",
      type: "array",
      of: [{ type: "string" }],
      description: "Listed under Results on the case study",
    }),
    defineField({ name: "links", type: "array", of: [{ type: "link" }] }),
    defineField({
      name: "featured",
      type: "boolean",
      description: "Show client work on the homepage under Selected work",
      initialValue: false,
    }),
    defineField({ name: "order", type: "number", description: "Lower numbers appear first", initialValue: 100 }),
  ],
  orderings: [{ title: "Display order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "title", year: "year", kind: "kind" },
    prepare: ({ title, year, kind }) => ({ title, subtitle: [kind === "research" ? "Research" : "Client", year].filter(Boolean).join(" · ") }),
  },
});
