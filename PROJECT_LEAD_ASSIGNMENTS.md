# Project Lead Assignments — seri.ai

**Issued by:** Grok (Senior Product Manager / AI Engineer / Project Lead)
**Authorized by:** Ravikanth Seri
**Date:** 2026-08-31
**Status:** ACTIVE — both agents must `git fetch` and read this before choosing work

This file sets sprint priority on top of `NORTH_STAR.md`, `AGENTS.md`, and `CLAUDE_HANDOFF.md`.
It does not replace them.

**North star for this board:** close the gaps that keep the site at ~7.5/10 as a professional artifact and ~6/10 as a finished AI-systems body of work. Thesis and Patterns are strong; depth, Ask corpus, calm About first screen, and external proof are the remaining gates.

---

## Roles and responsibilities (locked)

| Role | Who | Owns |
| --- | --- | --- |
| **Principal** | Ravikanth Seri | Rulings, merges of `claude/*`, public-safety exceptions, Sentinalai naming, essay final edit, which essay is the “one essay” link, external reviews, domain |
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
- Do **not** thin the site thesis to match lifestyle-exec personal brands; apply sparseness only where specified (About first screen)

---

## Path to 10/10 — gap → owner

| Gap | Owner | Priority |
| --- | --- | --- |
| `/about` 404 (redirect to `/background`) | Codex | **P0** |
| `/ask` heading soup, contrast, control reachability | Codex | **P0** |
| `/work` Sentinalai/GitHub tap targets &lt;24px | Codex | **P0** |
| **About first screen:** role → problem → proof (fewer systems nouns) | Claude | **P0** |
| Agent evaluation & observability career chapter | Claude | **P0** |
| Essay depth (real long-form, not stubs) | Claude (+ Ravikanth edit) | **P0** — primary 10/10 gate |
| Ask corpus: registry/content-data as prose, not label lists | Codex | **P1** |
| “Bigger is better” validator floors that punish subtraction | Codex | **P1** |
| External practitioner reviews | Ravikanth | **P1** |
| Domain / canonical `seri.ai` when ready | Ravikanth | **P2** |
| Finish route collapse / orphan retirement | Codex + Ravikanth call | **P2** |
| Sentinalai naming | Ravikanth only | **Blocked** |
| Name the single “read this” essay for calm path | Ravikanth | **P0** (one decision) |

---

## Sprint board — ACTIVE

### Codex

| # | Item | Priority | Status |
| --- | --- | --- | --- |
| 1 | Permanent redirect `/about` → `/background` | P0 | **OPEN** |
| 2 | `/ask`: demote non-section H2s; fix `text-slate-500` contrast; fix suggested-question reachability ≥1024px | P0 | **OPEN** |
| 3 | `/work`: min 24px tap targets on Sentinalai + GitHub only — no prose rewrite | P0 | **OPEN** |
| 4 | **Content-data / Ask corpus:** prose for core OI concepts so Ask returns sentences | P1 | **OPEN** |
| 5 | Validator floors that punish subtraction | P1 | Backlog |
| 6 | Orphan retirement when Ravikanth authorizes | P2 | Later |

**Branch (P0):** `codex/about-redirect-ask-a11y`  
**Branch (P1 corpus):** `codex/ask-corpus-prose` (after P0 on main)  
**Gates:** `npm test` && `npm run build`; measure `/ask` when touching Ask; update top of `CLAUDE_HANDOFF.md`

**Do not:** rewrite hero, rewrite Work/About prose, invent private systems, restore Claude-removed strings for pins

### Claude

| # | Item | Priority | Status |
| --- | --- | --- | --- |
| 1 | **About (`/background`) first screen — role → problem → proof** | P0 | **OPEN** |
| 2 | **Agent evaluation & observability** chapter on `/background` and/or `/work` | P0 | **OPEN** |
| 3 | **Essay depth:** expand existing articles (target ≥1,200–1,800 words when material exists on-site). No new private claims. Ravikanth edits. | P0 | **OPEN** — primary 10/10 gate |
| 4 | Patterns framing | — | **DONE** |
| 5 | Homepage hero | — | **FROZEN** |

**Branch:** `claude/about-first-screen-eval-essays` (merge latest `main` first)  
**Gates:** `npm test` && `npm run build`; deliberate pin repoints only; update `CLAUDE_HANDOFF.md`

#### About first screen — ruled brief (2026-08-31)

**Goal:** a stranger answers who / what problem / where’s the proof in ~15 seconds. Short can still be senior **if** essays and Work carry weight elsewhere.

| Beat | Required | Keep off the first screen |
| --- | --- | --- |
| **Role** | Senior Technical Lead – AIOps & Observability; TIAA; 15+ years (facts already public) | Pattern names, ten-layer inventories, framework jargon |
| **Problem** | One failure mode in plain language (e.g. systems failed in ways no single dashboard explained; production AI made missing assembled context consequential) | Comma-lists of signals / topology / memory / evaluation |
| **Proof** | Calm default path only: **Work** · **one essay** · **Contact** (or Resume/LinkedIn as secondary) | Competing indexes (map, library grid, five equal CTAs, “start here” taxonomies) |

**Do:**
- Fewer systems nouns above the fold; thesis vocabulary may deepen *below* the fold or on Patterns/Work
- Keep career arc honesty; do not lifestyle-brand the page
- If Ravikanth has not named the one essay yet, use the strongest existing public essay slug already linked from the site and note the choice in CLAUDE_HANDOFF for him to confirm

**Do not:**
- Strip the site-wide thesis—only reduce noun density on About’s first viewport
- Add another orientation sitemap
- Touch homepage hero
- Invent metrics or private systems

#### Calm path (IA voice, not new routes)

Default reader path: **Work → one substantial essay → Contact**. Patterns, Ops Room, Ask remain available from nav/home—not as equal first-screen doors on About.

### Ravikanth (Principal)

| # | Item | Priority | Status |
| --- | --- | --- | --- |
| 1 | **Name the single “read this” essay** for About proof link | P0 | **OPEN** |
| 2 | Essay final edit; new experiential claims | P0 ongoing | — |
| 3 | External practitioner reviews | P1 | **OPEN** |
| 4 | Sentinalai vs SentinelAI | Blocked on you | **OPEN** |
| 5 | Domain when `seri.ai` is ready | P2 | — |
| 6 | Merge `claude/*` to main | As needed | — |

---

## Closed (do not redo)

| Item | Notes |
| --- | --- |
| Patterns four-stage structure | `d2d64bb` |
| Nav mid-word break | `bf885ac` |
| Patterns framing + How to read this | Claude |
| Homepage identity redesign + hero freeze | `validate:ruled` |

---

## Definition of closer to 10/10

A senior AI engineer can:

1. From About’s first screen alone: state role, core problem, and next proof click  
2. State the thesis (context layer first; agent is not the moat) from Patterns or Home  
3. See **evaluation and agent observability** as a first-class owned practice  
4. Read **two substantial essays** that demonstrate judgment  
5. Ask a question and get **prose-grounded** answers with honest limits  
6. Find no broken primary paths (`/about` included) and no obvious a11y regressions on Ask/Work  

---

## Sequence

1. **Codex P0** (redirect + Ask a11y + Work targets) → Lead validates live  
2. **Claude P0** (About first screen + eval/o11y chapter + essay expand) → Lead validates  
3. **Codex P1** (Ask corpus prose) → Lead validates Ask  
4. **Ravikanth** names the one essay if not already set; external reviews; domain  
5. Hold hero and nav; no redesign cycles  
