import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learn AI engineering — full curriculum",
  description:
    "The full LearnLLM.dev curriculum: 110+ free lessons across three levels — from how large language models actually work, through prompting, RAG, and fine-tuning, to building production AI agents with Google ADK, OpenAI Agents SDK, CrewAI, AutoGen, and MCP.",
  alternates: { canonical: "/learn" },
  openGraph: {
    title: "Learn AI engineering — the full curriculum",
    description:
      "110+ free lessons across three levels. From how LLMs work to shipping production AI agents.",
    url: "/learn",
    type: "website",
  },
};

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
