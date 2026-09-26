import { RAMP } from "@/portfolio/utils/glyph-engine";
import type { StillCell } from "@/portfolio/utils/glyph-engine";

/**
 * What a run prints in: a ramp level (1 to 9, the glyph's place in the ramp),
 * Helm Teal for a specular peak, or nothing.
 */
export type StillTone = number | "signal" | "blank";

/** One run of glyphs that print in one tone. */
export interface StillRun {
  tone: StillTone;
  text: string;
}

const toneOf = (cell: StillCell): StillTone => {
  if (!cell) {
    return "blank";
  }
  return cell[0] === "signal" ? "signal" : RAMP.indexOf(cell[1]);
};

/**
 * One row of the still as runs of one tone, so Satori lays out a few boxes
 * per row and not one per glyph. Blank cells make their own runs, because a
 * run carries its facet's wash and a miss must stay paper.
 */
export const stillRuns = (cells: readonly StillCell[]): StillRun[] => {
  const runs: StillRun[] = [];
  for (const cell of cells) {
    const tone = toneOf(cell);
    const glyph = cell?.[1] ?? " ";
    const last = runs.at(-1);
    if (last?.tone === tone) {
      last.text += glyph;
    } else {
      runs.push({ text: glyph, tone });
    }
  }
  return runs;
};
