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
  if (/visitor review|first[- ]time review|first[- ]time visitor review|first[- ]impression evidence|person-work fit|demo feeling|artifact recall|review kit|feedback kit|what was clear|what was confusing|most memorable idea|strongest claim|weakest claim|evidence would change|implementation question|submit.*review|evaluate.*site|evaluate.*ravikanth/.test(lower)) {
    artifacts.add("/start-here");
    artifacts.add("/publication-pack/ravikanth-seri-practitioner-review-packet.md");
    artifacts.add("/contact");
    artifacts.add("/wiki/operational-intelligence-evidence-pack");
    artifacts.add("/investigation-room");
  }
  if (/practitioner review packet|external practitioner review|review ravikanth.*evidence|professional representation review|career clarity review|first impression review|does.*represent ravikanth|evaluate.*professional operating system/.test(lower)) {
    artifacts.add("/publication-pack/ravikanth-seri-practitioner-review-packet.md");
    artifacts.add("/start-here");
    artifacts.add("/background");
    artifacts.add("/work");
    artifacts.add("/contact");
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
  if (/public identity mark|profile mark|identity mark|durable identity|portrait photo|portrait asset/.test(lower)) {
    artifacts.add("/identity/ravikanth-seri-identity-mark.svg");
    artifacts.add("/identity/portrait-intake.md");
    artifacts.add("/start-here");
    artifacts.add("/work");
    artifacts.add("/resume");
  }
  if (/approved portrait|portrait intake|portrait validation|portrait photo.*available|real portrait|source image|public-use permission/.test(lower)) {
    artifacts.add("/identity/portrait-intake.md");
    artifacts.add("/identity/ravikanth-seri-identity-mark.svg");
    artifacts.add("/background");
    artifacts.add("/start-here");
  }
  if (/proof backlog|proof gap|evidence gap|what is still missing|what remains|not yet proven|external proof|live beta telemetry|visual qa|mobile qa|identity asset|what.*10\/10|what.*ten out of ten/.test(lower)) {
    artifacts.add("/wiki/operational-intelligence-evidence-pack");
    artifacts.add("/visual-qa/2026-08-22/report.md");
    artifacts.add("/identity/ravikanth-seri-identity-mark.svg");
    artifacts.add("/contact");
    artifacts.add("/evals");
    artifacts.add("/investigation-room");
    artifacts.add("/background");
  }
  if (/quality scorecard|24 dimension|twenty four dimension|rate the site|rate seri.ai|current rating|current score|10\/10 target|ten out of ten target|how.*rate/.test(lower)) {
    artifacts.add("/wiki/operational-intelligence-evidence-pack");
    artifacts.add("/visual-qa/2026-08-22/report.md");
    artifacts.add("/start-here");
    artifacts.add("/work");
    artifacts.add("/evals");
    artifacts.add("/investigation-room");
  }
  if (/visual qa|mobile qa|screenshot artifacts|screenshots|viewport evidence|first[- ]viewport|horizontal overflow|console-error|console error|touch walkthrough/.test(lower)) {
    artifacts.add("/visual-qa/2026-08-22/report.md");
    artifacts.add("/visual-qa/2026-08-22/mobile-touch-walkthroughs.md");
    artifacts.add("/visual-qa/2026-08-22/viewport-results.json");
    artifacts.add("/investigation-room");
    artifacts.add("/wiki/operational-intelligence-evidence-pack");
  }
  if (/keyboard accessibility|keyboard walkthrough|focus order|tab order|screen-reader|screen reader|a11y walkthrough|assistive technology/.test(lower)) {
    artifacts.add("/visual-qa/2026-08-22/keyboard-accessibility-walkthroughs.md");
    artifacts.add("/ask");
    artifacts.add("/investigation-room");
  }
  if (/ask live review|reviewer[- ]labeled ask|ask quality|answer quality baseline|live answer rubric|model synthesis quality|vector retrieval quality|local fallback.*vector retrieval.*model synthesis|safe metadata|raw prompts|aggregate model-quality|aggregate quality score/.test(lower)) {
    artifacts.add("/publication-pack/ask-ravi-live-review-packet.md");
    artifacts.add("/evals");
    artifacts.add("/wiki/operational-intelligence-evidence-pack");
    artifacts.add("/contact");
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
    artifacts.add("/framework");
    artifacts.add("/wiki/operational-intelligence-canonical-doctrine");
  }
  if (/publication spine|reading order|what should i read first|body of work|which publications|published assets|field notes.*patterns|doctrine.*field notes.*patterns|each asset prove/.test(lower)) {
    artifacts.add("/library");
    artifacts.add("/wiki/operational-intelligence-reference-architecture");
    artifacts.add("/investigation-room");
    artifacts.add("/wiki/operational-intelligence-evidence-pack");
    artifacts.add("/work");
  }
  if (/linkedin|thinking lifecycle|field note|developed argument|canonical technical asset|public signal|signal source|context acquisition|enterprise context|operational context|shared context|harness|agentic sre|dynamic operational view|static graph|ops for observability|observability for ai|ai observability/.test(lower)) {
    artifacts.add("/work");
    artifacts.add("/radar");
    artifacts.add("/patterns/agentic-incident-investigation");
    artifacts.add("/wiki/operational-intelligence-canonical-doctrine");
  }
  if (/resume|background|experience|career|certification|credential|linkedin|credible|credibility|architecture judgment|engineering judgment|distinguishes.*(judgment|engineering)|public evidence|professional profile|hire|recruiter|collaborate|learn from him|work with him|engineering organization|technical problems?|speciali[sz]e/.test(lower)) {
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
  if (/ravikanth|resume|background|experience|career|certification|linkedin|github|recruiter|founder|who is|architecture judgment|technical problems?|speciali[sz]e|work with him|engineering organization/.test(lower)) return "builder_evidence";
  if (/oi-room-001|operations room|investigation|incident|rca|hypothesis|root cause/.test(lower)) return "operations_room";
  if (/evidence|citation|source|graph|provenance|receipt|contradict/.test(lower)) return "evidence_reasoning";
  if (/eval|evaluation|gate|trust|benchmark|quality|falsif/.test(lower)) return "evaluation";
  if (/transaction|journey|workflow|latency/.test(lower)) return "transaction_intelligence";
  if (/observability|ops for observability|observability for ai|telemetry|metric|trace|alert|signal|aiops|agentops/.test(lower)) return "adjacent_domain";
  if (/doctrine|definition|framework|layer|architecture|schema|contract|conformance/.test(lower)) return "doctrine_architecture";
  return "general";
}

function inferSuggestedNextQuestion(question: string) {
  const lower = normalizeQuestionIntent(question);
  if (/github|open source|open-source|public code|repository|repositories|sentinalai/.test(lower)) {
    return "What should a reviewer inspect in Sentinalai before inferring production proof?";
  }
  if (/proof backlog|proof gap|evidence gap|what is still missing|what remains|not yet proven|external proof|live beta telemetry|visual qa|mobile qa|identity asset|what.*10\/10|what.*ten out of ten|quality scorecard|rate the site|current rating|current score/.test(lower)) {
    return "What evidence would change the current scorecard or proof backlog?";
  }
  if (/recruiter|founder|hire|collaborate|learn from him|work with him|engineering organization|who is ravikanth|professional profile|resume|background|experience|career|certification|credential|education|technical problems?|speciali[sz]e/.test(lower)) {
    return "Which public evidence best shows Ravikanth's career arc and architecture judgment?";
  }
  if (/doctrine|definition|define|canonical|boundary|boundaries|glossary|what is operational intelligence|observability|aiops|agentops/.test(lower)) {
    return "Which boundary separates Operational Intelligence from observability and AIOps?";
  }
  if (/oi-room-001|operations room|investigation|incident|rca|hypothesis|root cause|contradict|missing evidence/.test(lower)) {
    return "Which evidence in OI-ROOM-001 supports, weakens, or contradicts the leading hypothesis?";
  }
  if (/contact|reach out|collaboration|conversation/.test(lower)) {
    return "What should I inspect before contacting Ravikanth?";
  }
  return "Show how the shared case moves through the ten-layer framework.";
}

function trimToSentence(text: string, limit: number) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= limit) {
    return clean;
  }
  const clipped = clean.slice(0, limit);
  const lastStop = Math.max(clipped.lastIndexOf(". "), clipped.lastIndexOf("! "), clipped.lastIndexOf("? "));
  if (lastStop > limit * 0.4) {
    return clipped.slice(0, lastStop + 1);
  }
  const lastSpace = clipped.lastIndexOf(" ");
  return `${clipped.slice(0, lastSpace > 0 ? lastSpace : limit)}\u2026`;
}

