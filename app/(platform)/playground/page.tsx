"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Play, Save, Share2, Download, RotateCcw, Settings,
  Code, MessageSquare, Sparkles, Zap, Copy, Check,
  ChevronDown, Info, Terminal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function PlaygroundPage() {
  const [prompt, setPrompt] = React.useState("");
  const [systemPrompt, setSystemPrompt] = React.useState("You are a helpful AI assistant.");
  const [response, setResponse] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [temperature, setTemperature] = React.useState(0.7);
  const [maxTokens, setMaxTokens] = React.useState(500);
  const [model, setModel] = React.useState("gpt-4");
  const [showSettings, setShowSettings] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const handleRun = async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    setResponse("");

    // Simulate AI response
    setTimeout(() => {
      setResponse(
        `This is a simulated response to your prompt. In a real implementation, this would call the ${model} API with:\n\n` +
        `System: ${systemPrompt}\n` +
        `Prompt: ${prompt}\n` +
        `Temperature: ${temperature}\n` +
        `Max Tokens: ${maxTokens}\n\n` +
        `The response would appear here with proper formatting and streaming support.`
      );
      setIsLoading(false);
    }, 2000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setPrompt("");
    setResponse("");
    setSystemPrompt("You are a helpful AI assistant.");
    setTemperature(0.7);
    setMaxTokens(500);
  };

  const promptTemplates = [
    {
      name: "Explain Like I'm 5",
      prompt: "Explain [topic] in simple terms that a 5-year-old could understand.",
      category: "Education"
    },
    {
      name: "Code Review",
      prompt: "Review this code and suggest improvements:\n\n[paste code here]",
      category: "Coding"
    },
    {
      name: "Brainstorm Ideas",
      prompt: "Generate 10 creative ideas for [topic/problem]",
      category: "Creative"
    },
    {
      name: "Summarize Article",
      prompt: "Summarize this article in 3 bullet points:\n\n[paste article]",
      category: "Productivity"
    },
    {
      name: "Debug Code",
      prompt: "Help me debug this code. What's wrong and how to fix it?\n\n[paste code]",
      category: "Coding"
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 via-purple-500/10 to-primary/10 border-b border-border">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <Terminal className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">AI Playground</h1>
                <p className="text-sm text-muted-foreground">
                  Experiment with AI prompts and parameters in real-time
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2 mt-4">
              <Button variant="outline" size="sm" onClick={handleReset}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
              <Button variant="outline" size="sm">
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar - Templates */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                Prompt Templates
              </h3>
              <div className="space-y-2">
                {promptTemplates.map((template) => (
                  <button
                    key={template.name}
                    onClick={() => setPrompt(template.prompt)}
                    className="w-full text-left p-3 rounded-lg border border-border hover:bg-muted transition-colors group"
                  >
                    <div className="font-medium text-sm mb-1 group-hover:text-primary transition-colors">
                      {template.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {template.category}
                    </div>
                  </button>
                ))}
              </div>
            </Card>

            {/* Settings */}
            <Card className="p-4">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="w-full flex items-center justify-between mb-3"
              >
                <h3 className="font-semibold flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Model Settings
                </h3>
                <ChevronDown className={`w-4 h-4 transition-transform ${showSettings ? "rotate-180" : ""}`} />
              </button>

              {showSettings && (
                <div className="space-y-4">
                  {/* Model Selection */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Model</label>
                    <select
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      className="w-full h-10 px-3 rounded-lg border border-border bg-background"
                    >
                      <option value="gpt-4">GPT-4 (Most Capable)</option>
                      <option value="gpt-4-turbo">GPT-4 Turbo</option>
                      <option value="gpt-3.5-turbo">GPT-3.5 Turbo (Faster)</option>
                      <option value="claude-3-opus">Claude 3 Opus</option>
                      <option value="claude-3-sonnet">Claude 3 Sonnet</option>
                    </select>
                  </div>

                  {/* Temperature */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium">Temperature</label>
                      <span className="text-sm text-muted-foreground">{temperature}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="2"
                      step="0.1"
                      value={temperature}
                      onChange={(e) => setTemperature(parseFloat(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>Focused</span>
                      <span>Creative</span>
                    </div>
                  </div>

                  {/* Max Tokens */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium">Max Tokens</label>
                      <span className="text-sm text-muted-foreground">{maxTokens}</span>
                    </div>
                    <input
                      type="range"
                      min="100"
                      max="4000"
                      step="100"
                      value={maxTokens}
                      onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>100</span>
                      <span>4000</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-border">
                    <div className="flex items-start gap-2 text-xs text-muted-foreground">
                      <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <p>
                        Temperature controls randomness. Lower values make output more focused and deterministic.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* Main Area - Prompt & Response */}
          <div className="lg:col-span-2 space-y-6">
            {/* System Prompt */}
            <Card className="p-4">
              <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                <Code className="w-4 h-4" />
                System Prompt
              </label>
              <textarea
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                className="w-full h-20 px-3 py-2 rounded-lg border border-border bg-background resize-none font-mono text-sm"
                placeholder="Define the AI's behavior and context..."
              />
            </Card>

            {/* User Prompt */}
            <Card className="p-4">
              <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Your Prompt
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full h-48 px-3 py-2 rounded-lg border border-border bg-background resize-none font-mono text-sm"
                placeholder="Enter your prompt here..."
              />

              <div className="flex items-center gap-2 mt-4">
                <Button
                  onClick={handleRun}
                  disabled={isLoading || !prompt.trim()}
                  className="flex-1 group"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Run Prompt
                      <Zap className="w-4 h-4 ml-2 group-hover:scale-110 transition-transform" />
                    </>
                  )}
                </Button>
              </div>
            </Card>

            {/* Response */}
            {(response || isLoading) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-primary" />
                      AI Response
                    </label>
                    {response && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleCopy}
                      >
                        {copied ? (
                          <>
                            <Check className="w-4 h-4 mr-2" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4 mr-2" />
                            Copy
                          </>
                        )}
                      </Button>
                    )}
                  </div>

                  <div className="min-h-[200px] p-4 rounded-lg bg-muted/50 border border-border">
                    {isLoading ? (
                      <div className="flex items-center justify-center h-48">
                        <div className="text-center">
                          <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-3" />
                          <p className="text-sm text-muted-foreground">Generating response...</p>
                        </div>
                      </div>
                    ) : (
                      <pre className="whitespace-pre-wrap font-mono text-sm">
                        {response}
                      </pre>
                    )}
                  </div>

                  {response && (
                    <div className="mt-3 p-3 bg-primary/5 rounded-lg flex items-start gap-2 text-xs">
                      <Info className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <div className="text-muted-foreground">
                        <strong className="text-foreground">Tokens used:</strong> ~{Math.round(response.length / 4)} tokens
                        <br />
                        <strong className="text-foreground">Model:</strong> {model}
                        <br />
                        <strong className="text-foreground">Temperature:</strong> {temperature}
                      </div>
                    </div>
                  )}
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
