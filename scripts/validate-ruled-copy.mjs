/**
 * Ruled-copy guard.
 *
 * Some copy on this site has been decided by Ravikanth directly, not by either agent. When that
 * happens the decision has to outlive the conversation it was made in — a note in a handoff does
 * not reach an agent working from an older base, which is exactly how the homepage hero got
 * reverted on 2026-08-29 and had to be restored.
 *
 * This gate turns those rulings into build failures instead of silent reversions. If you are an
 * agent and this check is failing, you have changed copy that Ravikanth ruled on. Do not repoint
 * the pin to your new wording. Restore the ruled copy, or get a fresh ruling from him and update
 * this file in the same commit, recording the new ruling in CLAUDE_HANDOFF.md.
 */
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const errors = [];

const rulings = [
  {
    file: "app/page.tsx",
    ruledOn: "2026-08-29",
    decision:
      "Hero re-anchored on Ravikanth's own published LinkedIn framing: first person, opening on the misfire hook, with the Authorized Misfire named as the failure mode. He was asked directly and chose this over the alternatives.",
    // Pin whole sentences, not floating fragments. The first version of this check pinned the
    // bare phrase "misfire because they lack intelligence", which could be satisfied anywhere on
    // the page - and was, by being spliced into the Authorized Misfire paragraph, leaving broken
    // English in the hero. A fragment tells an agent which words to keep but not where.
    required: [
      "AI agents don&apos;t misfire because they lack intelligence.",
      "I build the context\n              layer and the harness that runs on it",
      "<span className=\"font-semibold text-amber\">The Authorized Misfire.</span> The failure I design against: an action the"
    ],
    forbidden: [
      "Ravikanth Seri is a senior infrastructure and AI systems engineer building Operational Intelligence"
    ]
  }
];

for (const ruling of rulings) {
  const full = path.join(root, ruling.file);
  if (!fs.existsSync(full)) {
    errors.push(`${ruling.file}: missing, but carries a ruling from ${ruling.ruledOn}`);
    continue;
  }
  const source = fs.readFileSync(full, "utf8");
  for (const phrase of ruling.required) {
    if (!source.includes(phrase)) {
      errors.push(
        `${ruling.file}: ruled copy missing "${phrase}".\n    Ruling (${ruling.ruledOn}): ${ruling.decision}\n    Restore it rather than repointing this check.`
      );
    }
  }
  for (const phrase of ruling.forbidden ?? []) {
    if (source.includes(phrase)) {
      errors.push(
        `${ruling.file}: contains copy that a ruling replaced: "${phrase}".\n    Ruling (${ruling.ruledOn}): ${ruling.decision}`
      );
    }
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validated ${rulings.length} ruled-copy decision(s) against reversion.`);
