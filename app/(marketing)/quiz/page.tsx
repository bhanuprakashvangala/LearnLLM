"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";

const options = [
  {
    title: "No Coding Experience",
    description: "I'm new to coding and want to start with the basics.",
    path: "/learn/beginner/what-is-llm",
  },
  {
    title: "Some Coding Experience",
    description: "I know some programming and want to build AI applications.",
    path: "/learn/intermediate/langchain-basics",
  },
  {
    title: "I'm a Developer",
    description: "I'm comfortable with coding and want to learn advanced AI concepts.",
    path: "/learn/advanced/fine-tuning",
  },
];

export default function QuizPage() {
  const router = useRouter();
  const [selected, setSelected] = React.useState<string | null>(null);

  const handleSelect = (path: string) => {
    setSelected(path);
    setTimeout(() => {
      router.push(path);
    }, 500);
  };

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <section className="flex-grow flex items-center justify-center py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Find Your <span className="gradient-text">Perfect Path</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Answer one question to get a personalized learning recommendation.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">What is your current coding experience?</CardTitle>
                <CardDescription>This will help us tailor the content for you.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  {options.map((option) => (
                    <Button
                      key={option.title}
                      variant={selected === option.path ? "default" : "outline"}
                      size="lg"
                      onClick={() => handleSelect(option.path)}
                      className="text-left justify-start h-auto py-4"
                    >
                      <div className="flex flex-col">
                        <span className="font-semibold">{option.title}</span>
                        <span className="text-sm text-muted-foreground">{option.description}</span>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
