# Decision Packet Example

Version: 1.0
Status: Publication-ready reference artifact
Updated: 2026-07-26

## Related References

- Canonical Doctrine: [/wiki/operational-intelligence-canonical-doctrine](/wiki/operational-intelligence-canonical-doctrine)
- Reference Architecture: [/wiki/operational-intelligence-reference-architecture](/wiki/operational-intelligence-reference-architecture)
- Operations Room: [/investigation-room](/investigation-room)

## Scenario

Synthetic case OI-ROOM-001: checkout latency and partial failure during a narrow window.

## Decision Packet

Packet ID: OI-DP-001.

Decision type: Reversible action recommendation.

Recommended action: Prepare a rollback review packet for the recent configuration or deployment change associated with the affected checkout path.

Approval class: Reversible action.

Required operator: Authorized service owner or incident commander.

Rationale: The strongest supported hypothesis is that a recent change contributed to latency in the payment authorization segment of the checkout journey.

Confidence statement: supported, not confirmed. The packet is suitable for human review because the evidence indicates a plausible recent-change contribution, but the missing asynchronous trace segment and downstream-health contradiction prevent autonomous action.

Supporting evidence:

- E1 Observation: checkout latency increased during the incident window.
- E2 Observation: payment authorization hop shows elevated timing.
- E3 Observation: related deployment event occurred near the affected window.
- E6 Memory: reviewed prior pattern is similar but not proof.

Contradictory evidence:

- E4 Contradiction: downstream health check remained normal, weakening the downstream-degradation hypothesis.

Missing evidence:

- E5 Missing Evidence: asynchronous trace segment is unavailable, limiting confidence.

State transition trail:

| Hypothesis | Transition | Trigger |
|---|---|---|
| H1 recent change contributed | Proposed -> Supported | E1, E2, E3, and E6 align with the timing and journey impact |
| H2 downstream dependency degraded | Proposed -> Contradicted | E4 weakens the dependency-degradation explanation |
| H3 instrumentation artifact | Proposed -> Still proposed | E5 creates uncertainty, but E1 and E2 indicate user-visible impact |

Risk:

- Rollback may affect recent dependent behavior.
- The missing trace segment prevents full confidence.
- Sequence alone does not prove causality.

Reversibility:

- Reversible only if rollback path, owner, and blast radius are verified before execution.

Required approval boundary:

- The assistant may draft the packet.
- The assistant MUST NOT execute the rollback.
- The operator must approve, reject, escalate, or request more evidence.

Decision options:

| Option | When appropriate | Consequence |
|---|---|---|
| Approve rollback preparation | Owner verifies reversibility and blast radius | Draft rollback plan enters normal change or incident process |
| Request more evidence | Missing trace segment is recoverable within useful time | Investigation remains open |
| Escalate | Ownership, blast radius, or customer impact is unclear | Incident command or service owner coordinates next step |
| Reject | Contradictory evidence becomes dominant or change correlation is disproven | H1 moves toward rejected and another hypothesis is prioritized |

Fallback:

- Collect missing asynchronous trace context if available.
- Escalate dependency review if contradictory evidence changes.
- Keep incident open if evidence remains insufficient.

Learning record after review:

- Create replay seed for checkout latency investigation.
- Add contradiction-handling fixture.
- Add missing-evidence fixture.
- Store reviewed outcome as memory only after operator review.

Non-goals:

- This packet does not prove root cause.
- This packet does not authorize production action.
- This packet does not replace incident command, change management, or service ownership.
