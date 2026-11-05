# Second Brain — Reliability Contract
Updated: 2026-11-05
Canonical knowledge: [SECOND_BRAIN.md](../SECOND_BRAIN.md)

## Authorized domains
TIAA professional work and career; projects and technical architecture; AI/automation platforms; ventures/side gigs; investing/retirement planning; real estate and financial strategy; goals, decision rationales and open actions. Exclude family/partner/children details, health, personal contact information and identifiers. Do not include nonpublic employer documents, trade secrets or sensitive raw financial records. Never store details merely because they appeared in a conversation.

## Update lifecycle
1. READ: Fetch latest main:SECOND_BRAIN.md and relevant context immediately before meaningful advice. Record whether the fetch succeeded.
2. EXTRACT: Identify durable deltas: new decision, correction, milestone, explicit goal, risk, dependency or action. No whole transcripts or generic chat.
3. CLASSIFY: user-stated / verified / hypothesis / needs-verification; attach date, topic and originating agent. Distinguish planned from completed.
4. SCREEN: If personal/private, confidential, legally sensitive, unverifiable or unsuitable for repo visibility, omit or reduce to a safe abstract decision.
5. RECONCILE: Check prior entries and new GitHub state; preserve history and mark superseded facts. Do not confuse another agent's conclusions with Ravi's rulings.
6. WRITE: Use the latest blob SHA with minimal exact-context edit; on conflict re-fetch and reconcile. Do not force-push or overwrite another agent.
7. VERIFY: Fetch after commit, check that desired text exists once, prior text is preserved and excluded content was not introduced; report full commit SHA.
8. FAIL CLOSED: If GitHub read/write or validation fails, report unsynced state, not success. Retry only when safe. Do not make claims about automatic chat triggers.

## Measurement
- **Read freshness**: Was latest GitHub main read at the start of the work? (yes/no)
- **Capture coverage**: Was each meaningful explicit decision added or deliberately excluded? (tracked/not verified)
- **Duplicate rate**: Count duplicate memory facts during periodic reviews.
- **Conflict rate**: Count stale-SHA or contradictory-agent updates and resolved outcomes.
- **Staleness**: Flag any active status not reconfirmed within an appropriate domain-specific period.
- **Privacy leakage**: Target zero excluded details, unapproved secrets, or raw confidential material.
- **Write receipt**: Every claimed update must have an actual commit SHA and read-back verification.

## Maintenance rhythm
- In an active ChatGPT conversation with GitHub tools available: read latest canonical memory when substantive context is required; commit a safe meaningful delta during the turn or at a natural milestone. Do not promise an event after the chat is closed.
- Optional scheduled reconciliation can run from an automation only when that execution actually has necessary chat history and repository access. The schedule is a fallback, not a guaranteed event-driven session hook.
- Every month, perform a quality audit of contradictions, stale statuses, duplicates, excluded information and coverage.
- No automatic semantic promotion of conflicting or inferred statements; user-confirmed decisions take precedence.

## Repository interoperability
AGENTS.md continues governing website development roles and test/build gates. CLAUDE.md continues governing Claude engineering workflow. This document only establishes personal-professional knowledge reliability standards.
