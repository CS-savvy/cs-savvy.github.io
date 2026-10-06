import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 14,
          background: "linear-gradient(135deg, #6d4aff, #0ea5e9)",
          color: "white",
          fontSize: 40,
          fontWeight: 700,
        }}
      >
        {site.name.charAt(0)}
      </div>
    ),
    size,
  );
}
