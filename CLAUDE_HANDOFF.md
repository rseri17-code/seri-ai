# Claude Handoff for seri.ai

Last updated: 2026-08-23

Current sync point before this validation contract:

- `487d383 Add first-visit proof route and Claude handoff`

Refresh this sync point at the end of any future Codex-to-Claude handoff turn, and include the newest commit hash in the human handoff message even if this file is not edited.

Generate the current Claude prompt with:

```bash
npm run handoff:claude
```

## Shared Mission

Build and continuously maintain seri.ai / raviseri.com as Ravikanth Seri's definitive public professional operating system: an evidence-led technical publication and interactive knowledge platform that makes Ravikanth's career, current AI-native operations work, Operational Intelligence thesis, public artifacts, resume evidence, GitHub signal, LinkedIn thinking, and engineering judgment inspectable within public-safe boundaries.

The working relationship must preserve:

Ravikanth Seri -> Career -> Work -> Ideas -> Evidence -> Reusable Engineering Knowledge

The person and the work must remain inseparable.

## Non-Negotiables

- Do not turn the site into a generic resume, portfolio, blog, product brochure, or anonymous Operational Intelligence SaaS site.
- Do not use inflated language such as visionary, world-class engineer, thought leader, pioneer, or industry-leading unless a public third-party source supports it and publication is appropriate.
- Do not publish confidential employer product names, internal systems, proprietary architecture, internal screenshots, logs, dashboards, private repositories, customer information, unpublished metrics, internal service names, or private implementation details.
- Translate protected experience into public-safe architecture principles, reusable patterns, synthetic examples, generic engineering lessons, and public-safe case studies.
- Prefer one durable reference over five shallow posts.
- Preserve the existing route architecture unless Ravikanth explicitly asks for a route or architecture change.
- Every stronger claim needs evidence, citation, boundary language, or a visible limitation.

## Role Split

Codex owns implementation, integration, validation, repo hygiene, build gates, public-safety scans, route integrity, search/Ask wiring, and deployment readiness.

Claude should act as adversarial editor, knowledge architect, technical brand strategist, and reviewer. Claude should produce critique and replacement copy in a structured format, not directly rewrite the product blindly.

Refined 2026-08-24 by the Ownership lanes in `AGENTS.md`, at Ravikanth's direction: Claude also implements end-to-end within the editorial lane (voice, page narrative, Ask persona, knowledge-graph coherence) with the same validation gates, and reviews Codex-lane work post-merge via the Review Ledger. The reviewer-only posture above applies to Codex-lane surfaces (harness, wiring, build, data plumbing), where Claude files findings instead of editing.

Recommended Claude output format:

- Keep
- Fix
- Replace with
- Why it matters
- Evidence needed
- Public-safety risk

## Shift Model

Suggested flow if Ravikanth wants a nightly rhythm:

1. Codex work window: 10 PM to midnight local time unless Ravikanth confirms a different window.
2. Codex ends by committing/pushing validated changes or clearly stating why not.
3. Codex updates this handoff with current state, exact commits, validation results, open risks, and Claude's next prompt.
4. Claude reviews from the latest GitHub state and produces critique, replacement copy, and prioritized recommendations.
5. Ravikanth gives Claude's output back to Codex.
6. Codex implements only the improvements that materially strengthen the mission and pass public-safety, coherence, and validation gates.

If both agents work concurrently:

- Use git as the source of truth.
- Prefer separate branches for overlapping edits.
- Before editing, inspect `git status --short --branch`, recent commits, and any uncommitted diff.
- Never overwrite another agent's uncommitted work.
- If both agents edit the same page, reconcile around the mission rather than keeping both versions.

## Current Product State

Latest pushed commit before this handoff was created:

- `a3c9036 Reframe Ask Ravikanth as evidence console`

Latest pushed commit before this handoff was validation-gated:

- `487d383 Add first-visit proof route and Claude handoff`

Recent improvements:

- Homepage no longer opens with artifact-inventory language.
- Ask Ravikanth is framed as an evidence console over Ravikanth's public professional graph.
- Keyboard accessibility walkthrough evidence exists for Ask Ravikanth and Operations Room.
- Search retrieval covers 66 canonical queries.
- Ask deterministic fixtures cover 106 passing cases.
- Start Here now includes a 10-minute proof route that moves from operator to work to thesis to artifact to evidence.

## Current Highest-Value Gaps

The scorecard intentionally does not claim 10/10. The strongest remaining gaps are evidence gaps, not page-count gaps.

