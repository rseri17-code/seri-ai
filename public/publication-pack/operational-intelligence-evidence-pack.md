# Operational Intelligence Evidence Pack

Version: 1.0
Status: public-safe evaluation model for technical review
Updated: 2026-07-25

This evidence pack defines what would make Operational Intelligence credible to experienced engineers. It does not claim production impact from synthetic material. It defines the benchmark, review, and falsification structure required to strengthen the doctrine over time.

Structured practitioner review path: /contact

## Related References

- Canonical Doctrine: [/wiki/operational-intelligence-canonical-doctrine](/wiki/operational-intelligence-canonical-doctrine)
- Reference Architecture: [/wiki/operational-intelligence-reference-architecture](/wiki/operational-intelligence-reference-architecture)
- Operations Room: [/investigation-room](/investigation-room)

## 1. Evidence Question

The central question is not "what should be built next?"

The central question is:

What evidence would convince another experienced engineer that this operating model is useful?

Operational Intelligence becomes stronger when claims can be tested, challenged, compared, and revised.

## 2. Evidence Classes

| Evidence class | Purpose | Strong signal | Weak signal |
| --- | --- | --- | --- |
| Implementation example | Shows how the model behaves end to end | Public-safe scenario with inputs, outputs, states, and decisions | Polished demo without inspectable state |
| Benchmark fixture | Makes expected behavior repeatable | Prompt, context, expected answer, refusal rule, citation requirement | One-off subjective impression |
| Control comparison | Separates value from existing practice | Dashboard-only, chatbot-only, ticket-only, and OI workflow compared | Claims of superiority without baseline |
| Practitioner review | Tests real-world comprehension | Structured review by SRE, architect, AI engineer, governance, executive | Generic praise |
| Regression history | Shows maturity over time | Failures tracked and corrected across releases | Only passing scores shown |
| Negative case | Tests boundaries | Refuses confidential, unsupported, or unsafe requests | Answers everything confidently |

## 3. Version Discipline

The Canonical Doctrine and Reference Architecture should evolve as versioned reference assets. Future v1.x changes should be incremental, evidence-based, and backward-compatible unless practitioner review or benchmark results show that a term, layer boundary, or invariant is actively misleading.

Revision evidence should answer one of five questions:

- What implementation example shows the model working better than a weaker baseline?
- What benchmark or replay caught a failure that prose review would have missed?
- What practitioner feedback exposed ambiguity in a definition, layer boundary, or approval rule?
- What control comparison shows where the model adds value over observability, AIOps, incident management, ITSM, or chatbot-only assistance?
- What negative case proves the model knows when to refuse, redirect, or state insufficient evidence?

Any proposed change that cannot answer one of those questions should remain a note, not a doctrine revision.

## 4. Implementation-Neutral Flow

1. Ingest public-safe operational signals.
2. Reconstruct the transaction journey.
3. Resolve topology and ownership context.
4. Build an evidence graph with observations, inferences, contradictions, missing evidence, and confirmed facts.
5. Propose competing hypotheses.
6. Move hypotheses through explicit lifecycle states.
7. Run evaluation gates for grounding, citations, refusal, uncertainty, and action boundaries.
8. Draft a decision packet.
9. Require operator approval for consequential action.
10. Convert reviewed outcomes into memory, replay seeds, and future fixtures.

This flow is intentionally vendor-neutral. It does not require a specific model provider, observability vendor, database, cloud provider, graph engine, agent framework, or ticketing system.

## 5. OI-ROOM-001 Benchmark Rubric

| Dimension | Acceptance question | Evidence required |
| --- | --- | --- |
| Retrieval | Did the system retrieve the doctrine, reference architecture, and relevant OI-ROOM-001 context? | Source links or traceable source ids |
| Grounding | Are all material claims supported by approved public content? | Citations or explicit uncertainty |
| Citation validity | Are cited links relevant and reachable? | Link validation and manual spot check |
| Evidence attribution | Are observation, inference, contradiction, missing evidence, and confirmed fact separated? | Visible labels in the output |
| Hypothesis lifecycle | Do hypotheses move through explicit states? | Proposed, supported, contradicted, rejected, or confirmed state |
| Contradiction handling | Does contradictory evidence change confidence or route? | Hypothesis update or rejection |
| Missing evidence | Does the system state what is unknown? | Missing-evidence item with impact |
| Decision safety | Are actions framed as reviewable options? | Decision packet, risk, reversibility, owner |
| Operator control | Are consequential actions gated? | Explicit approval requirement |
| Replay reproducibility | Can the scenario be replayed from approved context? | Replay seed and fixture id |
| Refusal | Does the system refuse confidential or unsupported questions? | Public-safe refusal and redirection |
| Latency | Is the experience usable for beta review? | Measured route and API latency where available |

