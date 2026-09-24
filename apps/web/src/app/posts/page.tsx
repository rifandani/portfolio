import { getTranslations } from "next-intl/server";

import { SiteContainer } from "@/core/components/site-container";
import { SiteShell } from "@/core/components/site-shell";
import { Heading } from "@/core/components/ui/heading";
import { Text } from "@/core/components/ui/text";
import { createMetadata } from "@/core/utils/seo";
import { PostCard } from "@/post/components/post-card";
import { getPosts } from "@/post/services/posts";
import { postsByYear } from "@/post/utils/post-collection";

export const metadata = createMetadata({
  title: "Posts",
  description: "Writing by Tri Rizeki Rifandani (synthetic placeholders).",
});

/**
 * The posts index, filed by year like a logbook. From `lg` the year holds a
 * gutter column and stays in view while its entries scroll past, so a long
 * list never loses its place in time; below `lg` it heads its entries on a
 * ruled line.
 */
export default async function PostsPage() {
  const t = await getTranslations();
  const years = postsByYear(getPosts());
  return (
    <SiteShell>
      <SiteContainer className="py-16 sm:py-24">
        <Heading level={1} className="text-3xl/10 sm:text-4xl/12">
          {t("postsPageTitle")}
        </Heading>
        <Text className="mt-4 text-base/7 text-pretty">
          {t("postsPageIntro")}
        </Text>

        {years.length === 0 ? (
          <Text className="text-muted-fg mt-10 font-mono text-xs/5 sm:text-sm/6">
            {t("homeNoPosts")}
          </Text>
        ) : (
          <div className="mt-12 flex flex-col gap-12 sm:mt-16 sm:gap-16">
            {years.map(({ year, posts }) => (
              <section
                key={year}
                aria-labelledby={`posts-${year}`}
                className="grid gap-4 lg:grid-cols-[6rem_minmax(0,1fr)] lg:gap-x-8"
              >
                <div className="flex items-center gap-4 lg:sticky lg:top-24 lg:flex-col lg:items-start lg:gap-1 lg:self-start">
                  <h2
                    id={`posts-${year}`}
                    className="text-fg font-mono text-xl/7 font-medium tracking-tight tabular-nums sm:text-2xl/8"
                  >
                    {year}
                  </h2>
                  <span
                    aria-hidden="true"
                    className="bg-muted-fg/30 h-px flex-1 lg:hidden"
                  />
                  <p className="text-muted-fg font-mono text-xs/5 sm:text-sm/6">
                    {t("postsYearCount", { count: posts.length })}
                  </p>
                </div>
                <ul className="flex flex-col gap-4">
                  {posts.map((post) => (
                    <li key={post.slug}>
                      <PostCard post={post} />
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}
      </SiteContainer>
    </SiteShell>
  );
}
