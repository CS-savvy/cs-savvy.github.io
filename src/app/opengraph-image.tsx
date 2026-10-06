import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
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
        <div style={{ fontSize: 80, fontWeight: 700, letterSpacing: -2 }}>{site.name}</div>
        <div
          style={{
            fontSize: 44,
            marginTop: 8,
            backgroundImage: "linear-gradient(90deg, #8b74ff, #38bdf8)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {site.role}
        </div>
        <div style={{ fontSize: 28, marginTop: 40, color: "#9a9aa8", maxWidth: 900 }}>{site.headline}</div>
      </div>
    ),
    size,
  );
}
