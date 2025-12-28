import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
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
          background: "transparent",
        }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Robot Head */}
          <rect x="4" y="8" width="24" height="20" rx="4" fill="#22c55e" />

          {/* Graduation Cap */}
          <polygon points="16,2 28,7 16,12 4,7" fill="#16a34a" />
          <rect x="14" y="7" width="4" height="3" fill="#15803d" />

          {/* Robot Eyes */}
          <circle cx="11" cy="17" r="3" fill="white" />
          <circle cx="21" cy="17" r="3" fill="white" />
          <circle cx="11" cy="17" r="1.5" fill="#1e3a2f" />
          <circle cx="21" cy="17" r="1.5" fill="#1e3a2f" />

          {/* Robot Mouth */}
          <path
            d="M10 23 Q16 26 22 23"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />

          {/* Antenna */}
          <circle cx="16" cy="4" r="1.5" fill="#22c55e" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
