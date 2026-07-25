# Operational Intelligence Reference Architecture v1.0

Version: 1.0  
Status: Draft for Technical Review  
Date: 2026-07-17  
Normative source: Operational Intelligence Canonical Doctrine v1.0  
Publication status: Draft for Technical Review, not Final Standard

## Review History

- 2026-07-17: Initial reference architecture draft created from the Operational Intelligence Canonical Doctrine v1.0.
- Review board requested: Google SRE, Microsoft distributed systems, AWS architecture, CNCF/OpenTelemetry, NIST AI RMF, AI evaluation, enterprise governance.

## Normative References

The key words MUST, MUST NOT, SHOULD, SHOULD NOT, and MAY are to be interpreted as described in RFC 2119 and RFC 8174.

- RFC 2119: Key words for use in RFCs to indicate requirement levels, https://www.rfc-editor.org/rfc/rfc2119
- RFC 8174: Ambiguity of uppercase vs lowercase in RFC 2119 key words, https://www.rfc-editor.org/rfc/rfc8174
- Operational Intelligence Canonical Doctrine v1.0, local source: content/wiki/operational-intelligence-canonical-doctrine.mdx
- Google SRE Book, https://sre.google/sre-book/table-of-contents/
- Google SRE monitoring guidance, https://sre.google/resources/book-update/monitoring-distributed-systems/
- OpenTelemetry documentation, https://opentelemetry.io/docs/
- NIST AI Risk Management Framework 1.0, https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10
- NIST SP 800-61 Rev. 3, Incident Response Recommendations and Considerations for Cybersecurity Risk Management, https://csrc.nist.gov/pubs/sp/800/61/r3/final
- W3C PROV Overview, https://www.w3.org/TR/prov-overview/
- W3C PROV Data Model, https://www.w3.org/TR/prov-dm/
- ACM Computing Surveys, Knowledge Graphs, https://doi.org/10.1145/3447772
- OpenAI Evals, https://github.com/openai/evals

## 1. Executive Summary

This reference architecture operationalizes the Operational Intelligence Canonical Doctrine v1.0. The doctrine explains why Operational Intelligence exists. This document specifies how an implementation SHOULD behave so independent engineering teams can build substantially similar systems without depending on a vendor, cloud provider, model, framework, or specific platform.

The intended audience is senior engineers, enterprise architects, SRE leaders, AI platform engineers, observability architects, governance teams, and incident-management owners.

Operational Intelligence does not replace observability. Observability provides telemetry and instrumentation. Operational Intelligence uses telemetry, transaction context, topology, evidence, memory, evaluation, and operator review to produce inspectable operational understanding.

Operational Intelligence does not replace SRE. SRE provides reliability practices, incident response, postmortems, automation discipline, and operational excellence. Operational Intelligence defines a reasoning and evidence architecture that SHOULD support those practices.

Operational Intelligence does not replace incident management. Incident management coordinates response and restoration. Operational Intelligence SHOULD produce evidence, hypotheses, decision packets, and learning records that support incident command, escalation, and post-incident review.

Operational Intelligence does not replace AI evaluation. It requires AI evaluation. Any implementation that uses AI assistance MUST evaluate retrieval, grounding, evidence attribution, refusal, contradiction handling, recommendation safety, and operator approval behavior.

The lifecycle is:

Doctrine -> Reference Architecture -> Implementation -> Deployment

The doctrine is normative for meaning. The reference architecture is normative for behavioral contracts. Implementations choose specific technologies. Deployments bind the implementation to organizational policy, data classification, identity, authorization, and operational risk.

## 2. Architecture Principles

Evidence before conclusions. Implementations MUST gather and expose supporting evidence before presenting conclusions. Rationale: operational decisions require traceable justification. Violation consequence: confident but unsupported RCA narratives.

Transactions before isolated components. Implementations SHOULD reason over customer, process, or business journeys before ranking component-level explanations. Rationale: operators need impact, not only component symptoms. Violation consequence: local warnings can be mistaken for business impact.

Explicit uncertainty. Implementations MUST expose unknowns, missing evidence, contradictions, confidence movement, and unsupported claims. Rationale: uncertainty is part of operational reality. Violation consequence: operators may over-trust incomplete reasoning.

Replayability. Implementations MUST preserve enough approved context to reproduce an investigation path without requiring access to live production systems. Rationale: evaluation and review require repeatability. Violation consequence: behavior cannot be audited or regression-tested.

Operator accountability. Consequential actions MUST remain subject to approval boundaries and audit. Rationale: accountability cannot be delegated to an opaque system. Violation consequence: unsafe automation, unclear ownership, and poor incident governance.

Evaluation before autonomy. Implementations MUST NOT increase automation authority without evidence from evaluation gates. Rationale: capability should be earned through tested behavior. Violation consequence: automation scope expands faster than trust.