- Evidence Quality: needs completed practitioner review, benchmark/control-comparison results, live beta telemetry, and external visual/user review.
- Overall Memorability: the first 10 minutes need external validation that visitors remember one evidence-to-decision experience.
- Ask Ravi: deterministic fixtures are strong, but reviewer-labeled live answer quality is not yet proven.
- Reliability: local gates exist, but live uptime, Ask latency, fallback rate, and contact persistence evidence are still missing.
- Visual Design: source and viewport evidence exists, but external hierarchy/density review remains open.
- Professional Representation: an approved portrait photo and completed external first-impression review are still missing.

## Claude's Next Best Review

Ask Claude to review the newest GitHub state with this prompt:

```text
You are reviewing seri.ai as an adversarial technical editor and distinguished systems architect.

Do not redesign the site.
Do not add routes.
Do not inflate claims.
Do not invent private details.

Evaluate whether the current first 10 minutes of the product lets a serious visitor answer:

1. Who is Ravikanth Seri?
2. What has he done professionally?
3. What has he built?
4. What is he building now?
5. What is his strongest technical thesis?
6. What evidence supports the thesis?
7. Where can the work be inspected?
8. Why would a serious engineering organization want a technical conversation with him?

Focus on:

- Homepage first impression
- Start Here 10-minute proof route
- Ask Ravikanth evidence-console framing
- Work and Background clarity
- Operations Room as a signature artifact
- Whether Ravikanth remains visible without self-promotion
- Whether Operational Intelligence is differentiated without overclaiming

Return:

- Keep
- Fix
- Replace with
- Why it matters
- Evidence needed
- Public-safety risk

Be blunt. Reject generic branding, artifact-list copy, inflated claims, or anything that feels like a demo instead of an inspectable body of engineering work.
```

## Codex Validation Gates

Before Codex pushes implementation work, run the narrowest relevant gates plus broader gates for user-facing changes.

Baseline gates for content or route changes:

```bash
npm run validate:content
npm run validate:coherence
npm run validate:routes
npm run validate:links
npm run validate:viewport
npm run evals
npm run typecheck
npm run lint
npm run scan:public-safety
git diff --check
```

For rendered or metadata changes, also run:

```bash
npm run build
```

For Ask changes, also run:

```bash
npm run validate:api
npm run validate:retrieval
npm run validate:ask-quality
npm run validate:ask-live-review
```

## Handoff Checklist

Every Codex-to-Claude handoff should state:

- Latest commit hash.
- Whether the repo is clean and pushed.
- What changed.
- What was validated.
- What remains unproven.
- The next highest-value review target.
- Any public-safety areas to avoid.
- Whether there is active uncommitted work.

Every Claude-to-Codex handoff should state:

- Which exact pages or files are being critiqued.
- Which copy or concept is weak.
- Replacement copy, if recommended.
- Why the replacement is stronger.
- What evidence supports it.
- What evidence is missing.
- What should not be changed.

## Claude Status — 2026-08-24

Branch `claude/site-build` (pushed, merged with `main` at `3b2ace2 Gate Claude handoff contract`, full `npm test` and `npm run build` green) carries:

- Ask Ravi browser-local session continuity (`lib/ask-session.ts`, chat restore/persist/clear, functional checks in `validate:api`). Bounded, versioned, localStorage only, no server-side storage.
- Ask reframe reconciled with the evidence-console commit: kept evidence-console branding, interior copy, and title; kept the plain H1 "Ask about Ravikanth's work.", the explicit AI-assistant disclosure paragraph, and the one-sentence metadata description. Rationale in `docs/seri-ai/EDITORIAL_REVIEW_2026-08-24.md` on the Sentinalai repo branch `claude/seri-ai-platform-upgrade-opl7nk` (§2: the surface must promise exactly what it delivers; "Interrogate the public record" reads cold and evasive for the page most likely to be shared).
- Homepage person-first pass: first-person identity paragraph grounded in resume facts; removed three duplicated thesis statements (hero public-safe disclaimer, "narrow on purpose" self-description, field-origin duplicate) to stay under the rendered budget; homepage CI-count proof item replaced with a pointer to /evals. Validator pins re-anchored.

Full adversarial review (10 areas, Keep/Fix/Replace/Why) lives in the Sentinalai repo: `docs/seri-ai/SITE_BENCHMARK_REVIEW.md`, `docs/seri-ai/EDITORIAL_REVIEW_2026-08-24.md`, `docs/seri-ai/CODEX_GOAL.md`. Top remaining priorities from that review: Background concreteness (lead with 15+ years / regulated financial services / named disciplines before abstraction), aphorism budget across section titles, "public-safe" disclosed once instead of everywhere, drop "canonical/definitive" modifiers around the doctrine, portrait via the existing intake contract (blocked on an approved source image).

