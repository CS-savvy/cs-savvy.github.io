/**
 * One-time import of the bundled content (src/content/fallback.ts) into Sanity.
 *
 *   npx sanity login        # once
 *   npm run seed
 *
 * Uses createIfNotExists, so re-running never overwrites edits made in the Studio.
 */
import { createReadStream } from "node:fs";
import { join } from "node:path";
import { getCliClient } from "sanity/cli";
import { fallbackProjects, fallbackResume, fallbackSettings, fallbackTestimonials } from "../src/content/fallback";

const client = getCliClient({ apiVersion: "2026-10-20" });

/** Sanity requires a unique `_key` on every object inside an array. */
function withKeys<T>(value: T, path = "k"): T {
  if (Array.isArray(value)) {
    return value.map((item, i) => {
      const keyed = withKeys(item, `${path}${i}`);
      return keyed && typeof keyed === "object" && !("_key" in keyed) ? { _key: `${path}${i}`, ...keyed } : keyed;
    }) as T;
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, withKeys(v, `${path}${k[0]}`)])) as T;
  }
  return value;
}

async function main() {
  const { resumeUrl, headings, ...settings } = fallbackSettings;
  void headings; // defaults live in code; set custom ones in the Studio

  let pdf: { _type: "file"; asset: { _type: "reference"; _ref: string } } | undefined;
  if (resumeUrl?.startsWith("/")) {
    const asset = await client.assets.upload("file", createReadStream(join(process.cwd(), "public", resumeUrl)), {
      filename: resumeUrl.split("/").pop(),
    });
    pdf = { _type: "file", asset: { _type: "reference", _ref: asset._id } };
  }

  const tx = client.transaction();
  tx.createIfNotExists(withKeys({ _id: "siteSettings", _type: "siteSettings", ...settings }));
  tx.createIfNotExists(withKeys({ _id: "resume", _type: "resume", ...(pdf && { pdf }), ...fallbackResume }));
  fallbackProjects.forEach(({ slug, ...project }, i) =>
    tx.createIfNotExists(
      withKeys({
        _id: `project-${slug}`,
        _type: "project",
        slug: { _type: "slug", current: slug },
        order: (i + 1) * 10,
        ...project,
      }),
    ),
  );
  fallbackTestimonials.forEach(({ id, projectSlug, ...testimonial }, i) =>
    tx.createIfNotExists({
      _id: `testimonial-${id}`,
      _type: "testimonial",
      order: (i + 1) * 10,
      ...(projectSlug && { project: { _type: "reference", _ref: `project-${projectSlug}` } }),
      ...testimonial,
    }),
  );
  for (const [slug, title, description] of [
    ["life", "Life", "Everyday moments, milestones and lessons learned."],
    ["travel", "Travel", "Places I've been and what they taught me."],
    ["reflections", "Reflections", "Thoughts on growth, work and everything in between."],
  ]) {
    tx.createIfNotExists({
      _id: `category-${slug}`,
      _type: "category",
      title,
      description,
      slug: { _type: "slug", current: slug },
    });
  }

  const result = await tx.commit();
  console.log(`Seeded ${result.results.length} documents into "${client.config().dataset}".`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
