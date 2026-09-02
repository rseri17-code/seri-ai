# Project Lead Assignments — seri.ai

**Issued by:** Grok (Project Lead)
**Authorized by:** Ravikanth Seri
**Date:** 2026-09-01
**Status:** ACTIVE — `git fetch` before work

---

## Closed this cycle (do not redo)

| Item | Status |
| --- | --- |
| `/about` → `/background` 308 | **DONE** (live production) |
| About first screen role → problem → proof | **DONE** (live) |
| Calm path Work / essay / Contact on About | **DONE** (live) |
| Patterns operating-model framing | **DONE** |
| Nav mid-word break | **DONE** |
| Homepage hero H1 | **FROZEN** |

---

## Highest ROI next (ordered)

### 1. Home identity focus line — Claude — **P0 / highest ROI polish**

**Why:** H1 says production AI systems; portrait still only “Senior Technical Lead – AIOps & Observability.” Undersells the mantle in the first viewport.

**Do:** Under the portrait on `/` (match `/background` identity card if same block):

- Keep: `Senior Technical Lead - AIOps & Observability`
- Add focus line: `Production AI systems for enterprise operations`
- Keep: TIAA · Charlotte · 15+ years

**Do not:** replace Senior Technical Lead; invent Architect/Director titles; touch frozen H1.

**Branch:** `claude/identity-focus-line`  
**Acceptance:** first viewport shows official title + production-AI focus without clutter.

---

### 2. Agent evaluation & observability chapter — Claude — **P0 / hiring ROI**

**Why:** Staff AI eng / recruiter probe gap. Thesis implies gates/traces/HITL; page must say it as owned practice.

**Do:** On `/background` and/or `/work`, public-safe section covering:
- agent/session traces (tools, steps, failures)
- eval gates before promote
- quality dimensions (success, groundedness, refusal, operational usefulness)
- LLM-as-judge limits
- HITL when impact is high
- drift/scorecards only if public-record safe

Capabilities over vendor logos. No private systems or invented metrics.

**Branch:** `claude/career-eval-observability` (or same branch as #1 if sequential)  
**Acceptance:** recruiter sees eval/o11y as first-class chapter.

---

### 3. Essay depth behind “Read the essay” — Claude (+ Ravikanth edit) — **P0 / 10/10 gate**

**Why:** Calm path now points at an essay; thin essays break the promise.

**Do:** Expand the linked essay (and ideally one more) toward real length using only on-site public-safe material. No new private production claims.

**Ravikanth:** confirm which essay is canonical; final edit.

**Acceptance:** “Read the essay” lands on substance, not a stub in essay clothes.

---

### 4. Finish Codex P0 a11y if not merged — Codex — **P0 hygiene**

**Why:** Redirect shipped; Ask heading/contrast/reachability and Work tap targets may still be open on the same branch or partially landed.

**Do:** Verify on production after merge:
- `/ask` outline + contrast (`text-slate-500` → adequate) + suggested questions usable ≥1024px
- `/work` Sentinalai + GitHub targets ≥24px (padding only, no prose rewrite)

If already done on the merged branch, mark DONE in CLAUDE_HANDOFF and stop.

**Branch:** finish/merge remaining `codex/about-redirect-ask-a11y` work or `codex/ask-work-a11y`

---

### 5. Ask corpus prose — Codex — **P1**

**Why:** Ask quality ceiling is content-data, not UI.

**Do:** Replace label-string registry entries for core OI concepts with real prose so answers are sentences.

**Branch:** `codex/ask-corpus-prose`

---

### 6. Ravikanth only — proof multipliers

| Item | Priority |
| --- | --- |
| Essay final edit / confirm canonical essay | P0 |
| External practitioner reviews | P1 |
| Sentinalai naming | Blocked on you |
| Domain `seri.ai` when ready | P2 |

---

## Sequence (do in order)

1. **Claude** — identity focus line (fast win)  
2. **Claude** — eval/o11y chapter  
3. **Claude** — essay expand (parallel if capacity)  
4. **Codex** — confirm/finish Ask + Work a11y  
5. **Codex** — Ask corpus P1  
6. **Ravikanth** — reviews / domain  

No hero redesign. No nav expansion. No new routes.

---

## Roles (locked)

| Who | Owns |
| --- | --- |
| **Claude** | Visitor-facing strings only |
| **Codex** | Structure, a11y attrs, validators, content-data plumbing |
| **Grok** | Assign, review live, validate |
| **Ravikanth** | Rulings, merges of `claude/*`, essay claims |

## Gates

Full `npm test` && `npm run build` before push. Update top of `CLAUDE_HANDOFF.md` with hash + what closed.
