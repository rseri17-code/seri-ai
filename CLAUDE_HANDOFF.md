# Claude Handoff for seri.ai

Last updated: 2026-08-24

Current sync point for Claude review:

- `823c0fd Align visitor questions to north star`

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

- `823c0fd Align visitor questions to north star`

Latest pushed commit before this handoff was validation-gated:

- `823c0fd Align visitor questions to north star`

Recent improvements:

- Homepage no longer opens with artifact-inventory language.
- Ask Ravikanth is framed as an evidence console over Ravikanth's public professional graph.
- Keyboard accessibility walkthrough evidence exists for Ask Ravikanth and Operations Room.
- Search retrieval covers 67 canonical queries.
- Ask deterministic fixtures cover 115 passing cases.
- Start Here now includes a 10-minute proof route that moves from operator to work to thesis to artifact to evidence.
- The approved portrait is integrated on home, background, and resume through the portrait intake contract.
- Claude's latest editorial-lane passes resolved the aphorism budget, public-safe-once wording, and doctrine title softening.
- Ask Ravikanth now has a versioned persona contract wired into the system instruction and local fallback. The contract requires an evidence-interface posture over Ravikanth's public professional graph, not first-person imitation and not generic chatbot behavior.
- Ask follow-up behavior is now intent-aware for GitHub/Sentinalai inspection, proof gaps and scorecard questions, recruiter/career questions, doctrine comparisons, Operations Room investigation questions, and contact/collaboration questions.
- Ask scorecard evidence now reflects 115 passing fixtures, the versioned persona contract, intent-aware follow-up questions, and review-quorum routing, and `validate:ask-quality` guards the fixture count against drifting from the eval report.
- Product Excellence report current scorecard now reflects 115 Ask fixtures, persona/follow-up contracts, review-quorum routing, current accessibility coverage, latest performance numbers, and integrated portrait provenance. `validate:deployment` and `validate:handoff` now guard the report and handoff against stale evidence claims.
- The Practitioner Review Packet now defines a minimum external evidence quorum: at least five public-safe reviews across SRE/reliability, architecture, AI/governance, executive/product, and recruiter/hiring perspectives, plus a skeptical or mixed verdict and explicit revision triggers for person-work-thesis confusion or OI/observability/AIOps boundary failure.
- Practitioner review capture now records artifacts inspected and review disposition as first-class fields in the Contact form, contact API metadata, Supabase `practitioner_reviews` view, admin dashboard contract, public packet, README, and validators.
- Practitioner review operations now expose Supabase quorum and dimension-summary views for role coverage, four-artifact inspection, skeptical or mixed signal, evidence-needed notes, and dimension/disposition analysis before publishing any positive summary from external reviews.
- Project proof pages now render Ask fixture coverage from `evalReport.fixtures.length` instead of hard-coded content, and validators reject stale hard-coded live fixture counts in the public project proof ledger.
- Scorecard graph-health and search-discoverability evidence counts are now checked against live `buildPublishingIndex`, `buildKnowledgeGraph`, and retrieval fixtures, so asset, relationship, framework-layer, registry, pattern, principle, and retrieval-query counts cannot drift silently.
- Public-code evidence now avoids counted Sentinalai repository inventory claims; the public-code ledger tells reviewers what to inspect and `validate:content` rejects unvalidated repository inventory counts as proof.
- Public-code/project proof is now a first-class proof-backlog gap. The Evidence Pack, Markdown export, Ask fallback, eval fixture, scorecard, and validators now state that GitHub/Sentinalai/Work/Projects proof requires reviewer walkthroughs and must not infer repository metrics, production adoption, private deployments, private integrations, or live incident outcomes.
- The Work page now renders a compact project-code review-record checklist, and the public-code ledger defines the evidence fields reviewers should capture: repository surface inspected, visible engineering behavior, verdict, reasoning loss or ambiguity, boundary respected, and next proof. Search retrieval now covers 67 canonical queries, including public-code review-record intent routed to `/work`.
- Proof-backlog search intent now stays anchored to the Evidence Pack even when the query mentions public-code/project proof; separate project-code inspection and review-record queries still route to `/work`.
- The First-Time Visitor Review Kit now explicitly asks reviewers what Ravikanth's GitHub and Sentinalai public work show without inferring private production proof, and lists Work/Public Code Proof as a review asset. Validators now guard this path in both content validation and practitioner-review validation.
- Start Here audience paths now keep executives, recruiters, architects, engineers, and founders connected to both Ravikanth's person/work evidence and technical proof assets. `validate:content` guards against audience paths that drift into an anonymous product tour.

## Current Highest-Value Gaps

The scorecard intentionally does not claim 10/10. The strongest remaining gaps are evidence gaps, not page-count gaps.

- Evidence Quality: needs completed practitioner review, benchmark/control-comparison results, live beta telemetry, and external visual/user review.
- Overall Memorability: the first 10 minutes need external validation that visitors remember one evidence-to-decision experience.
- Ask Ravi: deterministic fixtures are strong, but reviewer-labeled live answer quality is not yet proven.
- Reliability: local gates exist, but live uptime, Ask latency, fallback rate, and contact persistence evidence are still missing.
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

- **Resolved**: The Practitioner Review Packet now defines what an external evidence run must include before the site can honestly strengthen claims from review feedback. The packet requires at least five public-safe reviews across SRE/reliability, principal architecture, AI systems or governance, executive/founder/product, and recruiter/hiring-facing perspectives; at least four inspected artifacts; at least one skeptical or mixed verdict; explicit evidence-needed notes; and revision triggers if reviewers cannot explain the person-work-thesis relationship or treat Operational Intelligence as renamed observability or generic AIOps. The Contact practitioner-review form now renders the quorum and review-run protocol, the approved source index exposes it to Ask/retrieval, and deterministic Ask coverage now stands at 115 passing fixtures. Evidence: `content/practitioner-review-packet.json`, `app/contact/page.tsx`, `public/publication-pack/ravikanth-seri-practitioner-review-packet.md`, `lib/content.ts`, `lib/ai.ts`, `scripts/run-evals.mjs`, `content/eval-report.json`, `public/eval-report.json`, `WORLD_CLASS_SCORECARD.md`, `PRODUCT_EXCELLENCE_REPORT.md`, `npm test`, `npm run build`, `npm run lint`, `npm run scan:public-safety`, `git diff --check`. Public-safety risk: lower; the change explicitly blocks confidential review material and prevents testimonial-style reputation claims without sufficient evidence.

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
