"use client";

import * as React from "react";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { HeroSection } from "@/components/marketing/HeroSection";
import { LearningPaths } from "@/components/marketing/LearningPaths";
import { AgenticShowcase } from "@/components/marketing/AgenticShowcase";
import { Features } from "@/components/marketing/Features";
import { ToolsEcosystem } from "@/components/marketing/ToolsEcosystem";
import { CurriculumRoadmap } from "@/components/marketing/CurriculumRoadmap";
import { FAQ } from "@/components/marketing/FAQ";
import { FinalCTA } from "@/components/marketing/FinalCTA";

export default function Home() {
  // CSS scroll-snap has to live on the root scroll container (<html>).
  // Adding `snap-on` to <body> while the home page is mounted flips it
  // on; removing it on unmount keeps lesson / dashboard routes free of
  // the mandatory snap behavior.
  React.useEffect(() => {
    document.body.classList.add("snap-on");
    return () => document.body.classList.remove("snap-on");
  }, []);

  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <LearningPaths />
      <AgenticShowcase />
      <Features />
      <ToolsEcosystem />
      <CurriculumRoadmap />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
