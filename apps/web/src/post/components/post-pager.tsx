import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { getTranslations } from "next-intl/server";
import { twMerge } from "tailwind-merge";

import { LitCard } from "@/portfolio/components/lit-card.client";
import { PostMeta } from "@/post/components/post-meta";
import type { Post } from "@/post/utils/post-source";
import { postPath } from "@/post/utils/slug";

type PagerPost = Pick<
  Post,
  "slug" | "title" | "publishedAt" | "readingMinutes"
>;

/**
 * One side of the Post Pager: the Content Card with a text-only filling. Each
 * arrow points the way the reader goes in time. From `sm` the next Post sits
 * on the right and aligns to the right; stacked, both align left.
 */
const PagerCard = ({
  post,
  label,
  isNext = false,
}: {
  post: PagerPost;
  label: string;
  isNext?: boolean;
}) => {
  const Arrow = isNext ? ArrowRightIcon : ArrowLeftIcon;
  return (
    <LitCard href={postPath(post.slug)} className="h-full">
      <div
        className={twMerge(
          "relative flex flex-col items-start",
          isNext && "sm:items-end sm:text-right"
        )}
      >
        <span className="text-muted-fg inline-flex items-center gap-1.5 font-mono text-xs/5 sm:text-sm/6">
          {!isNext && (
            <Arrow aria-hidden="true" className="size-3.5 shrink-0" />
          )}
          {label}
          {isNext && <Arrow aria-hidden="true" className="size-3.5 shrink-0" />}
        </span>
        <span className="text-fg font-display mt-2 text-base/6 font-semibold text-pretty">
          {post.title}
        </span>
        <PostMeta post={post} className="mt-1" />
      </div>
    </LitCard>
  );
};

/**
 * The Post Pager at the end of a Post Detail. Previous is the Post published
 * just before this one and next is the one published just after, so the oldest
 * Post has no previous and the most recent has no next.
 */
export const PostPager = async ({
  previous,
  next,
  className,
}: {
  previous?: PagerPost;
  next?: PagerPost;
  className?: string;
}) => {
  if (!previous && !next) {
    return null;
  }
  const t = await getTranslations();
  return (
    <nav aria-label={t("postPager")} className={className}>
      <ul className="grid gap-4 sm:grid-cols-2">
        {previous && (
          <li className="grid">
            <PagerCard post={previous} label={t("postPrevious")} />
          </li>
        )}
        {next && (
          <li className="grid sm:col-start-2">
            <PagerCard post={next} label={t("postNext")} isNext />
          </li>
        )}
      </ul>
    </nav>
  );
};
