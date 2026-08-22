# seri.ai Mobile Touch Walkthrough Evidence

Date: 2026-08-22
Viewport: 390x844
Evidence level: source-validated walkthrough notes

These notes cover dense mobile review flows where a visitor needs to tap, scan, scroll, and recover context without treating seri.ai as a static screenshot.

This is not external reviewer feedback and not a physical-device lab run. It is source-validated mobile QA evidence tied to labelled controls, responsive contracts, accessibility checks, visual QA screenshots, and route-level product intent.

## Routes

| Route | Task | Source-validated result | Remaining risk |
| --- | --- | --- | --- |
| `/ask` | Ask a public-safe question, inspect the answer packet, and follow related sources. | Input, send button, suggested prompts, source links, related artifacts, trust contract, and fallback behavior are represented in source and validators. | No live reviewer-labeled answer baseline; long answers may create scroll fatigue. |
| `/investigation-room` | Start with the graph, step through evidence/replay/hypotheses/action gate/release gate, toggle evidence, and inspect the decision packet. | Mobile route prioritizes the graph; interactive controls preserve evidence, contradiction, missing evidence, hypothesis, and human-approval states. | Needs real-device interaction-latency evidence and external graph-quality review. |
| `/wiki/operational-intelligence-canonical-doctrine` | Use contents, Ask shortcuts, related reading, and dense-table fallbacks without losing orientation. | Mobile reading scaffold, contents, Ask questions, table containment, related reading, and version history are validated. | External readers may still find doctrine sections too dense on mobile. |
| `/radar` | Inspect the thesis spine, market signals, source evidence, and falsification posture. | Responsive route structure, labelled source links, evidence posture, and Radar retrieval routing are validated. | External reviewers may need clearer priority between trend, Ravikanth angle, and falsification question. |
| `/work` | Understand the operating arc, inspect public links, review project proof, and continue to background or resume evidence. | Work page keeps Ravikanth, public work, project proof, public-code boundaries, GitHub, LinkedIn, and review spine connected. | External reviewers still need to confirm the career-to-work path is obvious. |

## Boundary

This closes the absence of mobile touch walkthrough notes. It does not prove external first-time visitor comprehension, physical-device performance, or executive/recruiter memorability. Those remain separate proof gaps.
