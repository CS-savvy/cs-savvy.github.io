import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon } from "@/components/icons";
import { PostMeta } from "@/components/post-card";
import { RichText } from "@/components/rich-text";
import { SanityImage } from "@/components/sanity-image";
import { getPost, getPosts } from "@/content";
import { urlFor } from "@/sanity/lib/image";

export async function generateStaticParams() {
  return (await getPosts()).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: "article",
      publishedTime: post.publishedAt,
      ...(post.coverImage?.asset && { images: [urlFor(post.coverImage).width(1200).height(630).fit("crop").url()] }),
    },
  };
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground">
        <ArrowLeftIcon width={16} height={16} /> All posts
      </Link>

      <div className="mt-10">
        <PostMeta post={post} />
      </div>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">{post.title}</h1>
      {post.excerpt && <p className="mt-4 text-lg text-muted">{post.excerpt}</p>}

      {post.categories.length > 0 && (
        <ul className="mt-6 flex flex-wrap gap-1.5">
          {post.categories.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/blog/category/${c.slug}`}
                className="inline-block rounded-full border border-border px-2.5 py-0.5 text-xs text-muted hover:border-accent hover:text-foreground"
              >
                {c.title}
              </Link>
            </li>
          ))}
        </ul>
      )}

      {post.coverImage?.asset && (
        <SanityImage
          value={{ ...post.coverImage, alt: post.coverImage.alt ?? "" }}
          priority
          className="mt-10 w-full rounded-2xl border border-border"
        />
      )}

      <RichText value={post.body} className="mt-12 space-y-5 text-lg leading-relaxed" />
    </article>
  );
}
