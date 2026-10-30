import { getSettings } from "@/content";
import { ogSize, renderOgImage } from "@/lib/og";

export const alt = "Mukul Kumar - Computer Vision & Document AI Consultant";
export const size = ogSize;
export const contentType = "image/png";

export default async function OpengraphImage() {
  const site = await getSettings();
  return renderOgImage({ eyebrow: site.role, title: site.name, subtitle: site.heroTitle || site.headline });
}
