import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const packetPath = path.join(root, "content", "ask-live-review-packet.json");
const rubricPath = path.join(root, "content", "ask-quality-rubric.json");
const publicPacketPath = path.join(root, "public", "publication-pack", "ask-ravi-live-review-packet.md");
const scorecardPath = path.join(root, "WORLD_CLASS_SCORECARD.md");
const errors = [];

function expect(condition, message) {
  if (!condition) errors.push(message);
}

const packet = JSON.parse(fs.readFileSync(packetPath, "utf8"));
const rubric = JSON.parse(fs.readFileSync(rubricPath, "utf8"));
const publicPacket = fs.readFileSync(publicPacketPath, "utf8");
const scorecard = fs.readFileSync(scorecardPath, "utf8");

expect(packet.title === "Ask Ravi Live Review Packet", "Packet title must identify Ask Ravi live review.");
expect(packet.modelQualityScoresFabricated === false, "Packet must explicitly reject fabricated model-quality scores.");
expect(packet.reviewStatus?.reviewerLabeledSessionsPublished === false, "Packet must not claim reviewer-labeled sessions exist.");
expect(packet.reviewStatus?.aggregateQualityScorePublished === false, "Packet must not claim an aggregate quality score exists.");
expect(/no reviewer-labeled live Ask sessions/i.test(packet.reviewStatus?.limitation ?? ""), "Packet limitation must name missing reviewer-labeled sessions.");
expect(Array.isArray(packet.reviewModes) && packet.reviewModes.length === 3, "Packet must define the three answer modes under review.");
expect(Array.isArray(packet.reviewProtocol) && packet.reviewProtocol.length >= 8, "Packet needs at least eight live review protocol rules.");
expect(Array.isArray(packet.requiredPromptCategories) && packet.requiredPromptCategories.length >= rubric.reviewPromptSet.length, "Packet must cover every rubric prompt category.");
expect(Array.isArray(packet.safeMetadataOnly) && packet.safeMetadataOnly.length >= 10, "Packet must define safe metadata fields.");
expect(Array.isArray(packet.doNotCapture) && packet.doNotCapture.length >= 8, "Packet must define do-not-capture fields.");

for (const category of rubric.reviewPromptSet.map((entry) => entry.category)) {
  expect(packet.requiredPromptCategories.includes(category), `Packet missing rubric prompt category ${category}.`);
}

for (const mode of ["local_fallback", "vector_retrieval", "model_synthesis"]) {
  expect(packet.reviewModes.some((entry) => entry.mode === mode), `Packet missing answer mode ${mode}.`);
}

for (const artifact of ["/ask", "/evals", "/contact", "/wiki/operational-intelligence-evidence-pack", "/publication-pack/ask-ravi-live-review-packet.md"]) {
  expect(packet.requiredArtifactsToInspect.includes(artifact), `Packet missing required artifact ${artifact}.`);
}

for (const unsafe of ["raw confidential prompt text", "private employer names", "logs", "screenshots", "dashboards", "secrets", "system prompts", "developer messages"]) {
  expect(packet.doNotCapture.includes(unsafe), `Packet do-not-capture list missing ${unsafe}.`);
}

for (const required of [
  "no reviewer-labeled live sessions have been published yet",
  "Do not publish an aggregate model-quality score",
  "safe metadata only",
  "local_fallback",
  "vector_retrieval",
  "model_synthesis",
  "confidential_boundary",
  "prompt_injection"
]) {
  expect(publicPacket.toLowerCase().includes(required.toLowerCase()), `Public packet missing required text: ${required}`);
}

for (const required of ["Ask live review packet", "reviewer-labeled", "No aggregate quality score", "safe metadata"]) {
  expect(scorecard.includes(required), `WORLD_CLASS_SCORECARD.md missing live review packet evidence: ${required}`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validated Ask Ravi live review packet across ${packet.requiredPromptCategories.length} prompt categories and ${packet.reviewModes.length} modes.`);
