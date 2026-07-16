# seri.ai

seri.ai is Ravikanth Seri's public operating system for Operational Intelligence.

It is not a resume website, portfolio template, job-search landing page, or showcase of confidential employer work. It is a living product lab, public wiki, architecture pattern library, grounded assistant, and body of work around AI-native enterprise operations.

## Product Vision

A visitor should leave thinking:

> This is the home of Operational Intelligence. Ravikanth Seri is building a serious language, system, and body of work around AI-native enterprise operations.

Canonical definition:

> Operational Intelligence is the reasoning layer between enterprise telemetry and human decision.

seri.ai is the public operating system. Operational Intelligence is the category. ReasonOps is the product/platform expression. Operations Room is the interactive artifact. Ask Ravikanth is the grounded public assistant. Background is secondary evidence.

The site is built around public-safe content only. Do not publish employer-specific product names, internal platform names, confidential projects, internal screenshots, logs, dashboards, proprietary architecture, or company-specific implementation details.

## Product Spine

The Map, Operations Room, and Ask Ravikanth should feel like one system, not separate pages.

Shared case:

- `OI-ROOM-001` — Customer transaction degradation

Shared loop:

- Map the operating model in `/map`
- Run the case in `/investigation-room`
- Interrogate the reasoning in `/ask`

When adding new product surfaces, connect them to `operationalIntelligenceSystem` in `content/site.ts` so the thesis, artifact, and assistant stay aligned.

## Ravikanth Builder DNA

The public site should reflect Ravikanth's actual product instincts:

- deterministic first
- proof-driven
- bounded autonomy
- evidence receipts
- replay as trust
- operator control plane

These ideas are public-safe translations of AI-native incident investigation work. Do not copy private implementation details, employer systems, confidential screenshots, logs, or proprietary architecture into the site.

## Sentinel Context Translation

Sentinel-style product work should influence `seri.ai` as public-safe category language, not as exposed implementation detail.

Translate the intent into:

- evidence graph
- hypothesis lifecycle
- decision trace
- replay seed
- outcome memory
- continuous learning loop
- operator control plane

Avoid copying private repository internals, vendor-specific wiring, generated receipts, logs, credentials, customer data, screenshots, or exact architecture diagrams.

## Stack

- Next.js App Router, React, TypeScript
- Tailwind CSS and Framer Motion
- MDX-style wiki notes with frontmatter
- Supabase Postgres with pgvector
- OpenAI or Anthropic API
- PostHog analytics
- Vercel deployment

## Core Routes

- `/` — home
- `/work` — canonical index of Ravikanth's public systems, frameworks, artifacts, writing, and background
- `/framework` — Operational Intelligence Framework reference
- `/start-here` — audience-specific paths
- `/map` — Operational Intelligence knowledge map
- `/manifesto` — founding thesis: Operational Intelligence Is the New Control Plane
- `/library` — essays, memos, notes, field guides, and public assets
- `/patterns` — architecture pattern library
- `/products/reasonops` — ReasonOps product/platform concept
- `/investigation-room` — signature evidence-first Operations Room artifact
- `/artifacts` — public-safe proof objects and release model
- `/ask` — public-grounded Ask Ravikanth assistant
- `/evals` — public trust report for Ask Ravikanth behavior
- `/radar` — market thesis radar for Operational Intelligence trends
- `/wiki` — public notes and content search
- `/principles` — Ravikanth's principles
- `/products` — public product concepts under seri.ai
- `/now` — current focus areas
- `/background` — resume/career evidence as secondary proof
- `/contact` — contact form
- `/changelog` — living product history
- `/search` — search across wiki, principles, patterns, artifacts, and essays

Legacy routes such as `/ideas`, `/projects`, `/resume`, and `/simulator` may remain for compatibility, but new navigation should prefer Library, Artifacts, Background, and Operations Room.

## Operational Intelligence Vocabulary

Every page should reinforce the shared vocabulary:

- Signal Layer
- Transaction Layer
- Topology Layer
- Evidence Layer
- Reasoning Layer
- Memory Layer
- Evaluation Layer
- Decision Layer
- Learning Layer
- Operator Layer

Use this language before inventing new terms.

## Content Asset Model

Treat every content item as an asset, not a blog post.

Preferred asset types:

- Manifesto
- Pattern
- Field Guide
- Product Brief
- Map
- Artifact
- Principle
- Radar Note
- Memo
- Background Entry

Target cadence:

- one new pattern, memo, artifact, or field guide per month
- one quarterly State of Operational Intelligence memo
- changelog entry for visible product evolution

