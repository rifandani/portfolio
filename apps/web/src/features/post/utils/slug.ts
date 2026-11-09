/** The path of a Post Detail. */
export const postPath = (slug: string) => `/posts/${slug}` as const;

/** The URL path of a Post's Post Markdown: its Post Detail path plus `.md`. */
export const postMarkdownPath = (slug: string) =>
  `${postPath(slug)}.md` as const;
