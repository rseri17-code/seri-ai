# Decision Packet Example

Version: 1.0  
Status: Draft for Technical Review  
Updated: 2026-07-25

## Related References

- Canonical Doctrine: [/wiki/operational-intelligence-canonical-doctrine](/wiki/operational-intelligence-canonical-doctrine)
- Reference Architecture: [/wiki/operational-intelligence-reference-architecture](/wiki/operational-intelligence-reference-architecture)
- Operations Room: [/investigation-room](/investigation-room)

## Scenario

Synthetic case OI-ROOM-001: checkout latency and partial failure during a narrow window.

## Decision Packet

Decision type: Reversible action recommendation.

Recommended action: Prepare a rollback review packet for the recent configuration or deployment change associated with the affected checkout path.

Approval class: Reversible action.

Required operator: Authorized service owner or incident commander.

Rationale: The strongest supported hypothesis is that a recent change contributed to latency in the payment authorization segment of the checkout journey.

Supporting evidence:

- E1 Observation: checkout latency increased during the incident window.
- E2 Observation: payment authorization hop shows elevated timing.
- E3 Observation: related deployment event occurred near the affected window.
- E6 Memory: reviewed prior pattern is similar but not proof.

Contradictory evidence:

- E4 Contradiction: downstream health check remained normal, weakening the downstream-degradation hypothesis.

Missing evidence:

- E5 Missing Evidence: asynchronous trace segment is unavailable, limiting confidence.

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

Fallback:

- Collect missing asynchronous trace context if available.
- Escalate dependency review if contradictory evidence changes.
- Keep incident open if evidence remains insufficient.

Learning record after review:

- Create replay seed for checkout latency investigation.
- Add contradiction-handling fixture.
- Add missing-evidence fixture.
- Store reviewed outcome as memory only after operator review.
