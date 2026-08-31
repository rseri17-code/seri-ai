import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import jitiFactory from "jiti";

const root = process.cwd();
const jiti = jitiFactory(fileURLToPath(import.meta.url), {
  interopDefault: true,
  alias: { "@": root }
});

const {
  articles,
  contentRegistry,
  operationalIntelligenceFramework,
  patterns,
  principles,
  products,
  projects,
  site,
  thesisRadar
} = jiti("../content/site.ts");
const { buildPublishingIndex } = jiti("../lib/publishing.ts");
const { getPublishedWikiNotes } = jiti("../lib/content.ts");

const errors = [];
const thesisRadarContent = fs.readFileSync(path.join(root, "content", "thesis-radar.json"), "utf8");
const resumeContent = fs.readFileSync(path.join(root, "content", "resume.json"), "utf8");
const homeContent = fs.readFileSync(path.join(root, "content", "home.json"), "utf8");
const askContent = fs.readFileSync(path.join(root, "content", "ask.json"), "utf8");
const professionalGraphContent = fs.readFileSync(path.join(root, "content", "professional-graph.json"), "utf8");
const nowContent = fs.readFileSync(path.join(root, "content", "now.json"), "utf8");
const proofBacklogContent = fs.readFileSync(path.join(root, "content", "proof-backlog.json"), "utf8");
const qualityScorecardContent = fs.readFileSync(path.join(root, "content", "quality-scorecard.json"), "utf8");
const visitorReviewKitContent = fs.readFileSync(path.join(root, "content", "visitor-review-kit.json"), "utf8");
const identityAssetContent = fs.readFileSync(path.join(root, "content", "identity-asset.json"), "utf8");
const publicCodeContent = fs.readFileSync(path.join(root, "content", "public-code.json"), "utf8");
const contentRegistryContent = fs.readFileSync(path.join(root, "content", "content-registry.json"), "utf8");
const normalizedContentRegistryContent = contentRegistryContent.replace(/"([^"]+)":/g, "$1:");

const allowedStatuses = new Set(["published", "planned", "draft"]);
const allowedTypes = new Set(["framework", "pattern", "artifact", "library", "product", "principle", "background", "domain", "system"]);
const frameworkLayers = new Set(operationalIntelligenceFramework.layers.map((layer) => layer.name));
const publishingUrls = new Set(buildPublishingIndex().map((asset) => asset.url));
const knownRoutes = new Set([
  "/",
  "/work",
  "/framework",
  "/library",
  "/ideas",
  "/patterns",
  "/products",
  "/projects",
  "/architecture-lab",
  "/investigation-room",
  "/ask",
  "/background",
  "/resume",
  "/contact",
  "/now",
  "/principles",
  "/wiki",
  "/llms.txt",
  "/rss.xml",
  "/robots.txt",
  "/sitemap.xml",
  ...site.nav.map((item) => item.href.split("?")[0]),
  ...articles.map((article) => `/ideas/${article.slug}`),
  ...patterns.map((pattern) => `/patterns/${pattern.slug}`),
  ...products.map((product) => `/products/${product.slug}`),
  ...projects.map((project) => `/projects/${project.slug}`),
  ...getPublishedWikiNotes().map((note) => note.url),
  ...publishingUrls
]);

function expect(condition, message) {
  if (!condition) errors.push(message);
}

function duplicateValues(values) {
  return values.filter((value, index) => values.indexOf(value) !== index);
}

function publicFileExists(route) {
  if (!/\.(md|pdf|txt|json)$/.test(route)) return false;
  return fs.existsSync(path.join(root, "public", route));
}

function sourceFilesUnder(relativeDir) {
  const start = path.join(root, relativeDir);
  if (!fs.existsSync(start)) return [];
  const entries = fs.readdirSync(start, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const fullPath = path.join(start, entry.name);
    const relativePath = path.relative(root, fullPath);
    if (entry.isDirectory()) return sourceFilesUnder(relativePath);
    return /\.(ts|tsx|js|jsx|md|mdx)$/.test(entry.name) ? [relativePath] : [];
  });
}

function routeExists(route) {
  const normalized = route.split("#")[0].split("?")[0];
  return knownRoutes.has(normalized) || publicFileExists(normalized);
}

function validateRouteList(owner, label, routes) {
  for (const route of routes) {
    expect(route.startsWith("/"), `${owner}: ${label} route must be absolute: ${route}`);
    expect(routeExists(route), `${owner}: ${label} route does not resolve: ${route}`);
  }
}

const registrySlugs = contentRegistry.map((item) => item.slug);
const registryRoutes = contentRegistry.map((item) => item.route);
expect(duplicateValues(registrySlugs).length === 0, `contentRegistry duplicate slugs: ${[...new Set(duplicateValues(registrySlugs))].join(", ")}`);
expect(duplicateValues(registryRoutes).length === 0, `contentRegistry duplicate routes: ${[...new Set(duplicateValues(registryRoutes))].join(", ")}`);

