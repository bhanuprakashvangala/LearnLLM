"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import {
  BookOpen, Code, Rocket, ArrowRight, Clock, Users,
  Trophy, Sparkles, CheckCircle2, Play, GraduationCap,
  FileText, Layers, Target, Zap
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
  const { completedLessons, lessonProgress } = useProgress();

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

  const features = [
    {
      icon: FileText,
      title: "83+ Lessons",
      description: "Comprehensive curriculum from basics to advanced"
    },
    {
      icon: Layers,
      title: "15+ Papers",
      description: "Research papers explained in simple terms"
    },
    {
      icon: Target,
      title: "10+ Projects",
      description: "Real-world portfolio projects"
    },
    {
      icon: Users,
      title: "Community",
      description: "Learn with thousands of developers"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/5 to-transparent" />
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 rounded-full text-sm font-medium text-primary mb-6">
              <GraduationCap className="w-4 h-4" />
              Start Your AI Journey
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Master{" "}
              <span className="gradient-text">Large Language Models</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              From complete beginner to production AI engineer. Learn at your own pace with
              hands-on tutorials, paper explanations, and real-world projects.
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 mb-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                    className="flex items-center gap-2 text-sm"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold">{feature.title}</div>
                      <div className="text-xs text-muted-foreground hidden sm:block">{feature.description}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Progress for logged in users */}
            {session && completedLessons > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-3 px-5 py-3 bg-card border-2 border-primary/30 rounded-xl shadow-lg"
              >
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left">
                  <div className="font-semibold">{completedLessons} lessons completed</div>
                  <div className="text-sm text-muted-foreground">
                    {Math.round((completedLessons / totalLessons) * 100)}% of the curriculum
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12 text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Learning Path</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Start where you are. Each path is designed to take you from your current
                level to the next with hands-on practice.
              </p>
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

      {/* Features Stats */}
      <section className="py-16 bg-muted/30 border-y border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="p-6"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-primary" />
                </div>
                <div className="text-4xl font-bold text-primary mb-2">80+</div>
                <div className="font-semibold mb-1">Comprehensive Lessons</div>
                <div className="text-sm text-muted-foreground">
                  From basics to advanced production systems
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="p-6"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-purple-500/10 flex items-center justify-center">
                  <FileText className="w-8 h-8 text-purple-600" />
                </div>
                <div className="text-4xl font-bold text-purple-600 mb-2">15+</div>
                <div className="font-semibold mb-1">Research Papers</div>
                <div className="text-sm text-muted-foreground">
                  Explained in simple, understandable terms
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="p-6"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-amber-500/10 flex items-center justify-center">
                  <Zap className="w-8 h-8 text-amber-600" />
                </div>
                <div className="text-4xl font-bold text-amber-600 mb-2">10+</div>
                <div className="font-semibold mb-1">Hands-on Projects</div>
                <div className="text-sm text-muted-foreground">
                  Build portfolio-worthy AI applications
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <Sparkles className="w-12 h-12 mx-auto mb-6 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your AI Journey?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of developers who are building the future with AI.
              No prior experience required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-base font-semibold group" asChild>
                <Link href="/learn/beginner">
                  <GraduationCap className="w-5 h-5 mr-2" />
                  Start with Basics
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-base font-semibold" asChild>
                <Link href="/pricing">
                  View Pricing
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