Shared operational memory. Implementations SHOULD store reviewed incident patterns, decisions, outcomes, and replay seeds in a shared memory with provenance. Rationale: repeated incidents should improve future investigations. Violation consequence: every incident starts from zero.

Deterministic reasoning where reliability matters. Implementations SHOULD use deterministic workflows for retrieval, evidence capture, state transitions, approvals, and evaluation gates even when AI-generated text is used. Rationale: reviewability requires stable contracts. Violation consequence: unpredictable behavior becomes impossible to govern.

## 3. Architectural Invariants

Every recommendation MUST identify supporting evidence or explicitly state that evidence is unavailable.

Every operational claim MUST have provenance.

Every hypothesis MUST be falsifiable by evidence, contradiction, missing evidence, or operator decision.

Every consequential action MUST have approval boundaries.

Every learned memory MUST be reviewable, attributable, and reversible.

Every recommendation MUST expose uncertainty, limitations, and known contradictions.

Every replay MUST be reproducible from a replay seed and replay record.

Every refusal MUST be explainable without exposing confidential information.

An implementation MUST NOT treat sequence alone as proof of causality.

An implementation MUST NOT ingest confidential employer material, private logs, internal dashboards, proprietary project names, or unapproved architecture into public-safe contexts.

An implementation SHOULD separate observations, inferences, confirmed facts, contradictions, and missing evidence.

An implementation MAY use AI models, rules, retrieval, graphs, deterministic workflows, or human-authored playbooks, provided the invariants are satisfied.

## 4. Ten Layer Contracts

### 4.1 Signal Layer

Purpose: capture operational signals that may indicate change, degradation, risk, or context.

Responsibilities: ingest telemetry, alerts, logs, traces, events, changes, tickets, documents, and business process signals; normalize candidate signals; preserve source metadata.

Inputs: metrics, logs, traces, alerts, events, change records, tickets, documents, synthetic checks, and business events.

Outputs: candidate signal records with source, time, scope, observed value, and collection method.

Required metadata: source identifier, timestamp, collector, environment, classification, freshness, sampling note, and retention policy.

Quality gates: source is approved; timestamp is present; classification is known; signal is attributable; collection limitations are recorded.

Failure signals: missing timestamp, unknown source, duplicate alert storm, stale data, sampling distortion, classification mismatch.

Success criteria: candidate signals can be traced to source and are usable by Transaction, Topology, and Evidence layers.

Ownership: observability, platform, SRE, or data platform owners.

Dependencies: instrumentation, logging, tracing, event collection, identity, and data classification.

Non-goals: deciding root cause, ranking hypotheses, or recommending action.

Allowed assumptions: signals may be incomplete, sampled, delayed, duplicated, or noisy.

Required evidence: source record and collection metadata.

Operator question: what changed, degraded, or emitted a relevant signal?

### 4.2 Transaction Layer

Purpose: reconstruct customer, process, or business journeys across time and system boundaries.

Responsibilities: correlate identifiers, hops, timing, state transitions, completion status, and affected journey segments.

Inputs: traces, events, workflow state, identifiers, logs, business events, queues, and topology hints.

Outputs: transaction journey records with hops, timing, state changes, missing segments, and affected outcomes.

Required metadata: correlation key, hop identifier, timestamp, state, latency, source, confidence, and missing-evidence markers.

Quality gates: journey reconstruction identifies correlation method; missing hops are explicit; asynchronous work is represented.

Failure signals: broken correlation, missing hop, ambiguous identity join, unsampled trace, queue delay not modeled, local component substituted for journey.

Success criteria: operators can see which journey is affected and where evidence is complete or incomplete.

Ownership: application, platform, SRE, business process, or telemetry owners.

Dependencies: Signal, Topology, and Evidence layers.

Non-goals: proving causality or replacing detailed domain process analysis.

Allowed assumptions: transaction evidence may be partial or delayed.

Required evidence: correlated signals and source references for each hop.

Operator question: what customer, process, or business journey is affected?

### 4.3 Topology Layer

Purpose: constrain reasoning with dependency, ownership, policy, and blast-radius context.

Responsibilities: map services, dependencies, owners, paths, policies, regions, accounts, environments, and runtime boundaries.

Inputs: service catalogs, deployment records, dependency maps, ownership records, network paths, identity boundaries, and runtime metadata.

Outputs: topology context with dependency path, ownership, blast radius, policy constraints, and freshness.

Required metadata: relationship type, source, timestamp, owner, environment, trust level, and freshness.

Quality gates: topology source is identified; freshness is recorded; ownership is explicit; stale topology is marked.

Failure signals: stale dependency map, missing owner, circular ownership, unresolved boundary, unknown environment, incorrect blast radius.

