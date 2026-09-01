# Project Lead Assignments — seri.ai

**Issued by:** Grok (Senior Product Manager / AI Engineer / Project Lead)
**Authorized by:** Ravikanth Seri
**Date:** 2026-08-31
**Status:** ACTIVE — both agents must `git fetch` and read this before choosing work

This file sets sprint priority on top of `NORTH_STAR.md`, `AGENTS.md`, and `CLAUDE_HANDOFF.md`.
It does not replace them.

**North star for this board:** close the gaps that keep the site at ~7.5/10 as a professional artifact and ~6/10 as a finished AI-systems body of work. Thesis and Patterns are strong; depth, Ask corpus, and external proof are the remaining gates.

---

## Roles and responsibilities (locked)

| Role | Who | Owns |
| --- | --- | --- |
| **Principal** | Ravikanth Seri | Rulings, merges of `claude/*`, public-safety exceptions, Sentinalai naming, essay final edit, external reviews, domain |
| **Project Lead** | Grok | Assign, sequence, review live site, validate agent work, keep this file current |
| **Claude** | Claude agent | Every visitor-facing string: headings, paragraphs, labels, microcopy, section order, editorial voice, IA |
| **Codex** | Codex agent | Structure, routing, redirects, layout, styling, a11y attributes, validators, data/retrieval plumbing — **not** prose rewrites |

**Split is by kind of change, not by file.**

### Standing rulings (do not reopen)

- Homepage hero H1 + lead: **FROZEN** (`validate:ruled`)
- Nav: **5 items + Ask** (About → `/background`)
- TIAA / real employer names: **intentional and allowed**
- Internal systems, logs, proprietary architecture, unpublished metrics: **prohibited**
- `/patterns`: four-stage operating model; framing **DONE**
- Patterns sprint (structure + framing + nav break): **CLOSED**

---

## Path to 10/10 — gap → owner

| Gap | Owner | Priority |
| --- | --- | --- |
| `/about` 404 (redirect to `/background`) | Codex | **P0** |
| `/ask` heading soup, contrast, control reachability | Codex | **P0** |
| `/work` Sentinalai/GitHub tap targets &lt;24px | Codex | **P0** |
| Agent evaluation & observability career chapter | Claude | **P0** |
| Essay depth (real long-form, not stubs) | Claude (+ Ravikanth edit) | **P0** — primary 10/10 gate |
| Ask corpus: registry/content-data as prose, not label lists | Codex | **P1** |
| “Bigger is better” validator floors that punish subtraction | Codex | **P1** |
| External practitioner reviews (quorum path already exists) | Ravikanth | **P1** |
| Domain / canonical `seri.ai` when ready | Ravikanth | **P2** |
| Finish route collapse / orphan retirement (`/brief`, etc.) | Codex + Ravikanth call | **P2** |
| Sentinalai naming | Ravikanth only | **Blocked** |

---

## Sprint board — ACTIVE

### Codex

| # | Item | Priority | Status |
| --- | --- | --- | --- |
| 1 | Permanent redirect `/about` → `/background` | P0 | **OPEN** |
| 2 | `/ask`: demote non-section H2s; fix `text-slate-500` contrast; fix suggested-question reachability ≥1024px | P0 | **OPEN** |
| 3 | `/work`: min 24px tap targets on Sentinalai + GitHub only — no prose rewrite | P0 | **OPEN** |
| 4 | **Content-data / Ask corpus:** replace concatenated label-string registry entries with real prose for core OI concepts (evidence layer, replay, topology, evaluation, etc.) so Ask returns sentences, not keyword lists | P1 | **OPEN** — required for 10/10 Ask |
| 5 | Replace or delete validator floors that fail the build when content is *removed* | P1 | Backlog |
| 6 | Orphan retirement / merge support when Ravikanth authorizes | P2 | Later |

**Branch (P0):** `codex/about-redirect-ask-a11y`  
**Branch (P1 corpus):** `codex/ask-corpus-prose` (after P0 on main)  
**Gates:** `npm test` && `npm run build`; measure `/ask` with `scripts/review/measure-route.mjs` when touching Ask; update top of `CLAUDE_HANDOFF.md`

**Do not:** rewrite hero, rewrite Work/About prose, invent private systems, restore Claude-removed strings for pins

### Claude

| # | Item | Priority | Status |
| --- | --- | --- | --- |
| 1 | **Agent evaluation & observability** chapter on `/background` and/or `/work` (traces, eval gates, quality dimensions, LLM-as-judge limits, HITL, drift — capabilities not vendor logos) | P0 | **OPEN** |
| 2 | **Essay depth:** expand existing articles toward real length (target several pieces ≥1,200–1,800 words when material exists on-site only). No new private-production claims. Ravikanth edits. | P0 | **OPEN** — primary 10/10 gate |
| 3 | Keep public vs private boundary explicit; no unsourced metric inflation | Standing | — |
| 4 | Patterns framing | — | **DONE** |
| 5 | Homepage hero | — | **FROZEN** |

**Branch:** `claude/career-eval-observability-essays` (merge latest `main` first; prefer after Codex P0)  
**Gates:** `npm test` && `npm run build`; deliberate pin repoints only; update `CLAUDE_HANDOFF.md`

**Do not:** touch frozen hero; invent Bedrock/Splunk/DeepEval unless already on public resume; pad `/contact` for word floors

### Ravikanth (Principal)

| # | Item | Priority | Status |
| --- | --- | --- | --- |
| 1 | Run / recruit external practitioner reviews (packet + Contact path already exist) | P1 | **OPEN** |
| 2 | Essay final edit; any new experiential claims | P0 ongoing | — |
| 3 | Sentinalai vs SentinelAI | Blocked on you | **OPEN** |
| 4 | Domain / DNS when `seri.ai` is ready (`NEXT_PUBLIC_SITE_URL` with `||`) | P2 | — |
| 5 | Merge `claude/*` to main | As needed | — |

---

## Closed (do not redo)

| Item | Notes |
| --- | --- |
| Patterns four-stage structure | `d2d64bb` |
| Nav mid-word break | `bf885ac` |
| Patterns framing + How to read this | Claude; verified on rendered page |
| Homepage identity redesign + hero freeze | `validate:ruled` |

---

## Definition of closer to 10/10

A senior AI engineer can:

1. Explain who you are and the career arc in two minutes  
2. State the thesis (context layer first; agent is not the moat) from Patterns or Home  
3. See **evaluation and agent observability** as a first-class owned practice  
4. Read **two substantial essays** that demonstrate judgment, not scaffolding  
5. Ask a question and get **prose-grounded** answers with honest limits  
6. Find no broken primary paths (`/about` included) and no obvious a11y regressions on Ask/Work  

External reviews and custom domain are proof multipliers, not substitutes for (3)–(5).

---

## Sequence

1. **Codex P0** (redirect + Ask a11y + Work targets) → Lead validates live  
2. **Claude P0** (eval/o11y chapter + essay expand) → Lead validates  
3. **Codex P1** (Ask corpus prose) → Lead validates Ask quality  
4. **Ravikanth** external reviews + domain when ready  
5. Stop redesign cycles; hold hero and nav  
