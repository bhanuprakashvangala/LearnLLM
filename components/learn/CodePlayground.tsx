"use client";

import * as React from "react";
import Editor from "@monaco-editor/react";
import { Play, RotateCcw, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CodePlaygroundProps {
  language?: "python" | "javascript" | "typescript";
  initialCode: string;
  runnable?: boolean;
  height?: string;
  title?: string;
  expectedOutput?: string;
}

export function CodePlayground({
  language = "python",
  initialCode,
  runnable = false,
  height = "400px",
  title,
  expectedOutput,
}: CodePlaygroundProps) {
  const [code, setCode] = React.useState(initialCode);
  const [output, setOutput] = React.useState<string>("");
  const [isRunning, setIsRunning] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const handleRun = async () => {
    setIsRunning(true);
    setOutput("Running code...");

    // Simulate code execution
    setTimeout(() => {
      try {
        if (language === "python") {
          // For demo purposes, we'll just show the expected output
          // In production, you'd call a Python execution API
          if (expectedOutput) {
            setOutput(expectedOutput);
          } else {
            setOutput("# Output would appear here\n# In production, this would execute via a Python backend");
          }
        } else if (language === "javascript" || language === "typescript") {
          // For JavaScript, we can actually execute
          const originalConsoleLog = console.log;
          let logs: string[] = [];

          console.log = (...args) => {
            logs.push(args.join(" "));
          };

          try {
            // eslint-disable-next-line no-eval
            eval(code);
            setOutput(logs.join("\n") || "Code executed successfully (no output)");
          } catch (error) {
            setOutput(`Error: ${error instanceof Error ? error.message : String(error)}`);
          }

          console.log = originalConsoleLog;
        }
      } catch (error) {
        setOutput(`Error: ${error instanceof Error ? error.message : String(error)}`);
      }
      setIsRunning(false);
    }, 500);
  };

  const handleReset = () => {
    setCode(initialCode);
    setOutput("");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 border-2 border-border rounded-xl overflow-hidden bg-card">
      {/* Header */}
      <div className="bg-muted px-4 py-3 flex items-center justify-between border-b border-border">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold">{title || `${language} Playground`}</span>
          <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary font-medium">
            {language}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="h-8"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span className="ml-1">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span className="ml-1">Copy</span>
              </>
            )}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="h-8"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="ml-1">Reset</span>
          </Button>
          {runnable && (
            <Button
              variant="default"
              size="sm"
              onClick={handleRun}
              disabled={isRunning}
              className="h-8"
            >
              <Play className="w-4 h-4" />
              <span className="ml-1">{isRunning ? "Running..." : "Run Code"}</span>
            </Button>
          )}
        </div>
      </div>

      {/* Editor */}
      <div className="relative">
        <Editor
          height={height}
          language={language}
          value={code}
          onChange={(value) => setCode(value || "")}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: "on",
            padding: { top: 16, bottom: 16 },
          }}
        />
      </div>

      {/* Output */}
      {runnable && output && (
        <div className="border-t border-border">
          <div className="bg-muted px-4 py-2 text-sm font-medium border-b border-border">
            Output:
          </div>
          <pre className="p-4 bg-black text-green-400 text-sm font-mono overflow-x-auto max-h-48 overflow-y-auto">
            {output}
          </pre>
        </div>
      )}
    </div>
  );
}