Success criteria: investigation scope is constrained without hiding uncertainty.

Ownership: platform architecture, SRE, service owners, infrastructure, or governance owners.

Dependencies: Signal and Transaction layers.

Non-goals: replacing service catalogs or configuration management systems.

Allowed assumptions: topology can be stale and must be checked against current evidence.

Required evidence: topology source and last-known validation.

Operator question: where could this symptom propagate?

### 4.4 Evidence Layer

Purpose: separate observations, inferences, confirmed facts, contradictions, and missing evidence.

Responsibilities: create evidence records, maintain provenance, link evidence relationships, classify evidence state, and expose uncertainty.

Inputs: candidate signals, transaction journeys, topology context, changes, tickets, runbooks, human notes, and prior memory.

Outputs: evidence graph with typed nodes and relationships.

Required metadata: evidence type, source, timestamp, provenance, classification, confidence basis, freshness, and access boundary.

Quality gates: every evidence node has provenance; inferred evidence is labeled; contradiction and missing evidence are not suppressed.

Failure signals: unsupported claim, missing source, untyped evidence, private data leakage, stale source, contradiction ignored.

Success criteria: operators can distinguish what was observed, inferred, contradicted, missing, and confirmed.

Ownership: investigation system, SRE, data governance, and evidence-source owners.

Dependencies: Signal, Transaction, Topology, Memory, and security controls.

Non-goals: deciding final cause without Reasoning and Operator review.

Allowed assumptions: evidence may conflict.

Required evidence: source references and classification.

Operator question: what supports or challenges the claim?

### 4.5 Reasoning Layer

Purpose: manage hypotheses and explanations without collapsing uncertainty into narrative certainty.

Responsibilities: propose hypotheses, compare evidence fit, update hypothesis state, identify falsification criteria, and expose confidence movement.

Inputs: evidence graph, transaction context, topology context, memory, constraints, and evaluation policy.

Outputs: hypothesis records with state, supporting evidence, contradictory evidence, missing evidence, confidence basis, and next checks.

Required metadata: hypothesis state, transition reason, evidence references, contradiction references, owner or reviewer, and confidence basis.

Quality gates: every hypothesis is falsifiable; transitions cite evidence; contradictions are visible; unsupported hypotheses remain unconfirmed.

Failure signals: conclusion without evidence, hidden contradiction, non-falsifiable hypothesis, unsupported causal claim, overconfident language.

Success criteria: operators can see why a hypothesis moved state and what would disprove it.

Ownership: investigation workflow, SRE, incident command, or AI-assistance owner.

Dependencies: Evidence, Transaction, Topology, Memory, and Evaluation layers.

Non-goals: autonomous final authority over consequential decisions.

Allowed assumptions: multiple hypotheses may remain plausible.

Required evidence: evidence graph references and transition records.

Operator question: what explanation best fits the evidence, and what would disprove it?

### 4.6 Memory Layer

Purpose: preserve reviewed operational context for future retrieval and comparison.

Responsibilities: store known failure modes, prior decisions, approved incident records, replay seeds, lessons, and outcomes with provenance and review state.

Inputs: learning records, decision records, post-incident reviews, replay records, patterns, and approved operator notes.

Outputs: memory records with source, review status, freshness, applicability, and expiration.

Required metadata: source, reviewer, review state, created time, last validated time, expiration, access boundary, and correction history.

Quality gates: memory is reviewed before trusted reuse; stale memory is flagged; private memory is permission-aware.

Failure signals: stale memory reused as fact, unreviewed memory retrieved as authoritative, private context exposed, outdated pattern over-applied.

Success criteria: memory improves future investigations without contaminating evidence or reasoning.

Ownership: knowledge management, SRE, governance, service owners, or platform owner.

Dependencies: Learning, Evidence, Evaluation, and security controls.

Non-goals: serving as an unrestricted data lake or private prompt memory.

Allowed assumptions: prior context can guide but not prove current explanations.

Required evidence: reviewed source and applicability statement.

Operator question: have we seen this pattern before, and is it applicable now?

### 4.7 Evaluation Layer

Purpose: verify behavior before increasing trust or automation authority.

Responsibilities: evaluate retrieval, grounding, citation, refusal, evidence attribution, hypothesis quality, contradiction handling, replay quality, latency, operator approval, and recommendation safety.

Inputs: replay seeds, fixtures, expected behavior, policy constraints, source corpus, prior regressions, and operator feedback.

Outputs: evaluation results and gate decisions.

Required metadata: fixture identifier, test version, source corpus version, expected behavior, actual behavior, pass/fail result, limitation, and reviewer.

Quality gates: evaluation scope is explicit; failures block increased authority; aggregate scores do not replace dimension-level results.

