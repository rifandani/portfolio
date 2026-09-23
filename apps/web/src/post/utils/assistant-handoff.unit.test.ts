import { describe, expect, it } from "vitest";

import { assistantHandoffUrl, assistants } from "./assistant-handoff";

const PROMPT =
  "Read https://example.com/posts/clarity.md, I want to ask questions about it.";

const parts = (href: string) => {
  const url = new URL(href);
  return {
    page: `${url.origin}${url.pathname}`,
    params: Object.fromEntries(url.searchParams),
  };
};

describe("assistantHandoffUrl", () => {
  it("puts the prompt in the parameter each Assistant reads", () => {
    expect(
      assistants.map((assistant) =>
        parts(assistantHandoffUrl(assistant, PROMPT))
      )
    ).toEqual([
      { page: "https://claude.ai/new", params: { q: PROMPT } },
      {
        page: "https://chatgpt.com/",
        params: { hints: "search", prompt: PROMPT },
      },
      { page: "https://t3.chat/new", params: { q: PROMPT } },
      { page: "https://cursor.com/link/prompt", params: { text: PROMPT } },
    ]);
  });

  it("encodes characters that would end the prompt early", () => {
    const prompt = "Read a & b = c? #1, then 100% of it.";

    expect(parts(assistantHandoffUrl("claude", prompt)).params).toEqual({
      q: prompt,
    });
  });
});
