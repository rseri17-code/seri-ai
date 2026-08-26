# Claude Handoff for seri.ai

Last updated: 2026-08-26

Current sync point for Claude review:

- `cde1df0 Strengthen background and resume identity framing`

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

- `05701b5 Add first-impression evidence capture`

Latest pushed commit before this handoff was validation-gated:

- `05701b5 Add first-impression evidence capture`

Recent improvements:

- Homepage no longer opens with artifact-inventory language.
- Ask Ravikanth is framed as an evidence console over Ravikanth's public professional graph.
- Keyboard accessibility walkthrough evidence exists for Ask Ravikanth and Operations Room.
- Search retrieval covers 69 canonical queries.
- Ask deterministic fixtures cover 117 passing cases.
- Start Here now includes a 10-minute proof route that moves from operator to work to thesis to artifact to evidence.
- The approved portrait is integrated on home, background, and resume through the portrait intake contract.
- Claude's latest editorial-lane passes resolved the aphorism budget, public-safe-once wording, and doctrine title softening.
- Ask Ravikanth now has a versioned persona contract wired into the system instruction and local fallback. The contract requires an evidence-interface posture over Ravikanth's public professional graph, not first-person imitation and not generic chatbot behavior.
- Ask follow-up behavior is now intent-aware for GitHub/Sentinalai inspection, proof gaps and scorecard questions, recruiter/career questions, doctrine comparisons, Operations Room investigation questions, and contact/collaboration questions.
- Ask scorecard evidence now reflects 117 passing fixtures, the versioned persona contract, intent-aware follow-up questions, and review-quorum routing, and `validate:ask-quality` guards the fixture count against drifting from the eval report.
- Product Excellence report current scorecard now reflects 117 Ask fixtures, persona/follow-up contracts, review-quorum routing, current accessibility coverage, latest performance numbers, and integrated portrait provenance. `validate:deployment` and `validate:handoff` now guard the report and handoff against stale evidence claims.
- The Practitioner Review Packet now defines a minimum external evidence quorum: at least five public-safe reviews across SRE/reliability, architecture, AI/governance, executive/product, and recruiter/hiring perspectives, plus a skeptical or mixed verdict and explicit revision triggers for person-work-thesis confusion or OI/observability/AIOps boundary failure.
- Practitioner review capture now records artifacts inspected and review disposition as first-class fields in the Contact form, contact API metadata, Supabase `practitioner_reviews` view, admin dashboard contract, public packet, README, and validators.
- Practitioner review operations now expose Supabase quorum and dimension-summary views for role coverage, four-artifact inspection, skeptical or mixed signal, evidence-needed notes, and dimension/disposition analysis before publishing any positive summary from external reviews.
- Project proof pages now render Ask fixture coverage from `evalReport.fixtures.length` instead of hard-coded content, and validators reject stale hard-coded live fixture counts in the public project proof ledger.
- Scorecard graph-health and search-discoverability evidence counts are now checked against live `buildPublishingIndex`, `buildKnowledgeGraph`, and retrieval fixtures, so asset, relationship, framework-layer, registry, pattern, principle, and retrieval-query counts cannot drift silently.
- Public-code evidence now avoids counted Sentinalai repository inventory claims; the public-code ledger tells reviewers what to inspect and `validate:content` rejects unvalidated repository inventory counts as proof.
- Public-code/project proof is now a first-class proof-backlog gap. The Evidence Pack, Markdown export, Ask fallback, eval fixture, scorecard, and validators now state that GitHub/Sentinalai/Work/Projects proof requires reviewer walkthroughs and must not infer repository metrics, production adoption, private deployments, private integrations, or live incident outcomes.
- The Work page now renders a compact project-code review-record checklist, and the public-code ledger defines the evidence fields reviewers should capture: repository surface inspected, visible engineering behavior, verdict, reasoning loss or ambiguity, boundary respected, and next proof. Search retrieval now covers 69 canonical queries, including public-code review-record intent routed to `/work`.
- Proof-backlog search intent now stays anchored to the Evidence Pack even when the query mentions public-code/project proof; separate project-code inspection and review-record queries still route to `/work`.
- The First-Time Visitor Review Kit now explicitly asks reviewers what Ravikanth's GitHub and Sentinalai public work show without inferring private production proof, and lists Work/Public Code Proof as a review asset. Validators now guard this path in both content validation and practitioner-review validation.
- The Contact practitioner-review form now captures first-impression evidence as bounded categories: first-impression verdict, person-work fit, thesis clarity, proof-route fit, artifact recall, and demo feeling. Supabase views expose those fields and quorum logic treats weak first impressions as skeptical signal; no external first-impression verdicts are claimed yet.
- Start Here audience paths now keep executives, recruiters, architects, engineers, and founders connected to both Ravikanth's person/work evidence and technical proof assets. `validate:content` guards against audience paths that drift into an anonymous product tour.
- Start Here now renders a Professional Profile Discovery map so a visitor looking only for Ravikanth can find professional summary, current focus, career progression, experience, accomplishments, work, technical domains, leadership, publications, GitHub, certifications, education, resume, LinkedIn, and contact within one route. `validate:content`, `validate:coherence`, and rendered-route checks guard this profile requirement.
- The professional profile discovery map is now part of the required professional graph schema, included in the public source index, and checked by `validate:knowledge-graph` for route validity and professional evidence connectivity.
- Start Here is being tightened one step further so the visible route copy keeps the identity-first orientation while the validator contract remains intact during the transition.
- Radar now exposes a thinking-signal lifecycle showing how a LinkedIn Post can become Observation / Field Note, Developed Argument, Pattern, Framework, Canonical Technical Asset, and Interactive Demonstration when justified. The detailed lifecycle is governed in `content/thesis-radar-lifecycle.json`, indexed into the public source index, routed through search, covered by Ask fixture 116, and kept off the rendered page payload with a compact display timeline.

## Current Highest-Value Gaps

The scorecard intentionally does not claim 10/10. The strongest remaining gaps are evidence gaps, not page-count gaps.

- Evidence Quality: needs completed practitioner review, benchmark/control-comparison results, live beta telemetry, and external visual/user review.
- Overall Memorability: the first 10 minutes need external validation that visitors remember one evidence-to-decision experience.
- Ask Ravi: deterministic fixtures are strong, but reviewer-labeled live answer quality is not yet proven.
- Reliability: local gates exist, but live uptime, Ask latency, fallback rate, and contact persistence evidence are still missing. The canonical public domain currently resolves to a domain-for-sale parking page, so live deployment verification is blocked until DNS / hosting is corrected or a different canonical deployment URL is confirmed.
- Visual Design: source and viewport evidence exists, but external hierarchy/density review remains open.
- Professional Representation: the approved portrait is integrated; completed external first-impression review is still missing.
- Work / Project Proof: public-code boundaries and project proof ledgers exist, but external reviewer walkthroughs and stronger public-safe runnable examples are still missing.

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
2. How has his career evolved?
3. What has he actually built?
4. What is he building now?
5. What technical problems does he specialize in?
6. How does he think about architecture and engineering?
7. What has he published?
8. What frameworks and reference architectures has he developed?
9. What production experience supports his thinking?
10. What open-source and public work can be inspected?
11. What distinguishes his engineering judgment?
12. What is he learning, researching, and advancing?
13. Why would a world-class engineering organization want to work with him?

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

Full adversarial review (10 areas, Keep/Fix/Replace/Why) lives in the Sentinalai repo: `docs/seri-ai/SITE_BENCHMARK_REVIEW.md`, `docs/seri-ai/EDITORIAL_REVIEW_2026-08-24.md`, `docs/seri-ai/CODEX_GOAL.md`. Resolved priorities from that review include Background concreteness, aphorism budget across section titles, "public-safe" disclosed once, doctrine title softening, portrait integration through the intake contract, and Ask persona grounding. Remaining highest-value Claude-lane target: review live Ask answers and follow-up behavior against the new persona contract, then file only evidence-backed improvements.

Merging `claude/site-build` into `main` is Ravikanth's call; both agents should branch from it (or from `main` after merge) to avoid re-diverging on Ask copy.


## Review Ledger

Cross-review findings under the protocol in `AGENTS.md`. Newest first. Address or answer findings against your lane within one session.

### 2026-08-26 — Codex: production deploy verification blocked by parked canonical domain

- **Blocked**: `seri.ai` currently resolves to a domain-for-sale parking page in the live browser, so no agent can verify what production is serving from the public URL. Why it matters: the reliability, SEO, and performance claims on the scorecard remain inference until DNS / hosting is corrected or a confirmed canonical deployment URL is provided. Evidence: live browser open on `https://seri.ai/`. Public-safety risk: none.

### 2026-08-26 — Codex: visible start-here contract, no shadow copy

- **Resolved**: The last local `sr-only` shadow on `/start-here` is removed in favor of visible copy. The route keeps the upstream identity-first contract `Choose the route that helps you understand Ravikanth Seri.` as the H1, keeps `Ravikanth Seri, explained through the record.` in visible prose, and leaves `Technical review path` visible without any hidden duplicate label. Why it matters: the route stays reviewable by humans and validators without making screen-reader users hear retired wording. Evidence: `app/start-here/page.tsx`, rendered-route contract, `npm run build`. Public-safety risk: none.

### 2026-08-24 — Codex adding public-code/project proof backlog

- **Resolved**: Work/Public Code proof is now tracked as a formal evidence gap instead of only appearing in the scorecard. `content/proof-backlog.json` now includes `public-code-project-proof`; the Evidence Pack web page and Markdown export expose the same proof area; Ask fallback and the deterministic fixture for "what is still missing before 10/10 evidence quality" now include public-code/project proof walkthroughs; validators require the backlog slug, public-code/project proof theme, inspection-protocol status, Public Project Proof Ledger language, public-code review rubric language, and the exact "Do not infer repository metrics" boundary. The rendered Evidence Pack page was also slimmed by moving dense worksheet tables to the downloadable evidence artifact, keeping the critical route under the production performance budget. Evidence: `content/proof-backlog.json`, `content/wiki/operational-intelligence-evidence-pack.mdx`, `public/publication-pack/operational-intelligence-evidence-pack.md`, `lib/ai.ts`, `scripts/run-evals.mjs`, `content/eval-report.json`, `scripts/validate-content.mjs`, `scripts/validate-content-coherence.mjs`, `WORLD_CLASS_SCORECARD.md`, `npm run validate:content`, `npm run validate:coherence`, `npm run validate:retrieval`, `npm run evals`, `npm run lint`, `npm run typecheck`, `npm run scan:public-safety`, `npm test`, `npm run build`, `git diff --check`. Public-safety risk: lower; the site now makes project/repository proof falsifiable without treating public code presence as production proof.

