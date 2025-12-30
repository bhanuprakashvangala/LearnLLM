"use client";

import * as React from "react";
import Editor from "@monaco-editor/react";
import {
  Send, Play, RotateCcw, Eye, EyeOff, Lightbulb,
  CheckCircle2, Bot, User, Loader2, AlertTriangle,
  Trophy, ChevronRight, BookOpen, GraduationCap,
  ChevronDown, ChevronUp
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface Concept {
  title: string;
  explanation: string;
}

interface ChallengeWorkspaceProps {
  challengeId: string;
  title: string;
  description: string;
  starterCode: string;
  solution: string;
  hints: string[];
  learningObjectives?: string[];
  concepts?: Concept[];
  onComplete: () => void;
}

export function ChallengeWorkspace({
  challengeId,
  title,
  description,
  starterCode,
  solution,
  hints,
  learningObjectives = [],
  concepts = [],
  onComplete,
}: ChallengeWorkspaceProps) {
  const [code, setCode] = React.useState(starterCode);
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [input, setInput] = React.useState("");
  const [isRunning, setIsRunning] = React.useState(false);
  const [isSending, setIsSending] = React.useState(false);
  const [showHint, setShowHint] = React.useState(false);
  const [currentHintIndex, setCurrentHintIndex] = React.useState(0);
  const [showSolution, setShowSolution] = React.useState(false);
  const [hasViewedSolution, setHasViewedSolution] = React.useState(false);
  const [chatEnabled, setChatEnabled] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [isCompleted, setIsCompleted] = React.useState(false);
  const [showLearn, setShowLearn] = React.useState(true);
  const [expandedConcept, setExpandedConcept] = React.useState<number | null>(0);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Extract system prompt and config from user code
  const parseUserCode = (userCode: string) => {
    try {
      // Look for systemPrompt variable (handle template literals)
      const templateMatch = userCode.match(/(?:const|let|var)\s+systemPrompt\s*=\s*`([\s\S]*?)`/);
      const stringMatch = userCode.match(/(?:const|let|var)\s+systemPrompt\s*=\s*["']([^"']+)["']/);
      const systemPrompt = templateMatch ? templateMatch[1] : (stringMatch ? stringMatch[1] : "You are a helpful assistant.");

      // Look for model variable
      const modelMatch = userCode.match(/model:\s*['"`]([^'"`]+)['"`]/);
      const model = modelMatch ? modelMatch[1] : "llama-3.1-8b-instant";

      // Look for temperature
      const tempMatch = userCode.match(/temperature:\s*([\d.]+)/);
      const temperature = tempMatch ? parseFloat(tempMatch[1]) : 0.7;

      return { systemPrompt, model, temperature };
    } catch {
      return { systemPrompt: "You are a helpful assistant.", model: "llama-3.1-8b-instant", temperature: 0.7 };
    }
  };

  const handleRun = () => {
    setIsRunning(true);
    setError(null);
    setMessages([]);

    // Validate the code has required elements
    const hasGroqImport = code.includes("groq-sdk") || code.includes("Groq");
    const hasSystemPrompt = code.includes("systemPrompt") || code.includes("system");
    const hasMessages = code.includes("messages");

    if (!hasGroqImport || !hasSystemPrompt || !hasMessages) {
      setError("Your code is missing some required parts. Make sure you have: Groq import, system prompt, and messages array.");
      setIsRunning(false);
      return;
    }

    // Enable chat after short delay
    setTimeout(() => {
      setIsRunning(false);
      setChatEnabled(true);
      setMessages([{
        role: "assistant",
        content: "Chatbot is running! Send me a message to test it."
      }]);
    }, 1000);
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isSending || !chatEnabled) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsSending(true);

    const config = parseUserCode(code);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            { role: "system", content: config.systemPrompt },
            ...messages.filter(m => m.content !== "Chatbot is running! Send me a message to test it.").map(m => ({
              role: m.role,
              content: m.content
            })),
            { role: "user", content: userMessage }
          ],
          model: "llama-3.1-8b",
          temperature: config.temperature,
          maxTokens: 512
        })
      });

      if (!response.ok) throw new Error("Failed to get response");

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let fullResponse = "";

      setMessages(prev => [...prev, { role: "assistant", content: "" }]);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.startsWith("data: ") && line.slice(6) !== "[DONE]") {
              try {
                const parsed = JSON.parse(line.slice(6));
                if (parsed.content) {
                  fullResponse += parsed.content;
                  setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1] = {
                      role: "assistant",
                      content: fullResponse
                    };
                    return newMessages;
                  });
                }
              } catch {}
            }
          }
        }
      }
    } catch (err) {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "Error: Could not get response. Check your code and try again."
      }]);
    }

    setIsSending(false);
  };

  const handleViewSolution = () => {
    setShowSolution(true);
    setHasViewedSolution(true);
  };

  const handleReset = () => {
    setCode(starterCode);
    setMessages([]);
    setChatEnabled(false);
    setError(null);
    setShowSolution(false);
    setShowHint(false);
    setCurrentHintIndex(0);
  };

  const handleComplete = () => {
    if (hasViewedSolution) {
      // Must reset if viewed solution
      handleReset();
      setHasViewedSolution(false);
      return;
    }
    setIsCompleted(true);
    onComplete();
  };

  const nextHint = () => {
    if (currentHintIndex < hints.length - 1) {
      setCurrentHintIndex(prev => prev + 1);
    }
  };

  return (
    <div className="h-[calc(100vh-200px)] min-h-[600px] flex flex-col bg-green-50 dark:bg-black rounded-xl overflow-hidden border border-green-300 dark:border-neutral-800">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-green-100 dark:bg-neutral-900 border-b border-green-300 dark:border-neutral-800">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-green-400 dark:bg-green-600" />
            <div className="w-3 h-3 rounded-full bg-green-500 dark:bg-green-500" />
            <div className="w-3 h-3 rounded-full bg-green-600 dark:bg-green-400" />
          </div>
          <span className="text-sm font-medium text-black dark:text-white">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setShowLearn(!showLearn)}
            className="text-green-700 dark:text-green-300 hover:text-green-900 dark:hover:text-green-100 hover:bg-green-200 dark:hover:bg-green-900/30"
          >
            <BookOpen className="w-4 h-4 mr-1" />
            Learn
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setShowHint(!showHint)}
            className="text-green-700 dark:text-green-300 hover:text-green-900 dark:hover:text-green-100 hover:bg-green-200 dark:hover:bg-green-900/30"
          >
            <Lightbulb className="w-4 h-4 mr-1" />
            Hint
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleViewSolution}
            className="text-green-700 dark:text-green-300 hover:text-green-900 dark:hover:text-green-100 hover:bg-green-200 dark:hover:bg-green-900/30"
          >
            {showSolution ? <EyeOff className="w-4 h-4 mr-1" /> : <Eye className="w-4 h-4 mr-1" />}
            Solution
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleReset}
            className="text-green-700 dark:text-green-300 hover:text-green-900 dark:hover:text-green-100 hover:bg-green-200 dark:hover:bg-green-900/30"
          >
            <RotateCcw className="w-4 h-4 mr-1" />
            Reset
          </Button>
        </div>
      </div>

      {/* Learning Panel */}
      {showLearn && (learningObjectives.length > 0 || concepts.length > 0) && (
        <div className="px-4 py-4 bg-green-100 dark:bg-neutral-900 border-b border-green-300 dark:border-neutral-800 max-h-[300px] overflow-y-auto">
          {/* Learning Objectives */}
          {learningObjectives.length > 0 && (
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-green-800 dark:text-green-300 flex items-center gap-2 mb-2">
                <GraduationCap className="w-4 h-4" />
                What You'll Learn
              </h3>
              <ul className="space-y-1">
                {learningObjectives.map((objective, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-black dark:text-white">
                    <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-500 mt-0.5 flex-shrink-0" />
                    {objective}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Key Concepts */}
          {concepts.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-green-800 dark:text-green-300 flex items-center gap-2 mb-2">
                <BookOpen className="w-4 h-4" />
                Key Concepts
              </h3>
              <div className="space-y-2">
                {concepts.map((concept, i) => (
                  <div key={i} className="bg-green-50 dark:bg-neutral-950 rounded-lg border border-green-300 dark:border-neutral-800">
                    <button
                      onClick={() => setExpandedConcept(expandedConcept === i ? null : i)}
                      className="w-full flex items-center justify-between px-3 py-2 text-left"
                    >
                      <span className="text-sm font-medium text-black dark:text-white">{concept.title}</span>
                      {expandedConcept === i ? (
                        <ChevronUp className="w-4 h-4 text-green-600 dark:text-green-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-green-600 dark:text-green-400" />
                      )}
                    </button>
                    {expandedConcept === i && (
                      <div className="px-3 pb-3 text-sm text-black/80 dark:text-white/80 leading-relaxed">
                        {concept.explanation}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Hint Banner */}
      {showHint && (
        <div className="px-4 py-3 bg-green-200 dark:bg-green-900/30 border-b border-green-400 dark:border-green-700/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Lightbulb className="w-5 h-5 text-green-700 dark:text-green-400" />
            <p className="text-sm text-black dark:text-white">{hints[currentHintIndex]}</p>
          </div>
          {currentHintIndex < hints.length - 1 && (
            <Button size="sm" variant="ghost" onClick={nextHint} className="text-green-700 dark:text-green-400 hover:bg-green-300 dark:hover:bg-green-800/30">
              Next hint <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          )}
        </div>
      )}

      {/* Solution Warning */}
      {hasViewedSolution && !showSolution && (
        <div className="px-4 py-2 bg-green-200 dark:bg-green-900/20 border-b border-green-400 dark:border-green-700/30 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-green-700 dark:text-green-500" />
          <p className="text-sm text-black dark:text-white">You viewed the solution. Complete without viewing to earn points.</p>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Code Editor */}
        <div className="flex-1 flex flex-col border-r border-green-300 dark:border-neutral-800">
          <div className="px-4 py-2 bg-green-100 dark:bg-neutral-900 border-b border-green-300 dark:border-neutral-800 flex items-center justify-between">
            <span className="text-xs text-green-700 dark:text-green-500 font-mono">chatbot.js</span>
            <Button
              size="sm"
              onClick={handleRun}
              disabled={isRunning}
              className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white"
            >
              {isRunning ? (
                <Loader2 className="w-4 h-4 mr-1 animate-spin" />
              ) : (
                <Play className="w-4 h-4 mr-1" />
              )}
              Run
            </Button>
          </div>

          <div className="flex-1">
            <Editor
              height="100%"
              language="javascript"
              value={showSolution ? solution : code}
              onChange={(value) => !showSolution && setCode(value || "")}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: "on",
                scrollBeyondLastLine: false,
                automaticLayout: true,
                tabSize: 2,
                wordWrap: "on",
                readOnly: showSolution,
                padding: { top: 16 },
              }}
            />
          </div>

          {error && (
            <div className="px-4 py-3 bg-green-200 dark:bg-green-900/20 border-t border-green-400 dark:border-green-700/30">
              <p className="text-sm text-black dark:text-white">{error}</p>
            </div>
          )}
        </div>

        {/* Chat Preview */}
        <div className="w-[400px] flex flex-col bg-green-50 dark:bg-black">
          <div className="px-4 py-3 bg-green-100 dark:bg-neutral-900 border-b border-green-300 dark:border-neutral-800 flex items-center gap-2">
            <Bot className="w-5 h-5 text-green-600 dark:text-green-400" />
            <span className="text-sm font-medium text-black dark:text-white">Live Preview</span>
            {chatEnabled && (
              <span className="ml-auto flex items-center gap-1 text-xs text-green-700 dark:text-green-400">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Running
              </span>
            )}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {!chatEnabled && messages.length === 0 && (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <Bot className="w-12 h-12 text-green-300 dark:text-green-800 mx-auto mb-3" />
                  <p className="text-green-700 dark:text-green-500 text-sm">Write your code and click Run</p>
                  <p className="text-green-600 dark:text-green-600 text-xs mt-1">Your chatbot will appear here</p>
                </div>
              </div>
            )}

            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.role === "user" ? "bg-green-600" : "bg-green-700"
                }`}>
                  {message.role === "user" ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>
                <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                  message.role === "user"
                    ? "bg-green-600 text-white"
                    : "bg-green-100 dark:bg-neutral-900 text-black dark:text-white border border-green-300 dark:border-neutral-800"
                }`}>
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}

            {isSending && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-green-700 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-green-100 dark:bg-neutral-900 border border-green-300 dark:border-neutral-800 rounded-2xl px-4 py-2">
                  <Loader2 className="w-4 h-4 animate-spin text-green-600 dark:text-green-400" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-green-300 dark:border-neutral-800">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
                placeholder={chatEnabled ? "Test your chatbot..." : "Run your code first"}
                disabled={!chatEnabled || isSending}
                className="flex-1 bg-white dark:bg-neutral-900 border border-green-300 dark:border-neutral-800 rounded-lg px-4 py-2 text-sm text-black dark:text-white placeholder-green-500 dark:placeholder-green-700 focus:outline-none focus:border-green-500 disabled:opacity-50"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!chatEnabled || isSending || !input.trim()}
                className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 bg-green-100 dark:bg-neutral-900 border-t border-green-300 dark:border-neutral-800 flex items-center justify-between">
        <p className="text-xs text-black/70 dark:text-white/70">{description}</p>
        {chatEnabled && messages.length > 2 && !hasViewedSolution && (
          <Button
            onClick={handleComplete}
            className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white"
          >
            <Trophy className="w-4 h-4 mr-2" />
            Complete Challenge
          </Button>
        )}
        {hasViewedSolution && (
          <Button onClick={handleReset} variant="outline" className="border-green-600 text-green-700 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/20">
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset to Try Again
          </Button>
        )}
      </div>
    </div>
  );
}