Failure signals: missing fixture coverage, opaque aggregate score, untested refusal path, stale corpus, benchmark disconnected from operational workflow.

Success criteria: release or autonomy decisions are based on reproducible evidence.

Ownership: AI platform, quality engineering, SRE, governance, or product owner.

Dependencies: Replay, Memory, Evidence, Reasoning, and Operator layers.

Non-goals: proving universal correctness.

Allowed assumptions: evaluations reduce risk but do not eliminate it.

Required evidence: fixture results, replay records, and limitation notes.

Operator question: is this behavior reliable enough for the next level of responsibility?

### 4.8 Decision Layer

Purpose: convert evidence-backed reasoning into reviewable options.

Responsibilities: create decision packets, mitigation options, escalation recommendations, refusals, and action-risk classifications.

Inputs: hypotheses, evidence, impact, risk, reversibility, policy, ownership, approval class, and evaluation status.

Outputs: decision packet with option, rationale, evidence, risk, reversibility, owner, approval requirement, and fallback.

Required metadata: decision type, evidence references, approval class, owner, risk, reversibility, time sensitivity, and audit identifier.

Quality gates: consequential decisions require approval class; evidence is linked; risk and reversibility are explicit.

Failure signals: action without approval class, recommendation without evidence, missing owner, irreversible action treated as routine.

Success criteria: operators can review, approve, reject, escalate, or request more evidence.

Ownership: incident command, service owner, operations leader, or governance owner.

Dependencies: Reasoning, Evidence, Evaluation, Operator, and security policy.

Non-goals: bypassing operator accountability.

Allowed assumptions: not every investigation ends in action.

Required evidence: evidence references and approval boundary.

Operator question: what action is justified now?

### 4.9 Learning Layer

Purpose: convert reviewed outcomes into improved patterns, memory, evaluation coverage, and documentation.

Responsibilities: capture outcome, update memory, create replay seeds, add evaluation fixtures, refine patterns, and record lessons.

Inputs: operator decisions, post-incident reviews, outcomes, evaluation results, and memory records.

Outputs: learning records, memory updates, replay seeds, evaluation fixtures, documentation updates, and correction records.

Required metadata: source outcome, reviewer, affected memory, affected fixture, change rationale, date, and rollback path.

Quality gates: learning updates are reviewed; memory changes are reversible; evaluation additions are traceable to outcomes.

Failure signals: unreviewed learning, bad RCA converted to memory, no rollback path, lesson not linked to evidence.

Success criteria: future investigations gain reviewed context or better evaluation coverage.

Ownership: SRE, post-incident review owners, knowledge management, AI platform, or governance.

Dependencies: Decision, Operator, Memory, Evaluation, and Evidence layers.

Non-goals: automatic institutional truth without review.

Allowed assumptions: learning may be partial and can be corrected.

Required evidence: reviewed outcome and supporting decision record.

Operator question: what should become easier or safer next time?

### 4.10 Operator Layer

Purpose: preserve human accountability for judgment, escalation, and consequential action.

Responsibilities: enforce approval boundaries, capture operator decisions, support human override, maintain audit trail, and govern refusal/escalation.

Inputs: decision packets, evidence, uncertainty, policy, approval class, risk, and operator identity.

Outputs: approval, rejection, escalation, override, request for more evidence, or refusal confirmation.

Required metadata: operator identity, role, approval class, decision, reason, timestamp, policy basis, and audit reference.

Quality gates: operator authority is verified; decision is auditable; override is captured; refusal is explainable.

Failure signals: unclear accountability, hidden automation, missing approver, unauthorized approval, unaudited override.

Success criteria: consequential judgment remains governed and inspectable.

Ownership: incident command, service owners, operations leaders, security, governance, or compliance.

Dependencies: Decision, Evaluation, Evidence, identity, authorization, and audit logging.

Non-goals: rubber-stamping automated action.

Allowed assumptions: operators may disagree with recommendations.

Required evidence: decision packet and approval record.

Operator question: what must a responsible human decide?

## 5. Canonical Data Model

Observation: directly observed operational data from an approved source. Required fields: identifier, source, timestamp, observed value, collection method, classification, freshness, and provenance.

Inference: an interpretation derived from observations or other evidence. Required fields: identifier, statement, source evidence, reasoning basis, uncertainty, authoring mechanism, and status.

Confirmed Fact: a statement accepted for the investigation because it is supported by sufficient evidence or responsible operator review. Required fields: identifier, statement, confirming evidence, reviewer or rule, confirmation time, and scope.

Contradiction: evidence that weakens or conflicts with a claim, inference, or hypothesis. Required fields: identifier, contradicted item, contradicting evidence, severity, and required follow-up.

Missing Evidence: evidence expected but unavailable, incomplete, stale, or inaccessible. Required fields: identifier, expected evidence, reason missing, impact on confidence, and next action.

