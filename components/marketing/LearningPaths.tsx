"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Code, Rocket, ArrowRight, Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const learningPaths = [
  {
    icon: BookOpen,
    title: "Complete Beginner",
    description: "Zero coding required - perfect for everyone!",
    gradient: "from-green-500 to-emerald-600",
    features: [
      "No coding needed - start today!",
      "Master ChatGPT & prompt engineering",
      "Build AI apps with no-code tools",
      "Understand how AI actually works",
    ],
    duration: "1-2 weeks",
    difficulty: "Beginner",
    link: "/learn/beginner/what-is-llm",
  },
  {
    icon: Code,
    title: "Creator & Builder",
    description: "Build real AI apps - for anyone ready to level up",
    gradient: "from-primary to-secondary",
    features: [
      "LangChain basics (visual + code)",
      "RAG - AI with YOUR documents",
      "Create chatbots and assistants",
      "Share your AI creations online",
    ],
    duration: "3-4 weeks",
    difficulty: "Intermediate",
    link: "/learn/intermediate/langchain-basics",
    popular: true,
  },
  {
    icon: Rocket,
    title: "Advanced Developer",
    description: "For developers who want to build production AI",
    gradient: "from-accent to-pink-600",
    features: [
      "Fine-tune models for custom needs",
      "Build autonomous AI agents",
      "Deploy apps that scale",
      "Advanced architectures & optimization",
    ],
    duration: "4-6 weeks",
    difficulty: "Advanced",
    link: "/learn/advanced/fine-tuning",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

export function LearningPaths() {
  return (
    <section className="min-h-screen py-12 md:py-16 relative overflow-hidden bg-background flex flex-col justify-center snap-start">

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Choose Your <span className="gradient-text">Learning Path</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We meet you where you are. Pick the path that matches your experience level.
          </p>
        </motion.div>

        {/* Learning Path Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          {learningPaths.map((path, index) => (
            <motion.div key={index} variants={item}>
              <Card
                className={cn(
                  "relative h-full group cursor-pointer",
                  path.popular && "ring-2 ring-primary shadow-2xl scale-105"
                )}
              >
                {path.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <div className="bg-primary text-white px-4 py-1 rounded-full text-sm font-medium shadow-md">
                      Most Popular
                    </div>
                  </div>
                )}

                <CardHeader>
                  {/* Icon */}
                  <div className="mb-4">
                    <div className="inline-flex p-3 rounded-xl bg-primary/10 border border-primary/20">
                      <path.icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>

                  <CardTitle className="text-2xl mb-2">{path.title}</CardTitle>
                  <CardDescription className="text-base">
                    {path.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  {/* Features */}
                  <ul className="space-y-3 mb-6">
                    {path.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        path.difficulty === "Beginner" && "bg-green-500",
                        path.difficulty === "Intermediate" && "bg-primary",
                        path.difficulty === "Advanced" && "bg-accent"
                      )} />
                      <span>{path.difficulty}</span>
                    </div>
                    <span>•</span>
                    <span>{path.duration}</span>
                  </div>
                </CardContent>

                <CardFooter>
                  <Button
                    variant={path.popular ? "default" : "outline"}
                    className="w-full group/btn"
                    asChild
                  >
                    <Link href={path.link}>
                      Start Learning
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-4">
            Not sure which path is right for you?
          </p>
          <Button variant="ghost" asChild>
            <Link href="/quiz">
              Take Our Quick Assessment
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
