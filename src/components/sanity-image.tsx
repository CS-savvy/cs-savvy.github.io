"use client";

import Image, { type ImageLoader } from "next/image";
import { urlFor } from "@/sanity/lib/image";

type SanityImageValue = { asset?: { _ref: string }; alt?: string };

/** Reads the intrinsic size encoded in a Sanity asset ref: image-<id>-<w>x<h>-<ext>. */
function dimensions(ref: string) {
  const [, , size] = ref.split("-");
  const [width, height] = size.split("x").map(Number);
  return { width, height };
}

/**
 * Resizing and format negotiation happen on Sanity's image CDN. next/image only
 * builds the srcset, so Vercel's image optimizer is never invoked.
 */
const sanityLoader: ImageLoader = ({ src, width, quality }) => {
  const url = new URL(src);
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality ?? 75));
  url.searchParams.set("auto", "format");
  url.searchParams.set("fit", "max");
  return url.toString();
};

export function SanityImage({
  value,
  sizes = "(min-width: 768px) 768px, 100vw",
  className,
  priority,
}: {
  value: SanityImageValue;
  sizes?: string;
  className?: string;
  priority?: boolean;
}) {
  if (!value.asset?._ref) return null;
  const { width, height } = dimensions(value.asset._ref);
  return (
    <Image
      loader={sanityLoader}
      src={urlFor(value).url()}
      alt={value.alt ?? ""}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      className={className}
    />
  );
}
