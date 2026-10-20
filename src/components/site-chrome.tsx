import type { ReactNode } from "react";
import { getNav, getSettings } from "@/content";
import { SanityLive } from "@/sanity/lib/live";
import { Footer } from "./footer";
import { Header } from "./header";

/** Header, main and footer around every public page (the Studio at /studio renders without it). */
export async function SiteChrome({ children }: { children: ReactNode }) {
  const [site, nav] = await Promise.all([getSettings(), getNav()]);
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-card focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <Header name={site.name} nav={nav} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
      {/* Revalidates cached pages as soon as content is published in Sanity */}
      <SanityLive />
    </>
  );
}