for (const item of contentRegistry) {
  const owner = `contentRegistry:${item.slug}`;
  expect(item.publicSafe === "public-safe", `${owner}: publicSafe must be public-safe`);
  expect(allowedStatuses.has(item.status), `${owner}: invalid status ${item.status}`);
  expect(allowedTypes.has(item.type), `${owner}: invalid type ${item.type}`);
  expect(item.route.startsWith("/"), `${owner}: route must be absolute`);
  expect(routeExists(item.route), `${owner}: route does not resolve: ${item.route}`);
  expect(item.title.length >= 4, `${owner}: title too short`);
  expect(item.summary.length >= 50, `${owner}: summary too short`);
  expect(item.seo?.title?.length >= 4, `${owner}: SEO title too short`);
  expect(item.seo?.description?.length >= 40, `${owner}: SEO description too short`);
  expect(item.frameworkLayers.length > 0, `${owner}: missing framework layers`);
  for (const layer of item.frameworkLayers) {
    expect(frameworkLayers.has(layer), `${owner}: invalid framework layer ${layer}`);
  }
  validateRouteList(owner, "relatedPatterns", item.relatedPatterns);
  validateRouteList(owner, "relatedArtifacts", item.relatedArtifacts);
  validateRouteList(owner, "relatedProducts", item.relatedProducts);
  validateRouteList(owner, "relatedLibraryAssets", item.relatedLibraryAssets);
}

const patternSlugs = patterns.map((pattern) => pattern.slug);
expect(duplicateValues(patternSlugs).length === 0, `patterns duplicate slugs: ${[...new Set(duplicateValues(patternSlugs))].join(", ")}`);
for (const pattern of patterns) {
  const owner = `pattern:${pattern.slug}`;
  expect(pattern.title.length >= 4, `${owner}: title too short`);
  expect(pattern.description.length >= 40, `${owner}: description too short`);
  expect(pattern.failureModes?.length > 0, `${owner}: missing failure modes`);
  expect(pattern.evaluation?.length >= 40, `${owner}: evaluation too short`);
  validateRouteList(owner, "related", pattern.related ?? []);
}

const principleSlugs = principles.map((principle) => principle.slug);
expect(duplicateValues(principleSlugs).length === 0, `principles duplicate slugs: ${[...new Set(duplicateValues(principleSlugs))].join(", ")}`);
for (const principle of principles) {
  const owner = `principle:${principle.slug}`;
  expect(principle.statement.length >= 8, `${owner}: statement too short`);
  expect(principle.explanation.length >= 40, `${owner}: explanation too short`);
  validateRouteList(owner, "related", principle.related ?? []);
}

const productSlugs = products.map((product) => product.slug);
expect(duplicateValues(productSlugs).length === 0, `products duplicate slugs: ${[...new Set(duplicateValues(productSlugs))].join(", ")}`);
for (const product of products) {
  const owner = `product:${product.slug}`;
  expect(routeExists(`/products/${product.slug}`), `${owner}: product page missing`);
  expect(product.summary.length >= 50, `${owner}: summary too short`);
  expect(product.capabilities.length >= 3, `${owner}: needs at least three capabilities`);
}

for (const route of ["/wiki/operational-intelligence-canonical-doctrine", "/wiki/operational-intelligence-reference-architecture", "/wiki/operational-intelligence-publication-pack", "/wiki/operational-intelligence-evidence-pack", "/work", "/framework", "/investigation-room", "/ask", "/ask", "/framework"]) {
  expect(contentRegistry.some((item) => item.route === route), `critical registry route missing: ${route}`);
}

const controlComparisonArticle = articles.find((article) => article.slug === "oi-room-001-control-comparison");
expect(Boolean(controlComparisonArticle), "Missing OI-ROOM-001 control comparison field note");
const controlComparisonText = [
  controlComparisonArticle?.dek,
  ...(controlComparisonArticle?.body ?? []),
  controlComparisonArticle?.reviewWorksheet?.title,
  controlComparisonArticle?.reviewWorksheet?.purpose,
  ...(controlComparisonArticle?.reviewWorksheet?.modes ?? []).flatMap((mode) => [mode.mode, mode.preserves, mode.likelyLoss, mode.reviewerQuestion]),
  ...(controlComparisonArticle?.reviewWorksheet?.dimensions ?? []).flatMap((dimension) => [dimension.dimension, dimension.ask, dimension.failureSignal]),
  ...(controlComparisonArticle?.reviewWorksheet?.falsification ?? [])
].join(" ");
for (const required of [
  "dashboard-only",
  "chatbot-only",
  "ticket-only",
  "measurement design, not a published benchmark result",
  "reasoning loss",
  "reviewable decision path",
  "Reviewer worksheet",
  "Evidence completeness",
  "Contradiction handling",
  "Missing-evidence honesty",
  "Decision safety",
  "Replayability"
]) {
  expect(controlComparisonText.includes(required), `OI-ROOM-001 control comparison missing proof phrase: ${required}`);
}

const articlePage = fs.readFileSync(path.join(root, "app", "ideas", "[slug]", "page.tsx"), "utf8");
for (const required of [
  "article.reviewWorksheet",
  "Reviewer worksheet",
  "Scoring dimensions",
  "Falsification checks",
  "Likely loss",
  "Reviewer question"
]) {
  expect(articlePage.includes(required), `Article page missing worksheet renderer phrase: ${required}`);
}

