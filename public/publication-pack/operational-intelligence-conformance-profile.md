# Operational Intelligence Conformance Profile

Version: 1.0
Status: Draft for technical review
Updated: 2026-08-06

This profile is an implementation-neutral checklist for testing whether a system follows the Operational Intelligence Reference Architecture v1.0. It does not introduce a new layer, product, route, or framework. It turns existing architecture terms into minimum data and behavior contracts so two independent engineering teams can compare implementations.

The profile is intentionally public-safe. Examples must use synthetic or approved public evidence only. It must not include internal employer system names, proprietary platform names, raw logs, dashboards, screenshots, credentials, endpoints, private schemas, or confidential architecture.

## Related References

- Canonical Doctrine: [/wiki/operational-intelligence-canonical-doctrine](/wiki/operational-intelligence-canonical-doctrine)
- Reference Architecture: [/wiki/operational-intelligence-reference-architecture](/wiki/operational-intelligence-reference-architecture)
- Evidence Pack: [/wiki/operational-intelligence-evidence-pack](/wiki/operational-intelligence-evidence-pack)
- Operations Room: [/investigation-room](/investigation-room)
- Decision Packet Example: [/publication-pack/decision-packet-example.md](/publication-pack/decision-packet-example.md)

## Conformance Rule

An implementation conforms only when operational recommendations can be reviewed from records, not prose alone. The system must preserve:

- observation before inference
- evidence provenance
- hypothesis state movement
- contradiction and missing evidence
- replay seed context
- evaluation gate result
- decision packet owner, risk, reversibility, fallback, and approval class

If any consequential action can be recommended without a decision packet, the implementation is non-conformant.

## Required Object Profiles

### Evidence Object

Minimum fields:

| Field | Required | Purpose |
| --- | --- | --- |
| `evidence_id` | Yes | Stable identifier for the evidence record |
| `case_id` | Yes | Investigation or scenario identifier |
| `evidence_type` | Yes | Observation, contradiction, missing_evidence, confirmed_fact, or context |
| `source_class` | Yes | Public-safe source class such as synthetic_monitor, synthetic_change_record, approved_article, resume_source, or architecture_note |
| `observed_at` | Yes | Timestamp, time window, or explicit unknown |
| `summary` | Yes | Human-reviewable description without raw private data |
| `supports` | Yes | Hypothesis, transaction hop, topology claim, decision packet, or none |
| `weakens` | Yes | Hypothesis or claim weakened by this evidence, or none |
| `provenance` | Yes | Approved public route, fixture id, or source class |
| `confidence_effect` | Yes | increases, decreases, blocks, or neutral |
| `public_safety` | Yes | synthetic, public, redacted, or approved |

Failure signals:

- evidence exists only as a dashboard screenshot
- evidence has no timestamp or scope
- contradiction is removed after a preferred hypothesis emerges
- raw private logs or confidential identifiers appear in the record
- source provenance is described as "known internally" without a public-safe reference

### Hypothesis State

Minimum fields:

| Field | Required | Purpose |
| --- | --- | --- |
| `hypothesis_id` | Yes | Stable explanation identifier |
| `case_id` | Yes | Investigation or scenario identifier |
| `statement` | Yes | Falsifiable explanation |
| `state` | Yes | proposed, supported, weakened, contradicted, rejected, or confirmed |
| `supporting_evidence` | Yes | Evidence Object ids |
| `contradicting_evidence` | Yes | Evidence Object ids or explicit none |
| `missing_evidence` | Yes | Named missing evidence condition or explicit none |
| `confidence` | Yes | Numeric band or low/medium/high with rule |
| `last_transition_reason` | Yes | Why the state changed |
| `operator_question` | Yes | What a human should ask next |

Failure signals:

- hypotheses jump directly from proposed to root cause
- confidence changes without evidence references
- missing evidence is hidden because the explanation sounds plausible
- multiple teams cannot tell why one hypothesis outranked another

### Replay Seed

Minimum fields:

| Field | Required | Purpose |
| --- | --- | --- |
| `seed_id` | Yes | Stable replay identifier |
| `case_id` | Yes | Investigation or scenario identifier |
| `scenario_version` | Yes | Fixture, article, or case version |
| `source_corpus_version` | Yes | Approved content or evidence-corpus version |
| `evidence_ids` | Yes | Evidence Object ids included in replay |
| `expected_transitions` | Yes | Expected hypothesis or decision-state transitions |
| `policy_constraints` | Yes | Public-safety and action-boundary rules |
| `expected_outputs` | Yes | Required review artifacts |
| `known_limits` | Yes | What the replay cannot prove |

