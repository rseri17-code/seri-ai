import Anthropic from "@anthropic-ai/sdk";
import OpenAI from "openai";
import { publicSafetyInstruction } from "@/lib/compliance";

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type GenerateArgs = {
  question: string;
  context: Array<{ title: string; url: string; content: string }>;
  history?: ChatMessage[];
};

export async function generateRaviAnswer({ question, context, history = [] }: GenerateArgs) {
  const provider = process.env.AI_PROVIDER ?? "openai";
  const prompt = [
    publicSafetyInstruction(),
    "",
    "Approved context:",
    context.length
      ? context.map((item, index) => `[${index + 1}] ${item.title} (${item.url}): ${item.content}`).join("\n")
      : "No relevant public context found.",
    "",
    `Question: ${question}`,
    "",
    [
      "Answer contract:",
      "1. Start with a direct answer.",
      "2. Name the most relevant Operational Intelligence Framework layer when applicable.",
      "3. Cite the supporting public source title inline when useful.",
      "4. State one tradeoff, limitation, or missing-context boundary when applicable.",
      "5. Point to a related page or artifact when helpful.",
      "6. Explicitly say what is unknown or outside the public-safe knowledge base.",
      "If the approved context does not cover the question, say the public knowledge base does not cover it yet."
    ].join("\n")
  ].join("\n");

  if (provider === "anthropic" && process.env.ANTHROPIC_API_KEY) {
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const response = await anthropic.messages.create({
      model: process.env.ANTHROPIC_CHAT_MODEL ?? "claude-3-5-sonnet-latest",
      max_tokens: 700,
      system: publicSafetyInstruction(),
      messages: [
        ...history.map((message) => ({ role: message.role, content: message.content })),
        { role: "user", content: prompt }
      ]
    });

    return response.content.map((block) => ("text" in block ? block.text : "")).join("");
  }

  if (process.env.OPENAI_API_KEY) {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_CHAT_MODEL ?? "gpt-4.1-mini",
      temperature: 0.3,
      messages: [
        { role: "system", content: publicSafetyInstruction() },
        ...history,
        { role: "user", content: prompt }
      ]
    });

    return response.choices[0]?.message.content ?? "I do not have enough approved public context to answer that.";
  }

  if (!context.length) {
    return "The public knowledge base does not cover that yet. The system can answer from published material on Operational Intelligence, agentic systems, transaction intelligence, observability, knowledge graphs, AI evaluation, and architecture patterns.";
  }

  return `Public-grounded Operational Intelligence answer: ${context
    .slice(0, 3)
    .map((item) => `${item.content} Source: ${item.title} (${item.url}).`)
    .join(" ")}`;
}

export async function embedText(input: string) {
  if (!process.env.OPENAI_API_KEY) {
    return null;
  }

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const response = await openai.embeddings.create({
    model: process.env.OPENAI_EMBEDDING_MODEL ?? "text-embedding-3-small",
    input
  });

  return response.data[0]?.embedding ?? null;
}
