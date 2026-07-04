# seri.ai

seri.ai is Ravi Seri's public Operational Intelligence knowledge platform.

It is not a generic resume site. It is a living product: a public wiki, architecture pattern library, AI-powered body of work, and personal operating system for thinking about Operational Intelligence, Agentic Systems, Transaction Intelligence, enterprise observability, AI-native incident investigation, knowledge graphs, operational memory, and AI evaluation.

## Product Vision

A visitor should leave thinking:

> This is not a resume. This person has a category, a language, a system, and a serious body of thinking.

The site is built around public-safe content only. Do not publish employer-specific product names, internal platform names, confidential projects, internal screenshots, logs, dashboards, proprietary architecture, or company-specific implementation details.

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
- `/ask` — public-grounded Ask Ravi assistant
- `/start-here` — audience-specific paths
- `/wiki` — public notes and content search
- `/principles` — Ravi's principles
- `/patterns` — architecture pattern library
- `/projects` — public-safe project patterns
- `/now` — current focus areas
- `/resume` — interactive public resume
- `/contact` — contact form
- `/changelog` — living product history
- `/search` — search across wiki, principles, patterns, projects, and essays

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

Without model or database keys, `/ask` runs with the local approved-content fallback so the app remains demoable.

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
- `published` — visible publicly and available to Ask Ravi
- `archived` — retained but hidden

Run validation before publishing:

```bash
npm run validate:content
```

## How To Publish Notes

1. Keep the note public-safe and vendor-neutral.
2. Set `status: "published"`.
3. Update `updatedAt`.
4. Run `npm run validate:content`.
5. Run `npm run build`.
6. Commit and push.

## How To Update `/now`

Edit `nowPage` in `content/site.ts`.

Keep it current, specific, and public-safe. It should reflect what Ravi is actively building, studying, writing, avoiding, and exploring.

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

## Ask Ravi Grounding

`/api/ask` retrieves only published public sources from:

- wiki notes
- principles
- patterns
- projects
- essays

The assistant must refuse confidential or employer-specific questions. It should say when a question is not yet covered in the public knowledge base rather than inventing claims, metrics, experience, or implementation details.

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
npm run typecheck
npm run build
```

`npm run build` runs content validation first.

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
- Add automated eval fixtures for Ask Ravi refusal behavior and citation quality.
- Move patterns and principles to MDX if editorial workflow grows.
- Add source-level citation labels for Supabase-ingested documents.
- Add scheduled content review for stale notes.
