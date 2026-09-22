import { getTranslations } from "next-intl/server";

import {
  HomeSection,
  HomeSectionEmpty,
} from "@/core/components/home/home-section";
import { Link } from "@/core/components/ui/link";
import { PostCard } from "@/post/components/post-card";
import { postsByRecent } from "@/post/constants/posts";

const HOME_PREVIEW_COUNT = 3;

export const HomePosts = async () => {
  const t = await getTranslations();
  const posts = postsByRecent().slice(0, HOME_PREVIEW_COUNT);
  return (
    <HomeSection
      id="home-posts-heading"
      title={t("homeWriting")}
      action={
        <Link
          href="/posts"
          className="text-primary-subtle-fg shrink-0 text-sm/6 underline underline-offset-4"
        >
          {t("homeAllPosts")}
        </Link>
      }
    >
      {posts.length === 0 ? (
        <HomeSectionEmpty>{t("homeNoPosts")}</HomeSectionEmpty>
      ) : (
        posts.map((entry) => (
          <li key={entry.id}>
            <PostCard entry={entry} />
          </li>
        ))
      )}
    </HomeSection>
  );
};
