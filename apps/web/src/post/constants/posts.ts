export interface PostEntry {
  id: string;
  title: string;
  summary: string;
  publishedAt: string;
  readingMinutes: number;
  ogImageSrc: string;
  ogImageAlt: string;
  href: string;
}

/** Unsorted source; consumers must sort by publishedAt descending. */
const postEntries: PostEntry[] = [
  {
    id: "post-1",
    title: "[Synthetic] Clarity over complexity",
    summary: "Why restrained UI systems help hiring managers scan faster.",
    publishedAt: "2024-05-12",
    readingMinutes: 6,
    ogImageSrc: "/placeholders/post-og-1.svg",
    ogImageAlt: "Synthetic OG art for Clarity over complexity",
    href: "/posts",
  },
  {
    id: "post-2",
    title: "[Synthetic] Systems that scale without noise",
    summary:
      "Token discipline, one accent voice, and status that stays status.",
    publishedAt: "2024-03-03",
    readingMinutes: 8,
    ogImageSrc: "/placeholders/post-og-2.svg",
    ogImageAlt: "Synthetic OG art for Systems that scale",
    href: "/posts",
  },
  {
    id: "post-3",
    title: "[Synthetic] Small updates, consistent impact",
    summary: "Shipping incremental portfolio surfaces without spectacle debt.",
    publishedAt: "2024-01-18",
    readingMinutes: 5,
    ogImageSrc: "/placeholders/post-og-3.svg",
    ogImageAlt: "Synthetic OG art for Small updates",
    href: "/posts",
  },
  {
    id: "post-4",
    title: "[Synthetic] TypeScript lessons from real builds",
    summary: "Practical typing patterns that keep RSC boundaries honest.",
    publishedAt: "2023-11-07",
    readingMinutes: 7,
    ogImageSrc: "/placeholders/post-og-4.svg",
    ogImageAlt: "Synthetic OG art for TypeScript lessons",
    href: "/posts",
  },
];

export const postsByRecent = (): PostEntry[] =>
  [...postEntries].toSorted(
    (a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt)
  );
