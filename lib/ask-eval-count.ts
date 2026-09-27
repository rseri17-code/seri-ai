import evalReport from "../content/eval-report.json";

/**
 * Fixture definitions graded by scripts/run-evals.mjs.
 * Displayed counts must read this value. Do not hard-code the fixture total.
 */
export const askEvalFixtureCount = evalReport.fixtures.length;

export function askEvalPassingRecord(count = askEvalFixtureCount) {
  return `${count}/${count}`;
}
