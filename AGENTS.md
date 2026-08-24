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
