"use client";

import { BrainCircuit, CheckCircle2, Database, FileSearch, LockKeyhole, Send, ShieldCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { ChatMessage } from "@/lib/ai";
import { captureSafeEvent, categorizeQuestion } from "@/lib/analytics-events";

type ApiResponse = {
  answer: string;
  sources: Array<{ title: string; url: string; excerpt: string }>;
};

export function Chat({
  mode = "ask",
  initialPrompt = "",
  suggestedPrompts
}: {
  mode?: "ask" | "interview";
  initialPrompt?: string;
  suggestedPrompts?: string[];
}) {
  const initialAssistantMessage =
    mode === "interview"
      ? "Interview mode is grounded in approved public evidence: Operational Intelligence, AI-native incident investigation, transaction intelligence, evaluation, architecture, and leadership patterns."
      : "Reasoning Interface online. Ask about Operational Intelligence, Agentic SRE, transaction intelligence, evidence graphs, replay, eval gates, or public-safe architecture patterns.";
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: initialAssistantMessage
    }
  ]);
  const [input, setInput] = useState(initialPrompt);
  const [sources, setSources] = useState<Array<{ title: string; url: string; excerpt: string }>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const initialPromptRef = useRef(initialPrompt);
  const autoSubmittedRef = useRef(false);

  async function sendMessage(question = input) {
    if (!question.trim() || isLoading) {
      return;
    }

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: question }];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    const startedAt = performance.now();
    const category = categorizeQuestion(question);
    captureSafeEvent("ask_question_submit", { category, mode, route: window.location.pathname });

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, history: messages.slice(-6), mode })
      });
      const data = (await response.json()) as ApiResponse;

      if (!response.ok) {
        throw new Error("Ask request failed");
      }

      captureSafeEvent("ask_response_success", {
        category,
        mode,
        latency_ms: Math.round(performance.now() - startedAt),
        source_count: data.sources?.length ?? 0
      });
      setMessages([...nextMessages, { role: "assistant", content: data.answer }]);
      setSources(data.sources ?? []);
    } catch {
      captureSafeEvent("ask_response_failure", {
        category,
        mode,
        latency_ms: Math.round(performance.now() - startedAt)
      });
      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content:
            "Direct answer: The public Ask surface could not complete this request. The safe beta fallback is to use the Framework, Operations Room, Work, or Background pages rather than inventing an answer."
        }
      ]);
      setSources([]);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const prompt = initialPromptRef.current.trim();
    if (!prompt || autoSubmittedRef.current) {
      return;
    }

    autoSubmittedRef.current = true;
    void sendMessage(prompt);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const prompts =
    suggestedPrompts ??
    (mode === "interview"
      ? [
          "How should AI evaluation work for enterprise operations?",
          "What makes Operational Intelligence different from observability?",
          "What leadership evidence appears in the public resume?"
        ]
      : [
          "Explain Operational Intelligence as an operating layer.",
          "How should agents investigate incidents safely?",
          "What is Transaction Intelligence?"
        ]);
  const operatingReceipts: Array<[string, string]> = [
    ["Retrieve", sources.length ? `${sources.length} sources` : "local + vector"],
    ["Ground", sources.length ? "context attached" : "awaiting query"],
    ["Boundary", "public-safe"],
    ["Release", isLoading ? "evaluating" : "ready"]
  ];
  const responseChecks: Array<[string, boolean]> = [
    ["Approved content", sources.length > 0 || messages.length === 1],
    ["Confidentiality gate", true],
    ["Unknowns allowed", true],
    ["Human judgment", true]
  ];

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
      <div className="overflow-hidden rounded-lg border border-white/10 bg-[#071018]">
        <div className="border-b border-white/10 bg-black/20 p-4">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-lg border border-mint/30 bg-mint/10 text-mint">
                <BrainCircuit size={20} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase text-slate-500">Operational reasoning console</p>
                <h2 className="text-xl font-semibold text-white">Ask, retrieve, evaluate, then answer.</h2>
              </div>
            </div>
            <div className="grid gap-2 sm:grid-cols-4 xl:w-[34rem]">
              {operatingReceipts.map(([label, value]) => (
                <div key={label} className="rounded border border-white/10 bg-white/[0.04] px-3 py-2">
                  <p className="text-[0.66rem] font-semibold uppercase text-slate-500">{label}</p>
                  <p className="mt-1 truncate font-mono text-xs text-mint">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="h-[560px] space-y-4 overflow-y-auto p-4">
          {messages.map((message, index) => (
            <div key={`${message.role}-${index}`} className={message.role === "user" ? "flex justify-end" : "flex justify-start"}>
              <div
                className={`max-w-[82%] rounded-lg px-4 py-3 text-sm leading-6 ${
                  message.role === "user" ? "bg-mint text-ink" : "border border-white/10 bg-black/30 text-slate-100"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isLoading ? (
            <div className="rounded-lg border border-signal/25 bg-signal/[0.07] p-4 text-sm text-slate-300">
              <div className="flex items-center gap-2 font-semibold text-signal">
                <FileSearch size={16} />
                Running retrieval and public-safety checks...
              </div>
              <p className="mt-2 text-xs leading-5 text-slate-400">The answer should stay inside approved public context, name gaps, and avoid confidential or employer-specific detail.</p>
            </div>
          ) : null}
        </div>
        <form
          className="flex gap-2 border-t border-white/10 p-3"
          onSubmit={(event) => {
            event.preventDefault();
            void sendMessage();
          }}
        >
          <input
            className="min-w-0 flex-1 rounded border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-mint/60"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            aria-label="Ask a public-safe Operational Intelligence question"
            placeholder="Ask a public-safe Operational Intelligence question..."
          />
          <button className="grid h-12 w-12 place-items-center rounded bg-mint text-ink" type="submit" aria-label="Send message">
            <Send size={18} />
          </button>
        </form>
      </div>
      <aside className="space-y-4">
        <div className="rounded-lg border border-mint/20 bg-mint/[0.05] p-5">
          <div className="flex items-center gap-2">
            <ShieldCheck className="text-mint" size={18} />
            <h2 className="font-semibold text-white">Answer contract</h2>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {responseChecks.map(([label, passed]) => (
              <div key={label} className="rounded border border-white/10 bg-black/20 p-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className={passed ? "text-mint" : "text-amber"} size={14} />
                  <span className="text-xs font-semibold text-slate-200">{label}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs leading-5 text-slate-400">
            The interface should cite approved public sources, refuse confidential requests, and preserve operator judgment before action.
          </p>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
          <h2 className="font-semibold text-white">Suggested investigations</h2>
          <div className="mt-4 space-y-2">
            {prompts.map((prompt) => (
              <button
                key={prompt}
                className="w-full rounded border border-white/10 px-3 py-2 text-left text-sm text-slate-200 hover:border-mint/40"
                onClick={() => void sendMessage(prompt)}
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
          <div className="flex items-center gap-2">
            <Database className="text-signal" size={18} />
            <h2 className="font-semibold text-white">Grounding receipts</h2>
          </div>
          <div className="mt-4 space-y-3 text-sm text-slate-300">
            {sources.length ? (
              sources.map((source) => (
                <a
                  key={`${source.title}-${source.url}`}
                  href={source.url}
                  onClick={() => captureSafeEvent("source_link_click", { source_url: source.url, source_title: source.title })}
                  className="block rounded border border-white/10 p-3 hover:border-mint/40"
                >
                  <span className="block font-medium text-white">{source.title}</span>
                  <span className="mt-1 block text-xs text-slate-400">{source.url}</span>
                  <span className="mt-2 block text-slate-300">{source.excerpt}</span>
                </a>
              ))
            ) : (
              <div className="rounded border border-white/10 bg-black/20 p-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-200">
                  <LockKeyhole size={15} className="text-amber" />
                  No answer released yet
                </div>
                <p className="mt-2 text-xs leading-5 text-slate-400">Sources appear after retrieval. Confidential or unsupported questions should return a boundary-aware refusal.</p>
              </div>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}
