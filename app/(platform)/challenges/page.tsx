"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  Trophy, Star, Clock, Code, Zap, Target, Award,
  TrendingUp, Filter, Search, ChevronRight, Lock,
  CheckCircle2, Circle, Play, Flame, Medal, Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useProgress } from "@/contexts/ProgressContext";
import challengesData from "@/data/challenges.json";

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

export default function ChallengesPage() {
  const { data: session } = useSession();
  const { isChallengeCompleted, totalPoints, completedChallenges, markChallengeComplete } = useProgress();

  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedDifficulty, setSelectedDifficulty] = React.useState<string>("all");
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");

  const challenges: Challenge[] = challengesData.challenges;

  // Check if a challenge is locked (prerequisites not met)
  const isChallengelocked = (challenge: Challenge): boolean => {
    if (!session) return challenge.difficulty !== "beginner";
    if (challenge.prerequisites.length === 0) return false;
    return !challenge.prerequisites.every(prereq => isChallengeCompleted(prereq));
  };

  // Calculate stats
  const totalAvailablePoints = challenges.reduce((sum, c) => sum + c.points, 0);
  const progressPercentage = challenges.length > 0
    ? (completedChallenges / challenges.length) * 100
    : 0;

  const filteredChallenges = challenges.filter((challenge) => {
    const matchesSearch = challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         challenge.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = selectedDifficulty === "all" || challenge.difficulty === selectedDifficulty;
    const matchesCategory = selectedCategory === "all" || challenge.category === selectedCategory;
    return matchesSearch && matchesDifficulty && matchesCategory;
  });

  const categories = Array.from(new Set(challenges.map(c => c.category)));

  // Get streak (consecutive days with completed challenges)
  const currentStreak = 7; // This would be calculated from actual data

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-purple-500/5 to-background border-b border-border">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container mx-auto px-4 py-12 md:py-16 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-5xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 rounded-full text-sm font-medium text-primary mb-6">
              <Trophy className="w-4 h-4" />
              Coding Challenges
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Put Your Skills to the{" "}
              <span className="gradient-text">Test</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
              Complete hands-on challenges to reinforce your learning, earn points, and track your progress.
            </p>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              <Card className="p-4 bg-card/80 backdrop-blur-sm border-2 hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center shadow-lg">
                    <Trophy className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-xl md:text-2xl font-bold">{totalPoints}</div>
                    <div className="text-xs md:text-sm text-muted-foreground">Total Points</div>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-card/80 backdrop-blur-sm border-2 hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                    <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-xl md:text-2xl font-bold">{completedChallenges}/{challenges.length}</div>
                    <div className="text-xs md:text-sm text-muted-foreground">Completed</div>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-card/80 backdrop-blur-sm border-2 hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg">
                    <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-xl md:text-2xl font-bold">{Math.round(progressPercentage)}%</div>
                    <div className="text-xs md:text-sm text-muted-foreground">Progress</div>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-card/80 backdrop-blur-sm border-2 hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg">
                    <Flame className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-xl md:text-2xl font-bold">{currentStreak}</div>
                    <div className="text-xs md:text-sm text-muted-foreground">Day Streak</div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Progress Bar */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm text-muted-foreground">{completedChallenges} of {challenges.length} completed</span>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-primary via-purple-500 to-pink-500"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="flex flex-col gap-4 mb-8">
          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search challenges..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-base"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3">
            <div className="flex flex-wrap gap-2">
              {["all", "beginner", "intermediate", "advanced"].map((level) => (
                <Button
                  key={level}
                  variant={selectedDifficulty === level ? "default" : "outline"}
                  onClick={() => setSelectedDifficulty(level)}
                  size="sm"
                  className={`capitalize ${
                    selectedDifficulty === level
                      ? level !== "all"
                        ? `bg-gradient-to-r ${difficultyGradients[level as keyof typeof difficultyGradients]} border-0`
                        : ""
                      : ""
                  }`}
                >
                  {level === "all" ? "All Levels" : level}
                </Button>
              ))}
            </div>

            <div className="h-8 w-px bg-border hidden sm:block" />

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="h-9 px-3 rounded-lg border border-border bg-background text-foreground text-sm cursor-pointer hover:border-primary transition-colors"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Not Logged In Banner */}
        {!session && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Card className="p-6 bg-gradient-to-r from-primary/10 to-purple-500/10 border-primary/30">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Track Your Progress</h3>
                    <p className="text-muted-foreground text-sm">Sign in to save your progress and earn points</p>
                  </div>
                </div>
                <Button asChild>
                  <Link href="/login">
                    Sign In
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Challenges Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {filteredChallenges.map((challenge, index) => {
            const isCompleted = isChallengeCompleted(challenge.id);
            const isLocked = isChallengelocked(challenge);

            return (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className={`p-5 md:p-6 h-full transition-all duration-300 group ${
                  isLocked
                    ? "opacity-60 bg-muted/30"
                    : isCompleted
                      ? "border-green-500/30 bg-green-500/5"
                      : "hover:shadow-xl hover:border-primary/50 hover:-translate-y-1 cursor-pointer"
                }`}>
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {isCompleted ? (
                          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                            <CheckCircle2 className="w-4 h-4 text-white" />
                          </div>
                        ) : isLocked ? (
                          <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                            <Lock className="w-3.5 h-3.5 text-muted-foreground" />
                          </div>
                        ) : (
                          <div className="w-6 h-6 rounded-full border-2 border-muted-foreground/30 flex items-center justify-center group-hover:border-primary transition-colors">
                            <Circle className="w-3 h-3 text-muted-foreground/30 group-hover:text-primary transition-colors" />
                          </div>
                        )}
                        <h3 className="font-bold text-lg leading-tight">{challenge.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {challenge.description}
                      </p>
                    </div>

                    {/* Points Badge */}
                    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold ${
                      isCompleted
                        ? "bg-green-500/20 text-green-700 dark:text-green-400"
                        : "bg-primary/10 text-primary"
                    }`}>
                      <Star className="w-4 h-4" />
                      {challenge.points}
                    </div>
                  </div>

                  {/* Meta Info */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                      difficultyColors[challenge.difficulty]
                    }`}>
                      {challenge.difficulty}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                      {challenge.category}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {challenge.timeEstimate}
                    </span>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {challenge.skills.slice(0, 4).map((skill) => (
                      <span key={skill} className="text-xs px-2 py-1 bg-secondary/50 text-secondary-foreground rounded-md">
                        {skill}
                      </span>
                    ))}
                    {challenge.skills.length > 4 && (
                      <span className="text-xs px-2 py-1 bg-secondary/50 text-secondary-foreground rounded-md">
                        +{challenge.skills.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* Action Button */}
                  <Button
                    className={`w-full group/btn ${
                      isCompleted
                        ? "bg-green-500/10 text-green-700 dark:text-green-400 hover:bg-green-500/20 border border-green-500/30"
                        : ""
                    }`}
                    disabled={isLocked}
                    variant={isCompleted ? "ghost" : "default"}
                    asChild={!isLocked}
                  >
                    {isLocked ? (
                      <span className="flex items-center justify-center">
                        <Lock className="w-4 h-4 mr-2" />
                        Complete prerequisites to unlock
                      </span>
                    ) : isCompleted ? (
                      <Link href={`/challenges/${challenge.id}`} className="flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Review Solution
                        <ChevronRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    ) : (
                      <Link href={`/challenges/${challenge.id}`} className="flex items-center justify-center">
                        <Play className="w-4 h-4 mr-2" />
                        Start Challenge
                        <ChevronRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    )}
                  </Button>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredChallenges.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-muted flex items-center justify-center">
              <Target className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No challenges found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your filters or search query
            </p>
            <Button variant="outline" onClick={() => {
              setSearchQuery("");
              setSelectedDifficulty("all");
              setSelectedCategory("all");
            }}>
              Clear Filters
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
