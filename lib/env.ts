export function getRuntimeEnvironment() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://seri.ai";
  const aiProvider = process.env.AI_PROVIDER === "anthropic" ? "anthropic" : "openai";
  const openAiConfigured = Boolean(process.env.OPENAI_API_KEY);
  const anthropicConfigured = Boolean(process.env.ANTHROPIC_API_KEY);
  const supabaseConfigured = Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
  const posthogConfigured = Boolean(process.env.NEXT_PUBLIC_POSTHOG_KEY);

  return {
    siteUrl,
    aiProvider,
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
