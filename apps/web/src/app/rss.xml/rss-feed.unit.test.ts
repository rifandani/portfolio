import { describe, expect, it } from "vitest";

import type { RssFeedInput } from "./rss-feed";
import { buildRssFeed } from "./rss-feed";

const input: RssFeedInput = {
  appUrl: "https://web.portfolio.localhost",
  title: "Jane Doe · Posts",
  description: "Notes on building for the web.",
  author: "Jane Doe",
  copyrightYear: 2026,
  posts: [
    {
      publishedAt: "2024-06-01",
      slug: "types-and-tags",
      summary: 'Why <T> & "tags" matter.',
      title: "Types & tags",
    },
    {
      publishedAt: "2024-05-12",
      slug: "clarity-over-complexity",
      summary: "Why restrained UI systems help.",
      title: "[Synthetic] Clarity over complexity",
    },
  ],
};

describe("buildRssFeed", () => {
  it("writes an RSS 2.0 channel with one item per Post", () => {
    expect(buildRssFeed(input)).toMatchInlineSnapshot(`
      "<?xml version="1.0" encoding="utf-8"?>
      <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
        <channel>
          <title>Jane Doe · Posts</title>
          <link>https://web.portfolio.localhost/</link>
          <description>Notes on building for the web.</description>
          <lastBuildDate>Sat, 01 Jun 2024 00:00:00 GMT</lastBuildDate>
          <docs>https://www.rssboard.org/rss-specification</docs>
          <language>en</language>
          <copyright>Copyright © 2026 Jane Doe</copyright>
          <atom:link href="https://web.portfolio.localhost/rss.xml" rel="self" type="application/rss+xml"/>
          <item>
            <title>Types &amp; tags</title>
            <link>https://web.portfolio.localhost/posts/types-and-tags</link>
            <guid isPermaLink="true">https://web.portfolio.localhost/posts/types-and-tags</guid>
            <pubDate>Sat, 01 Jun 2024 00:00:00 GMT</pubDate>
            <description>Why &lt;T&gt; &amp; &quot;tags&quot; matter.</description>
          </item>
          <item>
            <title>[Synthetic] Clarity over complexity</title>
            <link>https://web.portfolio.localhost/posts/clarity-over-complexity</link>
            <guid isPermaLink="true">https://web.portfolio.localhost/posts/clarity-over-complexity</guid>
            <pubDate>Sun, 12 May 2024 00:00:00 GMT</pubDate>
            <description>Why restrained UI systems help.</description>
          </item>
        </channel>
      </rss>
      "
    `);
  });

  it("has no lastBuildDate and no items when there are no Posts", () => {
    const feed = buildRssFeed({ ...input, posts: [] });

    expect(feed).not.toContain("<lastBuildDate>");
    expect(feed).not.toContain("<item>");
    expect(feed).toContain("</channel>\n</rss>\n");
  });
});
