import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";
import { moduleForSlug } from "@/lib/curriculum";

export const alt = "Zero to AI-Native curriculum module";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function ModuleOpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const learningModule = moduleForSlug((await params).slug);

  const geistBold = await readFile(
    join(process.cwd(), "node_modules/geist/dist/fonts/geist-sans/Geist-Bold.ttf")
  );

  const fonts = [{ name: "Geist", data: geistBold, weight: 700 as const }];

  const readings = learningModule ? learningModule.readFirst.length + learningModule.goDeeper.length : 0;
  const checkpoints = learningModule ? learningModule.checkpoints.length : 0;

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
            }}
          >
            Zero to AI-Native · Curriculum
          </div>
        </div>

        {/* Main headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: "88px",
              fontWeight: 700,
              color: "#fafafa",
              letterSpacing: "-0.04em",
              lineHeight: 0.98,
            }}
          >
            {learningModule?.title ?? "Module"}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "32px",
              color: "#71717a",
              maxWidth: "920px",
              lineHeight: 1.35,
            }}
          >
            {learningModule?.summary ?? ""}
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
            {readings} readings
            <span style={{ margin: "0 16px", color: "#27272a" }}>·</span>
            {checkpoints} checkpoints
            <span style={{ margin: "0 16px", color: "#27272a" }}>·</span>
            <span style={{ color: "#ff5e33" }}>Evidence-gated project</span>
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
