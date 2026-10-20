import Link from "next/link";
import type { PostSummary } from "@/content/types";
import { formatDate } from "@/lib/format";
import { SanityImage } from "./sanity-image";

export function PostMeta({ post }: { post: PostSummary }) {
  return (
    <p className="font-mono text-xs text-muted">
      <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
      {" · "}
      {Math.max(1, post.readingTime)} min read
      {post.location && <span> · {post.location}</span>}
    </p>
  );
}

export function PostCard({ post }: { post: PostSummary }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-[0_8px_40px_-12px_var(--ring)]"
    >
      {post.coverImage?.asset && (
        <SanityImage
          value={{ ...post.coverImage, alt: post.coverImage.alt ?? "" }}
          sizes="(min-width: 1024px) 384px, (min-width: 768px) 50vw, 100vw"
          className="aspect-[16/9] w-full object-cover"
        />
      )}
      <div className="flex flex-1 flex-col p-6">
        <PostMeta post={post} />
        <h3 className="mt-3 text-lg font-semibold tracking-tight group-hover:text-accent">{post.title}</h3>
        {post.excerpt && <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{post.excerpt}</p>}
        {post.categories.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-1.5">
            {post.categories.map((c) => (
              <li key={c.slug} className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted">
                {c.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Link>
  );
}
