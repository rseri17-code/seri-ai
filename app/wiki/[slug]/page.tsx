import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { Card } from "@/components/card";
import { ReadingProgress } from "@/components/reading-tools";
import { ReferenceDiagramGallery } from "@/components/reference-diagram-gallery";
import { getPublishedWikiNotes } from "@/lib/content";
import { buildPublishingIndex, getRelatedAssets } from "@/lib/publishing";

export function generateStaticParams() {
  return getPublishedWikiNotes().map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const note = getPublishedWikiNotes().find((item) => item.slug === slug);
  return {
    title: note ? `${note.title} | seri.ai Wiki` : "Wiki | seri.ai",
    description: note?.description
  };
}

function plainText(markdown: string) {
  return markdown
    .replace(/^#+\s+/gm, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/https?:\/\/\S+/g, "")
    .replace(/^-\s+/gm, "")
    .trim();
}

function inlineMarkdown(text: string) {
  const tokens = text.match(/\[[^\]]+\]\([^)]+\)|https?:\/\/\S+|[^[]+?(?=\[[^\]]+\]\([^)]+\)|https?:\/\/\S+|$)/g) ?? [text];

  return tokens.map((token, index): ReactNode => {
    const markdownLink = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (markdownLink) {
      const [, label, href] = markdownLink;
      if (href.startsWith("/")) {
        return (
          <Link key={`${href}-${index}`} href={href} className="font-medium text-mint underline decoration-mint/30 underline-offset-4 hover:text-white">
            {label}
          </Link>
        );
      }
      return (
        <a key={`${href}-${index}`} href={href} className="font-medium text-mint underline decoration-mint/30 underline-offset-4 hover:text-white" rel="noreferrer" target="_blank">
          {label}
        </a>
      );
    }

    if (/^https?:\/\//.test(token)) {
      return (
        <a key={`${token}-${index}`} href={token} className="font-medium text-mint underline decoration-mint/30 underline-offset-4 hover:text-white" rel="noreferrer" target="_blank">
          {token}
        </a>
      );
    }

    return token;
  });
}

type MarkdownBlock = {
  kind: "markdown" | "code";
  content: string;
  language?: string;
};

