# seri.ai Operations Runbook

Status: controlled public beta runbook.

This runbook covers public-safe operation of seri.ai, including static routes, Ask Ravi, contact/practitioner review, analytics, and release validation. It is intentionally vendor-light and assumes optional AI, vector, database, and analytics services may be unavailable.

## Service Scope

- Public site: Next.js App Router on Vercel.
- Dynamic APIs: `/api/ask`, `/api/contact`, `/api/ingest`, `/api/subscribe`.
- Optional services: OpenAI or Anthropic for synthesis, Supabase Postgres/pgvector for persistence and vector search, PostHog for analytics.
- Required public-safety boundary: never publish or log confidential employer systems, proprietary project names, private screenshots, logs, dashboards, credentials, customer data, or private architecture.

## Beta SLO Targets

These are beta operating targets, not historical production guarantees.

| Area | SLI | Beta Target | Evidence |
| --- | --- | --- | --- |
| Public pages | Successful route render for critical routes | 99.5% monthly availability target after deployment | Vercel uptime, route smoke tests |
| Build reliability | `npm run build` completes without route-generation retry warnings | 100% for release candidates | Local/CI build logs |
| Ask Ravi availability | `/api/ask` returns a public-safe answer, refusal, or fallback | 99% monthly success target | `ask_response_success`, `ask_response_failure` |
| Ask Ravi latency | p95 client latency and `server_latency_ms` | Under the 12s synthesis timeout budget | PostHog metadata, API meta |
| Ask grounding | `source_count`, `retrieval_mode`, citation presence | Zero-source spikes investigated | Ask metadata, deterministic evals |
| Public safety | public-safety scan and refusal fixtures pass | 100% before deploy | `npm run scan:public-safety`, `npm run evals` |
| Contact fallback | `/api/contact` returns accepted fallback when persistence is unavailable | 99% monthly success target | API contract tests, contact submit events |

## Safe Telemetry Contract

Allowed Ask metadata:

- `category`
- `mode`
- `route`
- `latency_ms`
- `server_latency_ms`
- `answer_mode`
- `retrieval_mode`
- `source_count`

Forbidden analytics metadata:

- raw `prompt`
- raw `question`
- raw `message`
- `email`
- `name`
- `contact`
- beta feedback free-text fields such as `clear`, `confusing`, `memorable`, or `missing`

Ask modes to monitor:

- `answer_mode`: `ai_synthesis`, `timeout_fallback`, `public_safety_refusal`
- `retrieval_mode`: `local`, `vector`, `vector_fallback`, `blocked`

## Secret Hygiene

Do not commit runtime `.env` files, provider keys, Supabase JWTs, PostHog project keys, bearer tokens, private key blocks, customer data, or production credentials. `.env.example` may contain public URLs and safe placeholders only.

Run `npm run validate:security` before every release candidate. It checks that runtime `.env` files are not tracked, `.gitignore` protects local env files, `.env.example` does not contain real-looking secret values, and tracked text files do not contain common secret-shaped material.

Run `npm run audit:security` before beta deployment or dependency changes. The current dependency policy pins Next.js to the patched release line and uses npm overrides only for narrowly scoped transitive advisories that can be remediated without a framework-major upgrade.

## Alert Signals

Investigate when any of these move above normal baseline:

- `ask_response_failure` increases across a rolling window.
- `answer_mode=timeout_fallback` rises.
- `retrieval_mode=vector_fallback` rises.
- `source_count=0` rises for non-refusal categories.
- `category=public_safety_boundary` rises unexpectedly.
- `/api/contact` returns failures or contact persistence is unavailable longer than intended.
- `npm run build` emits static-generation retry warnings despite the configured static generation timeout and conservative prerender concurrency.
- `npm run scan:public-safety`, `npm run evals`, or `npm run validate:analytics` fails.

## Incident Response

### SEV-1: Public-Safety Exposure Risk

Examples: confidential content appears in public pages, Ask response leaks private details, internal names/screenshots/logs are committed.

1. Stop release or rollback immediately.
2. Remove exposed content from source and generated public assets.
3. Run `npm run scan:public-safety`.
4. Run `npm run evals`.
5. Rebuild with `npm run build`.
6. Redeploy only after the scan and evals pass.
7. Document what was removed and why in the release report or product excellence report.

### SEV-2: Ask Ravi Reliability or Safety Degradation

Examples: timeout fallback spike, vector fallback spike, unsafe refusal behavior, unexpected source loss.

1. Check whether optional AI or Supabase variables changed in Vercel.
2. Verify `/api/ask` locally with no optional services; it must still return local approved-content fallback.
3. Run `npm run validate:api`, `npm run validate:analytics`, and `npm run evals`.
4. If AI synthesis is failing, rely on local fallback until provider configuration is corrected.
5. If vector search is failing, rely on local retrieval until Supabase/pgvector configuration is corrected.

### SEV-3: Contact or Feedback Degradation

Examples: contact form fails, persistence unavailable, practitioner review messages not stored.

1. Run `npm run validate:api`.
2. Check Supabase service role configuration and `contact_messages` schema.
3. Confirm fallback behavior returns `ok:true` and `stored:false` when persistence is unavailable.
4. Do not add email delivery or external posting without explicit authorization.

### SEV-4: Discovery or Content Regression

Examples: broken sitemap/RSS/link, missing route, malformed article, Ask retrieval misses canonical assets.

1. Run `npm run validate:content`.
2. Run `npm run validate:publishing`.
3. Run `npm run validate:discovery`.
4. Run `npm run validate:links`.
5. Rebuild and confirm route generation completes without warnings.

## Rollback

Use the least risky rollback that restores public safety and availability.

- Vercel: redeploy the previous known-good deployment when available.
- Git: use `git revert <commit>` for a non-destructive source rollback.
- Do not use destructive git operations such as `git reset --hard` unless explicitly authorized.
- Do not connect, disconnect, or modify a production domain without explicit authorization.

## Release Checklist

Run before any beta release candidate:

```bash
npm run validate:content
npm run validate:coherence
npm run validate:contracts
npm run validate:reference
npm run validate:doctrine
npm run validate:deployment
npm run validate:security
npm run validate:routes
npm run validate:publishing
npm run validate:discovery
npm run validate:retrieval
npm run validate:analytics
npm run validate:api
npm run validate:a11y
npm run evals
npm run typecheck
npm run lint
npm run validate:links
npm run scan:public-safety
npm test
npm run build
git diff --check
```

Expected release evidence:

- All commands pass.
- `npm run build` generates all routes without static-generation retry warnings.
- Ask evals report all fixtures passing.
- Public-safety scan passes.
- Performance budgets pass.
- Any live deployment smoke test covers `/`, `/framework`, `/map`, `/investigation-room`, `/ask`, `/evals`, `/library`, `/patterns`, `/work`, `/background`, `/resume`, `/contact`, `/sitemap.xml`, and `/robots.txt`.

## Known Limitations

- Live PostHog dashboard and alert screenshots are not stored in the repository.
- Live model-quality scoring is not enabled by deterministic fixtures alone.
- Manual production visual QA is still required for desktop, tablet, and 390px mobile.
- Portrait reuse remains blocked until the exact intended image and permission are confirmed.
