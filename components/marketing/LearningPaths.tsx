"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Braces, Cpu, ArrowRight, Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const learningPaths = [
  {
    icon: BookOpen,
    title: "Complete Beginner",
    description: "Start from zero — no coding, no math, no NLP background",
    features: [
      "NLP, ML, deep-learning foundations in plain English",
      "Embeddings, tokens, and how transformers really work",
      "Claude 4.7, GPT-5, Gemini 2.5 — compared & used",
      "NotebookLM, Cursor, Bolt.new, and the no-code stack",
    ],
    duration: "3–4 weeks",
    difficulty: "Beginner",
    link: "/learn/beginner/what-is-nlp",
  },
  {
    icon: Braces,
    title: "Creator & Builder",
    description: "Ship real AI apps — agents, MCP connectors, stateful workflows",
    features: [
      "Google ADK, OpenAI Agents SDK, CrewAI",
      "MCP connectors — build & consume them",
      "LangGraph workflows with human-in-the-loop",
      "Production RAG, reasoning models, Vercel AI SDK",
    ],
    duration: "6–8 weeks",
    difficulty: "Intermediate",
    link: "/learn/intermediate/langchain-basics",
    popular: true,
  },
  {
    icon: Cpu,
    title: "Advanced Developer",
    description: "Fine-tune, deploy, evaluate — production-grade AI systems",
    features: [
      "LoRA, QLoRA, RLHF, DPO end-to-end",
      "Computer-use agents, multi-agent orchestration",
      "Production MCP servers, observability, evals",
      "vLLM, SGLang, quantization, cost optimization",
    ],
    duration: "9–11 weeks",
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
    <section className="py-20 md:py-28 relative overflow-hidden bg-background">

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="section-label">01 / Paths</span>
            <span className="h-px flex-1 bg-border max-w-[200px]" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight max-w-3xl leading-tight">
            Three paths.{" "}
            <span className="text-primary">One destination.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mt-5 leading-relaxed">
            Pick the one that matches where you are today. You can switch tracks
            anytime — lessons in each path are self-contained.
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
                  "relative h-full group overflow-hidden transition-all duration-300",
                  "border bg-card hover:border-primary/40",
                  path.popular && "border-primary/60 shadow-xl shadow-primary/10"
                )}
              >
                {/* Top number stripe */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-5">
                    <div className="inline-flex p-2.5 rounded-lg bg-primary/8 border border-primary/15">
                      <path.icon className="w-5 h-5 text-primary" strokeWidth={1.75} />
                    </div>
                    <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <CardTitle className="text-2xl font-bold mb-2 leading-tight">
                    {path.title}
                  </CardTitle>
                  <CardDescription className="text-[15px] leading-relaxed">
                    {path.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pb-4">
                  <ul className="space-y-2.5 mb-6">
                    {path.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm">
                        <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" strokeWidth={2.25} />
                        <span className="text-foreground/75 leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-wider text-muted-foreground pt-4 border-t border-border/60">
                    <span>{path.difficulty}</span>
                    <span className="text-border">·</span>
                    <span>{path.duration}</span>
                    {path.popular && (
                      <>
                        <span className="text-border">·</span>
                        <span className="text-primary">recommended</span>
                      </>
                    )}
                  </div>
                </CardContent>

                <CardFooter>
                  <Button
                    variant={path.popular ? "default" : "outline"}
                    className="w-full group/btn h-11"
                    asChild
                  >
                    <Link href={path.link}>
                      Start this path
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
