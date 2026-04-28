import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "LearnLLM.dev — Learn AI engineering, free.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "linear-gradient(135deg, #050505 0%, #0a1410 50%, #0a0a0a 100%)",
          color: "#ffffff",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Top row: logo + tagline */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              background:
                "linear-gradient(135deg, #10b981 0%, #14b8a6 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "32px",
              fontWeight: 800,
              color: "#050505",
            }}
          >
            L
          </div>
          <div
            style={{
              fontSize: "28px",
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            LearnLLM.dev
          </div>
        </div>

        {/* Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <div
            style={{
              fontSize: "84px",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              maxWidth: "1000px",
            }}
          >
            Learn how AI actually works.
          </div>
          <div
            style={{
              fontSize: "84px",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              background:
                "linear-gradient(135deg, #34d399 0%, #14b8a6 100%)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Then build it.
          </div>
        </div>

        {/* Bottom row: stats */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "48px",
            fontSize: "20px",
            color: "#9aa3ad",
          }}
        >
          <span>110+ lessons</span>
          <span style={{ color: "#3a4046" }}>·</span>
          <span>40+ tools covered</span>
          <span style={{ color: "#3a4046" }}>·</span>
          <span style={{ color: "#34d399", fontWeight: 600 }}>
            Free forever
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
