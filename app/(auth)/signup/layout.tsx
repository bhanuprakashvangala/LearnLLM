import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create a free account",
  description:
    "Sign up free for LearnLLM.dev to track your progress through 110+ AI engineering lessons. No credit card. No course fees.",
  alternates: { canonical: "/signup" },
  openGraph: {
    title: "Create a free LearnLLM.dev account",
    description:
      "Sign up free to start the AI engineering curriculum. Track progress across every device.",
    url: "/signup",
    type: "website",
  },
};

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
