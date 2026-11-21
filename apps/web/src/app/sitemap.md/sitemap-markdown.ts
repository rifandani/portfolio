import type { Post } from "@/features/post/utils/post-source";
import { postMarkdownPath, postPath } from "@/features/post/utils/slug";
import {
  projectMarkdownPath,
  projectPath,
} from "@/features/project/utils/project-path";
import type { Project } from "@/features/project/utils/project-source";
import type { I18NLocale } from "@/shared/constants/i18n";
import {
  I18N_DEFAULT_LOCALE,
  I18N_LOCALE_NAMES,
  I18N_TRANSLATED_LOCALES,
} from "@/shared/constants/i18n";

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

/** `/` is Home; `/cv` is an initialism; other routes use their segments. */
const pageName = (route: string) => {
  if (route === "/cv") {
    return "CV";
  }
  if (route === "/") {
    return "Home";
  }
  return route
    .split("/")
    .filter(Boolean)
    .map((segment) => capitalize(segment.replaceAll("-", " ")))
    .join(" / ");
};

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
  // Each Post and Project Translation has its own Markdown (ADR-0004).
  const translationLinks = (
    slug: string,
    markdownPath: (slug: string, locale: I18NLocale) => string
  ) =>
    I18N_TRANSLATED_LOCALES.map(
      (locale) =>
        ` · [Markdown (${I18N_LOCALE_NAMES[locale]})](${url(markdownPath(slug, locale))})`
    ).join("");
  const postLines =
    posts.length > 0
      ? posts.map(
          (post) =>
            `- [${escapeLinkText(post.title)}](${url(postPath(post.slug))}) — ${post.summary} (${post.publishedAt}) · [Markdown](${url(postMarkdownPath(post.slug, I18N_DEFAULT_LOCALE))})${translationLinks(post.slug, postMarkdownPath)}`
        )
      : ["No posts yet."];
  const projectLines =
    projects.length > 0
      ? projects.map(
          (project) =>
            `- [${escapeLinkText(project.title)}](${url(projectPath(project.slug))}) — ${project.description} · [Markdown](${url(projectMarkdownPath(project.slug, I18N_DEFAULT_LOCALE))})${translationLinks(project.slug, projectMarkdownPath)}`
        )
      : ["No projects yet."];
  return [
    `# ${appTitle} sitemap`,
    "",
    "Every public page of this site. Each post and project is also available as plain Markdown: add `.md` to its URL. Each post and project is also in Indonesian: add `.id.md` to its URL.",
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
