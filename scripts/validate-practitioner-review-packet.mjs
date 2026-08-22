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
expect(Array.isArray(packet.safeMetadataOnly) && packet.safeMetadataOnly.length >= 10, "Packet must define safe metadata fields.");
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
  "Do Not Capture",
  "aggregate reputation claims"
]) {
  expect(publicPacket.toLowerCase().includes(required.toLowerCase()), `Public packet missing required text: ${required}`);
}

expect(
  visitorKit.reviewAssets.some((asset) => asset.href === "/publication-pack/ravikanth-seri-practitioner-review-packet.md"),
  "Visitor review kit must link to the practitioner review packet."
);
expect(contactPage.includes("visitorReviewKit.reviewAssets"), "Contact page must render visitor review kit assets.");
expect(scorecard.includes("Practitioner Review Packet"), "Scorecard must mention the Practitioner Review Packet.");

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validated practitioner review packet across ${packet.reviewSequence.length} steps and ${packet.reviewDimensions.length} dimensions.`);
