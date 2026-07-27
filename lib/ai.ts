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

function inferFrameworkLayers(question: string) {
  const lower = question.toLowerCase();
  const layers: string[] = [];
  if (/observability|signal|telemetry|metric|log|trace|alert|dashboard/.test(lower)) layers.push("Signal Layer");
  if (/transaction|journey|customer|workflow|latency/.test(lower)) layers.push("Transaction Layer");
  if (/topology|dependency|service|blast|owner/.test(lower)) layers.push("Topology Layer");
  if (/evidence|receipt|fact|source|provenance|citation/.test(lower)) layers.push("Evidence Layer");
  if (/hypothesis|reason|root cause|rca|causal/.test(lower)) layers.push("Reasoning Layer");
  if (/memory|replay seed|lesson|remember/.test(lower)) layers.push("Memory Layer");
  if (/eval|evaluation|gate|trust|benchmark|quality/.test(lower)) layers.push("Evaluation Layer");
  if (/decision|action|recommend|risk|rollback/.test(lower)) layers.push("Decision Layer");
  if (/learn|outcome|post|future/.test(lower)) layers.push("Learning Layer");
  if (/human|operator|approve|override|review|escalate/.test(lower)) layers.push("Operator Layer");
  return [...new Set(layers)].slice(0, 4);
}

function inferRelatedArtifacts(question: string) {
  const lower = question.toLowerCase();
  const artifacts = new Set<string>(["/framework"]);
  if (/doctrine|definition|define|canonical|boundary|boundaries|glossary|what is operational intelligence/.test(lower)) {
    artifacts.add("/wiki/operational-intelligence-canonical-doctrine");
  }
  if (/reference architecture|architecture|implement|implementation|contract|schema|state machine|conformance|governance/.test(lower)) {
    artifacts.add("/wiki/operational-intelligence-reference-architecture");
  }
  if (/publication pack|diagram|pdf|printable|executive summary|comparison table|decision packet|glossary card/.test(lower)) {
    artifacts.add("/wiki/operational-intelligence-publication-pack");
  }
  if (/diagram|state machine|sequence diagram|evidence graph diagram|replay loop/.test(lower)) {
    artifacts.add("/publication-pack/operational-intelligence-diagrams.md");
  }
  if (/comparison table|adjacent discipline|claim classification|observability versus|aiops versus|agentops/.test(lower)) {
    artifacts.add("/publication-pack/operational-intelligence-comparison-tables.md");
  }
  if (/decision packet|approval class|rollback review/.test(lower)) {
    artifacts.add("/publication-pack/decision-packet-example.md");
  }
  if (/printable walkthrough|oi-room-001 walkthrough|transaction timing/.test(lower)) {
    artifacts.add("/publication-pack/oi-room-001-printable-walkthrough.md");
  }
  if (/executive summary|one-page summary|one page summary/.test(lower)) {
    artifacts.add("/publication-pack/operational-intelligence-executive-summary.md");
  }
  if (/glossary|reference card|canonical terms/.test(lower)) {
    artifacts.add("/publication-pack/operational-intelligence-glossary-card.md");
  }
  if (/publication pack pdf|download.*publication/.test(lower)) {
    artifacts.add("/downloads/operational-intelligence-publication-pack.pdf");
  }
  if (/evidence pack pdf|download.*evidence/.test(lower)) {
    artifacts.add("/downloads/operational-intelligence-evidence-pack.pdf");
  }
  if (/walkthrough pdf|download.*walkthrough|printable.*pdf/.test(lower)) {
    artifacts.add("/downloads/oi-room-001-printable-walkthrough.pdf");
  }
  if (/evidence pack|benchmark|rubric|control case|baseline|practitioner|review|conformance checklist|minimum conformance|observable proof|failure signal|falsifiable|falsification|evidence ledger|claim ledger|claim classification|established|derived|original|speculative|unsupported|prove|credible|skeptical|convince|useful/.test(lower)) {
    artifacts.add("/wiki/operational-intelligence-evidence-pack");
  }
  if (/oi-room-001|operations room|investigation|incident|simulator|transaction timing/.test(lower)) {
    artifacts.add("/investigation-room");
  }
  if (/eval|evaluation|gate|trust|fixture|benchmark|baseline/.test(lower)) {
    artifacts.add("/evals");
  }
  if (/skeptical technical reviewer|technical reviewer|challenge the operational intelligence model|challenge.*model/.test(lower)) {
    artifacts.add("/wiki/operational-intelligence-canonical-doctrine");
    artifacts.add("/wiki/operational-intelligence-reference-architecture");
    artifacts.add("/wiki/operational-intelligence-evidence-pack");
    artifacts.add("/evals");
    artifacts.add("/contact");
  }
  if (/work|public work|project|building|product thesis|github|open source|open-source|code|repository/.test(lower)) {
    artifacts.add("/work");
  }
  if (/resume|background|experience|career|certification|credential|linkedin|credible|credibility|architecture judgment|public evidence/.test(lower)) {
    artifacts.add("/resume");
    artifacts.add("/background");
  }
  return [...artifacts].slice(0, 7);
}

