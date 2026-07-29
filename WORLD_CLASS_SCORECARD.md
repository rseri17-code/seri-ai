# seri.ai World-Class Scorecard

Last updated: 2026-07-28

This scorecard tracks whether seri.ai is becoming a durable public technical reference and personal engineering portfolio for Ravikanth Seri. It is not a marketing score and does not claim public-launch perfection. A category is complete only when evidence proves it, not when the site merely describes it.

## Current Evidence

| Category | Evidence in current product | Remaining gap | Next proof move |
| --- | --- | --- | --- |
| Content authority | Canonical Doctrine, Reference Architecture, Publication Pack, Evidence Pack, Library, Patterns, and Work Index define the Operational Intelligence thesis. | Needs more practitioner-grade examples, external citations, and comparison evidence from repeated use. | Publish benchmark-style field notes that test OI-ROOM-001 against dashboard-only, chatbot-only, and ticket-only baselines. |
| Technical depth | Ten-layer framework, contracts, state machines, decision packet, evidence taxonomy, replay seed, eval gates, and Operations Room artifact are present. | Needs more implementation-neutral schemas, failure modes, and example decision packets across multiple scenarios. | Expand the reference architecture with versioned schemas and conformance examples tied to existing public-safe cases. |
| UX and visual quality | Homepage now opens as Ravikanth's public operating manual for AI-native operations, with primary CTAs protected earlier in the mobile first viewport; the global loading shell no longer exposes internal "Loading public context" copy; the header uses an abstract operational graph mark instead of a plain letter tile; the homepage hero proof clusters were moved into deliberate proof/falsification sections; the Operations Room hero artifact is now a compact executive preview rather than a full simulator board; Ask Ravikanth is positioned as a public research interface; evidence taxonomy, answer packet, reviewer paths, and viewport contract validation remain coherent. | Rendered QA found no horizontal overflow or console errors on `/`, `/ask`, and `/investigation-room`; production build and server startup now pass after stopping stale local Next processes. Browser screenshot capture remains incomplete, and the in-app browser viewport extractor remains flaky after reload. Some dense pages still need premium interaction polish and calmer hierarchy. | Re-run visual audits of `/`, `/investigation-room`, `/ask`, `/work`, and `/wiki/operational-intelligence-canonical-doctrine` at mobile/tablet/desktop from a fresh browser session and capture screenshots. |
| Ask Ravi usefulness and safety | API fallback, public-safety refusal, rate limiting, timeout fallback, privacy-safe analytics, answer packet metadata, citations, 71 deterministic fixtures, and a Live answer rubric for reviewer-labeled sessions are present. | Live model-quality grading is not yet proven; vector retrieval quality depends on production Supabase ingestion; No aggregate quality score should be published until reviewer-labeled sessions exist. | Use the reviewer-labeled answer rubrics to compare local fallback, vector retrieval, and model synthesis on the same prompts using safe metadata only. |
| Accessibility | Validator checks semantic headings, labels, focus styling, reduced motion, SVG labels, responsive navigation, search, and wiki reading contracts. | Needs browser-based keyboard walkthrough and screen-reader spot checks for the Operations Room and Ask Ravi. | Record manual a11y findings for key workflows and add regressions to validators when automatable. |
| Performance | Homepage first-load JS is 107 kB; Ask is 112 kB; Operations Room is 195 kB; performance budgets pass. | Operations Room remains the heaviest route because it carries the interactive artifact. | Keep Operations Room budget explicit and split only if measured interaction latency or mobile performance regresses. |
| SEO and discovery | Sitemap, robots, RSS, llms.txt, Open Graph image routes, metadata, publishing index, and search are validated. | Needs live search-console style evidence after public deployment and real crawler feedback. | After deployment, inspect indexing, social previews, and query impressions for doctrine, framework, and Operations Room pages. |
| Reliability and SRE maturity | Operations runbook, release checklist, API timeouts, rate limiting, local fallbacks, and deployment validators exist. | Needs deployed observability evidence: uptime, error rate, Ask latency, fallback rate, and contact failure rate. | Add Vercel/PostHog dashboard review notes after beta traffic, using only privacy-safe metadata. |
| Security and privacy | Public-safety scanner, confidential-topic refusal, prompt-injection fixtures, privacy-safe analytics sanitizer, and no raw prompt metadata contract exist. | Needs dependency audit review and production secret-management verification before broader launch. | Run dependency audit, verify env scoping, and document secret rotation/incident steps in the runbook. |
| Maintainability | Content registry, publishing index, route validators, API contracts, deterministic evals, docs, and runbook are in place. | Some major content still lives in large TypeScript data files, making long-term publishing heavier than ideal. | Gradually move high-change publishing assets to MDX/content files without changing public routes. |
| Mobile experience | Responsive layout contracts, `npm run validate:viewport`, and accessibility validation exist; homepage, Ask Ravi, Operations Room, Work, and Doctrine have guarded responsive structures. | Needs real visual inspection at 390px and tablet width for dense interactive flows. | Capture screenshots and fix text density, tap targets, and graph framing issues from the live rendered site. |