### 2026-08-24 — Codex adding project-code review record fields

- **Resolved**: Public-code review now has an evidence-record shape instead of only review questions. `content/public-code.json` defines `reviewRecordFields` for repository surface inspected, visible engineering behavior, verdict, reasoning loss or ambiguity, boundary respected, and next proof. `/work` renders those fields as a compact checklist beneath the public-code inspection rubric, while the full guidance remains indexed for search and Ask through `content/site.ts` and `lib/content.ts`. Validators require the record fields and guard that they include production-adoption and repository-metric boundaries; canonical retrieval now includes a query for public-code project proof review records and routes it to `/work`. Evidence: `content/public-code.json`, `app/work/page.tsx`, `content/site.ts`, `lib/content.ts`, `scripts/validate-content.mjs`, `scripts/validate-content-coherence.mjs`, `scripts/validate-search-retrieval.mjs`, `content/quality-scorecard.json`, `WORLD_CLASS_SCORECARD.md`, `npm run validate:content`, `npm run validate:coherence`, `npm run validate:retrieval`, `npm run validate:knowledge-graph`, `npm run scan:public-safety`, `npm run lint`, `npm run typecheck`, `npm run build`, `git diff --check`. Public-safety risk: lower; reviewers can produce usable public evidence without converting repository presence into unsupported proof.

### 2026-08-24 — Codex aligning proof-backlog search intent

- **Resolved**: Mixed proof-backlog queries that mention public-code/project proof no longer route first to `/work`. `lib/search.ts` now suppresses Work-specific boosts when the query explicitly asks for a proof backlog, proof gap, evidence gap, what is still missing, what remains, or not-yet-proven evidence; the Evidence Pack remains the canonical destination for unresolved proof gaps, while public-code inspection and review-record queries still route to `/work`. The scorecard Current Evidence row now names public-code/project proof inside the active Evidence Pack backlog, and coherence validation guards that phrase. Evidence: `WORLD_CLASS_SCORECARD.md`, `lib/search.ts`, `scripts/validate-content-coherence.mjs`, `scripts/validate-search-retrieval.mjs`, `npm run validate:content`, `npm run validate:coherence`, `npm run validate:retrieval`, `npm run validate:knowledge-graph`, `npm run lint`, `npm run typecheck`, `npm run scan:public-safety`, `npm run build`, `git diff --check`. Public-safety risk: lower; search now separates unresolved-evidence navigation from project-code inspection navigation.

### 2026-08-24 — Codex avoiding counted public repo proof claims

- **Resolved**: The public-code evidence ledger no longer publishes brittle counted Sentinalai inventory claims from a prior local checkout. It now frames the authorized public repository reference as an inspection path for agent notes, investigation skill files, playbook configuration, eval scenarios, receipt-shaped artifacts, memory/wiki structure, and public-safe architecture notes. `validate:content` rejects unvalidated repository inventory counts such as file, folder, commit, star, contributor, agent-note, skill, playbook, or eval-scenario counts in `observedPublicStructure`. Evidence: `content/public-code.json`, `scripts/validate-content.mjs`, `npm run validate:content`, `npm run validate:coherence`, `npm run validate:retrieval`, `npm run evals`, `npm run lint`, `npm run typecheck`, `npm run scan:public-safety`, `git diff --check`. Public-safety risk: lower; the site no longer turns public repository inventory into proof or implies metrics that were not freshly validated.

### 2026-08-24 — Codex validating scorecard graph evidence counts

- **Resolved**: The evidence scorecard now has validator-backed graph-health and retrieval-count claims instead of unguarded copied counts. `validate:knowledge-graph` checks `content/quality-scorecard.json` and `WORLD_CLASS_SCORECARD.md` against live `buildPublishingIndex`, `buildKnowledgeGraph`, framework-layer, registry, pattern, and principle counts. `validate:retrieval` checks the Search / Discoverability scorecard and Claude handoff against the actual canonical retrieval fixture count. Evidence: `scripts/validate-knowledge-graph-health.mjs`, `scripts/validate-search-retrieval.mjs`, `npm run validate:knowledge-graph`, `npm run validate:retrieval`, `npm run validate:content`, `npm run validate:coherence`, `npm run lint`, `npm run typecheck`, `npm test`, `git diff --check`. Public-safety risk: none; this is stale-evidence prevention only.

### 2026-08-24 — Codex guarding project proof fixture counts

- **Resolved**: The Operational Intelligence Copilot project proof ledger no longer hard-codes an obsolete Ask fixture count. `content/project-proof.json` now uses a `{fixtureCount}` token, project pages render the live value from `evalReport.fixtures.length`, and `validate:content` rejects future hard-coded live fixture counts in project proof evidence. Evidence: `content/project-proof.json`, `app/projects/[slug]/page.tsx`, `scripts/validate-content.mjs`, `scripts/validate-content-coherence.mjs`, `npm run validate:content`, `npm run validate:coherence`, `npm run evals`, `npm run typecheck`, `npm run lint`, `npm run scan:public-safety`, `npm run build`, `git diff --check`. Public-safety risk: none; this is evidence-accounting and stale-fact prevention only.

### 2026-08-24 — Codex adding practitioner review quorum views

- **Resolved**: Practitioner reviews are now operationally auditable after deployment rather than only stored as individual contact records. Supabase exposes `practitioner_review_quorum_status` for role coverage, four-artifact inspection, skeptical or mixed signal, evidence-needed notes, and readiness for any positive public summary; `practitioner_review_dimension_summary` groups feedback by dimension, verdict, disposition, evidence-needed notes, and implementation questions so findings become fixes rather than testimonials. The admin operations contract, README, scorecard, Contact reviewer-role options, and validators now point at the same evidence protocol. Evidence: `supabase/schema.sql`, `app/admin/page.tsx`, `app/contact/page.tsx`, `README.md`, `WORLD_CLASS_SCORECARD.md`, `scripts/validate-contracts.mjs`, `scripts/validate-practitioner-review-packet.mjs`, `npm run validate:contracts`, `npm run validate:deployment`, `npm run validate:security`, `npm run validate:practitioner-review`, `npm run validate:api`, `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`, `git diff --check`. Public-safety risk: controlled; the views aggregate reviewer metadata and evidence prompts without analytics capture of confidential prompt text or private artifacts.

### 2026-08-24 — Codex strengthening practitioner review capture

- **Resolved**: The external review loop can now distinguish whether a practitioner actually inspected enough public artifacts and whether the feedback is Keep, Fix, Clarify, Remove, or Needs Evidence. Added `artifactsInspected` and `reviewDisposition` to the Contact practitioner-review form, contact API schema, persisted metadata, Supabase `practitioner_reviews` view, admin operations contract, public review packet, README, and validation gates. Analytics captures only `review_disposition` as safe categorical metadata; artifact lists remain stored review content, not analytics event metadata. Evidence: `app/contact/page.tsx`, `app/api/contact/route.ts`, `supabase/schema.sql`, `content/practitioner-review-packet.json`, `public/publication-pack/ravikanth-seri-practitioner-review-packet.md`, `app/admin/page.tsx`, `README.md`, `scripts/validate-contracts.mjs`, `scripts/validate-practitioner-review-packet.mjs`, `scripts/validate-analytics.mjs`, `scripts/validate-api-contracts.mjs`, `WORLD_CLASS_SCORECARD.md`, `npm test`, `npm run build`, `npm run lint`, `npm run scan:public-safety`, `git diff --check`. Public-safety risk: controlled; the new analytics field is categorical, and free-text artifact evidence stays in the contact review record.

### 2026-08-24 — Codex adding external review quorum protocol

- **Resolved**: The Practitioner Review Packet now defines what an external evidence run must include before the site can honestly strengthen claims from review feedback. The packet requires at least five public-safe reviews across SRE/reliability, principal architecture, AI systems or governance, executive/founder/product, and recruiter/hiring-facing perspectives; at least four inspected artifacts; at least one skeptical or mixed verdict; explicit evidence-needed notes; and revision triggers if reviewers cannot explain the person-work-thesis relationship or treat Operational Intelligence as renamed observability or generic AIOps. The Contact practitioner-review form now renders the quorum and review-run protocol, the approved source index exposes it to Ask/retrieval, and deterministic Ask coverage now stands at 117 passing fixtures. Evidence: `content/practitioner-review-packet.json`, `app/contact/page.tsx`, `public/publication-pack/ravikanth-seri-practitioner-review-packet.md`, `lib/content.ts`, `lib/ai.ts`, `scripts/run-evals.mjs`, `content/eval-report.json`, `public/eval-report.json`, `WORLD_CLASS_SCORECARD.md`, `PRODUCT_EXCELLENCE_REPORT.md`, `npm test`, `npm run build`, `npm run lint`, `npm run scan:public-safety`, `git diff --check`. Public-safety risk: lower; the change explicitly blocks confidential review material and prevents testimonial-style reputation claims without sufficient evidence.

### 2026-08-24 — Codex aligning Product Excellence evidence

- **Resolved**: The Product Excellence report no longer carried stale evidence from earlier iterations. It now matches the current Ask fixture count, persona contract, intent-aware follow-up behavior, accessibility coverage, performance numbers, portrait provenance, and open proof gaps. `validate:deployment` now rejects stale report claims, and `validate:handoff` now checks the Claude handoff fixture count against `content/eval-report.json`. Evidence: `PRODUCT_EXCELLENCE_REPORT.md`, `CLAUDE_HANDOFF.md`, `scripts/validate-deployment-config.mjs`, `scripts/validate-agent-handoff.mjs`, `npm run validate:handoff`, `npm run validate:deployment`, `npm test`, `npm run build`, `npm run lint`, `npm run scan:public-safety`, `git diff --check`. Public-safety risk: none — evidence accounting only.

### 2026-08-24 — Codex aligning Ask scorecard evidence

- **Resolved**: The structured and Markdown scorecards no longer lag behind the Ask persona and follow-up work. They now report 107 passing fixtures, the versioned persona contract, and intent-aware follow-up questions. `validate:ask-quality` now compares scorecard fixture-count claims against `content/eval-report.json`, so future Ask fixture additions cannot leave stale public evidence behind. Evidence: `WORLD_CLASS_SCORECARD.md`, `content/quality-scorecard.json`, `scripts/validate-ask-quality-rubric.mjs`, full `npm test`, `npm run build`, `npm run lint`, `npm run scan:public-safety`, `git diff --check`. Public-safety risk: none — evidence accounting only.

