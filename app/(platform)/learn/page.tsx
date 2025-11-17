import * as React from "react";
import Link from "next/link";
import { BookOpen, Code, Rocket, ArrowRight, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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

export default function LearnPage() {
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

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 border-b bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-4">
              Master <span className="gradient-text">Large Language Models</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              From complete beginner to production AI engineer. Learn at your own pace with
              hands-on tutorials, paper explanations, and real-world projects.
            </p>
            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-success" />
                <span>{stats.beginner + stats.intermediate + stats.advanced} lessons</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span>15+ research papers</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent" />
                <span>10+ projects</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold mb-3">Choose Your Learning Path</h2>
              <p className="text-muted-foreground">
                Start where you are. Each path is designed to take you from your current
                level to the next.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {(["beginner", "intermediate", "advanced"] as const).map((difficulty) => {
                const data = curriculum[difficulty];
                const Icon = difficultyIcons[difficulty];
                const gradient = difficultyColors[difficulty];

                return (
                  <Card
                    key={difficulty}
                    className="relative overflow-hidden border-2 hover:border-primary/50 transition-all hover:shadow-lg"
                  >
                    {/* Gradient accent */}
                    <div
                      className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient}`}
                    />

                    <CardHeader className="pt-8">
                      <div className="mb-4">
                        <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${gradient}`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <CardTitle className="text-2xl">{data.title}</CardTitle>
                      <CardDescription className="text-base">
                        {data.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* Stats */}
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span>{data.duration}</span>
                        </div>
                        <div className="text-muted-foreground">
                          {stats[difficulty]} lessons
                        </div>
                      </div>

                      {/* Modules */}
                      <div className="space-y-2">
                        <div className="text-sm font-medium">What you'll learn:</div>
                        <ul className="space-y-1.5">
                          {data.modules.slice(0, 3).map((module) => (
                            <li
                              key={module.id}
                              className="text-sm text-muted-foreground flex items-center gap-2"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                              {module.title}
                            </li>
                          ))}
                          {data.modules.length > 3 && (
                            <li className="text-sm text-muted-foreground flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                              +{data.modules.length - 3} more modules
                            </li>
                          )}
                        </ul>
                      </div>
                    </CardContent>

                    <CardFooter>
                      <Button
                        variant="default"
                        className="w-full group"
                        asChild
                      >
                        <Link href={`/learn/${difficulty}`}>
                          Start Learning
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-muted/20 border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">80+</div>
                <div className="font-medium mb-1">Comprehensive Lessons</div>
                <div className="text-sm text-muted-foreground">
                  From basics to advanced production systems
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold text-secondary mb-2">15+</div>
                <div className="font-medium mb-1">Research Papers</div>
                <div className="text-sm text-muted-foreground">
                  Explained in simple, understandable terms
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold text-accent mb-2">10+</div>
                <div className="font-medium mb-1">Hands-on Projects</div>
                <div className="text-sm text-muted-foreground">
                  Build portfolio-worthy AI applications
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
