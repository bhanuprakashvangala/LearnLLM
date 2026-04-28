import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import { PostHogProvider } from "@/components/shared/PostHogProvider";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProgressProvider } from "@/contexts/ProgressContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://learnllm.dev";

const SITE_NAME = "LearnLLM.dev";
const SITE_TAGLINE = "Learn AI engineering, free.";
const SITE_DESCRIPTION =
  "A free, complete course on AI engineering. 110+ structured lessons that take you from how large language models actually work to shipping production AI agents — with an in-browser playground, runnable code, and zero setup.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  generator: "Next.js",
  category: "education",
  keywords: [
    "learn AI",
    "learn LLM",
    "AI engineering",
    "AI engineering tutorial",
    "large language models",
    "LLM tutorial",
    "GPT tutorial",
    "Claude tutorial",
    "Gemini tutorial",
    "AI agents tutorial",
    "agentic AI",
    "MCP",
    "Model Context Protocol",
    "Google ADK",
    "OpenAI Agents SDK",
    "CrewAI",
    "AutoGen",
    "LangChain",
    "LlamaIndex",
    "Vercel AI SDK",
    "RAG",
    "retrieval augmented generation",
    "vector databases",
    "Pinecone",
    "ChromaDB",
    "Weaviate",
    "fine-tuning LLM",
    "LoRA",
    "QLoRA",
    "RLHF",
    "DPO",
    "prompt engineering",
    "transformers",
    "neural networks",
    "machine learning tutorial",
    "deep learning tutorial",
    "free AI course",
    "Cursor",
    "Claude Code",
    "Windsurf",
    "vLLM",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    creator: "@learnllmdev",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#050505" },
  ],
  colorScheme: "light dark",
};

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/icon.svg`,
  description: SITE_DESCRIPTION,
  sameAs: ["https://github.com/bhanuprakashvangala/LearnLLM"],
};

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  inLanguage: "en-US",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/learn?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

const courseLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "AI Engineering — Complete Curriculum",
  description:
    "Free, structured curriculum covering LLMs, prompt engineering, RAG, fine-tuning, and AI agents using Google ADK, OpenAI Agents SDK, CrewAI, AutoGen, Claude, and the Model Context Protocol (MCP).",
  url: SITE_URL,
  provider: {
    "@type": "EducationalOrganization",
    name: SITE_NAME,
    sameAs: SITE_URL,
  },
  educationalLevel: "Beginner to Advanced",
  inLanguage: "en-US",
  isAccessibleForFree: true,
  hasCourseInstance: [
    {
      "@type": "CourseInstance",
      courseMode: "Online",
      courseWorkload: "PT15H",
      name: "Beginner — AI fundamentals & no-code tools",
    },
    {
      "@type": "CourseInstance",
      courseMode: "Online",
      courseWorkload: "PT45H",
      name: "Intermediate — Build AI apps, agents, and RAG",
    },
    {
      "@type": "CourseInstance",
      courseMode: "Online",
      courseWorkload: "PT70H",
      name: "Advanced — Fine-tuning, multi-agent systems, production",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Per-page canonical comes from each page's `metadata.alternates.canonical`.
            We deliberately do NOT hardcode a canonical link here, because doing so
            emits a second <link rel="canonical"> on every page — and on subpages
            it points to the homepage, which tells Google every lesson is a
            duplicate of the homepage. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(courseLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <PostHogProvider>
            <AuthProvider>
              <ProgressProvider>
                {children}
                <Toaster />
              </ProgressProvider>
            </AuthProvider>
          </PostHogProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
