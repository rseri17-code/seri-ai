# Agent Operating Guide — seri.ai

Two AI agents work on this repository alongside Ravikanth Seri:

- **Codex** reads this file automatically at session start.
- **Claude** reads `CLAUDE.md` automatically, which binds to this same guide.

Both agents serve one mission and one protocol:

1. **`NORTH_STAR.md`** — the authoritative goal, authored by Ravikanth. Read it before deciding what to work on. Before implementing any change, apply its final rule: does this materially improve the definitive public representation of Ravikanth Seri, his career, his current work, and his evolving body of engineering knowledge? If not, do not implement it.
2. **`CLAUDE_HANDOFF.md`** — the live working protocol between the agents: role split, validation gates, handoff checklist, and current status. Read it at the start of every session. Update your status/sync section at the end of any session that pushes.

## Coordination rules (both agents)

- Git is the source of truth. `git fetch` before starting work; read the newest `CLAUDE_HANDOFF.md` from the remote, not from memory.
- Branch conventions: Codex works on `main` or `codex/*`. Claude works on `claude/*` and merges the latest `main` into its branch before pushing. Never rewrite history on a branch the other agent (or Ravikanth) owns.
- Nothing is pushed unless the full `npm test` and `npm run build` pass locally. No exceptions, including documentation-only changes — the harness gates the handoff contract too.
- Copy contracts live in the validators (`validate:coherence`, `validate:rendered`, `validate:viewport`, `validate:handoff`). Whoever changes pinned copy updates the pins in the same commit.
- If both agents touched the same surface, reconcile around `NORTH_STAR.md`, not around authorship. Never silently revert the other agent's deliberate change — state the reconciliation rationale in the commit message and in `CLAUDE_HANDOFF.md`.
- Public-safety status unclear → flag for Ravikanth in `CLAUDE_HANDOFF.md`. Do not auto-publish.
- Merging `claude/*` work into `main` is done by Ravikanth or with his explicit go-ahead.

## Ownership lanes

Either agent may implement end-to-end inside its own lane; the other agent reviews. Mechanical follow-ons of your own change (validator pin updates for your own copy) are in-lane wherever they live.

- **Codex lane**: the validation harness and gates, build and deployment configuration, API routes and library wiring (search, retrieval, AI providers, Supabase), content-data plumbing, repo hygiene and scripts, performance budgets.
- **Claude lane**: editorial voice and copy on public surfaces, page-level narrative and information architecture judgments, benchmark and red-team reviews, knowledge-graph editorial coherence, Ask Ravi persona and product framing.
- **Cross-lane**: substantive changes in the other agent's lane go on a branch with a review request in the Review Ledger; the lane owner (or Ravikanth) merges.

## Cross-review protocol

1. At session start: `git fetch`, diff `main` since your last recorded sync point, and review the other agent's changes in that range using Keep / Fix / Replace with / Why it matters / Evidence needed / Public-safety risk. Append findings to the Review Ledger in `CLAUDE_HANDOFF.md`.
2. Findings filed against your lane: address them, or answer why not, in your next session. No entry stays unanswered for more than one session.
3. Post-merge async review is the default rhythm. Substantive cross-lane work is reviewed pre-merge via the ledger.
4. **Oscillation brake**: if the same copy or decision changes direction twice, freeze it, present both versions side by side in the ledger for Ravikanth, and neither agent touches it until he rules.
5. Reviews argue from `NORTH_STAR.md`, never from authorship.

## AUTHORIZED STRUCTURAL CHANGE — 2026-08-26

Ravikanth authorized collapsing the site from 35 routes to roughly six: Home / Writing / Work /
Operational Intelligence / Ask / Contact. This supersedes the standing "do not add routes / do not
redesign" constraints for this change only. **It is sanctioned, not churn — do not revert it.**

/evals is retired entirely (the harness keeps running in CI). The Operations Room is embedded in
the Operational Intelligence page rather than standing as a credibility pillar. Writing becomes the
centre of the site.

Full rationale, rulings and the substance-to-scaffolding diagnosis are in CLAUDE_HANDOFF.md under
the same heading. Read it before touching routes.