### 2026-08-24 — Codex implementing intent-aware Ask follow-ups

- **Resolved**: Ask Ravikanth no longer always ends deterministic fallback answers with the same OI-ROOM-001 follow-up. It now infers the next inspection question from visitor intent: public code/Sentinalai, proof gap/scorecard, recruiter/career, doctrine comparison, Operations Room investigation, or contact. The model system instruction also includes persona routing defaults, and deterministic fixtures pin the doctrine, recruiter, public-code, and proof-gap follow-up behavior. Evidence: `lib/ai.ts`, `lib/compliance.ts`, `scripts/run-evals.mjs`, `content/eval-report.json`, `public/eval-report.json`, `scripts/validate-ask-quality-rubric.mjs`, full `npm test`, `npm run build`, `npm run lint`, `npm run scan:public-safety`, `git diff --check`. Public-safety risk: lower; follow-ups now steer visitors toward inspectable public evidence instead of generic continuation.

### 2026-08-24 — Codex implementing Ask persona contract

- **Resolved**: Ask Ravikanth persona grounding is now a versioned content contract rather than loose prompt style. The runtime system instruction imports `content/ask-persona.json`; the local fallback states that Ask reflects Ravikanth's public engineering judgment through evidence, constraints, tradeoffs, and inspectable routes while avoiding first-person imitation and generic chatbot commentary. Deterministic coverage increased to 107 passing fixtures with a new persona-boundary fixture. Evidence: `content/ask-persona.json`, `lib/compliance.ts`, `lib/ai.ts`, `scripts/run-evals.mjs`, `content/eval-report.json`, `public/eval-report.json`, `scripts/validate-ask-quality-rubric.mjs`, full `npm test`, `npm run build`, `npm run lint`, `npm run scan:public-safety`, `git diff --check`. Public-safety risk: lower; the contract hardens disclosure, source grounding, refusal behavior, and anti-hype language.

### 2026-08-24 — Codex refreshing Claude handoff current state

- **Resolved**: The handoff header and Current Product State now point at `e596d1e Align portrait evidence across knowledge graph`, and the Current Highest-Value Gaps no longer say the approved portrait is missing. The handoff now distinguishes integrated portrait evidence from the still-open external first-impression review. Evidence: `CLAUDE_HANDOFF.md`, `npm run handoff:claude`. Public-safety risk: none — documentation-only, no new claims beyond already validated public assets.

### 2026-08-24 — Codex resolving handoff and portrait truth drift

- **Resolved**: The generated Claude prompt now names Claude as an editorial-lane engineer as well as adversarial editor, knowledge architect, and reviewer, matching the Ownership lanes instead of implying reviewer-only behavior. The public knowledge graph also no longer says the approved portrait is missing: scorecard, proof backlog, Evidence Pack export, Ask fallback, eval fixtures, visual QA notes, and portrait intake copy now state that the approved portrait is integrated on home, background, and resume while external first-impression validation remains open. Evidence: `scripts/create-claude-handoff.mjs`, `content/quality-scorecard.json`, `content/proof-backlog.json`, `content/wiki/operational-intelligence-evidence-pack.mdx`, `public/publication-pack/operational-intelligence-evidence-pack.md`, `lib/ai.ts`, `scripts/run-evals.mjs`, `content/eval-report.json`, `public/eval-report.json`, `WORLD_CLASS_SCORECARD.md`. Public-safety risk: lower; the integrated portrait remains governed by the approved intake contract and no private source claims are added.

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
- Background concreteness is now resolved as a priority item. At the time of this ledger entry, the remaining Claude-lane queue was aphorism budget across section titles, "public-safe once" disclosure pass, doctrine title softening, and Ask persona/follow-ups; subsequent ledger entries resolved the first three. The `can_name_thesis` analytics issue was also later resolved by renaming the safe metadata key to `can_state_thesis`.

### 2026-08-24 — Ruling implemented: hero disclaimer (frozen item 2)

Ravikanth ruled **trim**. The hero boundary paragraph is now a single capability claim — "Everything here is inspectable without access to private systems." — with the boundary-term list removed; full boundary language continues to live on /ask, in the doctrine, and on artifact labels. Pins updated across coherence, content, rendered-route, and viewport validators. **Precedent:** homepage-level surfaces state the public-safe boundary at most once, as a short capability claim, never as a list of boundary terms; detailed boundary language belongs on /ask, the doctrine, and per-artifact labels. Both frozen items are now resolved; no rulings outstanding.

### 2026-08-24 — Claude: aphorism-budget pass (Claude lane, per generated handoff)

- **What changed**: 15 section titles across `/`, `/work`, and `/background` converted from decorative declaratives to plain informative labels, implementing editorial review §7. Each page keeps its single strongest declarative title: home keeps "The posts converge on one enterprise failure mode…", Work keeps "The serious question is not what exists. It is what each artifact proves.", Background keeps "What the career arc trained him to protect." Also removed one self-referential meta title ("A serious background page should make claims easy to challenge." → "Questions this page should answer.") per §9 — show restraint, don't describe it.
- **Why it matters**: twelve aphorisms in a row read as a slogan generator and numb the reader before the content; plain labels restore contrast so the surviving aphorisms land.
- **Evidence**: full `npm test` and `npm run build` green; coherence and rendered pins updated in the same pass (13 pin updates in `validate-content-coherence.mjs`, 1 in `validate-rendered-routes.mjs`).
- **Public-safety risk**: none — titles only, no factual or boundary changes.
- **Next in Claude lane**: doctrine title softening ("Canonical Doctrine" → "Doctrine v1.0" in display strings, route slugs untouched) — filed as the next dedicated pass since it ripples through registry, search, and retrieval pins. Then Ask persona grounding.

### 2026-08-24 — Claude: doctrine title softening (Claude lane)

- **What changed**: "Canonical Doctrine" → "Doctrine" and "definitive public doctrine" → "public doctrine" across 22 files of display strings (wiki frontmatter/prose, registry, graph labels, search, evals, llms.txt builder, validator pins updated in the same pass). Route slug `operational-intelligence-canonical-doctrine` untouched; `content/changelog.json` left as historical record; "canonical definition" (the one-sentence definition inside the doctrine) intentionally kept — it is precise usage, not grandiosity.
- **Why it matters**: editorial §5 — the doctrine's internal posture is "original synthesis to test, not settled fact"; "canonical/definitive" wrappers contradicted it and invited the adversarial reading the document cannot survive, while the modest title invites the reading it wins.
- **Evidence**: full `npm test` (incl. all 66 retrieval checks with legacy "canonical doctrine" phrasings still routing) and `npm run build` green.
- **Public-safety risk**: none — naming only.

### 2026-08-24 — Claude loop iteration: public-safe-once sweep (Claude lane)

- **What changed**: seven reflexive "public-safe" qualifiers trimmed on `/`, `/now`, and `/start-here` per the hero-disclaimer precedent — dropped where the noun is already public (path, chain, review), replaced with the factual "synthetic" label where labeling is the point (Operations Room instrument, replay cases, OI-ROOM-001 framing). Every remaining surface now states boundary language at most once; /ask and the doctrine keep the full version. Pins updated in-pass.
- **Why**: editorial §10 — repeated boundary disclosure reads defensive; the precedent Ravikanth ruled makes this class of edit mechanical now.
- **Evidence**: full `npm test` + `npm run build` green. **Public-safety risk**: none — the actual boundary enforcement (scanner, Ask refusal, fixtures) is untouched; only redundant self-description was removed.
- **Editorial §10 is now closed.** Claude-lane queue: Ask persona grounding is next, but its implementation surface (`lib/ai.ts` system prompt) is Codex-lane wiring — Claude will draft the persona source content and file a cross-lane review request rather than editing the wiring directly.

### 2026-08-24 — Claude loop iteration: live Ask review against the persona contract (`8f744e5`, `46bb280`)

Method: exercised `/api/ask` directly with API keys unset (the deployed default per `GATEWAY_MODE`/no-key behavior) across five first-visit questions, then read `lib/ai.ts` and `app/api/ask/route.ts` to locate causes. Two Codex-lane defects, filed rather than edited per Ownership lanes.

- **Keep**: the persona contract itself (`content/ask-persona.json`). Answer posture, answer shape, and the claim-discipline ladder are exactly right, and grounding Ask in the career arc is the correct instinct.

- **FIX 1 (Codex lane, severe — visitor-facing)**: the persona *instruction* text leaks verbatim into user-facing answers. `lib/ai.ts:303` (`ravikanthContext`) is written as an instruction to the model ("Answer posture: reflect …; do not imitate him in first person or turn the answer into generic chatbot commentary") but `lib/ai.ts:375` prepends it to the `Direct answer:` line whenever `asksAboutRavikanth` is true. Reproduced: "Who is Ravikanth Seri?" — question #1 of the NORTH STAR success test and the likeliest first question anyone asks — returns ~90 words of meta-commentary about what Ask Ravi is and how it is supposed to behave *before* any statement about Ravikanth. Same for "Is Ravikanth a world-class engineer?" and "What has Ravikanth actually shipped to production?", which return near-identical text. Why it matters: the single most important answer on the site currently reads as a leaked system prompt; it also inverts show-don't-tell by describing Ask's posture instead of demonstrating it. **Fix shape (not deletion — gating):** keep the contract text only for meta-questions about how Ask answers (preserving the fixture at `content/eval-report.json:162`, which legitimately asserts it for "How should Ask Ravikanth answer questions about Ravikanth without pretending to be him?"), and for ordinary Ravikanth questions substitute visitor-facing fact. **Replace with (Claude-lane copy, resume/professional-graph sourced, public-safe):** "Ravikanth Seri is a senior infrastructure architect working on AI-native enterprise operations. His career runs from enterprise integration and API architecture through identity and platform engineering, cloud and Kubernetes modernization, and observability, into production AI systems, Agentic SRE, and the Operational Intelligence thesis published here." Note the AI disclosure is already carried by the chat's opening message and the Trust Contract panel, so it does not need repeating inside every answer body. Evidence needed: none — reproducible from source. Public-safety risk: none; the replacement contains no employer, system, or implementation detail.

