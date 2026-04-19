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
