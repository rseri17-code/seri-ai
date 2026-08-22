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

function normalizeQuestionIntent(question: string) {
  return question
    .toLowerCase()
    .replace(/\bob\s+servab(?:i|il)l?ity\b/g, "observability")
    .replace(/\bob\s+servability\b/g, "observability")
    .replace(/\bobservab(?:i|il)l?ity\b/g, "observability")
    .replace(/\bpobservab(?:i|il)l?ity\b/g, "observability")
    .replace(/\bpobservability\b/g, "observability");
}

export function inferFrameworkLayers(question: string) {
  const lower = normalizeQuestionIntent(question);
  const layers: string[] = [];
  if (/observability|ops for observability|observability for ai|signal|telemetry|metric|log|trace|alert|dashboard|dynamic operational view/.test(lower)) layers.push("Signal Layer");
  if (/transaction|journey|customer|workflow|latency|context acquisition|enterprise context|operational context/.test(lower)) layers.push("Transaction Layer");
  if (/topology|dependency|service|blast|owner|enterprise context|operational context|dynamic operational view|static graph/.test(lower)) layers.push("Topology Layer");
  if (/evidence|receipt|fact|source|provenance|citation|context acquisition|enterprise context|harness|dynamic operational view|observability for ai|ai observability|learning|researching|advancing|research ledger|next proof|trying to prove|trying to gather/.test(lower)) layers.push("Evidence Layer");
  if (/hypothesis|reason|root cause|rca|causal/.test(lower)) layers.push("Reasoning Layer");
  if (/memory|replay seed|lesson|remember|harness|shared context|operational context/.test(lower)) layers.push("Memory Layer");
  if (/eval|evaluation|gate|trust|benchmark|quality|harness|agentic sre|observability for ai|ai observability|researching|advancing|research ledger|next proof|trying to prove|trying to gather/.test(lower)) layers.push("Evaluation Layer");
  if (/decision|action|recommend|risk|rollback/.test(lower)) layers.push("Decision Layer");
  if (/learn|outcome|post|future/.test(lower)) layers.push("Learning Layer");
  if (/human|operator|approve|override|review|escalate|shared context|agentic sre/.test(lower)) layers.push("Operator Layer");
  return [...new Set(layers)].slice(0, 4);
}

