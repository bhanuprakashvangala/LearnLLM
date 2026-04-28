import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookies Policy",
  description:
    "What cookies LearnLLM.dev uses, why we use them, and how to control them.",
  alternates: { canonical: "/cookies" },
  robots: { index: true, follow: true },
};

export default function CookiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
