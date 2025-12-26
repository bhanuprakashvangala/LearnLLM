"use client";

import * as React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  BookOpen,
  Trophy,
  Clock,
  Target,
  Play,
  ChevronRight,
  Sparkles,
  Award,
  Flame,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isNewUser, setIsNewUser] = React.useState(true);
  const [userStats, setUserStats] = React.useState({
    lessonsCompleted: 0,
    challengesCompleted: 0,
    hoursLearned: 0,
    currentStreak: 0,
  });

  // Check if user is new (no progress yet)
  React.useEffect(() => {
    async function checkUserProgress() {
      if (session?.user?.id) {
        try {
          const res = await fetch("/api/user/progress");
          if (res.ok) {
            const data = await res.json();
            setUserStats({
              lessonsCompleted: data.lessonsCompleted || 0,
              challengesCompleted: data.challengesCompleted || 0,
              hoursLearned: data.hoursLearned || 0,
              currentStreak: data.currentStreak || 0,
            });
            setIsNewUser(data.lessonsCompleted === 0);
          }
        } catch {
          // If API fails, assume new user
          setIsNewUser(true);
        }
      }
    }
    checkUserProgress();
  }, [session?.user?.id]);

  // Redirect if not logged in
  React.useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  // Stats from API + totals
  const stats = {
    lessonsCompleted: userStats.lessonsCompleted,
    totalLessons: 83,
    challengesCompleted: userStats.challengesCompleted,
    totalChallenges: 25,
    hoursLearned: userStats.hoursLearned,
    currentStreak: userStats.currentStreak,
  };

  const recentLessons = [
    { title: "Introduction to LLMs", difficulty: "Beginner", progress: 0 },
    { title: "Prompt Engineering Basics", difficulty: "Beginner", progress: 0 },
    { title: "Understanding Tokens", difficulty: "Beginner", progress: 0 },
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-2">
            {session.user.image ? (
              <img
                src={session.user.image}
                alt={session.user.name || "User"}
                className="w-16 h-16 rounded-full border-4 border-primary"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-2xl">
                {session.user.name?.charAt(0).toUpperCase() || session.user.email?.charAt(0).toUpperCase() || "U"}
              </div>
            )}
            <div>
              <h1 className="text-3xl font-bold">
                {isNewUser ? "Welcome" : "Welcome back"}, {session.user.name?.split(" ")[0] || "Learner"}!
              </h1>
              <p className="text-muted-foreground">
                {isNewUser
                  ? "Your AI learning journey starts here"
                  : "Ready to continue your AI learning journey?"}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <div className="bg-card border-2 border-border rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-blue-500" />
              </div>
              <span className="text-sm text-muted-foreground">Lessons</span>
            </div>
            <p className="text-2xl font-bold">
              {stats.lessonsCompleted}/{stats.totalLessons}
            </p>
            <div className="w-full bg-muted rounded-full h-2 mt-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all"
                style={{ width: `${(stats.lessonsCompleted / stats.totalLessons) * 100}%` }}
              />
            </div>
          </div>

          <div className="bg-card border-2 border-border rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-green-500" />
              </div>
              <span className="text-sm text-muted-foreground">Challenges</span>
            </div>
            <p className="text-2xl font-bold">
              {stats.challengesCompleted}/{stats.totalChallenges}
            </p>
            <div className="w-full bg-muted rounded-full h-2 mt-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all"
                style={{ width: `${(stats.challengesCompleted / stats.totalChallenges) * 100}%` }}
              />
            </div>
          </div>

          <div className="bg-card border-2 border-border rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-purple-500" />
              </div>
              <span className="text-sm text-muted-foreground">Hours</span>
            </div>
            <p className="text-2xl font-bold">{stats.hoursLearned}h</p>
            <p className="text-xs text-muted-foreground mt-2">Total learning time</p>
          </div>

          <div className="bg-card border-2 border-border rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                <Flame className="w-5 h-5 text-orange-500" />
              </div>
              <span className="text-sm text-muted-foreground">Streak</span>
            </div>
            <p className="text-2xl font-bold">{stats.currentStreak} days</p>
            <p className="text-xs text-muted-foreground mt-2">Keep it going!</p>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Continue Learning */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-card border-2 border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Play className="w-5 h-5 text-primary" />
                  Continue Learning
                </h2>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/learn" className="gap-1">
                    View All <ChevronRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>

              {stats.lessonsCompleted === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Start Your Journey</h3>
                  <p className="text-muted-foreground mb-4">
                    Begin with the fundamentals of Large Language Models
                  </p>
                  <Button asChild>
                    <Link href="/learn/beginner">
                      Start First Lesson
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentLessons.map((lesson, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <BookOpen className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{lesson.title}</h3>
                          <p className="text-sm text-muted-foreground">{lesson.difficulty}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm font-medium">{lesson.progress}%</p>
                        </div>
                        <Button size="sm" variant="outline">
                          Continue
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-card border-2 border-border rounded-xl p-6">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Quick Actions
              </h2>

              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start gap-3" asChild>
                  <Link href="/playground">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-purple-500" />
                    </div>
                    Open Playground
                  </Link>
                </Button>

                <Button variant="outline" className="w-full justify-start gap-3" asChild>
                  <Link href="/challenges">
                    <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                      <Trophy className="w-4 h-4 text-green-500" />
                    </div>
                    Try a Challenge
                  </Link>
                </Button>

                <Button variant="outline" className="w-full justify-start gap-3" asChild>
                  <Link href="/learn">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <BookOpen className="w-4 h-4 text-blue-500" />
                    </div>
                    Browse Lessons
                  </Link>
                </Button>
              </div>
            </div>

            {/* Account Info */}
            <div className="bg-card border-2 border-border rounded-xl p-6 mt-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                Account
              </h2>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Plan</span>
                  <span className="font-medium bg-primary/10 text-primary px-2 py-0.5 rounded text-sm">Free</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Email</span>
                  <span className="font-medium text-sm truncate max-w-[150px]">{session.user.email}</span>
                </div>
              </div>

              <Button className="w-full mt-4" variant="outline" asChild>
                <Link href="/settings">
                  Manage Account
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
