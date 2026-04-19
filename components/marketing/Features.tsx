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
    title: "Foundations",
    description:
      "NLP, machine learning, neural networks, and embeddings explained in plain language. Start here if you are new to the field.",
  },
  {
    icon: Target,
    title: "Prompt engineering",
    description:
      "Chain-of-thought, few-shot, structured output, and reasoning-model prompting, with examples for Claude, GPT, and Gemini.",
  },
  {
    icon: Brain,
    title: "Agent frameworks",
    description:
      "Google ADK, OpenAI Agents SDK, CrewAI, AutoGen, and Claude Agents. Covers single-agent to multi-agent orchestration.",
  },
  {
    icon: GitBranch,
    title: "MCP connectors",
    description:
      "Install and build MCP connectors so an LLM can read and write to GitHub, Slack, databases, and your own internal tools.",
  },
  {
    icon: Code2,
    title: "Workflows",
    description:
      "LangGraph and LlamaIndex for stateful pipelines. Checkpointing, retries, and human-in-the-loop approval.",
  },
  {
    icon: Database,
    title: "RAG and vector search",
    description:
      "Pinecone, ChromaDB, Weaviate, Qdrant. Chunking strategies, hybrid search, and re-ranking for production retrieval.",
  },
  {
    icon: SlidersHorizontal,
    title: "Fine-tuning",
    description:
      "LoRA, QLoRA, RLHF, and DPO. Then deployment with vLLM and SGLang, plus the evaluation and monitoring setup that goes with it.",
  },
  {
    icon: Terminal,
    title: "AI developer tools",
    description:
      "Cursor, Claude Code, Windsurf, Bolt.new, v0, and the Vercel AI SDK — the current daily stack for AI engineers.",
  },
  {
    icon: Blocks,
    title: "Hands-on projects",
    description:
      "Each module ends with a project: a multi-agent research system, a production RAG pipeline, an MCP-powered triage bot, and more.",
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
    <section id="features" className="snap-section py-20 md:py-28 lg:py-32 relative overflow-hidden bg-muted/30">

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
            What the curriculum covers.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mt-5 leading-relaxed">
            Foundations through production deployment. Lessons are reviewed
            and updated as tooling changes.
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
