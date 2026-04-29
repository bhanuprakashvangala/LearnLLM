"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Bot, Zap, Brain, Wrench, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";
import { RobotMascot } from "@/components/ui/robot-mascot";
import { NumberTicker } from "@/components/ui/number-ticker";
import { Particles } from "@/components/ui/particles";
import { useEffect, useState, useCallback } from "react";

/* ────────────────────────────────────────────
   Animated Terminal - shows an AI agent working
   ──────────────────────────────────────────── */

const agentScenarios = [
  {
    title: "research-agent",
    lines: [
      { type: "input", text: '> "Research the top AI agent frameworks in 2025"', delay: 0 },
      { type: "think", text: "Thinking: I'll break this into steps...", delay: 800 },
      { type: "step", text: "  1. Search for recent AI agent frameworks", delay: 400 },
      { type: "step", text: "  2. Compare features and adoption", delay: 300 },
      { type: "step", text: "  3. Write a structured report", delay: 300 },
      { type: "tool", text: "Tool: web_search(\"AI agent frameworks 2025\")", delay: 600 },
      { type: "result", text: "Found: Google ADK, OpenAI Agents SDK, CrewAI, AutoGen", delay: 500 },
      { type: "tool", text: "Tool: analyze(frameworks, criteria=[adoption, features])", delay: 500 },
      { type: "result", text: "Analysis complete. 6 frameworks compared across 8 dimensions.", delay: 600 },
      { type: "success", text: "Report generated: \"Top AI Agent Frameworks - 2025 Guide\"", delay: 500 },
    ],
  },
  {
    title: "code-agent",
    lines: [
      { type: "input", text: '> "Add dark mode toggle to the navbar"', delay: 0 },
      { type: "think", text: "Thinking: I need to check the existing codebase...", delay: 800 },
      { type: "tool", text: "Tool: read_file(\"components/Navbar.tsx\")", delay: 500 },
      { type: "result", text: "Read 94 lines. Found: Tailwind CSS, React, no theme context.", delay: 500 },
      { type: "tool", text: "Tool: read_file(\"app/layout.tsx\")", delay: 400 },
      { type: "step", text: "  Plan: Add ThemeProvider + toggle button + CSS variables", delay: 400 },
      { type: "tool", text: "Tool: edit_file(\"components/Navbar.tsx\", add_toggle)", delay: 500 },
      { type: "tool", text: "Tool: create_file(\"contexts/ThemeContext.tsx\")", delay: 400 },
      { type: "tool", text: "Tool: run_command(\"npm run build\")", delay: 500 },
      { type: "success", text: "Build successful. Dark mode toggle added to 3 files.", delay: 500 },
    ],
  },
  {
    title: "data-agent",
    lines: [
      { type: "input", text: '> "Analyze Q4 sales data and find trends"', delay: 0 },
      { type: "think", text: "Thinking: I'll query the data and look for patterns...", delay: 800 },
      { type: "tool", text: "Tool: query_db(\"SELECT * FROM sales WHERE quarter='Q4'\")", delay: 500 },
      { type: "result", text: "Retrieved 12,847 records across 3 product categories.", delay: 500 },
      { type: "tool", text: "Tool: analyze_trends(data, period=\"monthly\")", delay: 500 },
      { type: "step", text: "  Finding: Revenue up 23% vs Q3, driven by enterprise tier", delay: 400 },
      { type: "step", text: "  Finding: Churn decreased 8% after onboarding flow change", delay: 400 },
      { type: "tool", text: "Tool: generate_chart(trends, type=\"line\")", delay: 500 },
      { type: "result", text: "Chart exported. 3 key insights with supporting data.", delay: 500 },
      { type: "success", text: "Report ready: \"Q4 Sales Analysis - Key Trends & Insights\"", delay: 500 },
    ],
  },
];

