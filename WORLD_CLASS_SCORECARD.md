# seri.ai World-Class Scorecard

Last updated: 2026-07-28

This scorecard tracks whether seri.ai is becoming a durable public technical reference and personal engineering portfolio for Ravikanth Seri. It is not a marketing score and does not claim public-launch perfection. A category is complete only when evidence proves it, not when the site merely describes it.

## Current Evidence

| Category | Evidence in current product | Remaining gap | Next proof move |
| --- | --- | --- | --- |
| Content authority | Canonical Doctrine, Reference Architecture, Publication Pack, Evidence Pack, Library, Patterns, and Work Index define the Operational Intelligence thesis. | Needs more practitioner-grade examples, external citations, and comparison evidence from repeated use. | Publish benchmark-style field notes that test OI-ROOM-001 against dashboard-only, chatbot-only, and ticket-only baselines. |
| Technical depth | Ten-layer framework, contracts, state machines, decision packet, evidence taxonomy, replay seed, eval gates, and Operations Room artifact are present. | Needs more implementation-neutral schemas, failure modes, and example decision packets across multiple scenarios. | Expand the reference architecture with versioned schemas and conformance examples tied to existing public-safe cases. |
| UX and visual quality | Homepage now opens as Ravikanth's public operating manual for AI-native operations, with primary CTAs protected earlier in the mobile first viewport; Ask Ravikanth is positioned as a public research interface; Operations Room mobile hierarchy suppresses secondary links and intro copy so the live graph appears sooner; evidence taxonomy, answer packet, reviewer paths, and viewport contract validation remain coherent. | Rendered QA found no horizontal overflow or console errors on `/`, `/ask`, and `/investigation-room`, but local production/dev servers were flaky after rebuild attempts, so post-patch screenshot confirmation is still incomplete. Some dense pages still need premium interaction polish and calmer hierarchy. | Re-run visual audits of `/`, `/investigation-room`, `/ask`, `/work`, and `/wiki/operational-intelligence-canonical-doctrine` at mobile/tablet/desktop from a fresh server shell and capture screenshots. |
| Ask Ravi usefulness and safety | API fallback, public-safety refusal, rate limiting, timeout fallback, privacy-safe analytics, answer packet metadata, citations, and 71 deterministic fixtures pass. | Live model-quality grading is not yet proven; vector retrieval quality depends on production Supabase ingestion. | Add reviewer-labeled answer rubrics and compare local fallback, vector retrieval, and model synthesis on the same prompts. |
| Accessibility | Validator checks semantic headings, labels, focus styling, reduced motion, SVG labels, responsive navigation, search, and wiki reading contracts. | Needs browser-based keyboard walkthrough and screen-reader spot checks for the Operations Room and Ask Ravi. | Record manual a11y findings for key workflows and add regressions to validators when automatable. |
| Performance | Homepage first-load JS is 107 kB; Ask is 112 kB; Operations Room is 195 kB; performance budgets pass. | Operations Room remains the heaviest route because it carries the interactive artifact. | Keep Operations Room budget explicit and split only if measured interaction latency or mobile performance regresses. |
| SEO and discovery | Sitemap, robots, RSS, llms.txt, Open Graph image routes, metadata, publishing index, and search are validated. | Needs live search-console style evidence after public deployment and real crawler feedback. | After deployment, inspect indexing, social previews, and query impressions for doctrine, framework, and Operations Room pages. |
| Reliability and SRE maturity | Operations runbook, release checklist, API timeouts, rate limiting, local fallbacks, and deployment validators exist. | Needs deployed observability evidence: uptime, error rate, Ask latency, fallback rate, and contact failure rate. | Add Vercel/PostHog dashboard review notes after beta traffic, using only privacy-safe metadata. |
| Security and privacy | Public-safety scanner, confidential-topic refusal, prompt-injection fixtures, privacy-safe analytics sanitizer, and no raw prompt metadata contract exist. | Needs dependency audit review and production secret-management verification before broader launch. | Run dependency audit, verify env scoping, and document secret rotation/incident steps in the runbook. |
| Maintainability | Content registry, publishing index, route validators, API contracts, deterministic evals, docs, and runbook are in place. | Some major content still lives in large TypeScript data files, making long-term publishing heavier than ideal. | Gradually move high-change publishing assets to MDX/content files without changing public routes. |
| Mobile experience | Responsive layout contracts, `npm run validate:viewport`, and accessibility validation exist; homepage, Ask Ravi, Operations Room, Work, and Doctrine have guarded responsive structures. | Needs real visual inspection at 390px and tablet width for dense interactive flows. | Capture screenshots and fix text density, tap targets, and graph framing issues from the live rendered site. |

## Prioritized Backlog

1. **Operations Room visual QA**: browser-test `/investigation-room` at 390px, tablet, and desktop; fix graph framing, density, and first-task clarity.
2. **Ask Ravi live-answer quality**: add reviewer-labeled rubrics for answer helpfulness, citation usefulness, refusal quality, and route recommendation.
3. **Homepage rendered polish**: verify the new public-operating-manual first impression at desktop and 390px mobile after the CTA-order patch; reduce density if the first viewport still feels like a proof grid.
4. **Doctrine evidence depth**: add citations and field-note evidence that distinguish established foundations from Ravikanth's synthesis.
5. **Publishing migration**: move high-change essays, patterns, and notes out of large TypeScript arrays into scalable content files.
6. **Production observability proof**: document privacy-safe SLO evidence after Vercel beta traffic.
7. **Security review**: run dependency audit, verify env scoping, and document secret rotation.
8. **Mobile manual audit**: capture real viewport evidence for homepage, Ask Ravi, Operations Room, Work, and Doctrine.
9. **External proof loop**: collect practitioner review through the existing contact/review mechanism and convert useful feedback into evidence-pack updates.

## Latest Rendered QA Notes

- `2026-07-28`: Browser-rendered QA against `http://127.0.0.1:3010` before the mobile hierarchy patch found no horizontal overflow and no console errors on `/`, `/ask`, and `/investigation-room` at 390px, 768px, and 1440px.
- Finding: homepage mobile first viewport exposed the H1 and thesis but not the primary CTAs; fixed by moving CTAs before the public-safety paragraph and operating-thesis grid.
- Finding: Operations Room mobile first viewport placed the live visual graph just below the fold; fixed by hiding secondary review/download links on small screens and suppressing explanatory intro copy until `sm`.
- Limitation: post-patch production build/server verification stalled in the local environment after clearing generated `.next` output. Source-level validators now guard the two mobile hierarchy fixes, but fresh rendered screenshots are still required before claiming visual QA complete.

## Completion Rule

Do not call seri.ai complete because a build passes. Completion requires current evidence that the product is clear, authoritative, technically rigorous, accessible, performant, secure, observable, maintainable, public-safe, and representative of Ravikanth Seri's work at a level that would withstand review by experienced engineers, architects, executives, recruiters, and founders.
