import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogIndex } from "@/components/blog-index";
import { getCategories } from "@/content";

export async function generateStaticParams() {
  return (await getCategories()).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/category/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const category = (await getCategories()).find((c) => c.slug === slug);
  return category ? { title: `${category.title} · Blog`, description: category.description } : {};
}

export default async function CategoryPage({ params }: PageProps<"/blog/category/[slug]">) {
  const { slug } = await params;
  if (!(await getCategories()).some((c) => c.slug === slug)) notFound();
  return <BlogIndex category={slug} />;
}
