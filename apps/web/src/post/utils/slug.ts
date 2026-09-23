const COMBINING_MARKS = /\p{M}/gu;
const NON_ALPHANUMERIC_RUN = /[^a-z0-9]+/gu;
const EDGE_HYPHENS = /^-+|-+$/gu;

/**
 * The URL-friendly form of a title (ADR-0005). A Post's Slug is made with this
 * one time and then frozen in its frontmatter, so a valid Slug is a value this
 * returns unchanged.
 */
export const toSlug = (title: string) =>
  title
    .normalize("NFKD")
    .replace(COMBINING_MARKS, "")
    .toLowerCase()
    .replace(NON_ALPHANUMERIC_RUN, "-")
    .replace(EDGE_HYPHENS, "");

/** The path of a Post Detail. */
export const postPath = (slug: string) => `/posts/${slug}` as const;

/** The URL path of a Post's Post Markdown: its Post Detail path plus `.md`. */
export const postMarkdownPath = (slug: string) =>
  `${postPath(slug)}.md` as const;
