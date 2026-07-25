# Operational Intelligence Comparison Tables

Version: 1.0  
Status: Draft for Technical Review  
Updated: 2026-07-25

## Adjacent Discipline Comparison

| Discipline | Primary Unit | Established Strength | Operational Intelligence Overlap | Operational Intelligence Distinction |
|---|---|---|---|---|
| Observability | Telemetry signal | Metrics, logs, traces, events, instrumentation | Uses telemetry as evidence input | Focuses on decision path, evidence state, hypotheses, and operator review |
| SRE | Reliability objective and service behavior | SLOs, incidents, postmortems, automation discipline | Supports incident investigation and learning | Specifies evidence, replay, evaluation, and operator-control contracts for AI-assisted reasoning |
| Incident Management | Incident lifecycle | Coordination, escalation, restoration | Produces reviewable evidence and decision packets | Does not replace incident command or service management authority |
| AIOps | IT operations analytics and automation | Correlation, detection, prediction, remediation | May use analytics and automation | Requires provenance, falsifiable hypotheses, explicit uncertainty, and evaluation gates |
| AgentOps | AI agent behavior and governance | Agent monitoring, tool boundaries, runtime behavior | Governs AI-assisted operational workflows | Applies agent governance to enterprise operational evidence and incident decisions |
| Knowledge Graphs | Entities and relationships | Relationship modeling and graph reasoning | Uses evidence, topology, ownership, memory, and dependency relationships | Requires operational provenance, contradiction, missing evidence, and decision traceability |
| AI Evaluation | System behavior under test | Fixtures, benchmarks, rubrics, regression tracking | Defines release and authority gates | Focuses evaluation on operational usefulness, refusal, evidence attribution, and action safety |
| ITSM | Service process | Change, incident, problem, service request management | Uses tickets, changes, and process records as evidence | Does not replace ITSM; adds reasoning contracts over service-management context |

## Claim Classification

| Claim Type | Meaning | Example | Publication Requirement |
|---|---|---|---|
| Established | Supported by mature public discipline | Observability provides telemetry | Cite relevant public source |
| Derived | Reasonable synthesis from established practices | Evaluation gates reduce release risk | Explain derivation and limitation |
| Original | Ravikanth's synthesis or terminology | Ten-layer Operational Intelligence model | Mark as original and make testable |
| Speculative | Plausible but not yet validated | OI may reduce repeated investigations | State as hypothesis and define evidence needed |
| Unsupported | Asserted without evidence or test path | OI always improves decisions | Remove or convert to testable claim |

## Conformance Levels

| Capability | Level 1 Foundational | Level 2 Operational | Level 3 Advanced |
|---|---|---|---|
| Evidence state separation | Required | Required | Required |
| Provenance for claims | Required | Required | Required |
| Hypothesis lifecycle | Basic | State transitions recorded | Reviewable transition history |
| Transaction journeys | Partial | Missing-hop aware | Cross-boundary and async-aware |
| Topology | Source referenced | Freshness tracked | Policy and ownership aware |
| Evaluation | Deterministic fixtures | Dimension-level gates | Regression history and authority gating |
| Replay | Replay seed | Replay record | Versioned replay corpus |
| Memory | Reviewed records | Expiration and correction | Policy-aware retrieval |
| Operator approval | Approval class | Audited decision | Governed escalation and override |

