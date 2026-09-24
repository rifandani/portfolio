import { ENV } from "@/core/constants/env";
import { portfolioIdentity } from "@/portfolio/constants/portfolio";
import { getPosts } from "@/post/services/posts";

// The feed has one language, like a Post, so it reads the English Message Catalog directly.
import messages from "../../../messages/en.json";
import { buildRssFeed } from "./rss-feed";

/** Post Sources are known at build time, so prerender it. */
// fallow-ignore-next-line unused-export -- Next.js reads it from a route handler to prerender it
export const dynamic = "force-static";

export const GET = () =>
  new Response(
    buildRssFeed({
      appUrl: ENV.NEXT_PUBLIC_APP_URL,
      title: `${portfolioIdentity.fullName} · ${messages.postsPageTitle}`,
      description: messages.postsPageIntro,
      author: portfolioIdentity.fullName,
      copyrightYear: portfolioIdentity.copyrightYear,
      posts: getPosts(),
    }),
    { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } }
  );
