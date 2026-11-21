import {
  parsePostSource,
  parsePostTranslationSource,
} from "@/features/post/utils/post-source";
import type { Post, PostSourceFile } from "@/features/post/utils/post-source";
import type { I18NLocale } from "@/shared/constants/i18n";
import {
  I18N_DEFAULT_LOCALE,
  I18N_TRANSLATED_LOCALES,
  isI18NLocale,
} from "@/shared/constants/i18n";

/** `{base}.{locale}.md` is a Post Translation; `{base}.md` is English. */
const TRANSLATION_PATH = /^(?<base>.+)\.(?<locale>[a-z]{2})\.md$/u;

interface TranslationFile {
  file: PostSourceFile;
  base: string;
  locale: I18NLocale;
}

/** Split the files into English Post Sources and Post Translations. */
const partitionFiles = (files: readonly PostSourceFile[]) => {
  const english: PostSourceFile[] = [];
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
        `Unknown Locale "${locale}" in Post Translation ${file.path}`
      );
    }
    translations.push({ file, base, locale });
  }
  return { english, translations };
};

/** Parse the English Post Sources, keyed by base path. Throws on a duplicate Slug (ADR-0005). */
const parseEnglish = (files: readonly PostSourceFile[]) => {
  const pathBySlug = new Map<string, string>();
  const postByBase = new Map<string, Post>();
  for (const file of files) {
    const post = parsePostSource(file);
    const claimedBy = pathBySlug.get(post.slug);
    if (claimedBy) {
      throw new Error(
        `Duplicate Slug "${post.slug}" in ${claimedBy} and ${file.path}`
      );
    }
    pathBySlug.set(post.slug, file.path);
    postByBase.set(file.path.replace(/\.md$/u, ""), post);
  }
  return postByBase;
};

/**
 * Parse every Post Source and return the Posts in one Locale, most recent
 * first. Every Post must have a Post Translation for every Locale (ADR-0004),
 * so all files are checked whatever the Locale. Throws, naming the file, on a
 * duplicate Slug, a missing or orphan Translation, or a stale Translation.
 */
export const collectPosts = (
  files: readonly PostSourceFile[],
  locale: I18NLocale
): Post[] => {
  const { english, translations } = partitionFiles(files);
  const postByBase = parseEnglish(english);
  const translated = new Map<string, Post>();
  for (const { file, base, locale: fileLocale } of translations) {
    const post = postByBase.get(base);
    if (!post) {
      throw new Error(
        `Post Translation ${file.path} has no English Post Source ${base}.md`
      );
    }
    translated.set(
      `${base}.${fileLocale}`,
      parsePostTranslationSource(file, fileLocale, post)
    );
  }
  const translationOf = (base: string, needed: I18NLocale) => {
    const post = translated.get(`${base}.${needed}`);
    if (!post) {
      throw new Error(
        `Post Source ${base}.md has no Post Translation for Locale "${needed}" (${base}.${needed}.md)`
      );
    }
    return post;
  };
  const posts = [...postByBase].map(([base, post]) => {
    // Throws on the first missing Post Translation, whatever the Locale.
    for (const needed of I18N_TRANSLATED_LOCALES) {
      translationOf(base, needed);
    }
    return locale === I18N_DEFAULT_LOCALE ? post : translationOf(base, locale);
  });
  return posts.toSorted(
    (a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt)
  );
};

/** The Posts beside one Post in publish order, as the Post Pager shows them. */
export interface AdjacentPosts<TPost> {
  /** Published just before. */
  previous?: TPost;
  /** Published just after. */
  next?: TPost;
}

/**
 * The Posts beside one Post in publish order, for the Post Pager. `posts` is
 * the `collectPosts` order (most recent first), so the previous Post — the one
 * published just before — comes after it, and the next Post comes before it.
 */
export const adjacentPosts = <TPost extends Pick<Post, "slug">>(
  posts: readonly TPost[],
  slug: string
): AdjacentPosts<TPost> => {
  const index = posts.findIndex((post) => post.slug === slug);
  if (index === -1) {
    return {};
  }
  return { previous: posts[index + 1], next: posts[index - 1] };
};

/** The Posts of one publish year, as the posts index files them. */
export interface PostYear<TPost> {
  /** Four digits, read from the ISO date, so no time zone can move a Post. */
  year: string;
  posts: TPost[];
}

/**
 * File Posts under their publish year. `posts` is the `collectPosts` order
 * (most recent first), so the years come out newest first and each year keeps
 * that order inside it.
 */
export const postsByYear = <TPost extends Pick<Post, "publishedAt">>(
  posts: readonly TPost[]
): PostYear<TPost>[] => {
  const years: PostYear<TPost>[] = [];
  for (const post of posts) {
    const year = post.publishedAt.slice(0, 4);
    const last = years.at(-1);
    if (last?.year === year) {
      last.posts.push(post);
    } else {
      years.push({ year, posts: [post] });
    }
  }
  return years;
};
