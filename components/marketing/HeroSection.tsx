"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Code2, Cpu, Layers, MessageSquare, Workflow } from "lucide-react";
import { Button } from "@/components/ui/button";

const techStack = [
  { icon: MessageSquare, label: "Prompt Engineering" },
  { icon: Layers, label: "LangChain" },
  { icon: Cpu, label: "RAG Systems" },
  { icon: Workflow, label: "AI Agents" },
  { icon: Code2, label: "Fine-tuning" },
  { icon: BookOpen, label: "Vector DBs" },
];

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-background">
      {/* Simple clean background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/5 blur-3xl rounded-full" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-secondary/5 blur-3xl rounded-full" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Learn to Build with{" "}
              <span className="text-primary">Large Language Models</span>
            </h1>

            <p className="text-lg text-muted-foreground mb-8 max-w-lg">
              From complete beginner to production-ready. Master LLMs, build AI applications,
              and join the future of software development.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Button size="lg" asChild className="text-base px-8">
                <Link href="/learn">
                  Start Learning Free
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="text-base px-8">
                <Link href="/challenges">
                  Try Challenges
                </Link>
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="flex gap-8 text-sm">
              <div>
                <div className="text-2xl font-bold text-foreground">83+</div>
                <div className="text-muted-foreground">Lessons</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">30+</div>
                <div className="text-muted-foreground">Challenges</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">Free</div>
                <div className="text-muted-foreground">To Start</div>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Tech Stack Cards */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="grid grid-cols-2 gap-4">
              {techStack.map((tech, index) => (
                <motion.div
                  key={tech.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="group p-6 rounded-xl border-2 border-border bg-card hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer"
                >
                  <tech.icon className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
                  <div className="font-semibold text-foreground">{tech.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
