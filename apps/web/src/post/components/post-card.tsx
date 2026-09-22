import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";

import { Link } from "@/core/components/ui/link";
import { cardLinkClass } from "@/portfolio/components/card-shell";
import type { PostEntry } from "@/post/constants/posts";

/** Publish dates follow the reader's Locale, not a fixed English format. */
const formatPublished = (iso: string, locale: string) =>
  new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(iso));

/**
 * One post. Keeps the wide OG image the square logo card cannot carry.
 */
export const PostCard = async ({ entry }: { entry: PostEntry }) => {
  const [t, locale] = await Promise.all([getTranslations(), getLocale()]);
  return (
    <Link href={entry.href} className={cardLinkClass}>
      <div className="flex gap-4 sm:gap-5">
        <Image
          src={entry.ogImageSrc}
          alt={entry.ogImageAlt}
          width={160}
          height={84}
          className="border-border aspect-[1200/630] w-28 shrink-0 rounded-lg border object-cover sm:w-40"
          unoptimized
        />
        <div className="min-w-0 flex-1">
          <h3 className="text-fg font-display text-base/6 font-semibold text-pretty">
            {entry.title}
          </h3>
          <p className="text-muted-fg mt-1 text-base/6 text-pretty sm:text-sm/6">
            {entry.summary}
          </p>
          <p className="text-muted-fg mt-2 font-mono text-xs/5 sm:text-sm/6">
            {formatPublished(entry.publishedAt, locale)}
            <span aria-hidden="true"> · </span>
            <span>
              {t("postReadingTime", { minutes: entry.readingMinutes })}
            </span>
          </p>
        </div>
      </div>
    </Link>
  );
};
