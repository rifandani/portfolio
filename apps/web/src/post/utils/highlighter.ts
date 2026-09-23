import { createHighlighter } from "@tanstack/highlight/core";
import { css } from "@tanstack/highlight/languages/css";
import { diff } from "@tanstack/highlight/languages/diff";
import { html } from "@tanstack/highlight/languages/html";
import { js } from "@tanstack/highlight/languages/js";
import { json } from "@tanstack/highlight/languages/json";
import { jsx } from "@tanstack/highlight/languages/jsx";
import { shell } from "@tanstack/highlight/languages/shell";
import { ts } from "@tanstack/highlight/languages/ts";
import { tsx } from "@tanstack/highlight/languages/tsx";
import { yaml } from "@tanstack/highlight/languages/yaml";
import { createTanStackMarkdownHighlighter } from "@tanstack/highlight/markdown";

/**
 * The one place that knows about syntax highlighting (ADR-0004). It returns
 * the inner markup of `<code>`; TanStack Markdown owns the `<pre><code>`
 * around it. Tokens carry `th-*` classes that `post-document.css` colors.
 *
 * Register a language here before a Post uses it. An unknown language falls
 * back to escaped plain text.
 */
export const highlightCode = createTanStackMarkdownHighlighter(
  createHighlighter({
    languages: [css, diff, html, js, json, jsx, shell, ts, tsx, yaml],
  })
);