## 6. Control Comparisons

| Mode | What it is good at | What it tends to miss | OI expectation |
| --- | --- | --- | --- |
| Dashboard-only | Fast visual inspection | Reasoning trace, hypothesis lifecycle, decision history | Preserve visibility but add evidence-backed reasoning |
| Chatbot-only | Fast narrative explanation | Provenance, uncertainty, approval boundaries | Keep explanation grounded and reviewable |
| Ticket-only | Durable record | Real-time synthesis, structured evidence graph | Convert outcomes into memory and replay seeds |
| Runbook-only | Known procedural response | Novel ambiguity, contradictory evidence | Use as evidence, not as proof |
| OI workflow | Reviewable operational judgment | Requires disciplined context and evaluation | Improve decision quality under uncertainty |

## 7. OI-ROOM-001 Control Comparison Protocol

This protocol compares the same synthetic OI-ROOM-001 case across weaker and adjacent modes. It is a measurement design, not a claim that measured superiority has already been proven.

| Mode | Allowed input | Expected output | Primary risk |
| --- | --- | --- | --- |
| Dashboard-only | Synthetic telemetry, traces, and status signals | Human-written investigation notes | Visibility without reasoning trace |
| Chatbot-only | Same public-safe case context as unstructured text | Narrative explanation with requested citations | Fluency without durable evidence state |
| Ticket-only | Synthetic incident ticket, comments, and resolution notes | Timeline and post-incident summary | Durable record without live hypothesis movement |
| Operational Intelligence workflow | Typed evidence, transaction path, topology context, hypotheses, eval gates, and approval boundary | Decision packet with evidence, uncertainty, contradiction handling, replay seed, and operator approval class | Slower workflow if evidence structure does not improve judgment |

Each run should use the same OI-ROOM-001 facts, red herrings, contradictory evidence, and missing-evidence condition.

Reviewers should score each mode on:

- Evidence completeness
- Hypothesis quality
- Contradiction handling
- Missing-evidence honesty
- Decision safety
- Replayability
- Reviewer confidence

Report the comparison as an evidence ledger entry with limitations. A favorable result strengthens the doctrine only for the tested case. An unfavorable result should revise the doctrine if the workflow adds process weight without improving decision quality.

## 8. Reviewer-Run Worksheet

Use this worksheet when asking an experienced practitioner to review OI-ROOM-001. The reviewer should not be asked whether the site looks impressive. The reviewer should decide what each mode preserves, loses, invents, or leaves untestable.

### Run Setup

| Step | Reviewer action | Required evidence |
| --- | --- | --- |
| 1 | Read the same OI-ROOM-001 case facts for every mode. | Synthetic facts, red herring, contradiction, missing evidence, transaction timing, approval boundary |
| 2 | Inspect dashboard-only output. | Notes on what the dashboard made visible and what the operator had to infer |
| 3 | Inspect chatbot-only output. | Notes on citations, uncertainty, unsupported claims, and action language |
| 4 | Inspect ticket-only output. | Notes on timeline quality, ownership, and replayability |
| 5 | Inspect Operational Intelligence output. | Evidence graph, hypothesis state, evaluation gates, decision packet, approval class, replay seed |
| 6 | Record one evidence ledger entry per dimension. | Result, limitation, failure signal, and next improvement |

### Scoring Discipline

Do not publish one aggregate score. Score each mode independently on the dimension it is being tested against. Use these verdicts:

- Strong: the mode exposes enough evidence for another reviewer to reproduce the judgment.
- Mixed: the mode preserves useful information but loses an important state, boundary, source, or uncertainty.
- Weak: the mode depends on private memory, unsupported inference, hidden assumptions, or unreviewable action language.
- Not assessable: the mode does not expose enough information to judge.

### Evidence Ledger Entry

| Field | Required content |
| --- | --- |
| Reviewer role | SRE, architect, AI engineer, governance reviewer, executive, or other |
| Mode reviewed | Dashboard-only, chatbot-only, ticket-only, or Operational Intelligence workflow |
| Dimension | Evidence completeness, transaction reconstruction, contradiction handling, missing-evidence honesty, hypothesis quality, decision safety, replayability, or reviewer confidence |
| Verdict | Strong, mixed, weak, or not assessable |
| Evidence observed | Public-safe artifact, source link, state transition, label, packet field, or missing item |
| Reasoning loss | What disappeared, became ambiguous, or was invented |
| Limitation | What this run does not prove |
| Doctrine impact | No change, clarify term, clarify layer boundary, add fixture, revise invariant, or remove claim |

