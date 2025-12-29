"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  Play, Save, Share2, Download, RotateCcw, Settings,
  Code, MessageSquare, Sparkles, Zap, Copy, Check,
  ChevronDown, Info, Terminal, Wand2, Brain, Clock,
  Lock, ArrowRight, Layers, AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const models = [
  { id: "llama-3.3-70b", name: "Llama 3.3 70B", provider: "Meta (via Groq)", badge: "Most Capable" },
  { id: "llama-3.1-8b", name: "Llama 3.1 8B", provider: "Meta (via Groq)", badge: "Fast" },
  { id: "mixtral-8x7b", name: "Mixtral 8x7B", provider: "Mistral (via Groq)", badge: "Balanced" },
  { id: "gemma2-9b", name: "Gemma 2 9B", provider: "Google (via Groq)", badge: "Efficient" },
];

const promptTemplates = [
  {
    name: "Explain Like I'm 5",
    prompt: "Explain [topic] in simple terms that a 5-year-old could understand.",
    category: "Education",
    icon: "📚"
  },
  {
    name: "Code Review",
    prompt: "Review this code and suggest improvements:\n\n[paste code here]",
    category: "Coding",
    icon: "👨‍💻"
  },
  {
    name: "Brainstorm Ideas",
    prompt: "Generate 10 creative ideas for [topic/problem]",
    category: "Creative",
    icon: "💡"
  },
  {
    name: "Summarize Article",
    prompt: "Summarize this article in 3 bullet points:\n\n[paste article]",
    category: "Productivity",
    icon: "📝"
  },
  {
    name: "Debug Code",
    prompt: "Help me debug this code. What's wrong and how to fix it?\n\n[paste code]",
    category: "Coding",
    icon: "🐛"
  },
  {
    name: "Write Documentation",
    prompt: "Write clear documentation for the following code/API:\n\n[paste code]",
    category: "Documentation",
    icon: "📖"
  },
];