const homePage = fs.readFileSync(path.join(root, "app", "page.tsx"), "utf8");
const homeExportContent = fs.readFileSync(path.join(root, "content", "home.ts"), "utf8");
const homepageContractSource = [homePage, homeContent, homeExportContent].join("\n");
// Repointed 2026-08-30 for the homepage redesign. The previous block pinned essentially every
// string on the old homepage, so it failed wholesale the moment the page was restructured - it
// asserted a layout, not an invariant. These pins assert what the redesign must keep: the seven
// sections in order, identity before doctrine, the production claim with its boundary, the
// flagship preview, and the outbound routes the homepage is responsible for keeping reachable.
for (const required of [
  // Section 1 - hero: identity, specialty, production proof, exactly two actions.
  "Production AI systems",
  "I build evidence-grounded AI systems for enterprise operations.",
  "enterprise SRE investigation",
  "Enter the Operations Room",
  "Explore the body of work",
  // Section 2 - signature thesis, stated once.
  "The failure I design against",
  "misfire because they lack intelligence",
  "the Authorized Misfire",
  // Section 3 - flagship proof.
  // Renamed 2026-08-31: "Flagship proof" rated the exhibit instead of naming it. The section
  // order it guards is unchanged; only the marker moved.
  "The Operations Room",
  "OperationsRoomPreview",
  // Section 4 - exactly three bodies of work, each with problem, role, proof, outcome.
  "Three bodies of work.",
  "Production agent systems",
  "The operational context layer",
  "Enterprise platform foundations",
  "Proof",
  "Learned",
  // Section 5 - career bridge. The five-stage arc was removed on 2026-08-30: /background owns that
  // narrative and repeating it here was the page's largest duplication. Pin the bridge instead, and
  // forbid the stages below so they cannot drift back.
  "Fifteen years across enterprise integration, identity, container platforms, observability, and production",
  "See how the judgment formed",
  // Section 6 - selected ideas.
  "Four arguments worth disagreeing with.",
  // Section 7 - one primary action, plus the public-safety boundary stated once.
  "Start a conversation",
  // The boundary statement was consolidated on 2026-08-30: one complete statement in the hero,
  // where the production claim earns it, and a short site-wide form in the footer. It used to
  // appear a third time in the closing section, which is the repetition that was removed.
  // Repointed 2026-08-31 with the pin in validate-content.mjs: the hero no longer enumerates what
  // it withholds, it just states the boundary. See that comment for the reasoning.
  "That system stays private",
  // Routes the homepage keeps reachable. /patterns is here because the nav no longer carries it.
  "/investigation-room",
  "/wiki/operational-intelligence-canonical-doctrine",
  "/patterns",
  "/framework",
  "/resume",
  "/work",
  "/ask",
  "/contact",
  "/background"
]) {
  expect(homepageContractSource.includes(required), `/ missing focused homepage contract: ${required}`);
}

// Ruled 2026-08-30. The homepage must not carry the runtime product name, and must not restore the
// five-stage career arc that /background owns.
expect(
  !/kubernetes/i.test(homePage),
  "/: app/page.tsx names the container-runtime product banned from this page. Say \"container platforms\" or \"enterprise platform modernization\"."
);
for (const forbidden of ["Each phase is why the next one was possible.", "const careerArc"]) {
  expect(
    !homePage.includes(forbidden),
    `/: the five-stage career arc was removed by ruling and belongs on /background: ${forbidden}`
  );
}

for (const required of [
  "oi-room-001-control-comparison",
  "OI-ROOM-001 Control Comparison",
  "dashboard-only, chatbot-only, and ticket-only"
]) {
  expect(homeContent.includes(required), `Home content missing latest proof note contract: ${required}`);
}

const notFoundPage = fs.readFileSync(path.join(root, "app", "not-found.tsx"), "utf8");
for (const required of [
  "Use the map, library, or Ask Ravikanth",
  "Ask Ravikanth"
]) {
  expect(notFoundPage.includes(required), `/not-found missing Ask Ravikanth recovery contract: ${required}`);
}

const frameworkPage = fs.readFileSync(path.join(root, "app", "framework", "page.tsx"), "utf8");
for (const required of [
  "Operator questions",
  "/ask?prompt=",
  "encodeURIComponent(question)",
  "Run the Operations Room",
  "View the Map",
  "How the material is indexed",
  "FrameworkTeacher",
  "TechnicalReviewPath",
  "Design principles",
  "Evaluation criteria"
]) {
  expect(frameworkPage.includes(required), `/framework missing executable framework contract: ${required}`);
}

const workPage = fs.readFileSync(path.join(root, "app", "work", "page.tsx"), "utf8");
const workContractSource = [workPage, professionalGraphContent, publicCodeContent].join("\n");
for (const required of [
  "professionalGraph.proofLedger",
  "professionalGraph.careerEvolution",
  "homeLinkedInSignals",
  "What I have actually shipped.",
  "Operating arc",
  "How I got here, and what each stretch taught me.",
  "Production AI systems and agentic operations",
  "Operational Intelligence as inspectable public knowledge",
  "private systems, internal product names, proprietary architecture",
  "Public thesis threads",
  "The public writing behind the work.",
  "Read LinkedIn posts",
  "Proof ledger",
  "The serious question is not what exists. It is what each artifact proves.",
  "Operational Intelligence is a reference model, not a profile wrapper.",
  "The thesis is inspectable through a working public-safe artifact.",
  "The AI surface is bounded by citations, refusals, and deterministic trust fixtures.",
  "The body of work connects engineering taste to professional proof.",
  "Architecture judgment",
  "Constraints the architecture preserves.",
  "professionalGraph.architectureJudgment",
  "Constraint preserved",
  "Public evidence",
  "Inspect the artifact",
  "Start with operational evidence before model reasoning.",
  "Treat AI action as governed execution, not autonomous heroics.",
  "What to inspect",
  "What would weaken it",
  "If the doctrine cannot distinguish itself from observability, AIOps, SRE, ITIL, incident command, knowledge graphs, and AI evaluation.",
  "If Ask Ravikanth answers unsupported questions confidently or stores private prompt text in analytics.",
  "Definition discipline",
  "Action discipline",
  "Learning discipline",
  // Repointed 2026-08-30. The "Public code inspection" section was removed by Ravikanth's ruling:
  // it published a reviewer rubric ("Review question / Look for / Do not infer") and a six-field
  // review record schema to visitors, teaching a stranger how to grade the work before showing any
  // of it. What survived is folded into the hero: both repository links, what the public repo
  // actually contains, and the boundary as one plain sentence.
  //
  // Note these pins are checked against workContractSource, which joins the page WITH
  // content/public-code.json - so a pin matching only the JSON passes while rendering nothing.
  // That is how several of the old pins stayed green. Pin page-only strings here.
  "an incident-investigation pipeline with deterministic playbooks, policy gates, memory, receipts",
  "It shows you the architecture I argue for.",
  "not evidence of what runs in production anywhere",
  "publicCode.entries[0].href",
  "publicCode.entries[1].href",
  "Sentinalai",
  "/wiki/operational-intelligence-canonical-doctrine",
  "/wiki/operational-intelligence-reference-architecture",
  "/wiki/operational-intelligence-evidence-pack",
  "/wiki/operational-intelligence-publication-pack",
  "/investigation-room",
  "/background"
]) {
  expect(workContractSource.includes(required), `/work missing reviewer proof spine contract: ${required}`);
}

