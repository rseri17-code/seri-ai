# Homepage 10/10 audit — OBSERVE only

**Status:** OBSERVE. No visitor-facing copy was changed in this PR.  
**Live audited:** https://seri-ai.vercel.app (homepage only; `/framework` skimmed for map consistency)  
**Repo:** https://github.com/rseri17-code/seri-ai (`origin/main` at audit time)  
**Date:** 2026-09-21  
**Audience bar:** a serious enterprise AI / data architect **and** a smart non-specialist. Work-first Operational Intelligence thesis. Clarity of the work over hiring-manager emotion.

Related, do not duplicate blindly:

- Jargon inventory (site-wide word swaps): [PR #11](https://github.com/rseri17-code/seri-ai/pull/11) → `docs/jargon-audit.md`
- Plain-language Act already in flight (metaphor swaps, not contracts): [PR #12](https://github.com/rseri17-code/seri-ai/pull/12) — Verify **FAIL**; `shared substrate` → `shared foundation` is **not** the architect 10

This file is the homepage **10/10 architecture and information-architecture** gate for Act. If this table disagrees with PR #11 on a *word*, Act may take PR #11’s plain replacement **and** must still satisfy the contract/IA rows here. A prettier synonym for `substrate` is not a 10.

---

## 1. Current score — and why it is not 10

Scored against **this** 10, not against “no jargon” alone (PR #11: peers 6 / hiring 4 / overall 4) and not against the stale `WORLD_CLASS_SCORECARD.md` (last updated 2026-08-26; describes a homepage that no longer exists).

| Audience | Score | What they get today | What blocks 10 |
| --- | ---: | --- | --- |
| **Peers** (AIOps / SRE / platform engineers) | **7.0** | Recognizable production-AI-for-ops claim; honest private-system boundary; Operations Room is a real artifact, not a mockup screenshot | Four restatements of the same map; house names (Batch Intelligence, harness, eval gate) before one inspectable contract |
| **Architects** (enterprise AI / data — primary lens) | **6.2** | The *names* of the right split exist: umbrella / context store / loop / public demo / filing index | The split is taught as labels and negation (“not a taxonomy layer”), not as records, keys, freshness, and consumers. Batch vs online context is the architect sentence, and it lives on `/framework`, not `/` |
| **Smart non-specialist** | **5.4** | H1 is almost readable; two CTAs are clear; Authorized Misfire has a real clause | First screen still stacks `evidence-grounded`, `attributable`, `operationalization`, `Operational Intelligence`, `AIOps` with no in-breath meaning |
| **Overall** (this task’s 10 = architect **and** non-specialist, work-first) | **6.3** | Work-first spine is present (private ship, public proofs, Contact as a quiet line) | First viewport teaches identity + a résumé-shaped claim. The architecture map is below the fold, then repeated four times, then the page ends as a hiring invitation |

**Why it is not 10, in one paragraph.** The thesis is the right one, and the page already refuses the recruiting-brochure headline. It fails 10 because a cold architect still cannot *use* the homepage as a model: they cannot say what is stored, who writes it, when it goes stale, what the harness is allowed to do, or what Batch Intelligence proves versus what the ten layers are. A smart non-specialist cannot decode the first screen without a glossary. The page spends its 30-second budget teaching **names of boxes**, then restates those names, then shows the Operations Room — the one thing that would have taught the work.

Do not inflate. 10 means Verify’s checklist in §6 is all yes with no material gap. It is not.

---

## 2. Information-architecture diagnosis

Ruled section order (do not add a seventh section): **Hero → Authorized Misfire → Operations Room → Selected work → Selected ideas → Closing.** The 30-second map, “The work, plainly,” evidence ladder, and destination block live *inside the hero* (`<HomeOrientation />`). That is sanctioned. It is also the density problem.

### 2.1 What must be understood

| Time | Must be true after that time, without coaching |
| --- | --- |
| **10 seconds** | Who. What the work *is* (shared current-ops context + an investigation loop that recommends, a person still decides). One place to inspect. Not a job-search landing. |
| **30 seconds** | Four-way distinction, in this order: **store** (context layer) → **loop** (harness) → **public proof** (Operations Room / Batch) → **filing system** (ten layers). The four answers are records, not a slogan. Employer system is private; this site stands alone. |
| **2 minutes** | Authorized Misfire as the failure mode (trusted stale/thin context). Watched one investigation stage contradict itself. Knows the next artifact (Room, Framework, or Ask) and what it proves. Career is a bridge, not the product. |

### 2.2 What the first viewport actually teaches vs confuses

**Desktop first viewport (approx. `lg` hero grid, above the `border-t` on `#orientation`):**

Teaches, correctly:

- Person: Ravikanth Seri.
- Frozen H1: he builds production AI for enterprise operations.
- Production proof with a public/private boundary: SRE investigation agent, thesis → production, system stays private.
- Two ruled actions: Operations Room / body of work.
- Official title; TIAA · Charlotte · 15+ years.

Confuses, or wastes the 10 seconds:

- Eyebrow and nav both say **Operational Intelligence** with no clause. A coined product name is the second thing on the site.
- Lead stacks **attributable evidence** and **machine reasoning** — paper register, not a data product.
- Proof paragraph spends its rare specificity on **operationalization** instead of *what the agent actually did*.
- Portrait subline **echoes the frozen H1** instead of adding the assigned focus line. Same sentence twice.
- **The four-way map is not in the first viewport.** The component is titled “30-second map” and starts after `mt-10 border-t`. On a laptop, 30 seconds of reading still has not reached it. On a phone, the map is a long scroll past identity, proof, and two buttons.

**Then the hero keeps going (second–third screen, still “section 1”):**

1. 30-second map (full architecture essay + nested cards + destination)
2. “The work, plainly” (Builds / Shipped / Inspect — same content as hero proof + map + ladder)
3. Evidence ladder (Inspect again, plus Ask / Writing)
4. “What I’m building, and where it is headed.” (verbatim restatement of the map)

A visitor can spend **two minutes inside the hero** and still not have reached Authorized Misfire or the Operations Room. That is the IA failure. The clarity pass that added work-plainly + ladder + destination essay solved “cold start has no map” by **stacking maps**. It did not make one map load-bearing.

### 2.3 Path after the hero (2-minute remainder)

| Block | What it is for | Verdict for 10 |
| --- | --- | --- |
| Authorized Misfire | Failure mode the architecture exists to prevent | **Keep.** Best architect paragraph on the page. Clause is required. |
| Operations Room preview | Proof that investigation can show contradiction, unknown, and a human stop | **Keep as the dominant moment.** It is late. |
| Three bodies of work | Production agent / context layer / 15-year platform | Work-first if card 1–2 lead. Card 3 is career; OK as third, not first. |
| Codebase Memory teaser | Adjacent public case study (coding-agent memory) | **Wrong third artifact in the hero Inspect row.** Fine in Selected work. It is a different thesis; putting it next to Operations Room + Framework in the first inspect set makes OI look like a portfolio of AI demos. |
| Four essays | Arguments to disagree with | Titles are specialist (`Control Plane`, `Agentic`, `Transaction Intelligence`). Deks do some work. Do not silently retitle published essays. |
| Closing | Conversation | **Hiring-first.** First sentence of the closer is Staff/Principal search. Last impression undoes work-first. |

### 2.4 `/framework` consistency (skim only)

`/framework` already has the architect sentence the homepage is missing:

> For services, context is topology and deployments. For batch, context is the execution graph.

Homepage Batch card instead says “Execution-graph proof on the context layer. Not one of the ten taxonomy layers.” That is **defensive filing**, not the distinction. Framework labels Batch as a **context-layer capability**; homepage labels it **public-safe proof** nested inside the ECL card. Nested placement is correct (it is a capability of the store). The homepage copy should say **what kind of context** it proves, not only that it is not a layer.

Do not redesign `/framework` in the homepage Act. Lift one sentence onto the homepage Batch card. Keep hashes (`#batch-intelligence`, `#harness`, `#taxonomy`).

---

## 3. Architect lens

### 3.1 Substrate vs harness vs public-proof vs filing-system — is it crisp?

**Almost named; not crisp enough to implement from.**

| Box | Homepage today | Architect reading | Crisp? |
| --- | --- | --- | --- |
| **Umbrella — Operational Intelligence** | “The reasoning layer between enterprise telemetry and a human decision.” | Category / thesis. Fine if “telemetry” is glossed once. | Partial. Definition is canonical; first-touch still shop talk. |
| **Store — Enterprise Context Layer** | “Shared substrate.” Four nouns. “Maintained once.” Nested Batch card. | Sounds like a platform slide. Is this a graph, a control plane, a governed CMDB, a feature store, a lakehouse? **No data-product type.** | **No.** Metaphor + slogan. |
| **Loop — SRE / Agent Harness** | “Evidence → hypothesis → eval gate → learn.” Person owns consequential action. | Right *shape* of a loop. “Eval gate” is undefined (promote? recommend? tool-call?). “Harness” is overloaded (eval harness, operating harness, SRE harness). | Partial. |
| **Public proof — Batch Intelligence** | “Execution-graph proof… not a taxonomy layer.” | Teaching by negation. An architect still does not know it is **batch job dependency context**, as opposed to request-path topology. | **No.** |
| **Filing — Ten layers** | “Indexes notes, patterns, and artifacts.” | This is the one box that *is* crisp — if nearby copy stops saying “taxonomy.” | **Yes**, if Act drops `taxonomy` on this page. |

Map arrows `grounds` / `writes back` are the right *relationship* (loop reads store, writes outcomes). The verb **grounds** is retrieval jargon (PR #11 X5). Use **reads from**.

**Required crisp version Act must land (one screen, no seventh section):**

1. **Context layer = the store.** Four current records, reused by humans, workflows, and agents.
2. **Harness = the loop** that reads those records, investigates, stops for a person, writes what happened back into the store.
3. **Operations Room + Batch Intelligence = public demos** of (2) and of one capability of (1). They are not production of the private SRE agent. They are not extra architecture boxes.
4. **Ten layers = how this site files writing.** If they disagree with the harness, the harness wins. (Framework already says this; homepage should not re-argue it at essay length.)

### 3.2 Ownership / change / dependency / transaction — contracts or slogans?

**Slogans.** Exact live clause:

> Ownership, change, dependency, transaction — maintained once.

That is a list of nouns. A data architect needs each one as a **record with source, time, join, and stale rule**.

| Answer | Slogan today | Contract Act should state (public-safe, no employer systems) |
| --- | --- | --- |
| **Ownership** | “who owns this” | A current owner record for the failing object (service, job, or hop): named owner, source of that mapping, as-of time. |
| **Change** | “what changed” | A change record in the symptom window: deploy / config / job / flag, timestamp, source. |
| **Dependency** | “what depends on it” | Two graphs, not one word: **request-path topology** for services; **job execution graph** (what ran before/after, what was read/written) for batch. That is why Batch Intelligence exists. |
| **Transaction** | “what the transaction did” | The customer or business journey as the unit of impact — not a single service metric. |

**Stale rule (the missing contract).** Authorized Misfire *is* the stale/thin-context failure, but the map never joins it to the four records: a recommendation is not trusted if any of those four is missing, older than the decision, or contradicted. Say that on the map in one sentence. Do not invent SLAs, percentages, or freshness windows that are not public.

**Write / read path.** Framework says the harness writes learning back. Homepage arrows hint at it. State it in words: **humans and agents consume the same store; the loop is not allowed to keep a private copy.**

Do **not** publish schemas, table names, or employer integrations. Contracts in *English* are enough for a 10 homepage. `/framework` can keep CMDB/ITSM/CI/CD as the “where teams steal the answers from today” paragraph — that is not this Act.

### 3.3 False precision and buzzword architecture

| Pattern | Where | Why it fails an architect |
| --- | --- | --- |
| **Teaching by negation** | “not a taxonomy layer” (map summary + Batch card + destination essay) | Sounds like an internal argument the visitor did not have. State what Batch *is*. |
| **Metaphor stack** | umbrella / substrate / harness / filing / execution-graph proof | Four analogies instead of one store + one loop + two demos. PR #12’s `shared foundation` is still a metaphor. |
| **Eval gate** | harness loop; Room “Gates” step | Sounds like a CI product. Unclear whether it gates **recommendation**, **tool use**, or **release**. Homepage should say **checks before a recommendation is offered to a person**. |
| **Evidence-grounded** (frozen H1) | first line | Unspecified grounding. **Do not rewrite H1.** Gloss in the lead: sources, time, replay. |
| **20-call budget · policy gate · hash-checked replay** | Operations Room preview, Gates note | Reads as production SLO on a **synthetic** case. Keep the idea; mark it as **this demo’s stop conditions**, not a shipped quota. |
| **Confidence 62 → 38** | Room preview | OK *if* the UI keeps saying the movement is the exhibit. Do not imply a calibrated production model. |
| **Ten layers** next to **ten stages** | map + Room | Two different tens. Filing labels vs demo steps. One extra clause prevents false completeness. |
| **Control plane** (essay title) | Selected ideas | Infra metaphor as a published title. Keep the title; dek must say it is an argument, not a product SKU. |
| **Governed tool-call model** | Selected work proof | Sounds like a vendor capability brief. Say: **rules for which tools the agent may call, and a log of each call.** |
| **Public-safe proofs** | work-plainly Builds | House dialect (PR #11 X11). Say **proofs anyone can inspect, no employer data.** |

No invented metrics, no fake precision to replace false precision. If it is not on the public site, do not quantify it.

---

## 4. Ranked change list for Act

Homepage files only, unless a shared component blocks the hero/map. **Do not implement in this Observe PR.**

**In-scope files**

| File | Why |
| --- | --- |
| `app/page.tsx` | Hero, thesis, selected work, career bridge, closing |
| `components/home-orientation.tsx` | Map, work-plainly, destination, restatement essay |
| `components/evidence-ladder.tsx` | Shared with `/work`. Hero “Start here” is blocked without it |
| `components/header.tsx` | Five-item nav + Ask. Label is first-viewport |
| `content/home.json` | Selected ideas titles/deks rendered on `/` |
| `components/operations-room-preview.tsx` | Flagship proof on `/` |

**Out of scope for this Act (do not wander)**

- `/framework` body, sticky nav, Batch proof component, radar/falsifier table — except matching the homepage Batch card to the already-public services-vs-batch sentence.
- Ask dock chrome and chips (`content/ask.json`, `components/ask-dock.tsx`, `components/chat.tsx`). They overlay `/` but are a site-wide surface; PR #11 owns them. Do not turn the homepage PR into an Ask rewrite.
- Wiki, essays’ bodies, `/work` except the shared ladder strings.
- Frozen H1 string. Ruled CTAs `Enter the Operations Room` / `Explore the body of work`. Ruled title `Senior Technical Lead — AIOps & Observability`. Authorized Misfire **name** + existing clause.

**Validator warning (do this in the same commit as copy):** `scripts/validate-content.mjs` currently **requires** the four restatements (`The work, plainly`, `What I'm building, and where it is headed.`, `Destination: agents…`, `shared substrate`, `Staff / Principal conversations`, `public-safe proofs.`). Collapse and rewrite **then repoint pins to the invariants** (map still present; four-way distinction still present; work-first quiet conversation line still present; public/private boundary still present). **Never write copy to satisfy a grep.** Same for `validate-content-coherence.mjs` (`shared substrate`), `validate-ruled-copy.mjs` (H1, misfire H2, two CTAs, production agent line), `validate-viewport-contracts.mjs`.

PR #11 already listed several of these strings as jargon. **This list is ordered by 10/10 IA + architect contract, not by jargon severity.** Where a row overlaps PR #11, the proposed rewrite here is the one Act should use on the homepage.

### Rank 1 — P0 — Collapse the four hero restatements into one map + one path

**Why:** Highest-ROI. Peers, architects, and non-specialists all drown here. Work-plainly exists because the map is jargon; if Rank 2–3 land, work-plainly is redundant. The destination essay is a clone of the map summary.

**Do**

1. Keep **one** 30-second map (rewritten per Rank 2–3).
2. Keep **one** destination sentence under the map.
3. Keep the **evidence ladder** as the path through artifacts (Start here).
4. **Delete** the block titled `What I'm building, and where it is headed.` and its paragraph (exact current text below).
5. **Shrink or delete** `The work, plainly`. Prefer delete if Rank 2 is done. If kept, it may only add facts the map does not have (it currently does not).

**Exact strings to remove** (`components/home-orientation.tsx`):

```
The work, plainly
```

```
Production AI systems for enterprise operations: a shared context layer, an SRE / agent
            harness with human gates, and public-safe proofs.
```

```
An enterprise SRE investigation agent, from thesis to production, owned end to end. That
            system stays private. This site stands on its own.
```

(Hero already states the shipped-agent paragraph in `app/page.tsx`. Do not say it three times.)

```
What I'm building, and where it is headed.
```

```
I'm building Operational Intelligence: a reasoning layer between enterprise telemetry and a human
          decision. The shared piece is the Enterprise Context Layer — ownership, change, dependency, and
          transaction truth, maintained once instead of reconstructed by every agent. An SRE / Agent Harness
          runs on that layer: evidence, hypothesis, eval gate, then learning, with a person still owning
          anything consequential. Batch Intelligence is the public-safe proof of that idea on an execution
          graph; it is not a taxonomy layer. The destination is agents that can sit near production because
          context, evaluation, and human authority are first-class.
```

**Inspect row inside work-plainly** (same file, `inspectLinks`): remove **Codebase Memory** from this hero inspect set. It already has a Selected work teaser and ladder slot.

```
label: "Codebase Memory"
href: "/projects/codebase-memory"
```

If work-plainly is deleted, this goes away with it. Ladder rank 03 may stay (public case study) — do not also put it in the first inspect chip row beside Operations Room and Framework.

**Proposed remaining destination line** (replace current destination; keep it as the single closer of the map):

Current:

```
Destination: agents that can sit near production because context, evaluation, and human authority
          are first-class — not a model with a disclaimer attached.
```

Proposed:

```
Destination: agents that can sit near production because the shared context is current, the checks are visible, and a person still owns the action — not a model with a disclaimer attached.
```

**Staff / Principal line** (if work-plainly is deleted, move this **one quiet sentence** under the ladder, not into the H1):

Current:

```
Staff / Principal conversations in AIOps, observability, or AI platform leadership — Contact.
```

Proposed (keep quiet; do not headline; drop extra `AIOps` which is **not** the ruled identity title):

```
Staff or Principal conversations about this work — Contact.
```

Verify H14: quiet line is OK; must not become the headline. Do not expand into a pitch.

### Rank 2 — P0 — State the four answers as records, not a comma list

**File:** `components/home-orientation.tsx` (map summary + ECL card). Match Framework map language only after this rewrite; do not copy Framework’s `shared substrate` back.

**Exact — map summary (`#home-orientation-summary`):**

Current:

```
Operational Intelligence is the umbrella. The Enterprise Context Layer is the shared substrate.
            Skip it, and every investigation pays the Context Acquisition Tax — reconstructing ownership,
            change, dependency, and transaction by hand. The SRE / Agent Harness is the loop on that substrate.
            Batch Intelligence is public-safe proof of an execution graph, not a taxonomy layer. The ten layers
            are a filing system.
```

Proposed:

```
Operational Intelligence is the overall idea: reason from live production signals to a decision a person can own. The Enterprise Context Layer is the shared store — four current records, each with a source and a time: who owns the failing thing, what changed, what depends on it, and which customer or business journey is hurt. Skip the store, and every investigation rebuilds those four by hand (the Context Acquisition Tax). The SRE / Agent Harness is the investigation loop that reads that store and writes outcomes back. Batch Intelligence is a public demo of the store for batch jobs (which jobs ran, in what order, what they read and wrote) — not one of the ten filing labels. Those ten labels are how this site files notes. They are not the runtime design.
```

**Exact — ECL card body:**

Current:

```
Ownership, change, dependency, transaction — maintained once. Without it, every investigation
                pays the Context Acquisition Tax — reconstructing those four answers by hand.
```

Proposed:

```
Four reusable records, maintained once for humans, workflows, and agents: owner, change in the symptom window, dependency (service path or job graph), and affected journey. Each record carries a source and an as-of time. If any of the four is missing, older than the decision, or contradicted, the loop must not treat it as safe to act on. Without this store, every investigation reconstructs the same four by hand — the Context Acquisition Tax.
```

**Exact — card eyebrow `Shared substrate`:** replace with `Shared store` (not “foundation”: still a metaphor).  
**Exact — `Loop on the substrate`:** replace with `Investigation loop`.  
**Exact — map connector `grounds`:** replace with `reads from`. Keep `writes back`.

**Canonical OI one-liner on the umbrella card:**

Current:

```
The reasoning layer between enterprise telemetry and a human decision.
```

Proposed (keep the idea; gloss telemetry once):

```
The reasoning layer between live production signals (metrics, logs, traces, changes) and a human decision.
```

Keep the named terms **Operational Intelligence**, **Enterprise Context Layer**, **Context Acquisition Tax**, **SRE / Agent Harness**, **Batch Intelligence**. Define them in the same breath. Do not flatten into HR (“I help teams collaborate”).

### Rank 3 — P0 — Make Batch vs ten layers a positive distinction

**File:** `components/home-orientation.tsx` Batch card (nested in ECL — keep the nest).

Current title/body:

```
Public-safe proof
Batch Intelligence
Execution-graph proof on the context layer. Not one of the ten taxonomy layers.
```

Proposed:

```
Public demo of the store
Batch Intelligence
For request-path services, the store’s dependency record is topology and deploys. For batch, it is which jobs ran, in what order, and what they read and wrote. This is a shareable demo of that batch record (no employer data). It is not one of the ten filing labels.
```

Link stays `/framework` (or `/framework#batch-intelligence` if Act wants a deep link; hash is already used by the ladder’s secondary).

**Exact — Ten layers card:**

Current:

```
Filing system
Ten layers
Indexes notes, patterns, and artifacts. The longer map lives on Framework.
```

Proposed:

```
Filing system (not the runtime)
Ten layers
How this site tags notes, patterns, and artifacts so they can be found. Ten demo stages in the Operations Room are a different ten. The runtime model is the store + the loop. The longer map is on Framework.
```

**Ladder Framework card** (`components/evidence-ladder.tsx`) current:

```
Context layer and harness. Batch Intelligence is proof; the ten layers are a filing system.
```

Proposed:

```
The shared store and the investigation loop. Batch Intelligence is a public demo of batch context; the ten layers file the writing.
```

### Rank 4 — P0 — Hero lead: drop paper nouns; say the work

**File:** `app/page.tsx`. Frozen H1 stays. Lead is **not** ruled.

Current:

```
My work connects live operational context, attributable evidence, and machine reasoning — so
                every recommended action keeps a clear path back to why.
```

Proposed:

```
I build the shared, current picture of owner, change, dependency, and customer journey — then an investigation loop that can recommend an action a person can still refuse. Every recommendation has to show its sources.
```

This is the 10-second architect sentence. It does not touch the H1. It glosses `evidence-grounded` without repeating it.

### Rank 5 — P0 — Hero production paragraph: spell SRE; cut operationalization

**File:** `app/page.tsx`. Keep the ruled fragment `enterprise SRE investigation` **inside** a sentence that spells site reliability on first use, **or** keep the exact pinned substring and add the gloss beside it. `validate-ruled-copy.mjs` requires the exact wrapped fragment:

```
enterprise SRE investigation
                agent from thesis to production
```

Do not break that pin unless Act updates the validator in the same commit with a new Ravikanth ruling. Safer: keep the pinned phrase, rewrite the rest.

Current:

```
Most recently I took an enterprise SRE investigation agent from thesis to production, owning it across architecture, engineering, enterprise integration, evaluation and operationalization. That system stays private. What is on this site stands on its own.
```

Proposed (keeps pinned core; spells the acronym around it; drops operationalization):

```
Most recently I took an enterprise SRE investigation agent from thesis to production — an agent that investigates production reliability issues — owning it across architecture, engineering, integration, evaluation, and day-to-day production use. That system stays private. What is on this site stands on its own.
```

If wrapping must stay for the pin, keep the line break through `enterprise SRE investigation agent from thesis to production` and only change the tail after `owning it across`.

### Rank 6 — P0 — Nav label: five items stay; destination must not be a coined name with no hint

**File:** `components/header.tsx`

Current:

```
{ href: "/framework", label: "Operational Intelligence" },
```

Proposed (count frozen; label may clarify — PR #11 H1 / PR #12 already chose this):

```
{ href: "/framework", label: "Framework" },
```

Eyebrow on the homepage may keep the name **with a clause**, or drop the name (the map will define it):

Current (`app/page.tsx`):

```
Ravikanth Seri — Production AI systems · Operational Intelligence
```

Proposed:

```
Ravikanth Seri — Production AI systems for enterprise operations
```

Do not put Operational Intelligence in the eyebrow unless the clause sits on the same line. The map owns the definition.

`Ask` stays a short utility label. Do not explode the button. Optional `aria-label`: `Ask the public pages on this site`.

### Rank 7 — P1 — Selected work card 1: replace the noun stack

**File:** `app/page.tsx` `selectedWork[0]`

| Field | Exact current | Proposed |
| --- | --- | --- |
| problem | `Acting on production takes more than a good model: bounded execution, attributable findings, evaluation before trust, a point where a person decides.` | `Acting on production takes more than a good model: limits on what the agent may do, findings you can trace to a source and a time, checks before a recommendation, and a point where a person decides.` |
| role | `I took an enterprise SRE investigation agent from thesis to production, and owned it end to end: architecture, engineering, integration, evaluation, operationalization.` | `I took an enterprise SRE investigation agent from thesis to production, and owned it end to end: architecture, engineering, integration, evaluation, and running it in daily production.` |
| proof | `Reference architecture, evaluation gates, and the governed tool-call model.` | `Reference architecture, checks before a recommendation is trusted, and rules plus a log for which tools the agent may call.` |
| outcome | `The model was the easy part. Keeping its context current and its actions answerable was the work.` | **Keep.** This is already the thesis in plain language. |

Card 2 problem is already the four questions in English — **keep**. Role/proof still say `Doctrine v1.0` / `ten patterns`. Proposed proof: `Written model v1.0, the reference architecture, ten patterns in build order.` (or keep Doctrine if Act prefers named canon — then the homepage thesis link must also say what doctrine means; see Rank 9).

Card 3 Learned current: `Telemetry volume and operational understanding are not the same thing.`  
Proposed: `More metrics and logs are not the same as understanding production.`

Career bridge current: `context must be current, attributable, and safe to act on.`  
Proposed: `context must be current, traceable to sources, and safe to act on.`

### Rank 8 — P1 — Closing: work-first last impression

**File:** `app/page.tsx` closing section.

Current H2 (work-first — **keep**):

```
If you are putting agents near production, I would like to hear how it is going.
```

Current first body paragraph (**hiring-first — rewrite**):

```
Hiring for Staff, Principal, architecture, AI systems or observability leadership. Building production
            agent systems. Organizing a conference or engineering forum. Or wanting a second opinion before putting
            an agent somewhere that matters.
```

Proposed:

```
A second opinion before putting an agent somewhere that matters. Building a production investigation loop. A conference or engineering forum. Hiring conversations happen too — they are not what this page is for.
```

Keep:

```
Telling me where the doctrine is wrong is the most useful thing you can do with it.
```

Proposed if Rank 9 drops “doctrine” in chrome:

```
Telling me where the written model is wrong is the most useful thing you can do with it.
```

CTA `Start a conversation` may stay (not a ruled hero CTA). Do not add a third hero button. Do not promote Staff/Principal into the H1 or the 30-second map.

### Rank 9 — P1 — Thesis CTA and “doctrine” as chrome

**File:** `app/page.tsx`

Current:

```
Read the doctrine, and what would prove it wrong
```

Proposed:

```
Read the written model, and what would prove it wrong
```

Keep the prove-it-wrong half. That is plain and on-thesis.

Authorized Misfire block: **do not drop** `the Authorized Misfire` or `an action the system was permitted to take on context it should not have trusted`. Optional one-word gloss already exists; strengthening the join to Rank 2’s stale rule is enough — no new coined name.

### Rank 10 — P1 — Portrait subline: stop echoing the H1

**File:** `app/page.tsx` figcaption.

Current (also pinned in `validate-content.mjs` / coherence):

```
Building evidence-grounded AI systems for enterprise operations.
```

Project Lead assignment (do not invent Architect/Director; do not touch H1):

```
Production AI systems for enterprise operations
```

That line already appears in the eyebrow. Using it under the portrait **adds** the production-AI mantle without repeating `evidence-grounded`. Repoint the pin. Keep `Senior Technical Lead — AIOps & Observability` and `TIAA · Charlotte · 15+ years`.

### Rank 11 — P1 — Selected ideas: define in the dek; do not retitle without Ravikanth

**File:** `content/home.json` `articles`

| Title (keep unless Ravikanth retitles) | Exact dek now | Proposed dek |
| --- | --- | --- |
| `OI-ROOM-001 Control Comparison` | already plain | Optional prefix in dek only: keep as is. |
| `Operational Intelligence Is the New Control Plane` | `Why enterprises need systems that reason across signals, workflows, people, and outcomes.` | `Why enterprises need a reasoning layer across signals, workflows, people, and outcomes — not another dashboard. “Control plane” here is the argument, not a product name.` |
| `Agentic Incident Investigation Without Losing Control` | `How AI agents can accelerate enterprise investigations while keeping evidence, provenance, and accountability intact.` | `How AI agents can speed enterprise investigations while keeping evidence, sources, and accountability intact.` |
| `Transaction Intelligence for Complex Enterprises` | `Moving from isolated telemetry to transaction-aware explanations of customer and business impact.` | `Following a customer or business journey across systems, instead of explaining a single service metric.` |

### Rank 12 — P1 — Evidence ladder Ask card; keep Room/Framework order

**File:** `components/evidence-ladder.tsx`

Ask `proves` current:

```
What the public corpus will answer, cite, and refuse.
```

Proposed:

```
What public pages on this site it will answer from, cite, or decline.
```

Writing card is fine. Operations Room card is fine. Do not turn ladder labels into a CV (`Run`, `Full map` can stay — they are kind labels, not slogans).

### Rank 13 — P2 — Operations Room preview: demo stop-conditions, not fake SLOs

**File:** `components/operations-room-preview.tsx`

| Exact current | Proposed |
| --- | --- |
| `kindLabel.gate`: `Evaluation gate` | `Check before recommend` |
| Gates body: `Evidence coverage, deterministic replay, budget discipline, stated uncertainty, confidentiality, human review, and whether the conclusion is actionable at all. A failed gate stops the packet.` | `In this demo, a recommendation is withheld unless evidence coverage, a replay of the same steps, call/time limits, named unknowns, confidentiality, and human review all pass. A failed check stops the recommendation.` |
| Gates note: `20-call budget · policy gate · hash-checked replay` | `Demo stop conditions: 20 tool calls · policy check · replay of the same evidence` |
| Sidebar: `A decision is not trusted until its evidence can be replayed.` | `A decision is not trusted until someone can walk the same evidence again.` |

Keep OI-ROOM-001 + `Synthetic case · no employer data` adjacent. Do not claim the private SRE agent used these exact numbers.

### Rank 14 — P2 — Hero eyebrow / identity only if Rank 6 is done

Covered in Rank 6 and 10. No extra copy.

### Shared-component collisions

| Shared file | Other surface | Rule for Act |
| --- | --- | --- |
| `components/evidence-ladder.tsx` | `/work` | One rewrite; both pages must stay a **path through work**, not a recruiter brochure |
| `components/header.tsx` | every page | Five items + Ask; `/framework` label change is site-wide and is still in scope because it is first-viewport on `/` |
| `components/home-orientation.tsx` | homepage only | Primary Act file |
| Framework map (`framework-architecture-map.tsx`) | `/framework` | **Out of scope** except: after homepage map lands, a follow-up should match labels so the two maps do not diverge. Do not silently rewrite Framework in the homepage PR unless a shared string is literally imported (today they are duplicated, not imported). |

### Suggested Act sequence (so nobody guesses)

1. Rank 1 collapse + pin repoint (structure).
2. Rank 2–3 map contracts (architect 10).
3. Rank 4–6 first viewport + nav (10-second + non-specialist).
4. Rank 7–8 selected work + closing (work-first).
5. Rank 9–13 remaining chrome.
6. `npm test` && `npm run build`. If Ask/retrieval goldens still pin old homepage sentences, update goldens to the new public sentences in the same commit.

---

## 5. Non-negotiables

- **Frozen H1:** `I build evidence-grounded AI systems for enterprise operations.` Gloss nearby. Do not rewrite. Do not repoint `validate-ruled-copy.mjs` to a new H1 without a Ravikanth ruling.
- **Two primary hero CTAs:** `Enter the Operations Room` · `Explore the body of work`. No third mint hero button.
- **Five-item nav + Ask.** Labels may clarify (`Framework` is allowed). Count is frozen. Wordmark remains Home.
- **Work-first Operational Intelligence thesis.** Store + loop + inspectable public proofs. Private employer system stays unnamed and unmetric’d.
- **Do not flatten the thesis into HR copy.** Forbidden directions: “I help organizations transform,” “passionate about AIOps,” “open to Staff/Principal roles” as the H1 or map title, “thought leadership,” capability adjectives without an artifact. The Staff/Principal line stays quiet or goes away; it does not become the frame.
- **Authorized Misfire stays a named failure mode** with the permitted-on-untrusted-context clause. Do not replace it with “sometimes AI makes mistakes.”
- **Context Acquisition Tax may keep its name** if the four-record clause **leads**. Do not keep the name as a badge with the clause in a tooltip only.
- **Ten layers stay a filing system.** Do not restore them as the runtime architecture. Do not “simplify” by deleting the store/loop distinction.
- **Batch Intelligence stays a public demo of batch context**, not a fifth architecture box and not a taxonomy layer.
- **No new routes.** No seventh homepage section. No redesign cycle.
- **Public-safety:** no employer product names, internal systems, unpublished metrics. `That system stays private` stays.
- **Do not write copy to satisfy a validator.** Repoint pins when copy moves deliberately.

---

## 6. Definition of 10/10 Verify will use

Verify walks **live or preview `/` only** (plus a 30-second glance at `/framework` if the Batch card claims consistency). Preview SSO does not count as a pass. Score 10 only if **every box is yes**. One no = not 10.

### A. Time-budget (IA)

- [ ] **10s:** A cold visitor can say who this is, that the work is a shared current-ops context plus an investigation loop, and where to click (Operations Room or Work). They do not need the word *substrate* to do that.
- [ ] **30s:** They can point to four distinct things: **store**, **loop**, **public demo**, **filing index** — without being taught by negation twice.
- [ ] **2min:** They have reached Authorized Misfire **and** at least one Operations Room stage, and can say what the Room proves (contradiction kept, unknown named, person decides) versus what it does not (not the private production agent).
- [ ] The hero does **not** restate the same architecture paragraph four times. One map, one destination line, one path.

### B. Architect contracts

- [ ] Owner / change / dependency / transaction are stated as **records** (source + time; dependency splits service path vs batch job graph). Not a four-noun slogan.
- [ ] Stale/thin context is joined to those records (Authorized Misfire is not an isolated coinage).
- [ ] Harness is an investigation **loop** that reads the store and writes back. “Eval gate” is English: checks before a recommendation a person sees.
- [ ] Batch Intelligence is explained as **batch context** (job order / read-write), consistent with `/framework`’s services-vs-batch sentence.
- [ ] Ten layers are filing labels; the Room’s ten stages are not implied to be the same ten.
- [ ] No false production SLOs on the synthetic case. No buzzword architecture (`substrate`, `taxonomy layer`, `execution-graph proof`, `governed tool-call model`, `public-safe proofs`) left undefined on first touch.
- [ ] No invented metrics, schemas, or employer systems to look “more contract-y.”

### C. Dual audience

- [ ] A smart non-specialist can read the first viewport without decoding `attributable`, `operationalization`, `telemetry`, `harness`, `eval gate`, or nav `Operational Intelligence`.
- [ ] Named thesis terms that remain (OI, Context Layer, CAT, Harness, Batch, Authorized Misfire) have a **same-breath clause**.
- [ ] Frozen H1 `evidence-grounded` is glossed in the lead. Title `AIOps` stays; it is not the only explanation of the work.

### D. Work-first (not a recruiting brochure)

- [ ] First viewport is the work and the inspectable proof, not Staff/Principal demand.
- [ ] Closing does not open on hiring. Hiring may appear as a subordinate clause.
- [ ] Codebase Memory is not in the first inspect chip row beside Operations Room and Framework. It may remain in Selected work / ladder.
- [ ] Three bodies of work still lead with production agents and the context layer; career is third or the bridge.

### E. Ruled / safety

- [ ] H1 unchanged. Two hero CTAs unchanged. Five nav items + Ask. No seventh section. No new route.
- [ ] `That system stays private` (or equivalent boundary) remains. No confidential names or unpublished numbers.
- [ ] Validators pin **invariants**, not the old jargon grep. `npm test` and `npm run build` pass.

**Scoring rule for Verify.** Overall 10 only if A–E are all yes. If A and D are yes but B is still slogans, cap **architects at 8** and **overall at 8**. If B is yes but the first viewport is still a glossary, cap **non-specialist at 8** and **overall at 8**. Do not average in a hiring-manager-emotion score. Do not pass PR #12-style metaphor swaps as this 10.

---

## Observe notes for Act / Ravikanth

- PR #11 is the site-wide jargon punch list. This file is the homepage **10/10**. Act on `/` should implement **this** ranked list, using PR #11 replacements where they do not fight a contract sentence.
- PR #12 is not a substitute Act for this audit. Verify already FAILed it against “no jargon.” It also does not make the four answers into records.
- Oscillation brake: do not restore a seventh section, a third hero CTA, or ten layers as the runtime model. Do not “fix” work-first by enlarging Staff/Principal.
- Flag for Ravikanth only if Act wants to retitle published essays or change the frozen H1. Nav `Framework` vs keeping `Operational Intelligence` as the product name is an allowed label choice; destination page must define it either way.
