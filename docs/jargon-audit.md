# Jargon audit — observe only (aligned to Verify)

**Status:** OBSERVE. No site copy was changed in this PR.  
**Repo (confirmed `git remote`):** `https://github.com/rseri17-code/seri-ai`  
**Live audited:** https://seri-ai.vercel.app (production; matches `origin/main` at audit time)  
**Date:** 2026-09-21  
**Verify baseline:** cloud agent [Verify: jargon-clarity check](https://cursor.com/agents/bc-16308666-c5f8-5b07-af52-6956a66317b3) published a live FAIL list. That list is the **source of truth** for what already fails. This file does not contradict it. Glosses from merged PR #7 are **not** a pass.

**Verify scores (live, not Act):** peers 6/10 · hiring managers 4/10 · overall vs “no jargon” 4/10. Live site **fails** the user ask until Act ships.

---

## How to use this inventory

1. Treat **§ Verify FAIL list** as mandatory. Act must make each item make sense, or leave it as a named term **with a plain clause on first touch**. A nearby gloss that still leaves the label dominating the first screen is still FAIL.
2. Then do **§ Extra jargon Verify missed** (evidence-backed; live quotes). These are additive, not a rival FAIL list.
3. Prefer **shared components** (`home-orientation.tsx` and `framework-architecture-map.tsx` share map language).
4. Do **not** dumb down the idea. Replace the word; keep the claim. Work-first, not a hiring brochure.
5. After copy moves, **repoint validator pins** in the same commit. Do not write copy to feed a grep.

---

## Observe v1 corrections (do not reuse)

Earlier Observe draft contradicted Verify without evidence. **Withdrawn:**

| Observe v1 claim | Verify baseline | Alignment |
| --- | --- | --- |
| Authorized Misfire “already OK / do not redo” | Still FAIL. “Gloss is decent” but coined label remains. Keep the **name**; clause is **required**. | FAIL. Do not treat the existing clause as a pass. Do not drop the clause. |
| Context Acquisition Tax “partially glossed” as if nearly done | “Gloss helps, label still opaque.” | FAIL. Keep or improve the four-answer clause; label still needs first-touch sense. |
| Frozen H1 omitted from FAIL | **evidence-grounded AI systems** is FAIL for opacity; Act **must not rewrite** H1 — gloss nearby. | Opacity FAIL + rewrite freeze. |
| AIOps job title omitted from FAIL | **AIOps & Observability** is FAIL (acronym soup); **title is ruled keep**. | Opacity FAIL + rewrite freeze. |
| Staff/Principal line as P0 rewrite into hiring-safe copy | “Hiring-brochure register. Quiet line is OK; must not become the headline.” | Do not promote it. Quiet line may stay. Extra: `AIOps` in that line is **not** the ruled identity title. |
| PR #7 glosses as progress toward pass | “Glosses exist. Coined labels still dominate the first screen. That is the baseline, not a pass.” | Agree. |

---

## Frozen / ruled (Verify + validators)

These can still be **opacity FAILs**. Act must not rewrite the frozen string itself.

| String | Where | Opacity | Act |
| --- | --- | --- | --- |
| `I build evidence-grounded AI systems for enterprise operations.` | Homepage H1 | FAIL (Verify H2) | Do not rewrite. Gloss nearby. |
| `Enter the Operations Room` / `Explore the body of work` | Hero CTAs | — | Ruled stay. |
| `Senior Technical Lead — AIOps & Observability` | Identity card | FAIL (Verify H5) | Keep title. |
| `the Authorized Misfire` | Homepage + `/framework` | FAIL (Verify H12) | Keep name. Keep/strengthen the plain clause. |
| Five-item nav + Ask | Header | Nav label `Operational Intelligence` is FAIL (Verify H1) | Count frozen; label may get a plain hint if it still fits. |
| Hash ids `#harness`, `#taxonomy`, `#context-layer`, `#batch-intelligence`, `#evaluation` | `/framework` | Labels FAIL | Do not rename hashes. |
| Ask cite-or-refuse contract | Ask | Labels FAIL | Keep the rule; plain the words. |

Keep the existing Authorized Misfire clause (validator-pinned):

> an action the system was permitted to take on context it should not have trusted

That clause is **required**, not a pass.

---

## Validator pins that currently encode jargon

Act **must** update these in the same commit as copy, or the build fails. Do not restore jargon to satisfy them.

| Pin (current required substring) | File | Safer pin after rewrite (intent) |
| --- | --- | --- |
| `Enterprise Context Layer is the shared substrate` | `scripts/validate-content.mjs` | First-touch definition of the shared ops context (ownership, change, dependency, transaction) |
| `SRE / Agent Harness` | `scripts/validate-content.mjs` | Named loop + in-breath definition |
| `Context Acquisition Tax` | `scripts/validate-content.mjs` | Keep name **or** keep the four-answer reconstruct definition |
| `Batch Intelligence is proof` / `ten layers are a filing system` | `scripts/validate-content.mjs` | Proof vs filing-system distinction |
| `shared substrate` | `scripts/validate-content-coherence.mjs` | Context Layer is shared / maintained once |
| `Ten-layer taxonomy at a glance` | `validate-content-coherence.mjs`, `validate-rendered-routes.mjs` | Ten filing labels visible without opening explorer |
| `Ask the record` | `validate-content-coherence.mjs`, `validate-viewport-contracts.mjs`, `scripts/review/verify-ask-dock.mjs` | Dock trigger accessible name (whatever the new plain label is) |
| `Harness over model` | `validate-content-coherence.mjs`, `validate-rendered-routes.mjs` | Theme still present on `/work` |
| challenge chips must include `falsif`, `weakest`, `prove` | `scripts/validate-content.mjs` | Keep the **challenge intent**; pin plain verbs (`prove … wrong`, `weakest`, `does not prove`) not the word `falsify` |
| Playwright `getByRole("button", { name: "Ask the record" })` | `scripts/review/verify-ask-dock.mjs` | Match new dock label |

---

## Verify FAIL list (canonical live baseline)

Copied from Verify’s published table. File paths are current `main`. IDs (`H1`…) are Observe’s, for Act tracing.

**Verify’s instruction to Act:** make these make sense, or leave as named terms with a plain clause on first touch.

### Homepage — `app/page.tsx`, `components/home-orientation.tsx`, `components/header.tsx`, `components/evidence-ladder.tsx`

Live: https://seri-ai.vercel.app/

| ID | Opaque phrase (Verify) | Why it fails a non-specialist | Notes (Verify) |
| --- | --- | --- | --- |
| H1 | Nav: **Operational Intelligence** | Invented product name as a menu item | `components/header.tsx` |
| H2 | **evidence-grounded AI systems** | Frozen H1 — Act must not rewrite | Ruled; gloss nearby instead |
| H3 | **attributable evidence** | Sounds like a paper, not a product | Hero lead |
| H4 | **operationalization** | Internal process word | Hero |
| H5 | **AIOps & Observability** | Acronym soup | Identity card; title is ruled keep |
| H6 | **Operational Intelligence** / **enterprise telemetry** | “Telemetry” is still shop talk even with the reasoning-layer gloss | 30s map |
| H7 | **Enterprise Context Layer** / **shared substrate** | Architecture-speak | Map |
| H8 | **Context Acquisition Tax** | Coined; gloss helps, label still opaque | Map |
| H9 | **SRE / Agent Harness** | Two specialist terms stacked | Map + Builds |
| H10 | **Batch Intelligence** / **execution-graph proof** / **taxonomy layers** | Three coined ideas in one sentence | Map + ladder |
| H11 | **eval gate** | Insider eval slang | Harness loop |
| H12 | **the Authorized Misfire** | Ruled term; gloss is decent | Keep name; clause is required |
| H13 | **bounded execution, attributable findings, governed tool-call model** | Stack of opaque nouns | Selected work |
| H14 | **Staff / Principal … AIOps** | Hiring-brochure register | Quiet line is OK; must not become the headline |

### `/framework` — `app/framework/page.tsx`, `components/framework-architecture-map.tsx`, `components/batch-intelligence-proof.tsx`

Live: https://seri-ai.vercel.app/framework

| ID | Opaque phrase (Verify) | Why it fails |
| --- | --- | --- |
| F1 | **blast radius**, **topology path** | Incident jargon without a one-line meaning |
| F2 | **GROUNDED RCA** / **EXPLICIT UNKNOWN** | All-caps lab labels |
| F3 | **CMDB, ITSM, CI/CD** | Tool alphabet in the Context Acquisition Tax paragraph |
| F4 | **evidence graph, hypothesis lifecycle, decision trace, replay seed** | Six coined objects in one sentence |
| F5 | **AgentOps**, **data plane**, **Operator Control Plane** | Vendor/category jargon |
| F6 | **conformance**, **falsification**, **falsifier** | Reviewer dialect on first scroll |
| F7 | Meta: **Agentic SRE**, **eval-gated agents** | First thing Google/social shows |

Live re-check (do not contradict): F5 `AgentOps` and `operational data plane` appear in the thesis-radar block on `/framework` (`content/thesis-radar.json`). `Operator Control Plane` is a ten-layer “Room stage” label. F6 `falsifier` is in the radar summary (“each paired with its falsifier”) and sticky destination “Eval gates and falsifiers”.

### `/ask` chrome — `components/chat.tsx`, `components/ask-dock.tsx`

Live: https://seri-ai.vercel.app/ask

| ID | Opaque phrase (Verify) | Why it fails |
| --- | --- | --- |
| A1 | **Mode / local · Sources / pending · Layers · Boundary · LLM provider · LLM used** | Debugger chrome, not visitor chrome |
| A2 | **Answer packet** | Internal review object as UI title |
| A3 | **intentionally deterministic and source-scoped** | Engineer dialect |
| A4 | Dock: **Ask the record** | Clearer than Ask Ravikanth; still unexplained on first open |

### `/work` + ops + projects — `app/work/page.tsx`, `app/investigation-room/page.tsx`, `content/projects.json`

Live: https://seri-ai.vercel.app/work · `/investigation-room` · `/projects`

| ID | Opaque phrase (Verify) | Why it fails |
| --- | --- | --- |
| W1 | **agentic operations**, **evaluation harness**, **Replay Seed**, **conformance profile** | Specialist inventory |
| W2 | **OI-ROOM-001**, **MCP request · logs/metrics/traces/topology** | Lab + protocol names on the proof artifact |
| W3 | **Evaluation gate**, **Decision packet**, **exportable RCA packet**, **RAG**, **golden datasets** | Ops/projects cards assume the reader already lives in this stack |
| W4 | **Sentinalai** (if still linked) | Unexplained product name |

**W4 confirmed live:** `/work` still links the word `Sentinalai` (`app/work/page.tsx`) to `https://github.com/rseri17-code/Sentinalai.git` (`content/public-code.json`). Naming is flagged for Ravikanth in `PROJECT_LEAD_ASSIGNMENTS.md`; Act should define it in-breath (“public GitHub repo Sentinalai”) and must not invent a rename.

### What Verify said already works (do not regress)

Not a jargon pass. Do not undo:

- Work-first, not a recruiting brochure: private system, inspectable public proofs, Contact as a quiet line.
- Authorized Misfire and Context Acquisition Tax **have** first-touch clauses (still FAIL as labels).
- Evidence ladder is a path through work, not a CV.
- Frozen H1 and five-item nav + Ask.

---

## Extra jargon Verify missed

Additive only. Live quotes checked on production and `main`. These are not a reason to drop any Verify row.

| ID | Phrase (quote exact) | Why opaque | Proposed plain replacement | Path | Why it is extra |
| --- | --- | --- | --- | --- | --- |
| X1 | `Grounding receipts` | RAG/ML for “pages we used” | `Sources used` | `components/chat.tsx` | Ask sidebar title; not in A1–A4 |
| X2 | `What would falsify the harness-over-model claim?` | “Falsify” + coined claim in a dock chip | `What would prove the “loop matters more than the model” idea wrong?` | `content/ask.json` `askChallengeChips` | Verify audited Ask chrome, not chip copy. Related to F6/H9, but this string is site-wide dock. |
| X3 | `What would falsify the Agent Harness claim?` / `How should a reviewer challenge the ten-layer taxonomy?` / `What is Authorized Misfire in one scene?` / `What is the wrong answer to Context Acquisition Tax?` | Coined names with no in-chip clause | Define in the chip, or use the plain clause in the same breath | `content/ask.json` route chips | Same |
| X4 | Sticky nav: `Harness` · `Taxonomy` · `Eval / falsifiers` | First-scroll `/framework` chrome | `Agent loop` · `Ten layers` · `Checks / what would prove it wrong` | `components/framework-section-nav.tsx` | Verify named page/map/batch, not sticky labels. Hashes stay. |
| X5 | Map arrows `grounds` / copy `Grounds in the context layer` / `the agent grounds itself` | Retrieval verb | `reads from` / `starts from the shared context` | `home-orientation.tsx`, `framework-architecture-map.tsx`, `app/framework/page.tsx` | Adjacent to H7/H9; word itself not listed |
| X6 | `Read the doctrine, and what would prove it wrong` / `Doctrine v1.0` / `public doctrine` | Internal canon | `written model` | `app/page.tsx`, `app/work/page.tsx`, `app/ask/page.tsx` | Not on Verify tables |
| X7 | `provenance` / `source provenance` / `provenance: checked-in OI-ROOM-001 fixture` | Archival/legal | `where the evidence came from` / `source: demo data file` | home.json dek; `sre-reference-run.tsx`; professional-graph | W2 covers MCP/OI-ROOM; not provenance |
| X8 | Meta: `Agentic SRE, ReasonOps` | Unexplained brands in `/work` SERP | Spell or drop `ReasonOps` unless defined on-page | `app/work/page.tsx` `metadata.description` | Verify F7 is `/framework` meta only |
| X9 | `eval gates` / `evaluation gates` in site OG/Twitter | Same slang as H11, off-page | `checks before a conclusion is trusted` | `app/layout.tsx` | Site-wide social preview |
| X10 | Packet values `matched after retrieval`, `provider_none`, `thin_retrieval`, `ms synthesis guard` | Debugger values inside A1/A2 | Human labels; do not change API enums | `components/chat.tsx` | A1 named the **row labels**; these are the raw **values** |
| X11 | `public-safe proofs` / `public-safe fixture` | House dialect | `shareable examples (no private systems)` / `public demo data` | `home-orientation.tsx`, `sre-reference-run.tsx` | Footer already has a plain second sentence |
| X12 | `Ten-layer taxonomy at a glance` | Taxonomy as UI heading | `Ten filing labels at a glance` | `components/framework-layer-overview.tsx` | H10/F mentioned taxonomy; this is the table title (also validator-pinned) |
| X13 | `enterprise SRE investigation agent` (hero, unexpanded) | SRE acronym on first production proof | Spell site reliability on first use | `app/page.tsx` | Verify flagged SRE inside **SRE / Agent Harness** (H9), not this hero sentence |
| X14 | `machine reasoning` | Abstract | `automated analysis that still shows its work` | `app/page.tsx` hero lead | Next to H3 |
| X15 | `What the public corpus will answer, cite, and refuse.` | Corpus | `What public pages it will answer from, cite, or decline` | `components/evidence-ladder.tsx` | Ask ladder card |

---

## Counts

| Source | Rows |
| --- | --- |
| Verify FAIL rows (H1–H14, F1–F7, A1–A4, W1–W4) | **29** (several rows are phrase clusters) |
| Extra items Verify missed (X1–X15) | **15** |
| Detailed Act inventory below (unique visitor strings, including repeats of Verify terms with replacements) | Homepage 40 · nav/meta 7 · framework 46 · work 19 · ops-room 14 · Ask/dock 34 · projects 15 · **175** |

The 175 is an Act worklist (every quoted string). The **29 Verify rows are the gate**. Extras are additional first-read holes, especially Ask chips and sticky nav.

---

## Top 10 (Verify-first, then extras)

Order matches Verify’s first-screen emphasis, then the worst extras.

| # | Phrase (live) | Source | Proposed plain replacement | Path |
| --- | --- | --- | --- | --- |
| 1 | Nav **Operational Intelligence** | Verify H1 | Keep name **or** `Framework`; destination must define it in the first breath | `components/header.tsx` |
| 2 | **Enterprise Context Layer** / **shared substrate** | Verify H7 | Shared picture of what’s happening now (owner, change, dependency, transaction), maintained once | `home-orientation.tsx`, `framework-architecture-map.tsx` |
| 3 | **SRE / Agent Harness** | Verify H9 | Spell site reliability; `investigation loop` + human sign-off | same |
| 4 | **eval gate** | Verify H11 | `checks before trust` | `home-orientation.tsx` |
| 5 | **Batch Intelligence** / **execution-graph proof** / **taxonomy layers** | Verify H10 | Public demo of job-order/dependencies; not one of the ten filing labels | map + ladder |
| 6 | **GROUNDED RCA** / **EXPLICIT UNKNOWN** | Verify F2 | `Root cause, backed by evidence` / `Cause not yet known` | `batch-intelligence-proof.tsx` |
| 7 | Ask **Mode / local · LLM provider · LLM used** + **Answer packet** | Verify A1–A2 | Visitor labels; hide or translate debug values (X10) | `chat.tsx` |
| 8 | **intentionally deterministic and source-scoped** | Verify A3 | Only public pages on this site. Same question, same sources. No invented pages. | `chat.tsx`, `app/ask/page.tsx` |
| 9 | **MCP request · logs/metrics/traces/topology** + **Sentinalai** | Verify W2, W4 | `Read-only request · logs`; `Sentinalai` (public GitHub repo) | ops-room events; `app/work/page.tsx` |
| 10 | Dock chips **falsify the harness-over-model claim** + sticky **Eval / falsifiers** | Extra X2–X4 | Prove-wrong wording; `Checks / what would prove it wrong` | `content/ask.json`, `framework-section-nav.tsx` |

---

## Inventory (Act worklist)

Supports Verify + extras. **If this table ever disagrees with § Verify FAIL list, Verify wins.** Severity is sequencing, not a pass/fail override.

Severity: **P0** first-read chrome · **P1** same-page secondary · **P2** deep / meta / preview UI.

### A. Homepage + Start here

| Phrase (quote exact) | Why opaque | Proposed plain replacement | Path | Location | Sev | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| `Ravikanth Seri — Production AI systems · Operational Intelligence` | Named thesis with no definition in the eyebrow | Keep name; add short clause: `Operational Intelligence (reasoning from live ops data to a decision a person can trust)` — or drop the name here and define it in the 30s map only | `app/page.tsx` | Hero eyebrow | P0 | First line on the site |
| `enterprise SRE investigation agent` | SRE unexplained | `enterprise site-reliability investigation agent` (keeping production systems healthy) | `app/page.tsx` | Hero proof paragraph | P0 | Repeat on selected-work card 1 |
| `evaluation and operationalization` | Operationalization = vendor fog | `testing it, integrating it, and running it in production` | `app/page.tsx` | Hero proof paragraph | P0 | |
| `attributable evidence` | “Attributable” is compliance-speak | `evidence you can trace back to a source and a time` | `app/page.tsx` | Hero supporting paragraph | P0 | |
| `machine reasoning` | Abstract | `automated analysis that still shows its work` | `app/page.tsx` | Hero supporting paragraph | P0 | |
| `Operational Intelligence is the umbrella. The Enterprise Context Layer is the shared substrate.` | Umbrella/substrate/stack of names | Plain map: OI = overall idea; context layer = shared facts; skip it and teams rebuild those facts by hand | `components/home-orientation.tsx` | 30-second map summary | P0 | Also pins `shared substrate` |
| `Skip it, and every investigation pays the Context Acquisition Tax` | Named tax before the four answers in some readings; still dense | Keep name **after** the four answers, or: `Skip it, and every investigation pays the Context Acquisition Tax: rebuilding owner, change, dependency, and transaction by hand.` | `components/home-orientation.tsx` | 30s map | P0 | Partial gloss exists — reorder so definition leads |
| `The SRE / Agent Harness is the loop on that substrate.` | SRE + harness + substrate | `The SRE / Agent Harness is the investigation loop that runs on that shared context.` Spell SRE once. | `components/home-orientation.tsx` | 30s map | P0 | |
| `not a taxonomy layer` | Taxonomy = library science | `not one of the ten filing labels` | `components/home-orientation.tsx` | 30s map + Batch card | P0 | |
| `Shared substrate` | Label | `Shared context` | `components/home-orientation.tsx` | Map card eyebrow | P0 | Match framework map |
| `enterprise telemetry` | Telemetry unexplained | `live metrics, logs, and traces from production` | `components/home-orientation.tsx` | Umbrella card | P0 | Canonical OI definition lives here |
| `Loop on the substrate` | Same as #2 | `Investigation loop` | `components/home-orientation.tsx` | Map card eyebrow | P0 | |
| `Evidence → hypothesis → eval gate → learn` | Eval gate | `Evidence → working theory → checks before trust → learn` | `components/home-orientation.tsx` | Loop card | P0 | |
| `an SRE / agent harness with human gates` | Harness + gates | `an investigation loop with human sign-off on consequential steps` | `components/home-orientation.tsx` | “The work, plainly” Builds | P0 | This strip is supposed to be plain and isn’t |
| `Staff / Principal conversations in AIOps` | Verify H14: hiring-brochure register | Quiet line may stay; must not become the headline. Extra: `AIOps` here is not the ruled identity title | `components/home-orientation.tsx` | Work-plainly footer | P1 | Verify: do not promote |
| `Execution-graph proof on the context layer.` | Execution graph | `Proof using the map of which jobs ran before and after which` | `components/home-orientation.tsx` | Batch card | P1 | |
| `grounds` / `writes back` (map arrows) | “Grounds” is retrieval jargon | `reads from` / `writes back` | `components/home-orientation.tsx` | Map connector | P1 | Same on framework map |
| `What the public corpus will answer, cite, and refuse.` | Corpus | `What public pages it will answer from, cite, or decline` | `components/evidence-ladder.tsx` | Ask card | P1 | |
| `Context layer and harness. Batch Intelligence is proof; the ten layers are a filing system.` | Harness unexplained on this card | `Shared context and the investigation loop. Batch Intelligence is the public demo; the ten layers organize notes.` | `components/evidence-ladder.tsx` | Framework card | P1 | Shared with `/work` |
| `Read the doctrine, and what would prove it wrong` | Doctrine = internal canon | `Read the written model, and what would prove it wrong` | `app/page.tsx` | Thesis link | P1 | Keep “prove it wrong” — that’s plain |
| `bounded execution, attributable findings, evaluation before trust` | Stack | `limits on what the agent may do, findings you can trace, tests before trust` | `app/page.tsx` | Selected work 1 | P1 | |
| `evaluation gates, and the governed tool-call model` | Tool-call model | `checks before release, and rules for which tools the agent may call` | `app/page.tsx` | Selected work 1 Proof | P1 | |
| `operationalization` | Fog | `putting it into daily production use` | `app/page.tsx` | Selected work 1 role | P1 | |
| `Doctrine v1.0` | Versioned canon | `Written model v1.0` | `app/page.tsx` | Selected work 2 Proof | P1 | |
| `Telemetry volume and operational understanding are not the same thing.` | Telemetry | `More metrics and logs are not the same as understanding production` | `app/page.tsx` | Selected work 3 Learned | P1 | |
| `context must be current, attributable, and safe to act on` | Attributable again | `current, traceable to sources, and safe to act on` | `app/page.tsx` | Career bridge | P1 | |
| `Operational Intelligence Is the New Control Plane` | Control plane = infra | Keep as essay title if it’s the published title; dek should define | `content/home.json` | Selected ideas | P1 | Don’t silently retitle a published essay without Ravikanth |
| `Agentic Incident Investigation Without Losing Control` | Agentic | If retitling allowed: `AI-assisted incident investigation without losing control`; else define in dek | `content/home.json` | Selected ideas | P1 | Published title — flag if Act changes it |
| `evidence, provenance, and accountability intact` | Provenance | `evidence, clear sources, and accountability intact` | `content/home.json` | Selected ideas dek | P1 | |
| `Transaction Intelligence for Complex Enterprises` | Named thesis untitled on home | Dek already helps; first mention could say `following a customer or business transaction across systems` | `content/home.json` | Selected ideas | P1 | |
| `isolated telemetry` | | `isolated metrics, logs, and traces` | `content/home.json` | Transaction dek | P2 | |
| `OI-ROOM-001 Control Comparison` | Case id | Keep id; dek is already plain. Optional prefix `Demo case` | `content/home.json` | Selected ideas | P2 | |
| `Telling me where the doctrine is wrong` | Doctrine | `Telling me where the written model is wrong` | `app/page.tsx` | Closing | P2 | |
| `Evaluation gate` (step kind) | | `Check before recommend` | `components/operations-room-preview.tsx` | Preview step | P2 | |
| `Evidence coverage, deterministic replay, budget discipline` | | `Whether evidence is complete, whether the same steps replay, and call/time limits` | `components/operations-room-preview.tsx` | Gates body | P2 | |
| `20-call budget · policy gate · hash-checked replay` | | `20-call limit · policy check · replay verified` | `components/operations-room-preview.tsx` | Gates note | P2 | |
| `A decision is not trusted until its evidence can be replayed.` | Replay = eval harness | `…until someone can walk the same evidence again` | `components/operations-room-preview.tsx` | Sidebar | P2 | Idea is good |
| `OI-ROOM-001` badge | Internal ticket vibe | `OI-ROOM-001 · synthetic demo case` (synthetic already adjacent — OK) | `components/operations-room-preview.tsx` | Header | P2 | Low priority if “synthetic case” stays next to it |

**Do not treat as pass:** Authorized Misfire **name** is still Verify H12 (keep name + clause). Four-answer reconstruct for the context layer is the right *kind* of clause (H7/H8 still FAIL as labels). “Filing system” is the right plain words; nearby **taxonomy** is still H10.

### B. Nav, footer, site meta

| Phrase (quote exact) | Why opaque | Proposed plain replacement | Path | Location | Sev | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| Nav label `Operational Intelligence` | No hint it’s the framework | Keep (it’s the product name) **or** `Framework` if character budget; define on destination | `components/header.tsx` | Primary nav | P0 | 5-item nav is frozen in count; label text can clarify |
| `Ask` | Product name, no hint | Keep short label; `aria-label` / subtitle: `Ask the public pages (answers cite sources)` | `components/header.tsx` | Utility | P0 | Don’t explode the button |
| `My public professional home for Operational Intelligence and public-safe technical work.` | Public-safe + OI undefined | `My public site for Operational Intelligence — AI that reasons over production operations — and shareable examples (no private systems).` | `content/site-config.json` → footer | Footer | P1 | |
| `AI-native operations, replayable investigations, evaluation, and human-reviewed action.` | Meta stack | `Public work on AI for enterprise operations: investigations you can replay, checks before trust, and a person who still decides.` | `app/layout.tsx` | `<title>` / description | P1 | Social preview is first-read for many |
| `evaluation gates` / `eval gates` | | `checks before a conclusion is trusted` | `app/layout.tsx` | OG / Twitter | P2 | |
| `public-safe` (footer) | Insider safety dialect | `Public examples only. Private employer systems stay off this site.` (footer already has a good second sentence — first can match) | `components/footer.tsx` | | P2 | Second sentence is already plain |

### C. `/framework`

| Phrase (quote exact) | Why opaque | Proposed plain replacement | Path | Location | Sev | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| Meta: `evidence-backed Agentic SRE` … `eval-gated agents` | Agentic SRE + eval-gated | `evidence-backed AI for site-reliability work` … `agents that must pass checks before they act` | `app/framework/page.tsx` | metadata | P0 | SERP |
| `A reference model for building the layer an agent grounds itself in` | Grounds | `…the shared facts an agent starts from` | content consumed as `operationalIntelligenceFramework.promise` | Hero | P1 | |
| `The reasoning layer between enterprise telemetry and human decision.` | Telemetry + “reasoning layer” | Keep canonical definition but gloss telemetry: `between live production signals (metrics, logs, traces) and a human decision` | framework JSON + map | Hero + umbrella | P1 | This **is** the official definition — gloss, don’t replace the idea |
| `Which topology path explains the blast radius?` | Topology + blast radius | `Which dependency path shows how far the impact spread?` | operator questions | Hero list | P1 | |
| `The context layer is the substrate` | Substrate | `The context layer is the shared foundation: maintained once, used by everyone.` | `app/framework/page.tsx` | Two halves intro | P0 | |
| `The harness is the loop that runs on top of it.` | Harness undefined on first `/framework` sentence | `The Agent Harness is the investigation loop that runs on top of it.` | `app/framework/page.tsx` | Two halves intro | P0 | |
| `when the loop grounds itself on a substrate nobody kept current` | Grounds + substrate | `when the loop trusts a shared picture nobody kept current` | `app/framework/page.tsx` | Two halves | P0 | Authorized Misfire **is** glossed here — good; surrounding words aren’t |
| `One — the substrate` | | `One — shared context` | `app/framework/page.tsx` | Eyebrow | P0 | |
| `CMDB, observability, identity, ITSM, CI/CD and topology` | Acronym pile | `asset inventory (CMDB), monitoring, identity, ticketing (ITSM), build/deploy (CI/CD), and the dependency map` | `app/framework/page.tsx` | Context Layer body | P1 | Spell once |
| `The SRE Agent Harness` | Same as homepage | H3 can stay as product name if the first sentence defines it | `app/framework/page.tsx` | §2 | P0 | |
| `the agent grounds itself in current telemetry, topology and configuration — that grounding step` | Grounding | `the agent starts from current monitoring data, the dependency map, and configuration — that first read of the context layer` | `app/framework/page.tsx` | Harness body | P1 | |
| `grounding layer, RCA investigation` (diagram alt) | RCA | `context step, root-cause investigation` | `app/framework/page.tsx` | img alt | P1 | Screen-reader copy |
| `These ten layers are the taxonomy underneath it` | Taxonomy | `These ten layers are the filing system underneath it` | `app/framework/page.tsx` | Taxonomy intro | P1 | Body already says filing system — drop the extra word |
| Architecture map summary (substrate / taxonomy / execution-graph) | Same cluster as homepage 30s map | Match the new homepage map language | `components/framework-architecture-map.tsx` | Map lede | P0 | **Shared fix** |
| `Shared substrate` / `Loop on the substrate` / `Filing / taxonomy` | Labels | `Shared context` / `Investigation loop` / `Filing labels` | `components/framework-architecture-map.tsx` | Card eyebrows | P0 | |
| `Eval gates and falsifiers before trust` | | `Checks before trust, and what would prove it wrong` | `components/framework-architecture-map.tsx` | Destination dl | P0 | |
| Nav: `Harness` | | `Agent loop` | `components/framework-section-nav.tsx` | Sticky | P0 | id stays `harness` |
| Nav: `Taxonomy` | | `Ten layers` | same | Sticky | P1 | id stays `taxonomy` |
| Nav: `Eval / falsifiers` | | `Checks / disproof` | same | Sticky | P0 | |
| `Ten-layer taxonomy at a glance` | | `Ten filing labels at a glance` | `components/framework-layer-overview.tsx` | Table header | P1 | **Pinned** |
| `Room stage` | Points at OI-ROOM unexplained | `Demo-case stage` | `components/framework-layer-overview.tsx` | Column | P1 | |
| Layer stage names: `Replay Seed`, `Evaluation Gate`, `Operator Control Plane`, `Hypothesis Lifecycle`, `Evidence Graph` | Framework nouns as if self-explanatory | Plain: `Saved case to rerun` / `Checks before recommend` / `Human review screen` / `How explanations are tracked` / `Linked facts` | `content/operational-intelligence-framework.json` (via overview + teacher) | Table | P0–P1 | Used in many projections |
| `Replay, grounding, evidence coverage, refusal behavior, confidence calibration` | Eval cluster | `re-running cases, tying claims to sources, how much is backed, when the system says no, whether confidence matches reality` | `app/framework/page.tsx` | “Evaluation is the control system” | P0 | |
| `evidence graph, hypothesis lifecycle, decision trace, replay seed` | Primitive dump | `linked evidence, tracked explanations, decision audit trail, saved case to rerun` | `app/framework/page.tsx` | “Evidence must become infrastructure” | P0 | |
| `AIOps plateaued at correlation` | AIOps | `Ops-analytics tools stalled at matching symptoms` | `app/framework/page.tsx` | Argument card | P1 | |
| `provenance, timeline reconstruction, hypothesis comparison` | Provenance | `where the data came from, rebuilding the timeline, comparing explanations` | same card body | P1 | |
| `For batch, context is the execution graph.` | Execution graph | `For batch jobs, context is which jobs ran, in what order, and what they read and wrote` | `components/batch-intelligence-proof.tsx` | H3 | P0 | Define in the same breath |
| `GROUNDED RCA` | See top 10 | `Root cause, backed by evidence` | `components/batch-intelligence-proof.tsx` | Callout | P0 | |
| `EXPLICIT UNKNOWN` | Branded status | `Cause not yet known` (keep the missing-trace rule) | same | Callout | P1 | Adjacent sentence is OK |
| `Inspectable execution edges` | Graph theory | `Job links you can inspect` | same | Eyebrow | P1 | |
| `Blast radius` | Incident slang | `How far impact spread` | same | Step title | P1 | |
| `File provenance` / `Historical job telemetry` | | `Which job wrote which file` / `Historical job run data` | owl claims rendered in Batch aside | P1 | |
| `each paired with its falsifier` | Falsifier | `each paired with what would prove it wrong` | `app/framework/page.tsx` | Radar details | P1 | Page title is already plain! |
| Column `Falsification` | | `What would prove this wrong` | same | Table | P1 | |
| Theme `Harness over model` | | Keep as published theme; first cell should define harness | `content/thesis-radar.json` | Radar | P0 | Also on `/work` |
| `eval gates` inside harness claim | | `quality checks before trust` | `content/thesis-radar.json` | operationalClaim | P0 | |
| `falsification tests, and evidence-ledger expectations` | | `tests that could disprove the claim, and the evidence records a reviewer should see` | `components/technical-review-path.tsx` | Step | P1 | |
| `implementation-neutral layer contracts` … `conformance` | Standards-speak | `vendor-neutral rules for each layer, including what “done” looks like` | same | P2 | Serious-reviewer section |

### D. `/work`

| Phrase (quote exact) | Why opaque | Proposed plain replacement | Path | Location | Sev | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| Meta: `Agentic SRE, ReasonOps` | Unexplained brands | Spell or drop ReasonOps unless defined on-page | `app/work/page.tsx` | metadata | P0 | |
| `enterprise SRE investigation agent` | SRE | Spell site reliability on first use | `app/work/page.tsx` | H2 | P0 | |
| `public doctrine, reference architecture, evaluation harness` | Doctrine + harness | `public written model, reference design, and automated checks` | `app/work/page.tsx` | What you can inspect | P0 | |
| Evidence ladder Framework line | Same as home | Same replacement | `components/evidence-ladder.tsx` | | P1 | One edit, two pages |
| `Enterprise Context Layer` (card title only) | Name without the four answers in the title | Keep name; description is already fairly plain | `content/home.json` | linkedInSignals | P1 | Description is OK |
| `Context Acquisition Tax` (title) | Verify H8: gloss helps, label still opaque | Keep name; four-answer clause must lead, not trail | `content/home.json` | | P1 | Not a pass |
| `Harness over model` + `the harness that captures evidence, replay…` | Harness | `The operating loop around the model: evidence, reruns, outcomes, approvals, lessons` | `content/home.json` | | P1 | |
| `Ops for observability` | Inverted coinage | `Running observability as an operated product` (then keep quality/cost/governance) | `content/home.json` | | P1 | |
| `taxonomy, cost, governance` (in observability card) | Taxonomy | `consistent categories for signals, cost, and access rules` | `content/home.json` | | P1 | |
| `grounding, latency, cost, refusals, overrides, and drift` | Grounding | `whether answers tie to sources, latency, cost, refusals, overrides, and drift` | `content/home.json` | Observability for AI | P1 | |
| `agentic operations` | Agentic | `AI-assisted operations` | professional graph careerEvolution | Operating arc | P1 | |
| `reasoning layer between telemetry and accountable human decision` | Telemetry | `between production signals and a person who can be held accountable` | same | | P1 | |
| `observability, AIOps, SRE, ITIL` (weaken line) | Acronym dump | Spell first use: `dashboards/monitoring, AI-for-ops tools, site reliability, ITIL process frameworks` | proofLedger | | P1 | |
| `eval gates` | | `checks before a recommendation is allowed` | proofLedger inspect | | P1 | |
| `Operator Control Plane, Evaluation Gate` | | `human approval screen, checks before recommend` | architectureJudgment | | P1 | |
| `Replay Seed` | | `saved case you can rerun` | architectureJudgment | | P1 | |
| `source provenance` | | `where the evidence came from` | architectureJudgment | | P2 | |
| `Transaction Intelligence` | | Define: following a customer/business journey across systems | architectureJudgment | | P2 | |

### E. `/investigation-room` + replay

| Phrase (quote exact) | Why opaque | Proposed plain replacement | Path | Location | Sev | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| `Work OI-ROOM-001 the way you would a real incident.` | Case id as if known | `Work through demo case OI-ROOM-001 the way you would a real incident.` | `app/investigation-room/page.tsx` | Hero | P1 | Meta description is already plain — good |
| `MCP request · logs` (and metrics/traces/topology…) | MCP = Model Context Protocol, never explained | `Read-only request · logs` (keep that they are tool/context fetches) | `lib/operational-intelligence/sre-reference-run.ts` | Event titles | P0 | Visible in the signature artifact |
| `Deterministic event stream` | Deterministic | `Fixed-order event timeline (same every replay)` | `components/sre-reference-run.tsx` | | P1 | |
| `Synthetic Reference Run · public-safe fixture` | Fixture | `Sample run · public demo data` | `components/sre-reference-run.tsx` | Eyebrow | P1 | |
| `provenance: checked-in OI-ROOM-001 fixture` | Provenance + fixture | `source: demo data file OI-ROOM-001` | `components/sre-reference-run.tsx` | Event footer | P0 | |
| `Evaluation gate` aside | | `Checks before a recommendation` | `components/sre-reference-run.tsx` | Sidebar | P1 | |
| `Operator decision packet` | Packet | `Summary for your decision` | same | | P1 | |
| `Operational Memory` | Layer name | `Lessons stored from past incidents` | same | | P1 | |
| `Reviewed approve outcome stored as replay seed.` | Replay seed | `Your approve choice saved as a case we can rerun later.` | same | | P1 | |
| `Evaluation gate blocks recommendation` / `premature RCA cannot advance` | RCA | `Checks block the recommendation` / `a root-cause guess cannot advance yet` | event copy in `sre-reference-run.ts` | Stream | P1 | |
| `Ask Ravikanth` CTA | Fine | — | page | | — | Not jargon |
| `Signature artifact` | Mild museum-speak | Optional: `Flagship demo` | page | P2 | |

Ops Room **hero body** is mostly plain. The **replay chrome** is where jargon concentrates.

### F. Ask page, dock, chips

Preserve: cite or refuse; public pages only; no employer data; no invented sources.

| Phrase (quote exact) | Why opaque | Proposed plain replacement | Path | Location | Sev | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| `Ask the Public Record` (title/meta) | Sounds like a government archive | `Ask` / `Ask this site` — subtitle: answers cite public pages | `app/ask/page.tsx` | metadata | P1 | |
| `Evidence console` | Internal tool | `Ask panel` or drop | `app/ask/page.tsx`, `components/chat.tsx` | | P1 | |
| `doctrine, and artifacts` | | `the written model, and published materials` | `app/ask/page.tsx` | Card | P1 | |
| `intentionally deterministic and source-scoped` | See top 10 | `Only public pages on this site. Same question, same sources. No invented pages.` | ask page + chat + dock-adjacent | P0 | Repeat 3× — one shared string if possible |
| `{N} deterministic checks that run on every build` | CI | `{N} automated tests on every release so answers stay inside those rules` | `app/ask/page.tsx` | | P1 | |
| `Separate inference` chip | | `Mark what’s inferred vs cited` | `app/ask/page.tsx` | | P1 | |
| `cite evidence, separate inference, route to artifacts` | | `Cite sources, say what’s inferred, link to the page` | `content/ask.json` | Context card | P1 | |
| `Thesis lenses` / `Ask this lens` | Lens | `Key topics` / `Ask about this topic` | `app/ask/page.tsx` | | P1 | |
| `Review deterministic fixtures and known limitations.` | Fixtures | `See what is tested automatically, and what Ask will not do` | `content/ask.json` | Guide path | P0 | |
| `How does the evaluation gate work?` | | `How does Ask decide an answer is good enough to show?` | `content/ask.json` | | P1 | |
| `Start with a question about … OI-ROOM-001` | Code name | `…or the Operations Room demo case (OI-ROOM-001)` | `components/chat.tsx` | Initial assistant | P1 | |
| `Answer packet` | Packet | `Answer details` | `components/chat.tsx` | | P0 | Empty-state + accordion |
| Raw values: `local`, `vector`, `provider_none`, `thin_retrieval`, `public_safety_boundary`, `ai_synthesis · groq` | Debug telemetry in the UI | Human labels: `On-site search`, `No AI rewrite`, `Not enough sources`, `Refused: not public`, `Written from sources (Groq)` | `components/chat.tsx` `answerPacketRows` / status | P0 | **Do not change API enums** — map them for display |
| `matched after retrieval` | Retrieval | `Matched after searching the site` | `components/chat.tsx` | | P0 | |
| `Grounding receipts` | See top 10 | `Sources used` | `components/chat.tsx` | | P0 | |
| `Related artifacts` | Artifacts | `Related pages` | `components/chat.tsx` | | P1 | |
| `LLM provider` / `LLM used` / `LLM skip` | LLM | `AI service` / `AI rewrite used?` / `Why AI rewrite was skipped` | `components/chat.tsx` | | P0 | Optional: hide skip codes from default chrome; keep for review packet |
| `ms synthesis guard` | | `max wait for AI rewrite` | `components/chat.tsx` | Runtime budget | P1 | |
| `Ask the record` | Archival | `Ask this site` | `components/ask-dock.tsx` | Trigger + title | P0 | **Playwright pin** |
| `Pressure-test the public record without leaving this page.` | | `Ask tough questions from this page, using only public site content.` | `components/ask-dock.tsx` | Subtitle | P1 | |
| `Public record only. Cite or refuse.` | Slightly legal | `This site only. Cite a source or say no.` | `components/chat.tsx` dock footer | P1 | **Keep the contract** |
| Chip: `Where is the Operational Intelligence thesis weakest?` | Thesis | `Where is the Operational Intelligence idea weakest on the public site?` | `content/ask.json` | default chips | P1 | Keep `weakest` (validator) |
| Chip: `What would falsify the harness-over-model claim?` | See top 10 | `What would prove the “loop matters more than the model” idea wrong?` | `content/ask.json` | default + routes | P0 | Drop `falsify`; keep prove-wrong |
| Chip: `What is Authorized Misfire in one scene?` | Undefined in chip | `What is Authorized Misfire — an action allowed on untrustworthy context — in one scene?` | `content/ask.json` | | P0 | Or rely on homepage gloss if chip only appears after that page — still define |
| Chip: `What is the wrong answer to Context Acquisition Tax?` | Named tax | `What is a misleading take on Context Acquisition Tax (rebuilding owner/change/dependency/transaction by hand)?` | `content/ask.json` | | P0 | |
| Chip: `What would falsify the Agent Harness claim?` | | `What would prove the Agent Harness idea wrong?` | `content/ask.json` `/framework` | P0 | |
| Chip: `How should a reviewer challenge the ten-layer taxonomy?` | Taxonomy | `How should a reviewer challenge the ten filing layers?` | `content/ask.json` | P0 | |
| Chip: `What is OI-ROOM-001 allowed to claim from a synthetic case?` | | `What can the Operations Room demo (OI-ROOM-001) honestly claim from a simulated incident?` | `content/ask.json` `/investigation-room` | P0 | |
| Suggested: `Why is the harness more important than the model for SRE agents?` | Harness + SRE | `Why does the operating loop matter more than the model for production-reliability agents?` | `content/ask.json` `askRaviPrompts` | P1 | Ask **questions** may still retrieve on “harness” — keep the word somewhere in the prompt or update retrieval tests |
| Guide path: `canonical definition` … `OI-ROOM-001 framing` | | `main definition, limits, ten layers, glossary, Operations Room intro` | `content/ask.json` | P1 | |
| `state machines, schemas, … conformance` | Arch checklist | `workflows, data shapes, and what “complete” means` | `content/ask.json` | P1 | |
| `falsification criteria` | | `what would prove the idea wrong` | `content/ask.json` | P1 | |

**Ask retrieval caution:** Prompts that are also eval fixtures (`What does Ravikanth mean by Context Acquisition Tax?`, harness-over-model) should keep a stable keyword **or** Act updates `public/eval-report.json` / search tests in the same change.

### G. Projects + Codebase Memory

| Phrase (quote exact) | Why opaque | Proposed plain replacement | Path | Location | Sev | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| `RCA export, and release-gate evaluation` | RCA | `root-cause export, and checks before release` | `content/projects.json` | Ops Room summary | P0 | Index + slug meta |
| `exportable RCA packets` / `eval gates` | | `exportable root-cause summaries` / `quality checks` | `content/projects.json` | detail | P1 | |
| Capability chip `RAG` | Unexpanded | `retrieval from approved documents` | `content/projects.json` | Copilot | P0 | |
| `Evaluation harness` / `golden datasets` / `groundedness` | Eval suite slang | `structured test suite` / `fixed example questions with expected answers` / `answers stay tied to sources` | `content/projects.json` | Eval workbench | P1 | |
| `knowledge graphs` chip | | `linked map of systems, owners, dependencies` | `content/projects.json` | Transaction explorer | P1 | |
| Project page path: `Hypothesis lifecycle`, `Evaluation gate`, `Decision packet`, `Grounded answer`, `Release gate` | Framework nouns | Match framework plain labels | `app/projects/[slug]/page.tsx` + `content/project-proof.json` | | P1 | |
| `Operational Intelligence doctrine` | | `Operational Intelligence written model (this page is not a duplicate of that)` | `app/projects/codebase-memory/page.tsx` | Implemented pattern | P1 | Page is otherwise relatively plain |
| `bounded fresh-agent testing` | Bounded | `limited test with a new coding assistant` | codebase-memory page | P1 | |
| `illustrative fixture` | Fixture | `illustrative demo data` | codebase-memory | P2 | |
| `code graph` | Defined in the same breath — **OK** | Keep | codebase-memory | ideas | — | Good pattern: name + definition |

---

## Shared-string map (edit once)

| Concept | Today’s visitor words | Plain target | Primary files |
| --- | --- | --- | --- |
| Shared ops facts | substrate, Enterprise Context Layer (undefined) | shared picture / shared context (four answers) | `home-orientation.tsx`, `framework-architecture-map.tsx`, `app/framework/page.tsx` |
| Agent loop | harness, SRE / Agent Harness | investigation loop; spell site reliability once | same + `content/home.json`, `content/ask.json` |
| Filing system | taxonomy | filing labels / ten layers | map, section nav, layer overview, framework intro |
| Checks before trust | eval gate(s) | checks before trust / before a recommendation | orientation, map, work, ops room, ask |
| Disproof | falsify, falsifier, Falsification | what would prove this wrong | framework nav, radar, dock chips |
| Source trail | provenance, grounding, grounding receipts | where it came from / sources used | ask chrome, work, batch |
| RCA | GROUNDED RCA, RCA packets | root cause (backed by evidence) | batch proof, projects.json |
| Ask policy | deterministic, source-scoped | only this site’s public pages; no invented sources | chat.tsx, ask/page.tsx |
| MCP | MCP request | read-only request | sre-reference-run events |

---

## Out of scope for Act (this pass)

- Wiki/MDX doctrine body, publication-pack PDFs, reference-architecture markdown. Those are deep documents; first-read chrome is the failure.
- Renaming routes (`/ask`, `/framework`, `/investigation-room`).
- Frozen H1 / CTAs / job title.
- Promoting the Staff/Principal line into a headline (Verify H14: quiet line is OK). Do not expand it into a pitch. `AIOps` in that line is not the ruled identity title (extra vs H5).
- Inventing new glossary pages.

---

## Suggested Act sequence

1. **Verify H1–H14** homepage/nav/map (shared language with framework map). H2/H5: gloss only, do not rewrite frozen strings. H12: keep name + clause. H14: do not headline.
2. **Verify F1–F7** framework intro, Batch labels, meta, radar (`AgentOps` / `data plane` / `falsifier`).
3. **Verify A1–A4** Ask debugger chrome, Answer packet, deterministic/source-scoped, dock label.
4. **Verify W1–W4** work inventory, MCP events, project chips, Sentinalai in-breath (no rename).
5. **Extras X1–X15** especially dock chips (X2–X3), sticky nav (X4), grounding receipts (X1), doctrine (X6), ReasonOps meta (X8).
6. Repoint validators and Playwright dock name; run `npm test` && `npm run build`.
7. If Ask source sentences or chip prompts used as fixtures changed, update eval/retrieval goldens.

Preview-only. Do not merge. Verify’s gate: PASS only if a smart non-specialist can read the first screens without decoding buzzwords **and** the thesis stays work-first. Frozen H1 and ruled CTAs stay. **Do not merge until Ravikanth approves.**
