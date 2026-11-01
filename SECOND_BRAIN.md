# Second Brain

Persistent memory and continuity file for Grok voice sessions with Ravi (rseri17-code / @rserz17 on X).

## Purpose

This file is the relational layer on top of raw conversation memory. It maps entities, history, and open threads so each new session starts with context instead of a blank slate.

## Operating Rules

1. **Session start:** Before responding to anything substantive, read this file and map the user's current topic to prior history, entities, and open items listed below.
2. **Session end:** Before the conversation closes, update this file with anything new: decisions, open questions, entity changes, project status, and the last topic discussed.
3. **Literal updates only:** Edit with search-and-replace against exact stored text. Do not rewrite surrounding content unless asked.
4. **No secrets:** Never store credentials, tokens, passwords, or private keys in this file.
5. **Family boundary:** Do not proactively raise family details. Only reference if the user brings it up in the current session.

## Entity Map

### People
- **Ravi (Ravikanth Seri)** — Sr. Tech Lead, AIOps/Observability at TIAA. Building ObserveAI/GAIT agents. Side projects: StreamKeeper, seri-ai. Using Kiro for agent dev. Pursuing internal Generative Agentic AI Developer role (~$240k target).
- **Teju** — Partner. Two kids.
- **Justin** — TIAA recruiter handling internal role follow-ups.
- **Panel teammate (TIAA)** — source of interview feedback for internal role.

### Projects
- **StreamKeeper / Poly Energy** — AI-powered plastic capture (river cameras) + pyrolysis conversion. Edge: Raspberry Pi per site, S3 hub, heartbeats, chain of custody, loss modeling. CV research phases 1-4 in progress (YOLOv8 baseline, mixed-background training, calibration). Repo: rseri17-code/Streamkeeper (private). Co-founder dependency: one pilot site with scale and camera mount. Licensing flag: YOLO AGPL-3.0 vs RF-DETR Apache 2.0.
- **Sentinalai** — Deterministic, policy-governed SRE agent. Repo: rseri17-code/Sentinalai.
- **seri-ai** — Personal brand / operational intelligence platform. Repo: rseri17-code/seri-ai. This file lives here.
- **ITSM-mlops** — Incident management ops. Repo: rseri17-code/ITSM-mlops.
- **ObserveAI (TIAA)** — Production SRE/ObserveAI agents: GAIT orchestrator, MCP/AgentCore, deterministic flows, governance-first, context layers.

### Career
- Internal TIAA Generative Agentic AI Developer role: applied, interviewed, awaiting panel feedback via Justin. Salary negotiation target $240k (range $180-245k). Prior accepted $240k offer for similar role.
- LinkedIn strategy: one sharp thought-leadership post per month. Recent themes: distributed/operational intelligence thesis, graph-based knowledge graphs, ontology tracking.

## Open Threads (as of 2026-11-01)

- [ ] TIAA internal role feedback follow-up with panel teammate via Justin.
- [ ] StreamKeeper Phase 1: acquire AquaPlasticWaste 2026 + Plastic Bottles Dataset, run YOLOv8 nano baseline in Colab, evaluate mAP.
- [ ] StreamKeeper co-founder: secure one pilot site with scale and camera mount.
- [ ] seri-ai: ongoing platform development and public branding.
- [ ] Kiro memory-graph pattern: sharing with 230-person enterprise team.
- [ ] Memory system: this file is the continuity mechanism across Grok voice sessions.
- [ ] Memory thesis for seri-ai / LinkedIn: draft and publish research-grounded agent memory thesis parallel to context layer work.
- [ ] seri-ai patterns.json: operational-memory slug is registered in stage list but linked page path does not resolve to a file; consider adding dedicated memory thesis page.
- [ ] Memory animation/visualization for seri-ai, similar to context-layer animation, covering memory types for SRE agent.

## Research-Grounded Memory Thesis (added 2026-11-01)

### Core taxonomy (CoALA, Sumers et al., Princeton, 2023)
Cognitive Architectures for Language Agents mapped four cognitive-science systems onto language agents: working memory (context window), episodic memory (past experiences/runs), semantic memory (stable facts about world/user), procedural memory (skills, instructions, code). This is the canonical starting point, not an invention.

