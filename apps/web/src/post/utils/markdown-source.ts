import type {
  BlockNode,
  CodeBlockNode,
  MarkdownDocument,
  ParseOptions,
} from "@tanstack/markdown";
import { parseMarkdown } from "@tanstack/markdown/parser";
import { parse as parseYaml } from "yaml";
import { z } from "zod";

import { codeBlockProblems } from "@/post/utils/highlighter";
import { toSlug } from "@/post/utils/slug";

/** One Markdown source file (a Post Source or a Project Source) as read from disk. */
export interface MarkdownSourceFile {
  path: string;
  text: string;
}

/** A parsed Markdown source: its checked frontmatter, its tree, and its body text. */
interface MarkdownSource<TData> {
  data: TData;
  document: MarkdownDocument;
  /** The source text after its frontmatter, as written. */
  body: string;
}

/**
 * Only the built-in syntax profile, with the library's safe defaults: raw HTML
 * stays escaped text and the default URL policy drops script URLs (ADR-0004).
 */
const PARSE_OPTIONS = {
  frontmatter: true,
  headingIds: true,
} as const satisfies ParseOptions;

/** A Slug frozen in frontmatter must be in its URL-friendly form (ADR-0005). */
export const slugSchema = z
  .string()
  .min(1)
  .refine((slug) => toSlug(slug) === slug, {
    message: "must be lowercase words joined by single hyphens (ADR-0005)",
  });

/** Every Code Block in a block node, nested ones too. */
const codeBlocksOf = (node: BlockNode): CodeBlockNode[] => {
  switch (node.type) {
    case "code": {
      return [node];
    }
    case "list":
    case "footnotes": {
      return node.items.flatMap((item) => item.children.flatMap(codeBlocksOf));
    }
    case "blockquote":
    case "callout":
    case "component": {
      return node.children.flatMap(codeBlocksOf);
    }
    default: {
      return [];
    }
  }
};

/**
 * The source text after its frontmatter. It follows the frontmatter rule of
 * the pinned `parseMarkdown` (ADR-0004): it drops a BOM, makes all line ends
 * LF, and cuts at the first `---` line after a `---` first line.
 */
const bodyOf = (text: string) => {
  const lines = text
    .replace(/^\uFEFF/u, "")
    .replaceAll(/\r\n?/gu, "\n")
    .split("\n");
  const end = lines[0] === "---" ? lines.indexOf("---", 1) : -1;
  return lines
    .slice(end + 1)
    .join("\n")
    .replace(/^(?:[ \t]*\n)+/u, "");
};

/**
 * The Markdown export of a source: the title as a heading, the lead, and the
 * body as written. It is an export, not a view, so it is not made again from
 * the document (ADR-0004).
 */
export const markdownExportOf = (title: string, lead: string, body: string) =>
  `# ${title}\n\n${lead}\n\n${body}`;

/**
 * Parse one Markdown source and check its frontmatter with `schema`. Throws,
 * naming the file, when the frontmatter is missing or invalid or a Code Block
 * cannot render as written, so a bad source stops the build. `kind` names the
 * source in the error ("Post Source", "Project Source").
 */
export const parseMarkdownSource = <TData>(
  { path, text }: MarkdownSourceFile,
  schema: z.ZodType<TData>,
  kind: string
): MarkdownSource<TData> => {
  const document = parseMarkdown(text, PARSE_OPTIONS);
  const result = schema.safeParse(parseYaml(document.frontmatter ?? "") ?? {});
  if (!result.success) {
    throw new Error(
      `Invalid ${kind} ${path}:\n${z.prettifyError(result.error)}`
    );
  }
  const problems: string[] = [];
  for (const block of document.children.flatMap(codeBlocksOf)) {
    problems.push(...codeBlockProblems(block));
  }
  if (problems.length > 0) {
    throw new Error(
      `Invalid Code Block in ${kind} ${path}:\n${problems.map((problem) => `- ${problem}`).join("\n")}`
    );
  }
  return { data: result.data, document, body: bodyOf(text) };
};
