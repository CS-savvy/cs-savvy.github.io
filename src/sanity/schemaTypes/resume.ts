import { defineArrayMember, defineField, defineType } from "sanity";

const tags = (name: string, title?: string) =>
  defineField({ name, title, type: "array", of: [{ type: "string" }], options: { layout: "tags" } });

/** Career data shown on the home page. Arrays keep drag-and-drop ordering in the Studio. */
export const resume = defineType({
  name: "resume",
  title: "Résumé",
  type: "document",
  fields: [
    defineField({
      name: "pdf",
      title: "Résumé PDF",
      type: "file",
      description:
        "Served by the “Download résumé” button. Upload a new PDF to replace it; remove it to hide the button.",
      options: { accept: "application/pdf" },
    }),
    defineField({
      name: "experience",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "job",
          fields: [
            defineField({ name: "role", type: "string", validation: (r) => r.required() }),
            defineField({ name: "company", type: "string", validation: (r) => r.required() }),
            defineField({
              name: "period",
              type: "string",
              description: "e.g. Sep 2023 - May 2026",
              validation: (r) => r.required(),
            }),
            defineField({ name: "location", type: "string" }),
            defineField({ name: "points", title: "Bullet points", type: "array", of: [{ type: "text", rows: 2 }] }),
            tags("stack", "Tech stack"),
          ],
          preview: {
            select: { title: "role", company: "company", period: "period" },
            prepare: ({ title, company, period }) => ({ title, subtitle: `${company} · ${period}` }),
          },
        }),
      ],
    }),
    defineField({
      name: "publications",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "publication",
          fields: [
            defineField({ name: "title", type: "string", validation: (r) => r.required() }),
            defineField({ name: "venue", type: "string" }),
            defineField({ name: "date", type: "string" }),
            defineField({ name: "authors", type: "string" }),
            defineField({ name: "summary", type: "text", rows: 2 }),
            defineField({ name: "href", title: "URL", type: "url" }),
          ],
          preview: { select: { title: "title", subtitle: "venue" } },
        }),
      ],
    }),
    defineField({
      name: "patents",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "patent",
          fields: [
            defineField({ name: "title", type: "string", validation: (r) => r.required() }),
            defineField({ name: "filed", type: "string", description: "e.g. Jun 2022" }),
            defineField({ name: "id", title: "Patent / application number", type: "string" }),
          ],
          preview: { select: { title: "title", subtitle: "filed" } },
        }),
      ],
    }),
    defineField({
      name: "skills",
      title: "Skill groups",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "skillGroup",
          fields: [defineField({ name: "group", type: "string", validation: (r) => r.required() }), tags("items")],
          preview: {
            select: { title: "group", items: "items" },
            prepare: ({ title, items }) => ({ title, subtitle: items?.join(", ") }),
          },
        }),
      ],
    }),
    defineField({
      name: "education",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "degree",
          fields: [
            defineField({ name: "degree", type: "string", validation: (r) => r.required() }),
            defineField({ name: "school", type: "string" }),
            defineField({ name: "period", type: "string" }),
            defineField({ name: "location", type: "string" }),
          ],
          preview: { select: { title: "degree", subtitle: "school" } },
        }),
      ],
    }),
    defineField({ name: "certifications", type: "array", of: [{ type: "string" }] }),
  ],
  preview: { prepare: () => ({ title: "Résumé" }) },
});
