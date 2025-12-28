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
      {/* Compact Header */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-1">Learning Paths</h1>
              <p className="text-muted-foreground">
                {totalLessons} lessons across 3 difficulty levels
              </p>
            </div>

            {/* Progress for logged in users */}
            {session && completedLessons > 0 && (
              <div className="flex items-center gap-3 px-4 py-2 bg-primary/10 rounded-lg">
                <Trophy className="w-5 h-5 text-primary" />
                <div className="text-sm">
                  <span className="font-semibold">{completedLessons}</span>
                  <span className="text-muted-foreground"> / {totalLessons} completed</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Learning Paths */}
      <section className="py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {(["beginner", "intermediate", "advanced"] as const).map((difficulty, index) => {
                const data = curriculum[difficulty];
                const Icon = difficultyIcons[difficulty];
                const gradient = difficultyColors[difficulty];

                return (
                  <Link
                    key={difficulty}
                    href={`/learn/${difficulty}`}
                    className="block"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="relative overflow-hidden border hover:border-primary/50 transition-all hover:shadow-lg h-full group">
                        {/* Gradient accent */}
                        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient}`} />

                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0`}>
                              <Icon className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-bold text-lg">{data.title}</h3>
                                {difficulty === "beginner" && (
                                  <span className="px-2 py-0.5 text-xs font-medium bg-green-500/20 text-green-600 dark:text-green-400 rounded">
                                    Start Here
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                                {data.description}
                              </p>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <span>{data.duration}</span>
                                <span>•</span>
                                <span>{stats[difficulty]} lessons</span>
                                <span>•</span>
                                <span>{data.modules.length} modules</span>
                              </div>
                            </div>
                            <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
