import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "LearnLLM.dev is a free, complete curriculum on AI engineering — from how large language models actually work to shipping production AI agents. Built by practicing engineers, free to use, free forever.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About · LearnLLM.dev",
    description:
      "Why LearnLLM.dev exists, who it's for, and how the curriculum is structured.",
    url: "/about",
    type: "website",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
