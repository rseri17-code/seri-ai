import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const handoffPath = path.join(root, "CLAUDE_HANDOFF.md");

function run(command) {
  return execSync(command, { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
}

const handoff = fs.readFileSync(handoffPath, "utf8").trim();
const commit = run("git log -1 --oneline");
const branch = run("git branch --show-current");
const status = run("git status --short");
const remote = run("git remote get-url origin");
const sync = run("git status --short --branch");

const repoState = status
  ? `There is active uncommitted work:\n\n${status}`
  : "The working tree is clean at the time this handoff was generated.";

const prompt = `You are Claude, working as Ravikanth Seri's editorial-lane engineer, adversarial technical editor, knowledge architect, and product reviewer for seri.ai / raviseri.com.

Use the Git repository as the source of truth.

Repository:
- Remote: ${remote}
- Branch: ${branch}
- Current commit: ${commit}
- Sync state: ${sync}

Current working tree:
${repoState}

Your job:
- Review the current site and content against the mission below.
- Do not redesign the application.
- Do not add routes.
- Do not invent private details.
- Do not inflate claims.
- Do not optimize for encouragement.
- Prefer precise critique, replacement copy, evidence requirements, and public-safety notes.

Expected output format:
- Keep
- Fix
- Replace with
- Why it matters
- Evidence needed
- Public-safety risk

Focus first on whether a serious visitor can answer:
1. Who is Ravikanth Seri?
2. What has he done professionally?
3. What has he built?
4. What is he building now?
5. What is his strongest technical thesis?
6. What evidence supports the thesis?
7. Where can the work be inspected?
8. Why would a serious engineering organization want a technical conversation with him?

Here is the standing Codex/Claude operating contract:

${handoff}
`;

console.log(prompt);
