# Operational Intelligence Executive Summary

Version: 1.0
Status: Publication-ready shareable summary
Updated: 2026-07-26

## Related References

- Canonical Doctrine: [/wiki/operational-intelligence-canonical-doctrine](/wiki/operational-intelligence-canonical-doctrine)
- Reference Architecture: [/wiki/operational-intelligence-reference-architecture](/wiki/operational-intelligence-reference-architecture)
- Operations Room: [/investigation-room](/investigation-room)

Operational Intelligence is the reasoning layer between enterprise telemetry and human decision.

Enterprises already have dashboards, logs, traces, tickets, alerts, runbooks, postmortems, changes, and operational chats. The gap is not visibility alone. The gap is turning operational fragments into accountable judgment under uncertainty.

Operational Intelligence connects ten layers:

Signal, Transaction, Topology, Evidence, Reasoning, Memory, Evaluation, Decision, Learning, and Operator.

The model does not replace observability, SRE, incident management, ITSM, or human command. It uses those foundations and adds explicit contracts for evidence, hypotheses, replay, evaluation, decision packets, and operator approval.

The most important rule is evidence before conclusions. Every recommendation should identify supporting evidence or explicitly state that evidence is unavailable. Every claim needs provenance. Every hypothesis must be falsifiable. Every consequential action needs approval boundaries.

OI-ROOM-001 demonstrates the model through a synthetic checkout latency investigation. The system reconstructs transaction hops, builds an evidence graph, tracks contradictory and missing evidence, updates hypotheses, checks evaluation gates, drafts a decision packet, requires operator approval, and turns the reviewed outcome into replayable learning.

The doctrine explains why Operational Intelligence exists. The reference architecture specifies how an implementation should behave. Deployments bind the implementation to organizational policy, identity, authorization, data classification, audit, and operational risk.

The purpose is not autonomous heroics. The purpose is better operational judgment: faster alignment, clearer evidence, safer recommendations, reusable memory, and decisions humans can inspect.

## What Evidence Should Convince a Reviewer?

The model should be judged by observable behavior, not by branding:

- Can an SRE distinguish it from observability, AIOps, and incident management?
- Can two teams implement the layer contracts similarly?
- Does it expose contradictions and missing evidence before recommendation?
- Does it improve investigation quality compared with dashboard-only or chatbot-only baselines?
- Does it refuse confidential or unsupported questions?
- Does it preserve human approval for consequential action?
- Does reviewed learning become replayable fixtures, memory, and future retrieval?