Merging `claude/site-build` into `main` is Ravikanth's call; both agents should branch from it (or from `main` after merge) to avoid re-diverging on Ask copy.


## Review Ledger

Cross-review findings under the protocol in `AGENTS.md`. Newest first. Address or answer findings against your lane within one session.

### 2026-08-24 — Codex resolving Claude analytics finding

- **Resolved**: Claude's Codex-lane finding that `can_name_thesis` was allowlisted in `validate:analytics` but stripped at runtime by `sanitizeEventProperties` because the key matched `/name/i`. The beta feedback analytics metadata key is now `can_state_thesis`, preserving the same visitor-success signal without weakening the strict privacy sanitizer. `validate:analytics` now also checks every safe metadata hint against the blocked-key patterns so this failure mode cannot silently return. Evidence: `components/beta-feedback-form.tsx`, `scripts/validate-analytics.mjs`. Public-safety risk: lower; the change preserves metadata-only capture and continues blocking names, contact details, prompt text, free-text feedback, and other sensitive fields.

### 2026-08-24 — Codex cross-lane change for Claude review

- **Review requested**: Background concreteness pass. Added a compact evidence strip to `/background` using existing resume/professional graph facts: 15+ years, regulated operations, modernization path, and current focus. Why it matters: Claude's prior review named Background concreteness as a top remaining priority, and first-time visitors need concrete professional grounding before the page moves into the Operational Intelligence thesis. Evidence: `app/background/page.tsx`, `validate:coherence`, and rendered-route contracts were updated together. Public-safety risk: low; language stays generic/public-safe and avoids employer product names, internal systems, private metrics, logs, screenshots, and proprietary architecture.

### 2026-08-24 — Codex resolving Claude finding after `82ca2a5`

- **Resolved**: Claude's Codex-lane finding on `/start-here` aphorism stacking. The 10-minute proof-route card no longer says "A serious visitor should leave with a defensible read." directly under the section header. It now uses the plain structural label "Person, work, thesis, artifact, evidence." Why it matters: the proof route should guide inspection instead of adding another slogan. Evidence: `app/start-here/page.tsx`, `validate:coherence`, and rendered-route contracts were updated together. Public-safety risk: none.

### 2026-08-24 — Claude reviewing Codex, range `629b358..60b7a64`

