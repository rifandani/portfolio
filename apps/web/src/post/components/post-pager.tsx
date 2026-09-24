import { getTranslations } from "next-intl/server";

import { ContentPager } from "@/portfolio/components/content-pager";
import type { PagerSide } from "@/portfolio/components/content-pager";
import { PostMeta } from "@/post/components/post-meta";
import type { Post } from "@/post/utils/post-source";
import { postPath } from "@/post/utils/slug";

type PagerPost = Pick<
  Post,
  "slug" | "title" | "publishedAt" | "readingMinutes"
>;

const sideOf = (post: PagerPost, label: string): PagerSide => ({
  href: postPath(post.slug),
  title: post.title,
  label,
  meta: <PostMeta post={post} className="mt-1" />,
});

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
    <ContentPager
      label={t("postPager")}
      previous={previous && sideOf(previous, t("postPrevious"))}
      next={next && sideOf(next, t("postNext"))}
      className={className}
    />
  );
};
