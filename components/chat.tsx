"use client";

import { Send } from "lucide-react";
import { useState } from "react";
import type { ChatMessage } from "@/lib/ai";

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
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        mode === "interview"
          ? "I can help interview Ravikanth's public experience and thinking. Ask about Operational Intelligence, AI-native incident investigation, transaction intelligence, or evaluation."
          : "Ask me about Ravikanth's public thinking on Operational Intelligence, agentic systems, observability, knowledge graphs, and AI evaluation."
    }
  ]);
  const [input, setInput] = useState(initialPrompt);
  const [sources, setSources] = useState<Array<{ title: string; url: string; excerpt: string }>>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function sendMessage(question = input) {
    if (!question.trim() || isLoading) {
      return;
    }

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: question }];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    const response = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, history: messages.slice(-6), mode })
    });
    const data = (await response.json()) as ApiResponse;

    setMessages([...nextMessages, { role: "assistant", content: data.answer }]);
    setSources(data.sources ?? []);
    setIsLoading(false);
  }

  const prompts =
    suggestedPrompts ??
    (mode === "interview"
      ? [
          "How does Ravikanth think about AI evaluation for enterprise operations?",
          "What makes Operational Intelligence different from observability?",
          "What leadership strengths show up in Ravikanth's public resume?"
        ]
      : [
          "Explain Operational Intelligence in Ravikanth's voice.",
          "How should agents investigate incidents safely?",
          "What is Transaction Intelligence?"
        ]);

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
      <div className="rounded-lg border border-white/10 bg-white/[0.04]">
        <div className="h-[560px] space-y-4 overflow-y-auto p-4">
          {messages.map((message, index) => (
            <div key={`${message.role}-${index}`} className={message.role === "user" ? "flex justify-end" : "flex justify-start"}>
              <div
                className={`max-w-[82%] rounded-lg px-4 py-3 text-sm leading-6 ${
                  message.role === "user" ? "bg-mint text-ink" : "border border-white/10 bg-ink text-slate-100"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isLoading ? <div className="text-sm text-slate-400">Thinking with approved public context...</div> : null}
        </div>
        <form
          className="flex gap-2 border-t border-white/10 p-3"
          onSubmit={(event) => {
            event.preventDefault();
            void sendMessage();
          }}
        >
          <input
            className="min-w-0 flex-1 rounded border border-white/10 bg-ink px-4 py-3 text-sm text-white outline-none focus:border-mint/60"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask a public-safe question..."
          />
          <button className="grid h-12 w-12 place-items-center rounded bg-mint text-ink" type="submit" aria-label="Send message">
            <Send size={18} />
          </button>
        </form>
      </div>
      <aside className="space-y-4">
        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
          <h2 className="font-semibold text-white">Suggested prompts</h2>
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
          <h2 className="font-semibold text-white">Grounding</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-300">
            {sources.length ? (
              sources.map((source) => (
                <a key={`${source.title}-${source.url}`} href={source.url} className="block rounded border border-white/10 p-3 hover:border-mint/40">
                  <span className="block font-medium text-white">{source.title}</span>
                  <span className="mt-1 block text-xs text-slate-400">{source.url}</span>
                  <span className="mt-2 block text-slate-300">{source.excerpt}</span>
                </a>
              ))
            ) : (
              <p>Sources will appear after an answer.</p>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}
