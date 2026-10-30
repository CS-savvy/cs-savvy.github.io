import { getSettings, type SiteSettings } from "@/content";
import { DownloadIcon } from "./icons";
import { SocialLinks } from "./social-links";

/** Sanity's `dl` parameter forces a download with a readable filename (`download` is ignored cross-origin). */
function resumeDownloadUrl({ resumeUrl = "", name }: SiteSettings) {
  if (!resumeUrl.startsWith("https://cdn.sanity.io/")) return resumeUrl;
  return `${resumeUrl}?dl=${encodeURIComponent(`${name.replace(/\s+/g, "-")}-Resume.pdf`)}`;
}

export async function Footer() {
  const site = await getSettings();
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted sm:flex-row sm:px-6">
        <p className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-mark.svg" alt="" width={20} height={20} className="size-5" />© {new Date().getFullYear()}{" "}
          {site.name}. Built with Next.js.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {site.resumeUrl && (
            <a
              href={resumeDownloadUrl(site)}
              download
              className="inline-flex items-center gap-1.5 hover:text-foreground"
            >
              <DownloadIcon width={16} height={16} /> Resume (PDF)
            </a>
          )}
          <SocialLinks socials={site.socials} />
        </div>
      </div>
    </footer>
  );
}
