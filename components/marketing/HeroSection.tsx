"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Zap, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative h-[calc(100vh-64px)] flex items-center justify-center overflow-hidden bg-background">
      {/* Clean Background Pattern */}
      <div className="absolute inset-0 -z-10">
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:48px_48px]" />

        {/* Minimal accent - single professional touch */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-6"
          >
            <div className="glass rounded-full px-6 py-2 inline-flex items-center gap-2">
              <span className="text-sm font-medium">
                Trusted by 10,000+ Professionals Worldwide
              </span>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
          >
            Learn{" "}
            <span className="gradient-text">AI & LLMs</span>
            <br />
            The Skills Everyone Needs to Build Anything with AI
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-muted-foreground mb-6 max-w-3xl mx-auto"
          >
            Whether you're a student, designer, marketer, or developer - learn ChatGPT, prompt engineering, RAG, and more. Start with no code, level up at your pace.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-6 mb-6"
          >
            {[
              { icon: Brain, label: "No Code to Pro", color: "text-primary" },
              { icon: Zap, label: "For Everyone", color: "text-accent" },
              { icon: Sparkles, label: "Practical Skills", color: "text-secondary" },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-2">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                <span className="text-sm font-medium">{stat.label}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6"
          >
            <Button variant="default" size="xl" asChild className="group">
              <Link href="/signup">
                Start Learning Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="outline" size="xl" asChild>
              <Link href="/learn">
                Explore Courses
              </Link>
            </Button>
          </motion.div>

          {/* Social Proof */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-sm text-muted-foreground"
          >
            Free forever. No credit card required. Join thousands already learning.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
