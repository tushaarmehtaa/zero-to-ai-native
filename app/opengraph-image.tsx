import { ImageResponse } from "next/og";
import { GUIDES } from "@/lib/guides";

export const alt = "zero to ai-native — the best papers, guides, blogs and lectures on ai";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const reads = GUIDES.length;
  const sources = new Set(GUIDES.map((g) => g.company)).size;

  const geistBold = await fetch(
    "https://fonts.gstatic.com/s/geist/v1/UqyVK80MDZA1C_CgBoX0Zw.woff2"
  ).then((res) => (res.ok ? res.arrayBuffer() : null)).catch(() => null);

  const fonts = geistBold
    ? [{ name: "Geist", data: geistBold, weight: 700 as const }]
    : [];

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
          padding: "72px 80px",
          backgroundImage:
            "linear-gradient(to right, #ffffff08 1px, transparent 1px), linear-gradient(to bottom, #ffffff08 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          fontFamily: fonts.length ? "Geist" : "system-ui, sans-serif",
        }}
      >
        {/* Header: site identity */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "9999px",
              background: "#ff5e33",
            }}
          />
          <div
            style={{
              fontSize: "20px",
              color: "#52525b",
              letterSpacing: "0.12em",
              textTransform: "lowercase",
            }}
          >
            zero-to-ai-native
          </div>
        </div>

        {/* Main headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: "96px",
              fontWeight: 700,
              color: "#fafafa",
              letterSpacing: "-0.04em",
              lineHeight: 0.95,
            }}
          >
            zero to ai-native
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "34px",
              color: "#71717a",
              maxWidth: "880px",
              lineHeight: 1.35,
            }}
          >
            the best papers, guides, blogs and lectures on ai.
          </div>
        </div>

        {/* Footer: stats + brand color */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: "24px",
              color: "#52525b",
            }}
          >
            {reads} reads
            <span style={{ margin: "0 16px", color: "#27272a" }}>·</span>
            {sources} sources
            <span style={{ margin: "0 16px", color: "#27272a" }}>·</span>
            <span style={{ color: "#ff5e33" }}>straight from the people building it</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts,
    }
  );
}
