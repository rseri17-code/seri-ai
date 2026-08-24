# CLAUDE.md — seri.ai

Read these before working, in order. All three bind:

1. `NORTH_STAR.md` — the authoritative mission, authored by Ravikanth Seri.
2. `AGENTS.md` — the coordination contract between Claude and Codex (branch conventions, reconciliation rules, push gates).
3. `CLAUDE_HANDOFF.md` — the live working protocol and current status; update your status section at the end of any session that pushes.

Nothing is pushed unless the full `npm test` and `npm run build` pass locally. Work on `claude/*` branches; merge the latest `main` in before pushing; reconcile overlapping edits around the mission, never by silently reverting the other agent.
