import * as React from "react";
import Link from "next/link";
import { ArrowRight, Clock, BookOpen, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import curriculum from "@/data/curriculum.json";
import { notFound } from "next/navigation";

interface DifficultyPageProps {
  params: Promise<{
    difficulty: string;
  }>;
}

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
  const totalLessons = data.modules.reduce(
    (acc, module) => acc + module.lessons.length,
    0
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-16 border-b bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-4">
              <Link
                href="/learn"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
              >
                ← Back to all paths
              </Link>
            </div>
            <h1 className="text-4xl font-bold mb-3">{data.title}</h1>
            <p className="text-xl text-muted-foreground mb-6">{data.description}</p>
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span>{data.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-muted-foreground" />
                <span>{totalLessons} lessons</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-muted-foreground" />
                <span>{data.modules.length} modules</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modules */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-8">
            {data.modules.map((module, moduleIndex) => (
              <Card key={module.id} className="border-2">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">
                        Module {moduleIndex + 1} of {data.modules.length}
                      </div>
                      <CardTitle className="text-2xl mb-2">{module.title}</CardTitle>
                      <CardDescription className="text-base">
                        {module.description}
                      </CardDescription>
                    </div>
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-bold text-lg text-primary">
                      {moduleIndex + 1}
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-3">
                    {module.lessons.map((lesson, lessonIndex) => (
                      <Link
                        key={lesson.slug}
                        href={`/learn/${difficulty}/${lesson.slug}`}
                        className="group block p-4 rounded-lg border-2 border-transparent hover:border-primary/50 hover:bg-muted/50 transition-all"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-4 flex-1">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium group-hover:bg-primary group-hover:text-white transition-colors">
                              {lessonIndex + 1}
                            </div>
                            <div className="flex-1">
                              <div className="font-medium group-hover:text-primary transition-colors">
                                {lesson.title}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1.5">
                              <Clock className="w-4 h-4" />
                              <span>{lesson.duration} min</span>
                            </div>
                            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {moduleIndex === 0 && (
                    <div className="mt-6 pt-6 border-t">
                      <Button
                        variant="default"
                        className="w-full md:w-auto group"
                        asChild
                      >
                        <Link href={`/learn/${difficulty}/${module.lessons[0].slug}`}>
                          Start Module
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
