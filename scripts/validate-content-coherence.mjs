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
for (const required of [
  "homeReviewerPaths",
  "homePrimaryPaths",
  "const proofStrip",
  "const inspectionLedger",
  "homeCategoryContrast",
  "homeFalsificationTests",
  "homeOperatorOriginProof",
  "homeHeroFlow",
  "homeMobileArtifactSignals",
  "Ravikanth Seri / Operational Intelligence",
  "Ravikanth Seri",
  "I build the part of operations that keeps context alive when judgment matters most.",
  "professionalGraph.identity.currentFocus",
  "professionalGraph.proofLinks.slice(0, 3)",
  "homepage_hero_identity",
  "Career arc",
  "the team is rebuilding who owns this,",
  "Operator-first",
  "Context loss",
  "Public proof",
  "Reasons to get in touch",
  "Decision packet preview",
  "misfire because they lack intelligence",
  "public operating model for AI-native operations",
  "keep human judgment in control of anything consequential",
  "Everything here is inspectable without access to private systems",
  "15+ years across distributed platforms, reliability, and operational workflows",
  "agent architecture, evaluation, retrieval, and runtime governance",
  "Reference system",
  "Inspect the work.",
  "Inspection is part of the public record.",
  "Inspection ledger",
  "Each artifact answers a different question in the public proof path.",
  "homepage_reference_system",
  "Category boundary and falsification tests",
  "What would make the thesis credible or wrong.",
  "What it replaces, and what it does not",
  "The point is not to rename observability, chat, or incident tracking.",
  "If experienced SREs cannot tell it apart from existing practice",
  "If two teams read the layer contracts incompatibly",
  "If the evidence graph adds structure without changing decisions",
  "If replay cannot reproduce how confidence moved",
  "What it replaces, what it does not, and what would prove it wrong.",
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
  "Visitor Proof Map",
  "Current work",
  "Field notes and reusable patterns.",
  "The LinkedIn posts are the working notes",
  "drafts of the doctrine rather than social proof",
  "homeLinkedInSignals",
  "Ops for observability",
  "Observability for AI",
  "Five stops, about ten minutes.",
  "The model is not the moat. The operating harness is.",
  "Public record only.",
  "Ask the public record. Answers cite their sources.",
  "Ask Ravikanth",
  "Begin with the proof path",
  "Open the Operations Room",
  "Challenge the doctrine",
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
  "/library",
  "/rss.xml",
  "/work",
  "/ask",
  "/background"
]) {
  expect(homepageContractSource.includes(required), `/ missing focused homepage contract: ${required}`);
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
  "Public code",
  "Public code inspection",
  "How to inspect the public code.",
  "Sentinalai is treated as public architecture signal, not private production proof.",
  "publicCode.reviewRubric",
  "publicCode.reviewRecordFields",
  "publicCode.observedPublicStructure",
  "Review question",
  "publicCode.entries[0].href",
  "publicCode.entries[1].href",
  "Sentinalai",
  "Do not claim production adoption, private deployment details, internal integrations, repository metrics, or code behavior that is not visible in public source.",
  "/wiki/operational-intelligence-canonical-doctrine",
  "/wiki/operational-intelligence-reference-architecture",
  "/wiki/operational-intelligence-evidence-pack",
  "/wiki/operational-intelligence-publication-pack",
  "/investigation-room",
  "/background"
]) {
  expect(workContractSource.includes(required), `/work missing reviewer proof spine contract: ${required}`);
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
  "lg:hidden",
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
  "Public review kit",
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
for (const required of [
  "professionalGraph.capabilityEvidence",
  "professionalGraph.careerEvolution",
  "professionalGraph.careerStory",
  "professionalGraph.architectThesis",
  "const impactLedger",
  "Impact ledger",
  "15+ years",
  "120+ apps",
  "80% ticket reduction",
  "200 hours / quarter",
  "evalReport.fixtures.length",
  "v1.0 doctrine",
  "stated as numbers rather than adjectives",
  "Ravikanth Seri's public resume.",
  "Architecture judgment ledger",
  "Public code inspection path",
  "Public repositories are treated as inspectable signal, not as a substitute for private production evidence.",
  "publicCode.entries.slice(0, 2)",
  "Inspect public source",
  "The resume evidence is strongest when it shows which constraints Ravikanth preserves while designing AI-native operational systems.",
  "professionalGraph.architectureJudgment.slice(0, 3)",
  "operating complex systems first",
  "not a chatbot resume",
  "reviewable control system",
  "doctrine, reference architecture, simulations, eval fixtures, patterns, and portable artifacts",
  "Career throughline",
  "Career story map",
  "The public resume is organized as accumulated systems context, not a flat title history.",
  "Enterprise Integration",
  "Middleware & API Architecture",
  "Identity & Platform Engineering",
  "Cloud & Kubernetes",
  "Observability & AIOps",
  "Production AI Systems",
  "Agentic Operations & Operational Intelligence",
  "Source provenance",
  "resume.sourceProvenance.map",
  "approved source classes",
  "public-safe claims",
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
  "/work"
]) {
  expect(resumeContractSource.includes(required), `/resume missing capability evidence contract: ${required}`);
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
for (const required of [
  "professionalGraph.careerEvolution",
  "professionalGraph.credibilityQuestions",
  "professionalGraph.proofLinks",
  "homeLinkedInSignals",
  "const backgroundEvidence",
  "Where the thesis comes from.",
  "being paged when distributed systems failed in ways no single dashboard explained",
  "Fifteen years",
  "Nobody could assemble it fast enough to decide anything.",
  "Regulated by default",
  "every consequential action needs a named owner",
  "Why modernization mattered",
  "telemetry volume and operational understanding are not the same thing",
  "Current focus",
  "reasons from attributable evidence instead of filling gaps with inference",
  "Enterprise integration and infrastructure foundation",
  "Platform modernization, identity, Kubernetes, and observability",
  "Production AI systems and agentic operations",
  "Ravikanth Seri's point of view.",
  "Career story",
  "Ravikanth Seri's career story.",
  "Enterprise Integration",
  "Middleware & API Architecture",
  "Identity & Platform Engineering",
  "Cloud & Kubernetes",
  "Observability & AIOps",
  "Production AI Systems",
  "Agentic Operations & Operational Intelligence",
  "Connects to:",
  "Production delivery",
  "The public-safe delivery chain from architecture to operating loop.",
  "professionalGraph.productionDelivery",
  "Architecture",
  "Engineering",
  "Integration",
  "Evaluation",
  "Governance",
  "Production Delivery",
  "Reviewer question",
  "enterprise AI will fail operationally when context is reconstructed privately, repeatedly, and late",
  "What the career arc trained him to protect.",
  "professionalGraph.architectureJudgment",
  "Preserved constraint",
  "Questions this page should answer.",
  "What stays out of scope?",
  "Public-safe boundary: employer-specific systems, private operational artifacts, proprietary names, and confidential architecture are excluded.",
  "Move from background to inspectable evidence.",
  "/resume",
  "/work",
  "Thesis Radar",
  "ops for observability",
  "observability for AI",
  "/investigation-room",
  "/wiki/operational-intelligence-canonical-doctrine",
  "/ask"
]) {
  expect(backgroundContractSource.includes(required), `/background missing operating-background contract: ${required}`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validated content coherence across ${contentRegistry.length} registry items, ${patterns.length} patterns, ${principles.length} principles, and ${products.length} products.`);
