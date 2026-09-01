# Project Lead Assignments — seri.ai

**Issued by:** Grok (Senior Product Manager / AI Engineer / Project Lead)
**Authorized by:** Ravikanth Seri
**Date:** 2026-08-31
**Status:** ACTIVE — both agents must `git fetch` and read this before choosing work

This file sets sprint priority on top of `NORTH_STAR.md`, `AGENTS.md`, and `CLAUDE_HANDOFF.md`.
It does not replace them.

---

## Roles and responsibilities (locked)

| Role | Who | Owns |
| --- | --- | --- |
| **Principal** | Ravikanth Seri | Rulings, merges of `claude/*`, public-safety exceptions, Sentinalai naming, essay final edit |
| **Project Lead** | Grok | Assign, sequence, review live site, validate agent work, update this file + AGENTS session handoff |
| **Claude** | Claude agent | Every visitor-facing string: headings, paragraphs, labels, microcopy, section order, editorial voice, IA |
| **Codex** | Codex agent | Structure, routing, redirects, layout, styling, a11y attributes, validators, data/retrieval plumbing — **not** prose rewrites |

**Split is by kind of change, not by file.** Both agents may touch the same files; only one owns the words.

### Standing rulings (do not reopen)

- Homepage hero H1 + lead: **FROZEN** (`validate:ruled`) — identity-first H1; misfire line in signature thesis section
- Nav: **5 items + Ask** (Work, Operational Intelligence, Writing, About→`/background`, Contact)
- TIAA / real employer names: **intentional and allowed**
- Internal systems, logs, proprietary architecture, unpublished metrics: **still prohibited**
- `/patterns`: four-stage operating model; framing **DONE**; do not reorder stages without Ravikanth
- Patterns sprint (nav fix + stage structure + framing): **CLOSED**

---

## Sprint board — 2026-08-31 (ACTIVE)

### Codex — do first

| # | Item | Status |
| --- | --- | --- |
| 1 | Permanent redirect `/about` → `/background` | **OPEN** (live `/about` is 404; nav already correct) |
| 2 | `/ask`: reduce heading soup (demote non-section H2s); fix `text-slate-500` contrast; fix suggested-question reachability ≥1024px | **OPEN** (measured in CLAUDE_HANDOFF Codex start-here) |
| 3 | `/work`: Sentinalai + GitHub links min 24px tap targets only — no prose rewrite | **OPEN** |
| 4 | Optional: replace “bigger is better” validator floors that punish subtraction | Backlog |
| 5 | Content-data layer (registry prose for Ask) | Backlog — highest long-term Codex value |

**Branch:** `codex/about-redirect-ask-a11y` (merge latest `main` first)
**Gates:** full `npm test` && `npm run build` green; update top of `CLAUDE_HANDOFF.md` with hash + measurements
**Do not:** rewrite hero, rewrite Work/About prose, restore Claude-removed strings to feed pins

### Claude — after Codex P0 on main (or parallel if no file collision)

| # | Item | Status |
| --- | --- | --- |
| 1 | Agent evaluation & observability chapter on `/background` and/or `/work` (capabilities, not vendor logos) | **OPEN** |
| 2 | Essay depth: expand 1–2 existing articles toward real length using only on-site public-safe material | **OPEN** — 10/10 gate |
| 3 | Patterns framing | **DONE** |
| 4 | Homepage hero | **FROZEN** — do not touch |

**Branch:** `claude/career-eval-observability-essays` (merge latest `main` first)
**Gates:** full `npm test` && `npm run build` green; pin repoints deliberate + recorded
**Do not:** invent private production details, invent metrics, name tools not on public resume, pad contact for word floors

### Ravikanth only

- Sentinalai vs SentinelAI naming
- Essay final edit / new experiential claims
- Merge `claude/*` to main
- Optional: licensed employer logos in `public/logos/`

---

## Closed sprints (do not redo)

| Sprint | Outcome |
| --- | --- |
| Patterns structure (Codex) | DONE `d2d64bb` |
| Nav mid-word break | DONE `bf885ac` |
| Patterns framing (Claude) | DONE `b84201d` / merged |
| Homepage identity redesign | DONE; hero locked in `validate:ruled` |

---

## Project Lead review criteria (this sprint)

- [ ] `/about` redirects to `/background` on production
- [ ] `/ask` outline + contrast + control reachability improved (measure-route)
- [ ] `/work` link targets ≥24px without content rewrite
- [ ] Eval/o11y chapter legible on About or Work
- [ ] At least one essay materially longer with honest public-safe depth
- [ ] `npm test` + `npm run build` green on pushed work
- [ ] CLAUDE_HANDOFF top block updated by whichever agent pushes

---

## Sequence

1. Codex: items 1–3 → push → Lead validates live
2. Claude: eval/o11y chapter → optional essay expand → Lead validates
3. Stop. No hero/nav redesign cycle.
