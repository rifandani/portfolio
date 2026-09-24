import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import type { CSSProperties } from "react";
import { HiOutlineArrowRight } from "react-icons/hi2";

import { LitCard } from "@/portfolio/components/lit-card.client";
import { PreviewMorph } from "@/portfolio/components/preview-morph";
import type { Post } from "@/post/utils/post-source";
import { postPath } from "@/post/utils/slug";

/** The ruler's scale: ten minutes, stretched by a longer Post. */
const RULER_MIN_SCALE = 10;
/** Past this the ruler would crowd the arrow; the words still say the full time. */
const RULER_MAX_SCALE = 40;

/**
 * The parts of a Date Stamp. The day and the year come straight from the ISO
 * date, and the month is formatted in UTC, so no time zone can move a Post to
 * the day before. The month follows the reader's Locale, as the work dates do.
 */
const stampOf = (iso: string, locale: string) => {
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

/**
 * One Post, filed as a Postmark Log entry: a Date Stamp that inks when the
 * light reaches it, the title and summary, and the reading time drawn as a
 * ruler, one tick per minute, so a list of Posts shows their lengths at a
 * glance. The preview sits at the far end as the one print that drifts; from
 * `sm` it runs the full height of the entry, cropped to fit.
 *
 * The text comes first in the source, so the link reads title first; the grid
 * areas put the stamp first on screen.
 */
export const PostCard = async ({ post }: { post: Post }) => {
  const [t, locale] = await Promise.all([getTranslations(), getLocale()]);
  const stamp = stampOf(post.publishedAt, locale);
  const minutes = Math.min(post.readingMinutes, RULER_MAX_SCALE);

  return (
    <LitCard href={postPath(post.slug)} className="group">
      <div className="relative grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-4 [grid-template-areas:'stamp_print'_'text_text'] sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:gap-x-5 sm:[grid-template-areas:'stamp_text_print']">
        <div className="flex min-w-0 flex-col [grid-area:text]">
          <h3 className="text-fg font-display text-base/6 font-semibold text-pretty sm:text-lg/7 sm:tracking-tight">
            {post.title}
          </h3>
          <p className="text-muted-fg mt-1 text-base/6 text-pretty sm:text-sm/6">
            {post.summary}
          </p>
          <p className="text-muted-fg mt-auto flex items-end gap-3 pt-3 font-mono text-xs/5 sm:text-sm/5">
            <span
              aria-hidden="true"
              className="post-ruler mb-1"
              // SAFETY: `CSSProperties` has no index for custom properties; both
              // keys are CSS custom properties, which React sets as written.
              style={
                {
                  "--minutes": minutes,
                  "--scale": Math.max(minutes, RULER_MIN_SCALE),
                } as CSSProperties
              }
            />
            <span className="leading-5">
              {t("postReadingTime", { minutes: post.readingMinutes })}
            </span>
            <HiOutlineArrowRight
              data-slot="icon"
              aria-hidden="true"
              className="group-hover:text-fg group-focus-visible:text-fg mb-0.5 ml-auto size-4 shrink-0 transition-[translate,color] duration-300 ease-out group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5 motion-reduce:transition-none"
            />
          </p>
        </div>

        <p className="post-stamp self-start [grid-area:stamp]">
          <time dateTime={post.publishedAt} className="font-mono tabular-nums">
            <span className="sr-only">{stamp.full}</span>
            <span
              aria-hidden="true"
              className="text-muted-fg text-xs/4 tracking-[0.08em] uppercase"
            >
              {stamp.month}
            </span>
            <span
              aria-hidden="true"
              className="text-fg text-3xl/9 font-medium tracking-tight"
            >
              {stamp.day}
            </span>
            <span
              aria-hidden="true"
              className="text-muted-fg text-xs/4 tracking-[0.08em]"
            >
              {stamp.year}
            </span>
          </time>
        </p>

        <div className="self-start justify-self-end [grid-area:print] sm:self-stretch">
          <PreviewMorph kind="post" slug={post.slug}>
            <div className="border-border aspect-1200/630 w-28 overflow-hidden rounded-lg border sm:aspect-auto sm:h-full sm:w-32">
              <Image
                src={post.ogImageSrc}
                alt={post.ogImageAlt}
                width={128}
                height={67}
                className="size-full object-cover"
                data-lit-print
                unoptimized
              />
            </div>
          </PreviewMorph>
        </div>
      </div>
    </LitCard>
  );
};
