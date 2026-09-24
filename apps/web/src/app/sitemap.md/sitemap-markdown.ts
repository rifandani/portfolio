import type { Post } from "@/post/utils/post-source";
import { postMarkdownPath, postPath } from "@/post/utils/slug";
import { projectMarkdownPath, projectPath } from "@/project/utils/project-path";
import type { Project } from "@/project/utils/project-source";

interface SitemapMarkdownInput {
  appTitle: string;
  appUrl: string;
  pageRoutes: readonly string[];
  posts: readonly Pick<Post, "slug" | "title" | "summary" | "publishedAt">[];
  projects: readonly Pick<Project, "slug" | "title" | "description">[];
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
 * The sitemap as Markdown, for readers and Assistants: each public page, each
 * Post, and each Project, with a link to the Markdown of each Post and Project.
 */
export const sitemapMarkdown = ({
  appTitle,
  appUrl,
  pageRoutes,
  posts,
  projects,
}: SitemapMarkdownInput) => {
  const url = (route: string) => new URL(route, appUrl).href;
  const postLines =
    posts.length > 0
      ? posts.map(
          (post) =>
            `- [${escapeLinkText(post.title)}](${url(postPath(post.slug))}) — ${post.summary} (${post.publishedAt}) · [Markdown](${url(postMarkdownPath(post.slug))})`
        )
      : ["No posts yet."];
  const projectLines =
    projects.length > 0
      ? projects.map(
          (project) =>
            `- [${escapeLinkText(project.title)}](${url(projectPath(project.slug))}) — ${project.description} · [Markdown](${url(projectMarkdownPath(project.slug))})`
        )
      : ["No projects yet."];
  return [
    `# ${appTitle} sitemap`,
    "",
    "Every public page of this site. Each post and project is also available as plain Markdown: add `.md` to its URL.",
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
    "## Projects",
    "",
    ...projectLines,
    "",
  ].join("\n");
};