## Local Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Environment Variables

See `.env.example`.

Required for full production behavior:

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `OPENAI_API_KEY` or `ANTHROPIC_API_KEY`
- `ADMIN_TOKEN`
- `NEXT_PUBLIC_POSTHOG_KEY`

Without model or database keys, `/ask` runs with the local approved-content fallback so the app remains locally inspectable.

## How To Add Wiki Notes

Create a new `.mdx` file in `content/wiki`.

Required frontmatter:

```mdx
---
title: "Evidence Before Conclusions"
description: "Why AI incident systems must ground every answer in evidence."
category: "Principles"
tags: ["Operational Intelligence", "AI Evaluation", "Incident Intelligence"]
status: "published"
createdAt: "2026-07-05"
updatedAt: "2026-07-05"
related: ["operational-memory"]
---

Write the public-safe note here.
```

Valid statuses:

- `draft` — validated but hidden from public routes and search
- `published` — visible publicly and available to Ask Ravikanth
- `archived` — retained but hidden

Run validation before publishing:

```bash
npm run validate:content
```

## Launch Validation

Before public release, run:

```bash
npm run validate:content
npm run evals
npm run typecheck
npm run lint
npm run validate:links
npm run scan:public-safety
npm test
npm run build
git diff --check
```

`/evals` reports deterministic fixture coverage. It is not a live model-quality benchmark unless production model keys and answer-level grading are added.

## Canonical Content Registry

Major public surfaces should be registered in `contentRegistry` inside `content/site.ts` before they are promoted through Work, Map, Ask, Library, or Patterns.

Each registry item should include route, status, content type, framework layers, related patterns, related artifacts, related products, related library assets, public-safe classification, and SEO metadata.

## How To Publish Notes

1. Keep the note public-safe and vendor-neutral.
2. Set `status: "published"`.
3. Update `updatedAt`.
4. Run `npm run validate:content`.
5. Run `npm run build`.
6. Commit and push.

## How To Update `/now`

Edit `nowPage` in `content/site.ts`.

Keep it current, specific, and public-safe. It should reflect what Ravikanth is actively building, studying, writing, avoiding, and exploring.

## How To Add A Principle

Edit the `principles` array in `content/site.ts`.

Each principle needs:

- `slug`
- `statement`
- `explanation`
- `example`
- `tags`
- `related`

Principles should be memorable, reusable, and connected to wiki notes or patterns.

## How To Add Architecture Patterns

Edit the `patterns` array in `content/site.ts`.

Each pattern must include:

- problem
- context
- forces / tradeoffs
- architecture
- failure modes
- evaluation
- when to use
- when not to use
- related notes

Patterns should describe public-safe architecture ideas, not internal implementations.

## Ask Ravikanth Grounding

`/api/ask` retrieves only published public sources from:

- wiki notes
- principles
- patterns
- artifacts/project patterns
- essays

The assistant must refuse confidential or employer-specific questions. It should say when a question is not yet covered in the public knowledge base rather than inventing claims, metrics, experience, or implementation details. When refusing, redirect to public architecture patterns such as evidence-driven RCA, transaction journey reconstruction, operational memory, topology-aware reasoning, evaluation and replay, and human-in-the-loop operational AI.

## Supabase Setup

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the SQL editor.
3. Add Supabase environment variables to Vercel.
4. Ingest approved public content through `/api/ingest` if you want pgvector retrieval beyond local content.

Example ingestion:

```bash
curl -X POST http://localhost:3000/api/ingest \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Operational Intelligence Note",
    "source_type": "architecture_note",
    "content": "Operational Intelligence connects telemetry, transaction context, dependency graphs, and decision workflows into a reasoning layer for enterprise operations.",
    "public_safe": true
  }'
```

## Validation And Build

```bash
npm run validate:content
npm run evals
npm run typecheck
npm run build
```

`npm run build` runs content validation and the Ask Ravikanth trust fixtures before building.
`npm test` runs content validation, the Ask Ravikanth trust fixtures, and TypeScript checks.

## Deployment

Deploy to Vercel:

```bash
vercel
```

Set environment variables in Vercel project settings, then run:

```bash
npm run build
```

## Recommended Production Hardening

- Add SSO-backed admin authentication.
- Connect newsletter capture to Resend, ConvertKit, or another email provider.
- Add automated eval fixtures for Ask Ravikanth refusal behavior and citation quality.
- Move patterns and principles to MDX if editorial workflow grows.
- Add source-level citation labels for Supabase-ingested documents.
- Add scheduled content review for stale notes.
