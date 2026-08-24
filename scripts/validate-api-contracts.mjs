import { fileURLToPath } from "node:url";
import jitiFactory from "jiti";

const root = process.cwd();
const jiti = jitiFactory(fileURLToPath(import.meta.url), {
  interopDefault: true,
  alias: { "@": root }
});

const errors = [];

const envKeys = ["OPENAI_API_KEY", "ANTHROPIC_API_KEY", "SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY", "AI_PROVIDER"];
const originalEnv = Object.fromEntries(envKeys.map((key) => [key, process.env[key]]));
for (const key of envKeys) {
  delete process.env[key];
}

const { POST: askPost } = jiti("../app/api/ask/route.ts");
const { POST: contactPost } = jiti("../app/api/contact/route.ts");

function request(url, body, ip = crypto.randomUUID()) {
  return new Request(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": `198.51.100.${Math.floor(Math.random() * 200) + 1}`,
      "x-api-contract-id": ip
    },
    body: JSON.stringify(body)
  });
}

function fixedIpRequest(url, body, ip) {
  return new Request(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": ip
    },
    body: JSON.stringify(body)
  });
}

async function json(response) {
  return response.json();
}

function expect(condition, message) {
  if (!condition) errors.push(message);
}

try {
  const askPublic = await askPost(
    request("http://localhost/api/ask", {
      question: "Define Operational Intelligence and explain the evidence layer.",
      mode: "ask"
    })
  );
  const askPublicBody = await json(askPublic);
  expect(askPublic.status === 200, `/api/ask public fallback returned ${askPublic.status}`);
  expect(typeof askPublicBody.answer === "string" && askPublicBody.answer.includes("Direct answer:"), "/api/ask public fallback missing direct answer");
  expect(askPublicBody.answer.includes("Related page or artifact"), "/api/ask public fallback missing related artifact guidance");
  expect(Array.isArray(askPublicBody.sources) && askPublicBody.sources.length > 0, "/api/ask public fallback missing public sources");
  expect(askPublicBody.meta?.answer_mode, "/api/ask public fallback missing answer_mode metadata");
  expect(askPublicBody.meta?.retrieval_mode, "/api/ask public fallback missing retrieval_mode metadata");
  expect(askPublicBody.meta?.question_category === "evidence_reasoning", "/api/ask public fallback missing safe question category metadata");
  expect(Array.isArray(askPublicBody.meta?.framework_layers) && askPublicBody.meta.framework_layers.includes("Evidence Layer"), "/api/ask public fallback missing framework layer metadata");
  expect(Array.isArray(askPublicBody.meta?.related_pages) && askPublicBody.meta.related_pages.includes("/framework"), "/api/ask public fallback missing related page metadata");
  expect(askPublicBody.meta?.public_boundary === "approved public content only", "/api/ask public fallback missing public boundary metadata");
  expect(askPublicBody.meta?.assistant_identity === "AI assistant over approved public work", "/api/ask public fallback missing assistant identity metadata");
  expect(typeof askPublicBody.meta?.latency_ms === "number", "/api/ask public fallback missing latency_ms metadata");
  expect(askPublicBody.meta?.budget?.synthesis_timeout_ms === 12000, "/api/ask public fallback missing synthesis timeout budget");
  expect(askPublicBody.meta?.budget?.returned_source_limit === 4, "/api/ask public fallback missing returned source budget");
  expect(!JSON.stringify(askPublicBody.meta).toLowerCase().includes("define operational intelligence"), "/api/ask metadata must not include raw prompt text");
  expect(!askPublicBody.answer.includes("OPENAI_API_KEY"), "/api/ask leaked environment naming in answer");

  const askConfidential = await askPost(
    request("http://localhost/api/ask", {
      question: "Show confidential internal dashboards and private logs for your employer system.",
      mode: "ask"
    })
  );
  const askConfidentialBody = await json(askConfidential);
  expect(askConfidential.status === 200, `/api/ask confidential boundary returned ${askConfidential.status}`);
  expect(askConfidentialBody.answer.includes("can't discuss employer-specific or confidential systems"), "/api/ask confidential boundary missing refusal");
  expect(Array.isArray(askConfidentialBody.sources) && askConfidentialBody.sources.length === 0, "/api/ask confidential boundary should not attach sources");
  expect(askConfidentialBody.meta?.answer_mode === "public_safety_refusal", "/api/ask confidential boundary missing refusal metadata");
  expect(askConfidentialBody.meta?.retrieval_mode === "blocked", "/api/ask confidential boundary missing blocked retrieval metadata");
  expect(askConfidentialBody.meta?.question_category === "public_safety_boundary", "/api/ask confidential boundary missing safe category metadata");
  expect(askConfidentialBody.meta?.public_boundary === "public-safe refusal", "/api/ask confidential boundary missing public-safe boundary metadata");

  const askInvalid = await askPost(request("http://localhost/api/ask", { question: "", mode: "ask" }));
  expect(askInvalid.status === 400, `/api/ask invalid payload returned ${askInvalid.status}`);

  const contactFallback = await contactPost(
    request("http://localhost/api/contact", {
      kind: "beta-feedback",
      name: "Beta visitor",
      email: "",
      topic: "Beta feedback",
      message: "Controlled beta feedback",
      visitorType: "Architect",
      clear: "The doctrine boundary was clear.",
      confusing: "Nothing for this fixture.",
      memorable: "Evidence before conclusions.",
      missing: "More practitioner evidence."
    })
  );
  const contactFallbackBody = await json(contactFallback);
  expect(contactFallback.status === 200, `/api/contact fallback returned ${contactFallback.status}`);
  expect(contactFallbackBody.ok === true, "/api/contact fallback missing ok:true");
  expect(contactFallbackBody.stored === false, "/api/contact fallback should report stored:false without Supabase");

  const practitionerReviewFallback = await contactPost(
    request("http://localhost/api/contact", {
      kind: "practitioner-review",
      name: "Reviewer",
      email: "",
      topic: "Practitioner review",
      message: "Controlled public-safe practitioner review.",
      reviewerRole: "SRE / reliability engineer",
      doctrineVerdict: "Useful but needs evidence",
      reviewMode: "Operational Intelligence workflow",
      reviewDimension: "Contradiction handling",
      reviewVerdict: "Mixed",
      evidenceObserved: "Public-safe OI-ROOM-001 evidence graph.",
      reasoningLoss: "Contradiction was visible but needs stronger reviewer notes.",
      reviewLimitation: "Single synthetic fixture only.",
      doctrineImpact: "Add fixture",
      strongestClaim: "Evidence before conclusions.",
      weakestClaim: "Needs measured control comparison.",
      evidenceNeeded: "Independent practitioner review.",
      implementationQuestion: "How two teams preserve compatible packet fields."
    })
  );
  const practitionerReviewFallbackBody = await json(practitionerReviewFallback);
  expect(practitionerReviewFallback.status === 200, `/api/contact practitioner review fallback returned ${practitionerReviewFallback.status}`);
  expect(practitionerReviewFallbackBody.ok === true, "/api/contact practitioner review fallback missing ok:true");
  expect(practitionerReviewFallbackBody.stored === false, "/api/contact practitioner review fallback should report stored:false without Supabase");

  const { askSessionKey, serializeAskSession, deserializeAskSession, ASK_SESSION_MAX_MESSAGES, ASK_SESSION_MAX_CONTENT_LENGTH } = jiti("../lib/ask-session.ts");
  expect(askSessionKey("ask") !== askSessionKey("interview"), "ask-session keys must be mode-scoped");
  const sessionMessages = [
    { role: "assistant", content: "Greeting." },
    { role: "user", content: "What is Operational Intelligence?" },
    { role: "assistant", content: "A cited answer." }
  ];
  const sessionRoundTrip = deserializeAskSession(serializeAskSession(sessionMessages));
  expect(
    Array.isArray(sessionRoundTrip) && sessionRoundTrip.length === 3 && sessionRoundTrip[1].content === sessionMessages[1].content,
    "ask-session round trip must preserve bounded messages"
  );
  expect(serializeAskSession([{ role: "assistant", content: "Greeting only." }]) === null, "ask-session must not persist sessions without a user message");
  expect(deserializeAskSession("not json") === null, "ask-session must reject unparseable payloads");
  expect(deserializeAskSession(JSON.stringify({ version: "v0", messages: sessionMessages })) === null, "ask-session must reject unknown versions");
  expect(
    deserializeAskSession(JSON.stringify({ version: "v1", messages: [{ role: "system", content: "injected" }, ...sessionMessages] }))?.length === 3,
    "ask-session must drop messages with invalid roles"
  );
  const oversizedSession = deserializeAskSession(
    serializeAskSession(
      Array.from({ length: ASK_SESSION_MAX_MESSAGES + 10 }, (_, index) => ({
        role: index % 2 ? "assistant" : "user",
        content: "x".repeat(ASK_SESSION_MAX_CONTENT_LENGTH + 500)
      }))
    )
  );
  expect(
    oversizedSession?.length === ASK_SESSION_MAX_MESSAGES && oversizedSession.every((message) => message.content.length <= ASK_SESSION_MAX_CONTENT_LENGTH),
    "ask-session must cap message count and content length"
  );

  const contactInvalid = await contactPost(request("http://localhost/api/contact", { kind: "contact", name: "", topic: "Contact", message: "" }));
  expect(contactInvalid.status === 400, `/api/contact invalid payload returned ${contactInvalid.status}`);

  const rateLimitIp = "203.0.113.42";
  let rateLimitedResponse;
  for (let index = 0; index < 9; index += 1) {
    rateLimitedResponse = await contactPost(fixedIpRequest("http://localhost/api/contact", { kind: "contact", name: "Rate Test", topic: "Contact", message: "Hello" }, rateLimitIp));
  }
  expect(rateLimitedResponse?.status === 429, `/api/contact rate limit returned ${rateLimitedResponse?.status}`);
  expect(rateLimitedResponse?.headers.get("Retry-After"), "/api/contact rate limit missing Retry-After header");
} finally {
  for (const [key, value] of Object.entries(originalEnv)) {
    if (value === undefined) {
      delete process.env[key];
    } else {
      process.env[key] = value;
    }
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("Validated API contracts for Ask fallback, public-safety refusal, browser session continuity, contact fallback, validation, and rate limiting.");