Evidence: a general record that may be an observation, inference, confirmed fact, contradiction, or missing evidence. Required fields: identifier, type, content, source, provenance, classification, access boundary, freshness, and trust basis.

Evidence Relationship: a typed relationship between evidence records. Allowed relationship types SHOULD include supports, contradicts, derives-from, confirms, weakens, explains, requires, and supersedes.

Evidence Graph: a set of evidence nodes and evidence relationships for an investigation scope. Required fields: graph identifier, scope, corpus version, node set, relationship set, creation time, update time, and access policy.

Hypothesis: a falsifiable explanation under investigation. Required fields: identifier, statement, state, supporting evidence, contradictory evidence, missing evidence, confidence basis, owner, next test, and scope.

Hypothesis Transition: a state movement for a hypothesis. Required fields: hypothesis identifier, previous state, next state, trigger, required evidence, approver if required, timestamp, and rationale.

Replay Seed: minimum approved context needed to reproduce an investigation scenario. Required fields: seed identifier, scenario, source corpus version, evidence subset, expected behavior, policy constraints, and access classification.

Replay Record: execution record of a replay. Required fields: replay identifier, replay seed, system version, run time, outputs, deviations, evaluator, and result.

Evaluation Gate: a named release or authority boundary. Required fields: gate identifier, scope, required metrics, required fixtures, pass criteria, failure policy, reviewer, and expiration.

Evaluation Result: result of running an evaluation fixture or suite. Required fields: fixture identifier, actual behavior, expected behavior, pass/fail, evidence, limitation, system version, and corpus version.

Decision Packet: reviewable recommendation or action option. Required fields: packet identifier, decision type, rationale, evidence, risk, reversibility, approval class, owner, fallback, and expiration.

Operator Decision: recorded human decision. Required fields: decision identifier, operator identity, role, packet reference, decision, reason, timestamp, approval authority, and audit record.

Learning Record: reviewed update produced from an outcome. Required fields: identifier, source event, lesson, affected memory, affected eval, affected pattern, reviewer, rollback path, and date.

Memory Record: reusable operational context. Required fields: identifier, source, content, review status, applicability, expiration, access policy, correction history, and last validated time.

## 6. State Machines

Hypothesis Lifecycle states: proposed, supported, contradicted, rejected, confirmed.

Hypothesis transitions:

- Proposed -> Supported: requires supporting evidence and no blocking contradiction.
- Proposed -> Rejected: requires falsifying evidence, out-of-scope determination, or operator rejection.
- Supported -> Contradicted: requires contradictory evidence.
- Supported -> Confirmed: requires sufficient evidence, no unresolved material contradiction, and operator or policy-defined confirmation.
- Contradicted -> Supported: requires contradiction resolution or new evidence.
- Contradicted -> Rejected: requires unresolved material contradiction or falsifying evidence.
- Confirmed -> Contradicted: allowed when new contradictory evidence appears.
- Confirmed -> Rejected: allowed when confirmation is overturned by review.

Investigation Lifecycle states: opened, scoped, evidence-collection, hypothesis-review, decision-review, resolved, learning-review, closed.

Investigation transitions:

- Opened -> Scoped: requires initial signal and scope.
- Scoped -> Evidence-collection: requires approved sources and classification.
- Evidence-collection -> Hypothesis-review: requires evidence graph.
- Hypothesis-review -> Decision-review: requires at least one supported or confirmed hypothesis, or explicit unknown decision.
- Decision-review -> Resolved: requires operator decision, escalation, or refusal.
- Resolved -> Learning-review: requires outcome record.
- Learning-review -> Closed: requires learning disposition or explicit no-learning decision.
- Any active state -> Closed: allowed for duplicate, invalid, or out-of-scope investigation with reason.

Replay Lifecycle states: drafted, approved, runnable, executed, reviewed, archived.

Replay transitions:

- Drafted -> Approved: requires public-safe or permission-aware classification and reviewer.
- Approved -> Runnable: requires complete replay seed.
- Runnable -> Executed: requires system version and corpus version.
- Executed -> Reviewed: requires evaluation result or reviewer disposition.
- Reviewed -> Archived: requires retention policy.
- Any state -> Drafted: allowed for correction with change history.

Evaluation Lifecycle states: proposed, active, passed, failed, waived, retired.

Evaluation transitions:

- Proposed -> Active: requires fixture, expected behavior, source corpus, and owner.
- Active -> Passed: requires all mandatory checks pass.
- Active -> Failed: requires any mandatory check fail.
- Failed -> Active: requires remediation.
- Failed -> Waived: requires named approver, expiration, and risk acceptance.
- Passed -> Retired: requires replacement or obsolete scope.

Memory Lifecycle states: drafted, reviewed, approved, active, stale, corrected, retired.

