import * as React from "react";

/**
 * LearnLLM mark — bracket with a centered token.
 * Reads as `[ · ]` — the shape of a masked/tokenized LLM input.
 * Sharp, monolinear, scales down to 16px cleanly.
 *
 * Two alternates live below as <LogoMonogram/> and <LogoTerminal/>.
 * Swap the default export at the bottom of this file to try them.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="1"
        y="1"
        width="30"
        height="30"
        rx="7"
        className="fill-primary/10 stroke-primary"
        strokeWidth="1.5"
      />
      {/* Left bracket */}
      <path
        d="M11 10 L8 10 L8 22 L11 22"
        className="stroke-primary"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Right bracket */}
      <path
        d="M21 10 L24 10 L24 22 L21 22"
        className="stroke-primary"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Token */}
      <rect
        x="14"
        y="14"
        width="4"
        height="4"
        rx="1"
        className="fill-primary"
      />
    </svg>
  );
}

/**
 * Alternate 1 — interlocking LL monogram.
 * More wordmark-y, feels like a serifed initials badge.
 */
export function LogoMonogram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="1"
        y="1"
        width="30"
        height="30"
        rx="7"
        className="fill-primary"
      />
      {/* L — back */}
      <path
        d="M9 8 L9 22 L17 22"
        className="stroke-white/70"
        strokeWidth="2.5"
        strokeLinecap="square"
        strokeLinejoin="miter"
        fill="none"
      />
      {/* L — front, offset */}
      <path
        d="M15 10 L15 24 L23 24"
        className="stroke-white"
        strokeWidth="2.5"
        strokeLinecap="square"
        strokeLinejoin="miter"
        fill="none"
      />
    </svg>
  );
}

/**
 * Alternate 2 — terminal chevron `>_`.
 * Hacker / developer aesthetic; fits a code-heavy audience.
 */
export function LogoTerminal({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="1"
        y="1"
        width="30"
        height="30"
        rx="7"
        className="fill-primary/10 stroke-primary"
        strokeWidth="1.5"
      />
      {/* Chevron */}
      <path
        d="M9 11 L15 16 L9 21"
        className="stroke-primary"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Underscore cursor */}
      <path
        d="M17 21 L23 21"
        className="stroke-primary"
        strokeWidth="2.25"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function LogoText({ className }: { className?: string }) {
  return (
    <span className={`font-semibold tracking-tight ${className ?? ""}`}>
      <span className="text-foreground">learn</span>
      <span className="text-primary font-mono">llm</span>
    </span>
  );
}