export function inferRelatedArtifacts(question: string) {
  const lower = normalizeQuestionIntent(question);
  const artifacts = new Set<string>(["/framework"]);
  if (/start here|first[- ]time|visitor|understand ravikanth|who is ravikanth|what should i know|hire|collaborate|learn from him|professional profile|success map|core questions/.test(lower)) {
    artifacts.add("/start-here");
  }
  if (/current focus|currently focused|building now|what.*building|now/.test(lower)) {
    artifacts.add("/now");
  }
  if (/learning|researching|advancing|research ledger|proof loop|what would change|next proof|trying to prove|trying to gather|current research/.test(lower)) {
    artifacts.add("/now");
  }
  if (/contact|reach out|collaboration|collaborate|conversation/.test(lower)) {
    artifacts.add("/contact");
  }
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
  if (/reviewer-run worksheet|reviewer run worksheet|evidence ledger entry|dimension verdicts|scoring discipline/.test(lower)) {
    artifacts.add("/publication-pack/operational-intelligence-evidence-pack.md");
  }
  if (/proof backlog|proof gap|evidence gap|what is still missing|what remains|not yet proven|external proof|live beta telemetry|visual qa|mobile qa|identity asset|what.*10\/10|what.*ten out of ten/.test(lower)) {
    artifacts.add("/wiki/operational-intelligence-evidence-pack");
    artifacts.add("/contact");
    artifacts.add("/evals");
    artifacts.add("/investigation-room");
    artifacts.add("/background");
  }
  if (/quality scorecard|24 dimension|twenty four dimension|rate the site|rate seri.ai|current rating|current score|10\/10 target|ten out of ten target|how.*rate/.test(lower)) {
    artifacts.add("/wiki/operational-intelligence-evidence-pack");
    artifacts.add("/start-here");
    artifacts.add("/work");
    artifacts.add("/evals");
    artifacts.add("/investigation-room");
  }
  if (/conformance profile|object profile|object fields|pass fail|pass\/fail|evidence object|hypothesis state|required fields|replay seed.*evaluation gate|decision packet.*fields/.test(lower)) {
    artifacts.add("/publication-pack/operational-intelligence-conformance-profile.md");
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
  if (/evidence pack|benchmark|rubric|control case|baseline|practitioner|review|conformance checklist|minimum conformance|observable proof|failure signal|falsifiable|falsification|evidence ledger|claim ledger|claim classification|established|derived|original|speculative|unsupported|prove|proof|credible|skeptical|convince|useful|trying to gather/.test(lower)) {
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
  if (/project proof|work proof|public project evidence|what.*project.*prove|project.*does not prove|inspectable project|review project|work|public work|project|building|product thesis|github|open source|open-source|code|repository|inspect|built/.test(lower)) {
    artifacts.add("/work");
    artifacts.add("/projects");
    artifacts.add("/artifacts");
  }
  if (/written|writing|published|article|library|ideas|frameworks?/.test(lower)) {
    artifacts.add("/library");
    artifacts.add("/ideas");
    artifacts.add("/wiki/operational-intelligence-canonical-doctrine");
  }
  if (/publication spine|reading order|what should i read first|body of work|which publications|published assets|field notes.*patterns|doctrine.*field notes.*patterns|each asset prove/.test(lower)) {
    artifacts.add("/library");
    artifacts.add("/wiki/operational-intelligence-reference-architecture");
    artifacts.add("/investigation-room");
    artifacts.add("/wiki/operational-intelligence-evidence-pack");
    artifacts.add("/work");
  }
  if (/linkedin|context acquisition|enterprise context|operational context|shared context|harness|agentic sre|dynamic operational view|static graph|ops for observability|observability for ai|ai observability/.test(lower)) {
    artifacts.add("/work");
    artifacts.add("/radar");
    artifacts.add("/patterns/agentic-incident-investigation");
    artifacts.add("/wiki/operational-intelligence-canonical-doctrine");
  }
  if (/resume|background|experience|career|certification|credential|linkedin|credible|credibility|architecture judgment|public evidence|professional profile|hire|recruiter|collaborate|learn from him/.test(lower)) {
    artifacts.add("/resume");
    artifacts.add("/background");
  }
  if (/architecture.*engineering.*integration|architecture to production|production delivery|delivery chain|governance.*production|evaluation.*governance|operating loop|production experience|production judgment/.test(lower)) {
    artifacts.add("/background");
    artifacts.add("/work");
    artifacts.add("/resume");
    artifacts.add("/wiki/operational-intelligence-reference-architecture");
    artifacts.add("/evals");
  }
  return [...artifacts].slice(0, 12);
}

function inferReferenceAssetMatches(question: string) {
  const lower = normalizeQuestionIntent(question);
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
  if (/reviewer-run worksheet|reviewer run worksheet|evidence ledger entry|dimension verdicts|scoring discipline/.test(lower)) {
    matches.push("Evidence Pack Markdown: /publication-pack/operational-intelligence-evidence-pack.md");
  }
  if (/conformance profile|object profile|object fields|pass fail|pass\/fail|evidence object|hypothesis state|required fields|replay seed.*evaluation gate|decision packet.*fields/.test(lower)) {
    matches.push("Conformance Profile: /publication-pack/operational-intelligence-conformance-profile.md");
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

export function classifyAskQuestion(question: string) {
  const lower = normalizeQuestionIntent(question);
  if (/confidential|internal|private|proprietary|dashboard|logs?|screenshots?|system prompt|developer message|jailbreak/.test(lower)) return "public_safety_boundary";
  if (/ravikanth|resume|background|experience|career|certification|linkedin|github|recruiter|founder|who is|architecture judgment/.test(lower)) return "builder_evidence";
  if (/oi-room-001|operations room|investigation|incident|rca|hypothesis|root cause/.test(lower)) return "operations_room";
  if (/evidence|citation|source|graph|provenance|receipt|contradict/.test(lower)) return "evidence_reasoning";
  if (/eval|evaluation|gate|trust|benchmark|quality|falsif/.test(lower)) return "evaluation";
  if (/transaction|journey|workflow|latency/.test(lower)) return "transaction_intelligence";
  if (/observability|ops for observability|observability for ai|telemetry|metric|trace|alert|signal|aiops|agentops/.test(lower)) return "adjacent_domain";
  if (/doctrine|definition|framework|layer|architecture|schema|contract|conformance/.test(lower)) return "doctrine_architecture";
  return "general";
}

function localFallbackAnswer(question: string, context: Array<{ title: string; url: string; content: string }>) {
  const lower = normalizeQuestionIntent(question);
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
    "Ask Ravi is an AI assistant, not Ravikanth personally. Ask Ravikanth is a public research interface over Ravikanth Seri's public work, approved public work, and approved public sources: the Operational Intelligence doctrine, Operations Room artifacts, architecture patterns, public writing, resume evidence, GitHub activity, LinkedIn signal, and current AI-native operations thesis.";
  const linkedinContext =
    /linkedin|context acquisition|enterprise context|operational context|shared context|harness|agentic sre|dynamic operational view|static graph|ops for observability|observability for ai|ai observability/.test(lower)
      ? " LinkedIn signal: Ravikanth's public posts frame operational context as an enterprise asset, describe the Context Acquisition Tax, argue for an Enterprise Context Layer, treat the SRE-agent harness as the durable product, distinguish a dynamic operational view from a static graph, and connect ops for observability with observability for AI."
      : "";
  const visitorSuccessContext =
    /start here|first[- ]time|visitor|understand ravikanth|who is ravikanth|what should i know|hire|collaborate|learn from him|professional profile|success map|core questions/.test(lower)
      ? " Visitor success map: /start-here is the best first stop for the north-star questions that connect Ravikanth Seri's career, public work, current focus, GitHub, LinkedIn, resume, contact path, and Operational Intelligence thesis."
      : "";
  const architectureJudgmentContext =
    /architecture judgment|constraints? .*preserve|governed ai action|governed execution|replay evaluation|transaction journeys?|just skills/.test(lower)
      ? " Architecture judgment ledger: the public evidence emphasizes preserving operational evidence before model reasoning, governed execution before AI action, replay and evaluation before trust, transaction journeys before isolated alerts, and public-safe architecture instead of private anecdotes."
      : "";
  const publicCodeContext =
    /github|open source|open-source|public code|repository|repositories|sentinalai/.test(lower)
      ? " Public code inspection path: use GitHub profile github.com/rseri17-code, the user-authorized Sentinalai repository reference, and the seri.ai public artifacts as inspectable public signal. Do not infer repository metrics, production adoption, private deployments, internal integrations, or confidential behavior from public code alone."
      : "";
  const projectProofContext =
    /project proof|work proof|public project evidence|what.*project.*prove|project.*does not prove|inspectable project|review project|stronger public project proof/.test(lower)
      ? " Project proof ledger: the Work and Projects surfaces state what each public project proves, what can be inspected, what it does not prove, the next proof needed, and the reviewer question. Use it to inspect Operations Room, Ask Ravikanth, Transaction Graph Explorer, and AI Evaluation Workbench without inferring private production outcomes."
      : "";
  const publicationSpineContext =
    /publication spine|reading order|what should i read first|body of work|which publications|published assets|field notes.*patterns|doctrine.*field notes.*patterns|each asset prove|written|writing|published|article|library/.test(lower)
      ? " Publication spine: the Library organizes the body of work as Define, Specify, Demonstrate, Challenge, and Connect. It points readers from the Canonical Doctrine to the Reference Architecture, Operations Room, Evidence Pack, and Ravikanth's public work so each asset has a clear proof job."
      : "";
  const productionDeliveryContext =
    /architecture.*engineering.*integration|architecture to production|production delivery|delivery chain|governance.*production|evaluation.*governance|operating loop|production experience|production judgment/.test(lower)
      ? " Production delivery path: the public-safe background represents delivery as Architecture, Engineering, Integration, Evaluation, Governance, and Production Delivery. It should be inspected through constraints, gates, handoffs, fallback behavior, and public evidence rather than protected implementation specifics."
      : "";
  const proofBacklogContext =
    /proof backlog|proof gap|evidence gap|what is still missing|what remains|not yet proven|external proof|live beta telemetry|visual qa|mobile qa|identity asset|what.*10\/10|what.*ten out of ten/.test(lower)
      ? " Proof backlog: the Evidence Pack names the remaining proof work as practitioner review, control-comparison results, reviewer-labeled Ask quality, live beta reliability evidence, browser-based visual and mobile QA, and an approved identity asset. These gaps should be treated as evidence to collect, not as claims already proven."
      : "";
  const qualityScorecardContext =
    /quality scorecard|24 dimension|twenty four dimension|rate the site|rate seri.ai|current rating|current score|10\/10 target|ten out of ten target|how.*rate/.test(lower)
      ? " Quality scorecard: seri.ai tracks 24 evidence-based dimensions with non-inflated scores. The weakest current proof areas are Visual Design, Mobile, Evidence Quality, Overall Memorability, UX, Reliability, Ask Ravi, and AI Systems Credibility because they still need screenshot-grade QA, external review, live beta evidence, reviewer labels, and production retrieval evidence."
      : "";

  return [
    `Direct answer: ${asksAboutRavikanth ? `${ravikanthContext}${linkedinContext}${visitorSuccessContext}${architectureJudgmentContext}${publicCodeContext}${projectProofContext}${publicationSpineContext}${productionDeliveryContext}${proofBacklogContext}${qualityScorecardContext} ${direct}` : `${direct}${linkedinContext}${visitorSuccessContext}${architectureJudgmentContext}${publicCodeContext}${projectProofContext}${publicationSpineContext}${productionDeliveryContext}${proofBacklogContext}${qualityScorecardContext}`}`,
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
