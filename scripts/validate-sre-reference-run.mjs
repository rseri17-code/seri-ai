import assert from "node:assert/strict";
import fs from "node:fs";

const model = fs.readFileSync("lib/operational-intelligence/sre-reference-run.ts", "utf8");
const ui = fs.readFileSync("components/sre-reference-run.tsx", "utf8");

const orderedEvents = ["alert", "incident", "logs", "metrics", "traces", "topology", "change", "memory", "hypothesis", "contradiction", "gate-blocked", "gate-ready", "decision", "memory-reviewed"];
let previous = -1;
for (const id of orderedEvents) {
  const position = model.indexOf(`id: "${id}"`);
  assert(position > previous, `${id} must exist in deterministic order`);
  previous = position;
}
for (const source of ["logs", "metrics", "traces", "topology", "change", "memory"]) assert(model.includes(`source: "${source}"`), `${source} evidence is required`);
for (const title of [
  "MCP request · logs",
  "MCP request · metrics",
  "MCP request · traces",
  "MCP request · topology + ownership",
  "MCP request · recent change",
  "MCP request · approved similar cases",
]) assert(model.includes(title), `${title} must remain a distinct governed evidence request`);
for (const receipt of ["Observation", "Inference", "Contradiction", "Missing Evidence", "Confirmed Fact"]) assert(model.includes(`"${receipt}"`), `${receipt} receipt is required`);
assert.match(model, /confidence: 82[\s\S]*confidence: 61/, "contradiction must lower confidence");
assert.match(model, /blocked: true[\s\S]*blocked: false/, "gate must block before becoming reviewable");
assert.match(model, /memoryStored: Boolean\(decision/, "memory must require operator review");
assert.match(model, /id: "contradiction"[\s\S]*title: "Contradiction received"/, "contradiction must be explicit in the event stream");
assert.match(model, /id: "gate-blocked"[\s\S]*blocked: true/, "unsupported recommendation must be blocked by the evaluation gate");
assert.match(model, /const awaitingDecision = visible\.some/, "decision packet controls must be fixture-event gated");
assert.match(model, /decision && visible\.some\(\(event\) => event\.id === "memory-reviewed"\)/, "only an operator-reviewed outcome may enter memory");
for (const control of ["Play", "Pause", "Step", "Reset"]) assert(ui.includes(control), `${control} control is required`);
assert.match(ui, /aria-label="Reference run controls"/, "playback controls require an accessible group label");
assert.match(ui, /sreReferenceRun\.events\.map/, "the complete deterministic run must have a server-renderable summary");
assert.match(ui, /setPlaying\(false\); setIndex\(-1\); setDecision\(null\)/, "reset must clear playback and decision state");
assert.match(ui, /disabled=!\{snapshot\.awaitingDecision\}|disabled=\{!snapshot\.awaitingDecision\}/, "operator outcome must remain gated");

console.log("Validated deterministic SRE reference run progression, controls, contradiction, gate, and reviewed memory.");
