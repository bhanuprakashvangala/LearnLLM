import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export const runtime = "nodejs";
export const alt = "LearnLLM.dev lesson preview";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const DIFFICULTY_GRADIENTS: Record<string, [string, string]> = {
  beginner: ["#34d399", "#14b8a6"],
  intermediate: ["#60a5fa", "#6366f1"],
  advanced: ["#c084fc", "#ec4899"],
};

interface OgImageProps {
  params: Promise<{ difficulty: string; slug: string }>;
}

function readLessonTitle(difficulty: string, slug: string): string | null {
  try {
    const filePath = path.join(
      process.cwd(),
      "content",
      "tutorials",
      difficulty,
      `${slug}.mdx`
    );
    if (!fs.existsSync(filePath)) return null;
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent);
    return (data.title as string) || null;
  } catch {
    return null;
  }
}

export default async function LessonOgImage({ params }: OgImageProps) {
  const { difficulty, slug } = await params;
  const title = readLessonTitle(difficulty, slug) || "Lesson";
  const [colorA, colorB] =
    DIFFICULTY_GRADIENTS[difficulty] || DIFFICULTY_GRADIENTS.beginner;

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
          background: "linear-gradient(135deg, #050505 0%, #0a0a0a 100%)",
          color: "#ffffff",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Top: brand + difficulty pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: `linear-gradient(135deg, ${colorA} 0%, ${colorB} 100%)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "28px",
                fontWeight: 800,
                color: "#050505",
              }}
            >
              L
            </div>
            <div style={{ fontSize: "24px", fontWeight: 700 }}>
              LearnLLM.dev
            </div>
          </div>
          <div
            style={{
              padding: "8px 18px",
              borderRadius: "999px",
              border: `1px solid ${colorA}40`,
              background: `${colorA}15`,
              color: colorA,
              fontSize: "16px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            {difficulty}
          </div>
        </div>

        {/* Lesson title */}
        <div
          style={{
            fontSize: title.length > 50 ? "64px" : "76px",
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.025em",
            background: `linear-gradient(135deg, #ffffff 0%, ${colorA} 100%)`,
            backgroundClip: "text",
            color: "transparent",
            maxWidth: "1040px",
          }}
        >
          {title}
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: "20px",
            color: "#9aa3ad",
          }}
        >
          <span>Free, complete AI engineering curriculum</span>
          <span style={{ color: "#3a4046" }}>·</span>
          <span style={{ color: colorA, fontWeight: 600 }}>
            learnllm.dev
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
