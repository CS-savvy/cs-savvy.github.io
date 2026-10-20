import type { MetadataRoute } from "next";
import { getPosts, getProjects, getSettings } from "@/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [site, projects, posts] = await Promise.all([getSettings(), getProjects(), getPosts()]);
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    ...projects.map((p) => ({
      url: `${site.url}/projects/${p.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
    ...(posts.length
      ? [
          { url: `${site.url}/blog`, changeFrequency: "weekly" as const, priority: 0.8 },
          ...posts.map((p) => ({ url: `${site.url}/blog/${p.slug}`, lastModified: p.publishedAt, priority: 0.6 })),
        ]
      : []),
  ];
}
