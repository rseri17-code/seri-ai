# OI-ROOM-001 Printable Walkthrough

Version: 1.0
Status: Publication-ready public-safe synthetic walkthrough
Updated: 2026-07-26

## Related References

- Canonical Doctrine: [/wiki/operational-intelligence-canonical-doctrine](/wiki/operational-intelligence-canonical-doctrine)
- Reference Architecture: [/wiki/operational-intelligence-reference-architecture](/wiki/operational-intelligence-reference-architecture)
- Operations Room: [/investigation-room](/investigation-room)

## Purpose

OI-ROOM-001 is a synthetic case used to demonstrate how Operational Intelligence converts telemetry and context into evidence, hypotheses, evaluation, decision review, and learning.

## Timeline

| Time | Event | Primary Layers | Review output |
|---|---|---|---|
| T0 | Normal checkout baseline exists | Signal, Transaction | Baseline window recorded |
| T1 | Checkout latency increases | Signal | Observation E1 opened |
| T2 | Payment authorization hop slows | Transaction, Evidence | Observation E2 attached to hop 3 |
| T3 | Related deployment event appears | Signal, Topology | Observation E3 linked to owner and change window |
| T4 | Downstream health check remains normal | Evidence | Contradiction E4 attached to H2 |
| T5 | Async trace segment is missing | Evidence, Transaction | Missing evidence E5 attached to journey boundary |
| T6 | Hypotheses are proposed and updated | Reasoning | H1 supported, H2 contradicted, H3 remains proposed |
| T7 | Rollback review packet is drafted | Decision | Decision packet OI-DP-001 prepared |
| T8 | Operator approval is required | Operator | Authorized owner must approve, reject, escalate, or request evidence |
| T9 | Outcome becomes replay seed and eval fixture | Learning, Memory, Evaluation | Reviewed result can update memory and future fixtures |

## Transaction Hops

| Hop | Description | Synthetic timing | Evidence State |
|---|---|---|---|
| 1 | User initiates checkout | near baseline | Observation |
| 2 | Cart validation completes near baseline | near baseline | Observation |
| 3 | Payment authorization shows elevated latency | elevated relative to baseline | Observation |
| 4 | Dependency boundary is checked | downstream health normal | Observation plus contradiction |
| 5 | Async confirmation trace is missing | unavailable | Missing evidence |
| 6 | Checkout completion is delayed or partially failed | delayed relative to baseline | Confirmed fact after review |

## Evidence Table

| ID | Type | Statement | Impact |
|---|---|---|---|
| E1 | Observation | Checkout latency increased | Opens investigation |
| E2 | Observation | Payment authorization hop is slow | Supports H1 |
| E3 | Observation | Related deployment event exists | Supports H1 but does not prove it |
| E4 | Contradiction | Downstream health check is normal | Weakens H2 |
| E5 | Missing Evidence | Async trace segment unavailable | Limits confidence |
| E6 | Memory | Similar prior reviewed pattern exists | Informs but does not confirm |

## Hypothesis Table

| ID | Hypothesis | State | Evidence |
|---|---|---|---|
| H1 | Recent change contributed to latency | Supported | E1, E2, E3, E6 |
| H2 | Downstream dependency degraded | Contradicted | E2 supports; E4 contradicts |
| H3 | Instrumentation artifact explains the symptom | Proposed | E5 supports uncertainty; E1 challenges |

## State Transitions

| Transition | Trigger | Required behavior |
|---|---|---|
| H1 Proposed -> Supported | E1, E2, E3, and E6 align | Explain that support is not proof |
| H2 Proposed -> Contradicted | E4 conflicts with the dependency-degradation explanation | Surface contradiction before recommendation |
| H3 Proposed -> Proposed | E5 leaves instrumentation uncertainty unresolved | Preserve unknown instead of forcing RCA |

## Evaluation Gates

| Gate | Pass Condition |
|---|---|
| Retrieval | Canonical doctrine, reference architecture, and case evidence are available |
| Grounding | Every claim maps to evidence |
| Citation | Source links are valid and relevant |
| Contradiction | E4 is surfaced and affects H2 |
| Missing evidence | E5 is visible and limits confidence |
| Approval | No consequential action is executed without operator approval |

## Operator Decision

The correct system behavior is not autonomous rollback. The correct behavior is a reviewable decision packet that allows the operator to approve, reject, escalate, or request more evidence.

## Printable Review Checklist

| Question | Pass condition |
|---|---|
| Can the reviewer identify the affected journey? | Checkout journey and payment authorization hop are visible |
| Can the reviewer separate observation from inference? | E1-E3 are observations; H1-H3 are hypotheses |
| Is contradictory evidence visible? | E4 is preserved and weakens H2 |
| Is missing evidence visible? | E5 is preserved and limits confidence |
| Is consequential action gated? | Rollback remains a packet requiring human approval |
| Can the case be replayed? | Reviewed outcome can produce a replay seed and future fixture |
