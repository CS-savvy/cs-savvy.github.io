import { getProject, getProjects, getSettings } from "@/content";
import { ogSize, renderOgImage } from "@/lib/og";

export const alt = "Case study";
export const size = ogSize;
export const contentType = "image/png";

export async function generateStaticParams() {
  return (await getProjects()).map(({ slug }) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [site, project] = await Promise.all([getSettings(), getProject(slug)]);
  return renderOgImage({
    eyebrow: project?.kind === "research" ? `Research · ${site.name}` : `Case study · ${site.name}`,
    title: project?.title ?? site.name,
    subtitle: project?.results.map((r) => `${r.value} ${r.label.toLowerCase()}`).join(" · ") || project?.summary,
  });
}
