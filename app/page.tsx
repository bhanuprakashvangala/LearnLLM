import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { HeroSection } from "@/components/marketing/HeroSection";
import { LearningPaths } from "@/components/marketing/LearningPaths";
import { Features } from "@/components/marketing/Features";
import { Pricing } from "@/components/marketing/Pricing";
import { FAQ } from "@/components/marketing/FAQ";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <LearningPaths />
      <Features />
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  );
}
