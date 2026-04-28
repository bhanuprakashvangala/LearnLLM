"use client";

import * as React from "react";
import { SectionWithMockup } from "@/components/ui/section-with-mockup";
import { motion } from "framer-motion";

/**
 * Three mockup sections for the landing page, each with a live,
 * in-browser "product screenshot" rendered as JSX — no external images,
 * no broken links. These sit between the hero and the curriculum /
 * tools sections to give the landing a tangible "this is what you
 * actually get" moment.
 */

/* ─────────────────────────────────────────────── lesson preview */
function LessonMockup() {
  return (
    <div className="h-full w-full p-5 md:p-7 flex flex-col text-white">
      {/* chrome */}
      <div className="flex items-center justify-between mb-5 text-[10px] font-mono uppercase tracking-widest text-white/40">
        <span>learnllm.dev/learn/beginner</span>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          lesson 03 of 25
        </span>
      </div>

      {/* module breadcrumb */}
      <div className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 mb-2">
        Foundations
      </div>
      <h3 className="text-xl md:text-[22px] font-bold leading-tight mb-2">
        Deep Learning &amp; Neural Networks
      </h3>
      <p className="text-xs md:text-[13px] text-white/55 leading-relaxed mb-5">
        A stack of filters. Each layer transforms the input a little more abstractly than the last.
      </p>

      {/* tiny inline "figure" — layers stacking up */}
      <div className="flex-1 flex flex-col items-center justify-end gap-2 min-h-0">
        <div className="text-[9px] font-mono text-white/40 mb-1">"golden retriever"</div>
        {[
          { label: "layer 3 — objects", opacity: 1 },
          { label: "layer 2 — shapes", opacity: 0.75 },
          { label: "layer 1 — edges", opacity: 0.5 },
          { label: "pixels · audio · text", opacity: 0.3 },
        ].map((row, i) => (
          <motion.div
            key={row.label}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: row.opacity, x: 0 }}
            transition={{ delay: i * 0.12, duration: 0.5 }}
            viewport={{ once: true }}
            className="w-full rounded border border-emerald-500/30 bg-emerald-500/[0.06] text-[10px] font-mono text-white/80 px-3 py-1.5"
          >
            {row.label}
          </motion.div>
        ))}
      </div>

      {/* progress bar */}
      <div className="mt-5 h-0.5 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "48%" }}
          transition={{ duration: 1.4, ease: "easeOut", delay: 0.3 }}
          viewport={{ once: true }}
          className="h-full bg-gradient-to-r from-emerald-500 to-teal-400"
        />
      </div>
    </div>
  );
}

function LessonMockupSecondary() {
  return (
    <div className="h-full w-full flex flex-col text-white/50 text-[11px] font-mono leading-relaxed">
      <div className="text-[9px] uppercase tracking-widest text-white/30 mb-2">next up</div>
      <div className="text-white/75 font-semibold mb-1">How computers turn words into numbers</div>
      <div>embeddings · vector space · king − man + woman = queen</div>
    </div>
  );
}

/* ─────────────────────────────────────────────── agent terminal */
function AgentMockup() {
  const lines = [
    { k: "input", t: '> "Triage today\'s GitHub issues"' },
    { k: "think", t: "Thinking: I'll read open issues, classify each, then draft replies." },
    { k: "tool", t: "Tool: github.list_open_issues()" },
    { k: "result", t: "Found 7 open. 3 bugs, 2 feature requests, 2 questions." },
    { k: "tool", t: "Tool: github.search_closed_issues(similar)" },
    { k: "step", t: "  3 matching bugs found. Building context..." },
    { k: "success", t: "3 drafts ready. Awaiting approval." },
  ];
  const color = (k: string) =>
    k === "input"
      ? "text-white font-semibold"
      : k === "think"
      ? "text-amber-300"
      : k === "step"
      ? "text-white/50"
      : k === "tool"
      ? "text-cyan-300"
      : k === "result"
      ? "text-emerald-300"
      : "text-emerald-400 font-semibold";

  return (
    <div className="h-full w-full flex flex-col text-white">
      {/* chrome */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#0a0b0e] border-b border-white/5">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        </div>
        <span className="flex-1 text-center text-[10px] text-white/40 font-mono">
          triage-agent.py
        </span>
        <span className="text-[10px] text-emerald-400 font-mono">running</span>
      </div>

      {/* body */}
      <div className="flex-1 px-5 py-4 font-mono text-[12px] leading-[1.7] space-y-1">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.12, duration: 0.3 }}
            viewport={{ once: true }}
            className={color(line.k)}
          >
            {line.t}
          </motion.div>
        ))}
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: [0, 1, 0] }}
          transition={{ delay: lines.length * 0.12, duration: 0.8, repeat: Infinity }}
          viewport={{ once: true }}
          className="inline-block w-2 h-3.5 bg-emerald-400 ml-0.5 align-middle"
        />
      </div>
    </div>
  );
}

