import { NextResponse } from "next/server";

const rateWindows = new Map<string, { count: number; resetAt: number }>();

export function clientKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const realIp = request.headers.get("x-real-ip")?.trim();
  return forwarded || realIp || "unknown";
}

export function rateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const existing = rateWindows.get(key);
  if (!existing || existing.resetAt < now) {
    rateWindows.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSeconds: Math.ceil(windowMs / 1000) };
  }

  existing.count += 1;
  if (existing.count > limit) {
    return { allowed: false, retryAfterSeconds: Math.ceil((existing.resetAt - now) / 1000) };
  }

  return { allowed: true, retryAfterSeconds: Math.ceil((existing.resetAt - now) / 1000) };
}

export async function withTimeout<T>(operation: Promise<T>, timeoutMs: number, label: string) {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error(`${label} timed out after ${timeoutMs}ms`)), timeoutMs);
  });

  try {
    return await Promise.race([operation, timeout]);
  } finally {
    if (timer) {
      clearTimeout(timer);
    }
  }
}

export function rateLimitedResponse(retryAfterSeconds: number) {
  return NextResponse.json(
    { error: "Too many requests. Please wait briefly before trying again." },
    { status: 429, headers: { "Retry-After": String(retryAfterSeconds) } }
  );
}

type RateLimitResult = { allowed: boolean; retryAfterSeconds: number };

function redisRestConfig() {
  const url = (process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || "").trim();
  const token = (process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || "").trim();
  if (!url || !token) {
    return null;
  }
  return { url: url.replace(/\/$/, ""), token };
}

/**
 * Fixed window on Vercel KV or Upstash REST when those credentials exist.
 * Returns null when they do not, so the caller can use the per-isolate memory window.
 * A Redis miss or a slow REST call must not hold the Ask request.
 */
async function durableFixedWindow(key: string, limit: number, windowMs: number): Promise<RateLimitResult | null> {
  const redis = redisRestConfig();
  if (!redis) {
    return null;
  }

  const windowSec = Math.max(1, Math.ceil(windowMs / 1000));
  const headers = { Authorization: `Bearer ${redis.token}` };
  const signal = AbortSignal.timeout(350);
  const encodedKey = encodeURIComponent(key);

  try {
    const incr = await fetch(`${redis.url}/incr/${encodedKey}`, { headers, signal });
    if (!incr.ok) {
      return null;
    }
    const body = (await incr.json()) as { result?: number };
    const count = Number(body.result);
    if (!Number.isFinite(count)) {
      return null;
    }
    if (count === 1) {
      await fetch(`${redis.url}/expire/${encodedKey}/${windowSec}`, { headers, signal }).catch(() => undefined);
    }
    if (count > limit) {
      return { allowed: false, retryAfterSeconds: windowSec };
    }
    return { allowed: true, retryAfterSeconds: windowSec };
  } catch {
    return null;
  }
}

export async function rateLimitAsk(request: Request, limit: number, windowMs: number): Promise<RateLimitResult> {
  const key = `ask:${clientKey(request)}`;
  const durable = await durableFixedWindow(key, limit, windowMs);
  if (durable) {
    return durable;
  }
  return rateLimit(key, limit, windowMs);
}
