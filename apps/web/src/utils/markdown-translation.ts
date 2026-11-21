import type { I18NLocale } from "@/shared/constants/i18n";
import {
  I18N_DEFAULT_LOCALE,
  I18N_TRANSLATED_LOCALES,
  isI18NLocale,
} from "@/shared/constants/i18n";
import type { MarkdownSourceFile } from "@/utils/markdown-source";

/** `{base}.{locale}.md` is a Translation; `{base}.md` is English. */
const TRANSLATION_PATH = /^(?<base>.+)\.(?<locale>[a-z]{2})\.md$/u;

interface TranslationFile {
  file: MarkdownSourceFile;
  base: string;
  locale: I18NLocale;
}

/** The domain name of a translated Markdown source, for error messages. */
type TranslatedKindName = "Post" | "Project";

/** How one kind of translated Markdown source (Post, Project) is parsed. */
interface TranslatedKind<TItem> {
  /** "Post" gives "Post Source" and "Post Translation" in error messages. */
  name: TranslatedKindName;
  /** Parse one English source. */
  parse: (file: MarkdownSourceFile) => TItem;
  /** Parse one non-English source onto its English item. */
  parseTranslation: (
    file: MarkdownSourceFile,
    locale: I18NLocale,
    english: TItem
  ) => TItem;
}

/** Split the files into English sources and Translations. */
const partitionFiles = (
  files: readonly MarkdownSourceFile[],
  name: TranslatedKindName
) => {
  const english: MarkdownSourceFile[] = [];
  const translations: TranslationFile[] = [];
  for (const file of files) {
    const groups = TRANSLATION_PATH.exec(file.path)?.groups;
    if (!groups) {
      english.push(file);
      continue;
    }
    const { base = "", locale = "" } = groups;
    if (!isI18NLocale(locale) || locale === I18N_DEFAULT_LOCALE) {
      throw new Error(
        `Unknown Locale "${locale}" in ${name} Translation ${file.path}`
      );
    }
    translations.push({ file, base, locale });
  }
  return { english, translations };
};

/** Parse the English sources, keyed by base path. Throws on a duplicate Slug (ADR-0005). */
const parseEnglish = <TItem extends { slug: string }>(
  files: readonly MarkdownSourceFile[],
  parse: (file: MarkdownSourceFile) => TItem
) => {
  const pathBySlug = new Map<string, string>();
  const itemByBase = new Map<string, { item: TItem; path: string }>();
  for (const file of files) {
    const item = parse(file);
    const claimedBy = pathBySlug.get(item.slug);
    if (claimedBy) {
      throw new Error(
        `Duplicate Slug "${item.slug}" in ${claimedBy} and ${file.path}`
      );
    }
    pathBySlug.set(item.slug, file.path);
    itemByBase.set(file.path.replace(/\.md$/u, ""), { item, path: file.path });
  }
  return itemByBase;
};

/** One English source with its Translation in every Locale. */
export interface TranslatedSource<TItem> {
  /** The path of the English source. */
  path: string;
  /** The source in one Locale. */
  inLocale: (locale: I18NLocale) => TItem;
}

/**
 * Parse every source of one kind and pair each English source with its
 * Translations (ADR-0004). Every English source must have a Translation for
 * every Locale, so all files are checked whatever Locale the reader wants.
 * Throws, naming the file, on a duplicate Slug, an unknown Locale, a missing
 * or orphan Translation, or any error of `parse` and `parseTranslation`.
 */
export const collectTranslatedSources = <TItem extends { slug: string }>(
  files: readonly MarkdownSourceFile[],
  { name, parse, parseTranslation }: TranslatedKind<TItem>
): TranslatedSource<TItem>[] => {
  const { english, translations } = partitionFiles(files, name);
  const itemByBase = parseEnglish(english, parse);
  const translated = new Map<string, TItem>();
  for (const { file, base, locale } of translations) {
    const source = itemByBase.get(base);
    if (!source) {
      throw new Error(
        `${name} Translation ${file.path} has no English ${name} Source ${base}.md`
      );
    }
    translated.set(
      `${base}.${locale}`,
      parseTranslation(file, locale, source.item)
    );
  }
  const translationOf = (base: string, locale: I18NLocale) => {
    const translation = translated.get(`${base}.${locale}`);
    if (!translation) {
      throw new Error(
        `${name} Source ${base}.md has no ${name} Translation for Locale "${locale}" (${base}.${locale}.md)`
      );
    }
    return translation;
  };
  return [...itemByBase].map(([base, { item, path }]) => {
    // Throws on the first missing Translation, whatever the Locale.
    for (const locale of I18N_TRANSLATED_LOCALES) {
      translationOf(base, locale);
    }
    return {
      path,
      inLocale: (locale) =>
        locale === I18N_DEFAULT_LOCALE ? item : translationOf(base, locale),
    };
  });
};

/**
 * Throws when a Translation is older than the last English update, so a stale
 * Translation stops the build (ADR-0004).
 */
export const assertTranslationIsCurrent = ({
  name,
  path,
  translatedAt,
  updatedAt,
}: {
  name: TranslatedKindName;
  path: string;
  translatedAt: string;
  updatedAt: string;
}) => {
  // ISO dates sort as text, so a string compare is a date compare.
  if (translatedAt < updatedAt) {
    throw new Error(
      `Stale ${name} Translation ${path}: translatedAt ${translatedAt} is before the English updatedAt ${updatedAt}`
    );
  }
};

/**
 * The URL path of one Translation's Markdown export: its detail path plus
 * `.md`, with the Locale before `.md` when it is not English (ADR-0004).
 */
export const markdownPathOf = <TPath extends string>(
  detailPath: TPath,
  locale: I18NLocale
) =>
  locale === I18N_DEFAULT_LOCALE
    ? (`${detailPath}.md` as const)
    : (`${detailPath}.${locale}.md` as const);
