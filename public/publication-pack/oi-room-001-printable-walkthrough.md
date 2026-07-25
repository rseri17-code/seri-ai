# OI-ROOM-001 Printable Walkthrough

Version: 1.0  
Status: Public-safe synthetic walkthrough  
Updated: 2026-07-25

## Related References

- Canonical Doctrine: [/wiki/operational-intelligence-canonical-doctrine](/wiki/operational-intelligence-canonical-doctrine)
- Reference Architecture: [/wiki/operational-intelligence-reference-architecture](/wiki/operational-intelligence-reference-architecture)
- Operations Room: [/investigation-room](/investigation-room)

## Purpose

OI-ROOM-001 is a synthetic case used to demonstrate how Operational Intelligence converts telemetry and context into evidence, hypotheses, evaluation, decision review, and learning.

## Timeline

| Time | Event | Primary Layers |
|---|---|---|
| T0 | Normal checkout baseline exists | Signal, Transaction |
| T1 | Checkout latency increases | Signal |
| T2 | Payment authorization hop slows | Transaction, Evidence |
| T3 | Related deployment event appears | Signal, Topology |
| T4 | Downstream health check remains normal | Evidence |
| T5 | Async trace segment is missing | Evidence, Transaction |
| T6 | Hypotheses are proposed and updated | Reasoning |
| T7 | Rollback review packet is drafted | Decision |
| T8 | Operator approval is required | Operator |
| T9 | Outcome becomes replay seed and eval fixture | Learning, Memory, Evaluation |

## Transaction Hops

| Hop | Description | Evidence State |
|---|---|---|
| 1 | User initiates checkout | Observation |
| 2 | Cart validation completes near baseline | Observation |
| 3 | Payment authorization shows elevated latency | Observation |
| 4 | Dependency boundary is checked | Observation plus contradiction |
| 5 | Async confirmation trace is missing | Missing evidence |
| 6 | Checkout completion is delayed or partially failed | Confirmed fact after review |

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
