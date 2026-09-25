import type {
  BlockNode,
  InlineNode,
  MarkdownDocument,
} from "@tanstack/markdown";
import { z } from "zod";

import { readableCode } from "@/post/utils/highlighter";
import {
  markdownExportOf,
  parseMarkdownSource,
  slugSchema,
} from "@/post/utils/markdown-source";
import type { MarkdownSourceFile } from "@/post/utils/markdown-source";

/** One Post Source file as read from disk. */
export type PostSourceFile = MarkdownSourceFile;

export interface Post {
  slug: string;
  title: string;
  summary: string;
  /** ISO date (`YYYY-MM-DD`). */
  publishedAt: string;
  ogImageSrc: string;
  ogImageAlt: string;
  readingMinutes: number;
  document: MarkdownDocument;
  /** Post Markdown: what "Copy page" copies (ADR-0004). */
  markdown: string;
}

const WORDS_PER_MINUTE = 200;

const frontmatterSchema = z.object({
  slug: slugSchema,
  title: z.string().min(1),
  summary: z.string().min(1),
  publishedAt: z.iso.date(),
  ogImageSrc: z.string().min(1),
  ogImageAlt: z.string().min(1),
});

/** The text a reader reads in an inline node. Images and breaks have none. */
const inlineText = (node: InlineNode): string[] => {
  switch (node.type) {
    case "text":
    case "inlineCode":
    case "inlineHtml": {
      return [node.value];
    }
    case "strong":
    case "emphasis":
    case "strike":
    case "link":
    case "inlineComponent": {
      return node.children.flatMap(inlineText);
    }
    default: {
      return [];
    }
  }
};

type BlockOf<T extends BlockNode["type"]> = Extract<BlockNode, { type: T }>;

const childBlocksText = (node: { children: BlockNode[] }): string[] =>
  node.children.flatMap(blockText);

const childInlinesText = (node: { children: InlineNode[] }): string[] =>
  node.children.flatMap(inlineText);

const itemsText = (node: BlockOf<"list" | "footnotes">): string[] =>
  node.items.flatMap(childBlocksText);

/** How to read each block node type. A type not listed has no text. */
const blockReaders: {
  [T in BlockNode["type"]]?: (node: BlockOf<T>) => string[];
} = {
  heading: childInlinesText,
  paragraph: childInlinesText,
  code: (node) => [readableCode(node.value)],
  html: (node) => [node.value],
  list: itemsText,
  footnotes: itemsText,
  table: (node) =>
    [node.header, ...node.rows].flat().flatMap(childInlinesText),
  blockquote: childBlocksText,
  callout: childBlocksText,
  component: childBlocksText,
};

/** The text a reader reads in a block node, code included. */
function blockText(node: BlockNode): string[] {
  const read = blockReaders[node.type] as
    | ((block: BlockNode) => string[])
    | undefined;
  return read ? read(node) : [];
}

const readingMinutesOf = (document: MarkdownDocument) => {
  const text = document.children.flatMap(blockText);
  const words = text.join(" ").split(/\s+/u).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
};

/**
 * Parse one Post Source into a Post. Throws, naming the file, when the
 * frontmatter is missing or invalid or a Code Block cannot render as written,
 * so a bad Post Source stops the build.
 */
export const parsePostSource = (file: PostSourceFile): Post => {
  const { data, document, body } = parseMarkdownSource(
    file,
    frontmatterSchema,
    "Post Source"
  );
  return {
    ...data,
    readingMinutes: readingMinutesOf(document),
    document,
    // Post Markdown: an export, not a view (ADR-0004).
    markdown: markdownExportOf(data.title, data.summary, body),
  };
};