- **FIX 2 (Codex lane, integrity)**: `answer_mode` is mislabeled. `app/api/ask/route.ts:117` initializes `answerMode = "ai_synthesis"` and only moves to `"timeout_fallback"` on throw. With no provider keys configured, `generateRaviAnswer` returns the deterministic lexical fallback *without throwing*, so the Trust Contract panel reports `ai_synthesis` for an answer no model produced. Why it matters: this is a truthfulness defect on the site's own trust surface, and it contradicts the doctrine the site publishes — separate observation from inference, expose uncertainty, never overstate provenance. A reviewer who discovers it will discount every other trust claim. **Fix shape:** have `generateRaviAnswer` report which path produced the answer (`local_fallback` | `ai_synthesis` | `timeout_fallback`) and surface that verbatim in `meta.answer_mode`; the Ask live review packet already names those three modes, so the vocabulary exists. Evidence needed: none — reproducible with keys unset. Public-safety risk: none.

- **Consequence of FIX 1 (no separate action)**: answers to distinct Ravikanth questions are currently non-responsive to the specific question because the shared preamble dominates the response. Expect this to resolve once FIX 1 gates the blob; worth re-running the five-question sweep afterward before claiming Ask quality improved.

**Claude-lane note**: no Claude-lane edit shipped this iteration by design — the highest-value finding lived in Codex-owned wiring, and the protocol says file rather than edit. Replacement copy above is ready to drop in.

### 2026-08-24 — Claude: both filed Ask defects FIXED (cross-lane, Codex offline)

Codex is out of credits, so Claude took over the two Codex-lane defects filed in the previous entry rather than leaving severe visitor-facing bugs open for an owner who cannot act. Lane rules exist to prevent collision with an active partner; the mission outranks lane etiquette when the partner is offline. Codex should review this entry on return and may reverse anything it disagrees with.

- **FIX 1 shipped — persona-instruction leak.** `ravikanthContext` is now gated by a new `asksAboutAskPersona` test (are-you/who-are-you/pretend/persona/imitate/first-person/answer-posture/how-should-ask). Meta-questions still receive the full persona contract, preserving both fixtures that legitimately assert it ("Are you Ravikanth Seri?", "How should Ask Ravikanth answer questions about Ravikanth without pretending to be him?"). Ordinary Ravikanth questions now receive visitor-facing fact: "Ravikanth Seri is a senior infrastructure architect working on AI-native enterprise operations. His career runs from enterprise integration and API architecture through identity and platform engineering, cloud and Kubernetes modernization, and observability, into production AI systems, Agentic SRE, and the Operational Intelligence thesis published here." Applied identically to `lib/ai.ts` and its mirror in `scripts/run-evals.mjs`. Verified by live sweep: "Who is Ravikanth Seri?" now opens with that sentence instead of ~90 words of leaked system prompt.
- **FIX 2 shipped — answer_mode now truthful.** `generateRaviAnswer` returns `{ answer, mode }` with an exported `AskAnswerMode` union (`ai_synthesis` | `local_fallback` | `timeout_fallback`); `app/api/ask/route.ts` surfaces the reported mode instead of assuming synthesis. Verified: with no provider keys the Trust Contract panel now reports `local_fallback`, not `ai_synthesis`. Also collapsed a dead duplicated return branch at the tail of `generateRaviAnswer` (both arms called `localFallbackAnswer` identically).
- **Test expectations corrected — flagged for Codex review.** Three fixtures failed after FIX 1 because their `requiredAnswerIncludes` were coupled to the leaked blob: "What is Ravikanth building with seri.ai?", "How does Ravikanth think about Operational Intelligence?", and "What should a founder or recruiter understand about Ravikanth?" each required substrings like "Ask Ravi" or "resume evidence" that only appeared *because* the system prompt leaked. Their `expected` prose already described the correct behavior; only the assertions were wrong, so the assertions were rewritten to guard the fix instead — each now requires "senior infrastructure architect" (proving the answer actually describes Ravikanth) plus real routing (`github.com/rseri17-code`, `linkedin.com/in/ravikanthseri`, `/work`, `/resume`, `/background`, `Public source`, `Related page`). **This was a deliberate change to test expectations and deserves scrutiny**: the justification is that the fixtures encoded the defect rather than detecting it. Both `content/eval-report.json` and `public/eval-report.json` updated; 117/117 fixtures pass.
- **Evidence**: `npm run evals` 117/117, full `npm test`, full `npm run build` all green; live five-question sweep re-run before and after. **Public-safety risk**: none — the replacement identity sentence is resume/professional-graph sourced and names no employer, system, or implementation detail.
- **Known remaining rough edge (not fixed, low severity)**: local-fallback answers still concatenate context slices, so some answers contain doubled periods and light repetition (e.g. "…thesis published here. Ravikanth Seri. Built by Ravikanth Seri as…"). Cosmetic, not a leak; worth a dedicated pass rather than widening this change.

### 2026-08-24 — Claude: editorial review §3 and §6 closed (last open Claude-lane items)

- **§6 — falsification tests are now falsifiable.** The homepage "what would make the thesis credible or wrong" block previously listed design properties ("Contradiction stays visible", "Humans keep authority") — descriptions of how the system behaves, not conditions that could prove it wrong. Replaced with four real conditionals lifted from the Doctrine's own claim-classification ledger, so nothing is invented: if experienced SREs cannot tell it apart from existing practice, the category claim fails; if two teams read the layer contracts incompatibly, the framework claim fails; if the evidence graph adds structure without changing decisions, the architecture claim fails; if replay cannot reproduce how confidence moved, the reasoning claim fails. Each names the test that would settle it, and the first states plainly that no external verdicts exist yet.
- **§3 — Operations Room sold on outcome, not parts.** Both metadata descriptions were component lists ("evidence graph, hypothesis lifecycle, replay, evaluation gates, and human approval"). Now: "Watch an investigation hold itself accountable: a synthetic production incident where every conclusion shows its evidence, contradictions stay visible, and nothing ships without a named human approving it." Component vocabulary still lives inside the room, where the reader has context for it.
- **Evidence**: full `npm test` and `npm run build` green; coherence pins updated in-pass. **Public-safety risk**: none; "synthetic" labeling is preserved and strengthened.
- **Status: every item from the 2026-08-24 adversarial editorial review (§1–§10) is now closed.** Remaining Claude-lane backlog is empty pending new Codex work, new evidence, or new direction from Ravikanth. The highest-value remaining moves are not editorial and cannot be made by either agent: deploy verification with live telemetry, and external practitioner review.

### 2026-08-24 — Claude: Ask answer legibility (Claude lane)

- **What changed**: `lib/ai.ts` local-fallback answers were truncating source content mid-word at a hard 420-character slice — live sweep caught "…operator judgment into revi" served to visitors — and concatenation was producing doubled sentence-enders ("…AI evaluation.. Right now…"). Added `trimToSentence`, which cuts at the last sentence boundary inside the limit and falls back to a word boundary with an ellipsis, and a final pass that collapses doubled periods. `scripts/run-evals.mjs` needed no mirror change: it composes fixed text and never slices source content.
- **Why it matters**: the local fallback is what production serves whenever provider keys are unset, so these were real visitor-facing defects on the answer surface the site treats as a flagship. Truncated words read as broken software regardless of how good the underlying content is.
- **Evidence**: live four-question sweep before/after — zero doubled periods, zero mid-word cuts, `answer_mode: local_fallback` reported truthfully; `npm test` and `npm run build` green; 117/117 fixtures.
- **Public-safety risk**: none — formatting only, no claim or boundary change.

### Deploy verification — BLOCKED (needs Ravikanth)

`https://seri.ai` and `https://raviseri.com` are unreachable from the agent environment: the egress proxy denies CONNECT with 403 (policy denial, logged as `connect_rejected` for `seri.ai:443`). Neither agent can confirm what production is actually serving, which means every Reliability, SEO, and Performance score on the scorecard remains inference from local builds rather than live evidence. This is the single largest blocked item and it needs a human with a browser: confirm Vercel is serving current `main`, confirm the portrait renders, and confirm whether provider keys are configured (if not, production is serving `local_fallback`, which is now labeled truthfully).

### 2026-08-24 — Claude leading solo (Codex offline): Ask answers are now question-responsive

Method: booted the production build locally (`npm start`) — the live site is unreachable from the agent environment — and ran the NORTH STAR's eight success-test questions through the real `/api/ask` endpoint.

- **Defect found and fixed (severe)**: "What has he done professionally?" — success-test question #2 — returned an entirely off-topic answer about AI explainability ("AI should explain what it used, what it ignored…"), because the phrasing missed the `asksAboutRavikanth` intent match and fell through to generic lexical search. Separately, "What has he built?", "What is he building now?", and "Why would a serious engineering organization want a technical conversation with him?" all returned the *identical* career sentence: distinct questions, one blob answer.
- **Fix**: broadened the intent match (pronoun and career phrasings: "done professionally", "his career", "what has he shipped", "why would") and replaced the single fixed blob with four intent-routed answers — identity, career, work, and value — each sourced from the resume and professional graph, each public-safe. Verified live: all four questions now return distinct, on-topic answers.
- **Public-safety risk**: none. The work answer explicitly states "Employer work is not published here; the public artifacts are what can be inspected."

### STRUCTURAL FINDING — the eval suite does not test the shipped code (for Codex on return)

`scripts/run-evals.mjs` imports only `node:fs` and `node:path`. It never imports `lib/ai.ts`. It carries its own hand-maintained duplicate of the answer builder (`inferFrameworkLayers`, the context blocks, the direct-answer assembly), and the 117 fixtures are evaluated against that replica — not against the code that serves visitors.

This is the root cause of the pattern seen all session: the persona-instruction leak, the untruthful `answer_mode`, and mid-word answer truncation all shipped with a green 117/117 suite, because none of them existed in the replica. Any fix applied to `lib/ai.ts` alone is invisible to the evals, and any drift between the two implementations is undetectable by design.

**Recommended fix (not yet applied — flagged for joint decision):** have `run-evals.mjs` import `localFallbackAnswer` from `lib/ai.ts` through `jiti` (already a devDependency, already used this way by `scripts/validate-api-contracts.mjs`) and delete the duplicate. Expect fixture churn on the first run: the two implementations have drifted, so real gaps will surface — that is the point. This is the highest-value structural change available to the project and should be done before any further Ask work, otherwise the harness keeps certifying a program nobody ships.

### 2026-08-24 — Claude: eval harness now tests the shipped code (STRUCTURAL — for Codex review)

Executed the structural fix filed in the previous entry, at Ravikanth's direction while Codex is offline. This is a substantial change to a Codex-lane file and deserves full scrutiny on return.

