import Link from "next/link";
import type { Testimonial } from "@/content/types";
import { ArrowRightIcon } from "./icons";
import { SanityImage } from "./sanity-image";

export const LINKEDIN_RECOMMENDATIONS_URL = "https://www.linkedin.com/in/mukulkr/details/recommendations/";

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return (parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase();
}

function Avatar({ testimonial, size }: { testimonial: Testimonial; size: number }) {
  if (testimonial.avatar?.asset) {
    return (
      <span className="shrink-0 overflow-hidden rounded-full border border-border" style={{ width: size, height: size }}>
        <SanityImage value={testimonial.avatar} sizes={`${size}px`} className="size-full object-cover" />
      </span>
    );
  }
  return (
    <span
      aria-hidden
      className="flex shrink-0 items-center justify-center rounded-full bg-accent/10 font-mono text-sm font-medium text-accent"
      style={{ width: size, height: size }}
    >
      {initials(testimonial.name)}
    </span>
  );
}

function AuthorLink({ testimonial }: { testimonial: Testimonial }) {
  return (
    <a
      href={testimonial.linkedinUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="font-semibold underline decoration-transparent underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
    >
      {testimonial.name}
      <span className="sr-only"> on LinkedIn (opens in a new tab)</span>
    </a>
  );
}

const QuoteMark = () => (
  <svg width={28} height={28} viewBox="0 0 24 24" fill="currentColor" aria-hidden className="text-accent/40">
    <path d="M9.5 6C6.46 6 4 8.46 4 11.5V18h6v-6H6.5A3 3 0 0 1 9.5 9V6Zm10 0c-3.04 0-5.5 2.46-5.5 5.5V18h6v-6h-3.5a3 3 0 0 1 3-3V6Z" />
  </svg>
);

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="reveal flex flex-col rounded-2xl border border-border bg-card p-6">
      <QuoteMark />
      <blockquote className="mt-4 flex-1 leading-relaxed text-pretty">
        <p>{testimonial.quote}</p>
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
        <Avatar testimonial={testimonial} size={44} />
        <div className="min-w-0">
          <AuthorLink testimonial={testimonial} />
          <p className="text-sm text-muted">
            {testimonial.title}, {testimonial.company}
          </p>
          <p className="mt-0.5 font-mono text-xs text-muted">{testimonial.relationship}</p>
        </div>
      </figcaption>
    </figure>
  );
}

/** Compact testimonial plus contact CTA for case study pages. */
export function CompactTestimonial({ testimonial }: { testimonial: Testimonial | null }) {
  if (!testimonial) return null;
  return (
    <section aria-label="Testimonial" className="mt-12">
      <figure className="rounded-2xl border border-border border-l-2 border-l-accent bg-card p-6">
        <blockquote className="text-lg leading-relaxed text-pretty">
          <p>{testimonial.shortQuote ?? testimonial.quote}</p>
        </blockquote>
        <figcaption className="mt-5 flex items-center gap-3">
          <Avatar testimonial={testimonial} size={36} />
          <p className="text-sm">
            <AuthorLink testimonial={testimonial} />
            <span className="text-muted">
              {" "}
              · {testimonial.title}, {testimonial.company}
            </span>
          </p>
        </figcaption>
      </figure>
      <p className="mt-6 text-muted">
        Have a similar problem?{" "}
        <Link
          href="/#contact"
          className="inline-flex items-center gap-1 font-medium text-accent hover:underline"
        >
          Let&apos;s talk <ArrowRightIcon width={16} height={16} />
        </Link>
      </p>
    </section>
  );
}
