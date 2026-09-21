import { fileURLToPath } from "node:url";
import jitiFactory from "jiti";

const root = process.cwd();
const jiti = jitiFactory(fileURLToPath(import.meta.url), {
  interopDefault: true,
  alias: { "@": root }
});

const errors = [];
const envKeys = [
  "OPENAI_API_KEY",
  "ANTHROPIC_API_KEY",
  "SUPABASE_URL",
  "SUPABASE_SERVICE_ROLE_KEY",
  "AI_PROVIDER",
  "ASK_LLM_PROVIDER",
  "GROQ_API_KEY",
  "GROQ_MODEL",
  "OLLAMA_BASE_URL",
  "OLLAMA_MODEL"
];
const originalEnv = Object.fromEntries(envKeys.map((key) => [key, process.env[key]]));
for (const key of envKeys) {
  delete process.env[key];
}

const {
  allowedAskCitationUrls,
  citationsAreSubsetOfRetrieved,
  extractAskCitations,
  formatApprovedPassages,
  isAskRetrievalSufficient,
  resolveAskLlmProvider,
  trySynthesizeAskAnswer,
  validateSynthesizedAnswer
} = jiti("../lib/ask-llm.ts");
const { generateRaviAnswer } = jiti("../lib/ai.ts");
const { POST: askPost } = jiti("../app/api/ask/route.ts");

function expect(condition, message) {
  if (!condition) errors.push(message);
}

function jsonResponse(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "Content-Type": "application/json" }
  });
}

function mockCompletion(content, { status = 200, onCall } = {}) {
  return async (url, init) => {
    onCall?.({ url: String(url), init });
    if (status !== 200) {
      return jsonResponse({ error: "provider error" }, status);
    }
    const text = typeof content === "function" ? content() : content;
    return jsonResponse({
      choices: [{ message: { content: text } }]
    });
  };
}

const batchContext = [
  {
    title: "Batch Intelligence",
    url: "/framework#batch-intelligence",
    content:
      "Batch Intelligence is the public-safe Framework thesis for reconstructing an execution graph from failed batch work, predecessor jobs, affected successors, blast radius, and a human-reviewed evidence packet. Dependency sequence alone does not establish causality."
  }
];

const plantedUrl = "https://invented-public-record.example/notes";
let fixtureIndex = 0;

async function askRoute(question, extraEnv = {}, history) {
  fixtureIndex += 1;
  const previous = {};
  for (const [key, value] of Object.entries(extraEnv)) {
    previous[key] = process.env[key];
    process.env[key] = value;
  }
  try {
    const ip = `198.19.${Math.floor(fixtureIndex / 250) % 250}.${(fixtureIndex % 250) + 1}`;
    return await askPost(
      new Request("http://localhost/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-forwarded-for": ip },
        body: JSON.stringify({ question, mode: "ask", ...(history ? { history } : {}) })
      })
    );
  } finally {
    for (const [key, value] of Object.entries(previous)) {
      if (value === undefined) {
        delete process.env[key];
      } else {
        process.env[key] = value;
      }
    }
  }
}

