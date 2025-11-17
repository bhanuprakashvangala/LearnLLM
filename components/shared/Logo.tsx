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
      style={{
        '--logo-primary': 'rgb(var(--primary))',
        '--logo-secondary': 'rgb(var(--secondary))',
        '--logo-accent': 'rgb(var(--accent))',
      } as React.CSSProperties}
    >
      {/* Gradient Definitions */}
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: 'var(--logo-primary)' }} />
          <stop offset="50%" style={{ stopColor: 'var(--logo-secondary)' }} />
          <stop offset="100%" style={{ stopColor: 'var(--logo-accent)' }} />
        </linearGradient>
      </defs>

      {/* Brain/Neural Network Pattern */}
      <g>
        {/* Center circle (brain core) */}
        <circle cx="16" cy="16" r="4" fill="url(#logoGradient)" opacity="0.9" />

        {/* Neural connections */}
        <circle cx="8" cy="8" r="2.5" fill="url(#logoGradient)" opacity="0.7" />
        <circle cx="24" cy="8" r="2.5" fill="url(#logoGradient)" opacity="0.7" />
        <circle cx="8" cy="24" r="2.5" fill="url(#logoGradient)" opacity="0.7" />
        <circle cx="24" cy="24" r="2.5" fill="url(#logoGradient)" opacity="0.7" />

        {/* Connection lines */}
        <line x1="16" y1="16" x2="8" y2="8" stroke="url(#logoGradient)" strokeWidth="1.5" opacity="0.5" />
        <line x1="16" y1="16" x2="24" y2="8" stroke="url(#logoGradient)" strokeWidth="1.5" opacity="0.5" />
        <line x1="16" y1="16" x2="8" y2="24" stroke="url(#logoGradient)" strokeWidth="1.5" opacity="0.5" />
        <line x1="16" y1="16" x2="24" y2="24" stroke="url(#logoGradient)" strokeWidth="1.5" opacity="0.5" />

        {/* Code brackets overlay */}
        <path
          d="M 10 12 L 7 16 L 10 20"
          stroke="url(#logoGradient)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          opacity="0.8"
        />
        <path
          d="M 22 12 L 25 16 L 22 20"
          stroke="url(#logoGradient)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          opacity="0.8"
        />

        {/* Sparkle effect */}
        <circle cx="28" cy="4" r="1" style={{ fill: 'var(--logo-accent)' }} opacity="0.9" />
        <circle cx="4" cy="28" r="1" style={{ fill: 'var(--logo-primary)' }} opacity="0.9" />
      </g>
    </svg>
  );
}

export function LogoText({ className }: { className?: string }) {
  return (
    <span className={className}>
      <span className="font-bold text-foreground">Learn</span>
      <span className="font-extrabold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">LLM</span>
      <span className="font-semibold text-foreground">.dev</span>
    </span>
  );
}
