"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { Mail, Lock, User, Sparkles, ArrowRight, Chrome, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo, LogoText } from "@/components/shared/Logo";

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.error?.includes("already exists")) {
          setError("ACCOUNT_EXISTS");
        } else {
          setError(data.error || "Failed to create account");
        }
        setIsLoading(false);
        return;
      }

      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setError("Account created but couldn't sign in. Please try logging in.");
        setIsLoading(false);
      } else {
        router.push("/dashboard");
      }
    } catch {
      setError("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  const handleSocialSignup = (provider: string) => {
    signIn(provider, { callbackUrl: "/dashboard" });
  };

  const benefits = [
    "83 comprehensive lessons",
    "Interactive coding playground",
    "Hands-on challenges",
  ];

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-green-500/5 p-4 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-20 w-72 h-72 bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-20 w-56 h-56 bg-green-600/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl relative z-10 grid lg:grid-cols-2 gap-6 items-center"
      >
        {/* Left Side - Benefits */}
        <div className="hidden lg:block">
          <Link href="/" className="flex items-center gap-2 mb-6">
            <Logo className="w-10 h-10" />
            <LogoText className="text-2xl" />
          </Link>

          <h1 className="text-4xl font-bold mb-3 text-primary">
            Master LLMs & AI
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Join thousands learning to build with AI.
          </p>

          <div className="space-y-3 mb-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex items-center gap-2"
              >
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-primary" />
                </div>
                <span className="text-foreground">{benefit}</span>
              </motion.div>
            ))}
          </div>

          <div className="p-4 bg-muted/50 rounded-xl border border-border">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-green-700 border-2 border-background flex items-center justify-center text-white font-bold text-xs">S</div>
                <div className="w-8 h-8 rounded-full bg-green-600 border-2 border-background flex items-center justify-center text-white font-bold text-xs">J</div>
                <div className="w-8 h-8 rounded-full bg-green-500 border-2 border-background flex items-center justify-center text-white font-bold text-xs">A</div>
                <div className="w-8 h-8 rounded-full bg-green-400 border-2 border-background flex items-center justify-center text-white font-bold text-xs">M</div>
              </div>
              <div>
                <div className="text-xl font-bold">10,000+</div>
                <div className="text-xs text-muted-foreground">Active Learners</div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground italic">
              &ldquo;Best LLM learning platform. Clear and practical!&rdquo; — Sarah M.
            </p>
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="bg-card border-2 border-border rounded-2xl shadow-2xl p-6">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-2 mb-4">
            <Logo className="w-8 h-8" />
            <LogoText className="text-xl" />
          </div>

          {/* Header */}
          <div className="text-center mb-4">
            <div className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 rounded-full text-xs font-medium text-primary mb-2">
              <Sparkles className="w-3 h-3" />
              Start Learning for Free
            </div>
            <h2 className="text-2xl font-bold">Create Your Account</h2>
          </div>

          {/* Social Signup */}
          <Button
            variant="outline"
            className="w-full h-10 font-medium mb-4"
            onClick={() => handleSocialSignup("google")}
            disabled={isLoading}
          >
            <Chrome className="w-4 h-4 mr-2" />
            Continue with Google
          </Button>

          {/* Divider */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-card text-muted-foreground">Or sign up with email</span>
            </div>
          </div>

          {/* Email Signup Form */}
          <form onSubmit={handleEmailSignup} className="space-y-3">
            {error && (
              <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 text-xs">
                {error.includes("Google") ? (
                  <span>
                    Email linked to Google.{" "}
                    <button type="button" onClick={() => handleSocialSignup("google")} className="underline font-semibold">
                      Sign in with Google
                    </button>
                  </span>
                ) : error.includes("already exists") ? (
                  <span>
                    Account exists.{" "}
                    <Link href="/login" className="underline font-semibold">Sign in instead</Link>
                  </span>
                ) : error}
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="name" className="block text-xs font-medium mb-1">Name</label>
                <div className="relative">
                  <User className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="pl-8 h-9 text-sm"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-xs font-medium mb-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-8 h-9 text-sm"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="password" className="block text-xs font-medium mb-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="8+ characters"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="pl-8 h-9 text-sm"
                    required
                    minLength={8}
                    disabled={isLoading}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-xs font-medium mb-1">Confirm</label>
                <div className="relative">
                  <Lock className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="pl-8 h-9 text-sm"
                    required
                    minLength={8}
                    disabled={isLoading}
                  />
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full h-10 font-semibold group" disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Creating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Create Free Account
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>

          {/* Footer */}
          <p className="text-center mt-3 text-xs text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-semibold hover:underline">Sign In</Link>
          </p>
          <p className="text-center mt-2 text-[10px] text-muted-foreground">
            By signing up, you agree to our{" "}
            <Link href="/terms" className="underline">Terms</Link> and{" "}
            <Link href="/privacy" className="underline">Privacy Policy</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
