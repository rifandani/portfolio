/**
 * The parts of a Date Stamp. The day and the year come straight from the ISO
 * date, and the month is formatted in UTC, so no time zone can move a Post to
 * the day before. The month follows the reader's Locale, as the work dates do.
 */
export const stampOf = (iso: string, locale: string) => {
  const date = new Date(iso);
  return {
    month: new Intl.DateTimeFormat(locale, { month: "short", timeZone: "UTC" })
      .format(date)
      .replace(/\.$/u, ""),
    day: iso.slice(8, 10),
    year: iso.slice(0, 4),
    full: new Intl.DateTimeFormat(locale, {
      dateStyle: "long",
      timeZone: "UTC",
    }).format(date),
  };
};

/** The ruler's scale: ten minutes, stretched by a longer Post. */
const RULER_MIN_SCALE = 10;
/** Past this the ruler would crowd the arrow; the words still say the full time. */
const RULER_MAX_SCALE = 40;

/**
 * The parts of a reading ruler: the minutes it draws and the scale it draws
 * them on. Every ruler starts at the same length, so a list compares at a
 * glance; the words still say the full time.
 */
export const rulerOf = (readingMinutes: number) => {
  const minutes = Math.min(readingMinutes, RULER_MAX_SCALE);
  return { minutes, scale: Math.max(minutes, RULER_MIN_SCALE) };
};
