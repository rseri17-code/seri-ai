# Beta Release Report

## Changes Made

- Added production guards for Ask Ravikanth and contact APIs: request validation, rate limiting, timeout handling, safe JSON parsing, and service-failure fallbacks.
- Added explicit runtime environment status for optional AI, vector search, contact persistence, and analytics services.
- Hardened public-safety handling for prompt-injection and confidential/private/proprietary requests.
- Expanded Ask Ravikanth deterministic beta fixtures from 9 to 66 and enforced the minimum fixture count in `npm run evals`.
- Redacted public eval report prompts for adversarial public-safety fixtures while preserving internal deterministic coverage.
- Added privacy-conscious analytics hooks for homepage CTA clicks, framework layer selection, Operations Room guided start/completion, Ask submission/success/failure, source-link clicks, Work and Background visits, resume download, contact initiation, beta feedback, and practitioner review.
- Added a non-intrusive beta feedback form and a structured practitioner review form through the existing contact API.
- Added the Operational Intelligence Canonical Doctrine, Reference Architecture, Publication Pack, Evidence Pack, downloadable PDFs, homepage reference shelf, and Ask guide paths for serious technical reviewers.
- Added JSON-LD structured data, `/llms.txt`, canonicalized sitemap entries, and generated Open Graph/Twitter image routes so the reference system is discoverable by browsers, crawlers, social previews, and AI readers.
- Added `npm run validate:contracts` to protect the practitioner-review and publication-asset contract during `npm test` and `npm run build`.
- Added Vercel security headers, production error and loading states, canonical metadata placeholders, Open Graph/Twitter metadata, and reduced-motion CSS.
- Added semantic page-level `h1` support to primary sections on required beta routes.
- Added Operations Room beta details without changing the product model: per-hop timing, hypothesis-state transitions, contradictory evidence, missing-evidence conditions, explicit human approval, and observation/inference/confirmed-fact labels.
- Added executable Ask handoffs across Start Here, Search, Framework, Operations Room, article pages, project proof pages, and product proof pages so visitors can interrogate the body of work without copy/paste.
- Added public proof channels on Contact and reviewer share packets on Artifacts for executives, systems architects, SRE/operations reviewers, and AI governance reviewers.

## Environment Requirements

Required for deployable baseline:

- `NEXT_PUBLIC_SITE_URL`

Optional services. The app remains usable when absent:

- `NEXT_PUBLIC_POSTHOG_KEY`
- `NEXT_PUBLIC_POSTHOG_HOST`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `OPENAI_API_KEY`
- `ANTHROPIC_API_KEY`
- `AI_PROVIDER`
- `OPENAI_CHAT_MODEL`
- `OPENAI_EMBEDDING_MODEL`
- `ANTHROPIC_CHAT_MODEL`

Canonical domain placeholders:

- `NEXT_PUBLIC_SITE_URL=https://seri.ai`
- `NEXT_PUBLIC_CANONICAL_DOMAIN=seri.ai`

## Ask Fixture Coverage

- Fixture count: 66.
- Passing fixtures: 66.
- Model-based evaluation used: false.
- Coverage includes canonical definition, ten framework layers, Operational Intelligence versus observability/AIOps, Transaction Intelligence, evidence graphs, hypothesis lifecycle, replay seeds, evaluation gates, operator control plane, public work/background/navigation, credibility and architecture-judgment questions, experience/career/certification/LinkedIn routing, unsupported metrics, unknown questions, confidential employer questions, prompt-injection attempts, citation presence/validity, related-page routing, public-safe refusal/redirection, Canonical Doctrine routing, Reference Architecture routing, Publication Pack routing, Evidence Pack routing, minimum conformance checklist routing, OI-ROOM-001 benchmark/control-case routing, and falsification-criteria routing.
- Limitation: this is deterministic fixture coverage and answer-shape validation, not live model-quality scoring.

## Analytics Events

- `homepage_cta_click`
- `framework_layer_select`
- `operations_room_guided_start`
- `operations_room_guided_completion`
- `operations_room_expert_mode`
- `ask_question_submit`
- `ask_response_success`
- `ask_response_failure`
- `source_link_click`
- `work_page_visit`
- `background_page_visit`
- `resume_download`
- `contact_initiation`
- `contact_submit_result`
- `beta_feedback_toggle`
- `beta_feedback_submit`
- `practitioner_review_submit`

Analytics intentionally avoids capturing raw prompt text. Ask events capture safe metadata such as category, route, mode, latency, source count, and success/failure.

## Accessibility Results

- Browser-checked required routes at 390px mobile, tablet, and desktop widths.
- No horizontal overflow detected on required routes.
- No unnamed buttons or links detected on required routes.
- Primary required pages now expose page-level `h1` headings.
- Contact and Ask form controls have accessible labels or ARIA labels.
- Global `:focus-visible` styling is present.
- Reduced-motion CSS is present.
- Interactive graph surfaces expose SVG labels and textual fallback summary.
- Limitation: synthetic browser Tab focus inspection reported body focus in the browser-control layer, so focus behavior is CSS/code verified and should be rechecked manually in a real browser session during beta.

## Routes Tested

All returned `200` from the local production server:

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

API smoke tests:

- `/api/ask` normal public question: `200`, fallback answer returned without AI/vector env.
- `/api/ask` confidential/private question: `200`, public-safe refusal returned.
- `/api/ask` invalid payload: `400`.
- `/api/contact` without Supabase persistence: `200`, `stored:false`.

## Public-Safety Result

`npm run scan:public-safety` passed across 119 files.

The public eval report redacts adversarial fixture prompts that intentionally contain public-safety boundary language.

## Verification Commands

Passed:

- `npm run validate:content`
- `npm run validate:contracts`
- `npm run evals`
- `npm run typecheck`
- `npm run lint`
- `npm run validate:links`
- `npm run scan:public-safety`
- `npm test`
- `npm run build`
- `git diff --check`

Latest production artifact verified with `npm run build`. Earlier beta smoke testing verified the required routes against a local production server.

## Deployment

- Vercel CLI was not available in the environment (`command -v vercel` returned no executable).
- No preview deployment was created.
- No production domain was connected or modified.

## Known Limitations

- Local verification ran without configured AI/vector/database/analytics services; fallback behavior was verified, not live provider quality.
- PostHog events require `NEXT_PUBLIC_POSTHOG_KEY` in Vercel.
- Contact, beta feedback, and practitioner review persistence require Supabase configuration and the existing `contact_messages` table with `kind` and `metadata` columns.
- Deterministic Ask evals do not replace future live model grading, human review, or production traffic analysis.
- Browser focus behavior should receive a manual keyboard pass during beta because the automated browser keypress focus check was inconclusive.

## Verdict

READY FOR PRIVATE BETA
