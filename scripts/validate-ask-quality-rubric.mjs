import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const rubricPath = path.join(root, "content", "ask-quality-rubric.json");
const evalsPagePath = path.join(root, "app", "evals", "page.tsx");
const scorecardPath = path.join(root, "WORLD_CLASS_SCORECARD.md");
const errors = [];

function expect(condition, message) {
  if (!condition) errors.push(message);
}

const rubric = JSON.parse(fs.readFileSync(rubricPath, "utf8"));
const evalsPage = fs.readFileSync(evalsPagePath, "utf8");
const scorecard = fs.readFileSync(scorecardPath, "utf8");

expect(rubric.title === "Ask Ravi Live Answer Quality Rubric", "Rubric title must identify Ask Ravi live answer quality.");
expect(rubric.modelQualityScoresFabricated === false, "Rubric must explicitly avoid fabricated model-quality scores.");
expect(Array.isArray(rubric.reviewProtocol) && rubric.reviewProtocol.length >= 6, "Rubric needs at least six review protocol rules.");
expect(Array.isArray(rubric.labels) && rubric.labels.length === 4, "Rubric must define exactly four qualitative labels.");
expect(Array.isArray(rubric.dimensions) && rubric.dimensions.length >= 10, "Rubric must cover at least ten review dimensions.");
expect(Array.isArray(rubric.reviewPromptSet) && rubric.reviewPromptSet.length >= 12, "Rubric must include at least twelve live review prompts.");
expect(rubric.reportingTemplate?.safeMetadataOnly?.length >= 10, "Rubric must define safe metadata fields for reporting.");
expect(rubric.reportingTemplate?.doNotCapture?.length >= 7, "Rubric must define fields that must not be captured.");

for (const label of ["Exceptional", "Pass", "Needs revision", "Fail"]) {
  expect(rubric.labels.some((item) => item.name === label), `Rubric missing qualitative label ${label}.`);
}

for (const dimension of [
  "Directness",
  "Grounding",
  "Citation usefulness",
  "Uncertainty handling",
  "Public-safety boundary",
  "Operational Intelligence precision",
  "Artifact routing",
  "Visitor usefulness",
  "Voice and restraint",
  "Action safety"
]) {
  const item = rubric.dimensions.find((entry) => entry.name === dimension);
  expect(item, `Rubric missing dimension ${dimension}.`);
  expect(item?.question?.endsWith("?"), `Rubric dimension ${dimension} must be framed as a review question.`);
  expect(item?.evidence?.length >= 40, `Rubric dimension ${dimension} needs concrete evidence guidance.`);
}

for (const category of [
  "canonical_definition",
  "adjacent_domain_comparison",
  "architecture_behavior",
  "operations_room",
  "evidence_handling",
  "evaluation_gate",
  "ravikanth_work",
  "public_code",
  "unknown_metric",
  "confidential_boundary",
  "prompt_injection",
  "visitor_guidance"
]) {
  const prompt = rubric.reviewPromptSet.find((entry) => entry.category === category);
  expect(prompt, `Rubric missing review prompt category ${category}.`);
  expect(prompt?.prompt?.length >= 20, `Rubric prompt ${category} is too short.`);
  expect(Array.isArray(prompt?.mustInspect) && prompt.mustInspect.length > 0, `Rubric prompt ${category} must name artifacts to inspect.`);
}

for (const unsafe of ["raw confidential prompt text", "private employer names", "logs", "screenshots", "dashboards", "secrets"]) {
  expect(rubric.reportingTemplate.doNotCapture.includes(unsafe), `Rubric do-not-capture list missing ${unsafe}.`);
}

for (const required of [
  "askQualityRubric",
  "Live answer rubric",
  "Human review labels",
  "No model-quality score is published until reviewer-labeled sessions exist.",
  "reviewPromptSet",
  "modelQualityScoresFabricated"
]) {
  expect(evalsPage.includes(required), `/evals missing live answer rubric contract: ${required}`);
}

for (const required of [
  "reviewer-labeled answer rubrics",
  "Live answer rubric",
  "safe metadata",
  "No aggregate quality score"
]) {
  expect(scorecard.includes(required), `WORLD_CLASS_SCORECARD.md missing Ask quality evidence contract: ${required}`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validated Ask Ravi live answer rubric across ${rubric.dimensions.length} dimensions and ${rubric.reviewPromptSet.length} prompts.`);
