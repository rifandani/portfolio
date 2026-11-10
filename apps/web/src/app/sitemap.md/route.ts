import { pageRoutes } from "@/app/page-routes";
import { sitemapMarkdown } from "@/app/sitemap.md/sitemap-markdown";
import { getPosts } from "@/features/post/services/posts";
import { getProjects } from "@/features/project/services/projects";
import { ENV } from "@/shared/constants/env";

/**
 * Next.js caches `sitemap.ts` by default, but not a plain Route Handler. Force
 * this one static, so `src/app` is read at build time, as the server output
 * does not carry it.
 */
export const dynamic = "force-static";

export const GET = () =>
  new Response(
    sitemapMarkdown({
      appTitle: ENV.NEXT_PUBLIC_APP_TITLE,
      appUrl: ENV.NEXT_PUBLIC_APP_URL,
      pageRoutes: pageRoutes(),
      posts: getPosts(),
      projects: getProjects(),
    }),
    { headers: { "Content-Type": "text/markdown; charset=utf-8" } }
  );
