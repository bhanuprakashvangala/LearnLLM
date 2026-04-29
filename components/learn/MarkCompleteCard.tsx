"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import { useSession } from "next-auth/react";
import { useProgress } from "@/contexts/ProgressContext";
import { Button } from "@/components/ui/button";

interface MarkCompleteCardProps {
  slug: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  difficultyLabel: string;
  totalLessons: number;
  currentIndex: number;
}

/**
 * "End of lesson" card that handles three states:
 *  - signed-out  → soft prompt to create a free account
 *  - signed-in, not yet complete  → primary "mark complete" button
 *  - signed-in, complete          → celebratory completed state
 *
 * Lives between the article body and the prev/next nav on every lesson
 * page. This is the missing primary action the UX audit flagged.
 */
export function MarkCompleteCard({
  slug,
  difficulty,
  difficultyLabel,
  totalLessons,
  currentIndex,
}: MarkCompleteCardProps) {
  const { data: session, status } = useSession();
  const { isLessonCompleted, markLessonComplete, completedLessons } =
    useProgress();
  const [mounted, setMounted] = React.useState(false);
  const [justCompleted, setJustCompleted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // SSR + hydration: render the signed-in completed-shape skeleton
  // so layout doesn't shift, but with neutral content.
  if (!mounted || status === "loading") {
    return (
      <div className="rounded-2xl border-2 border-border bg-card/60 p-6 md:p-7 text-center">
        <div className="h-7 w-44 mx-auto rounded bg-muted animate-pulse mb-3" />
        <div className="h-4 w-64 mx-auto rounded bg-muted animate-pulse" />
      </div>
    );
  }

  if (!session) {
    const callback = encodeURIComponent(`/learn/${difficulty}/${slug}`);
    return (
      <div className="relative overflow-hidden rounded-2xl border-2 border-emerald-500/30 bg-gradient-to-br from-emerald-500/[0.08] via-transparent to-teal-500/[0.06] p-6 md:p-8 text-center">
        <div className="absolute -top-12 -right-12 w-44 h-44 bg-emerald-500/[0.12] rounded-full blur-3xl pointer-events-none" />
        <Sparkles className="w-7 h-7 text-emerald-500 mx-auto mb-3" />
        <h3 className="text-xl font-bold mb-2 tracking-tight">
          Save your progress
        </h3>
        <p className="text-sm text-muted-foreground max-w-md mx-auto mb-5 leading-relaxed">
          Sign up free to mark this lesson complete and pick up where you
          left off across every device. No credit card.
        </p>
        <div className="flex flex-col sm:flex-row gap-2 justify-center">
          <Button asChild size="lg" className="font-semibold">
            <Link href={`/signup?callbackUrl=${callback}`}>
              Create a free account
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="ghost" className="font-medium">
            <Link href={`/login?callbackUrl=${callback}`}>I already have one</Link>
          </Button>
        </div>
      </div>
    );
  }

  const completed = isLessonCompleted(slug) || justCompleted;

  if (completed) {
    return (
      <motion.div
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-2xl border-2 border-emerald-500/50 bg-gradient-to-br from-emerald-500/15 via-emerald-500/5 to-teal-500/10 p-6 md:p-8 text-center"
      >
        <div className="absolute -top-16 -right-16 w-56 h-56 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            delay: 0.1,
            duration: 0.5,
            ease: [0.22, 1.4, 0.5, 1],
          }}
          className="relative w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-xl shadow-emerald-500/40"
        >
          <CheckCircle2 className="w-9 h-9 text-white" strokeWidth={2.4} />
        </motion.div>
        <div className="text-[10px] font-mono uppercase tracking-widest text-emerald-700 dark:text-emerald-400 mb-1">
          Lesson {String(currentIndex + 1).padStart(2, "0")} of{" "}
          {String(totalLessons).padStart(2, "0")} · complete
        </div>
        <h3 className="text-xl font-bold mb-1 tracking-tight">
          You're {Math.round(((currentIndex + 1) / totalLessons) * 100)}% through{" "}
          {difficultyLabel}
        </h3>
        <p className="text-sm text-muted-foreground">
          {completedLessons} {completedLessons === 1 ? "lesson" : "lessons"}{" "}
          marked complete across the curriculum.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border-2 border-border bg-card p-6 md:p-7 text-center">
      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">
        Lesson {String(currentIndex + 1).padStart(2, "0")} of{" "}
        {String(totalLessons).padStart(2, "0")}
      </div>
      <h3 className="text-lg md:text-xl font-bold mb-4 tracking-tight">
        Done with this lesson?
      </h3>
      <Button
        onClick={() => {
          markLessonComplete(slug, difficulty);
          setJustCompleted(true);
        }}
        size="lg"
        className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg shadow-emerald-500/25 font-semibold h-12 px-8"
      >
        <CheckCircle2 className="w-5 h-5 mr-2" strokeWidth={2.4} />
        Mark complete
      </Button>
    </div>
  );
}
