"use client";

import * as React from "react";

/**
 * A rotating 3D point cloud rendered on a 2D canvas.
 * Points are distributed on a sphere, projected with perspective,
 * and a handful of nearby pairs are connected with faint lines.
 *
 * Reads as a "neural cloud" / agent mesh. No Three.js, no WebGL.
 */

interface Point3D {
  x: number;
  y: number;
  z: number;
  phase: number; // for per-point pulsing
}

const NUM_POINTS = 260;
const CONNECTION_DIST = 0.38; // unit-sphere distance for linking
const MAX_LINES = 180;

function generateSphere(n: number): Point3D[] {
  // Fibonacci sphere — even distribution
  const points: Point3D[] = [];
  const offset = 2 / n;
  const inc = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = i * offset - 1 + offset / 2;
    const r = Math.sqrt(1 - y * y);
    const phi = i * inc;
    points.push({
      x: Math.cos(phi) * r,
      y,
      z: Math.sin(phi) * r,
      phase: Math.random() * Math.PI * 2,
    });
  }
  return points;
}

export function NeuralSphere({ className }: { className?: string }) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const pointsRef = React.useRef<Point3D[]>(generateSphere(NUM_POINTS));
  const rotationRef = React.useRef({ x: 0.1, y: 0 });
  const targetRotationRef = React.useRef({ x: 0.1, y: 0 });
  const lastMouseRef = React.useRef<{ x: number; y: number } | null>(null);
  const draggingRef = React.useRef(false);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      if (!container || !canvas || !ctx) return;
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    function onDown(e: PointerEvent) {
      draggingRef.current = true;
      lastMouseRef.current = { x: e.clientX, y: e.clientY };
      (e.target as Element).setPointerCapture?.(e.pointerId);
    }
    function onMove(e: PointerEvent) {
      if (!draggingRef.current || !lastMouseRef.current) return;
      const dx = e.clientX - lastMouseRef.current.x;
      const dy = e.clientY - lastMouseRef.current.y;
      targetRotationRef.current.y += dx * 0.005;
      targetRotationRef.current.x = Math.max(
        -Math.PI / 2 + 0.05,
        Math.min(Math.PI / 2 - 0.05, targetRotationRef.current.x + dy * 0.005)
      );
      lastMouseRef.current = { x: e.clientX, y: e.clientY };
    }
    function onUp() {
      draggingRef.current = false;
      lastMouseRef.current = null;
    }

    canvas.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);

    let t0 = performance.now();

    function frame(now: number) {
      if (!ctx) return;
      const dt = Math.min(50, now - t0) / 1000;
      t0 = now;

      // Auto-rotate when idle; ease toward target
      if (!draggingRef.current) {
        targetRotationRef.current.y += dt * 0.12;
      }
      rotationRef.current.x += (targetRotationRef.current.x - rotationRef.current.x) * 0.08;
      rotationRef.current.y += (targetRotationRef.current.y - rotationRef.current.y) * 0.08;

      const cx = width / 2;
      const cy = height / 2;
      const radius = Math.min(width, height) * 0.42;
      const camZ = 2.4;

      ctx.clearRect(0, 0, width, height);

      const rx = rotationRef.current.x;
      const ry = rotationRef.current.y;
      const cosX = Math.cos(rx);
      const sinX = Math.sin(rx);
      const cosY = Math.cos(ry);
      const sinY = Math.sin(ry);

      const pts = pointsRef.current;
      const projected = pts.map((p, i) => {
        // Rotate around Y then X
        const x1 = p.x * cosY + p.z * sinY;
        const z1 = -p.x * sinY + p.z * cosY;
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;

        const depth = z2 + camZ;
        const scale = 1 / depth;
        return {
          sx: cx + x1 * radius * scale,
          sy: cy + y2 * radius * scale,
          depth,
          scale,
          phase: p.phase,
          z2,
          i,
        };
      });

      // Draw connection lines — only a sparse subset so it doesn't look like a hairball
      ctx.lineWidth = 0.6;
      let lineCount = 0;
      outer: for (let i = 0; i < projected.length; i++) {
        const a = projected[i];
        for (let j = i + 1; j < projected.length; j += 3) {
          const b = projected[j];
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const dz = pts[i].z - pts[j].z;
          const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (d < CONNECTION_DIST) {
            const alpha = (1 - d / CONNECTION_DIST) * 0.22 * Math.min(a.scale, b.scale);
            ctx.strokeStyle = `rgba(52, 211, 153, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.sx, a.sy);
            ctx.lineTo(b.sx, b.sy);
            ctx.stroke();
            lineCount++;
            if (lineCount >= MAX_LINES) break outer;
          }
        }
      }

      // Draw points (back to front)
      projected
        .slice()
        .sort((p, q) => q.z2 - p.z2)
        .forEach((p) => {
          const pulse = 0.75 + Math.sin(now * 0.002 + p.phase) * 0.25;
          const size = 1.4 * p.scale * pulse;
          const brightness = Math.max(0, Math.min(1, (1 - p.z2 * 0.35) * pulse));
          const front = p.z2 < 0;
          const color = front
            ? `rgba(110, 231, 183, ${0.55 + brightness * 0.45})` // emerald-300ish
            : `rgba(16, 185, 129, ${0.25 + brightness * 0.35})`; // emerald-500ish
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, size, 0, Math.PI * 2);
          ctx.fill();
        });

      raf = requestAnimationFrame(frame);
    }

    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ cursor: "grab", touchAction: "none" }}
      aria-label="Interactive 3D neural sphere — drag to rotate"
      role="img"
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
