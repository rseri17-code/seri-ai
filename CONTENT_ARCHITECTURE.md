# Content Architecture

## Source Of Truth

The primary content source is `content/site.ts`.

The canonical registry is `contentRegistry`. It maps major public surfaces to:

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

New major public work should be added to `contentRegistry` first, then linked from Work, Library, Map, or Patterns as appropriate.