### Extended types for SRE/ObserveAI mapping
- **Task memory:** goals, subtasks, progress across multi-session workstreams.
- **Tool memory:** which tools worked/failed, right parameters, dead-end avoidance.
- **Reflective memory:** agent critiquing its own past decisions; post-incident review updating other memory types.

### SRE agent mapping
- Semantic → service graph, ownership metadata, known failure modes.
- Episodic → incident history with evidence ledgers.
- Procedural → GAIT orchestration rules, policy locks.
- Task → active investigation state.
- Tool → MCP/AgentCore tool registry with success/failure traces.
- Reflective → post-incident review loop.

### Key research anchors (verify before citing publicly)
- arXiv 2602.06052, "Rethinking Memory Mechanisms of Foundation Agents in the Second Half" — TMLR 2026, 218 papers, three dimensions: substrate (internal/external), cognitive mechanism (sensory/working/episodic/semantic/procedural), subject (user-centric/agent-centric). Awesome-Agent-Memory repo tracks 1,224 papers.
- OpenChamber analysis of 3,283 papers (2023-2026): 91 papers in 2023 → 2,233 in 2026. Strongest evidence: keep raw history, spend effort on retrieval, version facts that change, bind every record to origin at write time. Memory poisoning: 81.7% cross-session success against Claude Code. No tested system passes more than 1.5% of forget requests. Benchmarks: LOCOMO, LongMemEval, MemoryAgentBench (ICLR 2026).
- Anthropic Managed Agents memory (Apr 2026): filesystem-based, audit logs, export/rollback/redact. Rakuten: 97% first-pass error reduction. Netflix: cross-session continuity. Harvey: 6x task completion via Dreaming (pattern-finding across sessions).
- Microsoft Research (May 2026, arXiv 2605.08538): biologically-grounded architecture — sleep-phase consolidation, interference-based forgetting, engram maturation, reconsolidation upon retrieval, entity knowledge graphs, hybrid multi-cue retrieval. 97.2% retention precision, 58% store reduction on VSCode 13K-issue dataset. LongMemEval: 475 sessions, ~540K turns.
- EMMA (Oct 2026, arXiv 2610.35966): structured episodic memory for multi-agent workflow synthesis; up to 32.5% over strongest baseline (ACE, GEPA, EvoMAS, ADAS) on KramaBench/AppWorld/BBEH.
- arXiv 2610.39790 (Oct 2026): complementary curation and consolidation of episodic + structured relational memories; 90.2% LoCoMo, 85.5% LongMemEval-S.
- MemGPT (Packer et al., 2023): context as OS virtual memory, paging between tiers. MemoryBank: Ebbinghaus forgetting curve. Generative Agents (Park et al., 2023): reflection-based memory synthesis.

### Thesis statement for seri-ai / LinkedIn
Context answers what is true now. Memory answers what was learned before. Conflating them is the category error most teams make (Atlan guide: "Treating memory as a property of the vector DB is the canonical category error"). Context was stages 1-3 of the four-stage pattern model. Memory is the same discipline applied to time instead of structure. The agent is not the moat — memory architecture matters at the same order of magnitude as retrieval architecture.

### Chain (from codebase-memory page, still holds)
Graph without memory is a map with no history. Memory without freshness is a confident stale note. Freshness without verification is a warning with no verdict. Memory without governance is a leak — in a regulated environment, every write needs provenance, approval, and an invalidation condition.

### Open research questions (honest gaps)
- Write-path governance: should episodic overflow auto-distill into semantic, or require human approval? (AppScale three-tier pattern argues consolidation must gate semantic writes.)
- Forgetting is unsolved: 1.5% forget-request pass rate means right-to-be-forgotten is not production-ready.
- Poisoning defense: prompt-level defenses barely help once memory is poisoned; need write-time origin binding and anomaly detection on memory writes.
- Benchmark saturation: LOCOMO/LongMemEval may not transfer to operational/SRE domains.
