"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Check, X, Sparkles, Zap, Crown, Users, Shield,
  TrendingUp, Code, BookOpen, Trophy, MessageCircle,
  Star, ArrowRight, Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  icon: any;
  popular: boolean;
  features: {
    included: string[];
    excluded?: string[];
  };
  cta: string;
  color: string;
}

const plans: PricingPlan[] = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started with LLMs",
    icon: BookOpen,
    popular: false,
    color: "from-gray-500 to-gray-600",
    features: {
      included: [
        "Access to all 83 lessons",
        "Complete beginner track",
        "Code examples & snippets",
        "Community forum access",
        "Mobile-friendly learning",
        "Dark mode support",
      ],
      excluded: [
        "Interactive playground",
        "Coding challenges",
        "Certificate of completion",
        "Priority support",
        "Advanced projects",
      ]
    },
    cta: "Start Learning Free"
  },
  {
    name: "Pro",
    price: "$19",
    period: "per month",
    description: "For serious learners who want hands-on practice",
    icon: Zap,
    popular: true,
    color: "from-primary to-purple-600",
    features: {
      included: [
        "Everything in Free",
        "Interactive AI playground",
        "30+ coding challenges",
        "Real-world projects",
        "Certificate of completion",
        "Priority email support",
        "Download lesson materials",
        "Ad-free experience",
        "Early access to new content",
      ]
    },
    cta: "Start Free Trial"
  },
  {
    name: "Teams",
    price: "$49",
    period: "per user/month",
    description: "For teams and organizations",
    icon: Users,
    popular: false,
    color: "from-purple-500 to-pink-600",
    features: {
      included: [
        "Everything in Pro",
        "Team dashboard & analytics",
        "Progress tracking for team",
        "Custom learning paths",
        "Dedicated account manager",
        "SSO & SAML support",
        "Custom integrations",
        "Priority support (24/7)",
        "Invoicing & bulk licenses",
        "Onboarding sessions",
      ]
    },
    cta: "Contact Sales"
  }
];

const faqs = [
  {
    question: "Can I switch plans later?",
    answer: "Yes! You can upgrade, downgrade, or cancel your plan at any time. Changes take effect immediately."
  },
  {
    question: "Do you offer student discounts?",
    answer: "Yes! Students get 50% off Pro plans. Just verify your student status with a .edu email."
  },
  {
    question: "What's included in the free trial?",
    answer: "Get full access to Pro features for 14 days, no credit card required. Cancel anytime."
  },
  {
    question: "Can I get a refund?",
    answer: "Yes, we offer a 30-day money-back guarantee. If you're not satisfied, we'll refund you, no questions asked."
  },
  {
    question: "Do you offer lifetime access?",
    answer: "Yes! We offer a one-time payment of $299 for lifetime Pro access. Contact us for details."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and wire transfers for Teams plans."
  }
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "ML Engineer at Google",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    quote: "LearnLLM.dev transformed how I understand and build with AI. The hands-on approach is unmatched!"
  },
  {
    name: "Michael Chen",
    role: "Founder, AI Startup",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    quote: "From zero to building production RAG systems in weeks. Best investment in my career."
  },
  {
    name: "Emily Rodriguez",
    role: "Data Scientist",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    quote: "Clear, practical, and comprehensive. Finally a course that delivers on its promises!"
  }
];

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = React.useState<"monthly" | "annual">("monthly");
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/10 via-purple-500/5 to-background border-b border-border">
        <div className="container mx-auto px-4 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 rounded-full text-sm font-medium text-primary mb-6">
              <Crown className="w-4 h-4" />
              Simple, Transparent Pricing
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Choose Your Learning Path
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Start free, upgrade when you're ready. All plans include lifetime access to course updates.
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center gap-3 p-1 bg-muted rounded-xl">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  billingCycle === "monthly"
                    ? "bg-background shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("annual")}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  billingCycle === "annual"
                    ? "bg-background shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Annual
                <span className="ml-2 px-2 py-0.5 bg-green-500/20 text-green-700 dark:text-green-400 rounded text-xs font-semibold">
                  Save 20%
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            const annualPrice = plan.name === "Pro" ? "$15" : plan.name === "Teams" ? "$39" : plan.price;

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <div className="px-4 py-1 bg-gradient-to-r from-primary to-purple-600 text-white text-sm font-semibold rounded-full shadow-lg flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      Most Popular
                    </div>
                  </div>
                )}

                <Card
                  className={`p-8 h-full ${
                    plan.popular
                      ? "border-2 border-primary shadow-2xl scale-105"
                      : "border-2 border-border"
                  }`}
                >
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Plan Name */}
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm mb-6">{plan.description}</p>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-bold">
                        {billingCycle === "annual" ? annualPrice : plan.price}
                      </span>
                      <span className="text-muted-foreground">
                        {plan.name === "Free" ? "" : `/${plan.period.replace("per ", "")}`}
                      </span>
                    </div>
                    {billingCycle === "annual" && plan.name !== "Free" && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Billed ${plan.name === "Pro" ? "180" : "468"} annually
                      </p>
                    )}
                  </div>

                  {/* CTA Button */}
                  <Button
                    className={`w-full h-12 font-semibold mb-6 group ${
                      plan.popular ? "" : "variant-outline"
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                    asChild
                  >
                    <Link href={plan.name === "Teams" ? "/contact" : "/signup"}>
                      {plan.cta}
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>

                  {/* Features */}
                  <div className="space-y-3">
                    {plan.features.included.map((feature) => (
                      <div key={feature} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}

                    {plan.features.excluded?.map((feature) => (
                      <div key={feature} className="flex items-start gap-3 opacity-50">
                        <X className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground mb-8">Trusted by developers at</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-50 grayscale">
            {["Google", "Microsoft", "Meta", "Amazon", "OpenAI"].map((company) => (
              <div key={company} className="text-2xl font-bold">{company}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Loved by Thousands of Learners
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 h-full">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <p className="text-muted-foreground mb-6 italic">
                    "{testimonial.quote}"
                  </p>

                  <div className="flex items-center gap-3">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card
                key={index}
                className="p-6 cursor-pointer hover:border-primary transition-colors"
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-semibold flex-1">{faq.question}</h3>
                  <Info className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform ${
                    openFaq === index ? "rotate-180" : ""
                  }`} />
                </div>

                {openFaq === index && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-muted-foreground mt-3"
                  >
                    {faq.answer}
                  </motion.p>
                )}
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-primary/10 via-purple-500/10 to-primary/10 border-y border-border">
        <div className="container mx-auto px-4 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Sparkles className="w-12 h-12 mx-auto mb-6 text-primary" />
            <h2 className="text-4xl font-bold mb-4">
              Ready to Master LLMs?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of developers already building with AI. Start your free trial today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-base font-semibold group" asChild>
                <Link href="/signup">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-base font-semibold" asChild>
                <Link href="/learn">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Browse Lessons
                </Link>
              </Button>
            </div>

            <p className="text-sm text-muted-foreground mt-6">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
