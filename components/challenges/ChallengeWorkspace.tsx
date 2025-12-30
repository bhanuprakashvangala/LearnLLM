"use client";

import * as React from "react";
import Editor from "@monaco-editor/react";
import {
  Send, Play, RotateCcw, Eye, EyeOff, Lightbulb,
  CheckCircle2, Bot, User, Loader2, AlertTriangle,
  Sparkles, Trophy, ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChallengeWorkspaceProps {
  challengeId: string;
  title: string;
  description: string;
  starterCode: string;
  solution: string;
  hints: string[];
  onComplete: () => void;
}

export function ChallengeWorkspace({
  challengeId,
  title,
  description,
  starterCode,
  solution,
  hints,
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
      // Look for systemPrompt variable
      const systemMatch = userCode.match(/(?:const|let|var)\s+systemPrompt\s*=\s*[`"']([^`"']+)[`"']/);
      const systemPrompt = systemMatch ? systemMatch[1] : "You are a helpful assistant.";

      // Look for model variable
      const modelMatch = userCode.match(/model:\s*[`"']([^`"']+)[`"']/);
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
    <div className="h-[calc(100vh-200px)] min-h-[600px] flex flex-col bg-[#0d1117] rounded-xl overflow-hidden border border-[#30363d]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-[#30363d]">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </div>
          <span className="text-sm font-medium text-gray-300">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setShowHint(!showHint)}
            className="text-gray-400 hover:text-yellow-400 hover:bg-yellow-400/10"
          >
            <Lightbulb className="w-4 h-4 mr-1" />
            Hint
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleViewSolution}
            className="text-gray-400 hover:text-blue-400 hover:bg-blue-400/10"
          >
            {showSolution ? <EyeOff className="w-4 h-4 mr-1" /> : <Eye className="w-4 h-4 mr-1" />}
            Solution
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleReset}
            className="text-gray-400 hover:text-red-400 hover:bg-red-400/10"
          >
            <RotateCcw className="w-4 h-4 mr-1" />
            Reset
          </Button>
        </div>
      </div>

      {/* Hint Banner */}
      {showHint && (
        <div className="px-4 py-3 bg-yellow-500/10 border-b border-yellow-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Lightbulb className="w-5 h-5 text-yellow-500" />
            <p className="text-sm text-yellow-200">{hints[currentHintIndex]}</p>
          </div>
          {currentHintIndex < hints.length - 1 && (
            <Button size="sm" variant="ghost" onClick={nextHint} className="text-yellow-400">
              Next hint <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          )}
        </div>
      )}

      {/* Solution Warning */}
      {hasViewedSolution && !showSolution && (
        <div className="px-4 py-2 bg-orange-500/10 border-b border-orange-500/20 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-orange-500" />
          <p className="text-sm text-orange-300">You viewed the solution. Complete without viewing to earn points.</p>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Code Editor */}
        <div className="flex-1 flex flex-col border-r border-[#30363d]">
          <div className="px-4 py-2 bg-[#161b22] border-b border-[#30363d] flex items-center justify-between">
            <span className="text-xs text-gray-500 font-mono">chatbot.js</span>
            <Button
              size="sm"
              onClick={handleRun}
              disabled={isRunning}
              className="bg-green-600 hover:bg-green-700 text-white"
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
            <div className="px-4 py-3 bg-red-500/10 border-t border-red-500/20">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}
        </div>

        {/* Chat Preview */}
        <div className="w-[400px] flex flex-col bg-[#0d1117]">
          <div className="px-4 py-3 bg-[#161b22] border-b border-[#30363d] flex items-center gap-2">
            <Bot className="w-5 h-5 text-purple-400" />
            <span className="text-sm font-medium text-gray-300">Live Preview</span>
            {chatEnabled && (
              <span className="ml-auto flex items-center gap-1 text-xs text-green-400">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Running
              </span>
            )}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {!chatEnabled && messages.length === 0 && (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <Bot className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-500 text-sm">Write your code and click Run</p>
                  <p className="text-gray-600 text-xs mt-1">Your chatbot will appear here</p>
                </div>
              </div>
            )}

            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.role === "user" ? "bg-blue-600" : "bg-purple-600"
                }`}>
                  {message.role === "user" ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>
                <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                  message.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-[#1c2128] text-gray-200 border border-[#30363d]"
                }`}>
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}

            {isSending && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-[#1c2128] border border-[#30363d] rounded-2xl px-4 py-2">
                  <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-[#30363d]">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
                placeholder={chatEnabled ? "Test your chatbot..." : "Run your code first"}
                disabled={!chatEnabled || isSending}
                className="flex-1 bg-[#1c2128] border border-[#30363d] rounded-lg px-4 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-500 disabled:opacity-50"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!chatEnabled || isSending || !input.trim()}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 bg-[#161b22] border-t border-[#30363d] flex items-center justify-between">
        <p className="text-xs text-gray-500">{description}</p>
        {chatEnabled && messages.length > 2 && !hasViewedSolution && (
          <Button
            onClick={handleComplete}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
          >
            <Trophy className="w-4 h-4 mr-2" />
            Complete Challenge
          </Button>
        )}
        {hasViewedSolution && (
          <Button onClick={handleReset} variant="outline" className="border-orange-500 text-orange-400 hover:bg-orange-500/10">
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset to Try Again
          </Button>
        )}
      </div>
    </div>
  );
}