// Ravikanth's ruling, 2026-08-30: the reviewer rubric and the review-record schema are not visitor
// copy. They stay in content/public-code.json as a worksheet; they must not be rendered on /work.
for (const forbidden of [
  "publicCode.reviewRubric",
  "publicCode.reviewRecordFields",
  "publicCode.observedPublicStructure",
  "Review question",
  "What review should record.",
  "How to inspect the public code."
]) {
  expect(
    !workPage.includes(forbidden),
    `/work renders reviewer-rubric material that a 2026-08-30 ruling removed: ${forbidden}. It teaches a visitor how to grade the work instead of showing it. Keep it in content/public-code.json.`
  );
}


const searchPage = fs.readFileSync(path.join(root, "app", "search", "page.tsx"), "utf8");
for (const required of [
  "const researchPrompts",
  "buildKnowledgeGraph",
  "buildPublishingIndex",
  "Searchable sources",
  "Published assets",
  "Graph relationships",
  "Reference downloads",
  "Canonical research prompts",
  "/ask?prompt=",
  "encodeURIComponent(prompt)",
  "Ask <ArrowRight",
  "Source <ArrowRight",
  "Search the public Operational Intelligence knowledge base.",
  "What is Operational Intelligence and what is it not?",
  "Which contracts make two implementations comparable?",
  "What would convince a skeptical engineer that this model is useful?",
  "How does OI-ROOM-001 move from evidence to a decision packet?",
  "Which trust fixtures gate Ask Ravikanth behavior?",
  "Where is Ravikanth's public work connected to proof objects?",
  "/wiki/operational-intelligence-canonical-doctrine",
  "/wiki/operational-intelligence-reference-architecture",
  "/wiki/operational-intelligence-evidence-pack",
  "/investigation-room",
  "/work"
]) {
  expect(searchPage.includes(required), `/search missing research console contract: ${required}`);
}

const ideaPage = fs.readFileSync(path.join(root, "app", "ideas", "[slug]", "page.tsx"), "utf8");
for (const required of [
  "Ask this article",
  "asset.askQuestions.slice(0, 3)",
  "/ask?prompt=",
  "encodeURIComponent(question)",
  "Framework layers",
  "Related reading",
  "Version history"
]) {
  expect(ideaPage.includes(required), `/ideas/[slug] missing article retrieval prompt contract: ${required}`);
}

const wikiPage = fs.readFileSync(path.join(root, "app", "wiki", "page.tsx"), "utf8");
for (const required of [
  "const referenceSpine",
  "Reference spine",
  "operational-intelligence-canonical-doctrine",
  "operational-intelligence-reference-architecture",
  "operational-intelligence-publication-pack",
  "operational-intelligence-evidence-pack",
  "Start with the durable doctrine",
  "spineNotes.map"
]) {
  expect(wikiPage.includes(required), `/wiki missing canonical reference spine: ${required}`);
}

const contentSearch = fs.readFileSync(path.join(root, "components", "content-search.tsx"), "utf8");
for (const required of [
  "const visibleResults",
  "results.slice(0, 12)",
  "Showing 12 canonical starting points",
  "Search or filter to inspect the full public corpus.",
  "visibleResults.map"
]) {
  expect(contentSearch.includes(required), `ContentSearch missing bounded initial search contract: ${required}`);
}

const chatComponent = fs.readFileSync(path.join(root, "components", "chat.tsx"), "utf8");
for (const required of [
  "useEffect",
  "useRef",
  "initialPromptRef",
	  "autoSubmittedRef",
	  "void sendMessage(prompt)",
	  "react-hooks/exhaustive-deps",
	  "Start with a real question about Ravikanth Seri's work",
	  "cite sources",
	  "separate evidence from inference",
	  "name uncertainty",
	  "record is thin",
	  "Reading the public evidence...",
	  "Ask about Ravikanth, his work, Operational Intelligence, projects, or background...",
	  "Question the professional graph behind the doctrine, Operations Room, and public work.",
  "Strong first questions",
  "prompts.slice(0, 4)",
  "border-t border-white/10 bg-black/15 p-3",
  "Answer packet",
  "question_category",
  "framework_layers",
  "related_pages",
  "public_boundary",
  "Related artifacts",
  "reviewable packet with matched scope, layers, boundary, and next artifacts",
  "AI disclosure",
  "Trust contract",
  "Source coverage",
  "Related route",
  "Latency budget",
  "Runtime budget",
  "ProfileMark size=\"sm\""
]) {
  expect(chatComponent.includes(required), `Chat missing prompt deep-link auto-submit contract: ${required}`);
}
expect(
  !chatComponent.includes("lg:hidden"),
  "Chat prompt deep-link auto-submit contract should not hide the strong questions row behind lg:hidden"
);

