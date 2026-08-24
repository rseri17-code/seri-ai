import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const rubricPath = path.join(root, "content", "ask-quality-rubric.json");
const personaPath = path.join(root, "content", "ask-persona.json");
const evalReportPath = path.join(root, "content", "eval-report.json");
const evalsPagePath = path.join(root, "app", "evals", "page.tsx");
const scorecardPath = path.join(root, "WORLD_CLASS_SCORECARD.md");
const qualityScorecardPath = path.join(root, "content", "quality-scorecard.json");
const compliancePath = path.join(root, "lib", "compliance.ts");
const aiPath = path.join(root, "lib", "ai.ts");
const errors = [];

function expect(condition, message) {
  if (!condition) errors.push(message);
}

const rubric = JSON.parse(fs.readFileSync(rubricPath, "utf8"));
const persona = JSON.parse(fs.readFileSync(personaPath, "utf8"));
const evalReport = JSON.parse(fs.readFileSync(evalReportPath, "utf8"));
const evalsPage = fs.readFileSync(evalsPagePath, "utf8");
const scorecard = fs.readFileSync(scorecardPath, "utf8");
const qualityScorecard = JSON.parse(fs.readFileSync(qualityScorecardPath, "utf8"));
const compliance = fs.readFileSync(compliancePath, "utf8");
const ai = fs.readFileSync(aiPath, "utf8");
const askDimension = qualityScorecard.dimensions?.find((dimension) => dimension.name === "Ask Ravi");
const evalFixtureCount = evalReport.fixtures?.length ?? 0;

expect(rubric.title === "Ask Ravi Live Answer Quality Rubric", "Rubric title must identify Ask Ravi live answer quality.");
expect(rubric.modelQualityScoresFabricated === false, "Rubric must explicitly avoid fabricated model-quality scores.");
expect(Array.isArray(rubric.reviewProtocol) && rubric.reviewProtocol.length >= 6, "Rubric needs at least six review protocol rules.");
expect(Array.isArray(rubric.labels) && rubric.labels.length === 4, "Rubric must define exactly four qualitative labels.");
expect(Array.isArray(rubric.dimensions) && rubric.dimensions.length >= 10, "Rubric must cover at least ten review dimensions.");
expect(Array.isArray(rubric.reviewPromptSet) && rubric.reviewPromptSet.length >= 12, "Rubric must include at least twelve live review prompts.");
expect(rubric.reportingTemplate?.safeMetadataOnly?.length >= 10, "Rubric must define safe metadata fields for reporting.");
expect(rubric.reportingTemplate?.doNotCapture?.length >= 7, "Rubric must define fields that must not be captured.");
expect(evalFixtureCount >= 35, "Eval report must include at least 35 Ask fixtures.");
expect(askDimension, "Quality scorecard must include Ask Ravi dimension.");
expect(askDimension?.evidence?.includes(`${evalFixtureCount} passing fixtures`), "Quality scorecard Ask evidence must use the current eval fixture count.");
expect(scorecard.includes(`${evalFixtureCount} passing fixtures`), "WORLD_CLASS_SCORECARD.md must use the current eval fixture count.");
expect(scorecard.includes(`${evalFixtureCount} deterministic fixtures`), "WORLD_CLASS_SCORECARD.md Ask evidence table must use the current deterministic fixture count.");

expect(persona.title === "Ask Ravikanth Persona Contract", "Ask persona contract title must identify Ask Ravikanth.");
expect(persona.status === "active", "Ask persona contract must be active.");
expect(/AI assistant over Ravikanth Seri's approved public work/i.test(persona.identityDisclosure ?? ""), "Ask persona must disclose AI assistant identity over approved public work.");
expect(Array.isArray(persona.answerPosture) && persona.answerPosture.length >= 6, "Ask persona needs at least six answer-posture rules.");
expect(Array.isArray(persona.answerShape) && persona.answerShape.length >= 5, "Ask persona needs at least five answer-shape rules.");
expect(Array.isArray(persona.mustDo) && persona.mustDo.length >= 5, "Ask persona needs at least five must-do rules.");
expect(Array.isArray(persona.mustNotDo) && persona.mustNotDo.length >= 5, "Ask persona needs at least five must-not-do rules.");
expect(Array.isArray(persona.routingDefaults) && persona.routingDefaults.length >= 7, "Ask persona needs routing defaults for core visitor intents.");

for (const required of [
  "not as a generic chatbot",
  "not in first person as Ravikanth",
  "career arc",
  "established practice, derived application, original synthesis, speculative guidance, and unsupported claims",
  "proof backlog",
  "Do not write as if Ravikanth personally authored the answer in real time.",
  "Do not turn every answer into an Operational Intelligence pitch"
]) {
  expect(JSON.stringify(persona).includes(required), `Ask persona contract missing required posture: ${required}`);
}

for (const required of ["versioned persona contract", "intent-aware follow-up questions"]) {
  expect(askDimension?.evidence?.includes(required), `Quality scorecard Ask evidence missing ${required}.`);
  expect(scorecard.includes(required), `WORLD_CLASS_SCORECARD.md missing Ask evidence ${required}.`);
}

for (const route of [
  "/start-here",
  "/background",
  "/work",
  "/wiki/operational-intelligence-canonical-doctrine",
  "/wiki/operational-intelligence-reference-architecture",
  "/investigation-room",
  "/wiki/operational-intelligence-evidence-pack"
]) {
  expect(persona.routingDefaults.some((item) => item.route === route), `Ask persona routing defaults missing ${route}.`);
}

for (const required of [
  "ask-persona.json",
  "askPersonaInstruction",
  "Ask persona contract",
  "Ask posture",
  "Ask answer shape",
  "Ask must do",
  "Ask must not do",
  "Ask routing default"
]) {
  expect(compliance.includes(required), `lib/compliance.ts missing Ask persona wiring: ${required}`);
}

for (const required of [
  "Answer posture",
  "public engineering judgment",
  "do not imitate him in first person",
  "not as Ravikanth personally and not as a generic chatbot",
  "inferSuggestedNextQuestion",
  "What should a reviewer inspect in Sentinalai before inferring production proof?",
  "Which public evidence best shows Ravikanth's career arc and architecture judgment?",
  "What evidence would change the current scorecard or proof backlog?",
  "Which boundary separates Operational Intelligence from observability and AIOps?"
]) {
  expect(ai.includes(required), `lib/ai.ts missing Ask persona fallback or prompt contract: ${required}`);
}

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
