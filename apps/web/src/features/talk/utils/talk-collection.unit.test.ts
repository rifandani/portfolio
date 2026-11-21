import { describe, expect, it } from "vitest";

import type { Talk } from "@/features/talk/data/talks";

import { collectTalks, talksByYear } from "./talk-collection";

const talk = (title: string, createdAt: string): Talk => ({
  title: { en: title, id: `${title} (id)` },
  description: { en: `About ${title}`, id: `Tentang ${title}` },
  createdAt,
  link: `https://slides.example/${title}`,
});

const sources = Object.freeze([
  talk("oldest", "2024-12-31"),
  talk("middle", "2026-01-01"),
  talk("newest", "2026-11-10"),
  talk("older", "2025-06-01"),
]);

describe("Talk collection", () => {
  it("sorts by first creation date without changing the source order", () => {
    expect(collectTalks(sources, "en").map(({ title }) => title)).toEqual([
      "newest",
      "middle",
      "older",
      "oldest",
    ]);
    expect(sources[0]?.title.en).toBe("oldest");
  });

  it("selects the three newest Talks after sorting the source collection", () => {
    expect(collectTalks(sources, "en", 3).map(({ title }) => title)).toEqual([
      "newest",
      "middle",
      "older",
    ]);
    expect(collectTalks(sources.slice(0, 1), "en", 3)).toHaveLength(1);
  });

  it("groups newest first and keeps 1 January in its creation year", () => {
    const years = talksByYear(collectTalks(sources, "en"));
    expect(
      years.map(({ year, talks }) => ({
        year,
        titles: talks.map(({ title }) => title),
      }))
    ).toEqual([
      { year: "2026", titles: ["newest", "middle"] },
      { year: "2025", titles: ["older"] },
      { year: "2024", titles: ["oldest"] },
    ]);
  });

  it("gives the title and description of each Talk in the Locale", () => {
    expect(collectTalks(sources.slice(0, 1), "id")).toEqual([
      {
        title: "oldest (id)",
        description: "Tentang oldest",
        createdAt: "2024-12-31",
        link: "https://slides.example/oldest",
      },
    ]);
  });

  it("returns empty collections for an archive without Talks", () => {
    expect(collectTalks([], "en", 3)).toEqual([]);
    expect(talksByYear([])).toEqual([]);
  });
});
