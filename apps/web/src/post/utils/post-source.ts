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

/** The text in a block node that holds other nodes; `read` reads a child block. */
const containerText = (
  node: BlockNode,
  read: (block: BlockNode) => string[]
): string[] => {
  switch (node.type) {
    case "list":
    case "footnotes": {
      return node.items.flatMap((item) => item.children.flatMap(read));
    }
    case "table": {
      return [node.header, ...node.rows]
        .flat()
        .flatMap((cell) => cell.children.flatMap(inlineText));
    }
    case "blockquote":
    case "callout":
    case "component": {
      return node.children.flatMap(read);
    }
    default: {
      return [];
    }
  }
};

/** The text a reader reads in a block node, code included. */
const blockText = (node: BlockNode): string[] => {
  switch (node.type) {
    case "heading":
    case "paragraph": {
      return node.children.flatMap(inlineText);
    }
    case "code": {
      return [readableCode(node.value)];
    }
    case "html": {
      return [node.value];
    }
    default: {
      return containerText(node, blockText);
    }
  }
};

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
