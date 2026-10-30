/**
 * One-time migration of the live dataset to the consulting copy in src/content/fallback.ts.
 *
 *   npm run migrate:dry   # print what would change, write nothing
 *   npm run migrate       # apply
 *
 * Unlike the seed, this OVERWRITES the fields listed below with the bundled copy. Fields it
 * doesn't list (side projects, publications, patents, education, links, headings…) are untouched.
 * Services are only created when missing, so edits made to them in the Studio are kept.
 */
import { getCliClient } from "sanity/cli";
import {
  fallbackProcess,
  fallbackProjects,
  fallbackResume,
  fallbackServices,
  fallbackSettings,
  fallbackTestimonials,
} from "../src/content/fallback";
import type { Experience } from "../src/content/types";
import { withKeys } from "./lib/with-keys";

const client = getCliClient({ apiVersion: "2026-10-20" });
const dryRun = process.argv.includes("--dry-run");

async function main() {
  const tx = client.transaction();
  const log: string[] = [];

  // Site settings: positioning, hero, About, stats, contact. `bookingUrl` is left for you to set.
  const s = fallbackSettings;
  const settingsPatch = {
    role: s.role,
    heroTitle: s.heroTitle,
    headline: s.headline,
    intro: s.intro,
    availability: s.availability,
    about: s.about,
    stats: s.stats,
    focus: s.focus,
    location: s.location,
    engagements: s.engagements,
    email: s.email,
    contactBlurb: s.contactBlurb,
    socials: s.socials,
    process: fallbackProcess,
  };
  tx.patch("siteSettings", (p) => p.set(withKeys(settingsPatch)));
  log.push(`siteSettings: set ${Object.keys(settingsPatch).join(", ")}`);

  // Resume: regroup the toolkit, and add Background summaries / internship flags to the existing jobs.
  const current = await client.fetch<(Experience & { _key: string })[] | null>(`*[_id == "resume"][0].experience`);
  const experience = (current ?? []).map((job) => {
    const match = fallbackResume.experience.find((f) => f.company === job.company && f.role === job.role);
    return { ...job, summary: match?.summary ?? job.summary, internship: match?.internship ?? false };
  });
  tx.patch("resume", (p) => p.set({ skills: withKeys(fallbackResume.skills), experience }));
  log.push(
    `resume: set skills (${fallbackResume.skills.map((g) => g.group).join(" / ")}), experience summaries + internship flags`,
  );

  // Projects: case-study structure. The legacy `description` is kept but hidden once `approach` is set.
  for (const project of fallbackProjects) {
    const id = `project-${project.slug}`;
    if (!(await client.getDocument(id))) {
      log.push(`${id}: not found, skipped`);
      continue;
    }
    const fields = {
      kind: project.kind,
      featured: project.featured ?? false,
      context: project.context,
      problem: project.problem,
      approach: project.approach,
      results: project.results,
      stack: project.stack,
      highlights: project.highlights ?? [],
    };
    tx.patch(id, (p) => p.set(withKeys(fields)));
    log.push(`${id}: set ${Object.keys(fields).join(", ")}`);
  }

  // Testimonials: add the short quote and clear LinkedIn URLs that point at your own recommendations page.
  const testimonials = await client.fetch<{ _id: string; name: string; linkedinUrl?: string }[]>(
    `*[_type == "testimonial"]{_id, name, linkedinUrl}`,
  );
  for (const t of testimonials) {
    const source = fallbackTestimonials.find((f) => f.name === t.name);
    const wrongUrl = t.linkedinUrl?.includes("/details/recommendations");
    if (!source?.shortQuote && !wrongUrl) continue;
    tx.patch(t._id, (p) => {
      let patch = source?.shortQuote ? p.setIfMissing({ shortQuote: source.shortQuote }) : p;
      if (wrongUrl) patch = patch.unset(["linkedinUrl"]);
      return patch;
    });
    log.push(`${t._id} (${t.name}): ${[source?.shortQuote && "shortQuote if missing", wrongUrl && "unset linkedinUrl"].filter(Boolean).join(", ")}`);
  }

  // Services: new documents.
  fallbackServices.forEach(({ id, ...service }, i) => {
    tx.createIfNotExists(withKeys({ _id: id, _type: "service", order: (i + 1) * 10, ...service }));
    log.push(`${id}: create if missing`);
  });

  console.log(log.map((l) => `  • ${l}`).join("\n"));
  if (dryRun) {
    console.log(`\nDry run - nothing written to "${client.config().dataset}".`);
    return;
  }
  const result = await tx.commit();
  console.log(`\nMigrated ${result.results.length} documents in "${client.config().dataset}".`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
