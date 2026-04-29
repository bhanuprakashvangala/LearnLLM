"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import {
  BookOpen, Code, Rocket, ArrowRight, Clock,
  Trophy, Play, Layers
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/contexts/ProgressContext";
import curriculum from "@/data/curriculum.json";

const difficultyIcons = {
  beginner: BookOpen,
  intermediate: Code,
  advanced: Rocket,
};

const difficultyColors = {
  beginner: "from-green-500 to-emerald-600",
  intermediate: "from-blue-500 to-indigo-600",
  advanced: "from-purple-500 to-pink-600",
};

const difficultyBgColors = {
  beginner: "bg-green-500/10 border-green-500/20",
  intermediate: "bg-blue-500/10 border-blue-500/20",
  advanced: "bg-purple-500/10 border-purple-500/20",
};

export default function LearnPage() {
  const { data: session } = useSession();
  const { completedLessons } = useProgress();

  // The curriculum overview is intentionally public so it can be indexed.
  // Signed-in users get the progress widget added; signed-out users still
  // see the full path layout and can browse from here.

  // Calculate total lessons per difficulty
  const stats = {
    beginner: curriculum.beginner.modules.reduce(
      (acc, module) => acc + module.lessons.length,
      0
    ),
    intermediate: curriculum.intermediate.modules.reduce(
      (acc, module) => acc + module.lessons.length,
      0
    ),
    advanced: curriculum.advanced.modules.reduce(
      (acc, module) => acc + module.lessons.length,
      0
    ),
  };

  const totalLessons = stats.beginner + stats.intermediate + stats.advanced;

  return (
    <div className="min-h-screen bg-background">
      {/* Learning Paths — no marketing hero. The page is a curriculum
          index, not a landing page; the homepage already does the
          pitch. We go straight to "pick your level" with a tight
          intro line and an optional progress chip for returning users. */}
      <section className="pt-12 md:pt-16 pb-16 md:pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12 max-w-2xl"
            >
              <div className="text-[11px] font-mono uppercase tracking-widest text-primary mb-4">
                Curriculum
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.05] mb-5">
                Three levels. One path.
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                110+ lessons that take you from "what is a token" to shipping
                production AI agents. Pick where you are. Move at your own pace.
                Always free.
              </p>

              {session && completedLessons > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="inline-flex items-center gap-3 px-4 py-2.5 mt-6 bg-card border border-primary/30 rounded-xl shadow-sm"
                >
                  <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center">
                    <Trophy className="w-4 h-4 text-primary" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-sm">
                      {completedLessons} {completedLessons === 1 ? "lesson" : "lessons"} complete
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {Math.round((completedLessons / totalLessons) * 100)}% of the curriculum
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
              {(["beginner", "intermediate", "advanced"] as const).map((difficulty, index) => {
                const data = curriculum[difficulty];
                const Icon = difficultyIcons[difficulty];
                const gradient = difficultyColors[difficulty];
                const bgColor = difficultyBgColors[difficulty];

                return (
                  <motion.div
                    key={difficulty}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card
                      className={`relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col`}
                    >
                      {/* Gradient accent */}
                      <div
                        className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${gradient}`}
                      />

                      <CardHeader className="pt-8 pb-4">
                        <div className="mb-4">
                          <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${gradient} shadow-lg`}>
                            <Icon className="w-7 h-7 text-white" />
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="text-2xl">{data.title}</CardTitle>
                          {difficulty === "beginner" && (
                            <span className="px-2 py-0.5 text-xs font-medium bg-green-500/20 text-green-700 dark:text-green-400 rounded-full">
                              Start Here
                            </span>
                          )}
                        </div>
                        <CardDescription className="text-base">
                          {data.description}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="space-y-5 flex-1">
                        {/* Stats */}
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <span className="font-medium">{data.duration}</span>
                          </div>
                          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted">
                            <BookOpen className="w-4 h-4 text-muted-foreground" />
                            <span className="font-medium">{stats[difficulty]} lessons</span>
                          </div>
                        </div>

                        {/* Modules */}
                        <div className="space-y-3">
                          <div className="text-sm font-semibold flex items-center gap-2">
                            <Layers className="w-4 h-4 text-primary" />
                            What you'll learn:
                          </div>
                          <ul className="space-y-2">
                            {data.modules.slice(0, 3).map((module, idx) => (
                              <li
                                key={module.id}
                                className="text-sm text-muted-foreground flex items-center gap-2"
                              >
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${bgColor}`}>
                                  {idx + 1}
                                </div>
                                {module.title}
                              </li>
                            ))}
                            {data.modules.length > 3 && (
                              <li className="text-sm text-muted-foreground flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs">
                                  +
                                </div>
                                {data.modules.length - 3} more modules
                              </li>
                            )}
                          </ul>
                        </div>
                      </CardContent>

                      <CardFooter className="pt-4">
                        <Button
                          variant="default"
                          className={`w-full h-12 group font-semibold bg-gradient-to-r ${gradient} hover:opacity-90 transition-opacity`}
                          asChild
                        >
                          <Link href={`/learn/${difficulty}`}>
                            <Play className="w-4 h-4 mr-2" />
                            Start Learning
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
