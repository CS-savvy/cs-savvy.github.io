"use client";

import { MoonIcon, SunIcon } from "./icons";

export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
  }

  // Both icons render; CSS shows the right one so server and client markup match.
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle colour theme"
      className="grid size-9 place-items-center rounded-full border border-border text-muted transition-colors hover:text-foreground"
    >
      <SunIcon className="hidden dark:block" width={18} height={18} />
      <MoonIcon className="block dark:hidden" width={18} height={18} />
    </button>
  );
}
