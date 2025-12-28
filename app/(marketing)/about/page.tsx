"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Target, Users, Sparkles, BookOpen, Code, Trophy,
  Heart, Zap, Globe, ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

const values = [
  {
    icon: BookOpen,
    title: "Learn by Doing",
    description: "We believe the best way to learn is through hands-on practice. Every lesson includes interactive examples and real-world projects."
  },
  {
    icon: Users,
    title: "Community First",
    description: "Learning is better together. Our community of learners and mentors helps everyone grow and succeed."
  },
  {
    icon: Target,
    title: "Practical Focus",
    description: "No fluff, just practical skills you can use immediately. Our curriculum is designed by industry practitioners."
  },
  {
    icon: Zap,
    title: "Always Current",
    description: "AI moves fast, and so do we. Our content is continuously updated to reflect the latest developments."
  }
];

const stats = [
  { value: "10,000+", label: "Active Learners" },
  { value: "83+", label: "Comprehensive Lessons" },
  { value: "30+", label: "Hands-on Challenges" },
  { value: "95%", label: "Completion Rate" }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 via-purple-500/5 to-background border-b border-border">
        <div className="container mx-auto px-4 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 rounded-full text-sm font-medium text-primary mb-6">
              <Heart className="w-4 h-4" />
              Our Story
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Empowering the Next Generation of{" "}
              <span className="gradient-text">AI Builders</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              LearnLLM.dev was founded with a simple mission: make learning about Large Language Models
              accessible, practical, and enjoyable for everyone.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mission Section */}
      <div className="bg-muted/30 py-16 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-muted-foreground mb-4">
                  We started LearnLLM.dev because we saw a gap in AI education. While there's no
                  shortage of resources about machine learning, practical guides on working with
                  Large Language Models were scattered and often outdated.
                </p>
                <p className="text-muted-foreground mb-4">
                  Our goal is to provide a structured, comprehensive learning path that takes you
                  from complete beginner to building production-ready AI applications. We focus on
                  practical skills that you can apply immediately.
                </p>
                <p className="text-muted-foreground">
                  Whether you're a developer looking to add AI to your toolkit, a data scientist
                  exploring LLMs, or someone completely new to programming, we have a path for you.
                </p>
              </div>
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-2xl flex items-center justify-center">
                  <Globe className="w-32 h-32 text-primary/50" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do at LearnLLM.dev
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 h-full hover:border-primary/50 transition-colors">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                        <p className="text-muted-foreground text-sm">{value.description}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <Sparkles className="w-12 h-12 mx-auto mb-6 text-primary" />
          <h2 className="text-4xl font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of learners who are already building amazing things with AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-base font-semibold group" asChild>
              <Link href="/learn">
                <BookOpen className="w-5 h-5 mr-2" />
                Start Learning
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-base font-semibold" asChild>
              <Link href="/contact">
                Get in Touch
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
