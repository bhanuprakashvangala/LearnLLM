"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Trophy, Star, Clock, ArrowLeft, CheckCircle2, Lock,
  Target, Sparkles, AlertCircle, Code
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useProgress } from "@/contexts/ProgressContext";
import { ChallengeWorkspace } from "@/components/challenges/ChallengeWorkspace";
import challengesData from "@/data/challenges.json";
import challengeStepsData from "@/data/challenge-steps.json";

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  points: number;
  timeEstimate: string;
  category: string;
  skills: string[];
  prerequisites: string[];
}

interface Concept {
  title: string;
  explanation: string;
}

interface ChallengeStepsType {
  title: string;
  description: string;
  starterCode: string;
  solution: string;
  hints: string[];
  learningObjectives?: string[];
  concepts?: Concept[];
}

const difficultyGradients = {
  beginner: "from-green-500 to-emerald-600",
  intermediate: "from-amber-500 to-orange-600",
  advanced: "from-red-500 to-pink-600",
};

export default function ChallengePage() {
  const params = useParams();
  const { data: session } = useSession();
  const { isChallengeCompleted, markChallengeComplete } = useProgress();
  const [isHydrated, setIsHydrated] = React.useState(false);

  React.useEffect(() => {
    setIsHydrated(true);
  }, []);

  const challengeId = params.id as string;
  const challenges: Challenge[] = challengesData.challenges as Challenge[];
  const challenge = challenges.find(c => c.id === challengeId);
  const stepsData = (challengeStepsData as Record<string, ChallengeStepsType>)[challengeId];

  if (!challenge) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-muted flex items-center justify-center">
            <Target className="w-10 h-10 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Challenge Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The challenge you&apos;re looking for doesn&apos;t exist.
          </p>
          <Button asChild>
            <Link href="/challenges">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Challenges
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const isCompleted = isHydrated && isChallengeCompleted(challenge.id);
  const prerequisitesMet = challenge.prerequisites.every(prereq =>
    isChallengeCompleted(prereq)
  );
  const isLocked = challenge.id !== "1" && !session;
  const hasUnmetPrerequisites = challenge.prerequisites.length > 0 && !prerequisitesMet && !isCompleted;

  const handleComplete = () => {
    markChallengeComplete(challenge.id, challenge.points);
  };

  // Show workspace for interactive challenges
  if (stepsData && !isLocked && !hasUnmetPrerequisites) {
    return (
      <div className="min-h-screen bg-[#0a0a0a]">
        {/* Minimal Header */}
        <div className={`bg-gradient-to-r ${difficultyGradients[challenge.difficulty]} py-4`}>
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white/80 hover:text-white hover:bg-white/10"
                  asChild
                >
                  <Link href="/challenges">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Link>
                </Button>
                <div className="h-6 w-px bg-white/20" />
                <div className="flex items-center gap-2">
                  <Code className="w-5 h-5 text-white" />
                  <h1 className="text-lg font-semibold text-white">{challenge.title}</h1>
                </div>
              </div>
              <div className="flex items-center gap-4 text-white/80 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4" />
                  <span>{challenge.points} pts</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{challenge.timeEstimate}</span>
                </div>
                {isCompleted && (
                  <div className="flex items-center gap-1 text-green-300">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Completed</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Workspace */}
        <div className="container mx-auto px-4 py-6">
          <ChallengeWorkspace
            challengeId={challenge.id}
            title={stepsData.title}
            description={stepsData.description}
            starterCode={stepsData.starterCode}
            solution={stepsData.solution}
            hints={stepsData.hints}
            learningObjectives={stepsData.learningObjectives}
            concepts={stepsData.concepts}
            onComplete={handleComplete}
          />
        </div>
      </div>
    );
  }

  // Fallback for locked/prerequisites needed
  return (
    <div className="min-h-screen bg-background">
      <div className={`relative overflow-hidden bg-gradient-to-br ${difficultyGradients[challenge.difficulty]} py-16`}>
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 relative">
          <Button
            variant="ghost"
            className="text-white/80 hover:text-white hover:bg-white/10 mb-6"
            asChild
          >
            <Link href="/challenges">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Challenges
            </Link>
          </Button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {challenge.title}
            </h1>
            <p className="text-white/80 text-lg mb-6">{challenge.description}</p>
            <div className="flex items-center gap-4 text-white/80">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                <span>{challenge.points} points</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{challenge.timeEstimate}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-lg mx-auto">
          <Card className="p-8 text-center">
            {isLocked ? (
              <>
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                  <Lock className="w-10 h-10 text-muted-foreground" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Sign In Required</h2>
                <p className="text-muted-foreground mb-6">
                  Sign in to access this challenge and track your progress.
                </p>
                <Button size="lg" asChild>
                  <Link href="/login">
                    Sign In to Start
                  </Link>
                </Button>
              </>
            ) : hasUnmetPrerequisites ? (
              <>
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <AlertCircle className="w-10 h-10 text-amber-500" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Prerequisites Required</h2>
                <p className="text-muted-foreground mb-6">
                  Complete these challenges first:
                </p>
                <div className="space-y-2 mb-6">
                  {challenge.prerequisites.map(prereqId => {
                    const prereq = challenges.find(c => c.id === prereqId);
                    return prereq ? (
                      <Link
                        key={prereqId}
                        href={`/challenges/${prereqId}`}
                        className="block p-3 rounded-lg border hover:border-primary transition-colors"
                      >
                        {prereq.title}
                      </Link>
                    ) : null;
                  })}
                </div>
              </>
            ) : (
              <>
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <Sparkles className="w-10 h-10 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Ready to Start</h2>
                <p className="text-muted-foreground mb-6">
                  This challenge doesn&apos;t have an interactive workspace yet.
                </p>
                <Button size="lg" onClick={handleComplete}>
                  <Trophy className="w-5 h-5 mr-2" />
                  Mark as Complete
                </Button>
              </>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
