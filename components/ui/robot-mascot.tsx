"use client";

import * as React from "react";

/**
 * Hero-sized animated mascot built around the LearnLLM logo:
 * a graduation-capped emerald robot head with tracking eyes, blinking,
 * a pulsing antenna, a gentle float, and a few symbols orbiting around it.
 *
 * Pure SVG + CSS, no WebGL, no external deps. Lightweight and scales
 * crisply at any size.
 */

interface RobotMascotProps {
  className?: string;
}

// Bounded range [-max, max] for pupil displacement
const EYE_TRAVEL = 2.1;

export function RobotMascot({ className }: RobotMascotProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [eyeOffset, setEyeOffset] = React.useState({ x: 0, y: 0 });
  const [blink, setBlink] = React.useState(false);

  // Eye tracking — follow the cursor position relative to the container.
  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    function onMove(e: MouseEvent) {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      // Clamp to unit circle then scale
      const len = Math.min(1, Math.sqrt(dx * dx + dy * dy));
      const angle = Math.atan2(dy, dx);
      setEyeOffset({
        x: Math.cos(angle) * len * EYE_TRAVEL,
        y: Math.sin(angle) * len * EYE_TRAVEL,
      });
    }
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Random blink every few seconds
  React.useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    function schedule() {
      const delay = 2500 + Math.random() * 3500;
      t = setTimeout(() => {
        setBlink(true);
        setTimeout(() => setBlink(false), 140);
        schedule();
      }, delay);
    }
    schedule();
    return () => clearTimeout(t);
  }, []);

  return (
    <div ref={containerRef} className={className}>
      <svg
        viewBox="0 0 320 400"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        aria-label="LearnLLM robot mascot"
        role="img"
      >
        <defs>
          <linearGradient id="body-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#16a34a" />
          </linearGradient>
          <linearGradient id="cap-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#16a34a" />
            <stop offset="100%" stopColor="#15803d" />
          </linearGradient>
          <radialGradient id="halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
            <stop offset="70%" stopColor="#10b981" stopOpacity="0" />
          </radialGradient>
          <filter id="soft-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Halo */}
        <ellipse cx="160" cy="210" rx="150" ry="150" fill="url(#halo)" />

        {/* Orbiting symbols — each group rotates at a different period */}
        <g className="orbit orbit-slow" style={{ transformOrigin: "160px 210px" }}>
          <text
            x="160"
            y="50"
            textAnchor="middle"
            fontSize="22"
            fontFamily="var(--font-mono, monospace)"
            fill="#34d399"
            fillOpacity="0.85"
          >
            {"{ }"}
          </text>
        </g>
        <g className="orbit orbit-med" style={{ transformOrigin: "160px 210px" }}>
          <text
            x="310"
            y="215"
            textAnchor="middle"
            fontSize="18"
            fontFamily="var(--font-mono, monospace)"
            fill="#6ee7b7"
            fillOpacity="0.75"
          >
            {"</>"}
          </text>
        </g>
        <g className="orbit orbit-fast" style={{ transformOrigin: "160px 210px" }}>
          <text
            x="160"
            y="380"
            textAnchor="middle"
            fontSize="20"
            fontFamily="var(--font-mono, monospace)"
            fill="#5eead4"
            fillOpacity="0.8"
          >
            [token]
          </text>
        </g>
        <g className="orbit orbit-med" style={{ transformOrigin: "160px 210px", animationDelay: "-5s" }}>
          <circle cx="20" cy="215" r="3" fill="#34d399" opacity="0.7" />
        </g>

        {/* The floating mascot */}
        <g className="float">
          {/* Antenna */}
          <line x1="160" y1="95" x2="160" y2="70" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" />
          <circle cx="160" cy="66" r="4.5" fill="#22c55e" className="antenna-pulse" filter="url(#soft-glow)" />

          {/* Graduation cap */}
          <polygon points="160,72 230,100 160,128 90,100" fill="url(#cap-grad)" />
          {/* Cap stripe */}
          <rect x="152" y="100" width="16" height="10" fill="#166534" />
          {/* Tassel */}
          <line x1="230" y1="100" x2="238" y2="130" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="239" cy="134" r="3.5" fill="#fbbf24" />

          {/* Head body — rounded square */}
          <rect x="90" y="128" width="140" height="130" rx="22" fill="url(#body-grad)" />

          {/* Subtle face plate inset */}
          <rect
            x="108"
            y="148"
            width="104"
            height="70"
            rx="14"
            fill="#15803d"
            fillOpacity="0.25"
          />

          {/* Eyes — whites */}
          <g>
            <ellipse
              cx="130"
              cy="180"
              rx="14"
              ry={blink ? 1.5 : 14}
              fill="white"
              style={{ transition: "ry 120ms ease-in-out" }}
            />
            <ellipse
              cx="190"
              cy="180"
              rx="14"
              ry={blink ? 1.5 : 14}
              fill="white"
              style={{ transition: "ry 120ms ease-in-out" }}
            />
          </g>

          {/* Eyes — pupils (tracking) */}
          {!blink && (
            <g style={{ transform: `translate(${eyeOffset.x * 2.6}px, ${eyeOffset.y * 2.6}px)`, transition: "transform 80ms ease-out" }}>
              <circle cx="130" cy="180" r="6" fill="#0f172a" />
              <circle cx="190" cy="180" r="6" fill="#0f172a" />
              {/* Tiny highlight */}
              <circle cx="127.5" cy="177.5" r="1.8" fill="white" opacity="0.9" />
              <circle cx="187.5" cy="177.5" r="1.8" fill="white" opacity="0.9" />
            </g>
          )}

          {/* Mouth — gentle smile */}
          <path
            d="M 126 228 Q 160 246 194 228"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />

          {/* Cheek blush (brand personality) */}
          <circle cx="110" cy="220" r="6" fill="#fbbf24" opacity="0.4" />
          <circle cx="210" cy="220" r="6" fill="#fbbf24" opacity="0.4" />

          {/* Side LEDs — status indicators */}
          <circle cx="90" cy="195" r="3" fill="#34d399" className="led-pulse" />
          <circle cx="230" cy="195" r="3" fill="#34d399" className="led-pulse" style={{ animationDelay: "0.5s" }} />

          {/* Neck plate */}
          <rect x="140" y="258" width="40" height="12" rx="3" fill="#166534" />

          {/* Base shadow */}
          <ellipse cx="160" cy="296" rx="60" ry="8" fill="#000" opacity="0.12" />
        </g>
      </svg>

      <style>{`
        .float { animation: robot-float 5s ease-in-out infinite; transform-origin: center; transform-box: fill-box; }
        .orbit { animation-timing-function: linear; animation-iteration-count: infinite; }
        .orbit-slow { animation-name: orbit-rotate; animation-duration: 28s; }
        .orbit-med  { animation-name: orbit-rotate; animation-duration: 18s; }
        .orbit-fast { animation-name: orbit-rotate; animation-duration: 12s; animation-direction: reverse; }
        .antenna-pulse { animation: antenna-pulse 1.8s ease-in-out infinite; }
        .led-pulse { animation: led-pulse 2.2s ease-in-out infinite; }

        @keyframes robot-float {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-8px); }
        }
        @keyframes orbit-rotate {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes antenna-pulse {
          0%, 100% { opacity: 1; r: 4.5; }
          50%      { opacity: 0.55; r: 5.5; }
        }
        @keyframes led-pulse {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0.3; }
        }

        @media (prefers-reduced-motion: reduce) {
          .float, .orbit, .antenna-pulse, .led-pulse {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
