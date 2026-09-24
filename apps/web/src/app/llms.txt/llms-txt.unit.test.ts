import { describe, expect, it } from "vitest";

import type { LlmsTxtInput } from "./llms-txt";
import { buildLlmsTxt } from "./llms-txt";

const input: LlmsTxtInput = {
  baseUrl: "https://example.com",
  name: "Jane Doe",
  headline: "Engineer by craft.",
  summary: "I build software.",
  pages: [
    { name: "Home", href: "/", note: "Start here" },
    { name: "About", href: "/about" },
  ],
  posts: [
    {
      slug: "clarity-over-complexity",
      title: "Clarity over complexity",
      summary: "Why simple wins.",
    },
  ],
  projects: [
    {
      slug: "signal-kit",
      title: "Signal Kit",
      description: "Accessible components.",
    },
  ],
  optional: [{ name: "Sitemap", href: "/sitemap.xml" }],
};

describe("buildLlmsTxt", () => {
  it("writes the H1, blockquote, prose, and sections in llmstxt.org order", () => {
    expect(buildLlmsTxt(input)).toBe(
      [
        "# Jane Doe",
        "",
        "> Engineer by craft.",
        "",
        "I build software.",
        "",
        "Base URL: https://example.com",
        "",
        "Every Post and Project has a Markdown version: add `.md` to its URL (`/posts/<slug>` → `/posts/<slug>.md`, `/projects/<slug>` → `/projects/<slug>.md`). The Post and Project links below go to the Markdown version.",
        "",
        "## Pages",
        "",
        "- [Home](https://example.com/): Start here",
        "- [About](https://example.com/about)",
        "",
        "## Posts",
        "",
        "- [Clarity over complexity](https://example.com/posts/clarity-over-complexity.md): Why simple wins.",
        "",
        "## Projects",
        "",
        "- [Signal Kit](https://example.com/projects/signal-kit.md): Accessible components.",
        "",
        "## Optional",
        "",
        "- [Sitemap](https://example.com/sitemap.xml)",
        "",
      ].join("\n")
    );
  });

  it("escapes brackets in link text", () => {
    const text = buildLlmsTxt({
      ...input,
      projects: [{ slug: "kit", title: "[Synthetic] Kit", description: "x" }],
    });

    expect(text).toContain(
      "- [\\[Synthetic\\] Kit](https://example.com/projects/kit.md): x"
    );
  });

  it("leaves out a section that has no links", () => {
    const text = buildLlmsTxt({ ...input, posts: [], projects: [] });

    expect(text).not.toContain("## Posts");
    expect(text).not.toContain("## Projects");
    expect(text).toContain("## Pages");
    expect(text).toContain("## Optional");
  });

  it("uses only the origin of a base URL that has a path", () => {
    const text = buildLlmsTxt({
      ...input,
      baseUrl: "https://example.com/app/",
    });

    expect(text).toContain("Base URL: https://example.com\n");
    expect(text).toContain("- [About](https://example.com/about)");
  });
});
