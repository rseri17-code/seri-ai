# Launch Readiness Report

Date: 2026-07-26

## Baseline State

Before this consolidation loop, seri.ai had strong product surfaces but weak integration:

- Framework existed but did not teach every layer with enough structured detail.
- Map visualized a related model but drifted by using ReasonOps as a layer node.
- Evals displayed numeric trust scores that were not reproduced from live assistant runs.
- Work indexed the product body but did not distinguish finished routes from planned concepts.
- No automated public-safety scan or internal-link validation existed.
- Sitemap and robots routes were missing.

## Final State

This loop consolidated the product spine:

- Framework, Map, Work, Ask, and Evals now share the canonical layer vocabulary.
- Map uses the ten canonical framework layers.
- Ask prompt contract now requires direct answer, relevant framework layer, public source, tradeoff or limitation, related page, and explicit unknowns.
- Evals now present reproducible 66-fixture coverage instead of an unsupported trust score.
- Work uses the canonical content registry and labels planned items clearly.
- Public-safety and internal-link validation scripts were added.
- Sitemap and robots routes were added.
- Required release docs were added.
- The Canonical Doctrine, Reference Architecture, Publication Pack, Evidence Pack, PDF exports, rendered reference diagrams, claim ledger, technical review path, JSON-LD structured data, generated social preview images, and `/llms.txt` discovery manifest were added.
- Start Here, Search, Framework, Operations Room, article pages, project proof pages, product proof pages, and Contact now include explicit handoffs into Ask, source artifacts, reviewer packets, or public proof channels.
- Ask Ravikanth now includes deterministic credibility coverage for architecture judgment, public work, resume/background routing, certifications, LinkedIn signal, GitHub signal, and public-safe limitations.

## Routes Verified

Production build prerendered or registered these launch-critical routes:

- `/`
- `/framework`
- `/map`
- `/investigation-room`
- `/ask`
- `/evals`
- `/library`
- `/patterns`
- `/work`
- `/background`
- `/resume`
- `/contact`
- `/sitemap.xml`
- `/robots.txt`
- `/llms.txt`
- `/opengraph-image`
- `/twitter-image`

Rendered browser review confirmed Home, Map, Operations Room, Evals, and Work loaded without application errors. Direct browser navigation to `/framework`, `/sitemap.xml`, and `/robots.txt` was blocked by the in-app browser extension during this pass, but `npm run build` registered those routes successfully.

## Tests Executed

Executed and passing:

- `npm run validate:content` — validated 10 wiki notes, 9 published.
- `npm run validate:contracts` — validated practitioner review, publication assets, structured data, `/llms.txt`, and social preview contracts.
- `npm run evals` — evaluated 66 Ask Ravikanth trust fixtures, 66 passing.
- `npm run typecheck` — passed.
- `npm run lint` — passed with Next's `next lint` deprecation warning.
- `npm run validate:links` — validated internal links across 88 files.
- `npm run scan:public-safety` — passed across 119 files.
- `npm test` — passed content validation, contract validation, evals, and typecheck.
- `npm run build` — passed and generated 77 routes.
- `git diff --check` — passed.

## Public-Safety Findings

No confidential employer product names, internal screenshots, logs, dashboards, private service names, internal incidents, or proprietary architecture were found during the manual review. Automated scan coverage was added.

## Unsupported Claims Removed

- Numeric public trust score presentation on `/evals`.
- Layer/product confusion on `/map`.

## Remaining Gaps

- Ask evals now include deterministic answer-shape, reference-routing, public-safety, credibility, and public-proof checks, but still do not replace live model-quality grading.
- The doctrine and reference assets are stronger, but still need external practitioner review, independent implementation feedback, and real baseline comparisons before claiming category authority.
- `next lint` is deprecated and should eventually be migrated to the ESLint CLI.
- Mobile rendering has been browser-checked on the updated reference surfaces, but a full manual keyboard/accessibility pass is still recommended before broader launch.

## Launch Recommendation

READY WITH DOCUMENTED LIMITATIONS

The site is coherent enough for public iteration, but not yet a final 10/10 launch. The limitations are specific, bounded, and documented.
