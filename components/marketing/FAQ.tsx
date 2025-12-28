"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { HelpCircle, Sparkles } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const faqs = [
  {
    question: "Do I need coding experience to learn LLM development?",
    answer:
      "Basic Python knowledge helps, but it's not required! Our 'LLM Fundamentals' path starts with the basics. If you can write simple Python scripts, you're ready to start. We focus on practical LLM tools and frameworks rather than complex algorithms, making it accessible for developers at all levels.",
  },
  {
    question: "What LLM frameworks and tools do you cover?",
    answer:
      "We cover all major frameworks: LangChain, LlamaIndex, Hugging Face Transformers, OpenAI API, Anthropic Claude, Vector databases (Pinecone, Weaviate, Qdrant, ChromaDB), and deployment tools (LangServe, FastAPI). You'll learn both theory and hands-on implementation for each tool.",
  },
  {
    question: "Will I learn how to fine-tune LLMs?",
    answer:
      "Absolutely! Our Advanced path includes comprehensive fine-tuning tutorials covering LoRA, QLoRA, and full fine-tuning techniques. You'll fine-tune models like Llama, Mistral, and GPT for custom use cases, and learn when to fine-tune vs. use RAG or prompt engineering.",
  },
  {
    question: "What is RAG and will I learn how to implement it?",
    answer:
      "RAG (Retrieval Augmented Generation) is a technique to give LLMs access to external knowledge. Yes! We have extensive tutorials on RAG implementation, from basic concepts to production-ready systems with vector databases, embedding models, and semantic search.",
  },
  {
    question: "Do you teach prompt engineering and Chain of Thought?",
    answer:
      "Yes! We cover advanced prompting techniques including Chain of Thought (CoT), Few-Shot learning, Tree of Thoughts, ReAct patterns, and more. You'll learn how to craft effective prompts for different use cases and get better outputs from any LLM.",
  },
  {
    question: "Can I build real AI applications with what I learn?",
    answer:
      "Definitely! Every tutorial includes production-ready code examples. You'll build chatbots, document Q&A systems, code assistants, AI agents, and more. We also teach deployment, monitoring, caching, and cost optimization for real-world applications.",
  },
  {
    question: "How is this different from ChatGPT or generic AI courses?",
    answer:
      "LearnLLM.dev is like GeeksforGeeks for the AI era. We focus on practical LLM development tools and techniques (LangChain, RAG, fine-tuning, agents) that you need to build production AI apps - not just using ChatGPT, but understanding how to build systems like it.",
  },
  {
    question: "What's the difference between the Free and Premium plans?",
    answer:
      "Free includes LangChain basics, intro to RAG, and prompt engineering fundamentals. Premium unlocks all 50+ advanced tutorials including fine-tuning, vector databases, agent building, production deployment, weekly live Q&A, and private community access.",
  },
  {
    question: "Will I learn about AI agents and multi-model systems?",
    answer:
      "Yes! We cover autonomous agents with tool use, function calling, multi-step reasoning, and Mixture of Experts (MoE) architectures. You'll learn how to build agents that can interact with APIs, databases, and other tools to solve complex problems.",
  },
  {
    question: "Do you offer team or enterprise plans?",
    answer:
      "Yes! Our Enterprise plan is perfect for AI teams. It includes custom LLM workshops, team collaboration tools, private deployment tutorials, dedicated support, and unlimited team members. Contact our sales team for custom content tailored to your use cases.",
  },
];

export function FAQ() {
  return (
    <section className="py-16 md:py-20 relative overflow-hidden bg-muted/20">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-border" />

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
              <HelpCircle className="w-4 h-4 text-info" />
              <span className="text-sm font-medium">Got Questions?</span>
            </div>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about LearnLLM.dev
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-card rounded-2xl p-6 sm:p-8 border-2 border-border shadow-sm">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-base sm:text-lg font-semibold hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </motion.div>

        {/* Still have questions CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-4">
            Still have questions? We're here to help!
          </p>
          <Button variant="outline" asChild>
            <Link href="/contact">
              <Sparkles className="w-4 h-4 mr-2" />
              Contact Support
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
