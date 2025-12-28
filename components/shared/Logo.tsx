import * as React from "react";

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Gradient Definitions */}
      <defs>
        <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#16a34a" />
        </linearGradient>
        <linearGradient id="capGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
      </defs>

      {/* Robot Head - rounded square */}
      <rect x="4" y="8" width="24" height="20" rx="4" fill="url(#logoGrad)" />

      {/* Graduation Cap */}
      <polygon points="16,2 28,7 16,12 4,7" fill="url(#capGrad)" />
      <rect x="14" y="7" width="4" height="3" fill="#15803d" />

      {/* Robot Eyes - glowing */}
      <circle cx="11" cy="17" r="3" fill="white" />
      <circle cx="21" cy="17" r="3" fill="white" />
      <circle cx="11" cy="17" r="1.5" fill="#1e3a2f" />
      <circle cx="21" cy="17" r="1.5" fill="#1e3a2f" />

      {/* Robot Mouth - friendly smile */}
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
  );
}

export function LogoText({ className }: { className?: string }) {
  return (
    <span className={`font-bold ${className}`}>
      <span className="text-foreground">Learn</span>
      <span className="text-primary">LLM</span>
    </span>
  );
}
