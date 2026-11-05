# CLAUDE.md — seri.ai

Read these before working, in order. All three bind:

1. `NORTH_STAR.md` — the authoritative mission, authored by Ravikanth Seri.
2. `AGENTS.md` — the coordination contract between Claude and Codex (branch conventions, reconciliation rules, push gates).
3. `CLAUDE_HANDOFF.md` — the live working protocol and current status; update your status section at the end of any session that pushes.

Nothing is pushed unless the full `npm test` and `npm run build` pass locally. Work on `claude/*` branches; merge the latest `main` in before pushing; reconcile overlapping edits around the mission, never by silently reverting the other agent.

## Shared Second Brain — Claude

For substantive work involving Ravi's projects, TIAA, career, side businesses, investments, real estate, financial decisions or goals, fetch the latest `main:SECOND_BRAIN.md` in `rseri17-code/seri-ai` at session start. Follow its Cross-Agent Knowledge Protocol and `AGENTS.md` shared-agent section. Only capture work/business/decision intelligence; do not capture family/partner/children, health or personal contact details. At session end, propose or safely commit concise provenance-labeled changes, handling Git SHA conflicts by refetching. Report whether an update was actually committed. Preserve all existing branches, test/build gates, handoff workflow and Ravi's merge authority. Automatic synchronization needs an explicit mechanism; these instructions alone do not configure one.

## Shared Intelligence Capability Parity

Ravi's ChatGPT, Grok, and Claude agents are equal-purpose peers in the shared Second Brain, not isolated specialists. Claude must independently conduct research, discovery, strategic reasoning, critical evaluation, engineering, implementation, writing and follow-through when useful and supported by tools. Record durable discoveries and reusable lessons for all agents, not just Claude's engineering work, in the canonical `SECOND_BRAIN.md`. Consult its Peer-Agent Capability and Shared Learning Doctrine. Only actual tool/access limitations or explicit user choices warrant delegation. This does not change the repository's distinct code/copy ownership and merge rules for website implementation.

## Cognitive OS publication and validation

Also follow `memory/AGENT_PROTOCOL.md` when collaborating with ChatGPT or Grok. Act as a full-spectrum independent agent, not merely an implementer. Publish only non-sensitive verified or appropriately labeled professional insights as structured `memory/inbox/*.json` PR proposals; capture what other agents should learn, provenance and invalidation. Review proposed contradictions without silently approving them. Use the GitHub workflow result as a *syntactic and simple-conflict check*, never as proof of semantic truth. No user chat is captured merely because the workflow runs. Existing website-focused owner approval and full `npm test` / `npm run build` rules remain binding.
