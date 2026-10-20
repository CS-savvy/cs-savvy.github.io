import { defineArrayMember, defineField, defineType } from "sanity";

/** Rich text used for the About section, project write-ups and blog posts. */
export const richText = defineType({
  name: "richText",
  title: "Rich text",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "Heading 2", value: "h2" },
        { title: "Heading 3", value: "h3" },
        { title: "Quote", value: "blockquote" },
      ],
      marks: {
        annotations: [
          defineArrayMember({
            name: "link",
            type: "object",
            title: "Link",
            fields: [
              defineField({
                name: "href",
                type: "url",
                validation: (r) => r.uri({ scheme: ["http", "https", "mailto"], allowRelative: true }),
              }),
            ],
          }),
        ],
      },
    }),
    defineArrayMember({
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", type: "string", title: "Alt text", validation: (r) => r.required() }),
        defineField({ name: "caption", type: "string" }),
      ],
    }),
  ],
});

export const link = defineType({
  name: "link",
  title: "Link",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "href",
      title: "URL",
      type: "url",
      validation: (r) => r.required().uri({ scheme: ["http", "https", "mailto"], allowRelative: true }),
    }),
  ],
});

export const sectionHeading = defineType({
  name: "sectionHeading",
  title: "Section heading",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({ name: "eyebrow", type: "string", description: "Small label above the title" }),
    defineField({ name: "title", type: "string" }),
  ],
});
