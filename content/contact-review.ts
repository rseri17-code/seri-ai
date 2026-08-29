export const contactReviewPublicSafetyBoundary =
  "Do not include confidential logs, internal screenshots, proprietary names, private architecture, employer data, customer data, credentials, or unpublished operational metrics.";

export const contactReviewChannels = [
  ["https://www.linkedin.com/in/ravikanthseri/", "LinkedIn", "Public posts, certifications, and current building signal."],
  ["https://github.com/rseri17-code", "GitHub", "Public code, experiments, and engineering artifacts."],
  ["/work", "Work Index", "Systems, frameworks, artifacts, writing, and background in one review path."],
  ["/wiki/operational-intelligence-evidence-pack", "Evidence Pack", "Benchmarks, review criteria, falsification, and conformance checks."]
] as const;

export const contactReviewAssets = [
  ["/wiki/operational-intelligence-canonical-doctrine", "Doctrine", "Definitions, boundaries, ten layers, glossary, and claims."],
  ["/wiki/operational-intelligence-reference-architecture", "Reference Architecture", "Implementation contracts, state machines, data objects, gates, and governance."],
  ["/wiki/operational-intelligence-publication-pack", "Publication Pack", "Diagrams, comparison tables, decision packet, walkthrough, and shareable PDFs."],
  ["/wiki/operational-intelligence-evidence-pack", "Evidence Pack", "Benchmarks, control comparisons, falsification criteria, and conformance checklist."],
  ["/work", "Work and Public Code Proof", "GitHub and Sentinalai inspection path, project proof ledger, and public-code boundaries."],
  ["/publication-pack/ravikanth-seri-practitioner-review-packet.md", "Practitioner Review Packet", "External-review sequence, dimensions, verdicts, safe metadata, and do-not-capture rules."],
  ["/investigation-room", "Operations Room", "Interactive synthetic OI-ROOM-001 walkthrough."],
  ["/downloads/operational-intelligence-evidence-pack.pdf", "Evidence Pack PDF", "Printable review packet for skeptical evaluation."]
] as const;

export const contactReviewMinimumEvidenceQuorum = {
  title: "Minimum external evidence quorum",
  summary: "A review run is useful only when it covers multiple ways a serious visitor may evaluate Ravikanth Seri and the Operational Intelligence body of work.",
  requiredCoverage: [
    "At least one SRE or reliability engineer reviews the Operations Room and doctrine boundaries.",
    "At least one principal architect or solutions architect reviews the reference architecture and implementation precision.",
    "At least one AI systems or governance reviewer reviews Ask Ravikanth, evaluation gates, refusal behavior, and human-control boundaries.",
    "At least one executive, founder, or product leader reviews the first-10-minute clarity and memorability path.",
    "At least one recruiter or hiring-facing reviewer reviews whether Ravikanth Seri is visible as the professional identity behind the work."
  ],
  completionRule: "Do not publish a positive review summary unless the run includes at least five public-safe reviews, at least four inspected artifacts, at least one skeptical or mixed verdict, and explicit evidence-needed notes."
} as const;

export const contactReviewRunProtocol = [
  ["Before review", "Tell the reviewer not to use confidential employer details, internal screenshots, logs, private metrics, or non-public architecture."],
  ["First 10 minutes", "Ask the reviewer to follow Work, Background, Doctrine, Operations Room, and Evidence Pack before judging polish."],
  ["Evidence capture", "Capture only role, route, dimension, verdict, inspected public artifacts, strongest claim, weakest claim, evidence needed, implementation question, and limitation."],
  ["Decision", "Classify feedback as Keep, Fix, Clarify, Remove, or Needs Evidence; do not convert it into testimonials or aggregate reputation claims."],
  ["Doctrine update", "Only update the doctrine or reference architecture when feedback identifies a boundary ambiguity, unsupported claim, missing failure mode, or implementation obstacle."]
] as const;

export const firstImpressionSelects = [
  ["personWorkFit", "Person-work fit", ["Specific to Ravikanth", "Partly specific", "Mostly anonymous", "Not assessable"]],
  ["thesisFit", "Thesis clarity", ["Clear", "Partly clear", "Confusing", "Not assessable"]],
  ["proofRouteFit", "Proof route", ["Followed without coaching", "Followed with hesitation", "Lost the thread", "Not assessable"]],
  ["artifactRecall", "Artifact recall", ["Operations Room", "Ask Ravikanth", "Doctrine or Reference Architecture", "Work or public code", "None"]],
  ["demoSignal", "Demo feeling", ["No demo feeling", "Some demo feeling", "Strong demo feeling", "Not assessable"]]
] as const;
