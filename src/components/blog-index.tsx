import Link from "next/link";
import { getCategories, getPosts, getSettings, heading } from "@/content";
import { PostCard } from "./post-card";

/** Post grid with category filter chips; `category` is the active category slug. */
export async function BlogIndex({ category }: { category?: string }) {
  const [site, posts, categories] = await Promise.all([getSettings(), getPosts({ category }), getCategories()]);
  const { eyebrow, title } = heading(site, "blog");
  const active = categories.find((c) => c.slug === category);

  const chip = (href: string, label: string, selected: boolean) => (
    <li key={href}>
      <Link
        href={href}
        aria-current={selected ? "page" : undefined}
        className={`inline-block rounded-full border px-3 py-1 text-sm transition-colors ${
          selected ? "border-accent bg-accent/10 text-accent" : "border-border text-muted hover:text-foreground"
        }`}
      >
        {label}
      </Link>
    </li>
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <p className="font-mono text-xs tracking-widest text-accent uppercase">{eyebrow}</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">{active?.title ?? title}</h1>
      {active?.description && <p className="mt-4 max-w-2xl text-lg text-muted">{active.description}</p>}

      {categories.length > 0 && (
        <ul className="mt-8 flex flex-wrap gap-2">
          {chip("/blog", "All", !category)}
          {categories.map((c) => chip(`/blog/category/${c.slug}`, c.title, c.slug === category))}
        </ul>
      )}

      {posts.length > 0 ? (
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-muted">No posts yet - check back soon.</p>
      )}
    </div>
  );
}
