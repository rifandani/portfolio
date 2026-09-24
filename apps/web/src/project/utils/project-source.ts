import type { MarkdownDocument } from "@tanstack/markdown";
import { z } from "zod";

import {
  markdownExportOf,
  parseMarkdownSource,
  slugSchema,
} from "@/post/utils/markdown-source";
import type { MarkdownSourceFile } from "@/post/utils/markdown-source";

export interface Project {
  slug: string;
  title: string;
  description: string;
  /** The technologies of the Project, in the order the author gives them. */
  tags: string[];
  /** The place of the Project in the list: 1 comes first. */
  order: number;
  previewSrc: string;
  previewAlt: string;
  document: MarkdownDocument;
  /** Project Markdown: what "Copy page" copies (ADR-0004). */
  markdown: string;
}

const frontmatterSchema = z.object({
  slug: slugSchema,
  title: z.string().min(1),
  description: z.string().min(1),
  tags: z.array(z.string().min(1)).min(1),
  order: z.int().positive(),
  previewSrc: z.string().min(1),
  previewAlt: z.string().min(1),
});

/**
 * Parse one Project Source into a Project. Throws, naming the file, when the
 * frontmatter is missing or invalid or a Code Block cannot render as written,
 * so a bad Project Source stops the build.
 */
export const parseProjectSource = (file: MarkdownSourceFile): Project => {
  const { data, document, body } = parseMarkdownSource(
    file,
    frontmatterSchema,
    "Project Source"
  );
  return {
    ...data,
    document,
    // Project Markdown: an export, not a view (ADR-0004).
    markdown: markdownExportOf(data.title, data.description, body),
  };
};
