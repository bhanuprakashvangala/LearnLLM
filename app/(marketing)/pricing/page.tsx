"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Check, X, Sparkles, Zap, Crown, Users, Shield,
  TrendingUp, Code, BookOpen, Trophy, MessageCircle,
  Star, ArrowRight, Info, ChevronDown, HelpCircle,
  GraduationCap, Rocket
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

interface PricingPlan {
  name: string;
  price: string;
  annualPrice: string;
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
  gradient: string;
}

const plans: PricingPlan[] = [
  {
    name: "Free",
    price: "$0",
    annualPrice: "$0",
    period: "forever",
    description: "Perfect for getting started with LLMs",
    icon: BookOpen,
    popular: false,
    color: "text-gray-600 dark:text-gray-400",
    gradient: "from-gray-500 to-gray-600",
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
    annualPrice: "$15",
    period: "per month",
    description: "For serious learners who want hands-on practice",
    icon: Zap,
    popular: true,
    color: "text-primary",
    gradient: "from-primary to-purple-600",
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
    annualPrice: "$39",
    period: "per user/month",
    description: "For teams and organizations",
    icon: Users,
    popular: false,
    color: "text-purple-600",
    gradient: "from-purple-500 to-pink-600",
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
    answer: "Yes! You can upgrade, downgrade, or cancel your plan at any time. Changes take effect immediately.",
    icon: TrendingUp
  },
  {
    question: "Do you offer student discounts?",
    answer: "Yes! Students get 50% off Pro plans. Just verify your student status with a .edu email.",
    icon: GraduationCap
  },
  {
    question: "What's included in the free trial?",
    answer: "Get full access to Pro features for 14 days, no credit card required. Cancel anytime.",
    icon: Sparkles
  },
  {
    question: "Can I get a refund?",
    answer: "Yes, we offer a 30-day money-back guarantee. If you're not satisfied, we'll refund you, no questions asked.",
    icon: Shield
  },
  {
    question: "Do you offer lifetime access?",
    answer: "Yes! We offer a one-time payment of $299 for lifetime Pro access. Contact us for details.",
    icon: Crown
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and wire transfers for Teams plans.",
    icon: Code
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

const trustedCompanies = ["Google", "Microsoft", "Meta", "Amazon", "OpenAI"];

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = React.useState<"monthly" | "annual">("monthly");
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-purple-500/5 to-background border-b border-border">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container mx-auto px-4 py-16 md:py-20 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 rounded-full text-sm font-medium text-primary mb-6">
              <Crown className="w-4 h-4" />
              Simple, Transparent Pricing
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Choose Your{" "}
              <span className="gradient-text">Learning Path</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Start free, upgrade when you're ready. All plans include lifetime access to course updates.
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center gap-2 p-1.5 bg-muted rounded-xl border border-border">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
                  billingCycle === "monthly"
                    ? "bg-background shadow-md text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("annual")}
                className={`px-6 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  billingCycle === "annual"
                    ? "bg-background shadow-md text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Annual
                <span className="px-2 py-0.5 bg-green-500/20 text-green-700 dark:text-green-400 rounded-full text-xs font-semibold">
                  Save 20%
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            const displayPrice = billingCycle === "annual" ? plan.annualPrice : plan.price;

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative ${plan.popular ? "lg:-mt-4 lg:mb-4" : ""}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <div className="px-4 py-1.5 bg-gradient-to-r from-primary to-purple-600 text-white text-sm font-semibold rounded-full shadow-lg flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5" />
                      Most Popular
                    </div>
                  </div>
                )}

                <Card
                  className={`p-6 md:p-8 h-full flex flex-col transition-all duration-300 ${
                    plan.popular
                      ? "border-2 border-primary shadow-2xl bg-gradient-to-b from-primary/5 to-transparent"
                      : "border-2 border-border hover:border-primary/30 hover:shadow-xl"
                  }`}
                >
                  {/* Header */}
                  <div className="mb-6">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center mb-4 shadow-lg`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>

                    <h3 className="text-2xl font-bold mb-1">{plan.name}</h3>
                    <p className="text-muted-foreground text-sm">{plan.description}</p>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-bold">{displayPrice}</span>
                      {plan.name !== "Free" && (
                        <span className="text-muted-foreground">
                          /{plan.period.replace("per ", "")}
                        </span>
                      )}
                    </div>
                    {billingCycle === "annual" && plan.name !== "Free" && (
                      <p className="text-sm text-muted-foreground mt-2">
                        Billed ${plan.name === "Pro" ? "180" : "468 per user"} annually
                      </p>
                    )}
                  </div>

                  {/* CTA Button */}
                  <Button
                    className={`w-full h-12 font-semibold mb-6 group ${
                      plan.popular
                        ? `bg-gradient-to-r ${plan.gradient} hover:opacity-90`
                        : ""
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
                  <div className="space-y-3 flex-1">
                    <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                      What's included
                    </p>
                    {plan.features.included.map((feature) => (
                      <div key={feature} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-green-600" />
                        </div>
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}

                    {plan.features.excluded?.map((feature) => (
                      <div key={feature} className="flex items-start gap-3 opacity-50">
                        <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                          <X className="w-3 h-3 text-muted-foreground" />
                        </div>
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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-muted-foreground mb-8">Trusted by developers at</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {trustedCompanies.map((company) => (
              <div
                key={company}
                className="text-xl md:text-2xl font-bold text-muted-foreground/50 hover:text-muted-foreground transition-colors"
              >
                {company}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Testimonials */}
      <div className="bg-muted/30 py-16 md:py-20 border-y border-border">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Loved by Thousands of Learners
            </h2>
            <p className="text-muted-foreground">
              Join developers who are already building with AI
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
              >
                <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <p className="text-muted-foreground mb-6 italic leading-relaxed">
                    "{testimonial.quote}"
                  </p>

                  <div className="flex items-center gap-3">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full border-2 border-primary/20"
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
      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 rounded-full text-sm font-medium text-primary mb-4">
              <HelpCircle className="w-4 h-4" />
              FAQ
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const Icon = faq.icon;
              const isOpen = openFaq === index;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card
                    className={`overflow-hidden transition-all cursor-pointer ${
                      isOpen ? "border-primary/50 shadow-lg" : "hover:border-primary/30"
                    }`}
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                  >
                    <div className="p-5 flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        isOpen ? "bg-primary/20" : "bg-muted"
                      }`}>
                        <Icon className={`w-5 h-5 ${isOpen ? "text-primary" : "text-muted-foreground"}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-4">
                          <h3 className="font-semibold">{faq.question}</h3>
                          <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform flex-shrink-0 ${
                            isOpen ? "rotate-180" : ""
                          }`} />
                        </div>

                        {isOpen && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="text-muted-foreground mt-3 leading-relaxed"
                          >
                            {faq.answer}
                          </motion.p>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10 border-y border-border">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container mx-auto px-4 py-16 md:py-20 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-xl">
              <Rocket className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Master LLMs?
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of developers already building with AI. Start your free trial today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-base font-semibold group h-12 px-8" asChild>
                <Link href="/signup">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-base font-semibold h-12 px-8" asChild>
                <Link href="/learn">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Browse Lessons
                </Link>
              </Button>
            </div>

            <p className="text-sm text-muted-foreground mt-8">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
