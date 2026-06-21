import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          background: "#09090b",
          color: "#ff5e33",
          fontSize: "128px",
          fontWeight: 700,
          borderRadius: "36px",
        }}
      >
        z
      </div>
    ),
    { ...size }
  );
}
