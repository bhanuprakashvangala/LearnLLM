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
      </defs>

      {/* Rounded square background */}
      <rect x="2" y="2" width="28" height="28" rx="8" fill="url(#logoGrad)" />

      {/* L letter stylized as code/learning */}
      <path
        d="M10 8 L10 20 L14 20"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* L second stroke */}
      <path
        d="M16 8 L16 20 L20 20"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.7"
      />

      {/* M hint / neural dot */}
      <circle cx="24" cy="12" r="2.5" fill="white" opacity="0.9" />
      <circle cx="24" cy="20" r="1.5" fill="white" opacity="0.6" />
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
