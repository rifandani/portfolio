import { describe, expect, it } from "vitest";

import { codeBlockProblems, highlightCode, readableCode } from "./highlighter";

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

  it("wraps the lines that the fence metadata annotates", () => {
    expect(
      highlightCode("a\nb\nc", "plaintext", { meta: "{1} ins={2} del={3}" })
    ).toBe(
      [
        '<span class="th-line th-line--highlighted" data-line="1">a</span>',
        '<span class="th-line th-line--inserted" data-line="2">b</span>',
        '<span class="th-line th-line--deleted" data-line="3">c</span>',
      ].join("\n")
    );
  });

  it("removes a diff note from the code and marks its line", () => {
    expect(highlightCode("a // [!code ++]\nb", "plaintext")).toBe(
      [
        '<span class="th-line th-line--inserted" data-line="1">a</span>',
        '<span class="th-line" data-line="2">b</span>',
      ].join("\n")
    );
  });

  it("numbers every line of a fence that asks for it", () => {
    expect(highlightCode("a\nb", "plaintext", { meta: "lineNumbers" })).toBe(
      [
        '<span class="th-line th-line--numbered" data-line="1">a</span>',
        '<span class="th-line th-line--numbered" data-line="2">b</span>',
      ].join("\n")
    );
  });

  it("marks each exact match of a mark term", () => {
    expect(
      highlightCode("id + id", "plaintext", { meta: 'title="x.ts" mark="id"' })
    ).toBe(
      '<span class="th-decoration th-mark">id</span> + <span class="th-decoration th-mark">id</span>'
    );
  });
});

describe("readableCode", () => {
  it("removes the diff notes a reader does not see", () => {
    expect(readableCode("a /* [!code --] */\n# [!code ++]\nb")).toBe("a\n\nb");
  });
});

describe("codeBlockProblems", () => {
  it("accepts no language, a registered language, and its alias", () => {
    expect(codeBlockProblems({ value: "x" })).toEqual([]);
    expect(codeBlockProblems({ lang: "css", value: "x" })).toEqual([]);
    expect(codeBlockProblems({ lang: "typescript", value: "x" })).toEqual([]);
  });

  it("rejects a language that is not registered", () => {
    expect(codeBlockProblems({ lang: "rust", value: "x" })).toEqual([
      'language "rust" is not registered in src/post/utils/highlighter.ts',
    ]);
  });

  it("rejects a mark term that is not in the code", () => {
    expect(
      codeBlockProblems({
        lang: "ts",
        meta: "mark=\"found\" mark='[!code'",
        value: "found // [!code ++]",
      })
    ).toEqual(['mark "[!code" is not in the code']);
  });
});
