"use client";

import * as React from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Lock, Sparkles, ArrowRight, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { canAccessDifficulty, hasProAccess, type Difficulty } from "@/lib/access";

interface ContentGateProps {
  difficulty: Difficulty;
  children: React.ReactNode;
  title?: string;
  slug?: string;
}

export function ContentGate({ difficulty, children, title, slug }: ContentGateProps) {
  const { data: session, status } = useSession();

  // Show loading state
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Check access
  const userAccess = session?.user
    ? {
        plan: (session.user.plan as "FREE" | "PRO" | "TEAMS") || "FREE",
        role: (session.user.role as "USER" | "EMPLOYEE" | "ADMIN") || "USER",
      }
    : null;

  const hasAccess = canAccessDifficulty(userAccess, difficulty, slug);

  // If user has access, show content
  if (hasAccess) {
    return <>{children}</>;
  }

  // Determine if this is a PRO-only lock (advanced) or login-required lock
  const needsProPlan = difficulty === "ADVANCED" && session && !hasProAccess(userAccess);
  const needsLogin = !session;

  // Show appropriate prompt
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="max-w-md text-center p-8">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <Lock className="w-10 h-10 text-primary" />
        </div>

        {needsLogin ? (
          <>
            <h2 className="text-2xl font-bold mb-3">Sign In Required</h2>
            <p className="text-muted-foreground mb-6">
              {title ? (
                <>
                  <span className="font-medium text-foreground">"{title}"</span> requires a free account.
                </>
              ) : (
                <>This lesson requires a free account to access.</>
              )}{" "}
              Sign up for free to continue learning.
            </p>

            <div className="space-y-3">
              <Button asChild className="w-full">
                <Link href="/signup">
                  <LogIn className="w-4 h-4 mr-2" />
                  Create Free Account
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>

              <Button variant="outline" asChild className="w-full">
                <Link href="/login">
                  Already have an account? Sign in
                </Link>
              </Button>
            </div>

            <p className="text-xs text-muted-foreground mt-6">
              Free account includes beginner and intermediate lessons.
            </p>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-3">Pro Content</h2>
            <p className="text-muted-foreground mb-6">
              {title ? (
                <>
                  <span className="font-medium text-foreground">"{title}"</span> is available for Pro members.
                </>
              ) : (
                <>Advanced lessons are available for Pro members.</>
              )}{" "}
              Upgrade to unlock all advanced content.
            </p>

            <div className="space-y-3">
              <Button asChild className="w-full">
                <Link href="/pricing">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Upgrade to Pro
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>

            <p className="text-xs text-muted-foreground mt-6">
              Pro includes all 83 lessons, advanced content, and premium features.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
