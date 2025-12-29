"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle, X, Send, Bot, User, Sparkles, Loader2, Minimize2, Maximize2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChallengeAssistantProps {
  challengeTitle: string;
  challengeDescription: string;
  skills: string[];
}

export function ChallengeAssistant({
  challengeTitle,
  challengeDescription,
  skills,
}: ChallengeAssistantProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isMinimized, setIsMinimized] = React.useState(false);
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [input, setInput] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const systemPrompt = `You are an AI learning assistant helping a student complete a coding challenge. Be encouraging, helpful, and educational.

Challenge: ${challengeTitle}
Description: ${challengeDescription}
Skills being practiced: ${skills.join(", ")}

Guidelines:
- Help the student understand concepts, don't just give them the answer
- Provide hints and explanations that guide them to the solution
- If they're stuck, break down the problem into smaller steps
- Suggest relevant resources or documentation when appropriate
- Keep responses concise but helpful (2-3 paragraphs max)
- Use code examples when relevant, but explain what the code does
- Be encouraging and celebrate their progress`;

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const allMessages = [
        { role: "system", content: systemPrompt },
        ...messages.map(m => ({ role: m.role, content: m.content })),
        { role: "user", content: input }
      ];

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: allMessages,
          model: "llama-3.1-8b", // Use faster model for assistant
          temperature: 0.7,
          maxTokens: 512,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to get response");
      }

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) throw new Error("No response body");

      let fullResponse = "";
      const assistantMessage: Message = { role: "assistant", content: "" };
      setMessages(prev => [...prev, assistantMessage]);

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
                setMessages(prev => {
                  const newMessages = [...prev];
                  newMessages[newMessages.length - 1] = {
                    role: "assistant",
                    content: fullResponse
                  };
                  return newMessages;
                });
              }
            } catch {
              // Skip invalid JSON
            }
          }
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const suggestedQuestions = [
    "How do I get started?",
    "Can you explain the first step?",
    "What tools should I use?",
    "I'm stuck, can you help?",
  ];

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-primary to-purple-600 text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all flex items-center justify-center"
          >
            <MessageCircle className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`fixed z-50 ${
              isMinimized
                ? "bottom-6 right-6 w-72"
                : "bottom-6 right-6 w-[400px] max-w-[calc(100vw-3rem)]"
            }`}
          >
            <Card className="overflow-hidden shadow-2xl border-2 border-primary/20">
              {/* Header */}
              <div className="bg-gradient-to-r from-primary to-purple-600 p-4 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <Bot className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Challenge Assistant</h3>
                      <p className="text-xs text-white/80">Powered by Llama 3.1</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-white hover:bg-white/20"
                      onClick={() => setIsMinimized(!isMinimized)}
                    >
                      {isMinimized ? (
                        <Maximize2 className="w-4 h-4" />
                      ) : (
                        <Minimize2 className="w-4 h-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-white hover:bg-white/20"
                      onClick={() => setIsOpen(false)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {!isMinimized && (
                <>
                  {/* Messages */}
                  <div className="h-80 overflow-y-auto p-4 space-y-4 bg-muted/30">
                    {messages.length === 0 ? (
                      <div className="text-center py-8">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                          <Sparkles className="w-8 h-8 text-primary" />
                        </div>
                        <h4 className="font-medium mb-2">Need help with this challenge?</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                          Ask me anything about {challengeTitle}
                        </p>
                        <div className="flex flex-wrap gap-2 justify-center">
                          {suggestedQuestions.map((q) => (
                            <button
                              key={q}
                              onClick={() => {
                                setInput(q);
                              }}
                              className="text-xs px-3 py-1.5 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors"
                            >
                              {q}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      messages.map((message, index) => (
                        <div
                          key={index}
                          className={`flex gap-3 ${
                            message.role === "user" ? "justify-end" : "justify-start"
                          }`}
                        >
                          {message.role === "assistant" && (
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <Bot className="w-4 h-4 text-primary" />
                            </div>
                          )}
                          <div
                            className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                              message.role === "user"
                                ? "bg-primary text-primary-foreground"
                                : "bg-card border"
                            }`}
                          >
                            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                          </div>
                          {message.role === "user" && (
                            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                              <User className="w-4 h-4" />
                            </div>
                          )}
                        </div>
                      ))
                    )}
                    {isLoading && messages[messages.length - 1]?.role === "user" && (
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Bot className="w-4 h-4 text-primary" />
                        </div>
                        <div className="bg-card border rounded-2xl px-4 py-2.5">
                          <Loader2 className="w-4 h-4 animate-spin text-primary" />
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input */}
                  <div className="p-4 border-t bg-card">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask a question..."
                        className="flex-1 px-4 py-2.5 rounded-xl border bg-background focus:border-primary focus:outline-none text-sm"
                        disabled={isLoading}
                      />
                      <Button
                        onClick={handleSend}
                        disabled={!input.trim() || isLoading}
                        size="icon"
                        className="h-10 w-10 rounded-xl"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
