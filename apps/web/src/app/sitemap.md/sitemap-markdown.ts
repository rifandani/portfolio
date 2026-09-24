import type { Post } from "@/post/utils/post-source";
import { postMarkdownPath, postPath } from "@/post/utils/slug";

interface SitemapMarkdownInput {
  appTitle: string;
  appUrl: string;
  pageRoutes: readonly string[];
  posts: readonly Pick<Post, "slug" | "title" | "summary" | "publishedAt">[];
}

/** Link text ends at the first `]`, so a title like "[Synthetic] …" must escape it. */
const escapeLinkText = (text: string) => text.replaceAll(/[\\[\]]/gu, "\\$&");

const capitalize = (word: string) =>
  word.charAt(0).toUpperCase() + word.slice(1);

/** `/` is Home; other routes are named from their segments: `/about` → "About". */
const pageName = (route: string) =>
  route === "/"
    ? "Home"
    : route
        .split("/")
        .filter(Boolean)
        .map((segment) => capitalize(segment.replaceAll("-", " ")))
        .join(" / ");

/**
 * The sitemap as Markdown, for readers and Assistants: each public page and
 * each Post, with a link to the Post Markdown of each Post.
 */
export const sitemapMarkdown = ({
  appTitle,
  appUrl,
  pageRoutes,
  posts,
}: SitemapMarkdownInput) => {
  const url = (route: string) => new URL(route, appUrl).href;
  const postLines =
    posts.length > 0
      ? posts.map(
          (post) =>
            `- [${escapeLinkText(post.title)}](${url(postPath(post.slug))}) — ${post.summary} (${post.publishedAt}) · [Markdown](${url(postMarkdownPath(post.slug))})`
        )
      : ["No posts yet."];
  return [
    `# ${appTitle} sitemap`,
    "",
    "Every public page of this site. Each post is also available as plain Markdown: add `.md` to its URL.",
    "",
    "## Discovery",
    "",
    `- [/sitemap.xml](${url("/sitemap.xml")}) — XML sitemap for crawlers`,
    `- [/sitemap.md](${url("/sitemap.md")}) — this Markdown sitemap`,
    `- [/rss.xml](${url("/rss.xml")}) — RSS feed of every Post`,
    `- [/robots.txt](${url("/robots.txt")}) — crawler rules`,
    "",
    "## Pages",
    "",
    ...pageRoutes.map((route) => `- [${pageName(route)}](${url(route)})`),
    "",
    "## Posts",
    "",
    ...postLines,
    "",
  ].join("\n");
};
