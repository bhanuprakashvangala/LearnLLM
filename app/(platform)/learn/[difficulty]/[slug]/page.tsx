import * as React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getLessonBySlug, getAllLessonSlugs, getLessonsByDifficulty } from "@/lib/mdx/loader";
import { notFound } from "next/navigation";
import curriculum from "@/data/curriculum.json";
import { ContentGate } from "@/components/shared/ContentGate";
import type { Difficulty } from "@/lib/access";

interface LessonPageProps {
  params: Promise<{
    difficulty: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllLessonSlugs();
  return slugs.map(({ difficulty, slug }) => ({
    difficulty,
    slug,
  }));
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { difficulty, slug } = await params;

  if (!["beginner", "intermediate", "advanced"].includes(difficulty)) {
    notFound();
  }

  const lesson = await getLessonBySlug(
    difficulty as "beginner" | "intermediate" | "advanced",
    slug
  );

  if (!lesson) {
    notFound();
  }

  // Get all lessons for this difficulty to find prev/next
  const allLessons = await getLessonsByDifficulty(
    difficulty as "beginner" | "intermediate" | "advanced"
  );
  const currentIndex = allLessons.findIndex((l) => l.slug === slug);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  // Find which module this lesson belongs to
  const curriculumData = curriculum[difficulty as keyof typeof curriculum];
  let currentModule = null;
  for (const module of curriculumData.modules) {
    if (module.lessons.some((l) => l.slug === slug)) {
      currentModule = module;
      break;
    }
  }

  // Convert difficulty to the expected type
  const difficultyLevel = difficulty.toUpperCase() as Difficulty;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/learn" className="hover:text-foreground transition-colors">
              Learn
            </Link>
            <span>/</span>
            <Link
              href={`/learn/${difficulty}`}
              className="hover:text-foreground transition-colors capitalize"
            >
              {difficulty}
            </Link>
            <span>/</span>
            <span className="text-foreground">{lesson.metadata.title}</span>
          </div>

          {/* Content Gate - wraps restricted content */}
          <ContentGate difficulty={difficultyLevel} title={lesson.metadata.title}>
            {/* Lesson Header */}
            <div className="mb-8">
              {currentModule && (
                <div className="text-sm text-primary font-medium mb-2">
                  {currentModule.title}
                </div>
              )}
              <h1 className="text-4xl font-bold mb-4">{lesson.metadata.title}</h1>
              {lesson.metadata.description && (
                <p className="text-xl text-muted-foreground mb-4">
                  {lesson.metadata.description}
                </p>
              )}
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  <span>{lesson.metadata.duration} min read</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" />
                  <span className="capitalize">{difficulty}</span>
                </div>
                {lesson.metadata.tags && lesson.metadata.tags.length > 0 && (
                  <div className="flex items-center gap-2">
                    {lesson.metadata.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Lesson Content */}
            <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
              {lesson.content}
            </div>

            {/* Paper References */}
            {lesson.metadata.papers && lesson.metadata.papers.length > 0 && (
              <div className="mb-12">
                <h3 className="text-2xl font-bold mb-4">Research Papers Referenced</h3>
                <div className="space-y-4">
                  {lesson.metadata.papers.map((paper, index) => (
                    <div
                      key={index}
                      className="p-4 border-2 border-border rounded-lg bg-muted/30"
                    >
                      <div className="font-bold mb-1">{paper.title}</div>
                      <div className="text-sm text-muted-foreground mb-2">
                        {paper.authors} ({paper.year})
                      </div>
                      <a
                        href={paper.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:text-secondary transition-colors underline"
                      >
                        Read Paper →
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between gap-4 pt-8 border-t">
              {prevLesson ? (
                <Button variant="outline" asChild className="group">
                  <Link href={`/learn/${difficulty}/${prevLesson.slug}`}>
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="hidden sm:inline">Previous:</span>
                    <span className="max-w-[200px] truncate">
                      {prevLesson.metadata.title}
                    </span>
                  </Link>
                </Button>
              ) : (
                <div />
              )}

              {nextLesson ? (
                <Button variant="default" asChild className="group">
                  <Link href={`/learn/${difficulty}/${nextLesson.slug}`}>
                    <span className="hidden sm:inline">Next:</span>
                    <span className="max-w-[200px] truncate">
                      {nextLesson.metadata.title}
                    </span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              ) : (
                <Button variant="default" asChild>
                  <Link href="/learn">
                    Back to Learning Paths
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              )}
            </div>
          </ContentGate>
        </div>
      </div>
    </div>
  );
}
