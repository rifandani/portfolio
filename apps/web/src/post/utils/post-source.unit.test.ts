import { describe, expect, it } from "vitest";

import { parsePostSource } from "./post-source";

const FRONTMATTER = `---
slug: clarity-over-complexity
title: "Clarity: over complexity"
summary: Why restrained UI systems help people scan faster.
publishedAt: 2024-05-12
ogImageSrc: /placeholders/post-og-1.svg
ogImageAlt: OG art for Clarity over complexity
---`;

const source = (text: string) => ({ path: "clarity.md", text });

describe("parsePostSource", () => {
  it("reads the Post metadata from the frontmatter", () => {
    const {
      document: _,
      markdown: __,
      ...post
    } = parsePostSource(source(`${FRONTMATTER}\n\nShort text.\n`));

    expect(post).toEqual({
      slug: "clarity-over-complexity",
      title: "Clarity: over complexity",
      summary: "Why restrained UI systems help people scan faster.",
      publishedAt: "2024-05-12",
      ogImageSrc: "/placeholders/post-og-1.svg",
      ogImageAlt: "OG art for Clarity over complexity",
      readingMinutes: 1,
    });
  });

  it("parses the Markdown text into the Post Document", () => {
    const { document } = parsePostSource(
      source(`${FRONTMATTER}\n\n## First steps\n\nHello.\n`)
    );

    expect(document.children).toEqual([
      {
        type: "heading",
        depth: 2,
        id: "first-steps",
        children: [{ type: "text", value: "First steps" }],
      },
      { type: "paragraph", children: [{ type: "text", value: "Hello." }] },
    ]);
  });

  it("makes the Post Markdown from the title, the summary, and the text as written", () => {
    const text = [
      "## First steps",
      "",
      '```ts title="a.ts" {1}',
      "a // [!code ++]",
      "```",
      "",
    ].join("\n");

    const { markdown } = parsePostSource(source(`${FRONTMATTER}\n\n${text}`));

    expect(markdown).toBe(
      [
        "# Clarity: over complexity",
        "",
        "Why restrained UI systems help people scan faster.",
        "",
        "## First steps",
        "",
        '```ts title="a.ts" {1}',
        "a // [!code ++]",
        "```",
        "",
      ].join("\n")
    );
  });

  it("removes the frontmatter as the parser finds it, with a BOM and CRLF line ends", () => {
    const text = `\uFEFF${FRONTMATTER}\n\nHello.\n`.replaceAll("\n", "\r\n");

    const { markdown } = parsePostSource(source(text));

    expect(markdown).toBe(
      "# Clarity: over complexity\n\nWhy restrained UI systems help people scan faster.\n\nHello.\n"
    );
  });

  it("counts reading time from every word in the Post Document, code too", () => {
    const prose = Array.from({ length: 300 }, () => "word").join(" ");
    const code = Array.from({ length: 101 }, () => "token").join(" ");

    const post = parsePostSource(
      source(`${FRONTMATTER}\n\n${prose}\n\n\`\`\`ts\n${code}\n\`\`\`\n`)
    );

    // 401 words at 200 words a minute
    expect(post.readingMinutes).toBe(3);
  });

  it("counts the words in every kind of block and inline text", () => {
    // One or more words in each construct: 15 in total.
    const constructs = [
      "## heading",
      "**strong** *emphasis* ~~strike~~ [link](/x) `code` ![alt](/i.png)",
      "- item\n- [x] task",
      "> quote",
      "| head |\n| ---- |\n| cell |",
      "Noted[^1]\n\n[^1]: footnote",
      "```ts\nsnippet\n```",
      "***",
      "<div>html</div>",
    ].join("\n\n");
    const padding = Array.from({ length: 186 }, () => "word").join(" ");

    const post = parsePostSource(
      source(`${FRONTMATTER}\n\n${padding}\n\n${constructs}\n`)
    );

    // 201 words: one more minute than 200, so a missed construct shows here.
    expect(post.readingMinutes).toBe(2);
  });

  it("counts the words in a callout", () => {
    const padding = Array.from({ length: 199 }, () => "word").join(" ");

    const post = parsePostSource(
      source(`${FRONTMATTER}\n\n${padding}\n\n> [!NOTE]\n> callout\n`)
    );

    // 200 words plus the callout word: a missed callout shows as 1 minute.
    expect(post.readingMinutes).toBe(2);
  });

  it("does not count diff notes in code as words", () => {
    const prose = Array.from({ length: 199 }, () => "word").join(" ");

    const post = parsePostSource(
      source(
        `${FRONTMATTER}\n\n${prose}\n\n\`\`\`ts\na // [!code ++]\n\`\`\`\n`
      )
    );

    // 200 words: the note would make 203.
    expect(post.readingMinutes).toBe(1);
  });

  it("rejects a Code Block, nested ones too, that cannot render as written", () => {
    const text = `${FRONTMATTER}\n\n- item\n\n  \`\`\`rust\n  fn main() {}\n  \`\`\`\n`;

    expect(() => parsePostSource(source(text))).toThrow(
      /clarity\.md[\s\S]*language "rust" is not registered/u
    );
  });

  it("keeps the safe defaults: no script URLs and no raw HTML", () => {
    const { document } = parsePostSource(
      source(
        `${FRONTMATTER}\n\n[click](javascript:alert(1)) <img src=x onerror=alert(1)>\n`
      )
    );

    expect(document.children).toEqual([
      {
        type: "paragraph",
        children: [
          { type: "text", value: "click <img src=x onerror=alert(1)>" },
        ],
      },
    ]);
  });

  it("rejects a Slug that is not in its URL-friendly form", () => {
    const text = FRONTMATTER.replace(
      "slug: clarity-over-complexity",
      "slug: Clarity Over Complexity"
    );

    expect(() => parsePostSource(source(text))).toThrow(
      /clarity\.md[\s\S]*slug/u
    );
  });

  it("rejects a Post Source without frontmatter", () => {
    expect(() => parsePostSource(source("# Only text\n"))).toThrow(
      /clarity\.md[\s\S]*slug/u
    );
  });
});
