import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://learnllm.dev";

type Freq = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

interface SitemapEntry {
  path: string;
  priority: number;
  changeFrequency: Freq;
}

const STATIC_ROUTES: SitemapEntry[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/learn", priority: 0.95, changeFrequency: "weekly" },
  { path: "/signup", priority: 0.9, changeFrequency: "yearly" },
  { path: "/login", priority: 0.7, changeFrequency: "yearly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.5, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
  { path: "/cookies", priority: 0.3, changeFrequency: "yearly" },
];

const DIFFICULTIES = ["beginner", "intermediate", "advanced"] as const;

function getLessonRoutes(): SitemapEntry[] {
  const routes: SitemapEntry[] = [];
  for (const difficulty of DIFFICULTIES) {
    const dir = path.join(process.cwd(), "content", "tutorials", difficulty);
    if (!fs.existsSync(dir)) continue;

    routes.push({
      path: `/learn/${difficulty}`,
      priority: 0.9,
      changeFrequency: "weekly",
    });

    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
    for (const file of files) {
      const slug = file.replace(/\.mdx$/, "");
      routes.push({
        path: `/learn/${difficulty}/${slug}`,
        priority: 0.8,
        changeFrequency: "monthly",
      });
    }
  }
  return routes;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const all = [...STATIC_ROUTES, ...getLessonRoutes()];
  return all.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
