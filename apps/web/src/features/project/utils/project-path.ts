import type { I18NLocale } from "@/shared/constants/i18n";
import { markdownPathOf } from "@/utils/markdown-translation";

/** The path of a Project Detail. */
export const projectPath = (slug: string) => `/projects/${slug}` as const;

/** The URL path of one Project Translation's Project Markdown (ADR-0004). */
export const projectMarkdownPath = (slug: string, locale: I18NLocale) =>
  markdownPathOf(projectPath(slug), locale);
