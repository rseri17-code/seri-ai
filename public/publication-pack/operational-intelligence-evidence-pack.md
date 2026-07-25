# Operational Intelligence Evidence Pack

Status: public-safe evaluation model for technical review.

This evidence pack defines what would make Operational Intelligence credible to experienced engineers. It does not claim production impact from synthetic material. It defines the benchmark, review, and falsification structure required to strengthen the doctrine over time.

Structured practitioner review path: /contact

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

## 3. Implementation-Neutral Flow

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

## 4. OI-ROOM-001 Benchmark Rubric

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

## 5. Control Comparisons

| Mode | What it is good at | What it tends to miss | OI expectation |
| --- | --- | --- | --- |
| Dashboard-only | Fast visual inspection | Reasoning trace, hypothesis lifecycle, decision history | Preserve visibility but add evidence-backed reasoning |
| Chatbot-only | Fast narrative explanation | Provenance, uncertainty, approval boundaries | Keep explanation grounded and reviewable |
| Ticket-only | Durable record | Real-time synthesis, structured evidence graph | Convert outcomes into memory and replay seeds |
| Runbook-only | Known procedural response | Novel ambiguity, contradictory evidence | Use as evidence, not as proof |
| OI workflow | Reviewable operational judgment | Requires disciplined context and evaluation | Improve decision quality under uncertainty |

## 6. Practitioner Review Questions

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

## 7. Evidence Ledger Template

| Field | Description |
| --- | --- |
| Claim | The specific claim being evaluated |
| Classification | Established, derived, original, speculative, or unsupported |
| Evidence source | Public asset, benchmark, review, or implementation example |
| Test method | Fixture, walkthrough, review, control comparison, or measurement |
| Result | Pass, fail, mixed, unknown, or not yet tested |
| Limitation | What the evidence does not prove |
| Next improvement | Concrete action to strengthen the claim |

## 8. Current Evidence Ledger

| Claim | Classification | Evidence source | Result | Limitation | Next improvement |
| --- | --- | --- | --- | --- | --- |
| Operational Intelligence is distinct from observability because it focuses on the decision path from evidence to action. | Original synthesis built on established observability practice | Doctrine, comparison tables | Mixed | Distinction is conceptually clear but needs practitioner review | Collect SRE and observability practitioner feedback |
| The ten-layer model can guide implementation. | Original synthesis | Reference architecture | Not yet independently tested | No independent implementation yet | Build or review a second public-safe implementation example |
| Evidence graphs improve reviewability. | Derived from provenance and knowledge graph practice | Doctrine, diagrams, OI-ROOM-001 | Plausible | No measured comparison yet | Compare against chatbot-only and dashboard-only explanations |
| Replay seeds are useful for regression testing operational AI behavior. | Derived from evaluation practice | Eval report, reference architecture | Partial | Current fixtures test assistant behavior, not full workflow replay | Add replay-backed workflow fixtures |
| Operator control should gate consequential actions. | Established governance principle applied to OI | Reference architecture, OI-ROOM-001 | Strong | Needs policy examples for different risk classes | Add approval class examples to future revisions |

## 9. What Would Weaken the Doctrine

The doctrine should be revised if evidence shows that:

- Experienced SRE teams cannot distinguish Operational Intelligence from existing observability and incident-management practice.
- Independent teams interpret the ten layers so differently that conformance is meaningless.
- Evidence graphs add complexity without improving investigation clarity.
- Operators distrust decision packets because they obscure uncertainty.
- Evaluation gates fail to catch regressions that human reviewers consider obvious.
- The workflow slows urgent response without improving learning, auditability, or decision quality.

## 10. Minimum Conformance Checklist

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

## 11. Conformance Verdicts

- Conforms: the implementation supplies observable proof for every requirement.
- Partially conforms: the implementation satisfies the invariant but lacks one or more measurable proofs.
- Does not conform: the implementation violates an invariant, hides uncertainty, skips approval, invents evidence, or cannot be replayed.
- Not assessable: the implementation does not expose enough information for an independent reviewer to decide.

The current public Operations Room should be treated as a synthetic conformance example, not production evidence. Its job is to make the checklist inspectable.

## 12. Next Evidence Priorities

1. Run practitioner review with at least one SRE, one architect, one AI engineer, and one governance reviewer.
2. Add replay-backed fixtures for OI-ROOM-001 beyond assistant-only Q&A.
3. Create a second synthetic case with different failure characteristics.
4. Compare OI output against dashboard-only and chatbot-only baselines.
5. Maintain a public limitations section that records failed assumptions.

The purpose is restraint. Operational Intelligence should earn credibility by showing where it works, where it does not, and what evidence would change the model.