Memory transitions:

- Drafted -> Reviewed: requires source and reviewer.
- Reviewed -> Approved: requires evidence and applicability statement.
- Approved -> Active: requires access policy and expiration.
- Active -> Stale: triggered by expiration, topology change, source invalidation, or contradiction.
- Active -> Corrected: requires correction record and reviewer.
- Stale -> Retired: requires disposition.
- Corrected -> Active: requires reviewer approval.

## 7. Governance Model

Approval classes:

- Read-only: retrieve, summarize, search, inspect, compare. No production effect. Approval MAY be implicit if identity and access policy permit.
- Recommendation: suggest interpretation, next check, escalation, or review packet. Requires evidence and uncertainty disclosure.
- Reversible action: action that can be rolled back with bounded blast radius. Requires operator approval, owner, risk, rollback path, and audit.
- Irreversible action: action with durable business, security, financial, data, or customer impact. Requires elevated approval, explicit risk acceptance, and audit.
- Emergency action: time-sensitive action under incident command or emergency policy. Requires explicit emergency authority, post-action review, and audit.

Escalation MUST occur when evidence is insufficient, required approval is unavailable, risk exceeds authority, policy is ambiguous, or confidential data is requested outside authorization.

Audit MUST capture decision packet, evidence references, operator identity, approval class, decision, timestamp, policy basis, and outcome.

Retention MUST follow data classification, legal, security, and operational policy. Replay seeds and memory records MUST NOT retain private data beyond policy.

Memory review MUST verify source, evidence, applicability, expiration, and access boundary.

Knowledge expiration SHOULD be explicit for memory records, topology context, eval fixtures, and replay seeds.

Policy enforcement MUST occur before retrieval, generation, recommendation, action, memory write, and replay.

Human override MUST be recorded with reason, authority, and post-action review requirement.

## 8. Evaluation Specification

No aggregate trust score is permitted as a substitute for dimension-level results.

Minimum evaluation suite:

Retrieval. Definition: ability to retrieve approved relevant sources. Measurement: expected source present, unrelated source rate, missing canonical source. Interpretation: retrieval quality supports or limits answer quality. Limitation: retrieval correctness does not guarantee reasoning correctness.

Grounding. Definition: answer claims are supported by retrieved evidence. Measurement: claim-to-source mapping and unsupported claim count. Interpretation: lower unsupported claims indicate safer answers. Limitation: source quality can still be poor.

Citation. Definition: cited sources are present, valid, relevant, and public-safe. Measurement: URL validity, source title match, evidence relevance. Interpretation: citations make review possible. Limitation: citations do not prove causal correctness.

Refusal. Definition: system refuses confidential, unsupported, or unauthorized requests. Measurement: refusal correctness, explanation quality, safe redirection. Interpretation: refusal behavior reduces governance risk. Limitation: over-refusal can reduce usefulness.

Evidence attribution. Definition: system labels observation, inference, confirmed fact, contradiction, and missing evidence. Measurement: type accuracy and source references. Interpretation: attribution improves reviewability. Limitation: labels depend on corpus quality.

Hypothesis quality. Definition: hypotheses are falsifiable, evidence-linked, and bounded. Measurement: state correctness, falsification criteria, contradiction handling. Interpretation: good hypotheses support investigation. Limitation: may not identify true cause.

Contradiction handling. Definition: contradictory evidence is surfaced and affects confidence or state. Measurement: contradiction detection, explanation, state transition. Interpretation: improves uncertainty handling. Limitation: subtle contradictions may require domain expertise.

Replay quality. Definition: replay reproduces expected scenario behavior from approved seed. Measurement: deterministic output checks, source corpus version, deviation count. Interpretation: replay supports regression testing. Limitation: replay cannot represent all production conditions.

Latency. Definition: response time for retrieval, reasoning, evaluation, and operator review support. Measurement: p50, p95, timeout rate by workflow. Interpretation: operational usefulness depends on time. Limitation: faster output may be less complete.

Operator approval. Definition: consequential recommendations enforce approval class and audit. Measurement: approval boundary correctness, unauthorized-action block rate. Interpretation: supports accountability. Limitation: approval policy may be organizationally specific.

Recommendation safety. Definition: recommended actions are evidence-backed, risk-labeled, reversible where applicable, and bounded. Measurement: missing evidence, missing risk, missing owner, missing rollback, overreach count. Interpretation: lower overreach improves safety. Limitation: safety cannot be fully automated.

## 9. OI-ROOM-001 Reference Walkthrough

Scenario scope: synthetic checkout journey with elevated latency and partial failures during a narrow time window. No proprietary systems, private logs, internal dashboards, or employer-specific details are used.

Timeline:

