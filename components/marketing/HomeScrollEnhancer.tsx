"use client";

import * as React from "react";

/**
 * Tiny client-only enhancer that opts the home page into proximity
 * scroll-snap by tagging <html> with the `snap-on` class. The CSS
 * rules in globals.css are scoped behind that class so lesson pages
 * and dashboards keep normal continuous scroll — only the marketing
 * landing gets the page-by-page feel.
 *
 * Lives at the top of app/page.tsx and renders nothing.
 */
export function HomeScrollEnhancer() {
  React.useEffect(() => {
    const root = document.documentElement;
    root.classList.add("snap-on");
    return () => {
      root.classList.remove("snap-on");
    };
  }, []);
  return null;
}
