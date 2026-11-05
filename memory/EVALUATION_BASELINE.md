# Ravi Cognitive OS — Phase 1 Evaluation Baseline
Established: 2026-11-05
Status: TEST PLAN ACTIVE; RESULTS NOT YET MEASURED

## Mission
Prove that shared, agent-neutral knowledge improves the user's answers, decisions, and execution across ChatGPT, Grok, Claude (when available), and future tools. This is a measurement protocol, not evidence of results.

## Capability parity
Each agent independently investigates, discovers, reasons, challenges, executes authorized work, verifies results, and transfers durable learning. No permanent allocation of strategy/research/engineering. Actual tool permissions and application-specific repository rules still apply.

## Boundaries
Only professional work (including TIAA where disclosure is permitted), career, AI projects, business/side ventures, investing and retirement strategy, financial planning, real estate and goals. No family members, partner/children, health, personal contact details, raw financial account data, secrets, nonpublic employer records or unnecessary personal identifiers. Treat repo as potentially publicly accessible.

## Phase 1 — Test cases
Run at least 12 controlled, real-domain transfer tests across two agents, with later expansion toward 30–60 real interactions:

1. Agent A learns a new user-confirmed decision; Agent B retrieves it from GitHub without retelling. Verify exact details and status.
2. Agent A records a corrected/superseded decision; Agent B avoids recommending the old plan.
3. Agent A records a hypothesis; Agent B explicitly avoids asserting it as fact.
4. Agent A records a failed implementation and validated reason; Agent B avoids repeating it without new evidence.
5. Agent A discovers a cross-domain dependency; Agent B notices its relevance in a different topic.
6. Both agents propose conflicting recommendations; preserve independent analysis and resolve on evidence, not authority.
7. Concurrent writes: stale blob SHA must fail, refetch, merge and preserve both entries.
8. Privacy test: deliberately exclude personal/family/health/contact material and secrets from commits.
9. Offline/no-access test: agent must declare failed GitHub access, not assert synchronization.
10. Retrieval test: irrelevant and outdated context must not contaminate answers.
11. Outcome test: follow up a recorded decision and distinguish result from decision quality.
12. Drift test: summarize canonical current position and contrast it with superseded alternatives.

## Evaluation rubric (score each 0/1 with receipts)
- Accurate latest decision retrieval (correct evidence and freshness)
- Source attribution and confidence/status
- Reasoned cross-domain relevance
- Appropriate independent challenge (not forced agreement)
- Useful actionable next step with constraints
- Safe, non-duplicative, version-checked memory update
- No excluded information retained

Track per-case agent pair, test time, canonical file SHA, prompt/expected result in non-sensitive abstract form, actual behavior, pass/fail, failure type, and commit SHA if a write occurs. Do not fabricate tests/results.

## Gates
- Gate A: Both active agents demonstrate read + SHA-safe write + verified read-back; existing examples may count when verified.
- Gate B: 12 controlled tests passed with explicit evidence (no unmeasured score claims).
- Gate C: 30–60 substantive interactions assessed for stale facts, contradictory recommendations, privacy, correction latency, and usefulness.
- Gate D: Decide whether to split memory into structured domain/decision/insight files based on measured retrieval failures, not premature complexity.

## Operational routine
On each substantive conversation, fetch canonical SECOND_BRAIN.md when relevant; extract confirmed durable deltas, classify them and reconcile before authorized write. At the end of an active session, report a sync receipt only if a read/write actually occurred. Existing daily automation provides best-effort reconciliation, not guaranteed event-driven continuity. Future agents read the same rules. Memory is not authority over current explicit user instructions.

## First test and next action
Conduct a genuine agent-to-agent transfer: user communicates an in-scope decision to Grok; Grok safely records it with provenance; ChatGPT retrieves the new record unprompted beyond a topic cue, validates that it is current and produces a better recommendation. Then reverse direction. No fake success claims.

## Verified execution results — 2026-11-05

### Cross-agent record preservation / retrieval — PASS (partial coverage of cases 1 and 10)
- Retrieved latest `main:SECOND_BRAIN.md` in ChatGPT using authenticated GitHub read.
- Confirmed Grok's actual commit `6633df77cb5441262eee75d415777c088acdf1fb` and its provenance-labeled integration entry.
- Confirmed ChatGPT's later quality-gate and project entries also remain in canonical file.
- Confirmed the user-corrected equal-purpose agent doctrine is present.
- Boundary: This is a real cross-agent **integration-record transfer**, not yet a blind transfer of a new substantive user decision or evidence of improved recommendation quality. Full case 1 remains OPEN.

### Concurrent SHA write conflict / reconciliation — PASS (case 7)
- Fixture: `memory/tests/concurrency-probe-2026-11-05.md`.
- Initial commit: `08c2fbc33bb4d4e0e8f6abd9c28525dd58adab8d`.
- Write A: `cb797c34b73032810e568bfc3c65d9c66564f71e` using initial blob SHA.
- Write B with intentionally stale SHA: rejected by GitHub API with HTTP 409 CONFLICT; **no overwrite**.
- Refetched latest content and applied B: `ac1136cb28b2b40c801aa1750c9863fe2424997d`.
- Read-back confirmed initial content, A, and B; each update occurred exactly once.
- Boundary: This tests GitHub's optimistic concurrency control with two simulated sequential writers in one ChatGPT execution, not actual simultaneous Grok/ChatGPT tool calls.

### Current evidence-based status
- Verified: cross-agent record retrieval, preservation of both agents' contributions, version-conflict rejection and safe reconciliation.
- Still open: full user-decision transfer, supersession, hypothesis handling, failure lesson transfer, connection quality, independent disagreement, privacy-adversarial test, access-failure disclosure, outcome review and longitudinal improvement.
- No aggregate 12-test pass rate is claimed; the remaining cases have not been executed.