function localFallbackAnswer(question: string, context: Array<{ title: string; url: string; content: string }>) {
  const lower = normalizeQuestionIntent(question);
  const asksAboutRavikanth = /ravikanth|about me|about him|who is|what.*building|what.*built|what.*shipped|done professionally|professionally|his career|his experience|why.*trust|why would|architecture judgment|technical direction|engineering philosophy|professional achievement|recruiter|founder|linkedin|github|resume|background|certification|credential|education|technical problems?|speciali[sz]e|work with him|engineering organization/.test(lower);
  const layers = inferFrameworkLayers(question);
  const relatedArtifacts = inferRelatedArtifacts(question);
  const referenceAssetMatches = inferReferenceAssetMatches(question);
  const suggestedNextQuestion = inferSuggestedNextQuestion(question);
  const primarySource = context[0];
  const sourceLine = primarySource ? `${primarySource.title} (${primarySource.url})` : "No matching approved public source";
  const direct =
    context.length > 0
      ? trimToSentence(primarySource.content, 420)
      : "The public knowledge base does not cover that yet. seri.ai can answer from published material on Operational Intelligence, Agentic SRE, transaction intelligence, evidence-driven investigation, replay, evaluation, and human review.";
  const asksAboutAskPersona =
    /are you ravikanth|are you him|are you the real|are you a bot|are you an ai|are you human|who are you|pretend|persona|imitat|first person|answer posture|how should ask/.test(lower);
  const ravikanthWorkAnswer =
    "Publicly, Ravikanth has built the Operational Intelligence doctrine and reference architecture, the OI-ROOM-001 Operations Room investigation artifact, the public pattern library, and the evaluation harness that gates the claims on this site. Employer work is not published here; the public artifacts are what can be inspected.";
  const ravikanthCareerAnswer =
    "Ravikanth Seri has spent fifteen-plus years on distributed enterprise systems in regulated financial services: enterprise integration and API architecture, identity and platform engineering, cloud and Kubernetes modernization, observability and telemetry, and now production AI systems and Agentic SRE.";
  const ravikanthValueAnswer =
    "The case for a technical conversation is inspectable rather than asserted: a published doctrine that states its own falsification conditions, a reference architecture written so another team could implement it, a working investigation artifact, and an evaluation harness that gates every claim made here.";
  const ravikanthIdentityAnswer =
    "Ravikanth Seri is a senior infrastructure architect working on AI-native enterprise operations. His career runs from enterprise integration and API architecture through identity and platform engineering, cloud and Kubernetes modernization, and observability, into production AI systems, Agentic SRE, and the Operational Intelligence thesis published here.";
  const ravikanthContext = asksAboutAskPersona
    ? "Ask Ravi is an AI assistant, not Ravikanth personally. It operates as an evidence console over approved public work and Ravikanth Seri's public work graph: Operational Intelligence doctrine, Operations Room artifacts, architecture patterns, public writing, resume evidence, GitHub activity, LinkedIn signal, and current AI-native operations thesis. Answer posture: reflect Ravikanth's public engineering judgment through evidence, constraints, tradeoffs, and inspectable routes; do not imitate him in first person or turn the answer into generic chatbot commentary."
    : /what.*(built|build|building|shipped|ship|created|made)|which.*(built|shipped)/.test(lower)
      ? ravikanthWorkAnswer
      : /why.*(hire|work with|talk|conversation|organi[sz]ation|team|recruit|collaborate|want)/.test(lower)
        ? ravikanthValueAnswer
        : /career|professionally|profession|experience|history|arc|done professionally|worked/.test(lower)
          ? ravikanthCareerAnswer
          : ravikanthIdentityAnswer;
  const linkedinContext =
    /linkedin|thinking lifecycle|field note|developed argument|canonical technical asset|public signal|signal source|context acquisition|enterprise context|operational context|shared context|harness|agentic sre|dynamic operational view|static graph|ops for observability|observability for ai|ai observability/.test(lower)
      ? " LinkedIn signal: Ravikanth's public posts frame operational context as an enterprise asset, describe the Context Acquisition Tax, argue for an Enterprise Context Layer, treat the SRE-agent harness as the durable product, distinguish a dynamic operational view from a static graph, and connect ops for observability with observability for AI. Thinking signal lifecycle: LinkedIn signal is not proof by itself; useful signals move from LinkedIn Post to Observation / Field Note to Developed Argument to Pattern to Framework to Canonical Technical Asset to Interactive Demonstration when justified. This prevents social-media chronology from becoming site structure and routes mature claims to /radar, /library, /patterns, /framework, the Doctrine, and /investigation-room."
      : "";
  const credentialContext =
    /certification|credential|education|degree|aws solutions architect|kubernetes administrator|data scientist|artificial intelligence associate|datapower|university of new haven|north carolina state/.test(lower)
      ? " Credential evidence: /resume lists education and certifications as supporting evidence with issuer, status, source class, and explicit limits. Current public evidence includes MS Industrial Engineering from University of New Haven, Artificial Intelligence Associate and Certified Data Scientist from North Carolina State University, historical AWS Solutions Architect Associate status expired Mar 2023, Certified Kubernetes Administrator, and IBM Certified DataPower Administrator. Credentials support the career arc but do not replace inspectable project, architecture, evaluation, or public-work evidence."
      : "";
  const visitorSuccessContext =
    /start here|first[- ]time|visitor|understand ravikanth|who is ravikanth|what should i know|hire|collaborate|learn from him|work with him|engineering organization|professional profile|success map|core questions/.test(lower)
      ? " Visitor success map: /start-here is the best first stop for the north-star questions that connect Ravikanth Seri's career, public work, current focus, GitHub, LinkedIn, resume, contact path, and Operational Intelligence thesis."
      : "";
  const visitorReviewContext =
    /visitor review|first[- ]time review|first[- ]time visitor review|first[- ]impression evidence|person-work fit|demo feeling|artifact recall|review kit|feedback kit|what was clear|what was confusing|most memorable idea|strongest claim|weakest claim|evidence would change|implementation question|submit.*review|evaluate.*site|evaluate.*ravikanth/.test(lower)
      ? " First-Time Visitor Review Kit: /start-here now gives reviewers a path to orient, inspect the person-work link, inspect proof, challenge the thesis, run the Operations Room, and submit public-safe feedback through /contact. The Contact review form captures first-impression evidence as bounded categories: first-impression verdict, person-work fit, thesis clarity, proof route, artifact recall, and demo feeling. The Practitioner Review Packet at /publication-pack/ravikanth-seri-practitioner-review-packet.md defines reviewer roles, review sequence, review dimensions, safe metadata, verdicts, do-not-capture rules, and a minimum external evidence quorum. Useful feedback should name what was clear, what was confusing, the most memorable idea, strongest and weakest claims, evidence needed, and implementation questions without confidential material. No external practitioner verdicts have been published yet."
      : "";
  const practitionerReviewContext =
    /practitioner review packet|external practitioner review|review ravikanth.*evidence|professional representation review|career clarity review|first impression review|does.*represent ravikanth|evaluate.*professional operating system|evidence quorum|review quorum|revision trigger/.test(lower)
      ? " Practitioner review packet: /publication-pack/ravikanth-seri-practitioner-review-packet.md is the structured external-review protocol for evaluating professional representation: whether seri.ai represents Ravikanth Seri, his career arc, public work, technical authority, evidence quality, Operations Room usefulness, Ask usefulness, and memorability. Its minimum external evidence quorum requires at least five public-safe reviews across SRE/reliability, principal architecture, AI systems or governance, executive/founder/product, and recruiter or hiring-facing perspectives. It requires at least four inspected artifacts, at least one skeptical or mixed verdict, explicit evidence-needed notes, and revision if reviewers cannot explain the person-work-thesis relationship or classify Operational Intelligence as renamed observability or generic AIOps. It captures safe metadata only and does not claim external practitioner verdicts yet."
      : "";
  const architectureJudgmentContext =
    /architecture judgment|engineering judgment|distinguish.*judgment|constraints? .*preserve|governed ai action|governed execution|replay evaluation|transaction journeys?|just skills/.test(lower)
      ? " Architecture judgment ledger: the public evidence emphasizes preserving operational evidence before model reasoning, governed execution before AI action, replay and evaluation before trust, transaction journeys before isolated alerts, and public-safe architecture instead of private anecdotes."
      : "";
  const publicCodeContext =
    /github|open source|open-source|public code|repository|repositories|sentinalai/.test(lower)
      ? " Public code inspection path: use GitHub profile github.com/rseri17-code, the user-authorized Sentinalai repository reference, and the seri.ai public artifacts as inspectable public signal. /work now defines a public-code review rubric for inspecting whether Sentinalai shows an operational reasoning loop, bounded execution and governance, evaluation and replay surfaces, and connection to Ravikanth's career arc. The authorized public checkout exposes agent notes, investigation skill files, playbook configuration, eval scenarios, receipt-shaped artifacts, memory/wiki structure, and public-safe architecture notes. Do not infer repository metrics, production adoption, private deployments, internal integrations, live incident outcomes, or confidential behavior from public code alone."
      : "";
  const projectProofContext =
    /project proof|work proof|public project evidence|what.*project.*prove|project.*does not prove|inspectable project|review project|stronger public project proof/.test(lower)
      ? " Project proof ledger: the Work and Projects surfaces state what each public project proves, what can be inspected, what it does not prove, the next proof needed, and the reviewer question. Use it to inspect Operations Room, Ask Ravikanth, Transaction Graph Explorer, and AI Evaluation Workbench without inferring private production outcomes."
      : "";
  const publicationSpineContext =
    /publication spine|reading order|what should i read first|body of work|which publications|published assets|field notes.*patterns|doctrine.*field notes.*patterns|each asset prove|written|writing|published|article|library/.test(lower)
      ? " Publication spine: the Library organizes the body of work as Define, Specify, Demonstrate, Challenge, and Connect. It points readers from the Doctrine to the Reference Architecture, Operations Room, Evidence Pack, and Ravikanth's public work so each asset has a clear proof job."
      : "";
  const productionDeliveryContext =
    /architecture.*engineering.*integration|architecture to production|production delivery|delivery chain|governance.*production|evaluation.*governance|operating loop|production experience|production judgment/.test(lower)
      ? " Production delivery path: the public-safe background represents delivery as Architecture, Engineering, Integration, Evaluation, Governance, and Production Delivery. It should be inspected through constraints, gates, handoffs, fallback behavior, and public evidence rather than protected implementation specifics."
      : "";
  const proofBacklogContext =
    /proof backlog|proof gap|evidence gap|what is still missing|what remains|not yet proven|external proof|live beta telemetry|visual qa|mobile qa|identity asset|what.*10\/10|what.*ten out of ten/.test(lower)
      ? " Proof backlog: the Evidence Pack names the remaining proof work as practitioner review, control-comparison results, reviewer-labeled Ask quality, live beta reliability evidence, touch walkthroughs and external visual review, stronger identity validation, and public-code/project proof walkthroughs. A durable non-photographic identity mark exists, and the approved portrait is integrated on home, background, and resume; external first-impression review remains open. Durable first-viewport screenshot artifacts are captured for nine critical routes, so remaining visual proof should focus on touch use, hierarchy, density, and reviewer findings. Public-code proof should focus on reviewer walkthroughs of GitHub, the authorized Sentinalai public repository reference, Work, Projects, and the Public Project Proof Ledger without inferring repository metrics, production adoption, private deployments, or live incident outcomes."
      : "";
  const identityAssetContext =
    /public identity mark|profile mark|identity mark|durable identity|portrait photo|portrait asset/.test(lower)
      ? " Identity asset: Ravikanth Seri Public Identity Mark is available at /identity/ravikanth-seri-identity-mark.svg. It is a durable public-safe non-photographic identity mark, not a portrait photo, and it supports the person-work-evidence path without replacing career evidence or public proof. The approved portrait is tracked through /identity/portrait-intake.md and renders on home, background, and resume."
      : "";
  const portraitIntakeContext =
    /approved portrait|portrait intake|portrait validation|portrait photo.*available|real portrait|source image|public-use permission/.test(lower)
      ? " Portrait status: /identity/portrait-intake.md defines the approved portrait intake contract. The approved portrait is integrated at /identity/ravikanth-seri-portrait.webp with JPG fallback, sourced from a durable image explicitly provided by Ravikanth, and rendered on home, background, and resume. It avoids employer branding and internal screens; external first-impression review remains the next identity proof."
      : "";
  const qualityScorecardContext =
    /quality scorecard|24 dimension|twenty four dimension|rate the site|rate seri.ai|current rating|current score|10\/10 target|ten out of ten target|how.*rate/.test(lower)
      ? " Quality scorecard: seri.ai tracks 24 evidence-based dimensions with non-inflated scores. The Visual Design and Mobile scores now include 27 durable first-viewport screenshots across nine critical routes, while weaker proof areas still include Evidence Quality, Overall Memorability, UX, Reliability, Ask Ravi, and AI Systems Credibility because they need external review, touch walkthroughs, live beta evidence, reviewer labels, and production retrieval evidence."
      : "";
  const visualQaContext =
    /visual qa|mobile qa|screenshot artifacts|screenshots|viewport evidence|first[- ]viewport|horizontal overflow|console-error|console error|touch walkthrough/.test(lower)
      ? " Visual QA evidence: /visual-qa/2026-08-22/report.md records 27 first-viewport screenshots across Home, Start Here, Ask, Operations Room, Work, Background, Doctrine, Radar, and Evidence Pack at 390x844, 768x1024, and 1440x1000. /visual-qa/2026-08-22/mobile-touch-walkthroughs.md adds source-validated mobile walkthrough notes for Ask, Operations Room, Doctrine, Radar, and Work. The manifest records zero horizontal-overflow findings, zero console-error pages, and visible H1/main content for every captured route. Limitation: external reviewer feedback and physical-device lab evidence are still missing."
      : "";
  const keyboardA11yContext =
    /keyboard accessibility|keyboard walkthrough|focus order|tab order|screen-reader|screen reader|a11y walkthrough|assistive technology/.test(lower)
      ? " Keyboard accessibility evidence: /visual-qa/2026-08-22/keyboard-accessibility-walkthroughs.md records source-validated keyboard paths for Ask Ravikanth and Operations Room. It verifies intended skip-link, focus, labelled-control, source-link, evidence-state, reduced-motion, and graph-fallback review paths from source contracts. Limitation: it is not a screen-reader transcript or external reviewer lab run; browser keyboard recording and assistive-technology testing remain open."
      : "";
  const askLiveReviewContext =
    /ask live review|reviewer[- ]labeled ask|ask quality|answer quality baseline|live answer rubric|model synthesis quality|vector retrieval quality|local fallback.*vector retrieval.*model synthesis|safe metadata|raw prompts|aggregate model-quality|aggregate quality score/.test(lower)
      ? " Ask live review packet: /publication-pack/ask-ravi-live-review-packet.md defines the controlled review protocol for Ask Ravikanth across local_fallback, vector_retrieval, and model_synthesis. Reviewers should use safe metadata only, open cited public sources, and avoid raw confidential prompts. No reviewer-labeled live Ask sessions have been published yet, and no aggregate quality score is published until multiple reviewer-labeled sessions exist."
      : "";

  return [
    `Direct answer: ${asksAboutRavikanth ? `${ravikanthContext}${linkedinContext}${credentialContext}${visitorSuccessContext}${visitorReviewContext}${practitionerReviewContext}${architectureJudgmentContext}${publicCodeContext}${projectProofContext}${publicationSpineContext}${productionDeliveryContext}${proofBacklogContext}${identityAssetContext}${portraitIntakeContext}${qualityScorecardContext}${visualQaContext}${keyboardA11yContext}${askLiveReviewContext} ${direct}` : `${direct}${linkedinContext}${credentialContext}${visitorSuccessContext}${visitorReviewContext}${practitionerReviewContext}${architectureJudgmentContext}${publicCodeContext}${projectProofContext}${publicationSpineContext}${productionDeliveryContext}${proofBacklogContext}${identityAssetContext}${portraitIntakeContext}${qualityScorecardContext}${visualQaContext}${keyboardA11yContext}${askLiveReviewContext}`}`,
    `Relevant framework layer${layers.length === 1 ? "" : "s"}: ${layers.length ? layers.join(", ") : "Operational Intelligence Framework"}.`,
    `Public source: ${sourceLine}.`,
    "Claim discipline: distinguish established practice, derived application, original synthesis, speculative guidance, and unsupported claims before treating an Operational Intelligence claim as credible.",
    referenceAssetMatches.length ? `Reference asset match: ${referenceAssetMatches.join("; ")}.` : "Reference asset match: use the Doctrine, Reference Architecture, Publication Pack, and Evidence Pack as the primary review spine.",
    "Public profile links: github.com/rseri17-code and linkedin.com/in/ravikanthseri.",
    "Concrete example: In OI-ROOM-001, a customer transaction degradation is treated as a public-safe case where signals become transaction context, evidence receipts, hypotheses, replay, evaluation gates, operational memory, and human-reviewed action.",
    "Tradeoff or limitation: this local fallback is deterministic and lexical; semantic retrieval and model-generated synthesis improve when production AI and vector search keys are configured.",
    `Related page or artifact: ${relatedArtifacts.join(", ")}.`,
    "Explicit unknowns: anything employer-specific, confidential, proprietary, or unsupported by public sources remains outside the public knowledge base and the public-safe knowledge base.",
    `Suggested next question: ${suggestedNextQuestion}`
  ]
    .join("\n\n")
    .replace(/([.!?])\s*\.(?=\s|$)/g, "$1");
}

export type AskAnswerMode = "ai_synthesis" | "local_fallback" | "timeout_fallback";

export async function generateRaviAnswer({ question, context, history = [] }: GenerateArgs): Promise<{ answer: string; mode: AskAnswerMode }> {
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
      "7. Follow the Ask persona contract in the system instruction: answer as a public evidence interface over Ravikanth's work, not as Ravikanth personally and not as a generic chatbot.",
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

    return { answer: response.content.map((block) => ("text" in block ? block.text : "")).join(""), mode: "ai_synthesis" };
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

    return { answer: response.choices[0]?.message.content ?? "I do not have enough approved public context to answer that.", mode: "ai_synthesis" };
  }

  return { answer: localFallbackAnswer(question, context), mode: "local_fallback" };
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
