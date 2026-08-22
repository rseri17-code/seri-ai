# Content Architecture

## Source Of Truth

The primary content sources are `content/*.json` and `content/wiki/*.mdx`. `content/site.ts` is the typed export and compatibility layer that re-exports those assets to existing routes, retrieval, publishing, and validation code.

The global site identity, public positioning, compliance boundary, social links, and primary navigation live in `content/site-config.json`.

Homepage-specific thesis proof, public profile links, LinkedIn-derived thesis signals, featured articles, and featured patterns live in `content/home.json`.

Ask Ravikanth prompt rails, thesis lenses, guide paths, and public-interface context cards live in `content/ask.json`.

The professional graph that connects Ravikanth Seri's identity, compact career evolution, seven-stage career story, visitor success questions, capability evidence, proof ledger, review spine, and public-safe relationships lives in `content/professional-graph.json`.

The foundational thesis models live in:

- `content/canonical-definition.json`
- `content/harness-thesis.json`
- `content/builder-dna.json`
- `content/sentinel-context-model.json`

The Operational Intelligence operating model lives in:

- `content/operational-layers.json`
- `content/operational-intelligence-framework.json`
- `content/operational-intelligence-system.json`
- `content/asset-types.json`
- `content/release-model.json`

The canonical registry is `content/content-registry.json`, exported as `contentRegistry`. It maps major public surfaces to:

- title
- slug
- summary
- content type
- route
- status
- framework layers
- related principles
- related patterns
- related artifacts
- related products
- related library assets
- public-safe classification
- created date
- updated date
- SEO metadata

Wiki notes live in `content/wiki/*.mdx` and are included in retrieval only when `status: published`.

The public retrieval index is built in `lib/content.ts` from wiki notes, principles, patterns, projects, articles, and registry entries.

## Route Responsibilities

- `/` explains who Ravikanth Seri is, defines Operational Intelligence, states what he is building, and routes visitors to Framework, Operations Room, Work, Ask, and Background.
- `/framework` teaches the ten-layer Operational Intelligence Framework.
- `/map` visualizes the same ten-layer model and links each layer to related public work.
- `/investigation-room` demonstrates the shared public case `OI-ROOM-001`.
- `/ask` explains and navigates the approved public body of work.
- `/evals` shows reproducible trust fixtures and known limitations.
- `/library` indexes authored public assets.
- `/patterns` indexes reusable architecture patterns.
- `/work` indexes the complete public body of work.
- `/background` and `/resume` provide supporting career evidence.

## Classification Rules

Framework content should define models and concepts.

Pattern content should solve recurring architecture problems.

Artifact content should be inspectable or executable.

Library content should teach.

Product content should express the thesis as a system.

Background content should support credibility without becoming the primary experience.

## Maintenance Rule

New major public work should be added to `content/content-registry.json` first, then linked from Work, Library, Map, or Patterns as appropriate.

Changes to the core Operational Intelligence model should be made in the Operational Intelligence content files, not directly in route components. `npm run validate:content` protects the ten-layer structure, OI-ROOM-001 case identity, layer-state alignment, operator questions, decision packet controls, public-safe guardrails, and release asset shape.
