import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

/** Branded 1200×630 social card shared by the homepage, case studies and blog posts. */
export async function renderOgImage({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  const favicon = await readFile(join(process.cwd(), "public/favicon.svg"));
  const logoSrc = `data:image/svg+xml;base64,${favicon.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 80,
        background: "radial-gradient(circle at 20% 0%, #2a1f66 0%, #08080b 60%)",
        color: "#ededf2",
      }}
    >
      {/* eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element */}
      <img src={logoSrc} width={96} height={96} style={{ marginBottom: 40 }} />
      <div
        style={{
          fontSize: 36,
          backgroundImage: "linear-gradient(90deg, #8b74ff, #38bdf8)",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        {eyebrow}
      </div>
      <div style={{ fontSize: title.length > 48 ? 60 : 76, fontWeight: 700, letterSpacing: -2, marginTop: 12, lineHeight: 1.1 }}>
        {title}
      </div>
      {subtitle && <div style={{ fontSize: 28, marginTop: 36, color: "#9a9aa8", maxWidth: 1000 }}>{subtitle}</div>}
    </div>,
    ogSize,
  );
}
