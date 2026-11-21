import type { I18NLocale } from "@/shared/constants/i18n";
import { markdownPathOf } from "@/utils/markdown-translation";

/** The path of a Post Detail. */
export const postPath = (slug: string) => `/posts/${slug}` as const;

/** The URL path of one Post Translation's Post Markdown (ADR-0004). */
export const postMarkdownPath = (slug: string, locale: I18NLocale) =>
  markdownPathOf(postPath(slug), locale);