function AgentMockupSecondary() {
  return (
    <div className="h-full w-full text-white/50 text-[11px] font-mono leading-relaxed">
      <div className="text-[9px] uppercase tracking-widest text-white/30 mb-2">tools available</div>
      {[
        "github.list_open_issues",
        "github.search_closed",
        "github.post_comment",
        "slack.notify",
        "filesystem.read",
      ].map((t) => (
        <div key={t} className="flex items-center gap-2 py-0.5">
          <span className="w-1 h-1 rounded-full bg-emerald-400/60" />
          {t}
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────── playground */
function PlaygroundMockup() {
  return (
    <div className="h-full w-full flex flex-col text-white">
      {/* chrome */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#0a0b0e] border-b border-white/5 text-[10px] font-mono">
        <span className="text-white/40">playground · claude-opus-4-7</span>
        <span className="flex items-center gap-3 text-white/60">
          <span>temp 0.7</span>
          <span>max 2048</span>
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 flex-1 min-h-0">
        {/* prompt */}
        <div className="p-4 border-r border-white/5 text-[12px] font-mono leading-relaxed">
          <div className="text-[9px] uppercase tracking-widest text-white/30 mb-2">prompt</div>
          <div className="text-white/85">
            Write a haiku about attention<br />
            mechanisms in transformers.
          </div>
        </div>

        {/* response */}
        <div className="p-4 text-[12px] font-mono leading-relaxed">
          <div className="text-[9px] uppercase tracking-widest text-emerald-400 mb-2">response</div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-emerald-200/90 italic"
          >
            Queries seek their keys <br />
            Softmax attention weights sing <br />
            Context flows like rain
          </motion.div>

          <div className="mt-6 flex gap-3 text-[10px] text-white/40 font-mono">
            <span>47 tokens</span>
            <span>·</span>
            <span>0.8s</span>
            <span>·</span>
            <span className="text-emerald-400">$0.0003</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function PlaygroundMockupSecondary() {
  return (
    <div className="h-full w-full text-white/50 text-[11px] font-mono leading-relaxed">
      <div className="text-[9px] uppercase tracking-widest text-white/30 mb-2">recent runs</div>
      <div className="space-y-1.5">
        <div>· extract citations from paper</div>
        <div>· fewshot classify tickets</div>
        <div>· summarize meeting notes</div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────── the three sections */
export function MockupShowcase() {
  return (
    <>
      <SectionWithMockup
        eyebrow="01 / Curriculum"
        title={
          <>
            From first principles<br />
            to production systems.
          </>
        }
        description={
          <>
            Start with what AI actually is. Then how it learns. Then how it
            talks. Every lesson uses an everyday example first, then shows you
            the math and the runnable code. By the end you can read a research
            paper without flinching.
          </>
        }
        primary={<LessonMockup />}
        secondary={<LessonMockupSecondary />}
      />

      <SectionWithMockup
        eyebrow="02 / Agents"
        title={
          <>
            Build agents that<br />
            actually do things.
          </>
        }
        description={
          <>
            Modern AI doesn't just chat. It reads files, hits APIs, writes
            code, and ships work on its own. Build agents like that with Google
            ADK, OpenAI Agents SDK, CrewAI, AutoGen, and Claude — wired into
            GitHub, Slack, and your own systems through MCP.
          </>
        }
        primary={<AgentMockup />}
        secondary={<AgentMockupSecondary />}
        reverseLayout
      />

      <SectionWithMockup
        eyebrow="03 / Playground"
        title={
          <>
            Every lesson runs<br />
            live in the browser.
          </>
        }
        description={
          <>
            Skip the API keys, the install errors, the version mismatches. Open
            an in-browser playground from any lesson, edit the prompt, change
            the temperature, and watch the response stream back. Llama 3 70B
            is wired up today; Claude, GPT, and Gemini are next.
          </>
        }
        primary={<PlaygroundMockup />}
        secondary={<PlaygroundMockupSecondary />}
      />
    </>
  );
}
