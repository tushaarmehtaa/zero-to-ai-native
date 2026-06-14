import { ImageResponse } from "next/og";
import { GUIDES } from "@/lib/guides";

export const alt = "zero to ai-native, the best papers, guides, blogs and lectures on ai";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const reads = GUIDES.length;
  const sources = new Set(GUIDES.map((g) => g.company)).size;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#09090b",
          padding: "80px",
          backgroundImage:
            "linear-gradient(to right, #ffffff0a 1px, transparent 1px), linear-gradient(to bottom, #ffffff0a 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ width: "14px", height: "14px", borderRadius: "9999px", background: "#ff5e33" }} />
          <div
            style={{
              fontSize: "22px",
              color: "#a1a1aa",
              fontFamily: "monospace",
              letterSpacing: "0.15em",
            }}
          >
            zero-to-ai-native
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: "120px",
              fontWeight: 700,
              color: "#fafafa",
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          >
            zero to ai-native
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "32px",
              fontSize: "38px",
              color: "#a1a1aa",
              maxWidth: "920px",
              lineHeight: 1.3,
            }}
          >
            the best papers, guides, blogs and lectures on ai.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "26px",
            color: "#71717a",
            fontFamily: "monospace",
          }}
        >
          {reads} reads
          <span style={{ margin: "0 14px", color: "#3f3f46" }}>·</span>
          {sources} sources
          <span style={{ margin: "0 14px", color: "#3f3f46" }}>·</span>
          <span style={{ color: "#ff5e33" }}>straight from the people building it</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
