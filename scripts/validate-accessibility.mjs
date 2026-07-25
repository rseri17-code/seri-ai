import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const errors = [];

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    return [full];
  });
}

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function lineFor(text, index) {
  return text.slice(0, index).split("\n").length;
}

function compact(value) {
  return value.replace(/\s+/g, " ").trim();
}

const pageFiles = walk(path.join(root, "app")).filter((file) => file.endsWith("page.tsx"));
const componentFiles = walk(path.join(root, "components")).filter((file) => file.endsWith(".tsx"));
const tsxFiles = [...pageFiles, ...componentFiles];

for (const file of pageFiles) {
  const relative = path.relative(root, file);
  const text = fs.readFileSync(file, "utf8");
  if (/export\s+\{\s*default\s*\}\s+from\s+["']\.\./.test(text)) {
    continue;
  }
  if (!/<h1\b/.test(text) && !/level=["']h1["']/.test(text)) {
    errors.push(`${relative}: missing page-level h1 or Section level="h1"`);
  }
}

for (const file of tsxFiles) {
  const relative = path.relative(root, file);
  const text = fs.readFileSync(file, "utf8");

  const buttonRegex = /<button\b([^>]*)>([\s\S]*?)<\/button>/g;
  let buttonMatch;
  while ((buttonMatch = buttonRegex.exec(text)) !== null) {
    const attrs = buttonMatch[1];
    const body = buttonMatch[2];
    const hasAccessibleName = /aria-label=|aria-labelledby=|title=/.test(attrs) || /[A-Za-z0-9]/.test(body.replace(/<[^>]+>/g, ""));
    if (!hasAccessibleName) {
      errors.push(`${relative}:${lineFor(text, buttonMatch.index)} unnamed button`);
    }
  }

  const linkRegex = /<(?:Link|a)\b([^>]*)>([\s\S]*?)<\/(?:Link|a)>/g;
  let linkMatch;
  while ((linkMatch = linkRegex.exec(text)) !== null) {
    const attrs = linkMatch[1];
    const body = linkMatch[2];
    const hasAccessibleName = /aria-label=|aria-labelledby=|title=/.test(attrs) || /[A-Za-z0-9]/.test(body.replace(/<[^>]+>/g, ""));
    if (!hasAccessibleName) {
      errors.push(`${relative}:${lineFor(text, linkMatch.index)} unnamed link`);
    }
  }

  const imageSvgRegex = /<svg\b([^>]*)>/g;
  let svgMatch;
  while ((svgMatch = imageSvgRegex.exec(text)) !== null) {
    const attrs = svgMatch[1];
    const isImage = /role=["']img["']/.test(attrs);
    const isHidden = /aria-hidden=["']true["']/.test(attrs);
    if (isImage && !/aria-label=|aria-labelledby=/.test(attrs)) {
      errors.push(`${relative}:${lineFor(text, svgMatch.index)} image svg is missing aria-label or aria-labelledby`);
    }
    if (!isImage && !isHidden && !/lucide-|className=\{/.test(attrs)) {
      errors.push(`${relative}:${lineFor(text, svgMatch.index)} svg should be labelled as role="img" or hidden`);
    }
  }
}

const globalsCss = read("app/globals.css");
if (!globalsCss.includes(":focus-visible")) {
  errors.push("app/globals.css: missing :focus-visible styling");
}
if (!globalsCss.includes("prefers-reduced-motion: reduce")) {
  errors.push("app/globals.css: missing reduced-motion media query");
}
if (!/animation-duration:\s*0\.00?1ms|animation:\s*none/.test(globalsCss)) {
  errors.push("app/globals.css: reduced-motion block should disable or minimize animation");
}

const header = read("components/header.tsx");
[
  "aria-label={isMenuOpen ? \"Close navigation menu\" : \"Open navigation menu\"}",
  "aria-expanded={isMenuOpen}",
  "aria-controls=\"mobile-navigation\"",
  "id=\"mobile-navigation\"",
  "isMenuOpen ? \"block\" : \"hidden\"",
  "xl:hidden"
].forEach((required) => {
  if (!header.includes(required)) {
    errors.push(`components/header.tsx: missing responsive navigation contract "${required}"`);
  }
});

const wikiRenderer = read("app/wiki/[slug]/page.tsx");
[
  "md:hidden",
  "md:block",
  "mobile-cell",
  "header[cellIndex]",
  "max-w-full overflow-x-auto"
].forEach((required) => {
  if (!wikiRenderer.includes(required)) {
    errors.push(`app/wiki/[slug]/page.tsx: missing responsive table contract "${required}"`);
  }
});

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validated accessibility semantics across ${pageFiles.length} pages and ${componentFiles.length} components.`);
