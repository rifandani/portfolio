import type { Talk } from "@/features/talk/data/talks";

/** Sort by the original creation date before applying a preview limit. */
export const collectTalks = (
  sources: readonly Talk[],
  limit?: number
): Talk[] => {
  const sorted = sources.toSorted((a, b) =>
    b.createdAt.localeCompare(a.createdAt)
  );
  return limit === undefined ? sorted : sorted.slice(0, limit);
};

/** Group a newest-first collection by its date's year, without time zone shifts. */
export const talksByYear = (collection: readonly Talk[]) => {
  const years: { year: string; talks: Talk[] }[] = [];
  for (const talk of collection) {
    const year = talk.createdAt.slice(0, 4);
    const last = years.at(-1);
    if (last?.year === year) {
      last.talks.push(talk);
    } else {
      years.push({ year, talks: [talk] });
    }
  }
  return years;
};
