import type { MarkdownDocument } from "@tanstack/markdown";
import { z } from "zod";

import type { I18NLocale } from "@/shared/constants/i18n";
import { I18N_DEFAULT_LOCALE } from "@/shared/constants/i18n";
import {
  markdownExportOf,
  parseMarkdownSource,
  slugSchema,
} from "@/utils/markdown-source";
import type { MarkdownSourceFile } from "@/utils/markdown-source";
import { assertTranslationIsCurrent } from "@/utils/markdown-translation";

/** One Project Translation: a Project in one Locale. */
export interface Project {
  locale: I18NLocale;
  slug: string;
  title: string;
  description: string;
  /** The technologies of the Project, in the order the author gives them. */
  tags: string[];
  /** The place of the Project in the list: 1 comes first. */
  order: number;
  /**
   * ISO date of the last real change to the English text. Every Project
   * Translation must be at least this recent (ADR-0004). Not shown.
   */
  updatedAt: string;
  previewSrc: string;
  previewAlt: string;
  /** Where the Project runs, when it has a live demo. */
  demoUrl?: string;
  /** The GitHub repository of the Project, when its source is public. */
  githubUrl?: string;
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
  updatedAt: z.iso.date(),
  previewSrc: z.string().min(1),
  previewAlt: z.string().min(1),
  demoUrl: z.url({ protocol: /^https$/u }).optional(),
  githubUrl: z
    .url({ protocol: /^https$/u, hostname: /^github\.com$/u })
    .optional(),
});

/**
 * The frontmatter of a Project Translation other than the English one. It
 * holds only what changes with the Locale; the English Project Source holds
 * the rest.
 */
const translationFrontmatterSchema = z.strictObject({
  title: z.string().min(1),
  description: z.string().min(1),
  previewAlt: z.string().min(1),
  /** ISO date the text last matched the English Project Source. */
  translatedAt: z.iso.date(),
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
    locale: I18N_DEFAULT_LOCALE,
    ...data,
    document,
    // Project Markdown: an export, not a view (ADR-0004).
    markdown: markdownExportOf(data.title, data.description, body),
  };
};

/**
 * Parse the Project Source of a non-English Project Translation onto its
 * English Project. Throws, naming the file, when the frontmatter is invalid
 * or the text is older than the last English update, so a stale Translation
 * stops the build (ADR-0004).
 */
export const parseProjectTranslationSource = (
  file: MarkdownSourceFile,
  locale: I18NLocale,
  english: Project
): Project => {
  const { data, document, body } = parseMarkdownSource(
    file,
    translationFrontmatterSchema,
    "Project Source"
  );
  assertTranslationIsCurrent({
    name: "Project",
    path: file.path,
    translatedAt: data.translatedAt,
    updatedAt: english.updatedAt,
  });
  return {
    ...english,
    locale,
    title: data.title,
    description: data.description,
    previewAlt: data.previewAlt,
    document,
    markdown: markdownExportOf(data.title, data.description, body),
  };
};
