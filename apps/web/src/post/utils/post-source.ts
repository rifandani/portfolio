import type {
  BlockNode,
  InlineNode,
  MarkdownDocument,
  ParseOptions,
} from "@tanstack/markdown";
import { parseMarkdown } from "@tanstack/markdown/parser";
import { parse as parseYaml } from "yaml";
import { z } from "zod";

import { toSlug } from "@/post/utils/slug";

/** One Post Source file as read from disk. */
export interface PostSourceFile {
  path: string;
  text: string;
}

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
}

/**
 * Only the built-in syntax profile, with the library's safe defaults: raw HTML
 * stays escaped text and the default URL policy drops script URLs (ADR-0004).
 */
const PARSE_OPTIONS = {
  frontmatter: true,
  headingIds: true,
} as const satisfies ParseOptions;

const WORDS_PER_MINUTE = 200;

const frontmatterSchema = z.object({
  slug: z
    .string()
    .min(1)
    .refine((slug) => toSlug(slug) === slug, {
      message: "must be lowercase words joined by single hyphens (ADR-0005)",
    }),
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

/** The text a reader reads in a block node, code included. */
const blockText = (node: BlockNode): string[] => {
  switch (node.type) {
    case "heading":
    case "paragraph": {
      return node.children.flatMap(inlineText);
    }
    case "code":
    case "html": {
      return [node.value];
    }
    case "list":
    case "footnotes": {
      return node.items.flatMap((item) => item.children.flatMap(blockText));
    }
    case "table": {
      return [node.header, ...node.rows]
        .flat()
        .flatMap((cell) => cell.children.flatMap(inlineText));
    }
    case "blockquote":
    case "callout":
    case "component": {
      return node.children.flatMap(blockText);
    }
    default: {
      return [];
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
 * frontmatter is missing or invalid, so a bad Post Source stops the build.
 */
export const parsePostSource = ({ path, text }: PostSourceFile): Post => {
  const document = parseMarkdown(text, PARSE_OPTIONS);
  const result = frontmatterSchema.safeParse(
    parseYaml(document.frontmatter ?? "") ?? {}
  );
  if (!result.success) {
    throw new Error(
      `Invalid Post Source ${path}:\n${z.prettifyError(result.error)}`
    );
  }
  return {
    ...result.data,
    readingMinutes: readingMinutesOf(document),
    document,
  };
};
