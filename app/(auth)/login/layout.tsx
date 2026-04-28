import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in",
  description:
    "Sign in to LearnLLM.dev to pick up your AI engineering curriculum where you left off.",
  alternates: { canonical: "/login" },
  openGraph: {
    title: "Sign in to LearnLLM.dev",
    description: "Pick up where you left off in the AI engineering curriculum.",
    url: "/login",
    type: "website",
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