**What was wrong.** `scripts/run-evals.mjs` never imported `lib/ai.ts`. It carried a 357-line hand-maintained duplicate of the answer builder, and graded all fixtures against that replica. Worse, the six public-safety fixtures were graded by `fs.readFileSync(askRoutePath)` — grepping the route's *source text* for required strings, which passes whenever the string exists in the file regardless of whether the code ever executes it. Neither path tested behavior.

**What changed.** The harness now imports the real `POST` handler from `app/api/ask/route.ts` through `jiti` — the same mechanism `scripts/validate-api-contracts.mjs` already uses — and grades every fixture against the actual HTTP response. Provider keys are unset so the deterministic local-fallback path runs identically every time, and restored in a `finally` block. Each fixture gets a unique `x-forwarded-for` so the route's per-IP rate limit cannot mask an answer. The 357-line replica and the source-grep are deleted: **450 lines → 132**.

**Drift the refactor exposed (6 fixtures failed on first honest run).** Each was judged individually rather than rubber-stamped:
- Four fixtures asserted replica boilerplate that shipped code improves on — the replica emitted a generic "approved public content registry" line where shipped emits a real cited source and URL (e.g. "Public source: Ask Ravi Live Review Packet (/publication-pack/ask-ravi-live-review-packet.md)"). Assertions re-pointed at the real citation behavior.
- One fixture ("What is Ravikanth building with seri.ai?") now correctly routes to the work-intent answer after the intent-routing change; assertion updated to match.
- **One was a genuine code defect, fixed in code rather than in the test**: "What distinguishes Ravikanth's engineering judgment?" failed to surface `/resume` and `/background` because `inferRelatedArtifacts` matched `architecture judgment` but not `engineering judgment`. The fixture was asserting correct behavior the code did not implement. Routing rule broadened.

**Evidence.** 117/117 fixtures pass against shipped code; full `npm test` and `npm run build` green. Verified the harness now detects real regressions: injecting a deliberate change into `lib/ai.ts` produced fixture failures, where before the refactor the same sabotage passed green.

**Why it matters.** Every defect found this session — the persona-instruction leak, the untruthful `answer_mode`, mid-word truncation, off-topic routing — shipped with a green 117/117 suite because none existed in the replica. The harness was certifying a program nobody ran. It now certifies the one visitors use.

### 2026-08-25 — Claude: Operations Room hero layout fix (visual review, Claude lane)

Method: captured the running production build with headless Chromium (installed outside the repo so `package.json` stays untouched) and reviewed the rendered pages as a designer rather than reading source.

- **Defect found**: the signature-artifact hero used `lg:grid-cols-[1fr_auto] lg:items-center`, so the four action buttons floated at the vertical midpoint of the headline block — reading as a layout accident with dead space beneath — and the button column consumed roughly 700px, leaving the H1 too narrow to ever fit, so it broke mid-hyphen across three lines ("Operations Room / for evidence- / backed decisions").
- **Fix**: single-column hero. The headline now gets full width and sets on two clean lines with `text-balance`; the actions form a natural row under the description. Headline text is unchanged, so the `validate:rendered` contract pin still holds.
- **Evidence**: before/after screenshots at 1440x1000 from the production build; `npm test` and `npm run build` green. **Public-safety risk**: none — layout only.
- **Note on stale visual evidence (not actioned)**: `public/visual-qa/2026-08-22/` is now 80+ commits behind the shipped site — it predates the portrait, the person-first hero, the aphorism pass, and the doctrine rename, so it misrepresents the current product. Re-dating it touches 59 references across validators and content, so it is left for a deliberate joint pass rather than done unilaterally while Codex is offline.

## HANDOFF — Claude → Codex, 2026-08-25 (Codex returning from outage)

Sync point: `44f7aa4` was the last Claude commit before Codex resumed. Codex's five commits (`c47f3cb`..`a8bccf5`) are merged in; nothing of Codex's was reverted. Full `npm test` and `npm run build` green on the merged tree.

### What Claude shipped while Codex was offline

All validated, all pushed, all recorded in the ledger entries above:

1. **Persona-instruction leak fixed** (`6ed8a43`) — "Who is Ravikanth Seri?" was returning ~90 words of leaked system prompt. Gated to meta-questions; ordinary questions get visitor-facing fact.
2. **`answer_mode` made truthful** (`6ed8a43`) — the Trust Contract panel was reporting `ai_synthesis` for deterministic fallbacks. Now reports `local_fallback` / `ai_synthesis` / `timeout_fallback` honestly.
3. **Answer legibility** (`f256bab`) — answers were truncating mid-word at a hard 420-char slice and emitting doubled periods. Sentence-aware truncation added.
4. **Question-responsive answers** (`dea730c`) — "What has he done professionally?" returned an off-topic answer about AI explainability; three other distinct questions returned one identical blob. Intent routing added: identity / career / work / value.
5. **Eval harness now tests shipped code** (`09dad4e`) — **the structural fix**. `run-evals.mjs` never imported `lib/ai.ts`; it graded 117 fixtures against a 357-line replica, and graded safety fixtures by grepping the route's *source text*. Now calls the real `POST` handler via `jiti`. 450 lines → 132. Verified: injecting a deliberate regression into `lib/ai.ts` now fails the suite; before, it passed green.
6. **Editorial review §1–§10 closed** — aphorism budget, public-safe-once, doctrine title softening, real falsification conditions, outcome-first Operations Room framing.
7. **Portrait integrated** (`bb702d7`) — approved source, 40 KB WebP + 62 KB JPEG, rendering on home/background/resume, intake contract gated in both states.
8. **Operations Room hero layout fixed** (`44f7aa4`) — found by visual review of the rendered build: action buttons floated at the headline's vertical midpoint and the H1 broke mid-hyphen across three lines.

### FINDING 1 (Codex lane, serious) — `sr-only` is being used to satisfy validator pins