function inferReferenceAssetMatches(question: string) {
  const lower = question.toLowerCase();
  const matches: string[] = [];
  if (/diagram|state machine|sequence diagram|evidence graph diagram|replay loop/.test(lower)) {
    matches.push("Diagram Pack: /publication-pack/operational-intelligence-diagrams.md");
  }
  if (/comparison table|adjacent discipline|claim classification|observability versus|aiops versus|agentops/.test(lower)) {
    matches.push("Comparison Tables: /publication-pack/operational-intelligence-comparison-tables.md");
  }
  if (/decision packet|approval class|rollback review/.test(lower)) {
    matches.push("Decision Packet Example: /publication-pack/decision-packet-example.md");
  }
  if (/printable walkthrough|oi-room-001 walkthrough|transaction timing/.test(lower)) {
    matches.push("OI-ROOM-001 Printable Walkthrough: /publication-pack/oi-room-001-printable-walkthrough.md");
  }
  if (/executive summary|one-page summary|one page summary/.test(lower)) {
    matches.push("Executive Summary: /publication-pack/operational-intelligence-executive-summary.md");
  }
  if (/glossary|reference card|canonical terms/.test(lower)) {
    matches.push("Glossary Card: /publication-pack/operational-intelligence-glossary-card.md");
  }
  if (/publication pack pdf|download.*publication/.test(lower)) {
    matches.push("Publication Pack PDF: /downloads/operational-intelligence-publication-pack.pdf");
  }
  if (/evidence pack pdf|download.*evidence/.test(lower)) {
    matches.push("Evidence Pack PDF: /downloads/operational-intelligence-evidence-pack.pdf");
  }
  if (/walkthrough pdf|download.*walkthrough|printable.*pdf/.test(lower)) {
    matches.push("OI-ROOM-001 Walkthrough PDF: /downloads/oi-room-001-printable-walkthrough.pdf");
  }
  return matches;
}

function localFallbackAnswer(question: string, context: Array<{ title: string; url: string; content: string }>) {
  const lower = question.toLowerCase();
  const asksAboutRavikanth = /ravikanth|about me|about him|who is|what.*building|what.*built|why.*trust|architecture judgment|technical direction|engineering philosophy|professional achievement|recruiter|founder|linkedin|github|resume|background/.test(lower);
  const layers = inferFrameworkLayers(question);
  const relatedArtifacts = inferRelatedArtifacts(question);
  const referenceAssetMatches = inferReferenceAssetMatches(question);
  const primarySource = context[0];
  const sourceLine = primarySource ? `${primarySource.title} (${primarySource.url})` : "No matching approved public source";
  const direct =
    context.length > 0
      ? primarySource.content.slice(0, 420)
      : "The public knowledge base does not cover that yet. seri.ai can answer from published material on Operational Intelligence, Agentic SRE, transaction intelligence, evidence-driven investigation, replay, evaluation, and human review.";
  const ravikanthContext =
    "Ask Ravikanth is meant to help visitors understand Ravikanth Seri's public work: the Operational Intelligence doctrine, ReasonOps/Operations Room artifacts, architecture patterns, public writing, resume evidence, GitHub activity, LinkedIn signal, and current AI-native operations thesis.";

  return [
    `Direct answer: ${asksAboutRavikanth ? `${ravikanthContext} ${direct}` : direct}`,
    `Relevant framework layer${layers.length === 1 ? "" : "s"}: ${layers.length ? layers.join(", ") : "Operational Intelligence Framework"}.`,
    `Public source: ${sourceLine}.`,
    "Claim discipline: distinguish established practice, derived application, original synthesis, speculative guidance, and unsupported claims before treating an Operational Intelligence claim as credible.",
    referenceAssetMatches.length ? `Reference asset match: ${referenceAssetMatches.join("; ")}.` : "Reference asset match: use the Canonical Doctrine, Reference Architecture, Publication Pack, and Evidence Pack as the primary review spine.",
    "Public profile links: github.com/rseri17-code and linkedin.com/in/ravikanthseri.",
    "Concrete example: In OI-ROOM-001, a customer transaction degradation is treated as a public-safe case where signals become transaction context, evidence receipts, hypotheses, replay, evaluation gates, operational memory, and human-reviewed action.",
    "Tradeoff or limitation: this local fallback is deterministic and lexical; semantic retrieval and model-generated synthesis improve when production AI and vector search keys are configured.",
    `Related page or artifact: ${relatedArtifacts.join(", ")}.`,
    "Explicit unknowns: anything employer-specific, confidential, proprietary, or unsupported by public sources remains outside the public knowledge base and the public-safe knowledge base.",
    "Suggested next question: Show how the shared case moves through the ten-layer framework."
  ].join("\n\n");
}

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
    return localFallbackAnswer(question, context);
  }

  return localFallbackAnswer(question, context);
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
