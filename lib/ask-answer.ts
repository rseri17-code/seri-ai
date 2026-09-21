/**
 * Server-only Ask synthesizer. Do not import from Client Components.
 * Chat continues to import follow-up helpers from `lib/ai.ts`.
 */
import Anthropic from "@anthropic-ai/sdk";
import OpenAI from "openai";
import { localFallbackAnswer, type ChatMessage } from "@/lib/ai";
import {
  isAskRetrievalSufficient,
  readRuntimeEnv,
  resolveAskLlmProvider,
  trySynthesizeAskAnswer,
  type AskLlmProvider,
  type AskLlmSkipReason
} from "@/lib/ask-llm";
import { publicSafetyInstruction } from "@/lib/compliance";

export type AskAnswerMode = "ai_synthesis" | "local_fallback" | "timeout_fallback";

export type GenerateRaviAnswerResult = {
  answer: string;
  mode: AskAnswerMode;
  llmProvider: AskLlmProvider;
  llmUsed: boolean;
  llmSkipReason?: AskLlmSkipReason;
};

type GenerateArgs = {
  question: string;
  context: Array<{ title: string; url: string; content: string }>;
  history?: ChatMessage[];
  fetchImpl?: typeof fetch;
  env?: NodeJS.ProcessEnv;
};

export async function generateRaviAnswer({
  question,
  context,
  history = [],
  fetchImpl,
  env = process.env
}: GenerateArgs): Promise<GenerateRaviAnswerResult> {
  const groundedProvider = resolveAskLlmProvider(env);
  if (groundedProvider.kind !== "none") {
    if (!isAskRetrievalSufficient(context)) {
      return {
        answer: localFallbackAnswer(question, context),
        mode: "local_fallback",
        llmProvider: groundedProvider.kind,
        llmUsed: false,
        llmSkipReason: "thin_retrieval"
      };
    }

    const synthesized = await trySynthesizeAskAnswer({
      question,
      context,
      provider: groundedProvider,
      env,
      fetchImpl
    });
    if (synthesized.ok) {
      return {
        answer: synthesized.answer,
        mode: "ai_synthesis",
        llmProvider: synthesized.provider,
        llmUsed: true
      };
    }
    return {
      answer: localFallbackAnswer(question, context),
      mode: "local_fallback",
      llmProvider: groundedProvider.kind,
      llmUsed: false,
      llmSkipReason: synthesized.reason
    };
  }

  const provider = readRuntimeEnv("AI_PROVIDER", env) || "openai";
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
      "7. Follow the Ask persona contract in the system instruction: answer as a public evidence interface over Ravikanth's work, not as Ravikanth personally and not as a generic chatbot.",
      "If the approved context does not cover the question, say the topic is not in the public record and the public knowledge base does not cover it yet. Do not answer from a weakly related nearest-neighbor principle."
    ].join("\n")
  ].join("\n");

  const anthropicKey = readRuntimeEnv("ANTHROPIC_API_KEY", env);
  if (provider === "anthropic" && anthropicKey) {
    const anthropic = new Anthropic({ apiKey: anthropicKey });
    const response = await anthropic.messages.create({
      model: readRuntimeEnv("ANTHROPIC_CHAT_MODEL", env) || "claude-3-5-sonnet-latest",
      max_tokens: 700,
      system: publicSafetyInstruction(),
      messages: [
        ...history.map((message) => ({ role: message.role, content: message.content })),
        { role: "user", content: prompt }
      ]
    });

    return {
      answer: response.content.map((block) => ("text" in block ? block.text : "")).join(""),
      mode: "ai_synthesis",
      llmProvider: "none",
      llmUsed: false,
      llmSkipReason: groundedProvider.skipReason
    };
  }

  const openAiKey = readRuntimeEnv("OPENAI_API_KEY", env);
  if (openAiKey) {
    const openai = new OpenAI({ apiKey: openAiKey });
    const response = await openai.chat.completions.create({
      model: readRuntimeEnv("OPENAI_CHAT_MODEL", env) || "gpt-4.1-mini",
      temperature: 0.3,
      messages: [
        { role: "system", content: publicSafetyInstruction() },
        ...history,
        { role: "user", content: prompt }
      ]
    });

    return {
      answer: response.choices[0]?.message.content ?? "I do not have enough approved public context to answer that.",
      mode: "ai_synthesis",
      llmProvider: "none",
      llmUsed: false,
      llmSkipReason: groundedProvider.skipReason
    };
  }

  return {
    answer: localFallbackAnswer(question, context),
    mode: "local_fallback",
    llmProvider: "none",
    llmUsed: false,
    llmSkipReason: groundedProvider.skipReason
  };
}
