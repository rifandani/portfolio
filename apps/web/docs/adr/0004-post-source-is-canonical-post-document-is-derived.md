# Post Source is canonical; the Post Document is always derived

Date: 2026-09-23

## Status

Accepted.

---

A Post is one Markdown file in the repo (the Post Source), with YAML frontmatter. `@tanstack/markdown` parses each Post Source into its serializable AST (the Post Document). The root layout calls `connection()`, so pages render per request: the Post store parses the Post Sources once per request (React `cache`). The build also parses them, through `generateStaticParams` and the sitemap, so a bad Post Source stops the build. All views use the Post Document only: the Post Detail render, the heading links, and the reading time. We do **not** store the AST as JSON. `@tanstack/markdown` is pre-1.0 (0.0.x), and its docs say that the AST contract can change between releases. When the tree is always made again from the Markdown, an upgrade cannot break stored documents. The Markdown stays easy to write and to diff.

## Rules

- Pin the exact `@tanstack/markdown` version.
- Render with the React renderer in a Server Component. Give it the parsed Post Document, not the string. Do not use the HTML or Octane renderers.
- Use only the built-in syntax profile, with `headingIds` and `headingAnchors`. Do not add extensions until a Post needs one.
- Keep the safe defaults: `allowHtml` is off and the default `urlTransform` applies.
- Syntax highlighting is an external integration. One module (`src/post/utils/highlighter.ts`) gives the synchronous `highlighter` callback, and no other module knows about highlighting. The Post parser can only ask that module two questions: which problems a Code Block has, and which code a reader reads.
- That module registers only the languages that Posts use. A Code Block names a registered language or none. A Code Block that names an unregistered language stops the build, because pages render per request and a render error would be a 500.
- The module has no server-only imports, so the server and the browser can share the same highlighter. `PostDocument` is a Server Component, so no highlighter code goes to the browser now.
- Code Blocks use the fence metadata of `@tanstack/highlight`: `title="…"`, `{2-4}`, `ins`, `del`, `focus`, `error`, `warning`, `lineNumbers`, and the `[!code ++]` / `[!code --]` comments. We add one key of our own: `mark="term"` marks each exact match of the term as a character range. A `mark` term that is not in the code stops the build.
- Colors come from `th-*` classes and CSS variables in `post-document.css`. The markup is the same in all themes; the `.dark` class changes only the variables.
- Post Markdown (the text of "Copy page") is an export, not a view. It is the title, the summary, and the Post Source text without its frontmatter, as written. Do not make it again from the Post Document, and do not remove fence metadata or `[!code …]` comments from it.
- Post Markdown also has its own URL: the Post Detail URL plus `.md` (`/posts/{slug}.md`), served as `text/markdown`. A rewrite sends that URL to a route handler, because the `[slug]` page segment would otherwise take `{slug}.md` as a Slug. An Assistant Handoff prompt contains this absolute URL, not the Post Markdown text: a long Post in a query string goes over the URL limits of browsers and Assistants.
- The parser returns frontmatter as a raw string. We parse it as YAML and check it with a zod schema. A bad Post Source stops the build.

## Considered Options

- **Store the AST as JSON as the durable record** — rejected. The AST contract is pre-1.0, and the Markdown already holds all the data.
- **Keep Posts in the TS array with a `body` string** — rejected. It is hard to write long text in a TS string literal.
- **Streaming profile (`streamingMarkdownExtension`)** — not used. No surface shows accumulated AI responses. If one comes, it re-parses the full accumulated string on each update and keeps no parser state between updates. It must not change how Posts are parsed.

## Consequences

- These are not supported, so authors must not use them: bare-URL autolinks, setext headings, and indented code blocks.
- A Post has one language. The Locale changes only the UI text around it (dates, reading time).
