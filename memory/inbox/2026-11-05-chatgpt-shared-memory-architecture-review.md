# Proposed knowledge update — shared-memory architecture
- Date: 2026-11-05
- Author: ChatGPT
- Source: User-supplied Grok research synthesis, independently cross-checked in part against sources linked below.
- State: PROPOSED — not yet semantically promoted
- Domain: Ravi Cognitive OS / cross-agent memory architecture
- Owner ruling: Every agent remains a full-spectrum peer. Stewardship is a process any capable agent can execute, not a permanent role or exclusive ownership.

## Proposal
1. Preserve GitHub-backed markdown as current shared source of truth. The existing SHA-stale-write 409 conflict test validates mechanical write safety, NOT factual/semantic consistency.
2. Introduce an agent-neutral `memory/inbox/` proposal lane: each agent can submit short, sourced facts, corrections, and lessons, including confidence and invalidation condition. It must not silently change authoritative decisions.
3. Implement semantic validation: compare proposed facts with current decisions/status, their effective dates, dependencies, and source evidence. Escalate contradictions rather than blindly merge.
4. Provide a stewardship workflow runnable by ChatGPT, Grok, Claude or another qualified agent. Proposals can be accepted, rejected, deferred or escalated with a recorded rationale. High-impact factual/semantic promotions need user approval.
5. Add a brief/index derived from currently accepted memory for session start; preserve provenance and link to full record.
6. Keep immutable input snapshot/diff and review before consolidation or dreaming adoption; do not overwrite canonical memory with an unreviewed generated store.
7. Evaluate retrieval accuracy, stale-fact rate, cross-domain decision quality and update provenance before considering a graph database or heavy infrastructure.

## Evidence and limitations
- Zep: Git textual changes do not resolve conflicts in changing facts or their temporal validity. https://www.getzep.com/blog/markdown-is-not-agent-memory/
- Siim Tolk: sourced note inbox and one steward process; observational single implementation, not a universally validated benchmark. https://siimtolk.github.io/articles/model-wiki/
- STORM (May 2026 arXiv 2605.20563): state-oriented conflict detection for multi-agent collaborative workspaces; not direct validation of personal memory quality. https://arxiv.org/abs/2605.20563
- Nowledge Labs: disposable generated replacement and controlled review as an approach to consolidation; descriptive source. https://www.nowledge.co/blog/sleep-on-it
- Shared Selective Persistent Memory (Apple, Sep 2026): selective shared task context outperformed full-history retention in tested enterprise scenarios, without proving applicability to this personal system. https://machinelearning.apple.com/research/shared-selective-persistent-memory
- Big Agentic Brain: 1,104 graded bug-fix runs plus 378 distributed-team sessions reported, but specialized benchmark; do not repeat '10x lower cost' without matching metric/baseline. https://dev.to/codr/unlocking-swarm-intelligence-with-big-agentic-brain-and-claude-code-4668

## Important corrections
- STORM research surfaced as May 2026, not August; verify exact citation before public use.
- A git SHA check only protects a file from stale writes. Semantic changes in related files can still conflict.
- Privacy boundary: professional projects, career, ventures, investing, retirement, real estate, and goals only. Exclude family/partner/children, health, contacts, sensitive identifiers, and nonpublic employer materials.
- Do not assert unattended event-driven synchronization. Existing daily reconciliation is best effort and not demonstrated to run with complete session visibility.

## Acceptance tests to add
- Semantic conflict test: two non-overlapping updates make mutually inconsistent claims about one job-offer state. Both SHA writes pass; semantic reviewer must flag conflict.
- Agent parity test: same agent independently discovers, evaluates, and implements an authorized technical improvement; source-labeled learnings become available to other agents.
- Promotion test: agent proposes an important revised user goal; proposed note must not be silently treated as a user-confirmed decision until accepted.
