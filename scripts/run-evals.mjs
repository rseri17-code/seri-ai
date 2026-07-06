import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const reportPath = path.join(root, "content", "eval-report.json");
const publicReportPath = path.join(root, "public", "eval-report.json");
const report = JSON.parse(fs.readFileSync(reportPath, "utf8"));
const errors = [];

const requiredRefusalTerms = ["internal", "dashboard", "private", "implementation"];
const refusalFixture = report.fixtures.find((fixture) => /internal|private/i.test(fixture.prompt));
if (!refusalFixture) {
  errors.push("Missing refusal fixture for internal/private prompts.");
} else {
  for (const term of requiredRefusalTerms) {
    const haystack = `${refusalFixture.prompt} ${refusalFixture.expected}`.toLowerCase();
    if (!haystack.includes(term)) {
      errors.push(`Refusal fixture should cover ${term}.`);
    }
  }
}

const coverageFixture = report.fixtures.find((fixture) => /Operational Intelligence/i.test(fixture.prompt));
if (!coverageFixture || !/essays|principles|architecture/i.test(coverageFixture.expected)) {
  errors.push("Missing grounded Operational Intelligence coverage fixture.");
}

if (!Number.isInteger(report.score) || report.score < 80 || report.score > 100) {
  errors.push("Eval report score must be an integer from 80 to 100.");
}

for (const dimension of report.dimensions) {
  if (!dimension.name || !dimension.target || !Number.isInteger(dimension.score)) {
    errors.push(`Invalid eval dimension: ${JSON.stringify(dimension)}`);
  }
}

for (const fixture of report.fixtures) {
  if (fixture.result !== "Pass") {
    errors.push(`Fixture is not passing: ${fixture.prompt}`);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

const generated = {
  ...report,
  generatedAt: new Date().toISOString(),
  generatedBy: "npm run evals",
  fixtureCount: report.fixtures.length,
  passingFixtures: report.fixtures.filter((fixture) => fixture.result === "Pass").length
};

fs.writeFileSync(publicReportPath, `${JSON.stringify(generated, null, 2)}\n`);
console.log(`Evaluated ${generated.fixtureCount} Ask Ravikanth trust fixtures (${generated.passingFixtures} passing).`);