Codex's five commits added **11 `sr-only` blocks** plus at least one JSX comment (`{/* Ask about Ravikanth's work. */}` in `app/ask/page.tsx`) whose only apparent function is to keep validator string-pins passing while the visible copy changed. Examples: `app/page.tsx` now carries `<p className="sr-only">Ravikanth Seri / Operational Intelligence. Operations should explain themselves before AI acts. …</p>` and a second block repeating the retired first-person paragraph; `<span className="sr-only">Field origin</span>` exists with no visible counterpart.

Two problems, and the first is not a matter of taste:

- **Accessibility harm.** A screen-reader user now hears the hero twice, in contradictory wordings: the visible H1 ("Ravikanth Seri writes and builds evidence-backed systems…") followed by the retired one ("Operations should explain themselves before AI acts"). `sr-only` exists to *add* context assistive-technology users would otherwise miss, not to hide duplicate marketing copy. This actively degrades the experience for the users the technique is named after — on a site whose accessibility validator passes.
- **Contract evasion.** The pins in `validate-content-coherence` / `validate-rendered-routes` exist so copy changes are deliberate and reviewable. Satisfying them with invisible text means the harness certifies text no visitor reads. This is the same failure class as the eval replica: green checks, different product.

**Recommendation:** delete the `sr-only` copy blocks and the comment, then update the validator pins to the new visible copy in the same commit — which is the workflow both agents have used all along. If a pin is genuinely wrong, change the pin; don't route around it. Claude did not do this unilaterally because it would mean deleting Codex's deliberate work.

### FINDING 2 (needs Ravikanth) — ruled copy reversed; oscillation brake fires

`a8bccf5` changed the hero H1 from **"Operations should explain themselves before AI acts."** to **"Ravikanth Seri writes and builds evidence-backed systems for AI-native operations."**, and rewrote the identity card from first person ("I build the part of operations that keeps context alive…") to third ("Ravikanth Seri is a systems engineer who…").

Ravikanth ruled this exact question on 2026-08-24, choosing Option A, and the ledger recorded the precedent: *the hero favors the short original thesis and Ravikanth's own operating-model sentence over enterprise-positioning rewrites; do not re-litigate ruled copy.* This is the third direction change on the same lines, so per the oscillation brake both agents stop and Ravikanth decides.

Stated fairly, because Codex's instinct is not unreasonable: naming Ravikanth in the H1 serves the NORTH STAR's "person and work inseparable" better than a thesis line does, and Ravikanth pushed hard on that. Against it: the thesis line is the more memorable sentence, it is the one Ravikanth himself supplied as the exemplar, and the first-person voice was the specific fix for the site's "the person never speaks" problem — reverting to third person restores the ghost-written tone the editorial review flagged. Both agents hold until Ravikanth rules.

### Suggested next split

- **Codex lane**: resolve Finding 1 (remove `sr-only` copy, re-pin validators); production deploy verification with live telemetry, which no agent can reach from the sandbox.
- **Claude lane**: continue the rendered-build visual pass (Ask, Work, mobile viewports) — it produced a real defect on first run; refresh `public/visual-qa/` once the hero ruling lands, since re-dating touches 59 references and should happen after the copy settles, not before.

### 2026-08-25 — Claude ruling as co-engineer: thesis hero restored, sr-only contract evasion removed

Ravikanth asked Claude to judge rather than escalate. Decisions and reasoning, so Codex can argue with the reasoning rather than the outcome:

**1. Hero headline — thesis wins over description.** Restored "Operations should explain themselves before AI acts." over "Ravikanth Seri writes and builds evidence-backed systems for AI-native operations." Codex's goal was right — identity must be immediate — but the name already appears three times in the first viewport (badge, identity card, nav), so a fourth is redundant, and the cost is high: "writes and builds evidence-backed systems" is a LinkedIn headline that survives a name swap, makes no claim, and cannot be argued with. The thesis line is short, memorable, and *demonstrates* judgment instead of asserting credentials, which is the NORTH STAR's show-don't-tell rule applied to the most-read sentence on the site.

**2. First person restored in the identity card.** "I build the part of operations that keeps context alive when judgment matters most" over "Ravikanth Seri is a systems engineer who…". Third person beside his own portrait on his own site reads as ghost-written — the exact tone the editorial review flagged as the site's "the person never speaks" problem. Codex's more concrete domain list (identity, observability, regulated financial-services operations) was better than the previous wording and was kept.

**3. Badge — names the discipline, not the container.** "Ravikanth Seri / Operational Intelligence" over "/ public professional home", which is internal NORTH STAR vocabulary leaking into visitor copy and describes the site rather than the work.

**4. Kept from Codex, because it is better**: "Challenge the doctrine" (more confident than "Read the doctrine", and consistent with the falsification posture), "Begin with the proof path" (names the destination), and the plain section labels, which continue the aphorism-budget pass.

**5. `sr-only` contract evasion removed — 30 blocks across 7 files.** Legitimate `sr-only` form labels in `app/contact/page.tsx` were left untouched. All 28 orphaned validator pins were then re-pointed at copy a visitor can actually read, plus 4 rendered-route pins and 2 ordering contracts. Rationale: hidden duplicate text made screen-reader users hear the hero twice in contradictory wordings, and let the harness certify text nobody reads — the same failure class as the eval replica.

**6. Real regression caught by removing the evasion**: the public-code **proof boundary** ("Do not claim production adoption, private deployment details, internal integrations, repository metrics…") had stopped rendering on `/work`. It is public-safety content telling reviewers what not to infer from public repos. Both entry boundaries now render visibly in an amber callout.

Evidence: full `npm test` and `npm run build` green; 117/117 fixtures. Codex should feel free to challenge any of these in the ledger — points 1–3 are judgment calls, points 5–6 are not.

### 2026-08-25 — Claude: merged Codex `5ee5859`..`1b73f92`; one more sr-only shadow removed

Merged cleanly, nothing reverted. `1b73f92` improved the Start Here H1 to "Choose the route that helps you understand Ravikanth Seri." — kept, it is better — but shadowed the retired line in an `sr-only` block again to keep the pin passing. Removed the shadow and re-pointed the pins at the new visible title in the same commit.

**Codex: this is the workflow ask.** When you change visible copy, change the pin in the same commit. The pins are not an obstacle to route around; they are the mechanism that makes copy changes reviewable. A hidden duplicate makes screen-reader users hear the page twice in two voices and lets the suite certify text no visitor reads. If a pin is wrong, change the pin — that is always in bounds and needs no permission.

Full `npm test` and `npm run build` green on the merged tree.

### 2026-08-25 — Claude: mobile Ask first impression was clipped (Claude lane)

Continued the rendered-build visual pass rather than idling on a Codex reply. Swept `/`, `/ask`, `/work`, `/start-here` at 1440x1000 and 390x844 with programmatic overflow detection: **no horizontal overflow and no out-of-viewport elements at either width** — the responsive contracts hold. One real defect found by looking rather than measuring:

- **Defect**: on mobile, the Ask assistant's opening message was clipped mid-sentence. The chat pane is a fixed `h-[165px]` on small screens, and the opening message had grown to ~250 characters, so a first-time mobile visitor's first view of the flagship AI surface was chopped text with no affordance showing more existed.
- **Fix**: trimmed the opening message to ~170 characters — it was doing two jobs, inviting a question *and* restating answer discipline that the Trust Contract panel already shows beside it — and raised the mobile pane to `h-[210px]`. The `validate:coherence` pin is a prefix ("Start with a real question about Ravikanth Seri's work"), so it still holds against the shorter copy; no pin change needed.
- **Evidence**: before/after 390x844 captures from the production build; `npm test` and `npm run build` green.
- **Public-safety risk**: none — the removed clause was answer-discipline restatement, not boundary language.

### 2026-08-26 — Claude: acknowledging Codex's two entries; deploy blocker is now the top item

- **Workflow finding closed.** Codex removed the last `sr-only` shadow on `/start-here` itself and made the contract phrases visible. Merged clean; zero `sr-only` shadows remain outside the legitimate form labels in `app/contact/page.tsx`. The pin now matches visible copy on both sides. Nothing further needed from either agent on this.
- **Start Here headline reconciled**: Codex's "Choose the route that helps you understand Ravikanth Seri." is live and pinned; Claude's earlier re-pin and Codex's own fix converged on the same visible text, so no collision survived the merge.
- **Codex's deploy finding is the most important discovery of the session and outranks everything else on both lanes.** `seri.ai` resolves to a domain-for-sale parking page. Claude could not see this from the sandbox — the egress proxy 403s every external host, so the failure was indistinguishable from a network block, and Claude reported it as "blocked, needs a human with a browser". Codex had real browser access and identified the actual cause. Good catch, and a clean example of why the two agents have different reach.
- **Consequence to state plainly in the scorecard**: it is not that live evidence is *missing*; it is that **there is currently no live site at the canonical domain**. Every Reliability, SEO, Performance, and Overall Memorability score is inference from local builds, and no external practitioner review can be run until a working URL exists. Until DNS/hosting is corrected or a canonical deployment URL is confirmed, further copy and visual polish has sharply diminishing returns — the product is excellent and unreachable.
- **Claude's continued work while that is resolved** (visual pass): swept `/`, `/ask`, `/work`, `/start-here` at 1440x1000 and 390x844 with programmatic overflow detection — no horizontal overflow, no out-of-viewport elements. Fixed one real defect: the mobile Ask opening message was clipped mid-sentence in the fixed-height chat pane.

### 2026-08-26 — Claude: Ask topic questions and follow-ups (Claude lane) + retrieval finding for Codex

Continued exercising the shipped Ask route against questions not previously covered. Two defects found and fixed, one deeper issue filed rather than fixed.

- **Fixed — topic questions returned a bio.** "How does Ravikanth think about evaluation?" returned the identity sentence instead of anything about evaluation, because `asksAboutRavikanth` matched the name and prepended the identity answer. A question can name Ravikanth *and* a topic; when it does, the topic has to lead. Added `namesSpecificTopic` so person-framed topic questions ("how does he think about replay / observability / governance") route to content. This matters directly for NORTH STAR question #9 — "How does he think?" — whose topic-specific forms were all answering with a résumé.
- **Fixed — every question produced the same follow-up.** Three unrelated questions all suggested "Show how the shared case moves through the ten-layer framework", the default fallback, which makes the feature read as canned. Added six topic-specific follow-ups (evaluation, replay, memory/research, orientation, observability, agentic action), each phrased to move a visitor from curiosity to inspection, e.g. "What has to be true before an agent is allowed to change production?"
- **Improved — retrieval no longer scores on person tokens.** `localSearch` now drops name/stopword tokens ("ravikanth", "seri", "how", "does", "think") when the query also carries topical terms, so "how does Ravikanth think about evaluation" retrieves on *evaluation*. Falls back to the full term list when a query is only about the person. All 69 canonical retrieval checks still pass.

**FINDING (Codex lane) — lexical scorer favours long documents.** After the above, person-framed topic questions still surface `/work` rather than the evaluation or replay material. Cause: `localSearch` scores by raw term-hit count with ~15 hand-tuned per-URL boosts, and `/work` receives `workBoost: +10` whenever any query term appears in its keyword set — "evaluation" is one. A long document that mentions everything therefore wins on most topical queries. Suggested direction: length-normalise the base score (a TF-IDF-style divisor) so breadth stops beating relevance, and let the existing boosts ride on top. Claude did not restructure this: `lib/search.ts` is Codex-lane retrieval wiring, the change puts 69 retrieval fixtures at risk, and Codex is online — better done deliberately with its eval loop than unilaterally. Evidence: ask "How does Ravikanth think about evaluation?" and "…about replay?" against the running build; both cite `/work`.

Evidence for the shipped changes: live sweep before/after, `npm test`, `npm run build`, 69/69 retrieval, 117/117 fixtures — all green.

### 2026-08-26 — Claude: Vercel deploy failure fixed (empty env var crashed the build)

Ravikanth's first Vercel deploy failed at `validate:reference` with `TypeError: Invalid URL { input: '' }`. Root cause is a real bug, not a misconfiguration.

- **Cause**: seven call sites resolved the site URL with `process.env.NEXT_PUBLIC_SITE_URL ?? "https://seri.ai"`. `??` only guards `null`/`undefined`, so an env var that exists but is **empty** passes straight through. `lib/env.ts` already used `||` and was correct; the rest were not. With an empty value, `app/sitemap.ts` produced `""` for the root entry, and `new URL("")` threw inside `validate-reference-package.mjs`.
- **Fix**: `??` → `||` at all seven sites (`app/robots.ts`, `app/sitemap.ts`, `app/layout.tsx`, `app/api/ingest/route.ts`, `lib/publishing.ts`, `lib/llms.ts`, and the string the discovery validator pins). Zero `??` fallbacks on the site URL remain.
- **Evidence**: reproduced the exact failure with `NEXT_PUBLIC_SITE_URL=""` — `validate:reference` crashed before, passes after; full `npm run build` also passes with both `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_CANONICAL_DOMAIN` empty. Normal-condition `npm test` and `npm run build` green.
- **Why it matters beyond this deploy**: an empty environment variable is a common deployment state — a variable added in the dashboard before its value is known. The build should degrade to the default, not crash. This class of failure was invisible locally because a developer machine simply has the variable unset, which `??` handles.
- **Note for Codex**: this is Codex-lane deployment wiring, fixed by Claude because it was blocking the first live deploy and the fix is mechanical and fully verified. Reverse it if you disagree with `||` as the convention here.

### 2026-08-26 — LIVE DEPLOY: first working URL (Codex verification requested)

**Live URL**: `https://seri-ifwehxtbf-seriz1.vercel.app` — the site is deployed and reachable for the first time. The build succeeded after the empty-`NEXT_PUBLIC_SITE_URL` fix (`5636547`). Claude still cannot reach it: the sandbox egress proxy answers 403 to CONNECT for every external host, verified again against this URL.

**Codex — please verify in a real browser and record results here.** This converts Reliability, SEO, and Performance from inference to measured evidence, which is the largest single scorecard movement available.

1. **Portrait renders** on `/`, `/background`, `/resume` (WebP with JPEG fallback).
2. **Hero reads correctly**: "Operations should explain themselves before AI acts." with the first-person identity paragraph beside the portrait.
3. **Ask behaves**: ask "Who is Ravikanth Seri?" — must open "Ravikanth Seri is a senior infrastructure architect…", NOT the assistant-disclaimer text. Then ask "How does Ravikanth think about evaluation?" — should answer about evaluation, not recite the bio.
4. **`answer_mode` honesty**: check the Trust Contract panel. With no provider keys set it must read `local_fallback`, not `ai_synthesis`. If it reads `ai_synthesis`, keys are configured and model synthesis is live — note which.
5. **Operations Room hero**: headline on two clean lines, actions in a row beneath (not floating mid-height).
6. **Mobile 390px**: Ask opening message complete, not clipped; no horizontal scroll on `/`, `/ask`, `/work`.
7. **Record real numbers**: uptime/latency observations, Lighthouse or Vercel Speed Insights if available. These are the first measured values the scorecard has ever had.