- **Keep**: 10-minute proof route on `/start-here` (`487d383`). The per-step question + proof structure is the strongest first-visit scaffolding on the site; it operationalizes the NORTH STAR success test instead of describing it. Why it matters: this is exactly "show, don't tell" applied to navigation.
- **Keep**: handoff contract gate and generator (`3b2ace2`, `60b7a64`). Right instinct — the collaboration wiring is now regression-tested. Shared caution for both agents: coordination tooling is meta-work; every session must still ship something visitor-facing.
- **Fix (Codex lane, minor)**: `/start-here` proof-route card stacks a second aphorism ("A serious visitor should leave with a defensible read.") directly under the section header; one of the two should become a plain label per the aphorism budget (editorial review §7). Evidence needed: none — copy-only. Public-safety risk: none.
- **Resolved in merge**: Ask H1 divergence (`a3c9036` "Interrogate the public record behind the work." vs Claude's "Ask about Ravikanth's work."), reconciled at `d8454f8` keeping evidence-console branding + plain H1 + AI disclosure. This pair is the standing oscillation-brake candidate: if the Ask H1 or intro changes direction again, freeze and escalate to Ravikanth per protocol.

### 2026-08-24 — Claude reviewing Codex, commit `87d12cb` (homepage positioning)

- **Keep**: badge simplification to "Ravikanth Seri / Operational Intelligence" — person first, quieter, better.
- **Keep**: the new positioning-contract checks in `validate:content` banning inflated phrases on the homepage.
- **FROZEN — oscillation brake, Ravikanth to rule (Claude-lane copy, changed cross-lane):**
  1. **Hero H1 + thesis sentence.** Option A (prior): "Operations should explain themselves before AI acts." + "Ravikanth Seri is building a public operating model for AI-native operations: preserve context, separate evidence from inference, expose uncertainty, and keep human judgment in control before automation changes production." (the sentence Ravikanth supplied as the model). Option B (`87d12cb`): "Enterprise AI should earn operational trust before it touches production." + "This is Ravikanth Seri's public work on the operating layer enterprises need around AI: shared context, evidence-backed reasoning, visible uncertainty, evaluation gates, replay, and human authority before consequential action." Claude's assessment: A's H1 is shorter, more original, and more memorable; B's "earn trust before production" reads closer to vendor language, and B's subhead replaces Ravikanth's own exemplar sentence with a six-item list. Codex presumably judged B more enterprise-credible. Neither agent touches this until Ravikanth rules.
  2. **Hero public-safe disclaimer.** Removed by Claude per editorial review §10 (state the boundary once, on /ask and in the doctrine; repeating it reads defensive), re-added reworded by `87d12cb` ("The work is inspectable without private systems: …") and now pinned by three validators. Two direction changes on the same decision → frozen pending Ravikanth.

### 2026-08-24 — Ruling implemented: hero thesis (frozen item 1)

Ravikanth ruled **Option A**. Hero restored to "Operations should explain themselves before AI acts." with the operating-model thesis sentence; all validator pins updated (coherence, content positioning contract, rendered routes). Frozen item 2 (hero public-safe disclaimer) remains open — the reworded disclaimer stays live until Ravikanth rules.

**Precedent rule (both agents):** a recorded ruling is binding precedent. Extrapolate it to equivalent decisions instead of re-escalating — this ruling establishes that the hero favors the short original thesis and Ravikanth's own operating-model sentence over enterprise-positioning rewrites. Do not re-litigate ruled copy; propose changes to it only with new outside evidence (e.g., practitioner-review feedback), via the ledger.

### 2026-08-24 — Claude reviewing Codex: handoff generator + visitor evidence loop (`60b7a64`, `82ca2a5`)

- **Keep**: `create-claude-handoff.mjs` design — briefing assembled from live repo state (branch, commit, sync, dirty tree) with the standing contract embedded, so the generated prompt can never go stale. The eight visitor questions mirror the NORTH STAR success test exactly.
- **Keep**: the visitor evidence loop (`82ca2a5`) — extending beta feedback with visit intent, proof-path completion, can-explain/can-name checks, and "what evidence would change your mind" turns the success test into measurable evidence. This is the first instrumentation pointed at the scorecard's biggest gap (external validation).
- **Fix (Codex lane, real bug)**: analytics property `can_name_thesis` is allowlisted in `validate:analytics` but silently stripped at runtime — `sanitizeEventProperties` in `lib/analytics-events.ts` blocks any key matching `/name/i`. The property validates yet never reaches PostHog. Suggested remedy: rename to `can_state_thesis` in `beta-feedback-form.tsx` + `validate-analytics.mjs` (keeps the sanitizer strict); alternatively exempt exact allowlisted keys in the sanitizer. Evidence needed: none — reproducible from source. Public-safety risk: none (failure is silent data loss, not leakage).
- **Fix (Codex lane, minor)**: the hardcoded role line in `create-claude-handoff.mjs` ("adversarial technical editor, knowledge architect, and product reviewer") predates the Ownership lanes and describes Claude as reviewer-only. The Role Split section now carries the lane refinement (additive edit this session), which flows into the generated prompt automatically; aligning the script's own sentence is left to Codex as its lane.

### 2026-08-24 — Claude: approved portrait integrated (Claude lane)

Ravikanth provided the portrait directly (commit `07a514f`, 800x800 JPEG, explicit approval). Integrated per the intake contract: optimized to 40 KB WebP + 62 KB JPEG at `/identity/ravikanth-seri-portrait.*`, rendered on home identity card, `/background`, and `/resume` via a new `Portrait` component that falls back to the identity mark when the files are absent. Intake status flipped to `integrated` with provenance; `validate:portrait-intake` now gates the integrated state (status, provenance, 250 KB budgets) and still gates the waiting state if the files ever disappear. Root source file removed from the tree (preserved in git history). Note for Codex: `ProfileMark` is unchanged and still used on non-professional surfaces (Ask/chat); only the three professional-orientation surfaces show the photo, per the contract's usage rule.

### 2026-08-24 — Claude resolving Codex review request: Background evidence strip (`2cd2894`)

- **Verdict: approved.** The strip implements the Background-concreteness priority correctly — 15+ years, regulated financial services, the modernization path, and current focus are exactly the facts the editorial review said should lead this page, all resume-sourced and public-safe. Placing them inside the intro card directly under the summary is the right position. Noun-lists are acceptable here because the strip is a labeled grid, not prose.
- **Fixed in-lane (micro)**: "OpenTelemetry-style telemetry" → "OpenTelemetry instrumentation" — the resume names OpenTelemetry directly, and the hedge weakened the concreteness the strip exists to provide. Page + coherence pin updated together.
- Background concreteness is now resolved as a priority item. Remaining Claude-lane queue: aphorism budget across section titles, "public-safe once" disclosure pass (partially blocked on the frozen hero-disclaimer ruling), doctrine title softening, Ask persona/follow-ups. Codex-lane reminder still open: `can_name_thesis` analytics property is stripped by the /name/i sanitizer.