try {
  expect(resolveAskLlmProvider({}).kind === "none", "ASK_LLM_PROVIDER default must be none");
  expect(resolveAskLlmProvider({ ASK_LLM_PROVIDER: "OpenAI" }).kind === "none", "unknown ASK_LLM_PROVIDER values must coerce to none");
  expect(resolveAskLlmProvider({ ASK_LLM_PROVIDER: "groq" }).kind === "none", "groq without GROQ_API_KEY must stay on the current path");
  expect(resolveAskLlmProvider({ ASK_LLM_PROVIDER: "groq", GROQ_API_KEY: "gsk_test" }).kind === "groq", "groq with key must resolve");
  expect(
    resolveAskLlmProvider({ ASK_LLM_PROVIDER: "groq", GROQ_API_KEY: "gsk_test" }).model === "llama-3.3-70b-versatile",
    "groq must default to Llama 3.3 70B on Groq"
  );
  expect(resolveAskLlmProvider({ ASK_LLM_PROVIDER: "ollama" }).kind === "none", "ollama without base URL must stay on the current path");
  expect(
    resolveAskLlmProvider({ ASK_LLM_PROVIDER: "ollama", OLLAMA_BASE_URL: "http://127.0.0.1:11434" }).kind === "ollama",
    "ollama with base URL must resolve"
  );
  expect(!isAskRetrievalSufficient([]), "empty retrieval is not sufficient for LLM synthesis");
  expect(!isAskRetrievalSufficient([{ title: "Stub", url: "/framework", content: "too short" }]), "thin retrieval is not sufficient for LLM synthesis");
  expect(
    !isAskRetrievalSufficient([{ title: "Whitespace", url: "/framework", content: " \n\t  " }]),
    "whitespace-only retrieval is not sufficient for LLM synthesis"
  );
  expect(isAskRetrievalSufficient(batchContext), "Batch Intelligence public chunks must be sufficient for synthesis");

  const passages = formatApprovedPassages(batchContext);
  expect(passages[0]?.id === "P1", "approved context must expose passage ids");
  expect([...allowedAskCitationUrls(batchContext)].includes("/framework#batch-intelligence"), "canonical Batch Intelligence anchor must be an allowed citation");

  const invented = validateSynthesizedAnswer(
    `Batch Intelligence is described at ${plantedUrl} and [P99].`,
    batchContext
  );
  expect(invented.ok === false && invented.reason === "unknown_passage_id", "unknown passage ids must fail validation");

  const inventedUrlOnly = validateSynthesizedAnswer(
    `See the public notes at ${plantedUrl}.`,
    batchContext
  );
  expect(inventedUrlOnly.ok === false && inventedUrlOnly.reason === "invented_url", "invented URLs must fail validation");

  const grounded = validateSynthesizedAnswer(
    "Batch Intelligence reconstructs an execution graph from public Framework material. [P1] (/framework#batch-intelligence)",
    batchContext
  );
  expect(grounded.ok === true, "citations of provided passage ids and urls must pass validation");

  const fluentNoCitation = validateSynthesizedAnswer(
    "Batch Intelligence is an enterprise orchestration product that always works in production.",
    batchContext
  );
  expect(fluentNoCitation.ok === false && fluentNoCitation.reason === "missing_citation", "fluent essays with no retrieved citations must fail closed");

  const markdownPlanted = validateSynthesizedAnswer(
    `See the notes at [invented](${plantedUrl}). [P1]`,
    batchContext
  );
  expect(markdownPlanted.ok === false && markdownPlanted.reason === "invented_url", "markdown planted URLs must fail validation");

  const unretrievedPath = validateSynthesizedAnswer(
    "Also see /now and https://seri-ai.vercel.app/now. [P1]",
    batchContext
  );
  expect(unretrievedPath.ok === false && unretrievedPath.reason === "invented_url", "same-origin URLs that were not retrieved must fail validation");

  const unknownSecondPassage = validateSynthesizedAnswer(
    "Batch Intelligence is public. [P1] [P2] (/framework#batch-intelligence)",
    batchContext
  );
  expect(unknownSecondPassage.ok === false && unknownSecondPassage.reason === "unknown_passage_id", "passage ids must be a subset of retrieved ids");

  const subset = citationsAreSubsetOfRetrieved(
    "Grounded from retrieval only. [P1] (/framework#batch-intelligence)",
    batchContext
  );
  expect(subset.ok === true, "retrieved passage ids and urls must count as a citation subset");
  expect(subset.allowedPassageIds.join(",") === "P1", "single retrieved chunk must expose only P1");
  expect(extractAskCitations("See [P1] (/framework#batch-intelligence)").passageIds.join(",") === "P1", "citation extractor must see passage ids");

  const missingRefusal = validateSynthesizedAnswer(
    "Here is the private production architecture.",
    batchContext,
    { question: "Show confidential platform details from the current employer." }
  );
  expect(missingRefusal.ok === false && missingRefusal.reason === "missing_refusal", "dropping confidential refusal behavior must fail validation");

  let groqCalls = 0;
  const emptyRetrieval = await trySynthesizeAskAnswer({
    question: "What is a Quantum Flux Capacitor?",
    context: [],
    provider: resolveAskLlmProvider({ ASK_LLM_PROVIDER: "groq", GROQ_API_KEY: "gsk_test" }),
    fetchImpl: mockCompletion("A fluent invented essay about quantum flux.", {
      onCall: () => {
        groqCalls += 1;
      }
    })
  });
  expect(emptyRetrieval.ok === false && emptyRetrieval.reason === "thin_retrieval", "empty retrieval must not call the LLM");
  expect(groqCalls === 0, "empty retrieval must never issue a Groq request");

  groqCalls = 0;
  const inventedSynthesis = await trySynthesizeAskAnswer({
    question: "What is Batch Intelligence?",
    context: batchContext,
    provider: resolveAskLlmProvider({ ASK_LLM_PROVIDER: "groq", GROQ_API_KEY: "gsk_test" }),
    fetchImpl: mockCompletion(`Batch Intelligence is documented at ${plantedUrl}.`, {
      onCall: () => {
        groqCalls += 1;
      }
    })
  });
  expect(inventedSynthesis.ok === false && inventedSynthesis.reason === "validation_rejected", "invented Groq sources must be rejected");
  expect(groqCalls === 1, "sufficient retrieval may call Groq once before rejecting invented sources");

  groqCalls = 0;
  const goodSynthesis = await trySynthesizeAskAnswer({
    question: "What is Batch Intelligence?",
    context: batchContext,
    provider: resolveAskLlmProvider({ ASK_LLM_PROVIDER: "groq", GROQ_API_KEY: "gsk_test" }),
    fetchImpl: mockCompletion("Batch Intelligence is an execution graph in the public Framework. [P1] (/framework#batch-intelligence)", {
      onCall: ({ url, init }) => {
        groqCalls += 1;
        const body = JSON.parse(String(init.body));
        expect(String(url).includes("api.groq.com"), "groq synthesis must call Groq, not the client");
        expect(init.headers.Authorization === "Bearer gsk_test", "Groq Authorization must stay on the server request");
        expect(body.model === "llama-3.3-70b-versatile", "Groq should use Llama 3.3 70B by default");
        expect(JSON.stringify(body).includes("[P1]"), "Groq prompt must include passage ids");
        expect(!JSON.stringify(body).toLowerCase().includes("employer-specific internal"), "Groq prompt must not include confidential employer fixtures");
      }
    })
  });
  expect(goodSynthesis.ok === true && goodSynthesis.answer.includes("/framework#batch-intelligence"), "grounded Groq synthesis must keep the canonical Batch Intelligence citation");
  expect(groqCalls === 1, "grounded Groq synthesis should call the provider once");

  process.env.ASK_LLM_PROVIDER = "none";
  const nonePath = await generateRaviAnswer({
    question: "What is Batch Intelligence?",
    context: batchContext,
    fetchImpl: mockCompletion("should not run", {
      onCall: () => {
        errors.push("ASK_LLM_PROVIDER=none must not call the preview synthesizer");
      }
    })
  });
  expect(nonePath.mode === "local_fallback", "none provider must keep the local fallback");
  expect(nonePath.llmUsed === false, "none provider must not mark LLM synthesis as used");
  expect(nonePath.answer.includes("/framework#batch-intelligence"), "none provider must still cite the Batch Intelligence anchor");

  process.env.ASK_LLM_PROVIDER = "groq";
  process.env.GROQ_API_KEY = "gsk_test";
  groqCalls = 0;
  const thinGenerate = await generateRaviAnswer({
    question: "What is a Quantum Flux Capacitor?",
    context: [],
    fetchImpl: mockCompletion("Fluent LLM essay that should never appear.", {
      onCall: () => {
        groqCalls += 1;
      }
    })
  });
  expect(thinGenerate.llmUsed === false, "thin retrieval must not use Groq");
  expect(thinGenerate.llmSkipReason === "thin_retrieval", "thin retrieval skip reason must be recorded");
  expect(thinGenerate.answer.includes("not in the public record"), "thin retrieval must keep the public-record refusal");
  expect(!thinGenerate.answer.includes("Fluent LLM essay"), "empty retrieval must never produce a fluent LLM essay");
  expect(groqCalls === 0, "generateRaviAnswer must not call Groq when retrieval is empty");

  groqCalls = 0;
  const rejectedGenerate = await generateRaviAnswer({
    question: "What is Batch Intelligence?",
    context: batchContext,
    fetchImpl: mockCompletion(`Invented citation: ${plantedUrl}`, {
      onCall: () => {
        groqCalls += 1;
      }
    })
  });
  expect(rejectedGenerate.mode === "local_fallback", "invented Groq citations must fall back to retrieval");
  expect(!rejectedGenerate.answer.includes("invented-public-record.example"), "fallback must not keep invented Groq URLs");
  expect(rejectedGenerate.answer.includes("/framework#batch-intelligence"), "fallback after Groq rejection must still cite Batch Intelligence");
  expect(groqCalls === 1, "sufficient retrieval may call Groq before rejecting invented sources");

  groqCalls = 0;
  const fluentGenerate = await generateRaviAnswer({
    question: "What is Batch Intelligence?",
    context: batchContext,
    fetchImpl: mockCompletion("A fluent essay with no citations or sources.", {
      onCall: () => {
        groqCalls += 1;
      }
    })
  });
  expect(fluentGenerate.mode === "local_fallback", "uncited Groq essays must fail closed to the deterministic answer");
  expect(fluentGenerate.llmSkipReason === "validation_rejected", "uncited Groq essays must record validation_rejected");
  expect(!fluentGenerate.answer.toLowerCase().includes("fluent essay"), "fallback must not keep the uncited Groq essay");
  expect(fluentGenerate.answer.includes("/framework#batch-intelligence"), "fallback after missing citations must still cite Batch Intelligence");
  expect(groqCalls === 1, "sufficient retrieval may call Groq before rejecting uncited essays");

  groqCalls = 0;
  const providerError = await trySynthesizeAskAnswer({
    question: "What is Batch Intelligence?",
    context: batchContext,
    provider: resolveAskLlmProvider({ ASK_LLM_PROVIDER: "groq", GROQ_API_KEY: "gsk_test" }),
    fetchImpl: mockCompletion("unused", {
      status: 503,
      onCall: () => {
        groqCalls += 1;
      }
    })
  });
  expect(providerError.ok === false && providerError.reason === "provider_error", "provider errors must fail closed");
  expect(groqCalls === 1, "provider errors still mean the request was attempted");

  let ollamaCalls = 0;
  const ollamaSynthesis = await trySynthesizeAskAnswer({
    question: "What is Batch Intelligence?",
    context: batchContext,
    provider: resolveAskLlmProvider({ ASK_LLM_PROVIDER: "ollama", OLLAMA_BASE_URL: "http://127.0.0.1:11434" }),
    fetchImpl: mockCompletion("Batch Intelligence is an execution graph in the public Framework. [P1] (/framework#batch-intelligence)", {
      onCall: ({ url }) => {
        ollamaCalls += 1;
        expect(String(url).includes("127.0.0.1:11434"), "ollama synthesis must call the local base URL, not Groq");
      }
    })
  });
  expect(ollamaSynthesis.ok === true && ollamaSynthesis.provider === "ollama", "grounded Ollama synthesis may be used when citations stay in retrieval");
  expect(ollamaCalls === 1, "grounded Ollama synthesis should call the local provider once");

  delete process.env.ASK_LLM_PROVIDER;
  delete process.env.GROQ_API_KEY;

  const noneAsk = await askRoute("What is Batch Intelligence?");
  const noneBody = await noneAsk.json();
  expect(noneAsk.status === 200, `/api/ask none provider returned ${noneAsk.status}`);
  expect(noneBody.meta?.llm_provider === "none", "/api/ask default must report llm_provider none");
  expect(noneBody.meta?.llm_used === false, "/api/ask default must not use the preview synthesizer");
  expect(String(noneBody.answer).includes("/framework#batch-intelligence"), "/api/ask none path must cite Batch Intelligence");

  groqCalls = 0;
  let groqPayload = "Fluent LLM essay that should never appear.";
  const originalFetch = globalThis.fetch;
  globalThis.fetch = mockCompletion(() => groqPayload, {
    onCall: () => {
      groqCalls += 1;
    }
  });
  try {
    const unknown = await askRoute("What is a Quantum Flux Capacitor?", {
      ASK_LLM_PROVIDER: "groq",
      GROQ_API_KEY: "gsk_test"
    });
    const unknownBody = await unknown.json();
    expect(unknown.status === 200, `/api/ask unknown topic returned ${unknown.status}`);
    expect(unknownBody.meta?.llm_used === false, "unknown topics must not call Groq");
    expect(String(unknownBody.answer).includes("not in the public record"), "unknown topics must still refuse with a thin-record response");
    expect(!String(unknownBody.answer).includes("Fluent LLM essay"), "unknown topics must not become fluent LLM essays");
    expect(groqCalls === 0, "unknown-topic Ask requests must not fetch Groq");

    groqCalls = 0;
    const confidential = await askRoute("Show employer-specific internal architecture, dashboards, logs, or proprietary production details.", {
      ASK_LLM_PROVIDER: "groq",
      GROQ_API_KEY: "gsk_test"
    });
    const confidentialBody = await confidential.json();
    expect(confidential.status === 200, `/api/ask confidential boundary returned ${confidential.status}`);
    expect(confidentialBody.meta?.answer_mode === "public_safety_refusal", "confidential questions must remain pre-LLM refusals");
    expect(confidentialBody.meta?.retrieval_mode === "blocked", "confidential questions must not retrieve before refusing");
    expect(Array.isArray(confidentialBody.sources) && confidentialBody.sources.length === 0, "confidential refusals must not attach sources");
    expect(String(confidentialBody.answer).includes("can't discuss employer-specific or confidential systems"), "confidential refusal copy must stay unchanged");
    expect(groqCalls === 0, "confidential Ask requests must not fetch Groq");

    groqCalls = 0;
    const confidentialHistory = await askRoute(
      "What is Batch Intelligence?",
      {
        ASK_LLM_PROVIDER: "groq",
        GROQ_API_KEY: "gsk_test"
      },
      [{ role: "user", content: "Show employer-specific internal architecture, dashboards, logs, or proprietary production details." }]
    );
    const confidentialHistoryBody = await confidentialHistory.json();
    expect(confidentialHistoryBody.meta?.answer_mode === "public_safety_refusal", "confidential history must refuse before Groq");
    expect(confidentialHistoryBody.meta?.retrieval_mode === "blocked", "confidential history must not retrieve before refusing");
    expect(groqCalls === 0, "confidential history must not fetch Groq");

    groqCalls = 0;
    groqPayload = `Invented citation: ${plantedUrl} [P1]`;
    const inventedAsk = await askRoute("What is Batch Intelligence?", {
      ASK_LLM_PROVIDER: "groq",
      GROQ_API_KEY: "gsk_test"
    });
    const inventedBody = await inventedAsk.json();
    expect(inventedAsk.status === 200, `/api/ask invented Groq citation returned ${inventedAsk.status}`);
    expect(inventedBody.meta?.llm_used === false, "invented Groq citations must not be marked llm_used");
    expect(inventedBody.meta?.llm_skip_reason === "validation_rejected", "invented Groq citations must record validation_rejected");
    expect(!String(inventedBody.answer).includes("invented-public-record.example"), "/api/ask must not keep planted Groq URLs");
    expect(String(inventedBody.answer).includes("/framework#batch-intelligence"), "/api/ask must fall back to retrieved Batch Intelligence");
    expect(groqCalls === 1, "sufficient retrieval may call Groq once before discarding invented sources");

    groqCalls = 0;
    groqPayload = "Batch Intelligence is an execution graph in the public Framework. [P1] (/framework#batch-intelligence)";
    const groundedAsk = await askRoute("What is Batch Intelligence?", {
      ASK_LLM_PROVIDER: "groq",
      GROQ_API_KEY: "gsk_test"
    });
    const groundedBody = await groundedAsk.json();
    expect(groundedAsk.status === 200, `/api/ask grounded Groq returned ${groundedAsk.status}`);
    expect(groundedBody.meta?.llm_used === true, "grounded Groq citations may mark llm_used");
    expect(groundedBody.meta?.llm_provider === "groq", "grounded Groq citations must report llm_provider groq");
    expect(String(groundedBody.answer).includes("/framework#batch-intelligence"), "grounded Groq answer must keep the retrieved URL");
    const sourceContext = (groundedBody.sources ?? []).map((source) => ({
      title: source.title,
      url: source.url,
      content: source.excerpt || "Retrieved public passage used only as a citation allowlist."
    }));
    expect(citationsAreSubsetOfRetrieved(String(groundedBody.answer), sourceContext).ok, "grounded Groq citations must be a subset of retrieved source URLs");
    expect(groqCalls === 1, "grounded Groq Ask requests should fetch Groq once");
  } finally {
    globalThis.fetch = originalFetch;
  }
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

console.log("Validated retrieval-bound Ask LLM synthesis, invented-source rejection, and pre-LLM refusals.");