function headingText(block: MarkdownBlock) {
  if (block.kind !== "markdown") return null;
  const match = block.content.match(/^(#{1,3})\s+(.+)$/);
  return match ? plainText(match[2]).slice(0, 84) : null;
}

function markdownBlocks(markdown: string): MarkdownBlock[] {
  const blocks: MarkdownBlock[] = [];
  const lines = markdown.split("\n");
  let current: string[] = [];
  let code: string[] = [];
  let language = "";
  let inCode = false;

  for (const line of lines) {
    const fence = line.match(/^```(\w+)?\s*$/);
    if (fence) {
      if (inCode) {
        blocks.push({ kind: "code", language, content: code.join("\n").trim() });
        code = [];
        language = "";
        inCode = false;
      } else {
        if (current.join("\n").trim()) {
          blocks.push({ kind: "markdown", content: current.join("\n").trim() });
          current = [];
        }
        language = fence[1] ?? "text";
        inCode = true;
      }
      continue;
    }

    if (inCode) {
      code.push(line);
      continue;
    }

    if (!line.trim()) {
      if (current.join("\n").trim()) {
        blocks.push({ kind: "markdown", content: current.join("\n").trim() });
        current = [];
      }
      continue;
    }

    current.push(line);
  }

  if (code.join("\n").trim()) {
    blocks.push({ kind: "code", language, content: code.join("\n").trim() });
  }

  if (current.join("\n").trim()) {
    blocks.push({ kind: "markdown", content: current.join("\n").trim() });
  }

  return blocks;
}

function isMarkdownTable(block: string) {
  const lines = block.split("\n").map((line) => line.trim()).filter(Boolean);
  return lines.length >= 2 && lines.every((line) => line.startsWith("|") && line.endsWith("|")) && /^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?$/.test(lines[1]);
}

function parseTableRow(row: string) {
  return row
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function renderTable(block: string, id: string) {
  const rows = block.split("\n").map((line) => line.trim()).filter(Boolean);
  const header = parseTableRow(rows[0]);
  const body = rows.slice(2).map(parseTableRow);

  return (
    <div id={id} key={id} className="rounded-lg border border-white/10 bg-black/20">
      <div className="space-y-3 p-3 md:hidden">
        {body.map((row, rowIndex) => (
          <div key={`${id}-card-${rowIndex}`} className="rounded border border-white/10 bg-white/[0.035] p-4">
            {row.map((cell, cellIndex) => (
              <div key={`${id}-mobile-cell-${rowIndex}-${cellIndex}`} className="border-b border-white/10 py-3 first:pt-0 last:border-0 last:pb-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">{header[cellIndex] ?? `Column ${cellIndex + 1}`}</p>
                <div className="mt-1 text-sm leading-6 text-slate-200">{inlineMarkdown(cell)}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="hidden max-w-full overflow-x-auto md:block">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-white/[0.04] text-xs uppercase text-slate-400">
            <tr>
              {header.map((cell) => (
                <th key={cell} scope="col" className="border-b border-white/10 px-4 py-3 font-semibold">
                  {inlineMarkdown(cell)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {body.map((row, rowIndex) => (
              <tr key={`${id}-row-${rowIndex}`} className="border-b border-white/10 last:border-0">
                {row.map((cell, cellIndex) => (
                  <td key={`${id}-cell-${rowIndex}-${cellIndex}`} className="px-4 py-3 align-top text-slate-200">
                    {inlineMarkdown(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function renderCodeBlock(block: MarkdownBlock, index: number) {
  const id = `section-${index + 1}`;
  const language = block.language ?? "text";
  const isDiagram = language === "mermaid";

  return (
    <div id={id} key={id} className="rounded-lg border border-white/10 bg-black/30 p-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-mint">{isDiagram ? "Diagram source" : language}</p>
        {isDiagram ? <p className="text-xs text-slate-500">Accessible Mermaid source for review and export</p> : null}
      </div>
      <pre className="overflow-x-auto rounded border border-white/10 bg-black/40 p-4 text-xs leading-6 text-slate-200">
        <code>{block.content}</code>
      </pre>
    </div>
  );
}

function renderMarkdownBlock(block: MarkdownBlock, index: number) {
  const id = `section-${index + 1}`;
  const content = block.content;

  if (block.kind === "code") {
    return renderCodeBlock(block, index);
  }

  if (content.startsWith("### ")) {
    return (
      <h3 id={id} key={id} className="pt-3 text-xl font-semibold text-white">
        {inlineMarkdown(content.replace(/^###\s+/, ""))}
      </h3>
    );
  }

  if (content.startsWith("## ")) {
    return (
      <h2 id={id} key={id} className="pt-4 text-2xl font-semibold text-white">
        {inlineMarkdown(content.replace(/^##\s+/, ""))}
      </h2>
    );
  }

  if (content.startsWith("# ")) {
    return (
      <h2 id={id} key={id} className="pt-4 text-2xl font-semibold text-white">
        {inlineMarkdown(content.replace(/^#\s+/, ""))}
      </h2>
    );
  }

  if (isMarkdownTable(content)) {
    return renderTable(content, id);
  }

  if (content.startsWith("> ")) {
    return (
      <blockquote id={id} key={id} className="border-l-2 border-mint pl-5 text-lg leading-8 text-slate-200">
        {inlineMarkdown(content.replace(/^>\s+/gm, ""))}
      </blockquote>
    );
  }

  if (content.split("\n").every((line) => line.startsWith("- "))) {
    return (
      <ul id={id} key={id} className="space-y-3 pl-5">
        {content.split("\n").map((line) => (
          <li key={line} className="list-disc text-lg leading-8 text-slate-200">
            {inlineMarkdown(line.replace(/^-\s+/, ""))}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <p id={id} key={id}>
      {inlineMarkdown(content.replace(/^#+\s+/gm, ""))}
    </p>
  );
}

function SidebarCards({
  askQuestions,
  toc
}: {
  askQuestions: string[];
  toc: Array<{ id: string; title: string }>;
}) {
  return (
    <div className="space-y-4">
      <Card className="p-4">
        <h2 className="text-sm font-semibold uppercase text-slate-500">Contents</h2>
        <div className="mt-3 space-y-2">
          {toc.map((item) => (
            <a key={item.id} href={`#${item.id}`} className="block text-sm leading-5 text-slate-300 hover:text-mint">
              {item.title}
            </a>
          ))}
        </div>
      </Card>
      {askQuestions.length ? (
        <Card className="p-4">
          <h2 className="text-sm font-semibold uppercase text-slate-500">Ask questions</h2>
          <div className="mt-3 space-y-2">
            {askQuestions.map((question) => (
              <Link key={question} href={`/ask?prompt=${encodeURIComponent(question)}`} className="block text-sm leading-5 text-slate-300 hover:text-mint">
                {question}
              </Link>
            ))}
          </div>
        </Card>
      ) : null}
    </div>
  );
}

