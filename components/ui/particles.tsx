"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  alpha: number;
}

interface ParticlesProps {
  className?: string;
  /** number of particles; scaled down on small screens */
  quantity?: number;
  /** particle color as rgb triple */
  color?: string;
  /** min particle radius px */
  minSize?: number;
  /** max particle radius px */
  maxSize?: number;
  /** fraction of mouse parallax (0 = none, 1 = 1:1) */
  parallax?: number;
}

export function Particles({
  className,
  quantity = 80,
  color = "16 185 129", // emerald-500
  minSize = 0.4,
  maxSize = 1.4,
  parallax = 0.08,
}: ParticlesProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const mouseRef = React.useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles: Particle[] = [];
    let raf = 0;

    function rand(a: number, b: number) {
      return a + Math.random() * (b - a);
    }

    function initParticles() {
      const count = Math.max(20, Math.floor(quantity * Math.min(1, w / 900)));
      particles = Array.from({ length: count }, () => ({
        x: rand(0, w),
        y: rand(0, h),
        vx: rand(-0.12, 0.12),
        vy: rand(-0.08, 0.08),
        r: rand(minSize, maxSize),
        alpha: rand(0.15, 0.75),
      }));
    }

    function resize() {
      if (!container || !canvas || !ctx) return;
      const rect = container.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles();
    }

    function onMouse(e: MouseEvent) {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      mouseRef.current.tx = (e.clientX - rect.left - w / 2) * parallax;
      mouseRef.current.ty = (e.clientY - rect.top - h / 2) * parallax;
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);
    window.addEventListener("mousemove", onMouse);

    function frame() {
      if (!ctx) return;
      mouseRef.current.x += (mouseRef.current.tx - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.ty - mouseRef.current.y) * 0.05;
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;
        ctx.beginPath();
        ctx.arc(p.x + mouseRef.current.x, p.y + mouseRef.current.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color} / ${p.alpha})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(frame);
    }

    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("mousemove", onMouse);
    };
  }, [quantity, color, minSize, maxSize, parallax]);

  return (
    <div ref={containerRef} className={cn("absolute inset-0 pointer-events-none", className)}>
      <canvas ref={canvasRef} className="block w-full h-full" aria-hidden="true" />
    </div>
  );
}
