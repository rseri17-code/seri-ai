import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const errors = [];

const requiredEnvKeys = [
  "NEXT_PUBLIC_SITE_URL",
  "NEXT_PUBLIC_CANONICAL_DOMAIN",
  "NEXT_PUBLIC_POSTHOG_KEY",
  "NEXT_PUBLIC_POSTHOG_HOST",
  "SUPABASE_URL",
  "SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
  "OPENAI_API_KEY",
  "ANTHROPIC_API_KEY",
  "AI_PROVIDER",
  "OPENAI_CHAT_MODEL",
  "OPENAI_EMBEDDING_MODEL",
  "ANTHROPIC_CHAT_MODEL",
  "ADMIN_TOKEN"
];

const optionalRuntimeServices = [
  "aiConfigured",
  "vectorSearchConfigured",
  "contactPersistenceConfigured",
  "analyticsConfigured",
  "optionalServicesMissing"
];

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function expect(condition, message) {
  if (!condition) errors.push(message);
}

function parseEnvExample() {
  const keys = [];
  for (const line of read(".env.example").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const [key] = trimmed.split("=");
    keys.push(key);
  }
  return keys;
}

const envKeys = parseEnvExample();
for (const key of requiredEnvKeys) {
  expect(envKeys.includes(key), `.env.example missing ${key}`);
}

const duplicateEnvKeys = envKeys.filter((key, index) => envKeys.indexOf(key) !== index);
expect(duplicateEnvKeys.length === 0, `.env.example duplicate keys: ${[...new Set(duplicateEnvKeys)].join(", ")}`);
expect(!envKeys.includes("CONTACT_TO_EMAIL"), ".env.example should not advertise unsupported email delivery");

const sourceFiles = [
  "app/api/ask/route.ts",
  "app/api/contact/route.ts",
  "app/api/ingest/route.ts",
  "app/api/subscribe/route.ts",
  "app/layout.tsx",
  "app/robots.ts",
  "app/sitemap.ts",
  "components/analytics.tsx",
  "lib/ai.ts",
  "lib/env.ts",
  "lib/llms.ts",
  "lib/publishing.ts",
  "lib/supabase.ts"
];

const source = sourceFiles.map(read).join("\n");
const usedEnvKeys = [...source.matchAll(/process\.env\.([A-Z0-9_]+)/g)].map((match) => match[1]);
for (const key of usedEnvKeys) {
  expect(envKeys.includes(key), `${key} is used in runtime source but missing from .env.example`);
}

const envSource = read("lib/env.ts");
for (const field of ["siteUrl", "canonicalDomain", "aiProvider", ...optionalRuntimeServices]) {
  expect(envSource.includes(field), `lib/env.ts missing runtime field ${field}`);
}
expect(envSource.includes("AI_PROVIDER === \"anthropic\" ? \"anthropic\" : \"openai\""), "lib/env.ts must default unknown AI_PROVIDER values to openai");
expect(envSource.includes("vectorSearchConfigured: supabaseConfigured && openAiConfigured"), "lib/env.ts must require Supabase and OpenAI for vector search");

const vercel = JSON.parse(read("vercel.json"));
expect(vercel.framework === "nextjs", "vercel.json framework must be nextjs");
expect(Array.isArray(vercel.regions) && vercel.regions.includes("iad1"), "vercel.json must pin iad1 region for controlled beta");
const headerValues = JSON.stringify(vercel.headers ?? []);
for (const header of ["X-Content-Type-Options", "Referrer-Policy", "Permissions-Policy", "nosniff", "strict-origin-when-cross-origin", "camera=(), microphone=(), geolocation=()"]) {
  expect(headerValues.includes(header), `vercel.json missing security header ${header}`);
}

const nextConfig = read("next.config.ts");
expect(nextConfig.includes("const nextConfig: NextConfig = {}"), "next.config.ts should remain minimal unless a production need is introduced");

const readme = read("README.md");
for (const key of ["NEXT_PUBLIC_SITE_URL", "NEXT_PUBLIC_POSTHOG_KEY", "SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY", "OPENAI_API_KEY", "ANTHROPIC_API_KEY", "ADMIN_TOKEN"]) {
  expect(readme.includes(key), `README.md missing environment variable ${key}`);
}
expect(readme.includes("Without model or database keys, `/ask` runs with the local approved-content fallback"), "README.md missing optional-service fallback note");

const contentSource = read("lib/content.ts");
for (const cacheName of ["allWikiNotesCache", "publishedWikiNotesCache", "publicSourceIndexCache"]) {
  expect(contentSource.includes(cacheName), `lib/content.ts missing build-time content cache ${cacheName}`);
}

const publishingSource = read("lib/publishing.ts");
for (const cacheName of ["publishingIndexCache", "knowledgeGraphCache"]) {
  expect(publishingSource.includes(cacheName), `lib/publishing.ts missing build-time publishing cache ${cacheName}`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validated deployment config, ${envKeys.length} env template keys, runtime env usage, Vercel headers, and fallback documentation.`);
