import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
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

export const metadata: Metadata = {
  title: "LearnLLM.dev - Master Large Language Models",
  description: "Learn AI development from scratch through interactive tutorials, real-world challenges, and hands-on projects. From beginner to production-ready.",
  keywords: ["LLM", "AI", "Machine Learning", "GPT", "OpenAI", "Anthropic", "Tutorial", "Learn"],
  authors: [{ name: "LearnLLM.dev" }],
  openGraph: {
    title: "LearnLLM.dev - Master Large Language Models",
    description: "Learn AI development from scratch through interactive tutorials and challenges",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <AuthProvider>
            <ProgressProvider>
              {children}
              <Toaster />
            </ProgressProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
