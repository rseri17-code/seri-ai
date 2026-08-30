# Operational Intelligence Diagram Pack

Version: 1.0
Status: Publication-ready reference artifact
Updated: 2026-07-26

These diagrams make the Canonical Doctrine and Reference Architecture easier to inspect. They do not introduce new framework layers or terminology. Each diagram is a review aid, not an implementation mandate.

## Related References

- Canonical Doctrine: [/wiki/operational-intelligence-canonical-doctrine](/wiki/operational-intelligence-canonical-doctrine)
- Reference Architecture: [/wiki/operational-intelligence-reference-architecture](/wiki/operational-intelligence-reference-architecture)
- Operations Room: [/investigation-room](/investigation-room)
- Decision Packet Example: [/publication-pack/decision-packet-example.md](/publication-pack/decision-packet-example.md)
- OI-ROOM-001 Printable Walkthrough: [/publication-pack/oi-room-001-printable-walkthrough.md](/publication-pack/oi-room-001-printable-walkthrough.md)

## Diagram Index

| ID | Diagram | Reviewer question |
|---|---|---|
| OI-DIA-001 | Architecture flow | Can a reviewer trace a signal into a human decision without hidden leaps? |
| OI-DIA-002 | Hypothesis lifecycle | Are hypotheses allowed to be contradicted, rejected, and reopened? |
| OI-DIA-003 | Investigation lifecycle | Does an investigation move from scope to learning through reviewable states? |
| OI-DIA-004 | Evaluation lifecycle | Are gates versioned and allowed to fail, waive, retire, or reactivate? |
| OI-DIA-005 | OI-ROOM-001 sequence | Does the synthetic case preserve operator approval boundaries? |
| OI-DIA-006 | Evidence graph | Are observation, inference, contradiction, missing evidence, and decision separated? |
| OI-DIA-007 | Replay and learning loop | Does reviewed learning feed memory and future fixtures? |
| OI-DIA-008 | Decision packet handoff | Does the assistant hand a bounded packet to an accountable human? |

## OI-DIA-001 Architecture Diagram

```mermaid
flowchart TB
  S["Signal Layer<br/>Telemetry, alerts, events, changes"] --> T["Transaction Layer<br/>Journey, hops, timing, state"]
  T --> Top["Topology Layer<br/>Dependencies, ownership, blast radius"]
  Top --> E["Evidence Layer<br/>Observation, inference, fact, contradiction, missing evidence"]
  E --> R["Reasoning Layer<br/>Hypotheses, falsification, confidence movement"]
  R --> M["Memory Layer<br/>Reviewed patterns, outcomes, replay seeds"]
  M --> Ev["Evaluation Layer<br/>Retrieval, grounding, refusal, safety gates"]
  Ev --> D["Decision Layer<br/>Risk, reversibility, approval packet"]
  D --> O["Operator Layer<br/>Approve, reject, escalate, override"]
  O --> L["Learning Layer<br/>Memory, eval, pattern, documentation updates"]
  L -. "reviewed learning" .-> M
  L -. "new fixtures" .-> Ev
```

Review note: the arrows are conceptual handoffs. A real implementation may parallelize layers, but it must preserve provenance, evidence state, evaluation, and operator approval before consequential action.

## OI-DIA-002 Hypothesis Lifecycle

```mermaid
stateDiagram-v2
  [*] --> Proposed
  Proposed --> Supported: supporting evidence
  Proposed --> Rejected: falsifying evidence or out of scope
  Supported --> Contradicted: material contradiction
  Supported --> Confirmed: sufficient evidence and review
  Contradicted --> Supported: contradiction resolved
  Contradicted --> Rejected: contradiction remains material
  Confirmed --> Contradicted: new conflicting evidence
  Confirmed --> Rejected: review overturns finding
```

Measurable output: each transition must record hypothesis ID, triggering evidence ID, state before, state after, reviewer or system actor, timestamp, and reason.

## OI-DIA-003 Investigation Lifecycle

```mermaid
stateDiagram-v2
  [*] --> Opened
  Opened --> Scoped: initial signal and scope
  Scoped --> EvidenceCollection: approved sources and classification
  EvidenceCollection --> HypothesisReview: evidence graph created
  HypothesisReview --> DecisionReview: supported hypothesis or explicit unknown
  DecisionReview --> Resolved: operator decision or escalation
  Resolved --> LearningReview: outcome recorded
  LearningReview --> Closed: learning disposition complete
```