export default function PlaygroundPage() {
  const { data: session } = useSession();
  const [prompt, setPrompt] = React.useState("");
  const [systemPrompt, setSystemPrompt] = React.useState("You are a helpful AI assistant.");
  const [response, setResponse] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [temperature, setTemperature] = React.useState(0.7);
  const [maxTokens, setMaxTokens] = React.useState(1024);
  const [model, setModel] = React.useState("llama-3.3-70b");
  const [showSettings, setShowSettings] = React.useState(true);
  const [copied, setCopied] = React.useState(false);
  const [showTemplates, setShowTemplates] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const handleRun = async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    setResponse("");
    setError(null);

    try {
      const messages = [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt }
      ];

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages,
          model,
          temperature,
          maxTokens,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to generate response");
      }

      // Handle streaming response
      const reader = res.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error("No response body");
      }

      let fullResponse = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") continue;

            try {
              const parsed = JSON.parse(data);
              if (parsed.content) {
                fullResponse += parsed.content;
                setResponse(fullResponse);
              }
            } catch {
              // Skip invalid JSON
            }
          }
        }
      }
    } catch (err) {
      console.error("Error:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setPrompt("");
    setResponse("");
    setError(null);
    setSystemPrompt("You are a helpful AI assistant.");
    setTemperature(0.7);
    setMaxTokens(1024);
  };

  const selectedModel = models.find(m => m.id === model);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10 border-b border-border">
        <div className="container mx-auto px-4 py-6 md:py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-lg">
                  <Terminal className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">AI Playground</h1>
                  <p className="text-sm text-muted-foreground">
                    Experiment with free AI models powered by Groq
                  </p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={handleReset} className="gap-2">
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Save className="w-4 h-4" />
                  Save
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="w-4 h-4" />
                  Export
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* Free AI Banner */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Card className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <Zap className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <h3 className="font-semibold text-green-700 dark:text-green-400">Free AI Models</h3>
                <p className="text-sm text-muted-foreground">
                  Powered by Groq - ultra-fast inference with Llama 3.3, Mixtral, and Gemma models
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Left Sidebar - Templates & Settings */}
          <div className="xl:col-span-1 space-y-6">
            {/* Templates */}
            <Card className="overflow-hidden">
              <button
                onClick={() => setShowTemplates(!showTemplates)}
                className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
              >
                <h3 className="font-semibold flex items-center gap-2">
                  <Wand2 className="w-4 h-4 text-primary" />
                  Prompt Templates
                </h3>
                <ChevronDown className={`w-4 h-4 transition-transform ${showTemplates ? "rotate-180" : ""}`} />
              </button>

              {showTemplates && (
                <div className="px-4 pb-4 space-y-2">
                  {promptTemplates.map((template) => (
                    <button
                      key={template.name}
                      onClick={() => setPrompt(template.prompt)}
                      className="w-full text-left p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all group"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">{template.icon}</span>
                        <span className="font-medium text-sm group-hover:text-primary transition-colors">
                          {template.name}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground px-2 py-0.5 bg-muted rounded">
                        {template.category}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </Card>

            {/* Settings */}
            <Card className="overflow-hidden">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
              >
                <h3 className="font-semibold flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Model Settings
                </h3>
                <ChevronDown className={`w-4 h-4 transition-transform ${showSettings ? "rotate-180" : ""}`} />
              </button>

              {showSettings && (
                <div className="px-4 pb-4 space-y-5">
                  {/* Model Selection */}
                  <div>
                    <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                      <Brain className="w-4 h-4 text-muted-foreground" />
                      Model
                    </label>
                    <select
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      className="w-full h-11 px-3 rounded-lg border border-border bg-background hover:border-primary transition-colors cursor-pointer"
                    >
                      {models.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.name} ({m.badge})
                        </option>
                      ))}
                    </select>
                    {selectedModel && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {selectedModel.provider}
                      </p>
                    )}
                  </div>

                  {/* Temperature */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-muted-foreground" />
                        Temperature
                      </label>
                      <span className="text-sm font-mono bg-muted px-2 py-0.5 rounded">{temperature}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={temperature}
                      onChange={(e) => setTemperature(parseFloat(e.target.value))}
                      className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer accent-primary"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>Precise</span>
                      <span>Balanced</span>
                      <span>Creative</span>
                    </div>
                  </div>

                  {/* Max Tokens */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <Layers className="w-4 h-4 text-muted-foreground" />
                        Max Tokens
                      </label>
                      <span className="text-sm font-mono bg-muted px-2 py-0.5 rounded">{maxTokens}</span>
                    </div>
                    <input
                      type="range"
                      min="256"
                      max="4096"
                      step="256"
                      value={maxTokens}
                      onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                      className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer accent-primary"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>Short</span>
                      <span>Medium</span>
                      <span>Long</span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="pt-3 border-t border-border">
                    <div className="flex items-start gap-2 text-xs text-muted-foreground p-3 bg-muted/50 rounded-lg">
                      <Info className="w-4 h-4 flex-shrink-0 mt-0.5 text-primary" />
                      <p>
                        Lower temperature = more focused and deterministic responses.
                        Higher temperature = more creative and varied outputs.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* Main Area - Prompt & Response */}
          <div className="xl:col-span-3 space-y-6">
            {/* System Prompt */}
            <Card className="p-5">
              <label className="text-sm font-semibold mb-3 block flex items-center gap-2">
                <Code className="w-4 h-4 text-primary" />
                System Prompt
                <span className="text-xs font-normal text-muted-foreground ml-2">
                  (Define the AI&apos;s behavior)
                </span>
              </label>
              <textarea
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                className="w-full h-24 px-4 py-3 rounded-xl border-2 border-border bg-muted/30 resize-none font-mono text-sm focus:border-primary focus:outline-none transition-colors"
                placeholder="Define the AI's behavior and context..."
              />
            </Card>

            {/* User Prompt */}
            <Card className="p-5">
              <label className="text-sm font-semibold mb-3 block flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-primary" />
                Your Prompt
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full h-40 md:h-48 px-4 py-3 rounded-xl border-2 border-border bg-muted/30 resize-none font-mono text-sm focus:border-primary focus:outline-none transition-colors"
                placeholder="Enter your prompt here... Try using one of the templates on the left!"
              />

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-4">
                <Button
                  onClick={handleRun}
                  disabled={isLoading || !prompt.trim()}
                  size="lg"
                  className="flex-1 sm:flex-none h-12 px-8 group font-semibold"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5 mr-2" />
                      Run Prompt
                      <Zap className="w-4 h-4 ml-2 group-hover:scale-110 transition-transform" />
                    </>
                  )}
                </Button>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>Powered by Groq (ultra-fast)</span>
                </div>
              </div>
            </Card>

            {/* Error Display */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="p-4 bg-red-500/10 border-red-500/30">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-red-700 dark:text-red-400">Error</h4>
                      <p className="text-sm text-muted-foreground mt-1">{error}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Response */}
            {(response || isLoading) && !error && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="p-5 border-2 border-primary/20">
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-sm font-semibold flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-primary" />
                      AI Response
                      {response && !isLoading && (
                        <span className="text-xs font-normal text-muted-foreground ml-2">
                          (~{Math.round(response.length / 4)} tokens)
                        </span>
                      )}
                    </label>
                    {response && !isLoading && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCopy}
                        className="gap-2"
                      >
                        {copied ? (
                          <>
                            <Check className="w-4 h-4 text-green-500" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            Copy
                          </>
                        )}
                      </Button>
                    )}
                  </div>

                  <div className="min-h-[200px] p-5 rounded-xl bg-gradient-to-br from-muted/50 to-muted/30 border border-border">
                    {isLoading && !response ? (
                      <div className="flex items-center justify-center h-48">
                        <div className="text-center">
                          <div className="w-10 h-10 border-3 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
                          <p className="text-sm text-muted-foreground">Generating response...</p>
                          <p className="text-xs text-muted-foreground mt-1">Using {selectedModel?.name}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="prose prose-sm dark:prose-invert max-w-none">
                        <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed">
                          {response}
                          {isLoading && <span className="inline-block w-2 h-4 bg-primary animate-pulse ml-1" />}
                        </pre>
                      </div>
                    )}
                  </div>

                  {response && !isLoading && (
                    <div className="mt-4 p-4 bg-primary/5 rounded-xl border border-primary/10">
                      <div className="flex flex-wrap gap-4 text-xs">
                        <div className="flex items-center gap-2">
                          <Brain className="w-4 h-4 text-primary" />
                          <span className="text-muted-foreground">Model:</span>
                          <span className="font-medium">{selectedModel?.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-primary" />
                          <span className="text-muted-foreground">Temperature:</span>
                          <span className="font-medium">{temperature}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Layers className="w-4 h-4 text-primary" />
                          <span className="text-muted-foreground">Tokens:</span>
                          <span className="font-medium">~{Math.round(response.length / 4)}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </Card>
              </motion.div>
            )}

            {/* Not logged in CTA */}
            {!session && (
              <Card className="p-6 bg-gradient-to-r from-primary/10 to-purple-500/10 border-primary/30">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                      <Lock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Save Your Experiments</h3>
                      <p className="text-muted-foreground text-sm">Sign in to save prompts, history, and unlock all features</p>
                    </div>
                  </div>
                  <Button asChild>
                    <Link href="/login">
                      Sign In
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
