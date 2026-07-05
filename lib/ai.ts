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
    "Answer requirements: cite the relevant source titles inline when useful. If the approved context does not cover the question, say the public knowledge base does not cover it yet."
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
    return "That is not yet covered in Ravi's public knowledge base. I can discuss the published material on Operational Intelligence, agentic systems, transaction intelligence, observability, knowledge graphs, AI evaluation, and architecture patterns.";
  }

  return `From Ravi's public point of view: ${context
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
