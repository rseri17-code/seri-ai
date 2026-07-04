# seri.ai

Production-grade personal brand platform for Ravi Seri. This is not a generic resume site; it is a public home for Ravi's thinking around Operational Intelligence, Agentic Systems, Transaction Intelligence, enterprise observability, AI-native incident investigation, knowledge graphs, and AI evaluation.

## Stack

- Next.js App Router, React, TypeScript
- Tailwind CSS and Framer Motion
- Supabase Postgres with pgvector
- OpenAI or Anthropic API
- PostHog analytics
- Vercel deployment

## Core surfaces

- Home
- Ask Ravi
- Ideas
- Architecture Lab
- Projects
- Interactive Resume
- Interview Mode
- Contact
- Admin content dashboard

## Compliance model

The app is designed for approved public content only. The assistant is instructed not to mention internal employer product names, proprietary projects, confidential platform names, internal screenshots, logs, dashboards, or architecture. Unknown or confidential questions should be refused clearly.

Seeded copy is intentionally public-safe and vendor-neutral.

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Environment variables

See `.env.example`.

Required for full production behavior:

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `OPENAI_API_KEY` or `ANTHROPIC_API_KEY`
- `ADMIN_TOKEN`
- `NEXT_PUBLIC_POSTHOG_KEY`

Without model or database keys, `/ask` still runs with a local approved-content fallback so the app is demoable.

## Supabase setup

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the SQL editor.
3. Add the Supabase environment variables to Vercel.
4. Ingest approved public content through `/api/ingest`.

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

## RAG behavior

`/api/ask` follows this sequence:

1. Validate the request.
2. Reject obviously confidential prompts.
3. Retrieve approved context from Supabase pgvector when configured.
4. Fall back to local seeded public content.
5. Generate with OpenAI or Anthropic when configured.
6. Return a grounded answer and source snippets.

## Deployment

Deploy to Vercel:

```bash
vercel
```

Set the environment variables in Vercel project settings, then run:

```bash
npm run build
```

## Content operations

The admin dashboard at `/admin` summarizes seeded content and points editors to the ingestion endpoint. For a hardened production deployment, protect `/admin` at the edge with SSO, Vercel password protection, or middleware that checks an authenticated session.

## Recommended next production hardening

- Add SSO-backed admin authentication.
- Store contact notifications through a transactional email provider.
- Add source-level citations and public URL labels in the chat UI.
- Add automated eval fixtures for refusal behavior, retrieval quality, and Ravi-style tone.
- Add a CMS workflow for approved public articles and architecture notes.
