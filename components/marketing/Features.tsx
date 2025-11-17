"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Gamepad2,
  MessagesSquare,
  BookOpen,
  Trophy,
  Zap,
  Brain,
  Target,
  Sparkles,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: BookOpen,
    title: "Start with No Code",
    description: "Begin your AI journey with zero coding. Learn ChatGPT, prompt engineering, and AI tools through visual interfaces. Perfect for everyone!",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: Target,
    title: "Prompt Engineering",
    description: "Get 10x better results from ChatGPT and Claude. Learn Chain of Thought, Few-Shot prompting, and techniques used by pros.",
    gradient: "from-orange-500 to-red-500",
  },
  {
    icon: Brain,
    title: "Understand How LLMs Work",
    description: "Demystify AI in plain English. Understand tokens, context windows, embeddings, and RAG - no PhD required!",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Code2,
    title: "Build with LangChain",
    description: "Start building AI apps visually, then level up to code. Learn the most popular framework for LLM applications step-by-step.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Sparkles,
    title: "Create AI Agents",
    description: "Build smart assistants that can search, analyze, and take actions. Start simple, then create autonomous agents.",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    icon: Zap,
    title: "RAG for Your Data",
    description: "Make AI work with YOUR documents and data. Learn Retrieval Augmented Generation to build custom Q&A systems.",
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    icon: Trophy,
    title: "Fine-Tune Models",
    description: "Customize AI for your needs. Learn when and how to fine-tune models like GPT, Llama, and Mistral (advanced path).",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    icon: MessagesSquare,
    title: "Deploy & Share",
    description: "Turn your AI projects into real apps anyone can use. Learn deployment, sharing, and making money from your AI creations.",
    gradient: "from-teal-500 to-cyan-500",
  },
  {
    icon: Gamepad2,
    title: "Real Projects",
    description: "Build portfolio-worthy projects: chatbots, content generators, research assistants, and more. Show employers what you can do!",
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
    <section id="features" className="py-32 relative overflow-hidden bg-muted/20">

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-4">
            <div className="glass rounded-full px-4 py-1.5 inline-flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Everything You Need</span>
            </div>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            AI Skills <span className="gradient-text">Everyone Needs</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            In the vibe coding era, AI literacy is as essential as using Google. Start with no code, build real projects, level up at your own pace.
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
          className="mt-24"
        >
          <div className="bg-card rounded-2xl p-10 md:p-16 shadow-xl border-2 border-border">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
              {[
                { value: "50+", label: "Beginner-Friendly Tutorials", color: "from-primary to-secondary" },
                { value: "0", label: "Coding Required to Start", color: "from-secondary to-accent" },
                { value: "10K+", label: "People Learning", color: "from-accent to-primary" },
                { value: "100%", label: "Practical Skills", color: "from-primary via-secondary to-accent" },
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
