import type { Metadata } from "next";
import { BlogIndex } from "@/components/blog-index";
import { pageMetadata } from "@/lib/seo";

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata({
    path: "/blog",
    title: "Blog",
    description: "Personal stories, experiences and reflections beyond the code.",
  });
}

export default function BlogPage() {
  return <BlogIndex />;
}
