import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
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
