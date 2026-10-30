import { getPost, getPosts, getSettings } from "@/content";
import { ogSize, renderOgImage } from "@/lib/og";

export const alt = "Blog post";
export const size = ogSize;
export const contentType = "image/png";

export async function generateStaticParams() {
  return (await getPosts()).map(({ slug }) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [site, post] = await Promise.all([getSettings(), getPost(slug)]);
  return renderOgImage({ eyebrow: `Blog · ${site.name}`, title: post?.title ?? site.name, subtitle: post?.excerpt });
}
