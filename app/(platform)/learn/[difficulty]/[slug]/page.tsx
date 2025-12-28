import * as React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock, BookOpen, ChevronLeft, GraduationCap, FileText } from "lucide-react";
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

const difficultyColors = {
  beginner: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/30",
  intermediate: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30",
  advanced: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30",
};

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
  let lessonIndexInModule = 0;
  for (const module of curriculumData.modules) {
    const idx = module.lessons.findIndex((l) => l.slug === slug);
    if (idx !== -1) {
      currentModule = module;
      lessonIndexInModule = idx;
      break;
    }
  }

  // Convert difficulty to the expected type
  const difficultyLevel = difficulty.toUpperCase() as Difficulty;
  const difficultyKey = difficulty as "beginner" | "intermediate" | "advanced";

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <Link
              href={`/learn/${difficulty}`}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to {curriculumData.title}</span>
              <span className="sm:hidden">Back</span>
            </Link>

            <div className="flex items-center gap-3">
              <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${difficultyColors[difficultyKey]}`}>
                {difficulty}
              </span>
              <span className="text-sm text-muted-foreground hidden sm:inline">
                Lesson {currentIndex + 1} of {allLessons.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Gate - wraps restricted content */}
      <ContentGate difficulty={difficultyLevel} title={lesson.metadata.title} slug={slug}>
        {/* Lesson Header */}
        <div className="bg-gradient-to-b from-muted/50 to-background border-b border-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
            <div className="max-w-3xl mx-auto">
              {currentModule && (
                <div className="flex items-center gap-2 text-sm text-primary font-medium mb-4">
                  <GraduationCap className="w-4 h-4" />
                  {currentModule.title}
                </div>
              )}

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                {lesson.metadata.title}
              </h1>

              {lesson.metadata.description && (
                <p className="text-lg text-muted-foreground mb-6">
                  {lesson.metadata.description}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span>{lesson.metadata.duration} min read</span>
                </div>

                {lesson.metadata.tags && lesson.metadata.tags.length > 0 && (
                  <div className="flex items-center gap-2">
                    {lesson.metadata.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Lesson Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="max-w-3xl mx-auto">
            <article className="prose prose-lg dark:prose-invert prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-p:text-foreground/80 prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-pre:bg-muted prose-pre:border prose-pre:border-border max-w-none">
              {lesson.content}
            </article>

            {/* Paper References */}
            {lesson.metadata.papers && lesson.metadata.papers.length > 0 && (
              <div className="mt-12 pt-8 border-t border-border">
                <div className="flex items-center gap-2 mb-6">
                  <FileText className="w-5 h-5 text-primary" />
                  <h3 className="text-xl font-bold">Research Papers Referenced</h3>
                </div>
                <div className="grid gap-4">
                  {lesson.metadata.papers.map((paper, index) => (
                    <a
                      key={index}
                      href={paper.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block p-5 border-2 border-border rounded-xl bg-card hover:border-primary/50 hover:shadow-lg transition-all"
                    >
                      <div className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                        {paper.title}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {paper.authors} ({paper.year})
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="mt-12 pt-8 border-t border-border">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {prevLesson ? (
                  <Link
                    href={`/learn/${difficulty}/${prevLesson.slug}`}
                    className="group flex flex-col p-5 border-2 border-border rounded-xl hover:border-primary/50 hover:shadow-md transition-all"
                  >
                    <span className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                      <ArrowLeft className="w-3 h-3" />
                      Previous Lesson
                    </span>
                    <span className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {prevLesson.metadata.title}
                    </span>
                  </Link>
                ) : (
                  <div />
                )}

                {nextLesson ? (
                  <Link
                    href={`/learn/${difficulty}/${nextLesson.slug}`}
                    className="group flex flex-col p-5 border-2 border-border rounded-xl hover:border-primary/50 hover:shadow-md transition-all text-right sm:col-start-2"
                  >
                    <span className="text-xs text-muted-foreground mb-1 flex items-center gap-1 justify-end">
                      Next Lesson
                      <ArrowRight className="w-3 h-3" />
                    </span>
                    <span className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {nextLesson.metadata.title}
                    </span>
                  </Link>
                ) : (
                  <Link
                    href="/learn"
                    className="group flex flex-col p-5 border-2 border-primary/30 rounded-xl bg-primary/5 hover:bg-primary/10 transition-all text-right sm:col-start-2"
                  >
                    <span className="text-xs text-muted-foreground mb-1">Completed!</span>
                    <span className="font-semibold text-primary flex items-center gap-2 justify-end">
                      Back to Learning Paths
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </ContentGate>
    </div>
  );
}
