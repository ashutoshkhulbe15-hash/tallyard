import { ImageResponse } from "next/og";

// Google requires minimum 48x48 favicon (multiples of 48 preferred).
// This generates the primary favicon at 48x48 which also serves as
// the browser tab icon. Next.js auto-routes this as /icon.
export const size = { width: 48, height: 48 };
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
          background: "#FAF6EF",
          borderRadius: "8px",
        }}
      >
        <div
          style={{
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            background: "#D4691C",
            marginRight: "2px",
            flexShrink: 0,
          }}
        />
        <div
          style={{
            fontSize: "32px",
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
