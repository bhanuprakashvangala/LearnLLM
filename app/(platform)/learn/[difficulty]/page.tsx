import * as React from "react";
import Link from "next/link";
import { ArrowRight, Clock, BookOpen, ChevronLeft, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import curriculum from "@/data/curriculum.json";
import { notFound } from "next/navigation";

interface DifficultyPageProps {
  params: Promise<{
    difficulty: string;
  }>;
}

const difficultyColors = {
  beginner: "from-green-500 to-emerald-600",
  intermediate: "from-blue-500 to-indigo-600",
  advanced: "from-purple-500 to-pink-600",
};

export async function generateStaticParams() {
  return [
    { difficulty: "beginner" },
    { difficulty: "intermediate" },
    { difficulty: "advanced" },
  ];
}

export default async function DifficultyPage({ params }: DifficultyPageProps) {
  const { difficulty } = await params;

  if (!["beginner", "intermediate", "advanced"].includes(difficulty)) {
    notFound();
  }

  const data = curriculum[difficulty as keyof typeof curriculum];
  const difficultyKey = difficulty as keyof typeof difficultyColors;
  const totalLessons = data.modules.reduce(
    (acc, module) => acc + module.lessons.length,
    0
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Compact Header */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/learn"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4"
            >
              <ChevronLeft className="w-4 h-4" />
              All Paths
            </Link>

            <div className="flex items-center gap-4 mb-2">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${difficultyColors[difficultyKey]} flex items-center justify-center`}>
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{data.title}</h1>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{data.duration}</span>
                  <span>•</span>
                  <span>{totalLessons} lessons</span>
                  <span>•</span>
                  <span>{data.modules.length} modules</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modules - Compact List */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-3xl mx-auto space-y-6">
          {data.modules.map((module, moduleIndex) => (
            <div key={module.id} className="border rounded-xl overflow-hidden">
              {/* Module Header */}
              <div className="bg-muted/50 px-5 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${difficultyColors[difficultyKey]} flex items-center justify-center text-white text-sm font-bold`}>
                    {moduleIndex + 1}
                  </div>
                  <div>
                    <h2 className="font-semibold">{module.title}</h2>
                    <p className="text-sm text-muted-foreground">{module.lessons.length} lessons</p>
                  </div>
                </div>
                <Button size="sm" variant="ghost" asChild>
                  <Link href={`/learn/${difficulty}/${module.lessons[0].slug}`}>
                    <Play className="w-4 h-4 mr-1" />
                    Start
                  </Link>
                </Button>
              </div>

              {/* Lessons List */}
              <div className="divide-y">
                {module.lessons.map((lesson, lessonIndex) => (
                  <Link
                    key={lesson.slug}
                    href={`/learn/${difficulty}/${lesson.slug}`}
                    className="flex items-center justify-between px-5 py-3 hover:bg-muted/30 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-muted text-xs font-medium flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                        {lessonIndex + 1}
                      </span>
                      <span className="text-sm font-medium group-hover:text-primary transition-colors">
                        {lesson.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{lesson.duration} min</span>
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
