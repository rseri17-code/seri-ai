# Consolidation Audit

Date: 2026-07-16

## Baseline

seri.ai is a Next.js public operating system for Ravikanth Seri's work on Operational Intelligence, Agentic SRE, Transaction Intelligence, evidence-driven incident investigation, replayable reasoning, operational memory, evaluation-gated agents, and human-controlled operational action.

The product already contains the required surfaces: Home, Framework, Map, Operations Room, Ask Ravi, Patterns, Evals, Library, Work, Background, Resume, Contact, Admin, API routes, Supabase schema, and Vercel configuration.

## Findings

### 1. Duplicate Concepts

- `canonicalDefinition`, `operationalLayers`, `operationalIntelligenceFramework`, `operationalIntelligenceSystem`, `sentinelContextModel`, `articles`, `patterns`, `projects`, and wiki notes all define adjacent parts of the same product language.
- Status: partially consolidated by using `operationalIntelligenceFramework` as the canonical layer source and adding a typed content registry.

### 2. Conflicting Terminology

- `/map` used "ReasonOps" as a framework node where the canonical model requires "Reasoning Layer".
- `/map` omitted "Operator Layer" from the visual node set.
- Status: fixed in this loop.

### 3. Concepts Defined In Multiple Places

- Operational Intelligence is correctly defined in `canonicalDefinition.short`, `site.description`, `app/layout.tsx`, README, and several pages.
- The definition is consistent, but duplication remains.
- Status: documented limitation. Future updates should import the canonical definition everywhere practical.

### 4. Routes Not Connected

- `/framework` and `/work` are now connected from header and homepage.
- Legacy routes `/ideas`, `/projects`, `/resume`, and `/simulator` remain for compatibility.
- Status: acceptable for launch, but navigation should prefer Library, Artifacts, Background, and Operations Room.

### 5. Framework Layers Missing From Product Surfaces

- `/framework` listed all ten layers but did not teach every layer with definition, problem solved, related pattern, related artifact, and related library asset.
- `/map` used the right vocabulary list but the visual model did not include all ten canonical layers.
- Operations Room demonstrates the model but does not yet label every interaction with explicit framework-stage mapping.
- Status: framework and map improved in this loop; Operations Room remains a documented limitation.

### 6. Unsupported Claims

- Homepage and visual components contain scenario-specific confidence values such as `82% lead hypothesis`. These are simulator scenario values, not production outcomes.
- Resume/background includes quantified career outcomes imported from user-provided resume material. Those remain acceptable as background evidence but should not be repeated as product claims.
- Status: retained where clearly scenario/background; public release report documents this boundary.

### 7. Unsupported Eval Scores

- `/evals` showed a 91 trust score and dimension percentages even though `scripts/run-evals.mjs` validates static fixture metadata rather than live assistant responses.
- Status: fixed by replacing score-led presentation with reproducible fixture coverage and explicit limitations.

### 8. Weak Or Missing Citations

- Ask API returns sources, but generated answer contract was not explicit enough about direct answer, framework layer, source, tradeoff, related page, and unknowns.
- Status: fixed by strengthening the answer contract in the prompt.

### 9. Orphan Content

- Wiki notes are discoverable from `/wiki` and search but not fully integrated into Work as canonical library assets.
- Status: partially improved through registry and Work links. More library cross-linking remains.

### 10. Broken Or Weak Navigation Paths

- Main nav was overloaded but functional.
- User journeys are mostly possible within two clicks, except some artifact/model items in Work were absent or implicit.
- Status: Work index expanded with planned labels where no route exists.

### 11. Compliance Risks

- Content includes many public-safety guardrails and refusal language.
- No internal employer product names, internal logs, screenshots, dashboards, or proprietary architecture were found in source scans.
- Status: acceptable with automated scan added.

### 12. Generic Content

- Some article bodies are concise and useful, but several canonical assets remain closer to short essays than substantive reference assets.
- Status: documented limitation. Not expanded in this loop because the mission prioritizes consolidation over new scope.

### 13. Explains But Does Not Teach

- `/framework` needed stronger teaching fields per layer.
- `/map` needed clearer category/layer/product distinction.
- Status: improved in this loop.

### 14. ReasonOps Overshadowing Operational Intelligence

- `/map` and homepage had ReasonOps prominent enough to blur category versus product expression.
- Status: map fixed; homepage still mentions ReasonOps but keeps Operational Intelligence as category.

### 15. Ravikanth Identity Too Weak Or Too Dominant

- Current homepage identifies Ravikanth without turning the site into a resume.
- Work and Background provide career evidence paths.
- Status: acceptable.

### 16. Launch-Affecting Technical Debt

- No `sitemap.ts`, `robots.ts`, route-level error boundary, or loading state existed.
- No broken-link validator or public-safety scanner existed as scripts.
- `next lint` works today but is deprecated.
- Status: sitemap, robots, link validation, and public-safety scan added. Error/loading boundaries remain documented limitations.

## Priority Backlog

P0:
- Keep public-safety scans passing.
- Keep unsupported eval scores out of the public UI.

P1:
- Finish explicit framework mapping inside Operations Room stages.
- Expand canonical assets into deeper public-safe reference material.
- Make Ask tests exercise actual answer shape, not only fixture metadata.

P2:
- Add route-level error/loading states.
- Simplify navigation after user testing.
- Add keyboard/focus audit snapshots.

P3:
- Visual polish only after content and integration gaps are closed.
