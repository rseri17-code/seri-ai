# Project Lead Assignments — seri.ai

**Issued by:** Grok (Senior Product Manager / AI Engineer / Project Lead)
**Authorized by:** Ravikanth Seri
**Date:** 2026-08-29
**Status:** SUPERSEDED for prioritization, 2026-08-31 — see the note directly below.

> **Status note appended by Claude, 2026-08-31. This is a factual correction, not a new assignment —
> issuing assignments is the Project Lead's call, not an agent's.**
>
> This sprint's assignments are from 2026-08-29 and no longer describe the live backlog. `AGENTS.md`
> has Codex read this file *before* choosing work, so leaving it marked ACTIVE would point a fresh
> session at the Patterns sprint instead of what is actually outstanding.
>
> - **Assignment A (Codex)** — both items are DONE (`bf885ac`, `d2d64bb`) and the build is green on
>   `main`. The one live item from it is the backlog line: the content-data layer, registry entries
>   that store label strings instead of prose, which hurts Ask.
> - **Assignment B (Claude)** — **"Stage framing + How to read this on `/patterns`" was never
>   delivered.** It is still open. Claude is out of budget on this project, so it needs Ravikanth or
>   a future Claude session; it is prose, so it is not in Codex's lane. The branch this assignment
>   names, `claude/patterns-operating-model`, was merged into `main` on 2026-08-30 and no longer
>   exists as live work.
>
> **The current backlog lives in `CLAUDE_HANDOFF.md` → "CODEX: START HERE — Claude is handing the
> remaining work over, 2026-08-31."** It is split by lane and marks which items are Ravikanth's call.
> Grok or Ravikanth should re-issue this file when the next sprint is set.

This file is the current work assignment. It does not replace `NORTH_STAR.md`, `AGENTS.md`, or `CLAUDE_HANDOFF.md`. It sits on top of them for prioritization.

**Session handoff detail lives in `AGENTS.md` → SESSION HANDOFF — 2026-08-29.** Read that first.

Lane split remains RULED 2026-08-29:
- **Claude** — every string a visitor reads
- **Codex** — everything that is not a visitor-facing string

---

## Ruling: Patterns are an ordered operating model

`/patterns` presents the **ten** architecture patterns as a system in four stages.

| Stage | Name | Slugs |
| --- | --- | --- |
| **1** | Investigation Core | `evidence-driven-rca`, `confidence-calibrated-rca`, `transaction-journey-reconstruction`, `change-impact-reasoning` |
| **2** | Structural Reality | `topology-aware-reasoning` |
| **3** | Memory & Shared Context | `operational-memory`, `shared-context-for-enterprise-agents` |
| **4** | Agent Control Plane | `agentic-incident-investigation`, `human-in-the-loop-operational-ai`, `evaluation-and-replay` |

**All 10 patterns are implemented** in `content/patterns.json` and grouped on `/patterns` (`d2d64bb`). Detail routes `/patterns/[slug]` remain the source for full pattern bodies.

**System thesis:** These patterns are the operating model of the context layer. Agents consume it; they do not replace it. The agent is not the moat.

---

## Assignment A — Codex

| Item | Status |
| --- | --- |
| Nav mid-word break fix | **DONE** `bf885ac` |
| `/patterns` four-stage structure (all 10) | **DONE** `d2d64bb` |
| Validate pins / build after structure | **Do next** if not already green |
| Content-data layer (registry prose for Ask) | Backlog — highest remaining Codex value |

Do not rewrite visitor-facing framing copy.

---

## Assignment B — Claude

| Item | Status |
| --- | --- |
| Stage framing + How to read this on `/patterns` | **OPEN — NOT DELIVERED.** Claude out of budget 2026-08-31. Prose, so not Codex's lane. |
| Hero H1 / lead | **FROZEN** — do not touch |

Branch: `claude/patterns-operating-model` — **merged into `main` on 2026-08-30; no longer live work.**

Acceptance: a principal SRE can explain the four stages after one pass.

---

## Project Lead review criteria

- [x] Four stages visible; all 10 patterns mapped once
- [x] No mid-word nav breakage (code fix landed; confirm on deploy)
- [ ] System thesis legible in framing copy (Claude)
- [ ] Pattern detail routes still work post-deploy
- [ ] `npm test` + `npm run build` green
- [ ] CLAUDE_HANDOFF updated when Claude lands framing

Merging `claude/*` into `main` remains Ravikanth's call (or explicit go-ahead).
