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

---

## SESSION HANDOFF — 2026-08-29 (Project Lead / Grok)

Read this block first after `git fetch`. It is the current session truth for both agents.

### Shared state

- **Thesis:** Context layer first; the agent is not the moat.
- **Patterns ruling:** `/patterns` is an **ordered operating model** (four stages), not a flat card grid.
- **All 10 patterns implemented** in `content/patterns.json` and covered by the stage grouping on `/patterns`:

| Stage | Name | Slugs (all ten) |
| --- | --- | --- |
| 1 | Investigation Core | `evidence-driven-rca`, `confidence-calibrated-rca`, `transaction-journey-reconstruction`, `change-impact-reasoning` |
| 2 | Structural Reality | `topology-aware-reasoning` |
| 3 | Memory & Shared Context | `operational-memory`, `shared-context-for-enterprise-agents` |
| 4 | Agent Control Plane | `agentic-incident-investigation`, `human-in-the-loop-operational-ai`, `evaluation-and-replay` |

- Detail routes: `/patterns/[slug]` via `generateStaticParams` — do not break them.
- Pattern body definitions (problem/solution/architecture/failure modes) stay in `content/patterns.json`. Do not invent new pattern names.

### Commits landed by Project Lead this session

| Commit | What |
| --- | --- |
| `bf885ac` | Nav mid-word break fix (`overflow-wrap` + `whitespace-nowrap` on nav links) |
| `d2d64bb` | `/patterns` four-stage structure (Codex lane; all 10 patterns grouped) |
| `f5b9a3f` | `PROJECT_LEAD_ASSIGNMENTS.md` + AGENTS pointer (initial assignment) |

### Handoff to Codex

**Status of your lane on this sprint:** structure goals for nav + patterns stages are **DONE** on `main`.

**Do next (when free):**
1. Pull `main`. Confirm `/patterns` stage hierarchy and that all ten detail routes still resolve.
2. Run full `npm test` && `npm run build`. If any validator pin broke from the stage regroup, **repoint the pin** in the same commit — do not rewrite Claude-owned prose to feed a grep.
3. Highest remaining Codex-lane value outside this sprint: content-data layer (registry entries that store label strings instead of prose hurt Ask).
4. Do **not** rewrite visitor-facing stage framing or pattern descriptions.

### Handoff to Claude

**Status:** structure is stable on `main` — safe to write framing copy.

**Do next:**
1. Pull `main` (include `d2d64bb` stage structure).
2. Branch `claude/patterns-operating-model`.
3. Own `/patterns` visitor-facing framing only:
   - Page states ordered **operating model**, not catalog
   - Short stage descriptions (1–2 sentences each)
   - **How to read this** block (Investigation → Structure → Memory → Control)
   - Thesis legible: context layer first; agent is not the moat
4. Do **not** rewrite underlying pattern definitions in `patterns.json` unless a factual error is found.
5. **Hero H1 and hero lead remain frozen** (2026-08-29 ruling). Do not touch them.
6. Update `CLAUDE_HANDOFF.md` when done; repoint pins deliberately if copy moves.

**Acceptance for Claude:** a principal SRE can explain the four stages after one pass.

### What neither agent should do

- Reorder the four stages without Ravikanth
- Drop or duplicate a pattern slug from the stage map
- Deep-dive new graph/schema product work until Ravikanth asks (explicitly deferred this session)
- Re-open collapsed-route or hero decisions already ruled

### Longer-term priority (unchanged)

Essays depth, content-data corpus quality, route merges, visual QA, domain migration — see CLAUDE_HANDOFF STATE OF PLAY.

---

## Where to start — 2026-08-29 (updated by Project Lead)

1. `git fetch`
2. Read **SESSION HANDOFF** above
3. Read **`PROJECT_LEAD_ASSIGNMENTS.md`**
4. Read **CLAUDE_HANDOFF.md STATE OF PLAY**
5. Execute your lane’s **Do next** only

## MERGED TO MAIN — 2026-08-30

