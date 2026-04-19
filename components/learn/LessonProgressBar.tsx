"use client";

import * as React from "react";

/**
 * Thin reading-progress bar pinned under the sticky header.
 * Calculates scroll position against the height of the main article.
 */
export function LessonProgressBar({ targetSelector = "article" }: { targetSelector?: string }) {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const target = document.querySelector(targetSelector) as HTMLElement | null;
    if (!target) return;

    let raf = 0;
    function update() {
      if (!target) return;
      const rect = target.getBoundingClientRect();
      const viewport = window.innerHeight;
      const total = rect.height - viewport;
      const scrolled = -rect.top;
      const p = total > 0 ? Math.max(0, Math.min(1, scrolled / total)) : 0;
      setProgress(p);
    }
    function onScroll() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [targetSelector]);

  return (
    <div className="sticky top-14 z-30 h-0.5 bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-primary via-emerald-400 to-teal-400 transition-[width] duration-75"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}
