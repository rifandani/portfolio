import { parseMarkdown } from "@tanstack/markdown/parser";
import { describe, expect, it } from "vitest";

import { outlineOf, POST_TITLE_ID } from "./post-outline";

const parse = (text: string) => parseMarkdown(text, { headingIds: true });

describe("outlineOf", () => {
  it("lists h2 and h3 headings in reading order with their ids", () => {
    const document = parse(
      "## Tokens first\n\nText.\n\n### Named roles\n\nMore.\n\n## Then components"
    );

    expect(outlineOf(document)).toStrictEqual([
      { id: "tokens-first", text: "Tokens first", level: 2 },
      { id: "named-roles", text: "Named roles", level: 3 },
      { id: "then-components", text: "Then components", level: 2 },
    ]);
  });

  it("leaves out h1 and headings deeper than h3", () => {
    const document = parse("# Title\n\n## Section\n\n#### Detail");

    expect(outlineOf(document).map((entry) => entry.text)).toStrictEqual([
      "Section",
    ]);
  });

  it("uses the heading's plain text, without inline marks", () => {
    const document = parse("## Parse at the `boundary`, **once**");

    expect(outlineOf(document)[0]?.text).toBe("Parse at the boundary, once");
  });

  it("keeps ids unique when two headings share a text", () => {
    const document = parse("## Notes\n\n## Notes");

    const ids = outlineOf(document).map((entry) => entry.id);
    expect(new Set(ids).size).toBe(2);
  });

  it("is empty when the Post Document has no sections", () => {
    expect(outlineOf(parse("Only a paragraph."))).toStrictEqual([]);
  });
});

describe("POST_TITLE_ID", () => {
  it("never matches a heading's id, even a heading with the same words", () => {
    const document = parse("## Post title\n\n## Post_title");

    expect(outlineOf(document).map((entry) => entry.id)).not.toContain(
      POST_TITLE_ID
    );
  });
});