const evalRunner = fs.readFileSync(path.join(root, "scripts", "run-evals.mjs"), "utf8");
expect(evalRunner.includes("generatedAt: `${report.lastRun}T00:00:00.000Z`"), "run-evals must use deterministic generatedAt based on report.lastRun");
expect(!evalRunner.includes("generatedAt: new Date().toISOString()"), "run-evals must not create timestamp-only public eval report churn");

const headerComponent = fs.readFileSync(path.join(root, "components", "header.tsx"), "utf8");
for (const required of [
  "Ask Ravikanth",
  "href=\"/ask\"",
  "href: \"/framework\""
]) {
  expect(headerComponent.includes(required), `Header missing Ask Ravikanth companion CTA contract: ${required}`);
}

const radarPage = fs.readFileSync(path.join(root, "app", "framework", "page.tsx"), "utf8");
const siteContent = fs.readFileSync(path.join(root, "content", "site.ts"), "utf8");
for (const required of [
  "Evidence posture",
  "These signals do not prove Operational Intelligence as a finished category",
  "OI claim",
  "Falsification",
  "Enterprise Context Layer",
  "Context Acquisition Tax",
  "Harness over model",
  "Shared operational reasoning",
  "OpenTelemetry: GenAI observability",
  "Microsoft Research: AgentRx failure diagnosis",
  "NIST AI Risk Management Framework",
  "Operational Intelligence Thesis Radar",
  "ops for observability",
  "evidenceType",
  "supports",
  "route: \"/framework\""
]) {
  expect(
    radarPage.includes(required) || siteContent.includes(required) || thesisRadarContent.includes(required) || normalizedContentRegistryContent.includes(required),
    `Thesis radar evidence contract missing on /framework: ${required}`
  );
}

const allowedRadarEvidenceTypes = new Set(["standard", "standard signal", "research", "implementation signal", "governance", "foundational practice"]);
for (const trend of thesisRadar.trends) {
  expect(trend.sources.length >= 2, `Thesis radar trend "${trend.name}" must cite at least two public sources`);
  for (const source of trend.sources) {
    expect(source.evidenceType, `Thesis radar source "${source.label}" missing evidenceType`);
    expect(allowedRadarEvidenceTypes.has(source.evidenceType), `Thesis radar source "${source.label}" has unsupported evidenceType "${source.evidenceType}"`);
    expect(source.supports && source.supports.length >= 48, `Thesis radar source "${source.label}" must explain what claim it supports`);
    expect(!/proves?|validates?|confirms?/i.test(source.supports), `Thesis radar source "${source.label}" overstates evidence posture`);
  }
}

const askPage = fs.readFileSync(path.join(root, "app", "ask", "page.tsx"), "utf8");
const askContractSource = [askPage, askContent].join("\n");
for (const required of [
	  "Ask Ravikanth | Evidence Console for Ravikanth Seri's Public Work",
	  "askRaviPrompts",
	  "askThesisLenses",
	  "signalName",
	  "Ask the public record.",
	  "A serious technical claim should survive inspection.",
	  "public evidence only; uncertainty stays visible",
	  "Evidence console",
	  "Expose sources",
	  "Separate inference",
	  "Stop at evidence",
	  "What is Ravikanth building with seri.ai?",
	  "What does Ravikanth mean by Context Acquisition Tax?",
	  "What is the Enterprise Context Layer?",
	  "Why is the harness more important than the model for SRE agents?",
	  "What does ops for observability mean?",
	  "How is observability for AI different from normal observability?",
	  "What public evidence shows Ravikanth's architecture judgment?",
	  "How does Ravikanth think about Operational Intelligence?",
  "Where can I review Ravikanth's GitHub, LinkedIn, resume, and public artifacts?",
  "Thesis lenses",
  "Start with the questions Ravikanth keeps returning to.",
  "Ask this lens",
  "Dynamic operational view",
  "Ops for observability",
  "Observability for AI",
  "suggestedPrompts={askRaviPrompts}",
  "doctrine, architecture, projects, resume, GitHub, LinkedIn",
  "ProfileMark"
]) {
  expect(askContractSource.includes(required), `/ask missing Ask Ravikanth public companion contract: ${required}`);
}

for (const relativePath of sourceFilesUnder("app").concat(sourceFilesUnder("components"), sourceFilesUnder("content"), sourceFilesUnder("lib"))) {
  const content = fs.readFileSync(path.join(root, relativePath), "utf8");
  expect(!content.includes("ravikanth-seri-linkedin.jpg"), `${relativePath}: LinkedIn portrait requires explicit reuse authorization before source reference`);
}

const footerComponent = fs.readFileSync(path.join(root, "components", "footer.tsx"), "utf8");
for (const required of [
  "const reviewKit",
  // Renamed 2026-08-30: "Public review kit" read as written for evaluators, not visitors.
  "Elsewhere",
  "GitHub",
  "LinkedIn",
  "RSS",
  "/search"
]) {
  expect(footerComponent.includes(required), `Footer missing global review kit contract: ${required}`);
}

