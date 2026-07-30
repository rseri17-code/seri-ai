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

for (const route of ["/wiki/operational-intelligence-canonical-doctrine", "/wiki/operational-intelligence-reference-architecture", "/wiki/operational-intelligence-publication-pack", "/wiki/operational-intelligence-evidence-pack", "/work", "/framework", "/investigation-room", "/ask", "/evals", "/radar"]) {
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
for (const required of [
  "const reviewerPaths",
  "const primaryPaths",
  "const proofStrip",
  "const inspectionLedger",
  "const categoryContrast",
  "const falsificationTests",
  "const heroBuilderProof",
  "const heroFlow",
  "const mobileArtifactSignals",
  "Ravikanth Seri&apos;s public operating model",
  "Operational Intelligence loop",
  "Decision packet preview",
  "Operations should explain themselves before AI acts.",
  "turning telemetry, topology, transactions, change, memory, and evaluation into evidence-backed operational judgment",
  "The material is public-safe by design",
  "15+ years across distributed platforms, reliability, and operational workflows",
  "agent architecture, evaluation, retrieval, and runtime governance",
  "The thesis is narrow on purpose",
  "Reference system",
  "The proof path is part of the work, not a separate credibility layer.",
  "Inspection is part of the product contract.",
  "Inspection ledger",
  "Each artifact has a job in the public proof path.",
  "homepage_reference_system",
  "Category boundary and falsification tests",
  "What would make the thesis credible or wrong.",
  "What it replaces, and what it does not",
  "The point is not to rename observability, chat, or incident tracking.",
  "Contradiction stays visible",
  "Unknowns stay named",
  "Reasoning can replay",
  "Humans keep authority",
  "Operational Intelligence begins where observation alone stops being enough.",
  "Dashboard",
  "Chatbot",
  "Ticket queue",
  "Produces a reviewable decision",
  "Doctrine v1.0",
  "Reference Architecture",
  "Trust Evals",
  "Thesis Radar",
  "Publishing System",
  "Public Work",
  "Public thesis stream",
  "The posts converge on one enterprise failure mode: operational context is recreated instead of owned.",
  "LinkedIn thesis ledger",
  "The public posts are treated as working notes for the doctrine, not as social proof.",
  "homeLinkedInSignals",
  "One thesis. Three ways to challenge it.",
  "The model is not the moat. The operating harness is.",
  "If the idea is real, it should survive inspection.",
  "Different serious visitors should know exactly where to start.",
  "The author shows up through engineering taste, not self-promotion.",
  "Ask Ravikanth turns the public body of work into a review surface.",
  "Ask Ravikanth",
  "Run OI-ROOM-001",
  "Read the doctrine",
  "Review the work",
  "Download publication pack",
  "Challenge the evidence",
  "Executive",
  "SRE leader",
  "Principal architect",
  "AI engineer",
  "Recruiter or founder",
  "/brief",
  "/investigation-room",
  "/wiki/operational-intelligence-canonical-doctrine",
  "/wiki/operational-intelligence-reference-architecture",
  "/wiki/operational-intelligence-evidence-pack",
  "/evals",
  "/library",
  "/rss.xml",
  "/work",
  "/ask",
  "/background"
]) {
  expect(homePage.includes(required), `/ missing focused homepage contract: ${required}`);
}

const homeContent = fs.readFileSync(path.join(root, "content", "home.ts"), "utf8");
for (const required of [
  "oi-room-001-control-comparison",
  "OI-ROOM-001 Control Comparison",
  "dashboard-only, chatbot-only, and ticket-only"
]) {
  expect(homeContent.includes(required), `Home content missing latest proof note contract: ${required}`);
}

const notFoundPage = fs.readFileSync(path.join(root, "app", "not-found.tsx"), "utf8");
for (const required of [
  "Use the map, library, or Ask Ravi",
  "Ask Ravi"
]) {
  expect(notFoundPage.includes(required), `/not-found missing Ask Ravi recovery contract: ${required}`);
}

const frameworkPage = fs.readFileSync(path.join(root, "app", "framework", "page.tsx"), "utf8");
for (const required of [
  "Operator questions",
  "/ask?prompt=",
  "encodeURIComponent(question)",
  "Run the Operations Room",
  "View the Map",
  "Teaching sequence",
  "FrameworkTeacher",
  "TechnicalReviewPath",
  "Design principles",
  "Evaluation criteria"
]) {
  expect(frameworkPage.includes(required), `/framework missing executable framework contract: ${required}`);
}

const workPage = fs.readFileSync(path.join(root, "app", "work", "page.tsx"), "utf8");
for (const required of [
  "const reviewSpine",
  "const proofLedger",
  "const operatingArc",
  "homeLinkedInSignals",
  "The operating record behind Operational Intelligence.",
  "Experience, public writing, artifacts, and systems work converge on one operating thesis.",
  "Operating arc",
  "The thesis comes from operating systems before asking AI to reason about them.",
  "Turned operational experience into governed AI systems",
  "Published the operating model as inspectable artifacts",
  "without confidential systems, logs, screenshots, or architecture",
  "Public thesis threads",
  "The current writing signal behind the work.",
  "The public posts are not side commentary. They are the working notes for the doctrine.",
  "Read LinkedIn posts",
  "Proof ledger",
  "The serious question is not what exists. It is what each artifact proves.",
  "Operational Intelligence is a reference model, not a profile wrapper.",
  "The thesis is inspectable through a working public-safe artifact.",
  "The AI surface is bounded by citations, refusals, and deterministic trust fixtures.",
  "The body of work connects engineering taste to professional proof.",
  "What to inspect",
  "What would weaken it",
  "If the doctrine cannot distinguish itself from observability, AIOps, SRE, ITIL, incident command, knowledge graphs, and AI evaluation.",
  "If Ask Ravi answers unsupported questions confidently or stores private prompt text in analytics.",
  "Operating standard",
  "Definition discipline",
  "Action discipline",
  "Learning discipline",
  "Review spine",
  "/wiki/operational-intelligence-canonical-doctrine",
  "/wiki/operational-intelligence-reference-architecture",
  "/wiki/operational-intelligence-evidence-pack",
  "/wiki/operational-intelligence-publication-pack",
  "/investigation-room",
  "/evals",
  "/background"
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
  "/ask?prompt=",
  "encodeURIComponent(prompt)",
  "Ask <ArrowRight",
  "Source <ArrowRight",
  "A research console for the doctrine, reference architecture, proof objects, and public work.",
  "Search is part of the product contract",
  "What is Operational Intelligence and what is it not?",
  "Which contracts make two implementations comparable?",
  "What would convince a skeptical engineer that this model is useful?",
  "How does OI-ROOM-001 move from evidence to a decision packet?",
  "Which trust fixtures gate Ask Ravi behavior?",
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
	  "react-hooks/exhaustive-deps",
	  "Ask how Operational Intelligence works",
	  "cite sources",
	  "separate evidence from inference",
	  "name uncertainty",
	  "record is thin",
	  "Reading the public evidence...",
	  "Ask about Ravikanth, his work, Operational Intelligence, projects, or background...",
	  "Question the doctrine, the Operations Room, and the public work.",
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

const evalRunner = fs.readFileSync(path.join(root, "scripts", "run-evals.mjs"), "utf8");
expect(evalRunner.includes("generatedAt: `${report.lastRun}T00:00:00.000Z`"), "run-evals must use deterministic generatedAt based on report.lastRun");
expect(!evalRunner.includes("generatedAt: new Date().toISOString()"), "run-evals must not create timestamp-only public eval report churn");

const headerComponent = fs.readFileSync(path.join(root, "components", "header.tsx"), "utf8");
for (const required of [
  "Ask Ravikanth",
  "href=\"/ask\"",
  "href: \"/radar\""
]) {
  expect(headerComponent.includes(required), `Header missing Ask Ravi companion CTA contract: ${required}`);
}

const radarPage = fs.readFileSync(path.join(root, "app", "radar", "page.tsx"), "utf8");
const siteContent = fs.readFileSync(path.join(root, "content", "site.ts"), "utf8");
for (const required of [
  "Evidence posture",
  "These signals do not prove Operational Intelligence as a finished category",
  "Challenge the evidence",
  "OpenTelemetry: GenAI observability",
  "Microsoft Research: AgentRx failure diagnosis",
  "NIST AI Risk Management Framework",
  "Operational Intelligence Thesis Radar",
  "ops for observability",
  "observability for AI",
  "type: \"domain\"",
  "route: \"/radar\""
]) {
  expect(radarPage.includes(required) || siteContent.includes(required), `/radar missing thesis radar evidence contract: ${required}`);
}

const askPage = fs.readFileSync(path.join(root, "app", "ask", "page.tsx"), "utf8");
for (const required of [
	  "Ask Ravikanth | Operational Intelligence Public Research Interface",
	  "const askRaviPrompts",
	  "const thesisLenses",
	  "homeLinkedInSignals",
	  "Ask the public record to defend the thesis.",
	  "A serious idea should answer questions with receipts.",
	  "public evidence only; uncertainty stays visible",
	  "Public research interface",
	  "Expose sources",
	  "Separate inference",
	  "Stop at evidence",
	  "What is Ravikanth building with seri.ai?",
	  "What does Ravikanth mean by Context Acquisition Tax?",
	  "What is the Enterprise Context Layer?",
	  "Why is the harness more important than the model for SRE agents?",
	  "What public evidence shows Ravikanth's architecture judgment?",
	  "How does Ravikanth think about Operational Intelligence?",
  "Where can I review Ravikanth's GitHub, LinkedIn, resume, and public artifacts?",
  "Thesis lenses",
  "Start with the questions Ravikanth keeps returning to.",
  "Ask this lens",
  "Dynamic operational view",
  "suggestedPrompts={askRaviPrompts}",
  "doctrine, architecture, projects, resume, GitHub, LinkedIn",
  "ProfileMark"
]) {
  expect(askPage.includes(required), `/ask missing Ask Ravi public companion contract: ${required}`);
}

for (const relativePath of sourceFilesUnder("app").concat(sourceFilesUnder("components"), sourceFilesUnder("content"), sourceFilesUnder("lib"))) {
  const content = fs.readFileSync(path.join(root, relativePath), "utf8");
  expect(!content.includes("ravikanth-seri-linkedin.jpg"), `${relativePath}: LinkedIn portrait requires explicit reuse authorization before source reference`);
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
  "const publicChannels",
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
  expect(contactPage.includes(required), `/contact missing resilient submit contract: ${required}`);
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

const evalsPage = fs.readFileSync(path.join(root, "app", "evals", "page.tsx"), "utf8");
for (const required of [
  "const coverageBuckets",
  "askQualityRubric",
  "Coverage matrix",
  "What the deterministic fixtures are protecting.",
  "Live answer rubric",
  "Human review labels",
  "No model-quality score is published until reviewer-labeled sessions exist.",
  "Safe reporting protocol",
  "Review prompt set",
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
  "Ask Ravi trust fixtures",
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
  "const impactLedger",
  "Impact ledger",
  "15+ years",
  "120+ apps",
  "80% ticket reduction",
  "200 hours / quarter",
  "evalReport.fixtures.length",
  "v1.0 doctrine",
  "Public-safe proof points",
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

const backgroundPage = fs.readFileSync(path.join(root, "app", "background", "page.tsx"), "utf8");
for (const required of [
  "const formationArc",
  "const credibilityQuestions",
  "const proofLinks",
  "homeLinkedInSignals",
  "The operating background behind the Operational Intelligence thesis.",
  "Ravikanth Seri builds from the operator side of enterprise AI.",
  "Operating base",
  "Modernization lens",
  "Current focus",
  "The throughline is context, evidence, and accountable action.",
  "The LinkedIn signal and the reference architecture are telling the same story.",
  "enterprise AI will fail operationally when context is reconstructed privately, repeatedly, and late",
  "A serious background page should make claims easy to challenge.",
  "What stays out of scope?",
  "Public-safe boundary: employer-specific systems, private operational artifacts, proprietary names, and confidential architecture are excluded.",
  "Move from background to inspectable evidence.",
  "/resume",
  "/work",
  "/radar",
  "Thesis Radar",
  "ops for observability",
  "observability for AI",
  "/investigation-room",
  "/wiki/operational-intelligence-canonical-doctrine",
  "/evals"
]) {
  expect(backgroundPage.includes(required), `/background missing operating-background contract: ${required}`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validated content coherence across ${contentRegistry.length} registry items, ${patterns.length} patterns, ${principles.length} principles, and ${products.length} products.`);
