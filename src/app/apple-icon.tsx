import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 130,
          background: "#FAFAF7",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#0F0F0F",
          fontWeight: 600,
          letterSpacing: "-0.04em",
          fontFamily: "sans-serif",
        }}
      >
        t
      </div>
    ),
    { ...size }
  );
}
