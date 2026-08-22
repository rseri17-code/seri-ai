import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const intakePath = path.join(root, "content", "portrait-intake.json");
const publicIntakePath = path.join(root, "public", "identity", "portrait-intake.md");
const identityPath = path.join(root, "content", "identity-asset.json");
const scorecardPath = path.join(root, "WORLD_CLASS_SCORECARD.md");
const errors = [];

function expect(condition, message) {
  if (!condition) errors.push(message);
}

const intake = JSON.parse(fs.readFileSync(intakePath, "utf8"));
const publicIntake = fs.readFileSync(publicIntakePath, "utf8");
const identityAsset = JSON.parse(fs.readFileSync(identityPath, "utf8"));
const scorecard = fs.readFileSync(scorecardPath, "utf8");

expect(intake.title === "Ravikanth Seri Approved Portrait Intake", "Portrait intake title must name Ravikanth Seri.");
expect(intake.status === "waiting_for_approved_source_image", "Portrait intake must not claim an approved image exists.");
expect(/no approved durable portrait file/i.test(intake.evidenceLevel ?? ""), "Portrait intake evidence level must name missing durable portrait file.");
expect(intake.targetAsset?.preferredPath === "/identity/ravikanth-seri-portrait.webp", "Portrait intake must define the preferred WebP path.");
expect(intake.targetAsset?.fallbackPath === "/identity/ravikanth-seri-portrait.jpg", "Portrait intake must define the fallback JPG path.");
expect(intake.targetAsset?.displayAlt === "Portrait of Ravikanth Seri", "Portrait intake must define plain alt text.");
expect(Array.isArray(intake.acceptanceCriteria) && intake.acceptanceCriteria.length >= 7, "Portrait intake needs at least seven acceptance criteria.");
expect(Array.isArray(intake.doNotUse) && intake.doNotUse.length >= 7, "Portrait intake needs at least seven do-not-use criteria.");
expect(Array.isArray(intake.validationPlan) && intake.validationPlan.length >= 5, "Portrait intake needs at least five validation steps.");
expect(/Do not publish a portrait file until/i.test(intake.publicationRule ?? ""), "Portrait intake must block premature portrait publication.");

for (const required of [
  "explicitly approved",
  "durable",
  "employer logos",
  "confidential screens",
  "AI-generated replacement portrait",
  "unclear public-use permission",
  "public identity mark"
]) {
  expect(JSON.stringify(intake).toLowerCase().includes(required.toLowerCase()), `Portrait intake missing safety phrase: ${required}`);
  expect(publicIntake.toLowerCase().includes(required.toLowerCase()), `Public portrait intake missing safety phrase: ${required}`);
}

expect(identityAsset.limitations.some((item) => item.includes("/identity/portrait-intake.md")), "Identity asset limitations must point to portrait intake.");
expect(scorecard.includes("/identity/portrait-intake.md"), "Scorecard must point to portrait intake.");

if (fs.existsSync(path.join(root, "public", "identity", "ravikanth-seri-portrait.webp")) || fs.existsSync(path.join(root, "public", "identity", "ravikanth-seri-portrait.jpg"))) {
  expect(
    scorecard.includes("approved portrait renders"),
    "If portrait file exists, scorecard must mention rendered approved portrait evidence."
  );
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validated portrait intake contract with ${intake.acceptanceCriteria.length} acceptance criteria and ${intake.validationPlan.length} validation steps.`);
