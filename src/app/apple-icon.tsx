import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#FAF6EF",
          borderRadius: "32px",
        }}
      >
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: "#D4691C",
            marginRight: "6px",
            flexShrink: 0,
          }}
        />
        <div
          style={{
            fontSize: "120px",
            fontWeight: 700,
            fontFamily: "system-ui, sans-serif",
            color: "#1A1814",
            letterSpacing: "-0.04em",
            lineHeight: 1,
          }}
        >
          t
        </div>
      </div>
    ),
    { ...size }
  );
}
