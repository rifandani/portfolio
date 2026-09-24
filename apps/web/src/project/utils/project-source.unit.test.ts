import { describe, expect, it } from "vitest";

import { parseProjectSource } from "./project-source";

const FRONTMATTER = `---
slug: signal-kit
title: "Signal Kit: accessible parts"
description: Accessible component patterns for product shells.
tags: [React Aria, Tailwind]
order: 1
previewSrc: /placeholders/project-og-1.svg
previewAlt: Preview art for Signal Kit
---`;

const source = (text: string) => ({ path: "signal-kit.md", text });

describe("parseProjectSource", () => {
  it("reads the Project metadata from the frontmatter", () => {
    const {
      document: _,
      markdown: __,
      ...project
    } = parseProjectSource(source(`${FRONTMATTER}\n\nShort text.\n`));

    expect(project).toEqual({
      slug: "signal-kit",
      title: "Signal Kit: accessible parts",
      description: "Accessible component patterns for product shells.",
      tags: ["React Aria", "Tailwind"],
      order: 1,
      previewSrc: "/placeholders/project-og-1.svg",
      previewAlt: "Preview art for Signal Kit",
    });
  });

  it("parses the Markdown text into the Project Document", () => {
    const { document } = parseProjectSource(
      source(`${FRONTMATTER}\n\n## The problem\n\nHello.\n`)
    );

    expect(document.children).toEqual([
      {
        type: "heading",
        depth: 2,
        id: "the-problem",
        children: [{ type: "text", value: "The problem" }],
      },
      { type: "paragraph", children: [{ type: "text", value: "Hello." }] },
    ]);
  });

  it("makes the Project Markdown from the title, the description, and the text as written", () => {
    const { markdown } = parseProjectSource(
      source(`${FRONTMATTER}\n\n## The problem\n\n\`\`\`ts {1}\na\n\`\`\`\n`)
    );

    expect(markdown).toBe(
      [
        "# Signal Kit: accessible parts",
        "",
        "Accessible component patterns for product shells.",
        "",
        "## The problem",
        "",
        "```ts {1}",
        "a",
        "```",
        "",
      ].join("\n")
    );
  });

  it("rejects a Project Source without tags", () => {
    const text = FRONTMATTER.replace(
      "tags: [React Aria, Tailwind]",
      "tags: []"
    );

    expect(() => parseProjectSource(source(text))).toThrow(
      /Project Source signal-kit\.md[\s\S]*tags/u
    );
  });

  it("rejects an order that is not a positive whole number", () => {
    const text = FRONTMATTER.replace("order: 1", "order: 1.5");

    expect(() => parseProjectSource(source(text))).toThrow(
      /signal-kit\.md[\s\S]*order/u
    );
  });

  it("rejects a Slug that is not in its URL-friendly form", () => {
    const text = FRONTMATTER.replace("slug: signal-kit", "slug: Signal Kit");

    expect(() => parseProjectSource(source(text))).toThrow(
      /signal-kit\.md[\s\S]*slug/u
    );
  });

  it("rejects a Code Block that cannot render as written", () => {
    const text = `${FRONTMATTER}\n\n\`\`\`rust\nfn main() {}\n\`\`\`\n`;

    expect(() => parseProjectSource(source(text))).toThrow(
      /Code Block in Project Source signal-kit\.md[\s\S]*"rust"/u
    );
  });
});
