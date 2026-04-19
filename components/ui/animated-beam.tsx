"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedBeamProps {
  containerRef: React.RefObject<HTMLElement | null>;
  fromRef: React.RefObject<HTMLElement | null>;
  toRef: React.RefObject<HTMLElement | null>;
  className?: string;
  pathColor?: string;
  pathOpacity?: number;
  pathWidth?: number;
  gradientStartColor?: string;
  gradientStopColor?: string;
  delay?: number;
  duration?: number;
  reverse?: boolean;
  curvature?: number;
}

export function AnimatedBeam({
  containerRef,
  fromRef,
  toRef,
  className,
  pathColor = "currentColor",
  pathOpacity = 0.18,
  pathWidth = 1.5,
  gradientStartColor = "#34d399",
  gradientStopColor = "#10b981",
  delay = 0,
  duration = 3,
  reverse = false,
  curvature = 0,
}: AnimatedBeamProps) {
  const id = React.useId();
  const [svgDimensions, setSvgDimensions] = React.useState({ width: 0, height: 0 });
  const [pathD, setPathD] = React.useState("");

  React.useEffect(() => {
    function update() {
      if (!containerRef.current || !fromRef.current || !toRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const fromRect = fromRef.current.getBoundingClientRect();
      const toRect = toRef.current.getBoundingClientRect();
      setSvgDimensions({ width: rect.width, height: rect.height });
      const startX = fromRect.left - rect.left + fromRect.width / 2;
      const startY = fromRect.top - rect.top + fromRect.height / 2;
      const endX = toRect.left - rect.left + toRect.width / 2;
      const endY = toRect.top - rect.top + toRect.height / 2;
      const midX = (startX + endX) / 2;
      const midY = (startY + endY) / 2 - curvature;
      setPathD(`M ${startX},${startY} Q ${midX},${midY} ${endX},${endY}`);
    }

    update();
    const ro = new ResizeObserver(update);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [containerRef, fromRef, toRef, curvature]);

  return (
    <svg
      fill="none"
      width={svgDimensions.width}
      height={svgDimensions.height}
      xmlns="http://www.w3.org/2000/svg"
      className={cn("pointer-events-none absolute inset-0 transform-gpu", className)}
      viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
      aria-hidden="true"
    >
      <path d={pathD} stroke={pathColor} strokeOpacity={pathOpacity} strokeWidth={pathWidth} strokeLinecap="round" fill="none" />
      <path d={pathD} stroke={`url(#${id})`} strokeWidth={pathWidth} strokeLinecap="round" fill="none" />
      <defs>
        <motion.linearGradient
          id={id}
          gradientUnits="userSpaceOnUse"
          initial={{ x1: "0%", x2: "0%", y1: "0%", y2: "0%" }}
          animate={{
            x1: reverse ? ["90%", "-10%"] : ["0%", "100%"],
            x2: reverse ? ["100%", "0%"] : ["10%", "110%"],
            y1: ["0%", "0%"],
            y2: ["0%", "0%"],
          }}
          transition={{ delay, duration, ease: [0.16, 1, 0.3, 1], repeat: Infinity, repeatDelay: 0 }}
        >
          <stop stopColor={gradientStartColor} stopOpacity="0" />
          <stop stopColor={gradientStartColor} />
          <stop offset="32.5%" stopColor={gradientStopColor} />
          <stop offset="100%" stopColor={gradientStopColor} stopOpacity="0" />
        </motion.linearGradient>
      </defs>
    </svg>
  );
}
