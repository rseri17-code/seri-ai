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
    ruledOn: "2026-08-30",
    decision:
      "Homepage redesign brief. Ravikanth ruled that identity comes before doctrine: the H1 states what he builds in the first person, the production accomplishment is prominent rather than footer copy, and there are exactly two primary actions. The misfire hook is kept as the signature thesis but moves beneath the identity layer, where it deepens comprehension instead of delaying it. This supersedes the 2026-08-29 hero freeze, which pinned the misfire line as the H1.",
    required: [
      "I build evidence-grounded AI systems for enterprise operations.",
      "AI agents don&apos;t misfire because they lack intelligence.",
      "the Authorized Misfire",
      "enterprise SRE investigation\n                agent from thesis to production",
      "Enter the Operations Room",
      "Explore the body of work"
    ],
    forbidden: [
      // The third-person hero a previous session replaced twice. Still out.
      "Ravikanth Seri is a senior infrastructure and AI systems engineer building Operational Intelligence",
      // A third primary action in the hero was the 2026-08-30 diagnosis: too many competing choices.
      "Begin with the proof path"
    ]
  },
  {
    file: "app/page.tsx",
    ruledOn: "2026-08-30",
    decision:
      "Homepage is exactly seven sections in a mandated order: hero, signature thesis, flagship proof, selected work, career arc, selected ideas, closing invitation. The falsification matrix, inspection ledger, persona-route grid, five-stop visitor map and contact-reason grid were relocated to their own routes rather than deleted. Do not restore them to the homepage.",
    required: [
      "1 Hero  2 Signature thesis  3 The Operations Room  4 Selected work",
      "Three bodies of work.",
      "Four arguments worth disagreeing with."
    ],
    forbidden: [
      "Five stops, about ten minutes",
      "Who I am, and where the evidence sits.",
      "What it replaces, what it does not, and what would prove it wrong.",
      "What a useful conversation usually looks like."
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
