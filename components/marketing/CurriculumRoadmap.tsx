"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  BookOpen,
  Code,
  Rocket,
  Check,
  GraduationCap,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const roadmapSteps = [
  {
    level: "Beginner",
    subtitle: "No code required",
    icon: BookOpen,
    color: "emerald",
    gradient: "from-emerald-500 to-green-600",
    borderAccent: "border-l-emerald-500",
    modules: [
      "AI Fundamentals & How LLMs Actually Work",
      "Prompt Engineering (CoT, Few-Shot, Patterns)",
      "No-Code Tools (ChatGPT, Claude, Gemini)",
      "Real-World AI (NotebookLM, Bolt.new, Cursor, Agentic AI Basics)",
    ],
    outcome: "Understand AI deeply, write expert-level prompts, use every major AI tool",
    lessons: 20,
    duration: "2-3 weeks",
    link: "/learn/beginner",
  },
  {
    level: "Intermediate",
    subtitle: "Build real AI apps",
    icon: Code,
    color: "blue",
    gradient: "from-blue-500 to-indigo-600",
    borderAccent: "border-l-blue-500",
    modules: [
      "Transformer Architecture & Modern LLMs (GPT, BERT, LLaMA)",
      "LangChain, LlamaIndex & AI Frameworks",
      "RAG Systems & Vector Databases (Pinecone, ChromaDB)",
      "Agentic Frameworks (Google ADK, OpenAI SDK, CrewAI)",
      "Modern Stack (MCP Protocol, Vercel AI SDK, AI Dev Tools)",
    ],
    outcome: "Build AI agents, RAG systems, and full-stack AI apps from scratch",
    lessons: 35,
    duration: "5-7 weeks",
    link: "/learn/intermediate",
  },
  {
    level: "Advanced",
    subtitle: "Production systems",
    icon: Rocket,
    color: "purple",
    gradient: "from-purple-500 to-pink-600",
    borderAccent: "border-l-purple-500",
    modules: [
      "Advanced Transformers, LLaMA, Mistral & MoE",
      "Fine-Tuning (LoRA, QLoRA, RLHF, DPO)",
      "AI Agents (ReAct, Tool Use, Multi-Agent Systems)",
      "Production RAG, Deployment (vLLM) & Optimization",
      "Production Agentic (AutoGen, Orchestration, MCP Servers, Evaluation)",
    ],
    outcome: "Ship production multi-agent pipelines, fine-tuned models, and scalable AI systems",
    lessons: 45,
    duration: "8-10 weeks",
    link: "/learn/advanced",
  },
];

export function CurriculumRoadmap() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-5 tracking-tight">
            From Zero to{" "}
            <span className="hero-gradient-text">Production AI</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            100+ lessons across three structured levels. Hands-on projects in every module.
            Go at your own pace -- each level builds on the last.
          </p>
        </motion.div>

        {/* Roadmap */}
        <div className="max-w-3xl mx-auto">
          {roadmapSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {/* Connector line */}
              {index < roadmapSteps.length - 1 && (
                <div className="absolute left-7 top-full w-px h-8 bg-gradient-to-b from-border to-transparent z-10" />
              )}

              <div className={`rounded-2xl border border-border bg-card p-6 md:p-8 mb-8 border-l-4 ${step.borderAccent} hover:shadow-lg hover:shadow-primary/5 transition-all duration-300`}>
                {/* Header row */}
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl bg-gradient-to-br ${step.gradient} shadow-lg`}>
                      <step.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-extrabold tracking-tight">{step.level}</h3>
                      <div className="text-sm text-muted-foreground">{step.subtitle}</div>
                    </div>
                  </div>
                  <div className="text-right text-sm text-muted-foreground hidden sm:block">
                    <div className="font-semibold text-foreground">{step.lessons} lessons</div>
                    <div>{step.duration}</div>
                  </div>
                </div>

                {/* Module list */}
                <div className="space-y-2.5 mb-5">
                  {step.modules.map((mod, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground leading-snug">{mod}</span>
                    </div>
                  ))}
                </div>

                {/* Outcome */}
                <div className="flex items-center justify-between gap-4 pt-4 border-t border-border">
                  <div>
                    <div className="text-[10px] font-bold text-primary uppercase tracking-widest mb-0.5">Outcome</div>
                    <div className="text-sm font-medium text-foreground">{step.outcome}</div>
                  </div>
                  <Link
                    href={step.link}
                    className="flex-shrink-0 text-sm font-medium text-primary hover:underline flex items-center gap-1"
                  >
                    View <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-4"
        >
          <Button size="lg" asChild className="text-base px-8 h-12">
            <Link href="/learn">
              Start Your Journey
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
