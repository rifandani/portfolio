import { getTranslations } from "next-intl/server";

import { SiteContainer } from "@/core/components/site-container";
import { SiteShell } from "@/core/components/site-shell";
import { Heading } from "@/core/components/ui/heading";
import { Text } from "@/core/components/ui/text";
import { createMetadata } from "@/core/utils/seo";
import { PostCard } from "@/post/components/post-card";
import { postsByRecent } from "@/post/constants/posts";

export const metadata = createMetadata({
  title: "Posts",
  description: "Writing by Tri Rizeki Rifandani (synthetic placeholders).",
});

export default async function PostsPage() {
  const t = await getTranslations();
  const posts = postsByRecent();
  return (
    <SiteShell>
      <SiteContainer className="py-16 sm:py-24">
        <Heading level={1} className="text-3xl/10 sm:text-4xl/12">
          {t("postsPageTitle")}
        </Heading>
        <Text className="mt-4 max-w-prose text-base/7 text-pretty">
          {t("postsPageIntro")}
        </Text>

        <ul className="mt-10 flex flex-col gap-4">
          {posts.map((entry) => (
            <li key={entry.id}>
              <PostCard entry={entry} />
            </li>
          ))}
        </ul>
      </SiteContainer>
    </SiteShell>
  );
}
