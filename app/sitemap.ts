import type { MetadataRoute } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://learnllm.dev";

type Freq = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

const PUBLIC_ROUTES: Array<{
  path: string;
  priority: number;
  changeFrequency: Freq;
}> = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/signup", priority: 0.9, changeFrequency: "yearly" },
  { path: "/login", priority: 0.7, changeFrequency: "yearly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.5, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
  { path: "/cookies", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return PUBLIC_ROUTES.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
