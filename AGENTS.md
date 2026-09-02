# Agent Operating Guide — seri.ai

Two AI agents work on this repository alongside Ravikanth Seri:

- **Codex** reads this file automatically at session start.
- **Claude** reads `CLAUDE.md` automatically, which binds to this same guide.

Both agents serve one mission and one protocol:

1. **`NORTH_STAR.md`** — the authoritative goal, authored by Ravikanth. Read it before deciding what to work on.
2. **`CLAUDE_HANDOFF.md`** — the live working protocol between the agents: role split, validation gates, handoff checklist, and current status. Read it at the start of every session. Update your status/sync section at the end of any session that pushes.
3. **`PROJECT_LEAD_ASSIGNMENTS.md`** — active work ordered by the Project Lead (Grok). When present and marked ACTIVE, it sets the current sprint priority. Read it after NORTH_STAR and before choosing work.

## Coordination rules (both agents)

- Git is the source of truth. `git fetch` before starting work; read the newest `CLAUDE_HANDOFF.md`, `PROJECT_LEAD_ASSIGNMENTS.md`, and this file from the remote, not from memory.
- Branch conventions: Codex works on `main` or `codex/*`. Claude works on `claude/*` and merges the latest `main` into its branch before pushing. Never rewrite history on a branch the other agent (or Ravikanth) owns.
- Nothing is pushed unless the full `npm test` and `npm run build` pass locally. No exceptions, including documentation-only changes — the harness gates the handoff contract too.
- Copy contracts live in the validators. Whoever changes pinned copy updates the pins in the same commit.
- If both agents touched the same surface, reconcile around `NORTH_STAR.md`, not around authorship. Never silently revert the other agent's deliberate change — state the reconciliation rationale in the commit message and in `CLAUDE_HANDOFF.md`.
- Public-safety status unclear → flag for Ravikanth in `CLAUDE_HANDOFF.md`. Do not auto-publish.
- Merging `claude/*` → `main` is Ravikanth's call.

## Ownership lanes — RULED 2026-08-29, split by kind of change

| | Owns |
| --- | --- |
| **Claude** | Every string a visitor reads: headings, paragraphs, labels, link text, button text, alt text, microcopy, section order and section titles. Editorial voice. Information architecture. |
| **Codex** | Everything that is not a visitor-facing string: data wiring, imports, props, component structure, layout, styling, accessibility attributes, performance, build config, validators, retrieval and content-data plumbing. |
| **Project Lead (Grok)** | Assign, sequence, review production, validate both agents, keep `PROJECT_LEAD_ASSIGNMENTS.md` current |
| **Principal (Ravikanth)** | Rulings, merges of `claude/*`, public-safety exceptions, essay final claims |

**Codex: do not rewrite prose on any page.** Restructure, move, wire, responsive, accessible — welcome. Changing the words is not.

**Claude: do not silently rewrite validators to suit copy.** Repoint a pin when copy moves deliberately, and say so in CLAUDE_HANDOFF.md.

**Never write copy to satisfy a validator.** If a pin fails because copy moved, repoint the pin or leave it failing and flag it. Copy written to feed a grep target is how the site acquired reader-hostile text before.

This is enforced by `npm run validate:ownership` and `npm run validate:ruled` in `test` and `build`.

## Cross-review protocol

1. At session start: `git fetch`, diff `main` since your last sync, review the other agent's changes. Append findings to the Review Ledger in `CLAUDE_HANDOFF.md`.
2. Findings against your lane: address or answer within one session.
3. **Oscillation brake**: same decision twice → freeze for Ravikanth.
4. Reviews argue from `NORTH_STAR.md`, never authorship.

## AUTHORIZED STRUCTURAL CHANGE — 2026-08-26

Ravikanth authorized collapsing toward roughly six primary destinations. Sanctioned — do not revert. Writing is the long-term centre; apparatus is not the product. Detail in CLAUDE_HANDOFF.md.

---

## SESSION HANDOFF — 2026-09-01 (Project Lead / Grok)

**Full board:** `PROJECT_LEAD_ASSIGNMENTS.md` (ACTIVE).

### Just closed (verified live)

- `/about` → `/background` **308** on production
- About first screen role → problem → proof + calm path Work / essay / Contact

### Highest ROI next — execute in order

1. **Claude P0:** Home (and About identity card if shared) **focus line** under portrait: keep `Senior Technical Lead - AIOps & Observability`; add `Production AI systems for enterprise operations`. **Do not change frozen hero H1.**
2. **Claude P0:** Agent **evaluation & observability** chapter on `/background` and/or `/work` (capabilities, not vendor logos; public-safe).
3. **Claude P0:** **Essay depth** behind “Read the essay” (Ravikanth final edit).
4. **Codex:** Verify/finish Ask a11y (headings, contrast, control reachability) + Work tap targets ≥24px if anything remains from the redirect branch. Mark DONE in CLAUDE_HANDOFF if already live.
5. **Codex P1:** Ask **corpus prose** (content-data sentences, not label lists).
6. **Ravikanth:** essay confirm, external reviews, Sentinalai naming, domain.

### Build / Vercel discipline (both agents + Lead)

- **Before every push to main:** run full `npm test` and `npm run build` locally. Doc-only commits are not exempt — `validate:handoff` greps this file and CLAUDE_HANDOFF.md.
- **Do not** strip required contract phrases from `AGENTS.md` (this file is validated). When updating SESSION HANDOFF, **append or replace the session block**; keep Ownership lanes, NORTH_STAR / CLAUDE_HANDOFF references, npm test/build rules, and the merge rule intact.
- If Vercel fails after a handoff edit: read the failed script output (`validate:handoff` is the usual suspect for AGENTS.md edits). Restore missing required strings; do not disable the validator.

### Standing freezes

- Homepage hero H1 + primary CTAs: `validate:ruled`
- Nav: 5 items + Ask; About → `/background`
- TIAA / real employers: intentional
- No redesign cycles, no new routes without Ravikanth

### Where to start

1. `git fetch`
2. `PROJECT_LEAD_ASSIGNMENTS.md`
3. This SESSION HANDOFF
4. `CLAUDE_HANDOFF.md` top
5. Your lane only

## Ruled copy is machine-enforced

`npm run validate:ruled` fails the build if ruled copy is reverted. Restore the ruled copy — do not repoint the check — unless Ravikanth issues a new ruling and you update `scripts/validate-ruled-copy.mjs` and CLAUDE_HANDOFF.md in the same commit.
