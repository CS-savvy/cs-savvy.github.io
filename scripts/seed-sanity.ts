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
import {
  fallbackProcess,
  fallbackProjects,
  fallbackResume,
  fallbackServices,
  fallbackSettings,
  fallbackTestimonials,
} from "../src/content/fallback";
import { withKeys } from "./lib/with-keys";

const client = getCliClient({ apiVersion: "2026-10-20" });

async function main() {
  const { resumeUrl, headings, process: _process, ...settings } = fallbackSettings;
  void [headings, _process]; // headings default in code; process is set from fallbackProcess below

  let pdf: { _type: "file"; asset: { _type: "reference"; _ref: string } } | undefined;
  if (resumeUrl?.startsWith("/")) {
    const asset = await client.assets.upload("file", createReadStream(join(process.cwd(), "public", resumeUrl)), {
      filename: resumeUrl.split("/").pop(),
    });
    pdf = { _type: "file", asset: { _type: "reference", _ref: asset._id } };
  }

  const tx = client.transaction();
  tx.createIfNotExists(
    withKeys({ _id: "siteSettings", _type: "siteSettings", ...settings, process: fallbackProcess }),
  );
  fallbackServices.forEach(({ id, ...service }, i) =>
    tx.createIfNotExists(withKeys({ _id: id, _type: "service", order: (i + 1) * 10, ...service })),
  );
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
  // Testimonials have generated ids once edited in the Studio, so only seed them into an empty dataset.
  const hasTestimonials = await client.fetch<boolean>(`count(*[_type == "testimonial"]) > 0`);
  (hasTestimonials ? [] : fallbackTestimonials).forEach(({ id, projectSlug, ...testimonial }, i) =>
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