### Failure Examples

| Failure | Why it weakens the doctrine | Improvement |
| --- | --- | --- |
| Chatbot-only output gives a fluent RCA with no source trail. | It shows narrative synthesis can outrun evidence. | Require citation relevance and missing-evidence checks before RCA language. |
| Dashboard-only output spots latency quickly but loses transaction path. | It shows visibility is necessary but not sufficient for decision review. | Preserve transaction timing as a first-class record. |
| Ticket-only output preserves final resolution but not hypothesis movement. | It weakens replay and learning because future reviewers cannot see alternatives. | Record hypothesis lifecycle and rejected alternatives. |
| Operational Intelligence output takes longer but does not improve contradiction handling. | It falsifies the claim that extra structure improves judgment for this case. | Simplify the workflow or revise the evidence-layer contract. |

## 9. Practitioner Review Questions

### SRE Reviewer

- Can the model reduce investigation ambiguity without hiding uncertainty?
- Does it preserve human command and escalation judgment?
- Are failure modes visible enough during an incident?
- Would this improve post-incident learning?

### Principal Architect

- Are the ten layer boundaries precise enough for independent implementation?
- Can two teams build compatible systems from the reference architecture?
- Are data contracts clear enough to test?
- Are conformance levels meaningful?

### AI Engineer

- Are evaluation gates specific enough to catch regressions?
- Are refusal behaviors testable?
- Can replay seeds reproduce expected failures?
- Are citations evaluated for relevance, not just presence?

### Governance Reviewer

- Are approval boundaries inspectable?
- Are retention and provenance assumptions clear?
- Does the system avoid confidential leakage?
- Can decisions be audited after the fact?

### Executive Reviewer

- Does the model explain operational risk in decision language?
- Does it separate fact from uncertainty?
- Does it clarify business impact?
- Does it make accountability clearer?

## 10. Evidence Ledger Template

| Field | Description |
| --- | --- |
| Claim | The specific claim being evaluated |
| Classification | Established, derived, original, speculative, or unsupported |
| Evidence source | Public asset, benchmark, review, or implementation example |
| Test method | Fixture, walkthrough, review, control comparison, or measurement |
| Result | Pass, fail, mixed, unknown, or not yet tested |
| Limitation | What the evidence does not prove |
| Next improvement | Concrete action to strengthen the claim |

## 11. Current Evidence Ledger

| Claim | Classification | Evidence source | Result | Limitation | Next improvement |
| --- | --- | --- | --- | --- | --- |
| Operational Intelligence is distinct from observability because it focuses on the decision path from evidence to action. | Original synthesis built on established observability practice | Doctrine, comparison tables | Mixed | Distinction is conceptually clear but needs practitioner review | Collect SRE and observability practitioner feedback |
| The ten-layer model can guide implementation. | Original synthesis | Reference architecture | Not yet independently tested | No independent implementation yet | Build or review a second public-safe implementation example |
| Evidence graphs improve reviewability. | Derived from provenance and knowledge graph practice | Doctrine, diagrams, OI-ROOM-001 | Plausible | No measured comparison yet | Compare against chatbot-only and dashboard-only explanations |
| Replay seeds are useful for regression testing operational AI behavior. | Derived from evaluation practice | Eval report, reference architecture | Partial | Current fixtures test assistant behavior, not full workflow replay | Add replay-backed workflow fixtures |
| Operator control should gate consequential actions. | Established governance principle applied to OI | Reference architecture, OI-ROOM-001 | Strong | Needs policy examples for different risk classes | Add approval class examples to future revisions |

## 12. Falsification Criteria

The doctrine should be revised if evidence shows that:

- Experienced SRE teams cannot distinguish Operational Intelligence from existing observability and incident-management practice.
- Independent teams interpret the ten layers so differently that conformance is meaningless.
- Evidence graphs add complexity without improving investigation clarity.
- Operators distrust decision packets because they obscure uncertainty.
- Evaluation gates fail to catch regressions that human reviewers consider obvious.
- The workflow slows urgent response without improving learning, auditability, or decision quality.

## 13. Current Proof Backlog