- T0: normal checkout journey baseline recorded.
- T1: latency signal increases for checkout completion.
- T2: partial failure signal appears in payment authorization segment.
- T3: deployment event is detected near the affected window.
- T4: contradictory metric shows one downstream health check remains normal.
- T5: trace segment is missing for one asynchronous hop.
- T6: hypotheses are proposed and evaluated.
- T7: decision packet is drafted for rollback review and dependency escalation.
- T8: operator approval is required before consequential action.
- T9: reviewed outcome produces replay seed, evaluation fixture, and learning record.

Transaction hops:

- Hop 1: user initiates checkout. Layer references: Signal, Transaction.
- Hop 2: cart validation completes within baseline. Layer references: Transaction, Evidence.
- Hop 3: payment authorization shows elevated latency. Layer references: Transaction, Evidence, Reasoning.
- Hop 4: downstream dependency path is checked. Layer references: Topology, Evidence.
- Hop 5: asynchronous confirmation segment has missing trace. Layer references: Transaction, Evidence.
- Hop 6: customer-visible completion is delayed or partially failed. Layer references: Transaction, Decision, Operator.

Evidence table:

- E1: checkout latency increase. Type: Observation. Layer: Signal. Source: synthetic metric. State: observed.
- E2: payment authorization hop timing. Type: Observation. Layer: Transaction. Source: synthetic trace. State: observed.
- E3: related deployment event. Type: Observation. Layer: Signal. Source: synthetic change record. State: observed.
- E4: downstream health check normal. Type: Contradiction. Layer: Evidence. Source: synthetic metric. State: contradicts dependency-degradation hypothesis.
- E5: missing asynchronous trace segment. Type: Missing Evidence. Layer: Evidence. Source: synthetic tracing gap. State: missing.
- E6: prior similar latency pattern. Type: Inference support. Layer: Memory. Source: reviewed synthetic memory. State: applicable but not proof.

Hypothesis table:

- H1: recent configuration or deployment change contributed to latency. Initial state: proposed. Supporting evidence: E1, E2, E3. Contradiction: none material. Required next check: compare rollback-safe configuration delta.
- H2: downstream dependency degradation caused checkout delay. Initial state: proposed. Supporting evidence: E2. Contradiction: E4. Required next check: inspect dependency-specific evidence.
- H3: instrumentation artifact explains observed latency. Initial state: proposed. Supporting evidence: E5. Contradiction: E1 and customer-visible delay. Required next check: validate independent customer-impact signal.

State transitions:

- H1 proposed -> supported when E1, E2, and E3 are linked.
- H2 proposed -> contradicted when E4 is added.
- H3 proposed -> supported only if independent telemetry cannot confirm customer impact; otherwise remains proposed or rejected.

Evaluation gates:

- Retrieval gate: canonical doctrine and relevant synthetic case records retrieved.
- Grounding gate: every claim maps to E1 through E6.
- Contradiction gate: E4 is surfaced and affects H2 state.
- Missing-evidence gate: E5 is visible and limits confidence.
- Approval gate: rollback review packet is not treated as executed action.

Decision packet:

- Option: prepare rollback review packet for operator approval.
- Evidence: E1, E2, E3, E4, E5.
- Risk: rollback may affect recent dependent behavior.
- Reversibility: reversible only if rollback path is verified.
- Approval class: reversible action.
- Required operator: authorized service owner or incident commander.
- Fallback: collect more evidence or escalate dependency review.

Learning record:

- Source: reviewed outcome of OI-ROOM-001.
- Update: replay seed for checkout latency investigation.
- Evaluation addition: contradiction handling and missing-evidence fixture.
- Memory update: reviewed pattern only, not confirmed universal cause.
- Rollback path: retire or correct memory if later evidence invalidates it.

Operator approvals:

- Read-only inspection: allowed for authorized viewer.
- Recommendation: allowed with evidence and uncertainty.
- Reversible action: explicit approval required.
- Irreversible action: not authorized by this scenario.
- Emergency action: not invoked by this scenario.

## 10. Conformance Specification

Level 1: Foundational.

Mandatory capabilities:

- Separate observations, inferences, confirmed facts, contradictions, and missing evidence.
- Preserve provenance for claims and recommendations.
- Provide hypothesis records with falsification criteria.
- Enforce public-safe or permission-aware retrieval.
- Provide refusal behavior for confidential or unsupported requests.
- Provide basic replay seed and evaluation fixture support.
- Require approval class for consequential recommendations.

Level 2: Operational.

Mandatory capabilities:

- All Level 1 capabilities.
- Maintain evidence graph with typed relationships.
- Reconstruct transaction journeys with missing-hop markers.
- Maintain topology freshness and ownership metadata.
- Run dimension-level evaluation gates.
- Capture operator decisions and audit records.
- Maintain reviewed memory records with expiration and correction history.
- Support replay records tied to system and corpus versions.

