export function getRuntimeEnvironment() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://seri-ai.vercel.app";
  const canonicalDomain = process.env.NEXT_PUBLIC_CANONICAL_DOMAIN || new URL(siteUrl).hostname;
  const aiProvider = process.env.AI_PROVIDER === "anthropic" ? "anthropic" : "openai";
  const openAiConfigured = Boolean(process.env.OPENAI_API_KEY);
  const anthropicConfigured = Boolean(process.env.ANTHROPIC_API_KEY);
  const supabaseConfigured = Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
  const posthogConfigured = Boolean(process.env.NEXT_PUBLIC_POSTHOG_KEY);

  return {
    siteUrl,
    canonicalDomain,
    aiProvider,
    askLlmProvider: process.env.ASK_LLM_PROVIDER === "groq" || process.env.ASK_LLM_PROVIDER === "ollama" ? process.env.ASK_LLM_PROVIDER : "none",
    askLlmConfigured:
      (process.env.ASK_LLM_PROVIDER === "groq" && Boolean(process.env.GROQ_API_KEY)) ||
      (process.env.ASK_LLM_PROVIDER === "ollama" && Boolean(process.env.OLLAMA_BASE_URL)),
    aiConfigured: aiProvider === "anthropic" ? anthropicConfigured : openAiConfigured,
    vectorSearchConfigured: supabaseConfigured && openAiConfigured,
    contactPersistenceConfigured: supabaseConfigured,
    analyticsConfigured: posthogConfigured,
    optionalServicesMissing: {
      ai: !(aiProvider === "anthropic" ? anthropicConfigured : openAiConfigured),
      vectorSearch: !(supabaseConfigured && openAiConfigured),
      contactPersistence: !supabaseConfigured,
      analytics: !posthogConfigured
    }
  };
}
