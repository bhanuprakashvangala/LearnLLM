"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Editor from "@monaco-editor/react";
import {
  CheckCircle2, Circle, ChevronRight, ChevronLeft, Lightbulb,
  Play, RotateCcw, Copy, Check, Sparkles, AlertCircle, Loader2,
  Code, Terminal, BookOpen, Trophy, HelpCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Step {
  id: string;
  title: string;
  instruction: string;
  language: string;
  template: string;
  solution?: string;
  hint?: string;
  readOnly?: boolean;
  validation?: string[];
}

interface InteractiveChallengeProps {
  challengeId: string;
  challengeTitle: string;
  steps: Step[];
  onComplete: () => void;
}

export function InteractiveChallenge({
  challengeId,
  challengeTitle,
  steps,
  onComplete,
}: InteractiveChallengeProps) {
  const [currentStepIndex, setCurrentStepIndex] = React.useState(0);
  const [completedSteps, setCompletedSteps] = React.useState<Set<string>>(new Set());
  const [userCode, setUserCode] = React.useState<Record<string, string>>({});
  const [showHint, setShowHint] = React.useState(false);
  const [feedback, setFeedback] = React.useState<{ type: "success" | "error" | "info"; message: string } | null>(null);
  const [isValidating, setIsValidating] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const [aiHelp, setAiHelp] = React.useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = React.useState(false);

  const currentStep = steps[currentStepIndex];
  const isLastStep = currentStepIndex === steps.length - 1;
  const isFirstStep = currentStepIndex === 0;

  // Initialize user code with template
  React.useEffect(() => {
    if (currentStep && !userCode[currentStep.id]) {
      setUserCode(prev => ({
        ...prev,
        [currentStep.id]: currentStep.template
      }));
    }
  }, [currentStep, userCode]);

  const handleCodeChange = (value: string | undefined) => {
    if (value && currentStep) {
      setUserCode(prev => ({
        ...prev,
        [currentStep.id]: value
      }));
      setFeedback(null);
      setAiHelp(null);
    }
  };

  const validateCode = async () => {
    if (!currentStep || currentStep.readOnly) {
      // Read-only steps auto-complete
      setCompletedSteps(prev => new Set([...prev, currentStep.id]));
      setFeedback({ type: "success", message: "Step completed! Move to the next step." });
      return;
    }

    setIsValidating(true);
    setFeedback(null);

    const code = userCode[currentStep.id] || "";

    // Check if validation keywords are present
    if (currentStep.validation) {
      const missingKeywords = currentStep.validation.filter(
        keyword => !code.includes(keyword)
      );

      if (missingKeywords.length > 0) {
        setFeedback({
          type: "error",
          message: `Your code is missing some key parts. Check the blanks (_____)!`
        });
        setIsValidating(false);
        return;
      }
    }

    // Check if any blanks remain
    if (code.includes("_____")) {
      setFeedback({
        type: "error",
        message: "Fill in all the blanks (_____) before checking your answer."
      });
      setIsValidating(false);
      return;
    }

    // Use AI to validate the code
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content: `You are a code reviewer for a coding challenge. The user is completing step "${currentStep.title}" of the "${challengeTitle}" challenge.

Expected solution pattern:
${currentStep.solution || "N/A"}

Task: Check if the user's code is correct. Be encouraging but accurate.
- If correct: Start with "✅ Correct!" and briefly explain why it works
- If incorrect: Start with "❌ Not quite!" and give a specific hint without giving away the answer
Keep response under 100 words.`
            },
            {
              role: "user",
              content: `My code:\n\`\`\`${currentStep.language}\n${code}\n\`\`\``
            }
          ],
          model: "llama-3.1-8b",
          temperature: 0.3,
          maxTokens: 150
        })
      });

      if (response.ok) {
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        let fullResponse = "";

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
                  if (parsed.content) fullResponse += parsed.content;
                } catch {}
              }
            }
          }
        }

        const isCorrect = fullResponse.includes("✅") || fullResponse.toLowerCase().includes("correct");

        if (isCorrect) {
          setCompletedSteps(prev => new Set([...prev, currentStep.id]));
          setFeedback({ type: "success", message: fullResponse });
        } else {
          setFeedback({ type: "error", message: fullResponse });
        }
      } else {
        // Fallback to simple validation
        if (currentStep.solution && code.trim() === currentStep.solution.trim()) {
          setCompletedSteps(prev => new Set([...prev, currentStep.id]));
          setFeedback({ type: "success", message: "✅ Correct! Great job!" });
        } else {
          setFeedback({ type: "error", message: "❌ Not quite right. Try again or check the hint!" });
        }
      }
    } catch (error) {
      // Fallback validation
      if (currentStep.validation?.every(k => code.includes(k))) {
        setCompletedSteps(prev => new Set([...prev, currentStep.id]));
        setFeedback({ type: "success", message: "✅ Looks good! Moving on." });
      } else {
        setFeedback({ type: "error", message: "❌ Check your code and try again." });
      }
    }

    setIsValidating(false);
  };

  const getAiHelp = async () => {
    if (!currentStep) return;

    setIsAiLoading(true);
    setAiHelp(null);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content: `You are a friendly coding tutor helping with the "${challengeTitle}" challenge. The student is on step: "${currentStep.title}".

Instructions for this step: ${currentStep.instruction}

The template code has blanks (_____) to fill in. Help the student understand what goes in the blanks WITHOUT giving the direct answer. Use analogies and guide them to discover the answer themselves.

Keep response under 80 words. Be encouraging!`
            },
            {
              role: "user",
              content: `I need help with this step. Here's my current code:\n\`\`\`${currentStep.language}\n${userCode[currentStep.id] || currentStep.template}\n\`\`\`\n\nWhat should I put in the blanks?`
            }
          ],
          model: "llama-3.1-8b",
          temperature: 0.7,
          maxTokens: 120
        })
      });

      if (response.ok) {
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        let fullResponse = "";

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
                  if (parsed.content) fullResponse += parsed.content;
                } catch {}
              }
            }
          }
        }
        setAiHelp(fullResponse);
      }
    } catch (error) {
      setAiHelp("Having trouble connecting. Try using the hint button instead!");
    }

    setIsAiLoading(false);
  };

  const resetCode = () => {
    if (currentStep) {
      setUserCode(prev => ({
        ...prev,
        [currentStep.id]: currentStep.template
      }));
      setFeedback(null);
      setAiHelp(null);
    }
  };

  const copyCode = () => {
    if (currentStep) {
      navigator.clipboard.writeText(userCode[currentStep.id] || currentStep.template);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const goToNextStep = () => {
    if (!isLastStep) {
      setCurrentStepIndex(prev => prev + 1);
      setFeedback(null);
      setShowHint(false);
      setAiHelp(null);
    } else if (completedSteps.size === steps.length) {
      onComplete();
    }
  };

  const goToPrevStep = () => {
    if (!isFirstStep) {
      setCurrentStepIndex(prev => prev - 1);
      setFeedback(null);
      setShowHint(false);
      setAiHelp(null);
    }
  };

  const progress = (completedSteps.size / steps.length) * 100;

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-primary" />
            <span className="font-semibold">Interactive Challenge</span>
          </div>
          <span className="text-sm text-muted-foreground">
            Step {currentStepIndex + 1} of {steps.length}
          </span>
        </div>

        {/* Step Progress */}
        <div className="flex gap-2 mb-3">
          {steps.map((step, index) => (
            <button
              key={step.id}
              onClick={() => {
                setCurrentStepIndex(index);
                setFeedback(null);
                setShowHint(false);
                setAiHelp(null);
              }}
              className={`flex-1 h-2 rounded-full transition-all ${
                completedSteps.has(step.id)
                  ? "bg-green-500"
                  : index === currentStepIndex
                    ? "bg-primary"
                    : "bg-muted"
              }`}
            />
          ))}
        </div>

        {/* Step Title */}
        <div className="flex items-center gap-2">
          {completedSteps.has(currentStep?.id || "") ? (
            <CheckCircle2 className="w-5 h-5 text-green-500" />
          ) : (
            <Circle className="w-5 h-5 text-muted-foreground" />
          )}
          <h3 className="font-medium">{currentStep?.title}</h3>
        </div>
      </Card>

      {/* Instruction */}
      <Card className="p-5 bg-gradient-to-r from-blue-500/5 to-purple-500/5 border-primary/20">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h4 className="font-medium mb-1">Instructions</h4>
            <p className="text-muted-foreground text-sm">{currentStep?.instruction}</p>
          </div>
        </div>
      </Card>

      {/* Code Editor */}
      <Card className="overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 bg-muted/50 border-b">
          <div className="flex items-center gap-2">
            <Code className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">{currentStep?.language}</span>
            {currentStep?.readOnly && (
              <span className="text-xs px-2 py-0.5 bg-muted rounded">Read Only</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={resetCode} className="h-8">
              <RotateCcw className="w-4 h-4 mr-1" />
              Reset
            </Button>
            <Button variant="ghost" size="sm" onClick={copyCode} className="h-8">
              {copied ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
              {copied ? "Copied!" : "Copy"}
            </Button>
          </div>
        </div>

        <div className="h-[300px]">
          <Editor
            height="100%"
            language={currentStep?.language === "bash" ? "shell" : currentStep?.language || "javascript"}
            value={userCode[currentStep?.id || ""] || currentStep?.template || ""}
            onChange={handleCodeChange}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: "on",
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 2,
              readOnly: currentStep?.readOnly || false,
              wordWrap: "on",
            }}
          />
        </div>
      </Card>

      {/* Feedback */}
      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <Card className={`p-4 ${
              feedback.type === "success"
                ? "bg-green-500/10 border-green-500/30"
                : feedback.type === "error"
                  ? "bg-red-500/10 border-red-500/30"
                  : "bg-blue-500/10 border-blue-500/30"
            }`}>
              <div className="flex items-start gap-3">
                {feedback.type === "success" ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                ) : feedback.type === "error" ? (
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                ) : (
                  <Sparkles className="w-5 h-5 text-blue-500 flex-shrink-0" />
                )}
                <p className="text-sm">{feedback.message}</p>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Help */}
      <AnimatePresence>
        {aiHelp && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <Card className="p-4 bg-purple-500/10 border-purple-500/30">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-purple-500" />
                </div>
                <div>
                  <p className="text-xs text-purple-600 dark:text-purple-400 font-medium mb-1">AI Tutor</p>
                  <p className="text-sm">{aiHelp}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hint */}
      <AnimatePresence>
        {showHint && currentStep?.hint && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <Card className="p-4 bg-amber-500/10 border-amber-500/30">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <p className="text-sm">{currentStep.hint}</p>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {currentStep?.hint && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowHint(!showHint)}
              className="gap-2"
            >
              <Lightbulb className="w-4 h-4" />
              {showHint ? "Hide Hint" : "Show Hint"}
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={getAiHelp}
            disabled={isAiLoading}
            className="gap-2"
          >
            {isAiLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <HelpCircle className="w-4 h-4" />
            )}
            Ask AI
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={goToPrevStep}
            disabled={isFirstStep}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </Button>

          {!currentStep?.readOnly && !completedSteps.has(currentStep?.id || "") && (
            <Button
              onClick={validateCode}
              disabled={isValidating}
              className="gap-2"
            >
              {isValidating ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Play className="w-4 h-4" />
              )}
              Check Answer
            </Button>
          )}

          {(completedSteps.has(currentStep?.id || "") || currentStep?.readOnly) && (
            <Button onClick={goToNextStep} className="gap-2">
              {isLastStep ? (
                <>
                  <Trophy className="w-4 h-4" />
                  Complete Challenge
                </>
              ) : (
                <>
                  Next Step
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
