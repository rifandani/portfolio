/** The path of a Project Detail. */
export const projectPath = (slug: string) => `/projects/${slug}` as const;

/** The URL path of a Project's Project Markdown: its Project Detail path plus `.md`. */
export const projectMarkdownPath = (slug: string) =>
  `${projectPath(slug)}.md` as const;
