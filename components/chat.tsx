"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Database, FileSearch, LockKeyhole, Route, Send, ShieldCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ProfileMark } from "@/components/profile-mark";
import type { ChatMessage } from "@/lib/ai";
import { captureSafeEvent, categorizeQuestion } from "@/lib/analytics-events";

type ApiResponse = {
  answer: string;
  sources: Array<{ title: string; url: string; excerpt: string }>;
  meta?: {
    answer_mode?: string;
    retrieval_mode?: string;
    source_count?: number;
    question_category?: string;
    framework_layers?: string[];
    related_pages?: string[];
    public_boundary?: string;
    assistant_identity?: string;
    latency_ms?: number;
  };
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
      : "Ask how Operational Intelligence works, what OI-ROOM-001 proves, or where Ravikanth Seri's public evidence lives. I will cite sources, separate evidence from inference, name uncertainty, and stop when the record is thin.";
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: initialAssistantMessage
    }
  ]);
  const [input, setInput] = useState(initialPrompt);
  const [sources, setSources] = useState<Array<{ title: string; url: string; excerpt: string }>>([]);
  const [responseMeta, setResponseMeta] = useState<ApiResponse["meta"]>();
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
        source_count: data.sources?.length ?? 0,
        answer_mode: data.meta?.answer_mode ?? "unknown",
        retrieval_mode: data.meta?.retrieval_mode ?? "unknown",
        server_category: data.meta?.question_category ?? category,
        public_boundary: data.meta?.public_boundary ?? "unknown",
        server_latency_ms: data.meta?.latency_ms ?? null
      });
      setMessages([...nextMessages, { role: "assistant", content: data.answer }]);
      setSources(data.sources ?? []);
      setResponseMeta(data.meta);
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
      setResponseMeta(undefined);
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
          "What is Ravikanth building with seri.ai?",
          "What public evidence shows Ravikanth's architecture judgment?",
          "How does Ravikanth think about Operational Intelligence?"
        ]);
  const operatingReceipts: Array<[string, string]> = [
    ["Retrieve", responseMeta?.retrieval_mode ?? (sources.length ? "sources" : "local/vector")],
    ["Ground", sources.length ? `${sources.length} sources` : "awaiting query"],
    ["Boundary", "public"],
    ["Release", isLoading ? "evaluating" : responseMeta?.answer_mode ?? "ready"]
  ];
  const answerPacket: Array<[string, string]> = [
    ["Category", responseMeta?.question_category ?? "awaiting question"],
    ["Layers", responseMeta?.framework_layers?.length ? responseMeta.framework_layers.join(", ") : "matched after retrieval"],
    ["Boundary", responseMeta?.public_boundary ?? "approved public content only"],
    ["Latency", typeof responseMeta?.latency_ms === "number" ? `${responseMeta.latency_ms} ms` : "not measured yet"]
  ];
  const responseChecks: Array<[string, boolean]> = [
    ["AI disclosure", true],
    ["Approved content", sources.length > 0 || messages.length === 1],
    ["Confidentiality gate", true],
    ["Unknowns allowed", true]
  ];

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
      <div className="overflow-hidden rounded-lg border border-white/10 bg-[#071018]">
        <div className="border-b border-white/10 bg-black/20 p-4">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex items-center gap-3">
              <ProfileMark size="sm" />
              <div>
                <p className="text-xs font-semibold uppercase text-slate-500">Public research interface</p>
                <h2 className="text-xl font-semibold text-white">Question the doctrine, the Operations Room, and the public work.</h2>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 xl:w-[34rem]">
              {operatingReceipts.map(([label, value]) => (
                <div key={label} className="rounded border border-white/10 bg-white/[0.04] px-3 py-2">
                  <p className="text-[0.66rem] font-semibold uppercase text-slate-500">{label}</p>
                  <p className="mt-1 font-mono text-[0.72rem] leading-4 text-mint">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="h-[165px] space-y-4 overflow-y-auto p-4 md:h-[320px]">
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
                Reading the public evidence...
              </div>
              <p className="mt-2 text-xs leading-5 text-slate-400">The response will cite available sources, separate evidence from inference, and avoid unsupported claims.</p>
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
            aria-label="Ask a question about Ravikanth Seri's public work"
            placeholder="Ask about Ravikanth, his work, Operational Intelligence, projects, or background..."
          />
          <button className="grid h-12 w-12 place-items-center rounded bg-mint text-ink" type="submit" aria-label="Send message">
            <Send size={18} />
          </button>
        </form>
      </div>
      <aside className="space-y-4">
        <div className="rounded-lg border border-signal/20 bg-signal/[0.05] p-5">
          <div className="flex items-center gap-2">
            <Route className="text-signal" size={18} />
            <h2 className="font-semibold text-white">Answer packet</h2>
          </div>
          <div className="mt-4 grid gap-2">
            {answerPacket.map(([label, value]) => (
              <div key={label} className="rounded border border-white/10 bg-black/20 p-3">
                <p className="text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-slate-500">{label}</p>
                <p className="mt-1 text-xs font-semibold leading-5 text-slate-200">{value}</p>
              </div>
            ))}
          </div>
          {responseMeta?.related_pages?.length ? (
            <div className="mt-4 space-y-2">
              <p className="text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-slate-500">Related artifacts</p>
              {responseMeta.related_pages.slice(0, 4).map((href) => (
                <Link key={href} href={href} className="flex items-center justify-between gap-3 rounded border border-white/10 bg-black/20 px-3 py-2 text-xs font-semibold text-slate-200 hover:border-mint/40">
                  <span className="truncate">{href}</span>
                  <ArrowRight size={14} className="shrink-0 text-mint" />
                </Link>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-xs leading-5 text-slate-400">Ask a question to generate a reviewable packet with matched scope, layers, boundary, and next artifacts.</p>
          )}
        </div>
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
            This interface answers from Ravikanth Seri&apos;s public materials. Strong answers cite sources, name uncertainty, and stop when the evidence stops.
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
                <p className="mt-2 text-xs leading-5 text-slate-400">Sources appear after retrieval. Unsupported questions should return a clear boundary instead of a guess.</p>
              </div>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}
