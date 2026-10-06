import { site } from "@/content/site";
import { socialIcons } from "./icons";

export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex items-center gap-2 ${className}`}>
      {site.socials.map(({ label, href, icon }) => {
        const Icon = socialIcons[icon];
        return (
          <li key={href}>
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="grid size-9 place-items-center rounded-full border border-border text-muted transition-colors hover:border-accent hover:text-foreground"
            >
              <Icon width={18} height={18} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
