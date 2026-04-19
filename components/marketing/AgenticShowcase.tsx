"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Bot,
  Globe,
  Layers,
  Workflow,
  GitBranch,
  MessageSquare,
  ArrowRight,
  Zap,
  Brain,
  Wrench,
  Search,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AnimatedBeam } from "@/components/ui/animated-beam";

const frameworks = [
  {
    name: "Google ADK",
    description: "Google's official Agent Development Kit. Build agents with Gemini, tools, sessions, and multi-agent orchestration.",
    icon: Globe,
    color: "from-blue-500 to-cyan-500",
    tag: "Google",
    link: "/learn/intermediate/google-adk",
  },
  {
    name: "OpenAI Agents SDK",
    description: "Build, orchestrate, and deploy smart agents with handoffs, guardrails, and built-in tracing.",
    icon: Bot,
    color: "from-emerald-500 to-green-600",
    tag: "OpenAI",
    link: "/learn/intermediate/openai-agents-sdk",
  },
  {
    name: "CrewAI",
    description: "Create teams of AI agents with roles, goals, and backstories that collaborate on complex tasks.",
    icon: Workflow,
    color: "from-violet-500 to-purple-600",
    tag: "Open Source",
    link: "/learn/intermediate/crewai-framework",
  },
  {
    name: "MCP Protocol",
    description: "Anthropic's open protocol connecting AI to tools and data. The USB-C of AI integrations.",
    icon: GitBranch,
    color: "from-orange-500 to-red-500",
    tag: "Anthropic",
    link: "/learn/intermediate/model-context-protocol",
  },
  {
    name: "LangChain + LangGraph",
    description: "The most popular AI framework plus stateful, graph-based agent orchestration for complex workflows.",
    icon: Layers,
    color: "from-teal-500 to-emerald-500",
    tag: "Framework",
    link: "/learn/intermediate/langchain-basics",
  },
  {
    name: "AutoGen",
    description: "Microsoft's multi-agent conversational framework. Build group chats between specialized AI agents.",
    icon: MessageSquare,
    color: "from-indigo-500 to-blue-600",
    tag: "Microsoft",
    link: "/learn/advanced/autogen-framework",
  },
];

const pillars = [
  {
    icon: Brain,
    title: "Reasoning",
    desc: "Chain-of-thought, ReAct, tree-of-thought",
    color: "text-amber-500 dark:text-amber-400",
    bg: "bg-amber-500/10",
  },
  {
    icon: Wrench,
    title: "Tool Use",
    desc: "Function calling, APIs, MCP servers",
    color: "text-cyan-500 dark:text-cyan-400",
    bg: "bg-cyan-500/10",
  },
  {
    icon: Search,
    title: "Memory",
    desc: "Context, RAG, long-term storage",
    color: "text-emerald-500 dark:text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    icon: Zap,
    title: "Orchestration",
    desc: "Multi-agent, handoffs, pipelines",
    color: "text-violet-500 dark:text-violet-400",
    bg: "bg-violet-500/10",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const flowSteps = [
  { icon: MessageSquare, label: "Request", sub: "User asks a question", color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20" },
  { icon: Brain, label: "Reason", sub: "Agent plans approach", color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20" },
  { icon: Wrench, label: "Act", sub: "Calls tools & APIs", color: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20" },
  { icon: Workflow, label: "Orchestrate", sub: "Multi-agent collab", color: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20" },
  { icon: Zap, label: "Deliver", sub: "Returns result", color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" },
];

function AgentFlow() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const stepRefs = React.useRef<(HTMLDivElement | null)[]>([]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="mb-20"
    >
      <div className="bg-card rounded-2xl border border-border p-8 md:p-12 max-w-4xl mx-auto overflow-hidden relative">
        {/* Subtle grid bg */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808006_1px,transparent_1px),linear-gradient(to_bottom,#80808006_1px,transparent_1px)] bg-[size:20px_20px]" />

        <div className="relative">
          <h3 className="text-xl font-bold mb-2 text-center">How Agentic AI Works</h3>
          <p className="text-sm text-muted-foreground text-center mb-10">
            From user request to autonomous action — this is what you'll learn to build
          </p>

          {/* Flow */}
          <div ref={containerRef} className="relative flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">
            {flowSteps.map((step, i) => (
              <motion.div
                key={i}
                ref={(el) => { stepRefs.current[i] = el; }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.4 }}
                className="flex flex-col items-center text-center z-10"
              >
                <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center mb-2 ${step.color} bg-card`}>
                  <step.icon className="w-6 h-6" />
                </div>
                <div className="font-semibold text-sm">{step.label}</div>
                <div className="text-[11px] text-muted-foreground max-w-[100px]">{step.sub}</div>
              </motion.div>
            ))}

            {/* Animated beams between each pair of steps (desktop only) */}
            {flowSteps.slice(0, -1).map((_, i) => (
              <div key={`beam-${i}`} className="hidden md:block">
                <AnimatedBeam
                  containerRef={containerRef}
                  fromRef={{ current: stepRefs.current[i] }}
                  toRef={{ current: stepRefs.current[i + 1] }}
                  duration={4}
                  delay={i * 0.6}
                  curvature={0}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function AgenticShowcase() {
  return (
    <section className="snap-section py-20 md:py-28 lg:py-32 relative overflow-hidden bg-[#fafbfc] dark:bg-[#050505]">
      {/* Background accents */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[20%] right-0 w-[400px] h-[400px] bg-emerald-500/[0.04] rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] left-0 w-[350px] h-[350px] bg-cyan-500/[0.03] rounded-full blur-[80px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="section-label">Agents</span>
            <span className="h-px flex-1 bg-border max-w-[200px]" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight max-w-4xl leading-tight">
            The major agent frameworks.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mt-5 leading-relaxed">
            Agents plan, call tools, and take actions on behalf of the user.
            The curriculum covers Google ADK, OpenAI Agents SDK, CrewAI,
            AutoGen, and Claude Agents, with runnable examples for each.
          </p>
        </motion.div>

        {/* Four Pillars */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20 max-w-4xl mx-auto"
        >
          {pillars.map((p, i) => (
            <motion.div
              key={i}
              variants={item}
              className="relative text-center p-5 rounded-2xl border border-border bg-card hover:border-primary/30 transition-all group"
            >
              <div className={`inline-flex p-3 rounded-xl ${p.bg} mb-3`}>
                <p.icon className={`w-5 h-5 ${p.color}`} />
              </div>
              <h3 className="font-bold text-sm mb-1">{p.title}</h3>
              <p className="text-xs text-muted-foreground leading-snug">{p.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Agent Flow Visualization with animated beams */}
        <AgentFlow />

        {/* Frameworks Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6"
        >
          <h3 className="text-2xl font-bold text-center mb-10">
            Frameworks You'll Master
          </h3>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto"
        >
          {frameworks.map((fw, index) => (
            <motion.div key={index} variants={item}>
              <Link href={fw.link} className="block h-full">
                <div className="group relative h-full p-6 rounded-2xl border border-border bg-card hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                  {/* Tag */}
                  <div className="absolute top-5 right-5">
                    <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-muted text-muted-foreground uppercase tracking-wider">
                      {fw.tag}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${fw.color} mb-4 shadow-lg shadow-black/5`}>
                    <fw.icon className="w-5 h-5 text-white" />
                  </div>

                  <h4 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                    {fw.name}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {fw.description}
                  </p>

                  <div className="mt-4 flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center mt-14"
        >
          <Button size="lg" asChild className="text-base px-8 h-12 shadow-lg shadow-primary/25">
            <Link href="/learn">
              Start Building Agents
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