function AnimatedTerminal() {
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [visibleLines, setVisibleLines] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  const scenario = agentScenarios[scenarioIdx];

  const runScenario = useCallback(() => {
    setVisibleLines(0);
    setIsTyping(true);

    let lineIndex = 0;
    let totalDelay = 400;

    const showNextLine = () => {
      if (lineIndex < scenario.lines.length) {
        totalDelay += scenario.lines[lineIndex].delay;
        const currentLine = lineIndex + 1;
        setTimeout(() => {
          setVisibleLines(currentLine);
        }, totalDelay);
        lineIndex++;
        showNextLine();
      } else {
        setTimeout(() => {
          setIsTyping(false);
          setTimeout(() => {
            setScenarioIdx((prev) => (prev + 1) % agentScenarios.length);
          }, 2500);
        }, totalDelay + 800);
      }
    };

    showNextLine();
  }, [scenario]);

  useEffect(() => {
    runScenario();
  }, [runScenario]);

  const getLineStyle = (type: string) => {
    switch (type) {
      case "input":
        return "text-white font-semibold";
      case "think":
        return "text-amber-400";
      case "step":
        return "text-slate-400";
      case "tool":
        return "text-cyan-400";
      case "result":
        return "text-emerald-400";
      case "success":
        return "text-green-400 font-semibold";
      default:
        return "text-slate-300";
    }
  };

  const getLineIcon = (type: string) => {
    switch (type) {
      case "think":
        return <Brain className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />;
      case "tool":
        return <Wrench className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />;
      case "result":
        return <Zap className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />;
      case "success":
        return <CheckCircle2 className="w-3.5 h-3.5 text-green-400 flex-shrink-0 mt-0.5" />;
      default:
        return null;
    }
  };

  return (
    <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl shadow-emerald-500/10">
      {/* Terminal chrome */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#1a1a2e] border-b border-white/5">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <div className="flex-1 text-center">
          <span className="text-xs text-slate-500 font-mono">
            {scenario.title}.agent
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Bot className="w-3.5 h-3.5 text-emerald-500" />
          <span className="text-xs text-emerald-500 font-mono">
            {isTyping ? "running..." : "done"}
          </span>
        </div>
      </div>

      {/* Terminal body */}
      <div className="bg-[#0d1117] p-5 font-mono text-sm leading-relaxed min-h-[320px] max-h-[320px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={scenarioIdx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {scenario.lines.slice(0, visibleLines).map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className={`flex items-start gap-2 mb-1.5 ${getLineStyle(line.type)}`}
              >
                {getLineIcon(line.type)}
                <span>{line.text}</span>
              </motion.div>
            ))}
            {isTyping && visibleLines < scenario.lines.length && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.7 }}
                className="inline-block w-2 h-4 bg-emerald-400 ml-1"
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Glow effect */}
      <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-b from-emerald-500/20 via-transparent to-cyan-500/10 -z-10 blur-sm" />
    </div>
  );
}

/* ────────────────────────────────────────────
   Hero Section
   ──────────────────────────────────────────── */

export function HeroSection() {
  return (
    <section className="snap-section relative flex flex-col justify-center overflow-hidden bg-[#fafbfc] dark:bg-[#050505] py-20 md:py-24 lg:py-28 min-h-[calc(100dvh-65px)]">
      {/* Atmospheric background */}
      <div className="absolute inset-0 -z-10">
        {/* Grid with vignette mask */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        {/* Drifting particles */}
        <Particles quantity={70} />
        {/* Gradient orbs */}
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-emerald-500/[0.08] dark:bg-emerald-500/[0.05] rounded-full blur-[110px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/[0.06] dark:bg-cyan-500/[0.04] rounded-full blur-[90px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-14 items-center">
          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-[3.75rem] font-extrabold mb-6 leading-[1.08] tracking-tight">
              Learn how AI actually works.{" "}
              <span className="hero-gradient-text">Then build it.</span>
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground mb-9 max-w-xl leading-relaxed">
              A free, complete course on AI engineering. Start with what a
              large language model really is, end with shipping production AI
              agents. 110+ structured lessons, runnable code, an in-browser
              playground. No setup. No paywall.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 mb-12">
              <Button size="lg" asChild className="text-base px-7 h-12 shadow-lg shadow-primary/25">
                <Link href="/signup">
                  Get started — free
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="text-base px-7 h-12">
                <Link href="#curriculum">
                  Browse curriculum
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-md">
              {[
                { numeric: 110, suffix: "+", label: "lessons", delay: 0.1 },
                { numeric: 40, suffix: "+", label: "tools covered", delay: 0.2 },
                { numeric: null, value: "Free", label: "to start", delay: 0.3 },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                  className="border-l-2 border-primary/60 pl-4"
                >
                  <div className="text-2xl font-extrabold tracking-tight text-foreground">
                    {stat.numeric !== null ? (
                      <NumberTicker value={stat.numeric} suffix={stat.suffix} delay={stat.delay} />
                    ) : (
                      stat.value
                    )}
                  </div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mt-0.5">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Interactive 3D scene with Spotlight */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block"
          >
            <Card className="w-full max-h-[580px] min-h-[400px] h-[calc(100dvh-280px)] bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-emerald-500/10">
              <Spotlight
                className="-top-40 left-0 md:left-60 md:-top-20"
                fill="rgba(16,185,129,0.5)"
              />
              {/* Faint grid behind the mascot for depth */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />

              <RobotMascot className="absolute inset-0 p-6 md:p-8 flex items-center justify-center" />

              {/* Corner labels */}
              <div className="absolute top-4 left-4 z-10 text-[10px] font-mono uppercase tracking-wider text-white/50">
                learnllm
              </div>
              <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-emerald-400/80">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                online
              </div>
              <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-white/40">
                <span>ready to learn</span>
                <span>v2026.04</span>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
