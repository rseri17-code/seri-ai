# Agent Operating Guide — seri.ai

Two AI agents work on this repository alongside Ravikanth Seri:

- **Codex** reads this file automatically at session start.
- **Claude** reads `CLAUDE.md` automatically, which binds to this same guide.

Both agents serve one mission and one protocol:

1. **`NORTH_STAR.md`** — the authoritative goal, authored by Ravikanth.
2. **`CLAUDE_HANDOFF.md`** — live protocol, measured defects, handoff checklist. Update after every push.
3. **`PROJECT_LEAD_ASSIGNMENTS.md`** — ACTIVE sprint board from Project Lead (Grok). Read after NORTH_STAR before choosing work.

## Coordination rules (both agents)

- Git is the source of truth. `git fetch` first; read remote handoff files, not memory.
- Branches: Codex `main` or `codex/*`; Claude `claude/*` (merge latest `main` before push).
- Full `npm test` && `npm run build` before every push.
- Never write copy to satisfy a validator; repoint pins deliberately.
- Public-safety unclear → flag Ravikanth. Do not auto-publish private systems or unpublished metrics.
- Merging `claude/*` → `main` is Ravikanth's call.

## Ownership lanes — RULED 2026-08-29

| | Owns |
| --- | --- |
| **Claude** | Every visitor-facing string |
| **Codex** | Structure, routing, layout, styling, a11y attrs, validators, retrieval/content-data |
| **Project Lead (Grok)** | Assign, review live, validate agents, keep assignments current |
| **Principal (Ravikanth)** | Rulings, merges, external reviews, domain, essay final claims |


<!-- Restored 2026-08-31 by Claude. The 2026-08-31 AGENTS.md rewrite dropped this section and
     the Oscillation brake. Both are required by scripts/validate-agent-handoff.mjs, so main went
     red on npm test and both agents were blocked. Restored verbatim from 0d51c7d rather than
     repointing the validator: deleting a governance rule is the Project Lead's call, not an
     agent's. If the removal was deliberate, drop the pin in validate-agent-handoff.mjs instead
     and delete this block. -->

## Cross-review protocol

1. At session start: `git fetch`, diff `main` since your last recorded sync point, and review the other agent's changes using Keep / Fix / Replace with / Why it matters / Evidence needed / Public-safety risk. Append findings to the Review Ledger in `CLAUDE_HANDOFF.md`.
2. Findings filed against your lane: address them, or answer why not, within one session.
3. **Oscillation brake**: if the same copy or decision changes direction twice, freeze it for Ravikanth.
4. Reviews argue from `NORTH_STAR.md`, never from authorship.

## SESSION HANDOFF — 2026-08-31 (Project Lead / Grok) — 10/10 board

**Full tables:** `PROJECT_LEAD_ASSIGNMENTS.md` (ACTIVE).

### Roles

- **Codex P0:** `/about`→`/background`; `/ask` headings + contrast + reachability; `/work` tap targets  
- **Codex P1:** Ask **corpus prose** (content-data) — required for 10/10 Ask quality  
- **Claude P0:** agent **evaluation & observability** chapter; **essay depth** (primary 10/10 gate)  
- **Ravikanth:** external practitioner reviews; domain; Sentinalai naming; essay edit; merge `claude/*`  
- **Lead:** validate production after pushes; do not trust green suite without measurement  

### Measured facts

- Live site shareable; Patterns thesis strong; hero frozen; TIAA intentional  
- `/about` still 404 without redirect  
- Writing depth + eval/o11y narrative + Ask corpus = path to 10/10  

### Sequence

1. Codex P0 → 2. Claude P0 → 3. Codex P1 corpus → 4. Ravikanth reviews/domain  
5. No hero/nav redesign  

### Where to start

1. `git fetch`  
2. `PROJECT_LEAD_ASSIGNMENTS.md`  
3. This block  
4. `CLAUDE_HANDOFF.md` top (measured Ask defects)  
5. Your lane only  

## Ruled copy

`validate:ruled` enforces Ravikanth's decisions. Restore ruled copy on failure; do not repoint without a new ruling + same-commit update to `validate-ruled-copy.mjs` and CLAUDE_HANDOFF.