Measurable output: each investigation must produce a decision packet, an explicit unknown, or a documented escalation. Silent closure is non-conformant.

## OI-DIA-004 Evaluation Lifecycle

```mermaid
stateDiagram-v2
  [*] --> Proposed
  Proposed --> Active: fixture and expected behavior approved
  Active --> Passed: mandatory checks pass
  Active --> Failed: mandatory check fails
  Failed --> Active: remediation complete
  Failed --> Waived: risk accepted with expiration
  Passed --> Retired: obsolete or replaced
```

Measurable output: gates report dimension-level results. A single aggregate trust score is insufficient.

## OI-DIA-005 OI-ROOM-001 Sequence Diagram

```mermaid
sequenceDiagram
  participant Operator
  participant Ask as Ask Ravikanth
  participant Evidence as Evidence Graph
  participant Eval as Evaluation Gate
  participant Decision as Decision Packet
  participant Memory as Operational Memory

  Operator->>Ask: Investigate checkout latency
  Ask->>Evidence: Retrieve signals, transaction hops, topology, changes
  Evidence-->>Ask: Observations, contradiction, missing trace segment
  Ask->>Ask: Propose and update hypotheses
  Ask->>Eval: Check grounding, citations, contradiction, refusal boundary
  Eval-->>Ask: Gate result and limitations
  Ask->>Decision: Draft rollback review packet
  Decision-->>Operator: Recommendation with risk and approval class
  Operator->>Decision: Approve, reject, escalate, or request more evidence
  Decision->>Memory: Store reviewed outcome and replay seed
```

Review note: this sequence is intentionally synthetic and public-safe. It describes expected behavior, not a private production incident.

## OI-DIA-006 Evidence Graph Diagram

```mermaid
flowchart LR
  E1["E1 Observation<br/>Checkout latency increased"] --> H1["H1 Hypothesis<br/>Recent deployment contributed"]
  E2["E2 Observation<br/>Payment hop latency"] --> H1
  E3["E3 Observation<br/>Related deployment event"] --> H1
  E4["E4 Contradiction<br/>Downstream health normal"] -. contradicts .-> H2["H2 Hypothesis<br/>Downstream dependency degraded"]
  E5["E5 Missing Evidence<br/>Async trace segment absent"] -. limits .-> H3["H3 Hypothesis<br/>Instrumentation artifact"]
  E6["E6 Memory<br/>Prior similar pattern"] -. informs, does not prove .-> H1
  H1 --> DP["Decision Packet<br/>Rollback review packet"]
  H2 --> DP
  H3 --> DP
  DP --> OP["Operator Decision<br/>approve, reject, escalate, request evidence"]
```

Edge semantics:

| Edge | Meaning | Required review behavior |
|---|---|---|
| supports | Evidence increases plausibility but does not prove causality alone | Keep hypothesis falsifiable |
| contradicts | Evidence conflicts with or weakens a hypothesis | Surface visibly and adjust state |
| limits | Missing or stale evidence reduces confidence | Do not hide uncertainty |
| informs | Prior memory provides context but not proof | Require current evidence |
| recommends | A hypothesis informs a decision packet | Preserve human approval boundary |

## OI-DIA-007 Replay and Learning Loop

```mermaid
flowchart LR
  Outcome["Reviewed outcome"] --> Seed["Replay Seed"]
  Seed --> Replay["Replay Record"]
  Replay --> Gate["Evaluation Gate"]
  Gate --> Result["Evaluation Result"]
  Result --> Memory["Memory Record"]
  Result --> Fixture["Future Fixture"]
  Memory --> Retrieval["Future retrieval"]
```

## OI-DIA-008 Decision Packet Handoff

```mermaid
flowchart TB
  H["Supported hypothesis"] --> P["Decision packet draft"]
  C["Contradictory evidence"] --> P
  M["Missing evidence"] --> P
  P --> G["Evaluation gate<br/>grounding, citation, contradiction, safety"]
  G --> A{"Approval class"}
  A -->|informational| I["Operator notified"]
  A -->|reversible| R["Authorized owner review"]
  A -->|irreversible or high blast radius| E["Escalation required"]
  R --> O["Approve, reject, escalate, or request evidence"]
  E --> O
  O --> L["Reviewed outcome becomes replay seed, fixture, or memory"]
```

Non-conformance signal: an assistant directly executes a consequential action, suppresses contradiction, omits missing evidence, or presents a recommendation without owner, risk, reversibility, and fallback.
