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
  site
} = jiti("../content/site.ts");
const { buildPublishingIndex } = jiti("../lib/publishing.ts");
const { getPublishedWikiNotes } = jiti("../lib/content.ts");

const errors = [];

const allowedStatuses = new Set(["published", "planned", "draft"]);
const allowedTypes = new Set(["framework", "pattern", "artifact", "library", "product", "principle", "background", "domain", "system"]);
const frameworkLayers = new Set(operationalIntelligenceFramework.layers.map((layer) => layer.name));
const publishingUrls = new Set(buildPublishingIndex().map((asset) => asset.url));
const knownRoutes = new Set([
  "/",
  "/work",
  "/framework",
  "/start-here",
  "/map",
  "/library",
  "/ideas",
  "/patterns",
  "/products",
  "/projects",
  "/artifacts",
  "/architecture-lab",
  "/investigation-room",
  "/simulator",
  "/ask",
  "/evals",
  "/interview",
  "/interview-mode",
  "/background",
  "/resume",
  "/contact",
  "/manifesto",
  "/now",
  "/radar",
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

for (const route of ["/wiki/operational-intelligence-canonical-doctrine", "/wiki/operational-intelligence-reference-architecture", "/wiki/operational-intelligence-publication-pack", "/wiki/operational-intelligence-evidence-pack", "/work", "/framework", "/investigation-room", "/ask", "/evals"]) {
  expect(contentRegistry.some((item) => item.route === route), `critical registry route missing: ${route}`);
}

const homePage = fs.readFileSync(path.join(root, "app", "page.tsx"), "utf8");
for (const required of [
  "const reviewerPaths",
  "Review path",
  "Different serious visitors should be able to evaluate the thesis quickly.",
  "Evidence-first review",
  "The path is explicit: doctrine, architecture, evidence, artifact, feedback.",
  "Start review path",
  "Challenge the evidence",
  "Executive",
  "SRE leader",
  "Principal architect",
  "AI engineer",
  "Governance reviewer",
  "Recruiter or founder",
  "/start-here",
  "/brief",
  "/investigation-room",
  "/wiki/operational-intelligence-reference-architecture",
  "/wiki/operational-intelligence-evidence-pack",
  "/evals",
  "/work"
]) {
  expect(homePage.includes(required), `/ missing reviewer path contract: ${required}`);
}

const workPage = fs.readFileSync(path.join(root, "app", "work", "page.tsx"), "utf8");
for (const required of [
  "const reviewSpine",
  "Review spine",
  "/wiki/operational-intelligence-canonical-doctrine",
  "/wiki/operational-intelligence-reference-architecture",
  "/wiki/operational-intelligence-evidence-pack",
  "/wiki/operational-intelligence-publication-pack",
  "/investigation-room"
]) {
  expect(workPage.includes(required), `/work missing reviewer proof spine contract: ${required}`);
}

const startHerePage = fs.readFileSync(path.join(root, "app", "start-here", "page.tsx"), "utf8");
for (const required of [
  "const routeLabels",
  "const reviewSpine",
  "function labelFor",
  "Serious technical review path",
  "Canonical Doctrine",
  "Reference Architecture",
  "Evidence Pack",
  "Publication Pack",
  "Operations Room",
  "{labelFor(href)}",
  "/ask?prompt=",
  "encodeURIComponent(path.ask)",
  "{path.ask}"
]) {
  expect(startHerePage.includes(required), `/start-here missing audience onboarding contract: ${required}`);
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
  "A research console for the doctrine, reference architecture, proof objects, and public work.",
  "Search is part of the product contract",
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
  "/evals",
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
  "react-hooks/exhaustive-deps"
]) {
  expect(chatComponent.includes(required), `Chat missing prompt deep-link auto-submit contract: ${required}`);
}

const footerComponent = fs.readFileSync(path.join(root, "components", "footer.tsx"), "utf8");
for (const required of [
  "const reviewKit",
  "Public review kit",
  "GitHub",
  "LinkedIn",
  "RSS",
  "/artifacts",
  "/start-here",
  "/search"
]) {
  expect(footerComponent.includes(required), `Footer missing global review kit contract: ${required}`);
}

const contactPage = fs.readFileSync(path.join(root, "app", "contact", "page.tsx"), "utf8");
for (const required of [
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
  expect(contactPage.includes(required), `/contact missing resilient submit contract: ${required}`);
}

const betaFeedback = fs.readFileSync(path.join(root, "components", "beta-feedback.tsx"), "utf8");
for (const required of [
  "const [isSubmitting",
  "setIsSubmitting(true)",
  "catch {",
  "setStatus(\"error\")",
  "disabled={isSubmitting}",
  "Sending feedback..."
]) {
  expect(betaFeedback.includes(required), `BetaFeedback missing resilient submit contract: ${required}`);
}

const evalsPage = fs.readFileSync(path.join(root, "app", "evals", "page.tsx"), "utf8");
for (const required of [
  "const coverageBuckets",
  "Coverage matrix",
  "What the deterministic fixtures are protecting.",
  "Doctrine and definition",
  "Framework layers",
  "Adjacent-domain comparison",
  "Evidence handling",
  "Artifacts and routing",
  "Safety and refusal",
  "Interpretation rule",
  "These fixtures prove deterministic public-safety and answer-shape behavior.",
  "They do not prove live model quality",
  "replay-backed workflow tests",
  "practitioner review"
]) {
  expect(evalsPage.includes(required), `/evals missing coverage matrix contract: ${required}`);
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
for (const required of [
  "const builderLedger",
  "const proofCheckpoints",
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
  "/evals",
  "/contact"
]) {
  expect(nowPage.includes(required), `/now missing living builder ledger contract: ${required}`);
}

const projectPage = fs.readFileSync(path.join(root, "app", "projects", "[slug]", "page.tsx"), "utf8");
for (const required of [
  "const projectContracts",
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
  "/evals",
  "/map",
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

const changelogPage = fs.readFileSync(path.join(root, "app", "changelog", "page.tsx"), "utf8");
for (const required of [
  "buildPublishingIndex",
  "releaseStats",
  "releaseProof",
  "Release proof",
  "Release discipline",
  "Release ledger",
  "Published assets",
  "Publication entries",
  "Latest update",
  "Manual releases",
  "Version deliberately",
  "Prefer stronger assets",
  "Preserve public safety",
  "/wiki/operational-intelligence-canonical-doctrine",
  "/wiki/operational-intelligence-reference-architecture",
  "/wiki/operational-intelligence-publication-pack",
  "/wiki/operational-intelligence-evidence-pack",
  "/evals",
  "/rss.xml"
]) {
  expect(changelogPage.includes(required), `/changelog missing release ledger contract: ${required}`);
}

const interviewPage = fs.readFileSync(path.join(root, "app", "interview", "page.tsx"), "utf8");
for (const required of [
  "const proofPacket",
  "const interviewPrompts",
  "Proof packet",
  "Review the evidence before asking interview questions",
  "Work index",
  "Interactive resume",
  "Copilot proof page",
  "Architecture lab",
  "Trust report",
  "Practitioner review",
  "Explain Ravikanth's architecture judgment using only public evidence",
  "What should a principal architect challenge",
  "suggestedPrompts={interviewPrompts}",
  "/work",
  "/resume",
  "/projects/operational-intelligence-copilot",
  "/architecture-lab",
  "/evals",
  "/contact"
]) {
  expect(interviewPage.includes(required), `/interview missing evidence-led interview contract: ${required}`);
}

const resumePage = fs.readFileSync(path.join(root, "app", "resume", "page.tsx"), "utf8");
for (const required of [
  "const capabilityEvidence",
  "const careerThroughline",
  "const architectThesis",
  "Architect thesis",
  "operating complex systems first",
  "not a chatbot resume",
  "reviewable control system",
  "doctrine, reference architecture, simulations, eval fixtures, patterns, and portable artifacts",
  "Career throughline",
  "Capability evidence matrix",
  "AI-native operations architecture",
  "Operational Intelligence doctrine",
  "Evidence-driven incident systems",
  "Enterprise platform modernization",
  "Evaluation and runtime governance",
  "Public technical leadership",
  "Inspect proof",
  "/projects/operational-intelligence-copilot",
  "/wiki/operational-intelligence-canonical-doctrine",
  "/investigation-room",
  "/patterns/topology-aware-reasoning",
  "/evals",
  "/work"
]) {
  expect(resumePage.includes(required), `/resume missing capability evidence contract: ${required}`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validated content coherence across ${contentRegistry.length} registry items, ${patterns.length} patterns, ${principles.length} principles, and ${products.length} products.`);
