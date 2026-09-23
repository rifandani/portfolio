import { describe, expect, it } from "vitest";

import { highlightCode } from "./highlighter";

describe("highlightCode", () => {
  it("marks the tokens of a registered language with theme classes", () => {
    expect(highlightCode("const a = 1", "ts")).toBe(
      '<span class="th-token th-keyword">const</span> a = <span class="th-token th-number">1</span>'
    );
  });

  it("gives escaped plain text for a language it does not know", () => {
    expect(highlightCode("fn main() -> <T>", "rust")).toBe(
      "fn main() -&gt; &lt;T&gt;"
    );
  });
});
