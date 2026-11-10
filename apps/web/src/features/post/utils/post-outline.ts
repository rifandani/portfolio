import type { MarkdownDocument } from "@tanstack/markdown";
import { collectMarkdownHeadings } from "@tanstack/markdown/extensions/headings";

/** One section of a Post Outline: a Post Document heading. */
export interface OutlineEntry {
  /** The heading's `id`, as the parser made it and the renderer prints it. */
  id: string;
  text: string;
  /** 2 for a section, 3 for a subsection. */
  level: 2 | 3;
}

/**
 * The id of the Post Detail title, the first Post Outline entry. The heading
 * slugger makes only `[a-z0-9-]`, so the underscore keeps it from ever
 * matching a heading's id.
 */
export const POST_TITLE_ID = "post_title";

/**
 * Deeper headings stay out: the Post Outline is for finding a section, and
 * each extra level makes the list longer to scan.
 */
const isOutlineLevel = (level: number): level is OutlineEntry["level"] =>
  level === 2 || level === 3;

/**
 * The Post Outline of a Post Document: its `h2` and `h3` headings in reading
 * order. The ids come from the parse, so the outline and the rendered headings
 * cannot disagree.
 */
export const outlineOf = (document: MarkdownDocument): OutlineEntry[] =>
  collectMarkdownHeadings(document).flatMap(({ id, text, level }) =>
    isOutlineLevel(level) ? [{ id, text, level }] : []
  );
