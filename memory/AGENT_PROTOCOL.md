# Cognitive OS — Agent-neutral operating contract (v1)
Status: implementation candidate, first-stage review required
Canonical: ../SECOND_BRAIN.md
Repository: rseri17-code/seri-ai (PUBLIC — never place private or confidential information here)

## Mission
ChatGPT, Grok, Claude and future agents are independent full-spectrum peers. Every agent researches, challenges, builds, verifies and proposes next steps with its available capabilities. None is permanently assigned only research, strategy, or engineering.

## Session lifecycle
1. **Read:** Fetch the latest remote SECOND_BRAIN.md, this contract, and relevant accepted context. Never claim real-time synchronization without a successful read.
2. **Reason:** Independently work the user's task. Treat previous agents' findings as evidence and hypotheses, not binding conclusions.
3. **Capture:** When a material professional decision, correction, failed approach, discovery or outcome emerges, create a small structured proposal file in memory/inbox/ using the schema below, if safe for a PUBLIC repository.
4. **Submit:** Open or update an agent-owned PR; do not automatically rewrite SECOND_BRAIN.md. GitHub Actions validates structured proposals on PRs, pushes and its daily schedule. Distinct agent PRs reduce collision.
5. **Review:** A steward is a *function* that any agent may execute, not a fixed persona. Compare proposals against existing accepted facts and their effective dates, sources, validity windows and explicit supersession. The deterministic CI gate checks schema, obvious sensitive patterns and conflicting structured claims; human review handles ambiguous semantic conflicts.
6. **Promote:** User-confirmed decisions and high-impact changes require explicit owner approval before promotion into SECOND_BRAIN.md. The approved PR should contain a minimal diff, link to source proposal, and recorded approval; do not claim a GitHub check alone proves semantic truth.
7. **Verify:** After merge, fetch latest main and confirm the entry is present once; report commit SHA. If unable to read/write or the source conversation isn't available, disclose unsynced state.
8. **Learn:** In future sessions, record a corrected reusable approach or observed outcome, not merely repetitions of the same memory.

## Structured proposal (memory/inbox/<id>.json)
Use unique IDs (lowercase, 2–80 characters; safe characters a-z 0-9 . _ -).
- id: file basename without .json
- agent: ChatGPT | Grok | Claude | other
- recorded_at: UTC ISO timestamp YYYY-MM-DDTHH:MM:SSZ
- domain: career | tiaa | neo | ventures | engineering | investing | retirement | real-estate | financial-planning | goals | cognitive-os
- entity_id: stable non-sensitive topic identifier, e.g. career-role-1
- claim_key: narrow state field e.g. offer-state
- value: concise non-sensitive, source-grounded assertion
- status: proposed | approved | rejected (approved requires approved_by Ravi and approval_ref)
- source_ref: non-sensitive provenance pointer (no raw transcript, private URLs or identifiers)
- invalidation: when/how to revisit assertion
- supersedes: optional array of prior IDs; do not claim supersession without evidence
- approved_by: Ravi, for approved records
- approval_ref: reference for explicit approval, for approved records

This is a strict format for NEW proposals. Existing historical markdown inbox files remain reference-only and are not silently promoted. Status 'approved' is metadata, not a substitute for verifying real owner consent.

## Privacy and safety
This repository is currently PUBLIC. Do not put personal financial numbers, addresses, family or partner names, children, health, phone/email or contact details, confidential employment material, trade secrets, secret keys or raw messages into this repository. A deterministic scanner is a *partial guard*, not a data loss prevention system. When unsure, hold the update locally or request a PRIVATE destination. Prior public history may already contain sensitive information; deleting current text does not erase Git history.

## What autonomy actually means
- GitHub automatically runs checks on submitted PRs / main pushes and a daily schedule, subject to GitHub Actions availability.
- Agents autonomously publish proposals **only** if their individual platform supports an on-session trigger with GitHub write permission.
- A GitHub workflow cannot see private Grok, ChatGPT or Claude conversations unless those platforms explicitly publish them.
- No automated semantic promotion, outbound notifications, or agent wake-up is claimed in v1.
- Never put API tokens or credentials in the repository.

## Tests
Run \`node --test scripts/memory-gate.test.mjs\` and \`node scripts/memory-gate.mjs --dir memory/inbox\`.
For website changes continue following AGENTS.md and its npm test/build and branch/merge gates; this contract does not relax them.
