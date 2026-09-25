import { ENV } from "@/core/constants/env";
import {
  portfolioIdentity,
  socialLinks,
} from "@/portfolio/constants/portfolio";
import { getPosts } from "@/post/services/posts";
import { getProjects } from "@/project/services/projects";

// llms.txt has one language, like a Post, so it reads the English Message Catalog directly.
import messages from "../../../messages/en.json";
import { buildLlmsTxt } from "./llms-txt";

/** Post Sources and Project Sources are known at build time, so prerender it. */
export const dynamic = "force-static";

export const GET = () =>
  new Response(
    buildLlmsTxt({
      baseUrl: ENV.NEXT_PUBLIC_APP_URL,
      name: portfolioIdentity.fullName,
      headline: messages.homeHeadline,
      summary: messages.homeSummary,
      pages: [
        {
          name: "Home",
          href: "/",
          note: "Identity, work experience, and previews of projects and posts",
        },
        {
          name: messages.aboutTitle,
          href: "/about",
          note: messages.aboutDescription,
        },
        {
          name: messages.projectsPageTitle,
          href: "/projects",
          note: "All projects",
        },
        { name: messages.postsPageTitle, href: "/posts", note: "All posts" },
      ],
      posts: getPosts(),
      projects: getProjects(),
      optional: [
        {
          name: "Markdown sitemap",
          href: "/sitemap.md",
          note: "Every public page, Post, and Project, as Markdown",
        },
        {
          name: "XML sitemap",
          href: "/sitemap.xml",
          note: "Every public URL, for crawlers",
        },
        {
          name: "RSS feed",
          href: "/rss.xml",
          note: "Every Post, newest first, as RSS 2.0",
        },
        // A mailto link is not a document an agent can read.
        ...socialLinks.flatMap((link) =>
          link.href.startsWith("https://")
            ? [{ name: messages[link.labelKey], href: link.href }]
            : []
        ),
      ],
    }),
    { headers: { "Content-Type": "text/plain; charset=utf-8" } }
  );
