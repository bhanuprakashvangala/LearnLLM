"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Blocks,
  Terminal,
  BookOpen,
  SlidersHorizontal,
  Database,
  Brain,
  Target,
  GitBranch,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: BookOpen,
    title: "Start with No Code",
    description: "Begin your AI journey with zero coding. Learn ChatGPT, prompt engineering, NotebookLM, and Bolt.new - perfect for everyone!",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: Target,
    title: "Prompt Engineering",
    description: "Get 10x better results from ChatGPT and Claude. Master Chain of Thought, Few-Shot prompting, and techniques the pros use.",
    gradient: "from-orange-500 to-red-500",
  },
  {
    icon: Brain,
    title: "Agentic AI Frameworks",
    description: "Build autonomous agents with Google ADK, OpenAI Agents SDK, CrewAI, and AutoGen. The hottest skill in AI right now.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Code2,
    title: "LangChain & LlamaIndex",
    description: "Master the two most popular AI frameworks. Build chains, agents, and data-connected AI apps from scratch.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: GitBranch,
    title: "MCP Protocol",
    description: "Learn Anthropic's Model Context Protocol - the open standard connecting AI to tools and data. The USB-C of AI integration.",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    icon: Database,
    title: "RAG & Vector Search",
    description: "Make AI work with YOUR documents and data. Build production RAG systems with Pinecone, ChromaDB, and Weaviate.",
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    icon: SlidersHorizontal,
    title: "Fine-Tune & Deploy",
    description: "Customize models with LoRA/QLoRA, then deploy with vLLM. Go from fine-tuning to production-ready in one path.",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    icon: Terminal,
    title: "AI Dev Tools",
    description: "Master Cursor, Claude Code, Windsurf, and the Vercel AI SDK. Build full-stack AI apps with the modern development stack.",
    gradient: "from-teal-500 to-cyan-500",
  },
  {
    icon: Blocks,
    title: "Real Projects & Challenges",
    description: "Build multi-agent research systems, production RAG pipelines, full-stack AI apps, and more. Portfolio-ready from day one.",
    gradient: "from-violet-500 to-purple-500",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function Features() {
  return (
    <section id="features" className="py-20 md:py-28 relative overflow-hidden bg-muted/30">

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
            What You'll <span className="gradient-text">Learn</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From prompt engineering to production agentic systems. Every major framework,
            every essential tool, every skill that matters.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={item}>
              <Card className="h-full group hover:shadow-lg transition-all duration-200 border-2 hover:border-primary/50 bg-card">
                <CardHeader>
                  <div className="mb-4">
                    <div className="inline-flex p-3 rounded-lg bg-primary/10 border border-primary/20">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-xl font-bold mb-2">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 md:mt-16"
        >
          <div className="bg-card rounded-2xl p-10 md:p-16 shadow-xl border-2 border-border">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
              {[
                { value: "100+", label: "Hands-On Lessons", color: "from-primary to-secondary" },
                { value: "0", label: "Coding Required to Start", color: "from-secondary to-accent" },
                { value: "20+", label: "Agentic AI Lessons", color: "from-accent to-primary" },
                { value: "100%", label: "Hands-On & Practical", color: "from-primary via-secondary to-accent" },
              ].map((stat, i) => (
                <div key={i} className="group">
                  <div className={cn("text-5xl md:text-6xl font-extrabold bg-gradient-to-r bg-clip-text text-transparent mb-3", stat.color)}>
                    {stat.value}
                  </div>
                  <div className="text-sm md:text-base font-medium text-foreground/70 group-hover:text-foreground transition-colors">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
