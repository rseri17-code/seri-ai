# Operational Intelligence Diagram Pack

Version: 1.0  
Status: Draft for Technical Review  
Updated: 2026-07-25

These diagrams make the Canonical Doctrine and Reference Architecture easier to inspect. They do not introduce new framework layers or terminology.

## Architecture Diagram

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

## Hypothesis Lifecycle

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

## Investigation Lifecycle

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

## Evaluation Lifecycle

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

## OI-ROOM-001 Sequence Diagram

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

## Evidence Graph Diagram

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

## Replay and Learning Loop

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

