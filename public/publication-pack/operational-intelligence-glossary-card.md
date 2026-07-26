# Operational Intelligence Glossary Reference Card

Version: 1.0
Status: Publication-ready shareable reference
Updated: 2026-07-26

## Related References

- Canonical Doctrine: [/wiki/operational-intelligence-canonical-doctrine](/wiki/operational-intelligence-canonical-doctrine)
- Reference Architecture: [/wiki/operational-intelligence-reference-architecture](/wiki/operational-intelligence-reference-architecture)
- Operations Room: [/investigation-room](/investigation-room)

Operational Intelligence: the reasoning layer between enterprise telemetry and human decision.

Transaction Intelligence: reasoning over customer, process, or business journeys rather than isolated components.

Evidence Graph: a typed graph of observations, sources, relationships, contradictions, missing evidence, inferences, and confirmed facts.

Observation: operational data directly present in an approved source.

Inference: an interpretation derived from observations or other evidence.

Confirmed Fact: a statement accepted for the investigation because it is sufficiently supported by evidence or operator review.

Contradiction: evidence that weakens or conflicts with a claim, inference, or hypothesis.

Missing Evidence: evidence expected by the investigation but unavailable, incomplete, stale, or inaccessible.

Hypothesis Lifecycle: movement of a possible explanation through proposed, supported, contradicted, rejected, or confirmed states.

Replay Seed: the minimum approved context needed to reproduce an investigation scenario without requiring access to live production systems.

Replay Record: the execution record produced when a replay seed is run against a specific system and corpus version.

Evaluation Gate: a release or responsibility boundary based on tested behavior, not confidence prose.

Decision Packet: a reviewable recommendation or action option with evidence, risk, reversibility, owner, fallback, and approval class.

Operator Control Plane: the human governance layer that controls approval, escalation, override, refusal, and accountability.

Operational Memory: reviewed reusable context accumulated from incidents, decisions, patterns, outcomes, replay seeds, and lessons.

## Boundary Rules

Operational Intelligence starts when telemetry, topology, changes, tickets, or operational memory are converted into typed evidence for a decision path.

Operational Intelligence ends before human accountability is bypassed. Consequential action remains controlled by service owners, incident command, change management, or governance policy.

Observability remains the source of operational signals. Incident management remains the command and coordination process. ITSM remains the service-management process. Operational Intelligence makes the reasoning between those systems inspectable.
