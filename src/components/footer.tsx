import { site } from "@/content/site";
import { SocialLinks } from "./social-links";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted sm:flex-row sm:px-6">
        <p className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-mark.svg" alt="" width={20} height={20} className="size-5" />
          © {new Date().getFullYear()} {site.name}. Built with Next.js.
        </p>
        <SocialLinks />
      </div>
    </footer>
  );
}
