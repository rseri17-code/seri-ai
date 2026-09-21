const PUBLIC_FILE_EXTENSION = /\.(md|pdf|txt|xml|json|svg|png|jpe?g|webp|ico|csv)(?:[?#]|$)/i;

export function isPublicFileHref(href: string): boolean {
  if (!href.startsWith("/")) {
    return false;
  }

  const path = href.split(/[?#]/, 1)[0] ?? href;
  return (
    PUBLIC_FILE_EXTENSION.test(path) ||
    path.startsWith("/publication-pack/") ||
    path.startsWith("/downloads/") ||
    path.startsWith("/identity/") ||
    path.startsWith("/visual-qa/")
  );
}
