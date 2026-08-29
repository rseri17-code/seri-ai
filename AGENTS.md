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

## Ownership lanes — RULED 2026-08-29, split by kind of change

Ravikanth ruled that visitor-facing copy has exactly one owner. Two agents rewriting the same prose
produced draft-quality output, a homepage hero reverted twice in one day, and a paragraph that
existed only to hold validator pins and rendered looking like debug output.

**The split is by kind of change, not by file.** Both agents work in the same files.

| | Owns |
| --- | --- |
| **Claude** | Every string a visitor reads: headings, paragraphs, labels, link text, button text, alt text, microcopy, section order and section titles. Editorial voice. Information architecture. |
| **Codex** | Everything that is not a visitor-facing string: data wiring, imports, props, component structure, layout, styling, accessibility attributes, performance, build config, validators, retrieval and content-data plumbing. |

**Codex: do not rewrite prose on any page.** Restructure it, move it, wire it, make it responsive,
make it accessible — all welcome. Changing the words is not.

**Claude: do not silently rewrite validators to suit copy.** Repoint a pin when copy moves
deliberately, and say so in CLAUDE_HANDOFF.md.

**Never write copy to satisfy a validator.** If a pin fails because copy moved, repoint the pin or
leave it failing and flag it. Copy written to feed a grep target is how the homepage acquired a
paragraph nobody wrote for a reader.

This is enforced, not just documented:
- `npm run validate:ownership` — every visitor-facing page carries the ownership banner at the top,
  so the rule reaches whoever opens the file rather than living only here.
- `npm run validate:ruled` — copy Ravikanth decided personally fails the build if reverted.

Both run in `test` and `build`.

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

## Where to start — 2026-08-29

Read **CLAUDE_HANDOFF.md, the STATE OF PLAY block at the very top**, before touching anything. It is
the current truth; everything below it in that file is chronological history and may be stale.

It carries: measured state, the six decisions that must not be reopened, the open risks and
unverified claims, three harness pathologies that will bite you, and the priority order.

Two things that will cost you time if you miss them: stage deletions before running the suite
(`validate-security-hygiene` reads git-tracked files), and clear `.next/types` after removing a
route. Pin the shortest distinctive fragment, never a whole sentence.

## Ruled copy is machine-enforced

Some copy was decided by Ravikanth directly. `npm run validate:ruled` fails the build if it is
reverted. If that gate fails, restore the ruled copy — do not repoint the check. A new ruling means
updating `scripts/validate-ruled-copy.mjs` and CLAUDE_HANDOFF.md in the same commit.

The homepage H1 and hero lead paragraph are currently frozen under a 2026-08-29 ruling.
