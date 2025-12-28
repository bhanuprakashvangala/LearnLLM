"use client";

import * as React from "react";
import { useSession, signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Sparkles, ArrowRight, Chrome, Mail, User, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { canAccessDifficulty, hasProAccess, type Difficulty } from "@/lib/access";

interface ContentGateProps {
  difficulty: Difficulty;
  children: React.ReactNode;
  title?: string;
  slug?: string;
}

export function ContentGate({ difficulty, children, title, slug }: ContentGateProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isSignUp, setIsSignUp] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
  });

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
  const needsLogin = !session;

  const handleGoogleAuth = () => {
    signIn("google", { callbackUrl: window.location.href });
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (isSignUp) {
        // Sign up flow
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (!res.ok) {
          if (data.error?.includes("already exists")) {
            setError("Account exists. Please sign in instead.");
            setIsSignUp(false);
          } else {
            setError(data.error || "Failed to create account");
          }
          setIsLoading(false);
          return;
        }
      }

      // Sign in
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setError(isSignUp ? "Account created but couldn't sign in." : "Invalid email or password");
        setIsLoading(false);
      } else {
        router.refresh();
      }
    } catch {
      setError("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  // Show content with overlay modal
  return (
    <div className="relative">
      {/* Blurred content in background */}
      <div className="blur-sm opacity-50 pointer-events-none select-none">
        {children}
      </div>

      {/* Modal Overlay */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
        <div className="bg-card border-2 border-border rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-md relative animate-in fade-in zoom-in-95 duration-200">

          {needsLogin ? (
            <>
              {/* Header */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-2">
                  {isSignUp ? "Create Free Account" : "Welcome Back"}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {isSignUp ? "Sign up to access this lesson" : "Sign in to continue learning"}
                </p>
              </div>

              {/* Google Sign In */}
              <Button
                variant="outline"
                className="w-full h-11 font-medium mb-4"
                onClick={handleGoogleAuth}
                disabled={isLoading}
              >
                <Chrome className="w-5 h-5 mr-2" />
                Continue with Google
              </Button>

              {/* Divider */}
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-3 bg-card text-muted-foreground">
                    Or with email
                  </span>
                </div>
              </div>

              {/* Email Form */}
              <form onSubmit={handleEmailAuth} className="space-y-3">
                {error && (
                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 text-sm">
                    {error}
                  </div>
                )}

                {isSignUp && (
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="pl-10 h-10"
                      required={isSignUp}
                      disabled={isLoading}
                    />
                  </div>
                )}

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-10 h-10"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="pl-10 h-10"
                    required
                    minLength={8}
                    disabled={isLoading}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-11 font-semibold"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : isSignUp ? (
                    <>
                      Create Free Account
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </form>

              {/* Toggle Sign Up / Sign In */}
              <p className="text-center mt-4 text-sm text-muted-foreground">
                {isSignUp ? (
                  <>
                    Already have an account?{" "}
                    <button
                      onClick={() => setIsSignUp(false)}
                      className="text-primary font-semibold hover:underline"
                    >
                      Sign In
                    </button>
                  </>
                ) : (
                  <>
                    Don't have an account?{" "}
                    <button
                      onClick={() => setIsSignUp(true)}
                      className="text-primary font-semibold hover:underline"
                    >
                      Sign Up Free
                    </button>
                  </>
                )}
              </p>

              {/* Benefits */}
              <div className="mt-6 pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-xs text-muted-foreground justify-center">
                  <Check className="w-3 h-3 text-primary" />
                  <span>Free access to beginner & intermediate lessons</span>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* PRO upgrade prompt - Premium Design */}
              <div className="text-center">
                {/* Gradient icon background */}
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>

                <div className="inline-block px-3 py-1 bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-semibold rounded-full mb-4">
                  ADVANCED CONTENT
                </div>

                <h2 className="text-2xl font-bold mb-3">Unlock This Lesson</h2>

                {title && (
                  <p className="text-foreground font-medium mb-2">"{title}"</p>
                )}

                <p className="text-sm text-muted-foreground mb-6">
                  Get access to all advanced lessons, fine-tuning tutorials, and production deployment guides.
                </p>

                {/* Features list */}
                <div className="text-left bg-muted/50 rounded-xl p-4 mb-6 space-y-2">
                  {["All 83 lessons unlocked", "Advanced fine-tuning guides", "Production deployment", "Priority support"].map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-purple-500" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <Button asChild className="w-full h-12 font-semibold bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 border-0">
                  <Link href="/pricing">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Upgrade to Pro - $19/mo
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>

                <p className="text-xs text-muted-foreground mt-4">
                  7-day money-back guarantee
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
