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

const features = [
  {
    icon: BookOpen,
    title: "Stop feeling lost",
    description:
      "Walk in with zero ML background, leave able to explain how a transformer works. NLP, neural nets, embeddings — in plain language, before a single line of code.",
  },
  {
    icon: Target,
    title: "Get real results from prompts",
    description:
      "Chain-of-thought, few-shot, structured output, reasoning-model prompts. Stop guessing — use the patterns that get Claude 4.7, GPT-5, and Gemini 2.5 to actually deliver.",
  },
  {
    icon: Brain,
    title: "Build agents, not chat loops",
    description:
      "Ship autonomous systems with Google ADK, OpenAI Agents SDK, CrewAI, AutoGen, and Claude Agents. From first tool call to multi-agent orchestration.",
  },
  {
    icon: GitBranch,
    title: "Wire AI to your real systems",
    description:
      "MCP connectors are replacing every one-off AI integration. Install them, build them, chain them across GitHub, Slack, databases, and internal tools.",
  },
  {
    icon: Code2,
    title: "Workflows that survive production",
    description:
      "Stateful pipelines in LangGraph and LlamaIndex — with checkpoints, retries, and human-in-the-loop gates. The plumbing that turns a demo into a product.",
  },
  {
    icon: Database,
    title: "RAG that holds up at scale",
    description:
      "Production retrieval with Pinecone, ChromaDB, Weaviate, Qdrant. Chunking, hybrid search, re-ranking, long-context — the full stack, not a toy demo.",
  },
  {
    icon: SlidersHorizontal,
    title: "Fine-tune and deploy for real",
    description:
      "LoRA, QLoRA, RLHF, DPO end-to-end. Then ship with vLLM, SGLang, quantization, and an eval stack that catches regressions before your users do.",
  },
  {
    icon: Terminal,
    title: "Master the tools senior engineers use",
    description:
      "Cursor, Claude Code, Windsurf, Bolt.new, v0, Vercel AI SDK. The daily stack of engineers actually shipping AI — not last year's tutorials.",
  },
  {
    icon: Blocks,
    title: "Leave with portfolio projects",
    description:
      "Multi-agent research systems. Production RAG. Full-stack AI apps. MCP-powered triage bots. Every module ends with something real you can show hiring managers.",
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
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="section-label">What's inside</span>
            <span className="h-px flex-1 bg-border max-w-[200px]" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight max-w-4xl leading-tight">
            Everything your engineers need to{" "}
            <span className="text-primary">ship AI in production.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mt-5 leading-relaxed">
            Foundations to production. Updated constantly as new frameworks, models,
            and standards ship — because they ship weekly.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-7xl mx-auto"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={item}>
              <Card className="h-full group hover:border-primary/40 transition-all duration-300 border bg-card relative overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between mb-4">
                    <div className="inline-flex p-2.5 rounded-lg bg-primary/8 border border-primary/15">
                      <feature.icon className="w-4 h-4 text-primary" strokeWidth={1.75} />
                    </div>
                    <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <CardTitle className="text-xl font-bold mb-1 leading-tight">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-[14px] leading-relaxed text-foreground/65">
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
          className="mt-20 md:mt-24 max-w-6xl mx-auto"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 py-10 md:py-14 border-y border-border">
            {[
              { value: "110+", label: "lessons" },
              { value: "25+", label: "agentic lessons" },
              { value: "10", label: "mcp + workflow lessons" },
              { value: "0", label: "prior knowledge needed" },
            ].map((stat, i) => (
              <div key={i} className="text-center md:text-left md:pl-6 md:border-l md:border-border">
                <div className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-2">
                  {stat.value}
                </div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
