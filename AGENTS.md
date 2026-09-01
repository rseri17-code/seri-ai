# Agent Operating Guide — seri.ai

Two AI agents work on this repository alongside Ravikanth Seri:

- **Codex** reads this file automatically at session start.
- **Claude** reads `CLAUDE.md` automatically, which binds to this same guide.

Protocol:

1. **`NORTH_STAR.md`** — authoritative goal.
2. **`CLAUDE_HANDOFF.md`** — live protocol and measured defects. Update after every push.
3. **`PROJECT_LEAD_ASSIGNMENTS.md`** — ACTIVE sprint board (Project Lead / Grok). Read before choosing work.

## Coordination rules

- `git fetch` first; trust remote handoff files.
- Codex: `main` or `codex/*`. Claude: `claude/*` (merge latest `main` before push).
- Full `npm test` && `npm run build` before every push.
- Never write copy to satisfy a validator.
- Public-safety unclear → flag Ravikanth.
- Merging `claude/*` → `main` is Ravikanth's call.

## Ownership lanes — RULED 2026-08-29

| | Owns |
| --- | --- |
| **Claude** | Every visitor-facing string |
| **Codex** | Structure, routing, layout, styling, a11y attrs, validators, retrieval/content-data |
| **Project Lead (Grok)** | Assign, review live, validate agents |
| **Principal (Ravikanth)** | Rulings, merges, external reviews, domain, essay final claims, which essay is the calm-path link |

## SESSION HANDOFF — 2026-08-31 (Project Lead) — includes About first-screen brief

**Full board:** `PROJECT_LEAD_ASSIGNMENTS.md` (ACTIVE).

### Roles this cycle

- **Codex P0:** `/about`→`/background`; Ask a11y/structure; Work tap targets  
- **Codex P1:** Ask corpus prose  
- **Claude P0:**  
  1. **About first screen** — role → problem → proof; fewer systems nouns; calm path **Work / one essay / Contact**  
  2. Eval & observability chapter  
  3. Essay depth (primary 10/10 gate)  
- **Ravikanth:** name the one essay if unset; reviews; domain; Sentinalai; merge `claude/*`  

### About first-screen rule (do not ignore)

Short About is senior only if writing elsewhere carries weight. Do not strip site thesis—only reduce noun density on About’s first viewport. Do not add competing indexes on About.

### Sequence

1. Codex P0 → 2. Claude P0 → 3. Codex P1 → 4. Ravikanth proof multipliers  
5. No hero/nav redesign  

### Start

1. `git fetch`  
2. `PROJECT_LEAD_ASSIGNMENTS.md`  
3. This block  
4. `CLAUDE_HANDOFF.md` top  
5. Your lane only  

## Ruled copy

`validate:ruled` enforces Ravikanth decisions. Restore on failure; new ruling updates `validate-ruled-copy.mjs` + CLAUDE_HANDOFF same commit.
