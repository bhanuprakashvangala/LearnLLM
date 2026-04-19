"use client";

import * as React from "react";
import { motion } from "motion/react";
import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function AnimatedHero() {
  const [titleNumber, setTitleNumber] = React.useState(0);
  const titles = React.useMemo(
    () => ["LLMs", "agents", "MCP", "workflows", "RAG"],
    []
  );

  React.useEffect(() => {
    const id = setTimeout(() => {
      setTitleNumber(titleNumber === titles.length - 1 ? 0 : titleNumber + 1);
    }, 2000);
    return () => clearTimeout(id);
  }, [titleNumber, titles]);

  return (
    <div className="w-full">
      <div className="container mx-auto">
        <div className="flex gap-8 py-20 lg:py-32 items-center justify-center flex-col">
          <div className="flex gap-4 flex-col">
            <h1 className="text-5xl md:text-7xl max-w-3xl tracking-tight text-center font-extrabold">
              <span className="text-foreground">Learn to build with</span>
              <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute text-primary"
                    initial={{ opacity: 0, y: -100 }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? { y: 0, opacity: 1 }
                        : { y: titleNumber > index ? -150 : 150, opacity: 0 }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>

            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
              A full curriculum for engineers, from NLP foundations through modern
              LLMs, agents, MCP connectors, workflows, and fine-tuning.
            </p>
          </div>
          <div className="flex flex-row gap-3">
            <Button size="lg" variant="outline" asChild className="gap-4">
              <Link href="#curriculum">Browse curriculum</Link>
            </Button>
            <Button size="lg" asChild className="gap-4">
              <Link href="/signup">
                Get started <MoveRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
