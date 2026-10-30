import type { MetadataRoute } from "next";
import { getCategories, getPosts, getProjects, getSettings } from "@/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [site, projects, posts, categories] = await Promise.all([
    getSettings(),
    getProjects(),
    getPosts(),
    getCategories(),
  ]);
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
          ...categories.map((c) => ({ url: `${site.url}/blog/category/${c.slug}`, priority: 0.4 })),
        ]
      : []),
  ];
}
