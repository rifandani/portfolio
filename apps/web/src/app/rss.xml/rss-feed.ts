import type { Post } from "@/post/utils/post-source";
import { postPath } from "@/post/utils/slug";

export interface RssFeedInput {
  /** The site origin that every site path resolves against. */
  appUrl: string;
  title: string;
  description: string;
  /** The person who holds the copyright of the Posts. */
  author: string;
  copyrightYear: number;
  /** Most recent first, as `getPosts` returns them. */
  posts: readonly Pick<Post, "slug" | "title" | "summary" | "publishedAt">[];
}

const XML_ESCAPES = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&apos;",
} as const;
type XmlUnsafeChar = keyof typeof XML_ESCAPES;
const XML_UNSAFE = /[&<>"']/gu;

/**
 * Escape text for an element or an attribute. Not CDATA: a CDATA section ends
 * at the first `]]>`, so a title could close it.
 */
const escapeXml = (text: string) =>
  // SAFETY: `XML_UNSAFE` only matches the characters keyed in XML_ESCAPES.
  text.replace(XML_UNSAFE, (char) => XML_ESCAPES[char as XmlUnsafeChar]);

/** RSS 2.0 wants an RFC 822 date. A Post has only a day, so use its UTC midnight. */
const rfc822 = (isoDate: string) =>
  new Date(`${isoDate}T00:00:00Z`).toUTCString();

const element = (name: string, text: string) =>
  `<${name}>${escapeXml(text)}</${name}>`;

/**
 * The site's `/rss.xml`, an RSS 2.0 feed of every Post. `lastBuildDate` is the
 * date of the newest Post, not the build time: the build time would change on
 * each deploy, and a reader would see a change that is not there.
 */
export const buildRssFeed = ({
  appUrl,
  title,
  description,
  author,
  copyrightYear,
  posts,
}: RssFeedInput) => {
  const url = (route: string) => new URL(route, appUrl).href;
  const [newest] = posts;
  const items = posts.map((post) => {
    const link = url(postPath(post.slug));
    return [
      "    <item>",
      `      ${element("title", post.title)}`,
      `      ${element("link", link)}`,
      `      <guid isPermaLink="true">${escapeXml(link)}</guid>`,
      `      ${element("pubDate", rfc822(post.publishedAt))}`,
      `      ${element("description", post.summary)}`,
      "    </item>",
    ].join("\n");
  });
  return [
    '<?xml version="1.0" encoding="utf-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    `    ${element("title", title)}`,
    `    ${element("link", url("/"))}`,
    `    ${element("description", description)}`,
    ...(newest
      ? [`    ${element("lastBuildDate", rfc822(newest.publishedAt))}`]
      : []),
    `    ${element("docs", "https://www.rssboard.org/rss-specification")}`,
    `    ${element("language", "en")}`,
    `    ${element("copyright", `Copyright © ${copyrightYear} ${author}`)}`,
    `    <atom:link href="${escapeXml(url("/rss.xml"))}" rel="self" type="application/rss+xml"/>`,
    ...items,
    "  </channel>",
    "</rss>",
    "",
  ].join("\n");
};
