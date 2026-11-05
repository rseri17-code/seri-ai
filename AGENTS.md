# Agent Operating Guide — seri.ai

Two AI agents work on this repository alongside Ravikanth Seri:

- **Codex** reads this file automatically at session start.
- **Claude** reads `CLAUDE.md` automatically, which binds to this same guide.

Both agents serve one mission and one protocol:

1. **`NORTH_STAR.md`** — the authoritative goal, authored by Ravikanth. Read it before deciding what to work on.
2. **`CLAUDE_HANDOFF.md`** — the live working protocol between the agents: role split, validation gates, handoff checklist, and current status. Read it at the start of every session. Update your status/sync section at the end of any session that pushes.
3. **`PROJECT_LEAD_ASSIGNMENTS.md`** — active work ordered by the Project Lead (Grok). When present and marked ACTIVE, it sets the current sprint priority. Read it after NORTH_STAR and before choosing work.

The owner-authorized 2026-10-08 recruiting update has a focused status and validation handoff in **`FDE_RECRUITING_HANDOFF.md`**. Read it alongside the live protocol when working on Work, resume retrieval, or production-delivery answers.

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

1. **Owner ruling 2026-09-27:** the current role title is `AIOps Lead Architect` everywhere. This supersedes the earlier instruction to keep `Senior Technical Lead - AIOps & Observability`. Still do not invent other titles. Keep the focus line `Production AI systems for enterprise operations`. **Do not change frozen hero H1.**
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

## SESSION HANDOFF — 2026-09-21 (ACT: plain-language copy)

Preview PR only. Do not merge. Work-first Operational Intelligence thesis stays.

- Jargon pass on homepage + nav chrome, `/framework` intros, work/ops first screens, Ask + dock UI.
- Frozen hero H1 and primary CTAs untouched. Nav still 5 items + Ask; `/framework` label is now **Framework**.
- OBSERVE audit PR was not available; this pass is structured for an audit-driven refine.
- Pins that encoded old jargon were repointed, not fed copy.

## SESSION HANDOFF — 2026-09-21 (ACT: hero lead lock)

Preview PR #14 only. Do not merge. Work-first Operational Intelligence thesis stays.

- Homepage hero lead and recent paragraph locked in plain speech (principal + dual-hat review).
- Frozen hero H1, both primary CTAs, five-item nav + Ask, map summary, and private boundary untouched.
- Ruled hero pin repointed in the same commit as `CLAUDE_HANDOFF.md`. The thesis-to-production phrase remains off the hero, on the selected-work card, `/work`, and `/background`.

## SESSION HANDOFF — 2026-09-21 (ACT: map summary)

Preview PR only. Do not merge. Work-first Operational Intelligence thesis stays.

- Homepage 30-second map summary is one store + loop sentence. House names stay on the cards.
- Teaching-by-negation removed from the homepage Batch card and the filing eyebrow.
- Frozen hero H1, two primary CTAs, and five-item nav + Ask untouched.
- Pins that quoted the old summary were repointed, not fed copy.

## SESSION HANDOFF — 2026-09-22 (ACT: homepage defect pass)

Preview PR only. Do not merge. Work-first Operational Intelligence thesis stays.

- Floating Ask pill removed. Navbar Ask and contact ask routes stay. Five-item nav + Ask stays; About remains `/background`.
- Portrait frame, tightened Authorized Misfire and Selected ideas, and responsive map/idea type below 769px. Frozen hero H1 and both primary CTAs untouched.
- Dock-mount pins were repointed because the pill was deleted, not because copy was written for a grep.

## SESSION HANDOFF — 2026-09-23 (ACT: site quality pass)

Preview PR only. Do not merge. Work-first Operational Intelligence thesis stays.

- Floating Ask pill was already unmounted; unused `shouldShowAskDock` removed. Navbar Ask and contact ask routes stay. `Chat` dock variant stays because validators require the unmounted branch.
- Portrait xl gets a CSS mint grade. Frozen hero H1 and both primary CTAs untouched.
- `/api/ask` validates, caps history, aborts slow providers, logs `ask_latency`, and rate-limits. Durable KV/Upstash is optional; memory window is the fallback.
- JSON-LD jobTitle is AIOps Lead Architect. Blank site URL falls back to the canonical Vercel origin.
- Homepage class strings shortened in CSS. robots no longer lists `/admin`; `/api` stays disallowed. Sitemap refs stay.