export default async function WikiNotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const notes = getPublishedWikiNotes();
  const note = notes.find((item) => item.slug === slug);

  if (!note) {
    notFound();
  }
  const asset = buildPublishingIndex().find((item) => item.url === note.url);
  const relatedAssets = asset ? getRelatedAssets(asset, 4) : [];
  const blocks = markdownBlocks(note.body);
  const headingToc = blocks
    .map((block, index) => {
      const title = headingText(block);
      return title ? { id: `section-${index + 1}`, title } : null;
    })
    .filter((item): item is { id: string; title: string } => Boolean(item));
  const fallbackToc = blocks
    .filter((block) => block.kind === "markdown")
    .map((block, index) => ({ id: `section-${index + 1}`, title: plainText(block.content).split(".")[0].slice(0, 84) }))
    .slice(0, 6);
  const toc = (headingToc.length ? headingToc : fallbackToc).slice(0, 10);
  const askQuestions = asset?.askQuestions ?? [];

  return (
    <>
    <ReadingProgress />
    <article className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid min-w-0 gap-10 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="min-w-0">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-mint">{note.category}</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-6xl">{note.title}</h1>
          <p className="mt-5 text-xl leading-8 text-slate-300">{note.description}</p>
          <div className="mt-5 flex flex-wrap gap-2 text-xs text-slate-400">
            <span>Created {note.createdAt}</span>
            <span>Updated {note.updatedAt}</span>
            <span>{note.readingTime}</span>
            <span>{asset?.author ?? "Ravikanth Seri"}</span>
          </div>
          <div className="mt-8 lg:hidden">
            <SidebarCards askQuestions={askQuestions} toc={toc} />
          </div>
          <div className="mt-10 min-w-0 space-y-6 break-words text-lg leading-8 text-slate-200">
            {blocks.map((block, index) => renderMarkdownBlock(block, index))}
          </div>
        </div>
        <aside className="hidden space-y-4 lg:sticky lg:top-24 lg:block lg:h-fit">
          <SidebarCards askQuestions={askQuestions} toc={toc} />
        </aside>
      </div>
      {note.related.length ? (
        <Card className="mt-10">
          <h2 className="text-xl font-semibold text-white">Related notes</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {note.related.map((relatedSlug) => {
              const related = notes.find((item) => item.slug === relatedSlug);
              return related ? (
                <Link key={relatedSlug} href={related.url} className="rounded border border-white/10 px-3 py-2 text-sm text-slate-200 hover:border-mint/40">
                  {related.title}
                </Link>
              ) : null;
            })}
          </div>
        </Card>
      ) : null}
      {note.slug === "operational-intelligence-publication-pack" ? <ReferenceDiagramGallery /> : null}
      {asset ? (
        <Card className="mt-6">
          <h2 className="text-xl font-semibold text-white">Version history</h2>
          <div className="mt-4 space-y-2">
            {asset.versionHistory.map((entry) => (
              <p key={`${entry.version}-${entry.date}`} className="text-sm leading-6 text-slate-300">
                <span className="font-mono text-mint">{entry.version}</span> · {entry.date} · {entry.note}
              </p>
            ))}
          </div>
        </Card>
      ) : null}
      {relatedAssets.length ? (
        <Card className="mt-6">
          <h2 className="text-xl font-semibold text-white">Related reading</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {relatedAssets.map((item) => (
              <Link key={item.id} href={item.url} className="rounded border border-white/10 bg-black/20 p-3 hover:border-mint/40">
                <p className="text-sm font-semibold text-white">{item.title}</p>
                <p className="mt-1 text-xs leading-5 text-slate-400">{item.description}</p>
              </Link>
            ))}
          </div>
        </Card>
      ) : null}
    </article>
    </>
  );
}