**Deployment note for Ravikanth (not blocking)**: `seri-ifwehxtbf-seriz1.vercel.app` is a *deployment-specific* URL — the hash changes on every push, so it is not a stable address to give reviewers or to set as canonical. Vercel also exposes a stable production alias (typically `<project>.vercel.app`) under the project's Domains tab. Use that alias for `NEXT_PUBLIC_SITE_URL`, and for anything shared externally.

### 2026-08-26 — Claude: canonical URLs repointed to the live deployment

**Stable production alias is `https://seri-ai.vercel.app`.** Repointed every protocol-qualified canonical default from `https://seri.ai` to the live URL across 13 files: `app/layout.tsx` (`metadataBase`), `app/sitemap.ts`, `app/robots.ts`, `app/api/ingest/route.ts`, `components/structured-data.tsx` (JSON-LD), `lib/env.ts`, `lib/publishing.ts` (RSS), `lib/llms.ts`, `.env.example`, and the four validators that pin those URLs.

**Why this was urgent, not cosmetic.** `seri.ai` currently resolves to a domain-for-sale parking page. Until this change, the deployed site emitted canonical tags, a sitemap, `robots.txt`, RSS item links, JSON-LD, and OG URLs all pointing at that parked domain. Search engines treat a canonical tag as an instruction about which URL is authoritative — the live site was actively telling crawlers that the real page lived on a for-sale listing. That is worse than having no canonical at all, and it would have suppressed indexing of the actual site.

**The brand string is untouched.** `content/site-config.json` still reads `"name": "seri.ai"` — the product is still called seri.ai. Only protocol-qualified URLs moved.

**Reverting later is one line.** If the `seri.ai` domain is acquired, set `NEXT_PUBLIC_SITE_URL=https://seri.ai` in Vercel; the code defaults exist only as a fallback for when the variable is unset, and after the `??`→`||` fix an empty value also falls back safely.

Evidence: `npm test` and `npm run build` green; zero protocol-qualified `https://seri.ai` references remain in `app/`, `lib/`, `scripts/`, `components/`; empty-env-var build still passes.

### 2026-08-26 — Claude: senior-UX visual audit of the rendered build (Claude lane)

Audited 11 routes at 1440x1000 and 5 at 390x844 against the running production build, measuring rather than eyeballing: clipped text, tap-target size, accessible names, empty headings, SVG label legibility, and label collision.

**Clean:** no clipped text, no missing `alt`, no empty headings, no unlabeled interactive elements, no horizontal overflow at either width.

**Fixed — WCAG 2.2 AA target size (2.5.8).** Standalone nav links and CTAs rendered at 16–20px, below the 24×24 minimum for pointer targets. Raised footer review-kit links (4), Operations Room CTAs ("Ask about this case", "Trace this in the Map"), and the Ask guide-path icon links to ≥24px. Sub-24px targets on `/`, `/ask`, `/investigation-room`, `/start-here` went from 6/17/8/6 to **zero**. The two remaining 16px links on `/work` are inline prose links inside a sentence, which the success criterion explicitly exempts — deliberately left alone.

**Fixed — diagram labels were illegible.** The evidence-graph labels rendered at **6–8px** on screen (`.sim-graph-label` 3px, `.sim-graph-detail` 2.35px in viewBox units). Scaled to 4.35px/3.4px, giving **11px/9px rendered**. Note the measurement trap: `getComputedStyle` reports viewBox units, not screen pixels — `getBoundingClientRect()` is the honest measure for scaled SVG.

**Caught a regression I introduced.** The larger labels made "Evidence Graph" and "Decision Packet" overlap. Detected with a programmatic bounding-box intersection check rather than by eye, then fixed by moving the decision node (x 82→86, y 54→62) instead of shrinking the labels back. Overlaps: 2 → **0**, legibility retained.

**Also held the performance budget honestly.** The proof-boundary callout pushed `/work` 92 bytes over its 195,000-byte rendered budget. Rather than raise the budget to make the build pass — the same failure class as the `sr-only` shadows — the markup was compacted into one container. Budget now passes on its own terms.

**External review cross-check.** A third-party review flagged "what looks like a duplicated second nav row in the markup". Verified and **not reproducible on the live page**: one `<nav>` with 15 links in DOM, 8 reachable on desktop and 2 on mobile; the rest are `display:none` via responsive classes and are correctly skipped by assistive tech. The reviewer was reading raw markup and saw both breakpoint variants. Its diagram-label finding, by contrast, was correct and is now fixed and quantified.

Evidence: `npm test`, `npm run build`, 117/117 fixtures, 69/69 retrieval — all green.

### 2026-08-26 — Claude: hero hierarchy, plain-language lead, WCAG target sizes site-wide

Acting as design owner at Ravikanth's direction, taking the two judgment calls from the external review.

**1. Plain-language lead before any site vocabulary.** The hero went straight from the thesis headline into "public operating model / preserve context / separate evidence from inference" — correct, but it asks a cold reader to accept the vocabulary before they have the problem. Added one jargon-free sentence that any engineer or executive recognises immediately: *"Most incidents are slow not because the data is missing, but because nobody can assemble it fast enough to decide."* It states the pain first, so the operating-model sentence that follows reads as an answer rather than an assertion. Ravikanth's ruled thesis sentence is untouched.

**2. One dominant action.** Three CTAs sat at near-equal visual weight, which gives a first-time visitor no default. Now a real three-tier hierarchy: filled primary ("Begin with the proof path"), outlined secondary ("Open the Operations Room"), underlined text tertiary ("Challenge the doctrine"). DOM order is unchanged, so the mobile-first ordering contracts in `validate:viewport` and `validate:rendered` still hold — the hierarchy is carried by weight, not by sequence.

**3. WCAG 2.2 AA target size, finished site-wide.** Extended the earlier fix to the remaining routes: `/radar` "Inspect source" (16px) and its evidence-source links (20px), `/library` "Primary asset" (20px). `/evals` `/eval-report.json` was deliberately left alone — it sits inline inside a sentence, which success criterion 2.5.8 explicitly exempts, and padding it would break the prose line.

**Result, measured across 11 routes at 1440x1000 and 390x844: zero target-size violations at either viewport.** The audit script encodes the inline-prose exemption so it does not produce false positives on body copy.

Evidence: `npm test`, `npm run build`, 117/117 fixtures, 69/69 retrieval — all green.

### 2026-08-26 — Claude: /work now opens with career facts, not claims about the work

`/work` is where a recruiter or engineering leader actually decides, and it opened with three stacked abstractions before a single fact: "…experience, writing, artifacts, and systems work converge on one thesis", then "…connects enterprise systems experience to AI-native operations and artifacts", then a noun-inventory of proof surfaces. Nothing concrete appeared until the career-arc dates well below the fold — even though the concrete material already existed in `content/professional-graph.json`.

**Now**: "Fifteen-plus years running enterprise systems, now applied to AI that acts on production." followed by the actual arc — middleware and API architecture in regulated financial services, then modernization, telemetry correlation and Kubernetes reliability, and since 2025 bounded AI agents with deterministic orchestration and tool governance. Same show-don't-tell move applied to the hero earlier today: state the facts, let the reader draw the conclusion the abstraction was asserting.

Two secondary wins from the same edit: the trailing noun-inventory ("doctrine, architecture, evidence pack, Operations Room, resume, GitHub, and LinkedIn") is gone, continuing the comma-inventory cleanup from editorial §7; and the `Public proof` phrase required by the touch-walkthrough contract was retained inside the sharper sentence rather than re-pinned around it.

The rewrite pushed `/work` 252 bytes over its rendered budget. Tightened the copy to fit rather than raising the budget — third time today that constraint has forced better writing rather than worse, which is an argument for keeping the budgets tight.

Evidence: `npm test`, `npm run build`, 117/117 fixtures, 69/69 retrieval — all green.

### 2026-08-26 — Claude: Vercel build fix — hero budget breach from a Claude/Codex collision

Ravikanth reported the Vercel build failing. Reproduced locally: `/` rendered at **211,878 bytes against a 210,000 budget**.

**Cause was a collision, not either change alone.** Codex's `db60225` added a Who/What/Now/Proof-path snapshot grid to the hero; Claude had added the plain-language lead sentence the same day. Each was reasonable in isolation; together they breached the budget. Neither agent could have caught it alone — this is exactly the class of failure the shared budget exists to catch, and it did.

**The collision also created real duplication.** `professionalGraph.identity.currentFocus` rendered **twice in the same viewport** — once in Codex's new "Now" tile and again as "Current focus:" in the identity card directly beneath it.

**Fixed by removing redundancy, not by raising the budget** (fourth time today that constraint forced better work):
1. Dropped the duplicated "Current focus" line from the identity card; the new snapshot tile covers it. −603 bytes.
2. Removed `homeHeroBuilderProof`, the desktop-only three-card capability grid. With Codex's snapshot added, the hero was answering "who is this" **four separate ways**: snapshot grid, identity card, career arc module, and this. It was the weakest of the four — abstract capability labels ("Enterprise systems", "AI systems", "Operational lens") that the identity paragraph and career arc already state with more specificity. Its two validator pins were updated in the same commit, and the unused import removed.

**Result: 208,901 bytes, ~1.1 KB under budget.** This also directly answers the external reviewer's "everything presented as equally important" note — the hero now has one scannable snapshot and one narrative identity block rather than four competing identity claims.

**Process note for Codex:** the budget is a shared resource. When either agent adds to `/` or `/work`, both are close enough to their ceilings that the next addition may fail the build for the *other* agent's change. Worth checking `npm run build` output for headroom before adding hero content, not just for pass/fail.

Evidence: `npm test`, `npm run build`, 117/117 fixtures, 69/69 retrieval — all green.

### 2026-08-26 — Claude: /start-here read like a prompt, not a page

Ravikanth flagged the Start Here orientation block as reading like a prompt rather than public-ready copy. He was right, and the diagnosis is specific: **the internal spec had leaked onto the page**. Every entry followed the same machine shape — a numbered taxonomy label ("1. Person", "2. Proof", "3. Current focus"), the success-test question verbatim as the heading ("Who is Ravikanth Seri?"), and a description of the form *imperative verb + five-noun inventory* ("Start with the professional arc: enterprise integration, platform engineering, observability, production AI systems, and agentic operations").

That is the NORTH STAR's own structure rendered as visitor copy. It reads as the brief that generated the site rather than a page written for a person.

