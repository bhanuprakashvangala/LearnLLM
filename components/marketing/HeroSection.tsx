"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Zap, Brain, Play, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 -z-10">
        {/* Animated gradient orbs */}
        <div className="absolute top-0 -left-40 w-80 h-80 bg-primary/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float" />
        <div className="absolute top-0 -right-40 w-80 h-80 bg-secondary/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-80 h-80 bg-accent/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float" style={{ animationDelay: "4s" }} />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />

        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-radial-gradient" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-5xl mx-auto text-center">
          {/* Animated Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-8"
          >
            <div className="glass rounded-full px-6 py-2.5 inline-flex items-center gap-3 border border-primary/20 shadow-lg">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-sm font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Trusted by 10,000+ Professionals Worldwide
              </span>
            </div>
          </motion.div>

          {/* Main Heading with animated gradient */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight tracking-tight"
          >
            Learn{" "}
            <span className="gradient-text-animated">AI & LLMs</span>
            <br />
            <span className="text-foreground/80">Build Anything with AI</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Whether you're a student, designer, marketer, or developer - master LLMs, LangChain, RAG, AI Agents, and more.
            <span className="text-foreground font-medium"> Start with no code, level up at your pace.</span>
          </motion.p>

          {/* Feature Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-10"
          >
            {[
              { icon: Brain, label: "No Code to Pro", color: "bg-primary/10 text-primary border-primary/20" },
              { icon: Zap, label: "For Everyone", color: "bg-accent/10 text-accent border-accent/20" },
              { icon: Sparkles, label: "Practical Skills", color: "bg-secondary/10 text-secondary border-secondary/20" },
            ].map((stat, i) => (
              <div key={i} className={`flex items-center gap-2 px-4 py-2 rounded-full border ${stat.color} backdrop-blur-sm`}>
                <stat.icon className="w-4 h-4" />
                <span className="text-sm font-semibold">{stat.label}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
          >
            <Button variant="default" size="xl" asChild className="group glow shadow-xl text-lg px-8 py-6">
              <Link href="/signup">
                Start Learning Free
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="outline" size="xl" asChild className="text-lg px-8 py-6 border-2">
              <Link href="/learn">
                <Play className="w-5 h-5 mr-2" />
                Explore Courses
              </Link>
            </Button>
          </motion.div>

          {/* Social Proof Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              <span><strong className="text-foreground">10,000+</strong> learners</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-warning fill-warning" />
              <span><strong className="text-foreground">4.9/5</strong> rating</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-secondary" />
              <span><strong className="text-foreground">Free</strong> to start</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
