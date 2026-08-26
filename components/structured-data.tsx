import { canonicalDefinition, contentRegistry, operationalIntelligenceFramework, resume, site } from "@/content/site";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://seri-ai.vercel.app";

function absoluteUrl(path: string) {
  if (path.startsWith("http")) return path;
  return `${siteUrl}${path}`;
}

function safeJson(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export function StructuredData() {
  const referenceAssets = contentRegistry
    .filter((asset) => ["operational-intelligence-canonical-doctrine", "operational-intelligence-reference-architecture", "operational-intelligence-publication-pack", "operational-intelligence-evidence-pack"].includes(asset.slug))
    .map((asset) => ({
      "@type": "CreativeWork",
      "@id": absoluteUrl(asset.route),
      "name": asset.title,
      "description": asset.summary,
      "url": absoluteUrl(asset.route),
      "dateCreated": asset.createdAt,
      "dateModified": asset.updatedAt,
      "inLanguage": "en-US",
      "isAccessibleForFree": true,
      "author": { "@id": `${siteUrl}/#ravikanth-seri` },
      "about": { "@id": `${siteUrl}/#operational-intelligence` }
    }));

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        "name": site.owner,
        "url": siteUrl,
        "description": site.description,
        "inLanguage": "en-US",
        "author": { "@id": `${siteUrl}/#ravikanth-seri` },
        "publisher": { "@id": `${siteUrl}/#ravikanth-seri` },
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${siteUrl}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "Person",
        "@id": `${siteUrl}/#ravikanth-seri`,
        "name": site.owner,
        "url": siteUrl,
        "jobTitle": resume.headline,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Charlotte",
          "addressRegion": "NC",
          "addressCountry": "US"
        },
        "sameAs": [site.links.linkedin, site.links.github],
        "knowsAbout": [
          "Operational Intelligence",
          "Agentic SRE",
          "AI-native incident investigation",
          "Transaction Intelligence",
          "Enterprise observability",
          "AI evaluation",
          "Knowledge graphs",
          "Operator control planes"
        ]
      },
      {
        "@type": "DefinedTermSet",
        "@id": `${siteUrl}/#operational-intelligence`,
        "name": "Operational Intelligence",
        "description": canonicalDefinition.short,
        "url": absoluteUrl("/wiki/operational-intelligence-canonical-doctrine"),
        "hasDefinedTerm": operationalIntelligenceFramework.layers.map((layer) => ({
          "@type": "DefinedTerm",
          "name": layer.name,
          "description": layer.coreResponsibility,
          "inDefinedTermSet": `${siteUrl}/#operational-intelligence`
        }))
      },
      ...referenceAssets
    ]
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJson(graph) }} />;
}