Level 3: Advanced.

Mandatory capabilities:

- All Level 2 capabilities.
- Support policy-aware memory retrieval across access boundaries.
- Maintain hypothesis state transitions with reviewer and evidence requirements.
- Support governance workflow for reversible, irreversible, emergency, and escalation paths.
- Maintain measurable regression history for evaluation dimensions.
- Support learning records that update memory, replay seeds, and evaluation fixtures through review.
- Provide traceability from decision packet to evidence, hypothesis, evaluation, operator decision, and learning record.

Conformance checklist:

- Are all claims source-attributed?
- Are evidence states typed?
- Are hypotheses falsifiable?
- Are contradictions surfaced?
- Is missing evidence explicit?
- Are transaction hops represented?
- Is topology freshness visible?
- Are evaluation results dimension-level?
- Are replay seeds reproducible?
- Are memory records reviewed and expirable?
- Are approval classes enforced?
- Are refusals explainable?
- Are audit records complete?
- Are confidential data boundaries enforced?

## 11. Security and Governance

Identity boundaries MUST determine who can retrieve, view, recommend, approve, override, write memory, or run replay.

Authorization MUST be checked before accessing private evidence, memory, replay seeds, decision packets, or operator records.

Least privilege MUST apply to all tools, sources, retrieval contexts, memory writes, and actions.

Data classification MUST be attached to evidence, memory, replay seeds, decision packets, and outputs.

Confidential data handling MUST prevent unapproved private logs, dashboards, internal architecture, proprietary project names, or sensitive records from entering public-safe contexts.

Prompt injection handling MUST treat user-provided instructions, retrieved documents, and external content as untrusted unless policy permits them. The system MUST NOT allow retrieved content to override governance policy.

Private knowledge MUST remain permission-aware and MUST NOT be summarized into public-safe answers unless approved and declassified.

Evidence provenance MUST identify source, collection method, timestamp, and access boundary.

Audit logging MUST cover retrieval, generation, recommendation, approval, override, refusal, memory write, replay, and evaluation gate decisions.

Explainable refusal MUST state the policy boundary without exposing sensitive details.

## 12. Implementation Guidance

Implementations may use event-driven, batch, streaming, graph, retrieval, workflow, or hybrid architectures. Technology choices are non-normative.

Event-driven designs are appropriate when signals, changes, tickets, and state transitions arrive continuously. Tradeoff: ordering, deduplication, idempotency, and replay must be handled explicitly.

Batch designs are appropriate for offline evaluation, memory review, report generation, and periodic topology validation. Tradeoff: stale context may reduce incident usefulness.

Streaming designs are appropriate for near-real-time signal and transaction processing. Tradeoff: partial evidence and late-arriving data must be represented.

Distributed tracing is useful for transaction reconstruction but MUST NOT be treated as complete truth. Sampling, asynchronous boundaries, missing spans, and identity changes must be represented.

Knowledge graphs are useful for evidence relationships, topology, ownership, memory, and dependency reasoning. Tradeoff: graph freshness, source trust, and relationship semantics must be governed.

Retrieval is useful for approved documents, prior decisions, memory records, patterns, and doctrine. Tradeoff: retrieval quality depends on source curation, metadata, access policy, and ranking.

Agent orchestration MAY be used for decomposition, tool use, summarization, or recommendation drafting. It MUST remain bounded by evidence, evaluation, approval classes, and audit.

Evaluation SHOULD be part of release and authority expansion. Systems SHOULD NOT gain new action authority because they sound fluent.

Human review SHOULD be designed as a first-class workflow, not an afterthought. Operator decisions must be captured, auditable, and tied to evidence.

## 13. Limitations

Operational Intelligence does not prove causality from sequence alone.

Operational Intelligence does not replace observability, SRE, incident management, ITSM, security incident response, or enterprise governance.

Operational Intelligence does not guarantee correct root cause.

Operational Intelligence does not eliminate the need for domain experts.

Operational Intelligence does not authorize autonomous production changes without approval.

Operational Intelligence does not solve poor instrumentation, missing ownership, stale topology, weak data classification, or inadequate incident process by itself.

Operational Intelligence does not make confidential information public-safe.

Operational Intelligence does not guarantee that AI-generated summaries are correct.

Operational Intelligence reduces review ambiguity only when evidence, provenance, policy, evaluation, and operator accountability are implemented.

## 14. Future Evolution

Future work may define more formal schema profiles, interoperability test suites, reference diagrams, implementation examples, benchmark datasets, maturity assessment models, and governance mappings.

Future work should not add framework layers unless the doctrine is formally revised.

Future work should prioritize conformance tests, evidence schemas, replay fixture format, and evaluation rubrics before adding new product concepts.
