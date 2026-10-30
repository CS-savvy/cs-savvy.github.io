import type { Metadata } from "next";
import { getSettings } from "@/content";

/**
 * Per-page canonical URL, Open Graph and Twitter tags. Next replaces a parent's `openGraph`
 * object instead of merging it, so every page sets the full set here.
 */
export async function pageMetadata({
  path,
  title,
  description,
  type = "website",
  publishedTime,
  ownImage = false,
}: {
  path: string;
  /** Page title without the site name; omit for the homepage. */
  title?: string;
  description?: string;
  type?: "website" | "article";
  publishedTime?: string;
  /** The route has its own opengraph-image file; metadata images would override it. */
  ownImage?: boolean;
}): Promise<Metadata> {
  const site = await getSettings();
  const fullTitle = title ? `${title} · ${site.name}` : `${site.name} — ${site.role}`;
  const desc = description ?? site.intro;
  // Replacing `openGraph` drops the root opengraph-image, so routes without their own re-add it.
  const images = ownImage ? undefined : ["/opengraph-image"];
  return {
    ...(title && { title }),
    description: desc,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      siteName: site.name,
      title: fullTitle,
      description: desc,
      locale: "en",
      ...(images && { images }),
      ...(publishedTime && { publishedTime }),
    },
    twitter: { card: "summary_large_image", title: fullTitle, description: desc, ...(images && { images }) },
  };
}
