"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

/**
 * Table of contents built client-side from h2 / h3 elements inside the
 * article. Highlights the heading closest to the top of the viewport.
 */
export function LessonToc({ targetSelector = "article" }: { targetSelector?: string }) {
  const [items, setItems] = React.useState<TocItem[]>([]);
  const [activeId, setActiveId] = React.useState<string>("");

  React.useEffect(() => {
    const target = document.querySelector(targetSelector);
    if (!target) return;

    const headings = Array.from(target.querySelectorAll("h2, h3")) as HTMLHeadingElement[];
    const list: TocItem[] = headings
      .filter((h) => h.id)
      .map((h) => ({
        id: h.id,
        text: h.textContent || "",
        level: Number(h.tagName.replace("H", "")),
      }));
    setItems(list);

    if (list.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.target.getBoundingClientRect().top - b.target.getBoundingClientRect().top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [targetSelector]);

  if (items.length === 0) return null;

  return (
    <nav aria-label="Lesson outline" className="text-sm">
      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-4">
        On this page
      </div>
      <ul className="space-y-1 border-l border-border">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={cn(
                "block py-1 pl-4 -ml-px border-l border-transparent transition-colors leading-snug",
                item.level === 3 && "pl-8 text-[13px]",
                activeId === item.id
                  ? "border-primary text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground hover:border-foreground/30"
              )}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