const contactPage = fs.readFileSync(path.join(root, "app", "contact", "page.tsx"), "utf8");
const contactReviewSource = fs.readFileSync(path.join(root, "content", "contact-review.ts"), "utf8");
const contactContractSource = [contactPage, contactReviewSource, visitorReviewKitContent].join("\n");
for (const required of [
  "contactReviewChannels",
  "contactReviewAssets",
  "contactReviewMinimumEvidenceQuorum",
  "contactReviewRunProtocol",
  "firstImpressionSelects",
  "contactReviewPublicSafetyBoundary",
  "First-impression evidence",
  "firstImpressionVerdict",
  "personWorkFit",
  "thesisFit",
  "proofRouteFit",
  "artifactRecall",
  "demoSignal",
  "https://www.linkedin.com/in/ravikanthseri/",
  "https://github.com/rseri17-code",
  "/work",
  "/wiki/operational-intelligence-evidence-pack",
  "target={href.startsWith(\"http\") ? \"_blank\" : undefined}",
  "isSubmittingContact",
  "isSubmittingReview",
  "setIsSubmittingContact(true)",
  "setIsSubmittingReview(true)",
  "catch {",
  "setStatus(\"error\")",
  "setReviewStatus(\"error\")",
  "disabled={isSubmittingContact}",
  "disabled={isSubmittingReview}",
  "Sending review..."
]) {
  expect(contactContractSource.includes(required), `/contact missing resilient submit contract: ${required}`);
}

const betaFeedback = fs.readFileSync(path.join(root, "components", "beta-feedback.tsx"), "utf8");
const betaFeedbackForm = fs.readFileSync(path.join(root, "components", "beta-feedback-form.tsx"), "utf8");
for (const required of ["dynamic(", "beta-feedback-form", "beta_feedback_toggle"]) {
  expect(betaFeedback.includes(required), `BetaFeedback missing lazy toggle contract: ${required}`);
}
for (const required of [
  "const [isSubmitting",
  "setIsSubmitting(true)",
  "catch {",
  "setStatus(\"error\")",
  "disabled={isSubmitting}",
  "Sending feedback..."
]) {
  expect(betaFeedbackForm.includes(required), `BetaFeedbackForm missing resilient submit contract: ${required}`);
}


const evidencePackWiki = fs.readFileSync(path.join(root, "content", "wiki", "operational-intelligence-evidence-pack.mdx"), "utf8");
const evidencePackMarkdown = fs.readFileSync(path.join(root, "public", "publication-pack", "operational-intelligence-evidence-pack.md"), "utf8");
const proofBacklogContractSource = [proofBacklogContent, evidencePackWiki, evidencePackMarkdown, siteContent].join("\n");
for (const required of [
  "Operational Intelligence Proof Backlog",
  "Current Proof Backlog",
  "The current backlog names the evidence still required before stronger public claims should be made.",
  "Practitioner review",
  "Control comparison",
  "Ask quality",
  "Production reliability",
  "Visual, mobile, and accessibility QA",
  "Identity asset",
  "Public code and project proof",
  "review-packet-ready",
  "protocol-defined",
  "awaiting-live-beta-telemetry",
  "keyboard-notes-captured",
  "inspection-protocol-defined",
  "public-code review rubric",
  "Public Project Proof Ledger",
  "Do not infer repository metrics",
  "source-validated mobile touch walkthrough",
  "source-validated keyboard accessibility walkthrough",
  "browser-recorded keyboard tab-order checks",
  "physical-device checks",
  "portrait-integrated",
  "durable non-photographic public identity mark",
  "approved portrait intake contract",
  "approved portrait rendered on professional-orientation surfaces",
  "/identity/portrait-intake.md",
  "Run external first-impression review",
  "/publication-pack/ravikanth-seri-practitioner-review-packet.md",
  "/ideas/oi-room-001-control-comparison",
  "/publication-pack/ask-ravi-live-review-packet.md",
  "/investigation-room",
  "/background"
]) {
  expect(proofBacklogContractSource.includes(required), `Evidence Pack missing proof-backlog contract: ${required}`);
}

const profileMarkComponent = fs.readFileSync(path.join(root, "components", "profile-mark.tsx"), "utf8");
const identityAssetContractSource = [identityAssetContent, siteContent, profileMarkComponent].join("\n");
for (const required of [
  "Ravikanth Seri Public Identity Mark",
  "/identity/ravikanth-seri-identity-mark.svg",
  "durable identity asset",
  "public-safe visual identity anchor",
  "not a portrait photo",
  "does not imply employer affiliation",
  "does not replace career evidence",
  "/identity/portrait-intake.md",
  "data-identity-asset"
]) {
  expect(identityAssetContractSource.includes(required), `Identity asset missing contract: ${required}`);
}

