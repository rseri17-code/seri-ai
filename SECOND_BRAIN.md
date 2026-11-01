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

## Session Log

### 2026-11-01
- Discussed Grok identity, tools, system prompt visibility, memory mechanics (markdown file, search-and-replace, no graph, no RAG visibility).
- User requested family details removed from memory; Keerti replaced with Teju in stored entry.
- Designed and created this SECOND_BRAIN.md in seri-ai repo as persistent second-brain / steering file.
- Agreed: end-of-session updates + start-of-session reads for continuity and relational mapping.
