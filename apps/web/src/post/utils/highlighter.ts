import type { HighlightDecoration } from "@tanstack/highlight/core";
import {
  createHighlighter,
  renderNodesToHtml,
  renderTokens,
} from "@tanstack/highlight/core";
import { css } from "@tanstack/highlight/languages/css";
import { json } from "@tanstack/highlight/languages/json";
import { shell } from "@tanstack/highlight/languages/shell";
import { ts } from "@tanstack/highlight/languages/ts";
import { tsx } from "@tanstack/highlight/languages/tsx";
import {
  parseCodeDiffNotation,
  parseCodeFenceMeta,
} from "@tanstack/highlight/markdown";
import type { CodeHighlighter } from "@tanstack/markdown";

/*
 * The one place that knows about syntax highlighting (ADR-0004). It has no
 * server-only imports, so a Server Component and a Client Component share the
 * same synchronous highlighter and give the same markup.
 *
 * Register the languages that Posts use (`shell` also covers `bash` and `sh`).
 * `parsePostSource` stops the build when a Code Block names a language that is
 * not registered here.
 */
const highlighter = createHighlighter({
  languages: [css, json, shell, ts, tsx],
});

const REGISTERED_LANGUAGES = new Set(highlighter.listLanguages());

/** Our one fence key: `mark="term"` marks each exact match of the term. */
const MARK_KEY = /(?:^|\s)mark=(?:"(?<double>[^"]+)"|'(?<single>[^']+)')/gu;

const markTermsOf = (meta: string | undefined) =>
  [...(meta ?? "").matchAll(MARK_KEY)].flatMap((match) => {
    const term = match.groups?.double ?? match.groups?.single;
    return term ? [term] : [];
  });

/** Zero-based, end-exclusive UTF-16 ranges of each match of `term`. */
const rangesOf = (code: string, term: string): HighlightDecoration[] => {
  const ranges: HighlightDecoration[] = [];
  for (
    let start = code.indexOf(term);
    start !== -1;
    start = code.indexOf(term, start + term.length)
  ) {
    ranges.push({ className: "th-mark", range: [start, start + term.length] });
  }
  return ranges;
};

/** The code a reader sees: the `[!code ++]` and `[!code --]` notes removed. */
export const readableCode = (code: string) => parseCodeDiffNotation(code).code;

/**
 * The reasons a Code Block cannot render as written, or an empty list. A
 * Code Block names a registered language or none, and each `mark` term is in
 * its code.
 */
export const codeBlockProblems = ({
  lang,
  meta,
  value,
}: {
  lang?: string;
  meta?: string;
  value: string;
}): string[] => {
  const problems: string[] = [];
  if (
    lang !== undefined &&
    !REGISTERED_LANGUAGES.has(highlighter.normalizeLanguage(lang))
  ) {
    problems.push(
      `language "${lang}" is not registered in src/post/utils/highlighter.ts`
    );
  }
  const code = readableCode(value);
  for (const term of markTermsOf(meta)) {
    if (rangesOf(code, term).length === 0) {
      problems.push(`mark "${term}" is not in the code`);
    }
  }
  return problems;
};

/**
 * The `highlighter` callback of the TanStack Markdown renderer. It returns the
 * inner markup of `<code>`; the renderer owns the `<pre><code>` around it and
 * shows the fence `title` as a caption. It reads the fence metadata: line
 * annotations (`{2-4}`, `ins`, `del`, `focus`, `error`, `warning`),
 * `lineNumbers`, and `mark`. Tokens carry `th-*` classes, and
 * `post-document.css` colors them for each theme.
 */
export const highlightCode: CodeHighlighter = (code, lang, options = {}) => {
  const annotated = parseCodeDiffNotation(code);
  const fence = parseCodeFenceMeta(options.meta);
  const decorations: HighlightDecoration[] = [
    ...annotated.decorations,
    ...fence.decorations,
    ...markTermsOf(options.meta).flatMap((term) =>
      rangesOf(annotated.code, term)
    ),
  ];
  if (fence.lineNumbers) {
    // TanStack Markdown adds its line number class to `<pre>` only when the
    // option is global, so a numbered fence marks its own lines.
    decorations.push({
      className: "th-line--numbered",
      lines: [1, annotated.code.split("\n").length],
    });
  }
  const { tokens } = highlighter.tokenize(annotated.code, { lang });
  return renderNodesToHtml(renderTokens(tokens, { decorations }));
};
