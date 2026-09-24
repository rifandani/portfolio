import { postMarkdownPath } from "@/post/utils/slug";

/** One entry of an llms.txt file list: a link and an optional note. */
interface LlmsTxtLink {
  name: string;
  /** A site path (`/about`) or an absolute URL. */
  href: string;
  note?: string;
}

export interface LlmsTxtInput {
  /** The site origin that every site path resolves against. */
  baseUrl: string;
  /** The H1: the only required part of an llms.txt file. */
  name: string;
  /** The blockquote summary. */
  headline: string;
  /** Prose after the blockquote. */
  summary: string;
  pages: readonly LlmsTxtLink[];
  posts: readonly { slug: string; title: string; summary: string }[];
  projects: readonly { title: string; description: string; href: string }[];
  /** Secondary links an agent can skip when it needs a shorter context. */
  optional: readonly LlmsTxtLink[];
}

/** Link text ends at the first `]`, so a title like "[Synthetic] …" must escape it. */
const escapeLinkText = (text: string) => text.replaceAll(/[\\[\]]/gu, "\\$&");

const listItem = (baseUrl: string, { name, href, note }: LlmsTxtLink) => {
  const link = `- [${escapeLinkText(name)}](${new URL(href, baseUrl).href})`;
  return note ? `${link}: ${note}` : link;
};

/** An H2 file list. A section with no links is left out. */
const section = (
  baseUrl: string,
  heading: string,
  links: readonly LlmsTxtLink[]
) =>
  links.length > 0
    ? [`## ${heading}`, links.map((link) => listItem(baseUrl, link)).join("\n")]
    : [];

/**
 * The site's `/llms.txt`, in the format of https://llmstxt.org: an H1, a
 * blockquote summary, prose, and H2 file lists, with `Optional` last. Post
 * links go to the Post Markdown, because an agent reads it better than HTML.
 */
export const buildLlmsTxt = ({
  baseUrl,
  name,
  headline,
  summary,
  pages,
  posts,
  projects,
  optional,
}: LlmsTxtInput) => {
  const { origin } = new URL(baseUrl);
  const blocks = [
    `# ${name}`,
    `> ${headline}`,
    summary,
    [
      `Base URL: ${origin}`,
      "",
      "Every Post has a Markdown version: add `.md` to its URL (`/posts/<slug>` → `/posts/<slug>.md`). The Post links below go to the Markdown version.",
    ].join("\n"),
    ...section(baseUrl, "Pages", pages),
    ...section(
      baseUrl,
      "Posts",
      posts.map((post) => ({
        name: post.title,
        href: postMarkdownPath(post.slug),
        note: post.summary,
      }))
    ),
    ...section(
      baseUrl,
      "Projects",
      projects.map((project) => ({
        name: project.title,
        href: project.href,
        note: project.description,
      }))
    ),
    ...section(baseUrl, "Optional", optional),
  ];
  return `${blocks.join("\n\n")}\n`;
};
