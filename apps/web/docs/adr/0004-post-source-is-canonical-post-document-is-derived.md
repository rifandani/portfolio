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
- Syntax highlighting is an external integration. One module gives the synchronous `highlighter` callback, and no other module knows about highlighting.
- Post Markdown (the text of "Copy page") is an export, not a view. It is the title, the summary, and the Post Source text without its frontmatter, as written. Do not make it again from the Post Document, and do not remove fence metadata or `[!code …]` comments from it.
- The parser returns frontmatter as a raw string. We parse it as YAML and check it with a zod schema. A bad Post Source stops the build.

## Considered Options

- **Store the AST as JSON as the durable record** — rejected. The AST contract is pre-1.0, and the Markdown already holds all the data.
- **Keep Posts in the TS array with a `body` string** — rejected. It is hard to write long text in a TS string literal.
- **Streaming profile (`streamingMarkdownExtension`)** — not used. No surface shows accumulated AI responses. If one comes, it re-parses the full accumulated string on each update and keeps no parser state between updates. It must not change how Posts are parsed.

## Consequences

- These are not supported, so authors must not use them: bare-URL autolinks, setext headings, and indented code blocks.
- A Post has one language. The Locale changes only the UI text around it (dates, reading time).
