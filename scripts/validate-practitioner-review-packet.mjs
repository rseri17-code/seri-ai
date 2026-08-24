import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const packetPath = path.join(root, "content", "practitioner-review-packet.json");
const publicPacketPath = path.join(root, "public", "publication-pack", "ravikanth-seri-practitioner-review-packet.md");
const visitorKitPath = path.join(root, "content", "visitor-review-kit.json");
const contactPagePath = path.join(root, "app", "contact", "page.tsx");
const scorecardPath = path.join(root, "WORLD_CLASS_SCORECARD.md");
const errors = [];

function expect(condition, message) {
  if (!condition) errors.push(message);
}

const packet = JSON.parse(fs.readFileSync(packetPath, "utf8"));
const publicPacket = fs.readFileSync(publicPacketPath, "utf8");
const visitorKit = JSON.parse(fs.readFileSync(visitorKitPath, "utf8"));
const contactPage = fs.readFileSync(contactPagePath, "utf8");
const scorecard = fs.readFileSync(scorecardPath, "utf8");

expect(packet.title === "Ravikanth Seri Practitioner Review Packet", "Packet title must name Ravikanth Seri.");
expect(packet.status === "ready_for_external_review", "Packet status must be ready_for_external_review.");
expect(/no external practitioner verdicts/i.test(packet.evidenceLevel ?? ""), "Packet must not claim external practitioner verdicts exist.");
expect(Array.isArray(packet.reviewerRoles) && packet.reviewerRoles.length >= 7, "Packet must define at least seven reviewer roles.");
expect(Array.isArray(packet.reviewSequence) && packet.reviewSequence.length >= 7, "Packet must define at least seven review sequence steps.");
expect(Array.isArray(packet.reviewDimensions) && packet.reviewDimensions.length >= 8, "Packet must define at least eight review dimensions.");
expect(packet.minimumEvidenceQuorum?.minimumReviewerCount >= 5, "Packet must require at least five external reviews before positive review summaries.");
expect(Array.isArray(packet.minimumEvidenceQuorum?.requiredCoverage) && packet.minimumEvidenceQuorum.requiredCoverage.length >= 5, "Packet must define role-specific review coverage.");
expect(/skeptical or mixed verdict/i.test(packet.minimumEvidenceQuorum?.completionRule ?? ""), "Packet completion rule must require skeptical or mixed evidence.");
expect(/person-work-thesis relationship/i.test(packet.minimumEvidenceQuorum?.revisionTrigger ?? ""), "Packet revision trigger must protect the person-work-thesis relationship.");
expect(/renamed observability or generic AIOps/i.test(packet.minimumEvidenceQuorum?.revisionTrigger ?? ""), "Packet revision trigger must test OI differentiation from adjacent practice.");
expect(Array.isArray(packet.reviewRunProtocol) && packet.reviewRunProtocol.length >= 5, "Packet must define a review run protocol.");
expect(Array.isArray(packet.safeMetadataOnly) && packet.safeMetadataOnly.length >= 10, "Packet must define safe metadata fields.");
expect(packet.safeMetadataOnly.includes("artifacts_inspected"), "Packet safe metadata must include artifacts_inspected.");
expect(packet.safeMetadataOnly.includes("review_disposition"), "Packet safe metadata must include review_disposition.");
expect(Array.isArray(packet.doNotCapture) && packet.doNotCapture.length >= 8, "Packet must define do-not-capture fields.");
expect(Array.isArray(packet.verdicts) && packet.verdicts.includes("Not assessable"), "Packet must include Not assessable verdict.");
expect(/Do not publish raw confidential material or aggregate reputation claims/i.test(packet.publicationRule ?? ""), "Packet publication rule must block confidential material and aggregate reputation claims.");

for (const route of ["/start-here", "/background", "/work", "/resume", "/wiki/operational-intelligence-evidence-pack", "/investigation-room", "/ask", "/contact"]) {
  expect(JSON.stringify(packet).includes(route), `Packet missing review route ${route}.`);
}

for (const unsafe of ["confidential employer product names", "internal systems", "non-public architecture", "internal screenshots", "internal logs", "customer information", "production credentials", "unpublished metrics"]) {
  expect(packet.doNotCapture.includes(unsafe), `Packet do-not-capture list missing ${unsafe}.`);
}

for (const required of [
  "no external practitioner verdicts have been published yet",
  "Ravikanth Seri",
  "Professional representation",
  "Career clarity",
  "Technical authority",
  "Evidence quality",
  "Originality with restraint",
  "Interactive artifact usefulness",
  "Ask usefulness and safety",
  "Memorability",
  "Minimum External Evidence Quorum",
  "at least five public-safe reviews",
  "Review Run Protocol",
  "artifacts_inspected",
  "review_disposition",
  "person-work-thesis relationship",
  "renamed observability or generic AIOps",
  "Do Not Capture",
  "aggregate reputation claims"
]) {
  expect(publicPacket.toLowerCase().includes(required.toLowerCase()), `Public packet missing required text: ${required}`);
}

expect(
  visitorKit.reviewAssets.some((asset) => asset.href === "/publication-pack/ravikanth-seri-practitioner-review-packet.md"),
  "Visitor review kit must link to the practitioner review packet."
);
expect(
  visitorKit.reviewAssets.some((asset) => asset.href === "/work" && /GitHub|Sentinalai|project proof|public-code/i.test(`${asset.label} ${asset.description}`)),
  "Visitor review kit must link to Work as the public-code and project-proof review asset."
);
expect(contactPage.includes("visitorReviewKit.reviewAssets"), "Contact page must render visitor review kit assets.");
expect(contactPage.includes("practitionerReviewPacket.minimumEvidenceQuorum"), "Contact page must render the minimum evidence quorum.");
expect(contactPage.includes("practitionerReviewPacket.reviewRunProtocol"), "Contact page must render the review run protocol.");
expect(contactPage.includes("artifactsInspected"), "Contact page must capture artifacts inspected.");
expect(contactPage.includes("reviewDisposition"), "Contact page must capture review disposition.");
expect(contactPage.includes("Recruiter / hiring-facing reviewer"), "Contact page reviewer roles must cover recruiter/hiring quorum.");
expect(scorecard.includes("Practitioner Review Packet"), "Scorecard must mention the Practitioner Review Packet.");

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validated practitioner review packet across ${packet.reviewSequence.length} steps and ${packet.reviewDimensions.length} dimensions.`);
