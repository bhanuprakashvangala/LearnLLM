"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Zap, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";
import toast from "react-hot-toast";

export function HeroSection() {
  const [email, setEmail] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const supabase = createClient();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Assumes a 'leads' table with an 'email' column.
    // You might need to create this table in your Supabase project.
    const { error } = await supabase.from("leads").insert({ email });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Thanks for joining the waitlist!");
      setEmail("");
    }

    setIsSubmitting(false);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 bg-background">
      {/* Clean Background Pattern */}
      <div className="absolute inset-0 -z-10">
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:48px_48px]" />

        {/* Minimal accent - single professional touch */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-6"
          >
            <div className="glass rounded-full px-6 py-2 inline-flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium">
                Essential AI Skills for Everyone - No Coding Required to Start
              </span>
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            Learn{" "}
            <span className="gradient-text">AI & LLMs</span>
            <br />
            The Skills Everyone Needs in 2025
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto"
          >
            In the vibe coding era, everyone needs to understand AI. Whether you're a student, designer, marketer, or developer -
            learn ChatGPT, prompt engineering, RAG, LangChain and more. Start with no code, level up at your pace.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-8 mb-10"
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
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Button variant="default" size="xl" asChild className="group">
              <Link href="/signup">
                Start Free Course
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="outline" size="xl" asChild>
              <Link href="/playground">
                Try AI Playground
                <Sparkles className="w-5 h-5" />
              </Link>
            </Button>
          </motion.div>

          {/* Email Capture */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="max-w-md mx-auto"
          >
            <form onSubmit={handleEmailSubmit} className="flex gap-2">
              <Input
                type="email"
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1"
              />
              <Button
                type="submit"
                variant="default"
                disabled={isSubmitting}
              >
                {isSubmitting ? "..." : "Get Started"}
              </Button>
            </form>
            <p className="text-xs text-muted-foreground mt-3">
              Join 15,000+ developers. Free tier forever. No credit card required.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
