import { PortableText, type PortableTextComponents } from "next-sanity";
import type { RichText as RichTextValue } from "@/content";
import { SanityImage } from "./sanity-image";

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => <h2 className="mt-12 text-2xl font-semibold tracking-tight text-foreground">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-8 text-xl font-semibold tracking-tight text-foreground">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-accent pl-5 text-muted italic">{children}</blockquote>
    ),
  },
  marks: {
    link: ({ value, children }) => {
      const href: string = value?.href ?? "#";
      const external = /^https?:/.test(href);
      return (
        <a
          href={href}
          {...(external && { target: "_blank", rel: "noreferrer" })}
          className="text-foreground underline decoration-border underline-offset-4 hover:decoration-accent"
        >
          {children}
        </a>
      );
    },
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc space-y-2 pl-6 marker:text-accent">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal space-y-2 pl-6 marker:text-muted">{children}</ol>,
  },
  types: {
    image: ({ value }) => (
      <figure className="my-10">
        <SanityImage value={value} className="w-full rounded-2xl border border-border" />
        {value.caption && <figcaption className="mt-3 text-center text-sm text-muted">{value.caption}</figcaption>}
      </figure>
    ),
  },
};

export function RichText({ value, className = "space-y-5" }: { value: RichTextValue; className?: string }) {
  return (
    <div className={className}>
      <PortableText value={value} components={components} />
    </div>
  );
}
