# Project Lead Assignments — seri.ai

**Issued by:** Grok (Senior Product Manager / AI Engineer / Project Lead)
**Authorized by:** Ravikanth Seri
**Date:** 2026-08-29
**Status:** ACTIVE — both agents must read this on session start after `git fetch`

This file is the current work assignment. It does not replace `NORTH_STAR.md`, `AGENTS.md`, or `CLAUDE_HANDOFF.md`. It sits on top of them for prioritization.

Lane split remains RULED 2026-08-29:
- **Claude** — every string a visitor reads (headings, paragraphs, labels, link/button text, alt text, microcopy, section titles/order, editorial voice, IA)
- **Codex** — everything that is not a visitor-facing string (data wiring, components, layout, styling, a11y attributes, performance, validators, retrieval/content-data)

---

## Ruling: Patterns are an ordered operating model

Ravikanth chose option **2**: `/patterns` must present the ten architecture patterns as a **system**, not a flat card grid.

### Four-stage model (do not reorder without Ravikanth)

| Stage | Name | Patterns |
| --- | --- | --- |
| **1** | Investigation Core | Evidence-Driven RCA · Confidence-Calibrated RCA · Transaction Journey Reconstruction · Change Impact Reasoning |
| **2** | Structural Reality | Topology-Aware Reasoning |
| **3** | Memory & Shared Context | Operational Memory · Shared Context for Enterprise Agents |
| **4** | Agent Control Plane | Agentic Incident Investigation · Human-in-the-Loop Operational AI · Evaluation and Replay |

**System thesis (must remain legible on the page):**  
These patterns are the operating model of the context layer. Agents consume it; they do not replace it. The agent is not the moat.

Pattern definitions in `content/patterns.json` stay the source of truth for problem/solution/architecture/failure modes. Do not invent new pattern names or rewrite underlying definitions unless a factual error is found.

---

## Assignment A — Codex (structure / layout / wiring)

**Branch:** `codex/patterns-operating-model` (merge latest `main` before push)

**Do first (prerequisite if still live):**  
Fix desktop primary-nav mid-word wrapping ("Hom e", "Resum e", "Wor k", etc.). Root cause is density + cascade allowing breaks; `components/header.tsx` labels are fine — layout/CSS/responsive behavior is the fix. Nine primary items + Ask is too dense for the current desktop treatment.

**Then — Patterns operating-model structure:**

1. Restructure `/patterns` (and detail pages only if required for consistency) so the **four stages are the primary visual hierarchy**.
2. Stage headers as clear section anchors.
3. Patterns **grouped under their stage** — not a flat 2-column grid of all ten.
4. Preserve existing routes `/patterns/[slug]`. Do not break links.
5. Mobile: stage headers remain readable and scannable; no density regressions.
6. Do **not** rewrite visitor-facing prose. Restructure, move, wire, style, a11y only.
7. If a validator pin moves because of structure, **repoint in the same commit** and record in `CLAUDE_HANDOFF.md`.
8. Full `npm test` and `npm run build` green before push.

**Acceptance:**  
Stage structure is obvious without reading body copy; no layout regressions; no broken pattern routes; nav no longer breaks mid-word on desktop.

**Sequencing note:** Codex implements structure **before** Claude does heavy copy so Claude is not writing against a moving layout.

---

## Assignment B — Claude (copy / information architecture)

**Branch:** `claude/patterns-operating-model` (merge latest `main` — including Codex structure when merged — before push)

**Scope:** Visitor-facing strings only. Do not change component structure or data wiring.

1. Rewrite `/patterns` framing so the page states this is an **ordered operating model**, not a catalog.
2. Introduce the four stages with short, precise stage descriptions (1–2 sentences each).
3. Keep the thesis: context layer first; agent is not the moat.
4. Add a short **"How to read this"** block near the top (3–5 lines max): Investigation → Structure → Memory → Control.
5. Optional stage labels on cards so the visitor always knows which stage they are in.
6. Do **not** invent new pattern names or rewrite underlying pattern definitions in `patterns.json` unless a factual error is found.
7. When done, update status in `CLAUDE_HANDOFF.md`. If pins need repointing, do so deliberately — **never write copy to satisfy a pin**.

**Acceptance:**  
A principal SRE who has never seen the site can explain the four stages after one pass.

**Hero freeze still stands:** Homepage H1 and hero lead paragraph remain frozen under the 2026-08-29 ruling. Do not touch them without a new ruling from Ravikanth.

---

## Priority relative to existing STATE OF PLAY

Insert this work **above** "finish the merges" for the Patterns surface only. Essays and content-data corpus quality remain the long-term 10/10 gates and are not cancelled.

Suggested order for the next sessions:

1. Codex: nav fix + patterns stage structure  
2. Claude: patterns stage framing + How to read this  
3. Project Lead review against NORTH_STAR and 10/10 IA bar  
4. Resume existing priority list (essays, content-data layer, route merges, visual QA, domain)

---

## Project Lead review criteria (before merge to main)

- [ ] Four stages visible and ordered as specified
- [ ] System thesis (context layer / agent is not the moat) legible without scrolling past the fold on desktop
- [ ] No mid-word nav breakage on desktop
- [ ] Pattern detail routes still work
- [ ] No new public-safety risk; no invented claims
- [ ] `npm test` + `npm run build` green
- [ ] CLAUDE_HANDOFF updated with commit hash and what changed

Merging `claude/*` into `main` remains Ravikanth's call (or explicit go-ahead).
