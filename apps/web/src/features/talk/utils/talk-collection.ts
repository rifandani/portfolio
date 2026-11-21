import type { LocalizedTalk, Talk } from "@/features/talk/data/talks";
import type { I18NLocale } from "@/shared/constants/i18n";

/**
 * Sort by the original creation date before applying a preview limit, and
 * give each Talk's title and description in one Locale.
 */
export const collectTalks = (
  sources: readonly Talk[],
  locale: I18NLocale,
  limit?: number
): LocalizedTalk[] => {
  const sorted = sources.toSorted((a, b) =>
    b.createdAt.localeCompare(a.createdAt)
  );
  return (limit === undefined ? sorted : sorted.slice(0, limit)).map(
    (talk) => ({
      ...talk,
      title: talk.title[locale],
      description: talk.description[locale],
    })
  );
};

/** Group a newest-first collection by its date's year, without time zone shifts. */
export const talksByYear = (collection: readonly LocalizedTalk[]) => {
  const years: { year: string; talks: LocalizedTalk[] }[] = [];
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
