import type { Metadata } from "next";
import { BlogIndex } from "@/components/blog-index";

export const metadata: Metadata = {
  title: "Blog",
  description: "Personal stories, experiences and reflections beyond the code.",
};

export default function BlogPage() {
  return <BlogIndex />;
}
