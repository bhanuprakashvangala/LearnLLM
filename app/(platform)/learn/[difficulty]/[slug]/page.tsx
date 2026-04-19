import * as React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock, ChevronLeft, GraduationCap } from "lucide-react";
import { getLessonBySlug, getAllLessonSlugs, getLessonsByDifficulty } from "@/lib/mdx/loader";
import { notFound } from "next/navigation";
import curriculum from "@/data/curriculum.json";
import { ContentGate } from "@/components/shared/ContentGate";
import { LessonProgressBar } from "@/components/learn/LessonProgressBar";
import { LessonToc } from "@/components/learn/LessonToc";
import type { Difficulty } from "@/lib/access";

interface LessonPageProps {
  params: Promise<{
    difficulty: string;
    slug: string;
  }>;
}

const difficultyBadge = {
  beginner: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  intermediate: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  advanced: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
} as const;

export async function generateStaticParams() {
  const slugs = getAllLessonSlugs();
  return slugs.map(({ difficulty, slug }) => ({ difficulty, slug }));
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
  if (!lesson) notFound();

  const allLessons = await getLessonsByDifficulty(
    difficulty as "beginner" | "intermediate" | "advanced"
  );
  const currentIndex = allLessons.findIndex((l) => l.slug === slug);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  const curriculumData = curriculum[difficulty as keyof typeof curriculum];
  let currentModule: typeof curriculumData.modules[number] | null = null;
  for (const module of curriculumData.modules) {
    if (module.lessons.some((l) => l.slug === slug)) {
      currentModule = module;
      break;
    }
  }

  const difficultyLevel = difficulty.toUpperCase() as Difficulty;
  const difficultyKey = difficulty as "beginner" | "intermediate" | "advanced";

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky top nav */}
      <div className="sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <Link
              href={`/learn/${difficulty}`}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">{curriculumData.title}</span>
              <span className="sm:hidden">Back</span>
            </Link>

            <div className="flex items-center gap-3">
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono uppercase tracking-wider border ${difficultyBadge[difficultyKey]}`}>
                {difficulty}
              </span>
              <span className="text-xs font-mono text-muted-foreground hidden sm:inline">
                {String(currentIndex + 1).padStart(2, "0")} / {String(allLessons.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Reading progress bar */}
      <LessonProgressBar targetSelector="article[data-lesson-body]" />

      {/* Content */}
      <ContentGate difficulty={difficultyLevel} title={lesson.metadata.title} slug={slug}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <div className="grid lg:grid-cols-[minmax(0,1fr)_220px] xl:grid-cols-[minmax(0,1fr)_240px] gap-10 xl:gap-16 max-w-6xl mx-auto">
            {/* Main article column */}
            <div className="min-w-0">
              {/* Lesson header */}
              <header className="mb-10 pb-8 border-b border-border">
                {currentModule && (
                  <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-primary mb-4">
                    <GraduationCap className="w-3.5 h-3.5" />
                    {currentModule.title}
                  </div>
                )}

                <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold leading-[1.1] tracking-tight mb-4">
                  {lesson.metadata.title}
                </h1>

                {lesson.metadata.description && (
                  <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                    {lesson.metadata.description}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-6 text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {lesson.metadata.duration} min read
                  </span>
                  {lesson.metadata.tags?.slice(0, 4).map((tag) => (
                    <span key={tag} className="text-foreground/60">· {tag}</span>
                  ))}
                </div>
              </header>

              {/* Article body */}
              <article
                data-lesson-body
                className="prose prose-neutral dark:prose-invert max-w-none
                  prose-headings:font-bold prose-headings:tracking-tight prose-headings:scroll-mt-24
                  prose-h2:text-2xl prose-h2:mt-14 prose-h2:mb-5 prose-h2:pb-2 prose-h2:border-b prose-h2:border-border
                  prose-h3:text-xl prose-h3:mt-10 prose-h3:mb-3
                  prose-p:text-foreground/85 prose-p:leading-[1.75]
                  prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-a:underline-offset-4 prose-a:font-medium
                  prose-strong:text-foreground prose-strong:font-semibold
                  prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-[0.875em] prose-code:before:content-none prose-code:after:content-none prose-code:font-medium
                  prose-pre:bg-[#0d1117] prose-pre:border prose-pre:border-border prose-pre:text-slate-200
                  prose-blockquote:border-l-primary prose-blockquote:text-foreground/75 prose-blockquote:not-italic
                  prose-li:text-foreground/85 prose-li:leading-[1.75]
                  prose-hr:border-border"
              >
                {lesson.content}
              </article>

              {/* Prev / Next */}
              <nav className="mt-16 pt-8 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-4">
                {prevLesson ? (
                  <Link
                    href={`/learn/${difficulty}/${prevLesson.slug}`}
                    className="group p-5 rounded-xl border border-border hover:border-primary/50 hover:bg-muted/30 transition-all"
                  >
                    <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">
                      <ArrowLeft className="w-3 h-3" /> Previous
                    </div>
                    <div className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {prevLesson.metadata.title}
                    </div>
                  </Link>
                ) : (
                  <div className="hidden sm:block" />
                )}

                {nextLesson ? (
                  <Link
                    href={`/learn/${difficulty}/${nextLesson.slug}`}
                    className="group p-5 rounded-xl border border-border hover:border-primary/50 hover:bg-muted/30 transition-all text-right sm:col-start-2"
                  >
                    <div className="flex items-center justify-end gap-1.5 text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">
                      Next <ArrowRight className="w-3 h-3" />
                    </div>
                    <div className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {nextLesson.metadata.title}
                    </div>
                  </Link>
                ) : (
                  <Link
                    href={`/learn/${difficulty}`}
                    className="group p-5 rounded-xl border border-primary/40 bg-primary/5 hover:bg-primary/10 transition-all text-right sm:col-start-2"
                  >
                    <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">
                      End of track
                    </div>
                    <div className="font-semibold text-primary flex items-center gap-2 justify-end">
                      Back to {curriculumData.title} <ArrowRight className="w-4 h-4" />
                    </div>
                  </Link>
                )}
              </nav>
            </div>

            {/* Sticky TOC — desktop only */}
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <LessonToc targetSelector="article[data-lesson-body]" />
              </div>
            </aside>
          </div>
        </div>
      </ContentGate>
    </div>
  );
}
