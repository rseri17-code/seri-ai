import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import jitiFactory from "jiti";

const jiti = jitiFactory(fileURLToPath(import.meta.url), { interopDefault: true, alias: { "@": process.cwd() } });
const { localSearch, resolveAskContext } = jiti("../lib/search.ts");
const { buildPublicSourceIndex } = jiti("../lib/content.ts");
const { generateRaviAnswer } = jiti("../lib/ask-answer.ts");
const { validateSynthesizedAnswer } = jiti("../lib/ask-llm.ts");
const { productionDeliveryUrl, earlierDeliveryOutcomes } = jiti("../lib/production-delivery.ts");

const questions = [
  "What has Ravikanth shipped in production, and what measured outcomes are publicly documented?",
  "What did he ship?",
  "What production systems has Ravikanth deployed?",
  "What measured outcomes did Ravikanth's AI agent deliver?",
  "Does his synthetic demo prove production results?",
  "How many users adopted his AI agent and what was its MTTR improvement?",
  "What is his production experience?"
];
const generic = [{ title: "Public project proof", url: "/work", content: "Synthetic examples do not establish private production outcomes." }];
for (const question of questions) {
  const hits = localSearch(question, 4);
  assert.equal(hits[0].source.id, "profile:production-delivery", question);
  const context = resolveAskContext(question, generic);
  assert.equal(context[0].url, productionDeliveryUrl, question);
  assert(context.some((source) => source.url === "/resume" && source.content.includes("80%")), question);
  assert.equal(new Set(context.map((source) => source.url)).size, context.length, "duplicate sources crowd out evidence");
  const result = await generateRaviAnswer({ question, context, env: { ASK_LLM_PROVIDER: "none" } });
  assert.equal(result.mode, "local_fallback");
  assert.match(result.answer, /from thesis to production/);
  assert.match(result.answer, /not published|not independently verify/);
  assert.match(result.answer, /earlier identity and automation work, not the investigation agent/);
  assert.match(result.answer, /80%/);
  assert.doesNotMatch(result.answer, /No publicly documented production shipments/);
}

const sources = buildPublicSourceIndex();
assert(sources.find((source) => source.id === "profile:ravikanth-seri-resume-evidence").content.includes("200 engineering hours per quarter"));
assert.equal(earlierDeliveryOutcomes.length, 2);
for (const [question, url] of [
  ["What is Operational Intelligence?", "/wiki/operational-intelligence-canonical-doctrine"],
  ["What is Batch Intelligence?", "/framework#batch-intelligence"],
  ["Which asset defines implementation contracts, schemas, state machines, and conformance?", "/wiki/operational-intelligence-reference-architecture"]
]) assert.equal(localSearch(question)[0].source.url, url, "career routing displaced architecture retrieval");

const question = questions[0];
const context = resolveAskContext(question, generic);
const env = { ASK_LLM_PROVIDER: "groq", GROQ_API_KEY: "test-only-placeholder" };
const mock = (answer, inspect) => async (_url, init) => {
  inspect?.(JSON.parse(init.body));
  return new Response(JSON.stringify({ choices: [{ message: { content: answer } }] }), { status: 200, headers: { "Content-Type": "application/json" } });
};
const supported = "Ravikanth took an enterprise SRE investigation agent from thesis to production [P1]. AI adoption and performance metrics are not published. Earlier identity work includes a migration across 120+ applications and Python automation reducing support tickets by 80%, recovering about 200 engineering hours per quarter [P2]. These earlier outcomes are not AI-agent results; the synthetic example does not verify employer outcomes. Citations: [P1] /work#production-delivery; [P2] /resume.";
const synthesized = await generateRaviAnswer({ question, context, env, fetchImpl: mock(supported, (request) => {
  assert(request.messages[1].content.includes("from thesis to production"));
  assert(request.messages[1].content.includes("200 engineering hours per quarter"));
  assert(request.messages[0].content.includes("Missing production metrics do not negate documented production delivery"));
}) });
assert.equal(synthesized.mode, "ai_synthesis");
assert.equal(synthesized.answer, supported);
const denial = "No publicly documented production shipments or measured outcomes are provided in the available records. [P1] /work#production-delivery";
assert.equal(validateSynthesizedAnswer(denial, context, { question }).reason, "contradicted_experience");
const rejected = await generateRaviAnswer({ question, context, env, fetchImpl: mock(denial) });
assert.equal(rejected.mode, "local_fallback");
assert.equal(rejected.llmSkipReason, "validation_rejected");
assert.match(rejected.answer, /from thesis to production/);
for (const fabricated of [
  "The production AI agent reduced MTTR by 40% and has 500 users [P1]. Citations: [P1] /work#production-delivery.",
  "His investigation agent reduced support tickets by 80% [P2]. Citations: [P2] /resume."
]) {
  assert.equal(validateSynthesizedAnswer(fabricated, context, { question: questions[5] }).reason, "unsupported_outcome");
  const result = await generateRaviAnswer({ question: questions[5], context, env, fetchImpl: mock(fabricated) });
  assert.equal(result.mode, "local_fallback");
  assert.match(result.answer, /performance measurements are not published/);
  assert.doesNotMatch(result.answer, /40%|500 users/);
}
console.log(`Validated ${questions.length} delivery queries, unrelated retrieval, grounded synthesis, and contradictory-answer fallback.`);