Ravikanth gave the go-ahead. `claude/patterns-operating-model` is now in `main`; the two are the
same commit. **The rulings below are live, not proposals.** Codex: pull `main` before starting.

`main` was verified after the merge — `npm test` and `npm run build` green, twelve key routes plus
sitemap and RSS returning 200 from the production build. Rollback point is `2312eae`.

One change in that merge is wider than the briefs that produced it and is worth knowing about:
**`app/loading.tsx` was deleted.** A `loading.tsx` anywhere in the segment path created a Suspense
boundary whose content needed JavaScript to reveal, so every route rendered an empty `<main>` with
JS disabled. Removing it fixed all of them. If loading UI is wanted back for a genuinely async
route, add `loading.tsx` **to that segment only, never the root**.

## RULED 2026-08-30 — /background is six sections, and one runtime name is banned there

`/background` is: Opening · Career progression · Career spine · What I build now · Principles ·
Proof and next step. First person throughout. Enforced by `validate-content-coherence` and
`validate-rendered-routes`, which also asserts the order.

**One container-runtime product name must not appear on `/background`** — copy, headings, metadata,
alt text, hidden text, any content object read into the page, or the page file itself. A gate fails
the build if it reappears. Rewrite the sentence, never find-and-replace: say "container platforms",
"enterprise platform modernization" or "platform engineering". The exact term and full reasoning are
in CLAUDE_HANDOFF.md §4b.

**Do not "fix" `content/resume.json` certifications to satisfy this.** One certification carries the
term in its official credential name. A credential name is a proper noun, and the ruling does not
cover `/resume`.

## RULED 2026-08-30 — the homepage is seven sections, identity first

Ravikanth issued a homepage redesign brief. It **supersedes the 2026-08-29 hero freeze**;
`scripts/validate-ruled-copy.mjs` was updated in the same commit and now enforces the new ruling.

Seven sections, this order, enforced by build gates:
1 Hero · 2 Signature thesis · 3 Flagship proof · 4 Selected work · 5 Career arc ·
6 Selected ideas · 7 Closing invitation

**Codex: this is sanctioned, not churn.** Do not restore the old H1, the third hero CTA, the
falsification matrix, the inspection ledger, the persona-route grid, the five-stop visitor map or
the contact-reason grid to the homepage. Do not re-expand the nav past five items plus Ask.

Structural work on the new page is welcome and wanted: `components/operations-room-preview.tsx` is
the flagship and is the highest-value surface for performance and a11y attention. Its ARIA tabs
pattern including roving-tabindex focus management is deliberate — keep it.

Full rationale, measurements, and the one known consequence (`/brief` is now orphaned) are in
CLAUDE_HANDOFF.md under the same heading.

## RULED 2026-08-30 — real titles and employers are published

Ravikanth ruled: *"yes , use real titles and employers"*. `content/resume.json` now carries his real
role titles, month-level periods, and employer names (TIAA, LPL Financial, Wells Fargo, VF
Corporation, State Farm), rendered on `/resume` and in the `/background` career spine.

**Codex: this is sanctioned. Do not revert it to the anonymized "Major regulated financial-services
enterprise" phrasing**, and do not restore the older invented titles (*AIOps Lead Architect*,
*Infrastructure Technical Lead — Identity and Observability*).

The rest of the public-safety boundary is unchanged: internal system names and unpublished
operational metrics stay out, including the current employer's internal platform name and its
operational figures. Rationale and the open follow-ups are in CLAUDE_HANDOFF.md under *Open risks*.

## Ruled copy is machine-enforced

Some copy was decided by Ravikanth directly. `npm run validate:ruled` fails the build if it is
reverted. If that gate fails, restore the ruled copy — do not repoint the check. A new ruling means
updating `scripts/validate-ruled-copy.mjs` and CLAUDE_HANDOFF.md in the same commit.

The homepage H1 and hero lead paragraph are currently frozen under a 2026-08-29 ruling.
