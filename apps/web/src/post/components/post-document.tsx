import type { MarkdownDocument } from "@tanstack/markdown";
import { Markdown } from "@tanstack/markdown/react";

import { highlightCode } from "@/post/utils/highlighter";

import "@/post/styles/post-document.css";

const HEADING_ANCHORS = {
  className: "post-heading-anchor",
  content: "#",
} as const;

/**
 * Renders a Post Document, already parsed with the safe defaults
 * (ADR-0004). The tree goes in as is: rendering never parses again. The
 * renderer's plain elements take their style from `post-document.css`.
 */
export const PostDocument = ({ document }: { document: MarkdownDocument }) => (
  <div className="post-document">
    <Markdown headingAnchors={HEADING_ANCHORS} highlighter={highlightCode}>
      {document}
    </Markdown>
  </div>
);
