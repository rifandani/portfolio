import { getPosts } from "@/features/post/services/posts";
import { ENV } from "@/shared/constants/env";
import { I18N_DEFAULT_LOCALE } from "@/shared/constants/i18n";
import { portfolioIdentity } from "@/shared/constants/identity";

// The feed is English only: crawlers send no Locale cookie (ADR-0004). So it reads the English Message Catalog directly.
import messages from "../../../messages/en.json";
import { buildRssFeed } from "./rss-feed";

/** Post Sources are known at build time, so prerender it. */
export const dynamic = "force-static";

export const GET = () =>
  new Response(
    buildRssFeed({
      appUrl: ENV.NEXT_PUBLIC_APP_URL,
      title: `${portfolioIdentity.fullName} · ${messages.postsPageTitle}`,
      description: messages.postsPageIntro,
      author: portfolioIdentity.fullName,
      copyrightYear: portfolioIdentity.copyrightYear,
      posts: getPosts(I18N_DEFAULT_LOCALE),
      pages: [
        {
          href: "/cv",
          title: messages.cvTitle,
          description: "Work experience and project achievements.",
        },
      ],
    }),
    { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } }
  );
