"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Sparkles, Crown, Building2, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const pricingPlans = [
  {
    name: "Free",
    description: "Perfect for getting started with LLMs",
    price: "$0",
    period: "forever",
    icon: Zap,
    features: [
      "Access to all 83 lessons",
      "Complete beginner track",
      "Code examples & snippets",
      "Community forum access",
      "Mobile-friendly learning",
    ],
    cta: "Start Free",
    link: "/signup",
    popular: false,
  },
  {
    name: "Pro",
    description: "For serious learners who want hands-on practice",
    price: "$19",
    period: "per month",
    icon: Crown,
    features: [
      "Everything in Free",
      "Interactive AI playground",
      "30+ coding challenges",
      "Real-world projects",
      "Certificate of completion",
      "Priority email support",
      "Download lesson materials",
      "Early access to new content",
    ],
    cta: "Start Free Trial",
    link: "/signup?plan=pro",
    popular: true,
  },
  {
    name: "Teams",
    description: "For teams and organizations",
    price: "$49",
    period: "per user/month",
    icon: Building2,
    features: [
      "Everything in Pro",
      "Team dashboard & analytics",
      "Progress tracking for team",
      "Custom learning paths",
      "SSO & SAML support",
      "Dedicated account manager",
      "Priority support (24/7)",
    ],
    cta: "Contact Sales",
    link: "/contact",
    popular: false,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function Pricing() {
  return (
    <section id="pricing" className="py-20 md:py-28 relative overflow-hidden bg-background">

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-4">
            <div className="glass rounded-full px-4 py-1.5 inline-flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium">Simple, Transparent Pricing</span>
            </div>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Start Free,  <span className="gradient-text">Level Up When Ready</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everyone starts free with no-code basics. Upgrade anytime to build real AI projects. Cancel whenever you want.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          {pricingPlans.map((plan, index) => (
            <motion.div key={index} variants={item}>
              <Card
                className={cn(
                  "relative h-full flex flex-col transition-all duration-300 border-2",
                  plan.popular
                    ? "border-primary shadow-xl scale-105"
                    : "border-border hover:border-primary/50 shadow-md hover:shadow-lg"
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <div className="bg-primary text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-md flex items-center gap-1.5">
                      <Crown className="w-3 h-3" />
                      Most Popular
                    </div>
                  </div>
                )}

                <CardHeader className="text-center pb-8 pt-8">
                  {/* Icon */}
                  <div className="mb-6 flex justify-center">
                    <div className="inline-flex p-4 rounded-xl bg-primary/10 border border-primary/20">
                      <plan.icon className="w-8 h-8 text-primary" />
                    </div>
                  </div>

                  <CardTitle className="text-3xl font-extrabold mb-3">{plan.name}</CardTitle>
                  <CardDescription className="text-base mb-8 text-foreground/60">
                    {plan.description}
                  </CardDescription>

                  {/* Price */}
                  <div className="mb-2">
                    <span className="text-5xl font-extrabold text-foreground">
                      {plan.price}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-muted-foreground">{plan.period}</p>
                </CardHeader>

                <CardContent className="flex-grow px-8">
                  {/* Features */}
                  <ul className="space-y-4">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 group/item">
                        <Check
                          className={cn(
                            "w-5 h-5 mt-0.5 flex-shrink-0 transition-colors",
                            plan.popular ? "text-primary group-hover/item:text-secondary" : "text-success group-hover/item:text-primary"
                          )}
                        />
                        <span className="text-sm font-medium text-foreground/80 group-hover/item:text-foreground transition-colors">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="pt-8 px-8 pb-8">
                  <Button
                    variant={plan.popular ? "default" : "outline"}
                    size="lg"
                    className="w-full font-bold text-base h-12"
                    asChild
                  >
                    <Link href={plan.link}>{plan.cta}</Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-sm text-muted-foreground">
            All premium plans include a 7-day money-back guarantee. Start building LLM apps today.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
