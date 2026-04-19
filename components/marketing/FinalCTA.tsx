"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const reasons = [
  "Your first lesson takes 10 minutes",
  "No credit card, no trial, no paywall",
  "Updated every week as the stack moves",
];

export function FinalCTA() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-[#fafbfc] dark:bg-[#050505] border-t border-border">
      {/* Atmospheric */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-emerald-500/[0.06] dark:bg-emerald-500/[0.04] rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[11px] font-mono uppercase tracking-wider text-primary font-semibold">
              Free. Forever. No asterisk.
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight leading-[1.05] mb-6">
            The AI stack isn't slowing down.
            <br />
            <span className="hero-gradient-text">Your team shouldn't either.</span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
            Every week, a new framework ships and the one you're using gets a
            breaking change. This is the only resource that keeps up —
            and it's free for everyone, forever.
          </p>

          {/* Reassurance ticks */}
          <ul className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 mb-10 text-sm">
            {reasons.map((r, i) => (
              <li key={i} className="flex items-center justify-center gap-2 text-foreground/75">
                <Check className="w-4 h-4 text-primary flex-shrink-0" strokeWidth={2.5} />
                <span>{r}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" asChild className="text-base px-8 h-12 shadow-xl shadow-primary/30">
              <Link href="/signup">
                Start your first lesson
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="text-base px-8 h-12">
              <Link href="/learn">
                Browse the full curriculum
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
