import type { MetadataRoute } from "next";
import { getSettings } from "@/content";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const site = await getSettings();
  return { rules: { userAgent: "*", allow: "/", disallow: "/studio" }, sitemap: `${site.url}/sitemap.xml` };
}
