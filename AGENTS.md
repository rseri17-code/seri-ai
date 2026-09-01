# Agent Operating Guide — seri.ai

Two AI agents work on this repository alongside Ravikanth Seri:

- **Codex** reads this file automatically at session start.
- **Claude** reads `CLAUDE.md` automatically, which binds to this same guide.

Both agents serve one mission and one protocol:

1. **`NORTH_STAR.md`** — the authoritative goal, authored by Ravikanth. Read it before deciding what to work on. Before implementing any change, apply its final rule: does this materially improve the definitive public representation of Ravikanth Seri, his career, his current work, and his evolving body of engineering knowledge? If not, do not implement it.
2. **`CLAUDE_HANDOFF.md`** — the live working protocol between the agents: role split, validation gates, handoff checklist, and current status. Read it at the start of every session. Update your status/sync section at the end of any session that pushes.
3. **`PROJECT_LEAD_ASSIGNMENTS.md`** — active work ordered by the Project Lead (Grok). When present and marked ACTIVE, it sets the current sprint priority on top of STATE OF PLAY. Read it after NORTH_STAR and before choosing work.

## Coordination rules (both agents)

- Git is the source of truth. `git fetch` before starting work; read the newest `CLAUDE_HANDOFF.md`, `PROJECT_LEAD_ASSIGNMENTS.md`, and this file from the remote, not from memory.
- Branch conventions: Codex works on `main` or `codex/*`. Claude works on `claude/*` and merges the latest `main` into its branch before pushing. Never rewrite history on a branch the other agent (or Ravikanth) owns.
- Nothing is pushed unless the full `npm test` and `npm run build` pass locally. No exceptions, including documentation-only changes — the harness gates the handoff contract too.
- Copy contracts live in the validators (`validate:coherence`, `validate:rendered`, `validate:viewport`, `validate:handoff`). Whoever changes pinned copy updates the pins in the same commit.
- If both agents touched the same surface, reconcile around `NORTH_STAR.md`, not around authorship. Never silently revert the other agent's deliberate change — state the reconciliation rationale in the commit message and in `CLAUDE_HANDOFF.md`.
- Public-safety status unclear → flag for Ravikanth in `CLAUDE_HANDOFF.md`. Do not auto-publish.
- Merging `claude/*` work into `main` is done by Ravikanth or with his explicit go-ahead.

## Ownership lanes — RULED 2026-08-29, split by kind of change

| | Owns |
| --- | --- |
| **Claude** | Every string a visitor reads: headings, paragraphs, labels, link text, button text, alt text, microcopy, section order and section titles. Editorial voice. Information architecture. |
| **Codex** | Everything that is not a visitor-facing string: data wiring, imports, props, component structure, layout, styling, accessibility attributes, performance, build config, validators, retrieval and content-data plumbing. |
| **Project Lead (Grok)** | Assign, sequence, review production, validate both agents, keep `PROJECT_LEAD_ASSIGNMENTS.md` current |
| **Principal (Ravikanth)** | Rulings, `claude/*` merges, public-safety exceptions, final essay claims |

**Codex: do not rewrite prose on any page.** Restructure, move, wire, responsive, accessible — welcome. Changing the words is not.

**Claude: do not silently rewrite validators to suit copy.** Repoint a pin when copy moves deliberately, and say so in CLAUDE_HANDOFF.md.

**Never write copy to satisfy a validator.** If a pin fails because copy moved, repoint the pin or leave it failing and flag it.

Enforced by `npm run validate:ownership` and `npm run validate:ruled` in `test` and `build`.

## Cross-review protocol

1. At session start: `git fetch`, diff `main` since your last recorded sync point, and review the other agent's changes using Keep / Fix / Replace with / Why it matters / Evidence needed / Public-safety risk. Append findings to the Review Ledger in `CLAUDE_HANDOFF.md`.
2. Findings filed against your lane: address them, or answer why not, within one session.
3. **Oscillation brake**: if the same copy or decision changes direction twice, freeze it for Ravikanth.
4. Reviews argue from `NORTH_STAR.md`, never from authorship.

## AUTHORIZED STRUCTURAL CHANGE — 2026-08-26

Ravikanth authorized collapsing the site toward roughly six primary destinations: Home / Writing / Work / Operational Intelligence / Ask / Contact. **Sanctioned — do not revert.** Writing is the long-term centre; apparatus is not the product.

---

## SESSION HANDOFF — 2026-08-31 (Project Lead / Grok)

**Read this after `git fetch`. Full task tables live in `PROJECT_LEAD_ASSIGNMENTS.md` (ACTIVE).**

### Roles (one line each)

- **Codex:** fix structure/a11y/routing — starting with `/about`→`/background`, then `/ask` headings/contrast/reachability, then `/work` tap targets.
- **Claude:** career proof density — agent evaluation & observability chapter; then essay depth. No hero changes.
- **Lead:** validate live site after each push; do not assume green means good without measuring.
- **Ravikanth:** Sentinalai naming, essay final edit, merge `claude/*`.

### Shared facts (measured 2026-08-31)

- Live: `https://seri-ai.vercel.app`
- Nav About → `/background` (200). Literal `/about` → **404** (no redirect yet).
- Patterns operating-model framing: **shipped**.
- Hero: identity-first H1 locked in `validate:ruled`. Do not redesign.
- TIAA published: intentional.
- 10/10 gate remains essay depth + honest career proof, not more routes.

### Codex do next

1. Branch `codex/about-redirect-ask-a11y`
2. Redirect `/about` → `/background`
3. `/ask` structure + contrast + control reachability (see CLAUDE_HANDOFF Codex start-here + PROJECT_LEAD_ASSIGNMENTS)
4. `/work` link target size only
5. `npm test` && `npm run build`; update CLAUDE_HANDOFF top with hash

### Claude do next

1. Prefer after Codex P0 on main
2. Branch `claude/career-eval-observability-essays`
3. Eval & observability chapter on `/background` and/or `/work`
4. Expand 1–2 essays with public-safe on-site material only
5. Hero frozen; no private systems; no invented metrics

### What neither agent should do

- Reopen patterns stage order or hero direction
- Expand primary nav past 5 + Ask
- Write copy to satisfy pins
- Decide Sentinalai spelling without Ravikanth
- Claim Lighthouse scores or production metrics not measured

### Where to start

1. `git fetch`
2. `PROJECT_LEAD_ASSIGNMENTS.md` (ACTIVE board)
3. This SESSION HANDOFF
4. `CLAUDE_HANDOFF.md` top (Claude’s Codex start-here still has measured Ask defects)
5. Execute only your lane’s open items

## Ruled copy is machine-enforced

`npm run validate:ruled` fails the build if ruled copy is reverted. Restore the ruled copy — do not repoint the check — unless Ravikanth issues a new ruling and you update `scripts/validate-ruled-copy.mjs` + CLAUDE_HANDOFF in the same commit.

Homepage H1 and primary hero CTAs are frozen under the 2026-08-30 redesign ruling (see `validate-ruled-copy.mjs`).