## SESSION HANDOFF — 2026-09-27 (owner title ruling)

Preview PR only. Do not merge. Work-first Operational Intelligence thesis stays.

- **Owner ruling 2026-09-27:** current role title is `AIOps Lead Architect` everywhere, including the portrait, background, resume headline and Jun 2025–present role, JSON-LD `jobTitle` (read from that resume role), metadata, and `llms.txt`. This supersedes the 2026-09-01 instruction to keep `Senior Technical Lead - AIOps & Observability` and the 2026-08-30 note not to restore this title. Still do not invent other titles. Past roles stay. Frozen hero H1 stays.
- Main pinned Next.js at 15.5.26 before the 16.3.6 upgrade on this branch. Sitemap `lastmod` comes from content dates. Robots lists only `/sitemap.xml` and still disallows `/api`.

## Ruled copy is machine-enforced

`npm run validate:ruled` fails the build if ruled copy is reverted. Restore the ruled copy — do not repoint the check — unless Ravikanth issues a new ruling and you update `scripts/validate-ruled-copy.mjs` and CLAUDE_HANDOFF.md in the same commit.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

---

## Shared Second Brain — Three-Agent Protocol

For cross-session context, ChatGPT, Grok and Claude share `main:SECOND_BRAIN.md` in `rseri17-code/seri-ai`. At substantive session start, fetch the latest remote version, not a stale local copy. At session end or significant milestone, capture only decision-relevant changes and commit safely when authorized and supported, or say explicitly that no update occurred.

**Knowledge scope:** Work and business context only: TIAA roles, professional projects, career, engineering work, business ventures and side gigs, investing/retirement strategy, real-estate decisions, financial planning, personal ambitions and goals, and cross-domain decisions. Exclude family/partner/children names, relationships, household biographical details, health information, personal contact information and identifiers. Financial numbers and property information may be recorded only when relevant and appropriate for repository visibility. Do not capture raw private correspondence.

Follow `SECOND_BRAIN.md#cross-agent-knowledge-protocol-2026-11-05` for provenance, revision, concurrency, and privacy boundaries. Use latest Git blob SHA with minimal updates. Preserve existing website engineering ownership lanes, `NORTH_STAR.md`, `CLAUDE_HANDOFF.md`, code-branch rules, test/build gates, and Ravi's merge authority; this section extends context coordination only and does not grant deployment permission. Report actual read/write results and commit SHA; instructions do not automatically establish background sync.

## Capability Parity for Shared Cognitive OS

**Owner ruling (2026-11-05):** ChatGPT, Grok, and Claude are peers in the personal Second Brain. Do **not** designate ChatGPT as only strategy, Grok as only research, or Claude as only engineering. Every agent independently researches, discovers, challenges, reasons, plans, writes, engineers, tests and evaluates as required by the user's request and as supported by its available tools and permissions. Share newly verified discoveries, durable lessons, mistakes, corrections, and reusable practices in `SECOND_BRAIN.md` using its provenance and safety protocol. Use agent-neutral records so any assistant can retrieve and apply them. Never defer work purely on the basis of an invented specialist role.

This rule concerns Ravi's **shared personal intelligence**. The earlier Claude/Codex website-specific editorial/code ownership lanes remain in force for changes to the seri-ai site, as do branch/test/build and owner approval rules. Repository change ownership is not an AI intelligence-role restriction.

## Cognitive OS autonomous intake (shared-memory scope)

For all ChatGPT, Grok, Claude and future agents, read `memory/AGENT_PROTOCOL.md` and respective `CHATGPT.md` / `GROK.md` / `CLAUDE.md` alongside latest `main:SECOND_BRAIN.md`. Every agent is a full-spectrum peer. Substantive conversations may produce a structured, provenance-labeled, privacy-safe `memory/inbox/<unique-id>.json` proposal through an agent-owned PR. GitHub's `cognitive-os-memory.yml` workflow validates proposals on PR/push/schedule but does not see private chats or automatically promote memories. Do not claim a conversation was synchronized unless a proposal was actually submitted and verified. Every agent may independently serve as the steward reviewer; high-impact changes require the owner's approval. This guidance does not override any website code/copy ownership, branch, build/test, publication or merge constraints above.
