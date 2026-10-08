# Owner-requested FDE recruiting update — 2026-10-08

Ravikanth explicitly authorized the scoped editorial and implementation updates in this task. This supplements CLAUDE_HANDOFF.md; the usual ownership split remains in effect outside this task.

## Diagnosis

The recruiter question about shipped production work and measured outcomes retrieved generic Work proof descriptions. URL-wide boosts promoted multiple unrelated records sharing `/work`. The resume source omitted the role history and outcome statements shown on the Resume page. Synthesis then treated unavailable production metrics as unavailable production experience.

## Change

- One published delivery record powers the Work case study and its Ask source. Existing resume role bullets supply earlier identity and automation outcomes.
- Career-delivery questions retrieve the delivery record and resume first, including when a vector result is stale or generic. Named-topic definition routing does not override that scoped career intent.
- Resume retrieval includes published experience, implementation details, and role outcomes.
- Synthesis distinguishes stated experience, measured outcomes, and synthetic examples. Narrow validation checks reject the observed blanket denial, fabricated quantified AI adoption/impact, and misattributed earlier outcomes when they contradict the retrieved production record.
- The homepage links to the delivery record and welcomes hiring and collaboration. Frozen H1 and primary CTAs are preserved.
- Work provides public code, investigation, evaluation, resume, and contact paths. No new routes or private employer evidence.

## Evidence boundaries

Production AI delivery remains stated professional experience. Its unpublished adoption and performance metrics are not added. Earlier published results cover identity and automation work during May 2022 - May 2025, not AI-agent performance. The original public resume does not provide a measurement method or detailed baseline period; the case study states that limit.

## Validation

The retrieval gate includes seven career-delivery queries, unrelated architecture queries, canonical-source completeness, mocked grounded synthesis, and rejection/fallback for contradictory and fabricated outcomes. The original 124 Ask fixtures and 74 retrieval queries remain. The production-experience answer pin now checks the accomplishment itself rather than the former fallback heading; the homepage pin now checks the owner-authorized hiring invitation.

Full npm test and npm run build passed with the final outcome-validation changes, including 124 Ask fixtures, 74 existing retrieval queries, seven new delivery queries, mocked synthesis checks, and production rendering/performance gates. The documentation update recording these results also requires both gates before publication. The measured source corpus contains 92 entries and 78 unique URLs. Publishing remains 63 assets; the knowledge graph remains 8071 relationships across 10 layers.

Built-site Chromium verification passed at desktop 1440×1000 and mobile 390×844 for home and Work: no horizontal overflow or page errors, the new delivery section and links render, and Background, Resume, Projects, Ask, Contact, and Operations Room return 200. Screenshots were reviewed. Live Groq synthesis and deployed commit verification follow publication; those checks are not claimed here in advance.

## Live synthesis follow-up

The first production release retrieved the right delivery/resume sources and named the accomplishments, but Groq listed earlier metrics and then called documented outcomes limited to deployment, omitting the synthetic boundary. The follow-up scoped prompt explicitly requires all four evidence categories and the earlier role period. Regression checks now reject that observed contradictory scope and answers that omit the demonstration category. The follow-up must pass both full gates before publication and be rechecked live.

The deployed follow-up rejected live synthesis and returned the correct grounded fallback. The final extraction change keeps that fallback below 300 words by extracting the accomplishment, outcomes, and evidence boundaries from the same retrieved record; implementation detail stays in the linked case study. It adds no answer facts. Full test/build gates apply before release.
