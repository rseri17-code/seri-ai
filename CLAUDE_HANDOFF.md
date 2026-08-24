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