const scorecard = fs.readFileSync(path.join(root, "WORLD_CLASS_SCORECARD.md"), "utf8");
const qualityScorecardContractSource = [qualityScorecardContent, scorecard, siteContent].join("\n");
for (const required of [
  "seri.ai 24-Dimension Quality Scorecard",
  "24-Dimension Scores",
  "0 to 10, evidence-based, non-inflated",
  "Professional Representation",
  "Career Clarity",
  "Technical Authority",
  "Engineering Depth",
  "AI Systems Credibility",
  "Architecture Quality",
  "Publications",
  "Originality",
  "Evidence Quality",
  "Work / Project Proof",
  "Knowledge-Graph Health",
  "Ask Ravikanth",
  "Search / Discoverability",
  "Visual Design",
  "UX",
  "Mobile",
  "Accessibility",
  "SEO",
  "Performance",
  "Reliability",
  "Security & Privacy",
  "Maintainability",
  "Publication Quality",
  "Overall Memorability",
  "A `10` means current evidence shows no material gap",
  "A controlled Ask live review packet exists, but no live reviewer-labeled quality baseline exists.",
  "browser viewport audit across Home, Start Here, Ask, Operations Room, Work, Background, Doctrine, and Radar",
  "source-validated touch walkthrough notes",
  "Keyboard Accessibility Walkthrough Notes",
  "/visual-qa/2026-08-22/keyboard-accessibility-walkthroughs.md",
  "source-validated keyboard accessibility walkthrough notes",
  "not a screen-reader lab run",
  "browser-recorded keyboard tab-order checks",
  "Practitioner Review Packet",
  "Physical-device touch comfort",
  "durable non-photographic public identity mark",
  "portrait intake contract",
  "/identity/portrait-intake.md",
  "approved portrait rendered on home, background, and resume",
  "identity-asset proof, and public-code/project proof",
  "public-code review record fields",
  "Execute the proof backlog"
]) {
  expect(qualityScorecardContractSource.includes(required), `Quality scorecard missing contract: ${required}`);
}

const architectureLabPage = fs.readFileSync(path.join(root, "app", "architecture-lab", "page.tsx"), "utf8");
for (const required of [
  "const labContracts",
  "const reviewSequence",
  "Implementation-facing patterns",
  "Evidence contract",
  "Replay contract",
  "Evaluation contract",
  "Operator control contract",
  "/wiki/operational-intelligence-canonical-doctrine",
  "/wiki/operational-intelligence-reference-architecture",
  "/wiki/operational-intelligence-publication-pack",
  "/wiki/operational-intelligence-evidence-pack",
  "/publication-pack/decision-packet-example.md",
  "/publication-pack/oi-room-001-printable-walkthrough.md",
  "Failure mode",
  "Layer handoff"
]) {
  expect(architectureLabPage.includes(required), `/architecture-lab missing implementation contract surface: ${required}`);
}

const nowPage = fs.readFileSync(path.join(root, "app", "now", "page.tsx"), "utf8");
const nowContractSource = [nowPage, nowContent].join("\n");
for (const required of [
  "const builderLedger",
  "const proofCheckpoints",
  "Research ledger",
  "What Ravikanth is trying to prove next.",
  "nowPage.researchLedger.map",
  "Research question",
  "Why it matters",
  "Current evidence",
  "Next proof",
  "Would change the model",
  "Can operational agents preserve evidence quality under incident pressure?",
  "What is the minimum replay record required before an AI recommendation is trusted?",
  "Can transaction journeys become the shared unit of AI-native operations?",
  "Where should human approval sit in governed operational AI?",
  "Builder ledger",
  "Proof loop",
  "Doctrine frozen at v1.0",
  "Reference architecture published",
  "Operations Room live",
  "Ask Ravikanth trust fixtures",
  "Publication pack available",
  "Evidence pack open for review",
  "what would convince another experienced engineer",
  "/wiki/operational-intelligence-canonical-doctrine",
  "/wiki/operational-intelligence-reference-architecture",
  "/wiki/operational-intelligence-publication-pack",
  "/wiki/operational-intelligence-evidence-pack",
  "/investigation-room",
  "/contact"
]) {
  expect(nowContractSource.includes(required), `/now missing living builder ledger contract: ${required}`);
}

const projectPage = fs.readFileSync(path.join(root, "app", "projects", "[slug]", "page.tsx"), "utf8");
for (const required of [
  "projectProof",
  "evalReport",
  "const projectContracts",
  "formatProofText",
  "evalReport.fixtures.length",
  "Project proof ledger",
  "Public proof claim",
  "Inspectable evidence",
  "Boundary",
  "Next proof",
  "Reviewer question",
  "proof.inspectionPath.map",
  "Operating contract",
  "Evidence path",
  "Framework handoff",
  "Failure modes to avoid",
  "Review this project through the reference system",
  "Ask this project",
  "buildPublishingIndex",
  "asset.askQuestions.slice(0, 3)",
  "/ask?prompt=",
  "encodeURIComponent(question)",
  "ai-incident-investigation-simulator",
  "operational-intelligence-copilot",
  "transaction-graph-explorer",
  "ai-evaluation-workbench",
  "/publication-pack/decision-packet-example.md",
  "/publication-pack/oi-room-001-printable-walkthrough.md",
  "/patterns/transaction-journey-reconstruction",
  "/patterns/evaluation-and-replay",
  "/wiki/evaluation-and-replay"
]) {
  expect(projectPage.includes(required), `/projects/[slug] missing project proof contract: ${required}`);
}

const projectProofWorkPage = fs.readFileSync(path.join(root, "app", "work", "page.tsx"), "utf8");
for (const required of [
  "Project proof",
  "What each project proves, and what it does not.",
  "projects.map",
  "Boundary",
  "do not infer private outcomes or unsupported adoption",
  "Review project proof"
]) {
  expect(projectProofWorkPage.includes(required), `/work missing project proof ledger surface: ${required}`);
}

const productPage = fs.readFileSync(path.join(root, "app", "products", "[slug]", "page.tsx"), "utf8");
for (const required of [
  "Product review packet",
  "Ask this product",
  "buildPublishingIndex",
  "asset.artifacts.map",
  "asset.askQuestions.slice(0, 3)",
  "/ask?prompt=",
  "encodeURIComponent(question)",
  "/investigation-room",
  "canonical",
  "openGraph"
]) {
  expect(productPage.includes(required), `/products/[slug] missing product proof contract: ${required}`);
}

