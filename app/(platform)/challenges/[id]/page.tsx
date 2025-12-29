"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Trophy, Star, Clock, ArrowLeft, CheckCircle2, Lock,
  Target, Sparkles, ChevronRight, AlertCircle,
  BookOpen, Lightbulb, ExternalLink, ListChecks, Code
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useProgress } from "@/contexts/ProgressContext";
import { InteractiveChallenge } from "@/components/challenges/InteractiveChallenge";
import challengesData from "@/data/challenges.json";
import challengeStepsData from "@/data/challenge-steps.json";

interface Resource {
  title: string;
  url: string;
}

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
  instructions?: string[];
  resources?: Resource[];
  hints?: string[];
}

interface Step {
  id: string;
  title: string;
  instruction: string;
  language: string;
  template: string;
  solution?: string;
  hint?: string;
  readOnly?: boolean;
  validation?: string[];
}

interface ChallengeSteps {
  title: string;
  steps: Step[];
}

const difficultyColors = {
  beginner: "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/30",
  intermediate: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30",
  advanced: "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/30",
};

const difficultyGradients = {
  beginner: "from-green-500 to-emerald-600",
  intermediate: "from-amber-500 to-orange-600",
  advanced: "from-red-500 to-pink-600",
};

export default function ChallengePage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const { isChallengeCompleted, markChallengeComplete } = useProgress();
  const [isHydrated, setIsHydrated] = React.useState(false);
  const [showInteractive, setShowInteractive] = React.useState(false);

  React.useEffect(() => {
    setIsHydrated(true);
  }, []);

  const challengeId = params.id as string;
  const challenges: Challenge[] = challengesData.challenges as Challenge[];
  const challenge = challenges.find(c => c.id === challengeId);

  // Get interactive steps for this challenge
  const stepsData = (challengeStepsData as Record<string, ChallengeSteps>)[challengeId];
  const hasInteractiveSteps = !!stepsData?.steps?.length;

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

  // Check if prerequisites are met
  const prerequisitesMet = challenge.prerequisites.every(prereq =>
    isChallengeCompleted(prereq)
  );

  // First beginner challenge is always accessible
  const isLocked = challenge.id !== "1" && !session;
  const hasUnmetPrerequisites = challenge.prerequisites.length > 0 && !prerequisitesMet && !isCompleted;

  // Get prerequisite challenge titles
  const prerequisiteChallenges = challenge.prerequisites.map(prereqId =>
    challenges.find(c => c.id === prereqId)
  ).filter(Boolean) as Challenge[];

  const handleChallengeComplete = () => {
    markChallengeComplete(challenge.id, challenge.points);
    setShowInteractive(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className={`relative overflow-hidden bg-gradient-to-br ${difficultyGradients[challenge.difficulty]} pb-32`}>
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 py-8 relative">
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
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-medium border bg-white/20 text-white border-white/30">
                {challenge.difficulty}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white">
                {challenge.category}
              </span>
              {hasInteractiveSteps && (
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/30 text-white border border-purple-400/50 flex items-center gap-1">
                  <Code className="w-3 h-3" />
                  Interactive
                </span>
              )}
              {isCompleted && (
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/30 text-white border border-green-400/50 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Completed
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              {challenge.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-white/80">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                <span className="font-semibold">{challenge.points} points</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{challenge.timeEstimate}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 -mt-24 relative pb-12">
        {/* Interactive Challenge Mode */}
        {showInteractive && hasInteractiveSteps ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="p-6 md:p-8 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Code className="w-5 h-5 text-primary" />
                  {challenge.title}
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowInteractive(false)}
                >
                  Exit Interactive Mode
                </Button>
              </div>

              <InteractiveChallenge
                challengeId={challenge.id}
                challengeTitle={challenge.title}
                steps={stepsData.steps}
                onComplete={handleChallengeComplete}
              />
            </Card>
          </motion.div>
        ) : (
          /* Normal Challenge View */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content Card */}
            <div className="lg:col-span-2 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="p-6 md:p-8">
                  <h2 className="text-xl font-semibold mb-4">Challenge Description</h2>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    {challenge.description}
                  </p>

                  <h3 className="text-lg font-semibold mb-3">Skills You&apos;ll Practice</h3>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {challenge.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {prerequisiteChallenges.length > 0 && (
                    <>
                      <h3 className="text-lg font-semibold mb-3">Prerequisites</h3>
                      <div className="space-y-2 mb-8">
                        {prerequisiteChallenges.map((prereq) => {
                          const prereqCompleted = isHydrated && isChallengeCompleted(prereq.id);
                          return (
                            <Link
                              key={prereq.id}
                              href={`/challenges/${prereq.id}`}
                              className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
                                prereqCompleted
                                  ? "bg-green-500/5 border-green-500/30"
                                  : "bg-muted/50 border-border hover:border-primary/50"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                {prereqCompleted ? (
                                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                                ) : (
                                  <div className="w-5 h-5 rounded-full border-2 border-muted-foreground/30" />
                                )}
                                <span className={prereqCompleted ? "text-muted-foreground" : ""}>
                                  {prereq.title}
                                </span>
                              </div>
                              <ChevronRight className="w-4 h-4 text-muted-foreground" />
                            </Link>
                          );
                        })}
                      </div>
                    </>
                  )}
                </Card>
              </motion.div>

              {/* Interactive Challenge CTA */}
              {hasInteractiveSteps && !isCompleted && !isLocked && !hasUnmetPrerequisites && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <Card className="p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg">
                          <Code className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">Interactive Coding Challenge</h3>
                          <p className="text-muted-foreground text-sm">
                            Build step-by-step with AI guidance and instant feedback
                          </p>
                        </div>
                      </div>
                      <Button
                        size="lg"
                        onClick={() => setShowInteractive(true)}
                        className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                      >
                        <Sparkles className="w-5 h-5 mr-2" />
                        Start Coding
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              )}

              {/* Instructions Section */}
              {challenge.instructions && challenge.instructions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card className="p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <ListChecks className="w-5 h-5 text-primary" />
                      </div>
                      <h2 className="text-xl font-semibold">Step-by-Step Instructions</h2>
                    </div>
                    <ol className="space-y-4">
                      {challenge.instructions.map((instruction, index) => (
                        <li key={index} className="flex gap-4">
                          <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm">
                            {index + 1}
                          </span>
                          <p className="text-muted-foreground pt-1">{instruction}</p>
                        </li>
                      ))}
                    </ol>
                  </Card>
                </motion.div>
              )}

              {/* Resources Section */}
              {challenge.resources && challenge.resources.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  <Card className="p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-blue-500" />
                      </div>
                      <h2 className="text-xl font-semibold">Helpful Resources</h2>
                    </div>
                    <div className="space-y-3">
                      {challenge.resources.map((resource, index) => (
                        <a
                          key={index}
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-blue-500/50 hover:bg-blue-500/5 transition-colors group"
                        >
                          <span className="font-medium group-hover:text-blue-500 transition-colors">
                            {resource.title}
                          </span>
                          <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-blue-500 transition-colors" />
                        </a>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              )}

              {/* Hints Section */}
              {challenge.hints && challenge.hints.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Card className="p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                        <Lightbulb className="w-5 h-5 text-amber-500" />
                      </div>
                      <h2 className="text-xl font-semibold">Hints</h2>
                    </div>
                    <div className="space-y-3">
                      {challenge.hints.map((hint, index) => (
                        <div
                          key={index}
                          className="flex gap-3 p-4 rounded-lg bg-amber-500/5 border border-amber-500/20"
                        >
                          <Lightbulb className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                          <p className="text-muted-foreground">{hint}</p>
                        </div>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="p-6 sticky top-24">
                  {isCompleted ? (
                    <>
                      <div className="text-center mb-6">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                          <Trophy className="w-8 h-8 text-green-500" />
                        </div>
                        <h3 className="text-xl font-semibold text-green-600 dark:text-green-400">
                          Challenge Completed!
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          You earned {challenge.points} points
                        </p>
                      </div>
                      {hasInteractiveSteps && (
                        <Button
                          className="w-full mb-3"
                          variant="outline"
                          onClick={() => setShowInteractive(true)}
                        >
                          <Code className="w-4 h-4 mr-2" />
                          Review Code Steps
                        </Button>
                      )}
                      <Button className="w-full" variant="outline" asChild>
                        <Link href="/challenges">
                          View More Challenges
                        </Link>
                      </Button>
                    </>
                  ) : isLocked ? (
                    <>
                      <div className="text-center mb-6">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                          <Lock className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-xl font-semibold">Sign In Required</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Sign in to track your progress and earn points
                        </p>
                      </div>
                      <Button className="w-full" asChild>
                        <Link href="/login">
                          Sign In to Start
                        </Link>
                      </Button>
                    </>
                  ) : hasUnmetPrerequisites ? (
                    <>
                      <div className="text-center mb-6">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-500/20 flex items-center justify-center">
                          <AlertCircle className="w-8 h-8 text-amber-500" />
                        </div>
                        <h3 className="text-xl font-semibold">Prerequisites Required</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Complete the prerequisite challenges first
                        </p>
                      </div>
                      <Button className="w-full" variant="outline" asChild>
                        <Link href={`/challenges/${challenge.prerequisites[0]}`}>
                          Start Prerequisites
                        </Link>
                      </Button>
                    </>
                  ) : (
                    <>
                      <div className="text-center mb-6">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                          <Sparkles className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold">Ready to Start</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Earn {challenge.points} points upon completion
                        </p>
                      </div>
                      {hasInteractiveSteps ? (
                        <Button
                          className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                          onClick={() => setShowInteractive(true)}
                        >
                          <Code className="w-4 h-4 mr-2" />
                          Start Interactive Challenge
                        </Button>
                      ) : (
                        <Button
                          className="w-full"
                          onClick={() => markChallengeComplete(challenge.id, challenge.points)}
                        >
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          Mark as Complete
                        </Button>
                      )}
                      <p className="text-xs text-center text-muted-foreground mt-3">
                        {hasInteractiveSteps
                          ? "Complete all coding steps to earn points"
                          : "Complete the challenge in your own environment"
                        }
                      </p>
                    </>
                  )}

                  {/* Points summary */}
                  <div className="mt-6 pt-6 border-t">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Points</span>
                      <span className="font-semibold flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        {challenge.points}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm mt-2">
                      <span className="text-muted-foreground">Time</span>
                      <span className="font-semibold">{challenge.timeEstimate}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm mt-2">
                      <span className="text-muted-foreground">Difficulty</span>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${difficultyColors[challenge.difficulty]}`}>
                        {challenge.difficulty}
                      </span>
                    </div>
                    {hasInteractiveSteps && (
                      <div className="flex items-center justify-between text-sm mt-2">
                        <span className="text-muted-foreground">Type</span>
                        <span className="px-2 py-0.5 rounded text-xs font-medium bg-purple-500/10 text-purple-600 dark:text-purple-400">
                          Interactive
                        </span>
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
