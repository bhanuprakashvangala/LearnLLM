import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the LearnLLM.dev team — bug reports, lesson requests, partnerships, press, or just to say hi.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact · LearnLLM.dev",
    description:
      "Reach the LearnLLM.dev team for feedback, lesson requests, partnerships, or support.",
    url: "/contact",
    type: "website",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
