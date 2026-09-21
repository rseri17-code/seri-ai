"use client";

import { AppLink as Link } from "@/components/app-link";
import { ArrowRight, CheckCircle2, Database, FileSearch, LockKeyhole, Route, Send, ShieldCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ProfileMark } from "@/components/profile-mark";
import { inferFollowUpChips } from "@/lib/ai";
import { captureSafeEvent, categorizeQuestion } from "@/lib/analytics-events";
import {
  askSessionKey,
  decodeAskThreadHash,
  deserializeAskSession,
  encodeAskThreadHash,
  legacyAskSessionKeys,
  serializeAskSession,
  toChatHistory,
  type AskSessionMessage,
  type AskSessionPacket
} from "@/lib/ask-session";

type ApiResponse = {
  answer: string;
  sources: Array<{ title: string; url: string; excerpt: string }>;
  follow_ups?: string[];
  meta?: {
    answer_mode?: string;
    retrieval_mode?: string;
    source_count?: number;
    question_category?: string;
    framework_layers?: string[];
    related_pages?: string[];
    public_boundary?: string;
    assistant_identity?: string;
    llm_provider?: string;
    llm_used?: boolean;
    llm_skip_reason?: string | null;
    latency_ms?: number;
    budget?: {
      rate_limit?: number;
      rate_window_ms?: number;
      embedding_timeout_ms?: number;
      vector_timeout_ms?: number;
      synthesis_timeout_ms?: number;
      vector_match_count?: number;
      returned_source_limit?: number;
    };
  };
};

function sameUserThread(left: AskSessionMessage[], right: AskSessionMessage[]) {
  const userTurns = (messages: AskSessionMessage[]) => messages.filter((message) => message.role === "user").map((message) => message.content);
  return JSON.stringify(userTurns(left)) === JSON.stringify(userTurns(right));
}

function llmSkipLabel(meta?: AskSessionPacket["meta"] | ApiResponse["meta"]) {
  if (!meta) {
    return "awaiting question";
  }
  if (meta.llm_used) {
    return "none";
  }
  return meta.llm_skip_reason || "unspecified";
}

function answerPacketRows(meta?: AskSessionPacket["meta"] | ApiResponse["meta"]): Array<[string, string]> {
  return [
    ["Category", meta?.question_category ?? "awaiting question"],
    ["Layers", meta?.framework_layers?.length ? meta.framework_layers.join(", ") : "matched after retrieval"],
    ["Boundary", meta?.public_boundary ?? "approved public content only"],
    ["LLM provider", meta?.llm_provider ?? "awaiting question"],
    ["LLM used", meta ? String(Boolean(meta.llm_used)) : "awaiting question"],
    ["LLM skip", llmSkipLabel(meta)],
    ["Latency", typeof meta?.latency_ms === "number" ? `${meta.latency_ms} ms` : "not measured yet"]
  ];
}

function hydrateLatestPacket(thread: AskSessionMessage[]) {
  const last = [...thread].reverse().find((message) => message.role === "assistant" && message.packet);
  return last?.packet;
}

