/**
 * Source of truth for the homepage FAQ. The same array feeds both the
 * accordion UI in components/marketing/FAQ.tsx and the FAQPage JSON-LD
 * structured data in app/page.tsx, which is what lets Google render
 * these answers directly in search results.
 */
export interface FaqEntry {
  question: string;
  answer: string;
}

export const faqs: FaqEntry[] = [
  {
    question: "Do I need coding experience to start?",
    answer:
      "Not at all! Our Beginner path requires zero coding. You'll start with prompt engineering, explore tools like NotebookLM, Bolt.new, and Cursor, and understand what agentic AI actually is. When you're ready to code, our Intermediate path eases you in with Python examples you can follow step-by-step.",
  },
  {
    question: "What is Agentic AI and do you teach it?",
    answer:
      "Agentic AI is the biggest trend in AI right now - it's AI that doesn't just chat, but actually reasons, plans, uses tools, and takes actions autonomously. We have 20+ dedicated lessons covering Google ADK, OpenAI Agents SDK, CrewAI, AutoGen, MCP Protocol, agent orchestration patterns, and hands-on projects building real multi-agent systems.",
  },
  {
    question: "What frameworks and tools do you cover?",
    answer:
      "Every major tool and framework: Google ADK, OpenAI Agents SDK, CrewAI, AutoGen, LangChain, LlamaIndex, Vercel AI SDK, MCP (Model Context Protocol), vector databases (Pinecone, ChromaDB, Weaviate), AI code editors (Cursor, Claude Code, Windsurf), and deployment tools (vLLM, FastAPI, Vercel). Over 36 tools across the entire AI development stack.",
  },
  {
    question: "What is MCP (Model Context Protocol)?",
    answer:
      "MCP is Anthropic's open protocol for connecting AI models to tools and data sources - think of it as the USB-C of AI. Instead of building custom integrations for every tool, MCP provides a universal standard. We teach you how MCP works, how to build MCP servers, and how to use them in production. It's becoming essential for any serious AI developer.",
  },
  {
    question: "Will I learn how to fine-tune LLMs?",
    answer:
      "Absolutely! Our Advanced path covers LoRA, QLoRA, full fine-tuning, RLHF, and DPO. You'll fine-tune models like Llama and Mistral for custom use cases, and learn when to fine-tune vs. use RAG vs. prompt engineering. We also cover deployment with vLLM and cost optimization.",
  },
  {
    question: "What is RAG and why does it matter?",
    answer:
      "RAG (Retrieval Augmented Generation) lets AI work with YOUR data - documents, databases, websites. Instead of relying only on training data, RAG retrieves relevant information and feeds it to the LLM. We cover RAG from basics to production systems with vector databases, embedding strategies, and advanced techniques like re-ranking and hybrid search.",
  },
  {
    question: "Can I actually build real applications?",
    answer:
      "Yes - that's the whole point! Every module ends with a hands-on project. You'll build multi-agent research systems with CrewAI, full-stack AI apps with Vercel AI SDK, production RAG pipelines, autonomous research agents, and more. These are portfolio-ready projects that demonstrate real skills to employers.",
  },
  {
    question: "How is this different from other AI courses?",
    answer:
      "Most AI courses teach you to use ChatGPT or cover old-school ML theory. LearnLLM.dev teaches you to BUILD with AI using the tools that matter NOW - Google ADK, CrewAI, MCP, LangChain, and the full agentic AI stack. We update our content as new frameworks launch. It's GeeksforGeeks meets the AI agent revolution.",
  },
  {
    question: "How often is the content updated?",
    answer:
      "We update constantly. When Google launched ADK, we added lessons. When OpenAI released their Agents SDK, we covered it. When MCP gained traction, we built a full module. The AI landscape moves fast, and we move with it.",
  },
  {
    question: "Is LearnLLM.dev free?",
    answer:
      "Yes. All lessons, challenges, and the interactive playground are free while we're in this phase. Sign in with email or Google so we can save your progress across devices.",
  },
];