const briefPage = fs.readFileSync(path.join(root, "app", "brief", "page.tsx"), "utf8");
for (const required of [
  "const decisionBrief",
  "const executiveProofPath",
  "Decision brief",
  "Proof path",
  "executive summary",
  "Canonical doctrine",
  "Reference architecture",
  "Operations Room",
  "Evidence pack",
  "Practitioner review",
  "/publication-pack/operational-intelligence-executive-summary.md",
  "/wiki/operational-intelligence-canonical-doctrine",
  "/wiki/operational-intelligence-reference-architecture",
  "/investigation-room",
  "/wiki/operational-intelligence-evidence-pack",
  "/contact",
  "Inspect evidence"
]) {
  expect(briefPage.includes(required), `/brief missing executive decision/proof contract: ${required}`);
}



const resumePage = fs.readFileSync(path.join(root, "app", "resume", "page.tsx"), "utf8");
const resumeContractSource = [resumePage, professionalGraphContent, publicCodeContent].join("\n");
// Repointed 2026-08-31. /resume dropped eight sections that other routes own: the architectural
// thesis and judgment ledger (/framework, /work), the career throughline and story map
// (/background), the published-work index (/library), the public-code path (/work), the capability
// matrix (duplicated Strengths) and source provenance (meta-language written for evaluators).
// The resume now keeps only the verifiable record. Note resumeContractSource joins the page WITH
// professional-graph.json and public-code.json, so pin page-only strings here.
for (const required of [
  // Lead identity: current role first, not "infrastructure architect".
  "resume.experience[0].role",
  "15+ years in enterprise engineering",
  "Impact ledger",
  "Strengths",
  "Public proof",
  "Architecture highlights",
  "Core skills",
  "Education and certifications",
  // The record itself, and the printable path.
  "resume.experience.map",
  "Download resume",
  "/ravi-seri-public-resume.txt"
]) {
  expect(resumeContractSource.includes(required), `/resume missing capability evidence contract: ${required}`);
}

// Ruled: the runtime product name must not render on public narrative pages, and the sections
// above belong to other routes. Both asserted against the page alone.
expect(
  !/kubernetes/i.test(resumePage),
  "/resume: names the container-runtime product banned from public pages. Use \"container platforms\"; the CKA credential is rendered by its recognized abbreviation."
);
for (const forbidden of ["Architectural thesis", "Career story map", "Source provenance", "Capability evidence matrix"]) {
  expect(
    !resumePage.includes(forbidden),
    `/resume renders a section another route owns: ${forbidden}`
  );
}

for (const required of [
  "sourceProvenance",
  "Resume and CV",
  "Architecture notes",
  "Public profiles and publishing",
  "Synthesized into role summaries",
  "Converted into generic, public-safe architecture patterns",
  "Connected into the public knowledge graph"
]) {
  expect(siteContent.includes(required) || resumeContent.includes(required), `resume content model missing source provenance contract: ${required}`);
}

const backgroundPage = fs.readFileSync(path.join(root, "app", "background", "page.tsx"), "utf8");
const backgroundContractSource = [backgroundPage, professionalGraphContent].join("\n");
// Repointed 2026-08-30 for the background rebuild. The previous block pinned nearly every string
// on the old page, so it asserted a layout and failed wholesale (24 errors) the moment the page was
// restructured. These pin the six ruled sections, the approved evidence, and the four outbound
// destinations - what the page must keep, not how it was arranged.
for (const required of [
  // Section 1 - opening: identity, origin, present-tense positioning, two actions.
  "Where the thesis comes from.",
  "being paged when distributed systems failed in ways no single dashboard explained",
  "Senior Technical Lead in AIOps and Observability",
  "View the work",
  "View the resume",
  // Section 2 - causal progression, five phases.
  "How the judgment formed.",
  "const progression",
  "Container platforms and observability",
  // Section 3 - career spine, with the approved scale signal kept visible.
  "The roles behind it.",
  "enterprise SRE investigation agent from thesis to production",
  "120+ enterprise applications",
  "Carried forward.",
  // Section 4 - three pillars.
  "What I build now.",
  "Production agent systems",
  "The operational context layer",
  "Evaluation and governance",
  // Section 5 - exactly four principles.
  "What experience trained me to protect.",
  "Evidence before reasoning",
  "Freshness before confidence",
  "Evaluation and replay before trust",
  "Human authority before consequential action",
  // Section 6 - four destinations and the closing line.
  "Where to look next.",
  "I spent fifteen years with the",
  "/resume",
  "/work",
  "/investigation-room",
  "/contact"
]) {
  expect(backgroundContractSource.includes(required), `/background missing operating-background contract: ${required}`);
}

// The 2026-08-30 ruling: one container-runtime product name is banned from /background - copy,
// metadata, alt text, hidden text and the file itself. Asserted here so a future edit that
// reintroduces it fails the build rather than shipping. /resume is deliberately not covered: one of
// his certifications carries the term in its official credential name.
expect(
  !/kubernetes/i.test(backgroundPage),
  "/background: the container-runtime product name banned by the 2026-08-30 ruling appears in app/background/page.tsx. Use \"container platforms\", \"enterprise platform modernization\" or \"platform engineering\"."
);

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validated content coherence across ${contentRegistry.length} registry items, ${patterns.length} patterns, ${principles.length} principles, and ${products.length} products.`);