## Prioritized Backlog

1. **Operations Room visual QA**: browser-test `/investigation-room` at 390px, tablet, and desktop; fix graph framing, density, and first-task clarity.
2. **Ask Ravi live-answer quality**: run reviewer-labeled answer rubrics for answer helpfulness, citation usefulness, refusal quality, and route recommendation; publish no aggregate score until multiple reviewed sessions exist.
3. **Homepage rendered polish**: verify the new public-operating-manual first impression at desktop and 390px mobile after the CTA-order patch; reduce density if the first viewport still feels like a proof grid.
4. **Doctrine evidence depth**: add citations and field-note evidence that distinguish established foundations from Ravikanth's synthesis.
5. **Publishing migration**: move high-change essays, patterns, and notes out of large TypeScript arrays into scalable content files.
6. **Production observability proof**: document privacy-safe SLO evidence after Vercel beta traffic.
7. **Security review**: run dependency audit, verify env scoping, and document secret rotation.
8. **Mobile manual audit**: capture real viewport evidence for homepage, Ask Ravi, Operations Room, Work, and Doctrine.
9. **External proof loop**: collect practitioner review through the existing contact/review mechanism and convert useful feedback into evidence-pack updates.

## Latest Rendered QA Notes

- `2026-07-28`: Replaced the global loading fallback text with a quiet skeleton, replaced the header letter tile with an abstract operational graph mark, and rewrote the homepage trust sentence so the first viewport leads with inspection, evidence, and reusable doctrine rather than defensive compliance language.
- Rendered smoke test against rebuilt production server at `http://127.0.0.1:3014` confirmed `/` shows the real H1 immediately, does not include `Loading public context`, includes the new inspection/trust sentence, and has no horizontal overflow at default and 390px mobile viewport.
- Validation evidence: public-safety scan, content coherence, viewport contracts, Ask-quality validator, focused lint on touched files, `npm run typecheck`, full `npm run build`, all 71 deterministic Ask Ravi fixtures, accessibility validation across 35 pages and 21 components, and performance budgets passed.
- `2026-07-28`: Reduced homepage hero density by replacing four mini thesis cards with a compact operating-flow line, moving proof metrics into a dedicated "Proof surface" section, moving falsification criteria into a dedicated section, and converting the Operations Room hero artifact from a tall simulator board into a compact graph-plus-receipts preview.
- Rendered measurement after rebuild showed the desktop hero reduced from roughly 1488px before this visual pass to 649px in the successful 1440px measurement; the page reported no horizontal overflow and the old hero proof-cell text was absent. The browser viewport extractor returned inconsistent empty values after reload, so this remains evidence of improvement rather than final screenshot-grade visual QA.
- Validation evidence: focused lint, `npm run typecheck`, content coherence, viewport contracts, full `npm run build`, all 71 deterministic Ask Ravi fixtures, accessibility validation, and performance budgets passed.
- `2026-07-28`: Browser-rendered QA against `http://127.0.0.1:3010` before the mobile hierarchy patch found no horizontal overflow and no console errors on `/`, `/ask`, and `/investigation-room` at 390px, 768px, and 1440px.
- Finding: homepage mobile first viewport exposed the H1 and thesis but not the primary CTAs; fixed by moving CTAs before the public-safety paragraph and operating-thesis grid.
- Finding: Operations Room mobile first viewport placed the live visual graph just below the fold; fixed by hiding secondary review/download links on small screens and suppressing explanatory intro copy until `sm`.
- Build recovery: after stopping stale local Next processes and rebuilding from a clean `.next`, production `next build` passed, generated all 77 routes, and performance budgets passed.
- Post-patch rendered QA: built app served at `http://127.0.0.1:3012`; `/`, `/ask`, and `/investigation-room` reported no console errors and no horizontal overflow. The Operations Room live graph was visible in the narrow-width pass after the hierarchy patch.
- Limitation: the in-app browser viewport override returned inconsistent client widths on some passes, so fresh screenshot capture from a clean browser session is still required before claiming visual QA complete.

## Latest Ask Ravi Quality Notes

- `2026-07-28`: Added the Ask Ravi Live Answer Quality Rubric with 10 human-review dimensions, 4 qualitative labels, 12 live review prompt categories, safe metadata reporting rules, and explicit no-score-until-reviewed-session guidance.
- The rubric is now visible on `/evals`, exported through `content/site.ts`, and enforced by `npm run validate:ask-quality` inside both `npm run build` and `npm test`.
- `/evals` now shows 24 representative fixtures and links to `/eval-report.json` for the full 71-fixture report, keeping the critical route under the HTML performance budget.
- Validation evidence: `validate:ask-quality`, public-safety scan, content coherence, type validation inside `next build`, all 71 deterministic Ask Ravi fixtures, production build, and performance budgets passed.

## Completion Rule

Do not call seri.ai complete because a build passes. Completion requires current evidence that the product is clear, authoritative, technically rigorous, accessible, performant, secure, observable, maintainable, public-safe, and representative of Ravikanth Seri's work at a level that would withstand review by experienced engineers, architects, executives, recruiters, and founders.
