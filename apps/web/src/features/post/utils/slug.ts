import type { I18NLocale } from "@/shared/constants/i18n";
import { I18N_DEFAULT_LOCALE } from "@/shared/constants/i18n";

/** The path of a Post Detail. */
export const postPath = (slug: string) => `/posts/${slug}` as const;

/**
 * The URL path of one Post Translation's Post Markdown: its Post Detail path
 * plus `.md`, with the Locale before `.md` when it is not English (ADR-0004).
 */
export const postMarkdownPath = (slug: string, locale: I18NLocale) =>
  locale === I18N_DEFAULT_LOCALE
    ? (`${postPath(slug)}.md` as const)
    : (`${postPath(slug)}.${locale}.md` as const);
