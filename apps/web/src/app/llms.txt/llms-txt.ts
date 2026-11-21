import { postMarkdownPath } from "@/features/post/utils/slug";
import { projectMarkdownPath } from "@/features/project/utils/project-path";
import {
  I18N_DEFAULT_LOCALE,
  I18N_LOCALE_NAMES,
  I18N_TRANSLATED_LOCALES,
} from "@/shared/constants/i18n";

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
  projects: readonly { slug: string; title: string; description: string }[];
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
 * and Project links go to their Markdown, because an agent reads it better
 * than HTML.
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
      "Every Post and Project has a Markdown version: add `.md` to its URL (`/posts/<slug>` → `/posts/<slug>.md`, `/projects/<slug>` → `/projects/<slug>.md`). Every Post also has an Indonesian Markdown version at `/posts/<slug>.id.md`. The Post and Project links below go to the Markdown version.",
    ].join("\n"),
    ...section(baseUrl, "Pages", pages),
    ...section(
      baseUrl,
      "Posts",
      // Each Post Translation follows its English Post (ADR-0004).
      posts.flatMap((post) => [
        {
          name: post.title,
          href: postMarkdownPath(post.slug, I18N_DEFAULT_LOCALE),
          note: post.summary,
        },
        ...I18N_TRANSLATED_LOCALES.map((locale) => ({
          name: `${post.title} (${I18N_LOCALE_NAMES[locale]})`,
          href: postMarkdownPath(post.slug, locale),
          note: `The same Post in ${I18N_LOCALE_NAMES[locale]}`,
        })),
      ])
    ),
    ...section(
      baseUrl,
      "Projects",
      projects.map((project) => ({
        name: project.title,
        href: projectMarkdownPath(project.slug),
        note: project.description,
      }))
    ),
    ...section(baseUrl, "Optional", optional),
  ];
  return `${blocks.join("\n\n")}\n`;
};