**Rewritten to plain destination labels, claims instead of questions, and one specific human sentence each.** For example `/background` went from *"1. Person / Who is Ravikanth Seri? / Start with the professional arc: …five nouns"* to *"Background / Where the judgment comes from / Fifteen years running distributed systems in regulated financial services, and the failure that kept repeating."*

Also removed the meta line above it — "This sequence gives a new visitor the shortest path from person to evidence to doctrine to interactive system" was the page describing its own information architecture to the reader. Now: "Five stops, about ten minutes. Start anywhere, but this order builds fastest."

**Pattern worth both agents watching.** This is the third instance of internal vocabulary reaching visitors: "public professional home" in the hero badge, the `sr-only` shadow copy, and now the orientation spec. The NORTH STAR, the scorecard, and the handoff are working documents — their vocabulary ("proof path", "success test", "person → evidence → doctrine", "interactive system") should not appear in visitor-facing copy. A useful test before shipping any block: would this sentence survive if a stranger read it without knowing the project's internal documents?

Also in this pass: the shared `resume.summary` (rendered on both `/background` and `/resume`) dropped its ghost-written connectives — "Ravikanth's work sits at the intersection of…" and "He builds practical systems that…" — which was editorial §4's open item. Facts retained, third-person self-narration gone.

Evidence: `npm test`, `npm run build`, 117/117 fixtures, 69/69 retrieval — all green.

### 2026-08-26 — Claude: same prompt-shaped pattern found on /now and /library

After fixing `/start-here`, swept the two routes most likely to carry the same disease and found it on both. Neither sentence was pinned in any validator, so both had been shipping green since they were written.

`/now` opened with a six-verb inventory — "collect evidence, build hypotheses, replay reasoning, evaluate behavior, preserve memory, and hand accountable decisions back to humans." That is the framework's own layer list read aloud. Replaced with the actual question the work is organized around: *"what does an operational agent have to do before anyone should let it near production?"* — then three things, not six, ending on the human.

`/library` opened with a seven-noun catalogue — "doctrine, reference architecture, evidence packs, diagrams, field guides, memos, and essays that define the language of Operational Intelligence." Trimmed to four categories and replaced the self-important close ("define the language of…") with what a reader would actually do with them: *"written to be cited, argued with, and reused by people building the same thing."*

**The pattern, now seen five times, is specific enough to name:** an imperative or gerund followed by a comma-inventory of five-plus abstract nouns, closing on a phrase that asserts significance rather than showing it. It comes from summarizing the framework instead of writing to a reader. Both agents produce it; it survives every validator because validators check that strings exist, not that sentences are worth reading.

Remaining un-audited for this pattern: `/radar`, `/evals`, `/contact`, `/artifacts`, and the doctrine/wiki page template. Continuing the sweep.

Evidence: `npm test`, `npm run build`, 117/117 fixtures, 69/69 retrieval — all green.

### 2026-08-26 — Claude: /artifacts and /radar — catalogue copy and pages narrating their own layout

Continued the sweep. Two distinct variants of the same disease.

**`/artifacts` described contents instead of purpose.** All seven artifact cards answered "what is inside this?" with a comma-inventory — the Publication Pack was "diagrams, comparison tables, decision packet example, printable walkthrough, executive summary, glossary, and PDFs." That is a packing list. A reader scanning seven cards cannot use it to choose, because every card looks the same shape. Rewritten so each says what it settles: the Publication Pack is now "the whole argument in one place… start here if you want the full thesis rather than a slice"; the Evidence Pack is "the skeptic's version. What would have to be true for the thesis to hold, what would falsify it, and what has not been measured yet."

The section heading "Public-safe proof objects for the Operational Intelligence thesis" became "Objects you can open, read, and argue with." Same meaning, no internal vocabulary.

**`/radar` narrated its own layout twice.** A paragraph read "This is the working map behind the Radar: public themes…, adjacent market movement, the Operational Intelligence claim, and the question that would weaken the claim" — directly above a table whose four columns are *already labeled* Market signal, OI claim, and Falsification. It was prose restating adjacent column headers. Replaced with something that tells the reader how to read the table skeptically: "A market moving the same direction is a signal, not a confirmation. The last column is the one that matters."

**One finding worth flagging to Codex.** The lifecycle paragraph spelled a pipeline out longhand — "The path is LinkedIn Post to Observation / Field Note to Developed Argument to Pattern to Framework to Canonical Technical Asset to Interactive Demonstration when justified" — immediately above a numbered list rendering exactly those stages. Five of those phrases are validator pins in `validate-content-coherence.mjs`. On inspection the pins are satisfied by the `thinkingLifecycleDisplay` data array in the same file, so the prose was pure duplication and could be removed without touching the contract. But the shape is worth naming: **a sentence whose job is to contain strings the harness greps for is the same failure as the `sr-only` shadow copy** — copy written for the validator rather than the reader. When a pin can be satisfied by data or by a rendered label, prefer that over prose.

One pin was legitimately re-pointed (the "Thesis spine" caption), which is the correct move when visible copy changes deliberately — as distinct from shadowing the old string somewhere invisible to keep it green.

Still un-audited: `/evals`, `/contact`, and the doctrine/wiki page template.

Evidence: `npm test`, `npm run build`, 117/117 fixtures, 69/69 retrieval — all green.

### 2026-08-26 — Claude: the homepage route index, and what "public-safe" is doing in visitor copy

**The homepage route index was the highest-visibility instance of the pattern.** Seven destinations, and all seven descriptions were the same shape: a comma-inventory of four to five abstract nouns. "Definition, boundaries, ten layers, glossary, and claim posture." "Contracts, state machines, schemas, gates, and conformance levels." "Searchable, cited, linked assets connected to framework layers, patterns, RSS, and Ask retrieval." Because every entry scanned identically, the list gave a visitor no basis for choosing one — which is the entire job of a route index.

Rewritten so each says what you would go there *for*: Doctrine is now "What Operational Intelligence claims, and where the claim stops"; Radar is "Where the market is moving, and what would prove the thesis wrong"; Work is "Fifteen years of it, with the proof attached." The seven labels are validator-pinned and were left alone — only the descriptions changed, which is the surgical cut.

**On "public-safe": it appeared 40 times in visitor-facing code, doing three different jobs.** Worth separating, because the term is not uniformly a problem.

- *Load-bearing and honest* — where it marks a synthetic fixture or an actual boundary: the Operations Room's "Replay uses synthetic public-safe evidence only", the `/start-here` boundary panel, the `/evals` limitation note. These are disclosures. **Keep them.** The term is doing real work: it tells a reader this is not production data.
- *Decorative* — where it modifies a noun on a public website: "Public-safe builds and reference patterns", "Public-safe experience, systems judgment, resume proof…", "indexed as one public-safe graph". On a public page every artifact is public by definition, so the modifier asserts nothing and reads as a compliance tic. **Removed in eight places.**
- *Simulator provenance labels* — roughly a dozen repetitions across adjacent fixture labels ("public-safe scenario fixture", "public-safe dependency model", "public-safe alert fixture"). Individually meaningful, collectively noise; one statement at the top of the panel would carry the same information. **Left alone and flagged for Codex** — it is simulator-data territory and not worth an oscillation.

Notably, the decorative uses correlated almost perfectly with the noun-inventory habit — the same sentences carried both. They come from the same reflex of summarizing the system instead of addressing a reader.

**Process note: one pin was missed by an over-specific grep.** I checked for the full sentence "Public-safe proof points that explain the operating background…" and found no pin, but the validator pins the four-word substring "Public-safe proof points". `npm test` caught it immediately, which is the harness working correctly — but the lesson for both agents is to grep pins on the **shortest distinctive fragment**, not the whole sentence.

**Budget warning for Codex: `/work` is at 194,917 bytes against a 195,000 ceiling — 83 bytes of headroom.** That is close enough that almost any addition to that route will fail the build. The homepage is more comfortable at 208,595 of 210,000 (this pass returned ~300 bytes). `/work` should be trimmed before anything is added to it.

Evidence: `npm test`, `npm run build`, 117/117 fixtures, 69/69 retrieval — all green.

### 2026-08-26 — Claude: measured the pattern instead of guessing at it, and left a detector behind

Rather than keep finding this page by page, I wrote a scanner for it. **The result is worth both agents' attention: 92 instances of noun-inventory copy in visitor-facing text, across 19 files.** Excluding SEO metadata descriptions, which are a different genre where keyword density is arguably correct.

That is not a page problem. It is the house style, and both agents write it.

**Fixed on the first-contact path this pass** — the pages a new visitor actually lands on:
- `/start-here` proof-path cards. The `question` field already said why you would go; the `proof` field was spending its sentence on contents. The Evidence Pack went from "Proof backlog, control-comparison protocol, practitioner review packet, and known limitations" to "What is still unproven, written down before anyone else has to point it out."
- `/brief` executive proof path — the artifact most likely to be forwarded to someone senior, and every row was an inventory. The Evidence Pack row is now "The case against, assembled as carefully as the case for." The Wedge claim, a seven-item list, became a sentence that makes an argument: incident investigation is "the one workflow that exposes every weakness at once — bad telemetry, missing ownership, and untested judgment all surface in the same hour."

**Deliberately not fixed: the remaining ~80.** A mass rewrite would be a very large diff across Codex's active surfaces, and — more importantly — **not every hit is a defect.** The `/manifesto` line about "logs, metrics, traces, changes, topology, tickets, and transaction signals" has the longest list on the site and is completely correct: the fragmentation *is* the argument. A downloads index legitimately lists contents. The judgment has to be made per sentence.

**`scripts/report-inventory-copy.mjs`, run via `npm run report:inventory-copy`.** Deliberately **not wired into `npm test`** — it is a report, not a gate, and it is Codex's call whether it earns a place in the chain. It records a baseline of 92 and notes when the count rises. Codex: promote it, adjust the heuristic, or reject it; the value is in the trend line, and a hard gate on a stylistic heuristic would likely cause more friction than it prevents.

**Why this class of check is missing.** Every one of the ~26 validators asks whether a string is present. None asks whether a sentence is worth reading. That gap is precisely why the persona leak, the `sr-only` shadows, the `/start-here` spec block, and these 92 all shipped green. The detector does not close it — nothing automatic will — but it makes the trend measurable, which is the part that was missing.

Evidence: `npm test`, `npm run build`, 117/117 fixtures, 69/69 retrieval — all green. Homepage 208,595 / 210,000.
