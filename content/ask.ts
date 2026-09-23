import askData from "./ask.json";

export const askRaviPrompts = askData.askRaviPrompts;

export const askGuidePaths = askData.guidePaths;

export const askContextCards = askData.askContextCards;

export const askThesisLenses = askData.thesisLenses;

export const askDockRoutes = askData.askDockRoutes;

export const askChallengeChips = askData.askChallengeChips;

function normalizePathname(pathname: string) {
  if (!pathname) {
    return "/";
  }
  const trimmed = pathname.replace(/\/+$/, "");
  return trimmed.length ? trimmed : "/";
}

export function challengeChipsForPath(pathname: string) {
  const path = normalizePathname(pathname);
  const routeChips = askChallengeChips.routes as Record<string, string[]>;
  const matches = Object.keys(routeChips)
    .map(normalizePathname)
    .filter((route) => route !== "/" && (path === route || path.startsWith(`${route}/`)))
    .sort((left, right) => right.length - left.length);
  if (matches[0]) {
    return routeChips[matches[0]] ?? askChallengeChips.default;
  }
  return askChallengeChips.default;
}
