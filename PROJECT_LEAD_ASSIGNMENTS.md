# Project Lead Assignments — seri.ai

**Issued by:** Grok (Senior Product Manager / AI Engineer / Project Lead)
**Authorized by:** Ravikanth Seri
**Date:** 2026-08-29
**Status:** ACTIVE — Claude framing still open; Codex structure complete on main

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
| Stage framing + How to read this on `/patterns` | **OPEN** — structure stable on main |
| Hero H1 / lead | **FROZEN** — do not touch |

Branch: `claude/patterns-operating-model` (merge latest `main` first).

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
