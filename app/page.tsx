import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { HeroSection } from "@/components/marketing/HeroSection";
import { MockupShowcase } from "@/components/marketing/MockupShowcase";
import { CurriculumRoadmap } from "@/components/marketing/CurriculumRoadmap";
import { FAQ } from "@/components/marketing/FAQ";
import { FinalCTA } from "@/components/marketing/FinalCTA";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <MockupShowcase />
      <CurriculumRoadmap />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
