"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Blocks,
  Bot,
  Brain,
  Code2,
  Cpu,
  Database,
  Globe,
  Layers,
  Sparkles,
  Terminal,
  Wrench,
  Zap,
} from "lucide-react";

const toolCategories = [
  {
    title: "LLM Providers",
    icon: Brain,
    tools: [
      { name: "OpenAI GPT-4o", type: "Closed Source" },
      { name: "Anthropic Claude", type: "Closed Source" },
      { name: "Google Gemini", type: "Closed Source" },
      { name: "Meta Llama 3", type: "Open Source" },
      { name: "Mistral", type: "Open Source" },
      { name: "Groq", type: "Inference" },
    ],
  },
  {
    title: "Agent Frameworks",
    icon: Bot,
    tools: [
      { name: "Google ADK", type: "Google" },
      { name: "OpenAI Agents SDK", type: "OpenAI" },
      { name: "CrewAI", type: "Open Source" },
      { name: "AutoGen", type: "Microsoft" },
      { name: "LangGraph", type: "LangChain" },
      { name: "Smolagents", type: "HuggingFace" },
    ],
  },
  {
    title: "Development Tools",
    icon: Code2,
    tools: [
      { name: "LangChain", type: "Framework" },
      { name: "LlamaIndex", type: "Data Framework" },
      { name: "Vercel AI SDK", type: "Web SDK" },
      { name: "MCP Protocol", type: "Anthropic" },
      { name: "Hugging Face", type: "ML Platform" },
      { name: "Weights & Biases", type: "MLOps" },
    ],
  },
  {
    title: "Vector Databases",
    icon: Database,
    tools: [
      { name: "Pinecone", type: "Managed" },
      { name: "ChromaDB", type: "Open Source" },
      { name: "Weaviate", type: "Open Source" },
      { name: "Qdrant", type: "Open Source" },
      { name: "Supabase pgvector", type: "PostgreSQL" },
      { name: "FAISS", type: "Meta" },
    ],
  },
  {
    title: "AI Code Editors",
    icon: Terminal,
    tools: [
      { name: "Cursor", type: "AI-First IDE" },
      { name: "Claude Code", type: "Terminal AI" },
      { name: "GitHub Copilot", type: "Autocomplete" },
      { name: "Windsurf", type: "AI Editor" },
      { name: "Bolt.new", type: "No-Code" },
      { name: "v0 by Vercel", type: "UI Gen" },
    ],
  },
  {
    title: "Deployment & Infra",
    icon: Globe,
    tools: [
      { name: "Vercel", type: "Frontend" },
      { name: "Replicate", type: "Model Hosting" },
      { name: "Modal", type: "Serverless GPU" },
      { name: "vLLM", type: "Inference" },
      { name: "Docker", type: "Container" },
      { name: "FastAPI", type: "API Server" },
    ],
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

export function ToolsEcosystem() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-muted/30">
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
            <span className="section-label">04 / Stack</span>
            <span className="h-px flex-1 bg-border max-w-[200px]" />
          </div>
          <h2 className="display-serif text-5xl sm:text-6xl lg:text-[4.5rem] max-w-4xl leading-[0.95]">
            The complete{" "}
            <span className="display-serif-italic text-primary">2026 AI stack.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mt-6 leading-relaxed">
            Every provider, framework, database, and tool you need — organized by
            where they fit in a real system.
          </p>
        </motion.div>

        {/* Tools Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
        >
          {toolCategories.map((category, index) => (
            <motion.div
              key={index}
              variants={item}
              className="bg-card rounded-xl border-2 border-border p-6 hover:border-primary/30 transition-all"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2.5 rounded-lg bg-primary/10 border border-primary/20">
                  <category.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold text-lg">{category.title}</h3>
              </div>

              {/* Tools List */}
              <div className="grid grid-cols-2 gap-2">
                {category.tools.map((tool, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    <div className="min-w-0">
                      <div className="text-sm font-medium truncate">{tool.name}</div>
                      <div className="text-[10px] text-muted-foreground">{tool.type}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-8 px-8 py-4 rounded-2xl bg-card border-2 border-border">
            <div>
              <div className="text-3xl font-extrabold text-primary">36+</div>
              <div className="text-xs text-muted-foreground font-medium">Tools Covered</div>
            </div>
            <div className="w-px h-10 bg-border" />
            <div>
              <div className="text-3xl font-extrabold text-primary">6</div>
              <div className="text-xs text-muted-foreground font-medium">Categories</div>
            </div>
            <div className="w-px h-10 bg-border" />
            <div>
              <div className="text-3xl font-extrabold text-primary">20+</div>
              <div className="text-xs text-muted-foreground font-medium">Projects</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
