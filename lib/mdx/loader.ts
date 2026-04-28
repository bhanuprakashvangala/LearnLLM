import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { MDXComponents } from "./components";
import curriculum from "@/data/curriculum.json";

const CONTENT_DIR = path.join(process.cwd(), "content", "tutorials");

/**
 * Build a slug → canonical position map from curriculum.json. We use this
 * (not the per-MDX `order` frontmatter) as the authoritative sort order
 * because the MDX files have duplicate order values across lessons,
 * which makes the previous/next navigation point at the wrong lesson.
 */
function getCanonicalPositions(
  difficulty: "beginner" | "intermediate" | "advanced"
): Map<string, number> {
  const positions = new Map<string, number>();
  const data = curriculum[difficulty];
  if (!data) return positions;
  let pos = 0;
  for (const module of data.modules) {
    for (const lesson of module.lessons) {
      positions.set(lesson.slug, pos++);
    }
  }
  return positions;
}

export interface LessonMetadata {
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  duration: number; // in minutes
  order: number;
  tags?: string[];
  papers?: Array<{
    title: string;
    authors: string;
    year: number;
    link: string;
  }>;
}

export interface Lesson {
  slug: string;
  metadata: LessonMetadata;
  content: React.ReactElement;
}

/**
 * Get all lessons for a specific difficulty level
 */
export async function getLessonsByDifficulty(
  difficulty: "beginner" | "intermediate" | "advanced"
): Promise<Lesson[]> {
  const difficultyDir = path.join(CONTENT_DIR, difficulty);

  if (!fs.existsSync(difficultyDir)) {
    return [];
  }

  const files = fs
    .readdirSync(difficultyDir)
    .filter((file) => file.endsWith(".mdx"));

  const lessons = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.mdx$/, "");
      const lesson = await getLessonBySlug(difficulty, slug);
      return lesson;
    })
  );

  // Filter out nulls; sort by curriculum.json canonical position. Lessons
  // not listed in curriculum.json fall through to the end, ordered by
  // their MDX `order` frontmatter as a stable fallback.
  const positions = getCanonicalPositions(difficulty);
  const FALLBACK_BASE = 100000;
  return lessons
    .filter((lesson): lesson is Lesson => lesson !== null)
    .sort((a, b) => {
      const aPos = positions.get(a.slug) ?? FALLBACK_BASE + a.metadata.order;
      const bPos = positions.get(b.slug) ?? FALLBACK_BASE + b.metadata.order;
      return aPos - bPos;
    });
}

/**
 * Get a specific lesson by difficulty and slug
 */
export async function getLessonBySlug(
  difficulty: "beginner" | "intermediate" | "advanced",
  slug: string
): Promise<Lesson | null> {
  try {
    const filePath = path.join(CONTENT_DIR, difficulty, `${slug}.mdx`);

    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { content, data } = matter(fileContent);

    // Compile MDX with custom components. remark-gfm enables GitHub-flavored
    // markdown: tables, task lists, strikethrough, autolinked URLs.
    const { content: mdxContent } = await compileMDX<LessonMetadata>({
      source: content,
      components: MDXComponents,
      options: {
        parseFrontmatter: false, // We already parsed it with gray-matter
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [],
        },
      },
    });

    return {
      slug,
      metadata: {
        ...data,
        difficulty,
      } as LessonMetadata,
      content: mdxContent,
    };
  } catch (error) {
    console.error(`Error loading lesson ${difficulty}/${slug}:`, error);
    return null;
  }
}

/**
 * Get all lesson slugs for static generation
 */
export function getAllLessonSlugs(): Array<{
  difficulty: "beginner" | "intermediate" | "advanced";
  slug: string;
}> {
  const difficulties: Array<"beginner" | "intermediate" | "advanced"> = [
    "beginner",
    "intermediate",
    "advanced",
  ];

  const slugs: Array<{
    difficulty: "beginner" | "intermediate" | "advanced";
    slug: string;
  }> = [];

  for (const difficulty of difficulties) {
    const difficultyDir = path.join(CONTENT_DIR, difficulty);

    if (!fs.existsSync(difficultyDir)) {
      continue;
    }

    const files = fs
      .readdirSync(difficultyDir)
      .filter((file) => file.endsWith(".mdx"));

    for (const file of files) {
      slugs.push({
        difficulty,
        slug: file.replace(/\.mdx$/, ""),
      });
    }
  }

  return slugs;
}

/**
 * Calculate reading time based on word count
 */
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}
