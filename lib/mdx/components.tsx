import * as React from "react";
import { ExternalLink, BookOpen, AlertCircle, Lightbulb, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { CodePlayground as CodePlaygroundComponent } from "@/components/learn/CodePlayground";
import { Quiz as QuizComponent } from "@/components/learn/Quiz";
import { ComparisonTable as ComparisonTableComponent } from "@/components/learn/ComparisonTable";

/**
 * Paper Reference Component
 * Displays research paper citations with links
 */
interface PaperReferenceProps {
  title: string;
  authors: string;
  year: number;
  link: string;
  summary?: string;
}

export function PaperReference({
  title,
  authors,
  year,
  link,
  summary,
}: PaperReferenceProps) {
  return (
    <div className="my-6 p-6 border-2 border-primary/20 rounded-xl bg-primary/5">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <BookOpen className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-lg mb-1">{title}</h4>
          <p className="text-sm text-muted-foreground mb-2">
            {authors} ({year})
          </p>
          {summary && <p className="text-sm mb-3">{summary}</p>}
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-secondary transition-colors"
          >
            Read Paper <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

/**
 * Callout Component
 * For tips, warnings, info boxes
 */
interface CalloutProps {
  type?: "info" | "tip" | "warning" | "danger";
  children: React.ReactNode;
}

export function Callout({ type = "info", children }: CalloutProps) {
  const styles = {
    info: {
      bg: "bg-blue-50 dark:bg-blue-950/30",
      border: "border-blue-200 dark:border-blue-800",
      icon: AlertCircle,
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    tip: {
      bg: "bg-green-50 dark:bg-green-950/30",
      border: "border-green-200 dark:border-green-800",
      icon: Lightbulb,
      iconColor: "text-green-600 dark:text-green-400",
    },
    warning: {
      bg: "bg-yellow-50 dark:bg-yellow-950/30",
      border: "border-yellow-200 dark:border-yellow-800",
      icon: AlertTriangle,
      iconColor: "text-yellow-600 dark:text-yellow-400",
    },
    danger: {
      bg: "bg-red-50 dark:bg-red-950/30",
      border: "border-red-200 dark:border-red-800",
      icon: AlertTriangle,
      iconColor: "text-red-600 dark:text-red-400",
    },
  };

  const style = styles[type];
  const Icon = style.icon;

  return (
    <div className={cn("my-4 p-4 rounded-lg border-2", style.bg, style.border)}>
      <div className="flex gap-3">
        <Icon className={cn("w-5 h-5 flex-shrink-0 mt-0.5", style.iconColor)} />
        <div className="flex-1 text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

// CodePlayground, Quiz, and ComparisonTable are imported from components/learn
export const CodePlayground = CodePlaygroundComponent;
export const Quiz = QuizComponent;
export const ComparisonTable = ComparisonTableComponent;

/**
 * Enhanced Code Block
 * Custom code block with syntax highlighting
 */
interface CodeProps {
  children: string;
  className?: string;
}

function Code({ children, className }: CodeProps) {
  const language = className?.replace(/language-/, "") || "";

  return (
    <div className="my-4 rounded-lg overflow-hidden border-2 border-border">
      {language && (
        <div className="bg-muted px-4 py-2 text-sm font-medium border-b border-border">
          {language}
        </div>
      )}
      <pre className="p-4 bg-card overflow-x-auto">
        <code className={className}>{children}</code>
      </pre>
    </div>
  );
}

/**
 * MDX Components Mapping
 * Custom components that replace default MDX elements
 */
export const MDXComponents = {
  // Custom Components
  PaperReference,
  Callout,
  CodePlayground,
  Quiz,
  ComparisonTable,

  // Enhanced HTML elements
  h1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="text-4xl font-bold mt-8 mb-4 pb-2 border-b border-border">
      {children}
    </h1>
  ),
  h2: ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-3xl font-bold mt-8 mb-4" id={String(children).toLowerCase().replace(/\s+/g, '-')}>
      {children}
    </h2>
  ),
  h3: ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-2xl font-bold mt-6 mb-3" id={String(children).toLowerCase().replace(/\s+/g, '-')}>
      {children}
    </h3>
  ),
  h4: ({ children }: { children: React.ReactNode }) => (
    <h4 className="text-xl font-bold mt-4 mb-2" id={String(children).toLowerCase().replace(/\s+/g, '-')}>
      {children}
    </h4>
  ),
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="my-4 leading-7 text-foreground/90">{children}</p>
  ),
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul className="my-4 ml-6 list-disc space-y-2">{children}</ul>
  ),
  ol: ({ children }: { children: React.ReactNode }) => (
    <ol className="my-4 ml-6 list-decimal space-y-2">{children}</ol>
  ),
  li: ({ children }: { children: React.ReactNode }) => (
    <li className="leading-7">{children}</li>
  ),
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <blockquote className="my-4 pl-4 border-l-4 border-primary italic text-muted-foreground">
      {children}
    </blockquote>
  ),
  code: Code,
  pre: ({ children }: { children: React.ReactNode }) => (
    <div className="my-4">{children}</div>
  ),
  a: ({ href, children }: { href?: string; children: React.ReactNode }) => (
    <a
      href={href}
      className="text-primary hover:text-secondary underline underline-offset-4 transition-colors"
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  ),
  table: ({ children }: { children: React.ReactNode }) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse border border-border">
        {children}
      </table>
    </div>
  ),
  th: ({ children }: { children: React.ReactNode }) => (
    <th className="border border-border bg-muted px-4 py-2 text-left font-bold">
      {children}
    </th>
  ),
  td: ({ children }: { children: React.ReactNode }) => (
    <td className="border border-border px-4 py-2">{children}</td>
  ),
};