The current backlog names the evidence still required before stronger public claims should be made. These are not launch blockers for reading the doctrine; they are the review work that would make the doctrine more credible over time.

| Proof area | Evidence needed | Current evidence | Next proof | Would change the model if |
| --- | --- | --- | --- | --- |
| Practitioner review | Structured SRE, architect, AI, governance, executive, and product review. | Review roles and ledger fields are defined. | Collect five public-safe reviews. | Reviewers cannot distinguish OI from adjacent practice. |
| Control comparison | Same-facts OI-ROOM-001 runs across dashboard, chatbot, ticket, and OI modes. | Modes and worksheet dimensions exist. | Publish dimension-level results. | Structure does not improve judgment. |
| Ask quality | Reviewer-labeled Ask sessions across profile, doctrine, routing, unknowns, and boundaries. | Deterministic fixtures and refusal behavior pass. | Compare fallback, vector retrieval, and model synthesis. | Ask cannot cite sources or separate fact from inference. |
| Production reliability | Live route, Ask latency, fallback, contact, and safe analytics evidence. | Local deployment, API, rendering, and budget gates pass. | Review beta telemetry. | Errors or latency make review unreliable. |
| Visual and mobile QA | Screenshots and keyboard notes for core routes at mobile, tablet, and desktop widths. | Viewport, a11y, rendered, and performance checks pass. | Capture browser evidence. | The site still feels like a demo. |
| Identity asset | Approved portrait or identity asset connected to the person-work-evidence path. | Public routes link Ravikanth to the work. | Add an approved durable asset. | The site feels anonymous. |

## 14. Minimum Conformance Checklist

An implementation should not be described as Operational Intelligence unless it can show these proofs. The checklist is implementation-neutral and does not require a specific vendor, model, database, cloud, graph engine, ticketing system, or UI.

| Requirement | Observable proof | Failure signal | Primary reviewer |
| --- | --- | --- | --- |
| Evidence before conclusion | Every material recommendation cites approved evidence or states missing evidence. | Fluent RCA with no source trail. | SRE reviewer |
| Transaction context | The investigation identifies the affected customer, process, or business journey, not only a component. | Local service metric is treated as the whole incident. | Principal architect |
| Topology boundary | Dependency, ownership, and blast-radius assumptions are visible and freshness is stated. | Stale service map is treated as fact. | Principal architect |
| Evidence typing | Observations, inferences, contradictions, missing evidence, and confirmed facts are visually or structurally distinct. | Contradictory or unavailable data is hidden in prose. | SRE reviewer |
| Hypothesis lifecycle | At least two competing hypotheses can move through proposed, supported, contradicted, rejected, or confirmed states. | The first plausible explanation becomes the answer. | SRE reviewer |
| Evaluation gate | Retrieval, grounding, citation relevance, refusal, contradiction handling, and action safety are tested separately. | A single aggregate score implies trust. | AI engineer |
| Decision packet | Consequential action is represented as a reviewable packet with risk, reversibility, owner, fallback, and approval class. | Assistant recommends or executes action without review context. | Governance reviewer |
| Operator control | Human approval, escalation, override, and refusal boundaries are explicit. | Automation boundary is implied or hidden. | Governance reviewer |
| Replay seed | The case can be reproduced from approved public-safe context and versioned expected behavior. | The demo cannot be rerun or compared after changes. | AI engineer |
| Learning loop | Reviewed outcomes update memory, patterns, documentation, and future fixtures. | Post-incident learning remains unstructured narrative. | Executive reviewer |

## 15. Conformance Verdicts

- Conforms: the implementation supplies observable proof for every requirement.
- Partially conforms: the implementation satisfies the invariant but lacks one or more measurable proofs.
- Does not conform: the implementation violates an invariant, hides uncertainty, skips approval, invents evidence, or cannot be replayed.
- Not assessable: the implementation does not expose enough information for an independent reviewer to decide.

The current public Operations Room should be treated as a synthetic conformance example, not production evidence. Its job is to make the checklist inspectable.

## 15. Next Evidence Priorities

1. Run practitioner review with at least one SRE, one architect, one AI engineer, and one governance reviewer.
2. Add replay-backed fixtures for OI-ROOM-001 beyond assistant-only Q&A.
3. Create a second synthetic case with different failure characteristics.
4. Use the reviewer-run worksheet to compare OI output against dashboard-only and chatbot-only baselines.
5. Maintain a public limitations section that records failed assumptions.

The purpose is restraint. Operational Intelligence should earn credibility by showing where it works, where it does not, and what evidence would change the model.
