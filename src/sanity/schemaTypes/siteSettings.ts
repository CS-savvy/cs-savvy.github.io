import { defineArrayMember, defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  groups: [
    { name: "identity", title: "Identity", default: true },
    { name: "hero", title: "Hero" },
    { name: "about", title: "About" },
    { name: "contact", title: "Contact & socials" },
    { name: "sections", title: "Section headings" },
  ],
  fields: [
    defineField({ name: "name", type: "string", group: "identity", validation: (r) => r.required() }),
    defineField({ name: "role", type: "string", group: "identity", validation: (r) => r.required() }),
    defineField({ name: "url", title: "Site URL", type: "url", group: "identity", validation: (r) => r.required() }),
    defineField({
      name: "intro",
      title: "SEO description",
      type: "text",
      rows: 3,
      group: "identity",
      description: "Used for search results and link previews.",
    }),
    defineField({ name: "location", type: "string", group: "identity" }),
    defineField({ name: "focus", type: "string", group: "identity", description: "Shown in the About fact list" }),

    defineField({
      name: "availability",
      type: "string",
      group: "hero",
      description: "Status pill, e.g. “Open to new opportunities”. Leave empty to hide.",
    }),
    defineField({ name: "headline", type: "text", rows: 3, group: "hero" }),

    defineField({
      name: "aboutTitle",
      title: "About title",
      type: "string",
      group: "about",
      initialValue: "Hi, I'm Mukul.",
    }),
    defineField({ name: "about", type: "richText", group: "about" }),
    defineField({
      name: "stats",
      type: "array",
      group: "about",
      of: [
        defineArrayMember({
          type: "object",
          name: "stat",
          fields: [
            defineField({ name: "value", type: "string", validation: (r) => r.required() }),
            defineField({ name: "label", type: "string", validation: (r) => r.required() }),
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        }),
      ],
    }),

    defineField({ name: "email", type: "string", group: "contact", validation: (r) => r.email() }),
    defineField({ name: "contactBlurb", title: "Contact intro", type: "text", rows: 3, group: "contact" }),
    defineField({
      name: "socials",
      type: "array",
      group: "contact",
      of: [
        defineArrayMember({
          type: "object",
          name: "social",
          fields: [
            defineField({ name: "label", type: "string", validation: (r) => r.required() }),
            defineField({
              name: "href",
              title: "URL",
              type: "url",
              validation: (r) => r.required().uri({ scheme: ["http", "https", "mailto"] }),
            }),
            defineField({
              name: "icon",
              type: "string",
              options: {
                list: ["github", "linkedin", "x", "scholar", "mail"],
                layout: "radio",
                direction: "horizontal",
              },
              validation: (r) => r.required(),
            }),
          ],
          preview: { select: { title: "label", subtitle: "href" } },
        }),
      ],
    }),

    ...(
      [
        ["experienceHeading", "Experience"],
        ["projectsHeading", "Projects"],
        ["testimonialsHeading", "Testimonials"],
        ["researchHeading", "Research"],
        ["skillsHeading", "Skills"],
        ["educationHeading", "Education"],
        ["blogHeading", "Blog"],
        ["contactHeading", "Contact"],
      ] as const
    ).map(([name, title]) => defineField({ name, title, type: "sectionHeading", group: "sections" })),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
});
