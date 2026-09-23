import { getLocale, getTranslations } from "next-intl/server";
import { twMerge } from "tailwind-merge";

import type { Post } from "@/post/utils/post-source";

/** Publish dates follow the reader's Locale, not a fixed English format. */
const formatPublished = (iso: string, locale: string) =>
  new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(iso));

/** The Meta line of a Post: publish date and reading time. */
export const PostMeta = async ({
  post,
  className,
}: {
  post: Pick<Post, "publishedAt" | "readingMinutes">;
  className?: string;
}) => {
  const [t, locale] = await Promise.all([getTranslations(), getLocale()]);
  return (
    <p
      className={twMerge(
        "text-muted-fg font-mono text-xs/5 sm:text-sm/6",
        className
      )}
    >
      <time dateTime={post.publishedAt}>
        {formatPublished(post.publishedAt, locale)}
      </time>
      <span aria-hidden="true"> · </span>
      <span>{t("postReadingTime", { minutes: post.readingMinutes })}</span>
    </p>
  );
};
