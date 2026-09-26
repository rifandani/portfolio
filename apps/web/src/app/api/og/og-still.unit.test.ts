import { describe, expect, it } from "vitest";

import { stillRuns } from "./og-still";

describe("stillRuns", () => {
  it("joins glyphs of one ramp level into one run", () => {
    expect(
      stillRuns([
        ["quiet", "-"],
        ["quiet", "-"],
        ["quiet", ":"],
        ["ink", "#"],
        ["signal", "@"],
      ])
    ).toEqual([
      { text: "--", tone: 3 },
      { text: ":", tone: 2 },
      { text: "#", tone: 7 },
      { text: "@", tone: "signal" },
    ]);
  });

  it("keeps blanks in their own runs, so a miss takes no wash", () => {
    expect(stillRuns([null, null, ["ink", "#"], null, ["ink", "#"]])).toEqual([
      { text: "  ", tone: "blank" },
      { text: "#", tone: 7 },
      { text: " ", tone: "blank" },
      { text: "#", tone: 7 },
    ]);
  });

  it("gives an empty row no runs", () => {
    expect(stillRuns([])).toEqual([]);
  });
});