function AnswerPacketDetails({
  packet,
  emptyHint
}: {
  packet?: AskSessionPacket;
  emptyHint?: boolean;
}) {
  const meta = packet?.meta;
  const sources = packet?.sources ?? [];
  const answerPacket = answerPacketRows(meta);

  return (
    <details className="mt-3 rounded border border-white/10 bg-black/25">
      <summary className="cursor-pointer px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-300">
        Answer packet
      </summary>
      <div className="space-y-3 border-t border-white/10 p-3">
        <div className="grid gap-2">
          {answerPacket.map(([label, value]) => (
            <div key={label} className="rounded border border-white/10 bg-black/20 p-3">
              <p className="whitespace-nowrap text-[0.66rem] font-semibold uppercase tracking-[0.1em] text-slate-400">{label}</p>
              <p className="mt-1 break-words text-xs font-semibold leading-5 text-slate-200">{value}</p>
            </div>
          ))}
        </div>
        {packet?.meta?.related_pages?.length ? (
          <div className="space-y-2">
            <p className="text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-slate-400">Related artifacts</p>
            {packet.meta.related_pages.slice(0, 4).map((href) => (
              <Link key={href} href={href} className="flex items-center justify-between gap-3 rounded border border-white/10 bg-black/20 px-3 py-2 text-xs font-semibold text-slate-200 hover:border-mint/40">
                <span className="truncate">{href}</span>
                <ArrowRight size={14} className="shrink-0 text-mint" />
              </Link>
            ))}
          </div>
        ) : emptyHint ? (
          <p className="text-xs leading-5 text-slate-400">Ask a question to generate a reviewable packet with matched scope, layers, boundary, and next artifacts.</p>
        ) : null}
        {sources.length ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Database className="text-signal" size={14} />
              <p className="text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-slate-400">Grounding receipts</p>
            </div>
            {sources.map((source) => (
              <a
                key={`${source.title}-${source.url}`}
                href={source.url}
                onClick={() => captureSafeEvent("source_link_click", { source_url: source.url, source_title: source.title })}
                className="block rounded border border-white/10 p-3 hover:border-mint/40"
              >
                <span className="block font-medium text-white">{source.title}</span>
                <span className="mt-1 block text-xs text-slate-400">{source.url}</span>
                <span className="mt-2 block text-xs leading-5 text-slate-300">{source.excerpt}</span>
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </details>
  );
}

export function Chat({
  mode = "ask",
  initialPrompt = "",
  suggestedPrompts,
  variant = "page",
  persistUrlHash,
  readUrlHash
}: {
  mode?: "ask" | "interview";
  initialPrompt?: string;
  suggestedPrompts?: string[];
  variant?: "page" | "dock";
  persistUrlHash?: boolean;
  readUrlHash?: boolean;
}) {
  const isDock = variant === "dock";
  const shouldPersistUrlHash = persistUrlHash ?? !isDock;
  const shouldReadUrlHash = readUrlHash ?? !isDock;
  const initialAssistantMessage =
    mode === "interview"
      ? "Interview mode is grounded in approved public evidence: Operational Intelligence, AI-native incident investigation, transaction intelligence, evaluation, architecture, and leadership patterns."
      : "Start with a question about the public work, Operational Intelligence, or OI-ROOM-001. Answers cite sources, name uncertainty, and stop when the record is thin.";
  const [messages, setMessages] = useState<AskSessionMessage[]>([
    {
      role: "assistant",
      content: initialAssistantMessage
    }
  ]);
  const [input, setInput] = useState(initialPrompt);
  const [sources, setSources] = useState<Array<{ title: string; url: string; excerpt: string }>>([]);
  const [responseMeta, setResponseMeta] = useState<ApiResponse["meta"]>();
  const [isLoading, setIsLoading] = useState(false);
  const [sessionRestored, setSessionRestored] = useState(false);
  const initialPromptRef = useRef(initialPrompt);
  const autoSubmittedRef = useRef(false);
  const transcriptRef = useRef<HTMLDivElement | null>(null);
  const transcriptEndRef = useRef<HTMLDivElement | null>(null);

  function applyPacket(packet: AskSessionPacket | undefined) {
    setSources(packet?.sources ?? []);
    setResponseMeta(packet?.meta);
  }

  useEffect(() => {
    if (autoSubmittedRef.current) {
      return;
    }
    try {
      for (const legacyKey of legacyAskSessionKeys(mode)) {
        window.localStorage.removeItem(legacyKey);
      }
      const stored = deserializeAskSession(window.localStorage.getItem(askSessionKey(mode)));
      const fromHash = shouldReadUrlHash ? decodeAskThreadHash(window.location.hash) : null;
      if (fromHash && stored && sameUserThread(fromHash, stored)) {
        setMessages(stored);
        setSessionRestored(true);
        applyPacket(hydrateLatestPacket(stored));
        autoSubmittedRef.current = true;
        return;
      }
      if (fromHash) {
        setMessages(fromHash);
        setSessionRestored(true);
        applyPacket(hydrateLatestPacket(fromHash));
        autoSubmittedRef.current = true;
        return;
      }
      if (initialPromptRef.current.trim()) {
        return;
      }
      if (stored) {
        setMessages(stored);
        setSessionRestored(true);
        applyPacket(hydrateLatestPacket(stored));
      }
    } catch {
      // Storage unavailable (private mode, blocked): start fresh.
    }
  }, [mode, shouldReadUrlHash]);

  useEffect(() => {
    try {
      const serialized = serializeAskSession(messages);
      if (serialized) {
        window.localStorage.setItem(askSessionKey(mode), serialized);
        if (!shouldPersistUrlHash) {
          return;
        }
        const url = new URL(window.location.href);
        if (url.searchParams.has("prompt")) {
          url.searchParams.delete("prompt");
        }
        const hashBody = encodeAskThreadHash(messages);
        const next = `${url.pathname}${url.search}${hashBody ? `#${hashBody}` : ""}`;
        const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;
        if (next !== current) {
          window.history.replaceState(null, "", next);
        }
      }
    } catch {
      // Storage unavailable: session continuity is best-effort only.
    }
  }, [messages, mode, shouldPersistUrlHash]);

  useEffect(() => {
    const scroller = transcriptRef.current;
    const target = transcriptEndRef.current;
    if (!scroller || !target) {
      return;
    }
    scroller.scrollTop = Math.max(0, target.offsetTop - 8);
  }, [messages, isLoading]);

  function clearSession() {
    try {
      window.localStorage.removeItem(askSessionKey(mode));
      if (shouldPersistUrlHash) {
        const url = new URL(window.location.href);
        url.searchParams.delete("prompt");
        window.history.replaceState(null, "", `${url.pathname}${url.search}`);
      }
    } catch {
      // Storage unavailable: nothing persisted to clear.
    }
    setMessages([{ role: "assistant", content: initialAssistantMessage }]);
    setSources([]);
    setResponseMeta(undefined);
    setSessionRestored(false);
  }

  async function sendMessage(question = input) {
    if (!question.trim() || isLoading) {
      return;
    }

    const nextMessages: AskSessionMessage[] = [...messages, { role: "user", content: question }];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    const startedAt = performance.now();
    const category = categorizeQuestion(question);
    captureSafeEvent("ask_question_submit", { category, mode, route: window.location.pathname });

    try {
      // Each turn posts the new question independently. History is for public-safety
      // scanning (and optional synthesis providers), not retrieval continuity.
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, history: toChatHistory(messages), mode })
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
        llm_provider: data.meta?.llm_provider ?? "unknown",
        llm_used: data.meta?.llm_used ?? false,
        llm_skip_reason: data.meta?.llm_skip_reason ?? null,
        server_category: data.meta?.question_category ?? category,
        public_boundary: data.meta?.public_boundary ?? "unknown",
        server_latency_ms: data.meta?.latency_ms ?? null
      });
      const followUps =
        Array.isArray(data.follow_ups) && data.follow_ups.length
          ? data.follow_ups.slice(0, 4)
          : inferFollowUpChips(question, data.meta?.related_pages ?? []);
      const packet: AskSessionPacket = {
        sources: data.sources ?? [],
        meta: data.meta,
        followUps
      };
      setMessages([...nextMessages, { role: "assistant", content: data.answer, packet }]);
      applyPacket(packet);
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
    ["Mode", responseMeta?.retrieval_mode ?? (sources.length ? "sources" : "local")],
    ["Sources", sources.length ? `${sources.length} cited` : "pending"],
    ["Scope", "public"],
    [
      "Status",
      isLoading
        ? "evaluating"
        : responseMeta?.answer_mode
          ? responseMeta.llm_used
            ? `${responseMeta.answer_mode} · ${responseMeta.llm_provider ?? "llm"}`
            : responseMeta.llm_skip_reason
              ? `${responseMeta.answer_mode} · ${responseMeta.llm_skip_reason}`
              : responseMeta.answer_mode
          : "ready"
    ]
  ];
  const hasAskedQuestion = messages.some((message) => message.role === "user");
  const hasSources = sources.length > 0;
  const hasRelatedPages = Boolean(responseMeta?.related_pages?.length);
  const isRefusal = responseMeta?.answer_mode === "public_safety_refusal" || responseMeta?.retrieval_mode === "blocked";
  const latencyKnown = typeof responseMeta?.latency_ms === "number";
  const runtimeBudget = responseMeta?.budget;
  const latestAssistantIndex = messages.reduce((latest, message, index) => (message.role === "assistant" ? index : latest), -1);
  const latestFollowUps = messages[latestAssistantIndex]?.packet?.followUps ?? [];
  const trustContract: Array<[string, string, boolean, "mint" | "signal" | "amber"]> = [
    ["AI disclosure", responseMeta?.assistant_identity ?? "AI assistant over approved public work", true, "mint"],
    [
      "Source coverage",
      hasSources ? `${sources.length} cited sources` : isRefusal ? "blocked before retrieval" : hasAskedQuestion ? "no sources returned" : "awaiting query",
      hasSources || isRefusal || !hasAskedQuestion,
      hasSources ? "mint" : isRefusal ? "amber" : "signal"
    ],
    ["Boundary", responseMeta?.public_boundary ?? "approved public content only", true, "mint"],
    [
      "Related route",
      hasRelatedPages ? `${responseMeta?.related_pages?.length} artifacts suggested` : isRefusal ? "safe redirection only" : hasAskedQuestion ? "none suggested" : "pending",
      hasRelatedPages || isRefusal || !hasAskedQuestion,
      hasRelatedPages ? "signal" : isRefusal ? "amber" : "signal"
    ],
    [
      "Latency budget",
      latencyKnown ? `${responseMeta?.latency_ms} ms` : hasAskedQuestion ? "not reported" : "not measured yet",
      latencyKnown || !hasAskedQuestion,
      latencyKnown ? "mint" : "signal"
    ]
  ];

  const transcript = (
        <div
          className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4"
          role="log"
          aria-live="polite"
          aria-relevant="additions"
          aria-busy={isLoading}
          data-ask-transcript="true"
          ref={transcriptRef}
        >
          {messages.map((message, index) => {
            if (isDock && message.content === initialAssistantMessage && !message.packet) {
              return null;
            }
            const isLatestAssistant = message.role === "assistant" && index === latestAssistantIndex;
            const isLatestUser = message.role === "user" && !messages.slice(index + 1).some((item) => item.role === "user");
            return (
              <div
                key={`${message.role}-${index}`}
                ref={isLatestUser ? transcriptEndRef : undefined}
                className={message.role === "user" ? "flex justify-end" : "flex justify-start"}
              >
                <div className={`max-w-[82%] ${message.role === "user" ? "" : "w-full"}`}>
                  <div
                    className={`rounded-lg px-4 py-3 text-sm leading-6 ${
                      message.role === "user" ? "bg-mint text-ink" : "whitespace-pre-line border border-white/10 bg-black/30 text-slate-100"
                    }`}
                  >
                    {message.content}
                    {message.role === "assistant" && message.packet ? (
                      <AnswerPacketDetails packet={message.packet} emptyHint={false} />
                    ) : null}
                  </div>
                  {!isLoading && isLatestAssistant && latestFollowUps.length ? (
                    <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Follow-up questions">
                      {latestFollowUps.map((prompt) => (
                        <button
                          key={prompt}
                          type="button"
                          className="min-w-0 rounded border border-white/10 bg-white/[0.04] px-3 py-2 text-left text-xs font-semibold leading-5 text-slate-200 hover:border-mint/40"
                          onClick={() => void sendMessage(prompt)}
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })}
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
  );

  const sessionBar =
    hasAskedQuestion || sessionRestored ? (
          <div className="flex items-center justify-between gap-3 border-t border-white/10 bg-black/15 px-4 py-2">
            <p className="text-[0.68rem] leading-4 text-slate-400">
              {sessionRestored ? "Session restored from this browser. Nothing is stored on the server." : "Session saved in this browser only. Nothing is stored on the server."}
            </p>
            <button
              type="button"
              onClick={clearSession}
              aria-label="New conversation"
              className="shrink-0 rounded border border-white/10 px-2 py-1 text-[0.68rem] font-semibold text-slate-300 hover:border-mint/40 hover:text-mint"
            >
              Clear session
            </button>
          </div>
    ) : null;

  const composer = (
        <form
          className="sticky bottom-0 flex gap-2 border-t border-white/10 bg-[#071018] p-3"
          onSubmit={(event) => {
            event.preventDefault();
            void sendMessage();
          }}
        >
          <input
            className="min-h-11 min-w-0 flex-1 rounded border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-mint/60"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                void sendMessage();
              }
            }}
            aria-label="Ask a question about the public work"
            placeholder="Ask about the work, Operational Intelligence, projects, or background..."
            autoComplete="off"
            disabled={isLoading}
          />
          <button className="grid h-12 w-12 place-items-center rounded bg-mint text-ink disabled:opacity-50" type="submit" aria-label="Send message" disabled={isLoading}>
            <Send size={18} />
          </button>
        </form>
  );

  if (isDock) {
    return (
      <div className="flex h-full min-h-0 flex-col overflow-hidden bg-[#071018]" data-ask-variant="dock">
        {hasAskedQuestion || sessionRestored ? (
          <>
            {transcript}
            {sessionBar}
          </>
        ) : null}
        {!hasAskedQuestion ? (
          <div className="min-h-0 flex-1 overflow-y-auto border-t border-white/10 bg-black/15 p-3">
            <p className="text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-slate-400">Challenge the record</p>
            <div className="mt-2 grid gap-2">
              {prompts.slice(0, 5).map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  data-ask-challenge-chip="true"
                  className="min-h-11 min-w-0 rounded border border-white/10 bg-white/[0.04] px-3 py-2 text-left text-xs font-semibold leading-5 text-slate-200 hover:border-mint/40"
                  onClick={() => void sendMessage(prompt)}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        ) : null}
        {composer}
        <div className="border-t border-white/10 bg-black/20 px-3 py-2">
          <p className="text-[0.68rem] leading-4 text-slate-400">
            Public record only. Cite or refuse. No open-web research, and no private or employer data.
          </p>
          <p className="mt-1 text-[0.68rem] leading-4 text-slate-500">
            {responseMeta?.public_boundary ?? "approved public content only"} · {responseMeta?.assistant_identity ?? "AI assistant over approved public work"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
      <div className="flex min-h-[28rem] flex-col overflow-hidden rounded-lg border border-white/10 bg-[#071018] md:min-h-[36rem] md:h-[min(72vh,46rem)]">
        <div className="border-b border-white/10 bg-black/20 p-4">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex items-center gap-3">
              <ProfileMark size="sm" />
              <div>
                <p className="text-xs font-semibold uppercase text-slate-400">Evidence console</p>
                <h2 className="text-xl font-semibold text-white">Explore the public work, frameworks, and operating principles behind seri.ai.</h2>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 xl:w-[34rem]">
              {operatingReceipts.map(([label, value]) => (
                <div key={label} className="min-w-0 rounded border border-white/10 bg-white/[0.04] px-3 py-2">
                  <p className="whitespace-nowrap text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-slate-400">{label}</p>
                  <p className="mt-1 break-words font-mono text-[0.72rem] leading-4 text-mint">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        {transcript}
        {sessionBar}
        {composer}
        {!hasAskedQuestion ? (
          <div className="border-t border-white/10 bg-black/15 p-3">
            <p className="text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-slate-400">Strong first questions</p>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {prompts.slice(0, 4).map((prompt) => (
                <button
                  key={prompt}
                  className="min-w-0 rounded border border-white/10 bg-white/[0.04] px-3 py-2 text-left text-xs font-semibold leading-5 text-slate-200 hover:border-mint/40"
                  onClick={() => void sendMessage(prompt)}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </div>
      <aside className="space-y-4">
        <div className="rounded-lg border border-signal/20 bg-signal/[0.05] p-5">
          <div className="flex items-center gap-2">
            <Route className="text-signal" size={18} />
            <p className="font-semibold text-white">Answer packet</p>
          </div>
          <div className="mt-4 grid gap-2">
            {[...answerPacketRows(responseMeta)].map(([label, value]) => (
              <div key={label} className="rounded border border-white/10 bg-black/20 p-3">
                <p className="whitespace-nowrap text-[0.66rem] font-semibold uppercase tracking-[0.1em] text-slate-400">{label}</p>
                <p className="mt-1 break-words text-xs font-semibold leading-5 text-slate-200">{value}</p>
              </div>
            ))}
          </div>
          {responseMeta?.related_pages?.length ? (
            <div className="mt-4 space-y-2">
              <p className="text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-slate-400">Related artifacts</p>
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
            <p className="font-semibold text-white">Trust contract</p>
          </div>
          <div className="mt-4 grid gap-2">
            {trustContract.map(([label, value, passed, tone]) => (
              <div key={label} className="rounded border border-white/10 bg-black/20 p-3">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className={passed ? (tone === "amber" ? "mt-0.5 text-amber" : tone === "signal" ? "mt-0.5 text-signal" : "mt-0.5 text-mint") : "mt-0.5 text-amber"} size={14} />
                  <div>
                  <span className="text-xs font-semibold text-slate-200">{label}</span>
                    <p className="mt-1 text-[0.68rem] leading-4 text-slate-400">{value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {runtimeBudget ? (
            <div className="mt-4 rounded border border-white/10 bg-black/20 p-3">
              <p className="text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-slate-400">Runtime budget</p>
              <p className="mt-2 text-xs leading-5 text-slate-300">
                {runtimeBudget.rate_limit ?? 20} questions per minute, {runtimeBudget.returned_source_limit ?? 4} returned sources, {runtimeBudget.synthesis_timeout_ms ?? 12000} ms synthesis guard.
              </p>
            </div>
          ) : null}
          <p className="mt-4 text-xs leading-5 text-slate-400">
            This assistant is intentionally deterministic and source-scoped. It answers only from the public record; unsupported or confidential questions remain out of scope.
          </p>
        </div>
        {!hasAskedQuestion ? (
          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
            <p className="font-semibold text-white">Inspection prompts</p>
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
        ) : null}
        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
          <div className="flex items-center gap-2">
            <Database className="text-signal" size={18} />
            <p className="font-semibold text-white">Grounding receipts</p>
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