Failure signals:

- replay depends on live production access
- replay cannot reproduce the evidence path
- replay omits contradiction or missing evidence
- replay has no expected behavior or known limitations

### Evaluation Gate

Minimum fields:

| Field | Required | Purpose |
| --- | --- | --- |
| `gate_id` | Yes | Stable gate identifier |
| `scope` | Yes | Assistant answer, investigation workflow, decision packet, or release |
| `fixtures` | Yes | Replay seed ids or deterministic test ids |
| `required_checks` | Yes | Grounding, citation, refusal, contradiction, missing evidence, approval boundary, or routing |
| `pass_criteria` | Yes | Observable pass rule |
| `failure_policy` | Yes | Block, review, degrade, or warn |
| `reviewer` | Yes | Owner role or review function |
| `expires_at` | Yes | Date, version, or explicit review interval |

Failure signals:

- evaluation measures only fluent answers
- refusal behavior and source validity are not tested
- a pass result never expires
- failures do not block or degrade risky behavior

### Decision Packet

Minimum fields:

| Field | Required | Purpose |
| --- | --- | --- |
| `packet_id` | Yes | Stable review packet identifier |
| `case_id` | Yes | Investigation or scenario identifier |
| `decision_type` | Yes | recommendation, mitigation_review, escalation, refusal, or block |
| `recommended_action` | Yes | Proposed action or explicit no-action |
| `rationale` | Yes | Evidence-linked reason |
| `evidence_ids` | Yes | Supporting Evidence Object ids |
| `contradictions` | Yes | Evidence Object ids or explicit none |
| `missing_evidence` | Yes | Named missing context or explicit none |
| `risk` | Yes | Low, medium, high, or organization-defined class |
| `reversibility` | Yes | Reversible, partially reversible, irreversible, or unknown |
| `approval_class` | Yes | Human approval requirement |
| `owner` | Yes | Owner role or explicit unknown |
| `fallback` | Yes | What happens if action is not approved |
| `expiration` | Yes | When packet must be refreshed |

Failure signals:

- recommendation has no owner
- action risk is not named
- irreversible change has no human approval class
- fallback is missing
- decision cites summaries but no evidence ids

## Minimum Conformance Levels

| Level | Required behavior | Non-conformance signal |
| --- | --- | --- |
| L0 - Descriptive | The system can describe Operational Intelligence concepts. | It cannot produce evidence records, hypotheses, replay seeds, gates, or decision packets. |
| L1 - Evidence-aware | The system separates observation, inference, contradiction, missing evidence, and confirmed fact. | Evidence has no source class, timestamp, or confidence effect. |
| L2 - Replayable | The system can reproduce the evidence path from a replay seed. | Replay depends on prompt memory or live private systems. |
| L3 - Governed | Evaluation gates and decision packets control risky recommendations. | Consequential action can bypass approval, fallback, or expiration. |
| L4 - Learning | Reviewed outcomes update approved memory, fixtures, and future evaluation gates. | Learning is unreviewed, unversioned, or invisible to operators. |

## OI-ROOM-001 Conformance Example

OI-ROOM-001 should satisfy at least L3 in public form:

- Evidence Object: synthetic transaction degradation, synthetic change record, topology clue, contradiction, missing owner confirmation, and public-safe fixture boundary
- Hypothesis State: configuration-regression hypothesis moves from proposed to supported while capacity-saturation is weakened by contradiction
- Replay Seed: bounded synthetic evidence subset, expected state transitions, and known limits
- Evaluation Gate: checks evidence coverage, contradiction handling, missing evidence, citation/routing behavior, and approval boundary
- Decision Packet: rollback review packet with risk, reversibility, owner approval requirement, fallback, and expiration

The example does not prove production causality. It proves that the public architecture can preserve a reviewable evidence-to-decision path.

## Practitioner Review Questions

- Can another team produce the same object types from the same case?
- Can an SRE identify which evidence changed confidence?
- Can a governance reviewer see whether action is blocked, reviewed, or allowed?
- Can the replay be rerun without private systems or raw logs?
- Can the system explain why a hypothesis was rejected?
- Can the decision packet expire before stale evidence becomes authority?

## Reuse Guidance

Practitioners can reuse this profile as a review checklist, API-design worksheet, eval fixture design, schema seed, or architecture-review appendix. It should be adapted to local policy, identity, authorization, retention, and data-classification rules before production use.
