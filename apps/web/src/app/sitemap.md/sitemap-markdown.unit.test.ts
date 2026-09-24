import { describe, expect, it } from "vitest";

import { sitemapMarkdown } from "./sitemap-markdown";

const input = {
  appTitle: "Portfolio",
  appUrl: "https://web.portfolio.localhost",
  pageRoutes: ["/", "/about", "/docs/getting-started"],
  posts: [
    {
      publishedAt: "2024-05-12",
      slug: "clarity-over-complexity",
      summary: "Why restrained UI systems help.",
      title: "[Synthetic] Clarity over complexity",
    },
  ],
};

describe("sitemapMarkdown", () => {
  it("lists discovery files, pages, and Posts with their Post Markdown", () => {
    expect(sitemapMarkdown(input)).toMatchInlineSnapshot(`
      "# Portfolio sitemap

      Every public page of this site. Each post is also available as plain Markdown: add \`.md\` to its URL.

      ## Discovery

      - [/sitemap.xml](https://web.portfolio.localhost/sitemap.xml) — XML sitemap for crawlers
      - [/sitemap.md](https://web.portfolio.localhost/sitemap.md) — this Markdown sitemap
      - [/rss.xml](https://web.portfolio.localhost/rss.xml) — RSS feed of every Post
      - [/robots.txt](https://web.portfolio.localhost/robots.txt) — crawler rules

      ## Pages

      - [Home](https://web.portfolio.localhost/)
      - [About](https://web.portfolio.localhost/about)
      - [Docs / Getting started](https://web.portfolio.localhost/docs/getting-started)

      ## Posts

      - [\\[Synthetic\\] Clarity over complexity](https://web.portfolio.localhost/posts/clarity-over-complexity) — Why restrained UI systems help. (2024-05-12) · [Markdown](https://web.portfolio.localhost/posts/clarity-over-complexity.md)
      "
    `);
  });

  it("says so when there are no Posts", () => {
    expect(sitemapMarkdown({ ...input, posts: [] })).toContain(
      "## Posts\n\nNo posts yet.\n"
    );
  });
});
