import { type SchemaTypeDefinition } from "sanity";
import { category, post } from "./blog";
import { link, richText, sectionHeading } from "./objects";
import { project } from "./project";
import { resume } from "./resume";
import { siteSettings } from "./siteSettings";
import { testimonial } from "./testimonial";

export const singletonTypes = new Set(["siteSettings", "resume"]);

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [richText, link, sectionHeading, siteSettings, resume, project, testimonial, post, category],
};
