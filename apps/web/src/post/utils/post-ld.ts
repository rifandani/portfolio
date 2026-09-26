import type { Blog, BlogPosting } from "schema-dts";

import {
  absoluteUrl,
  CONTENT_LANGUAGE,
  ogCardUrl,
  personRef,
  webSiteRef,
} from "@/core/utils/seo";
import type { Post } from "@/post/utils/post-source";
import { postPath } from "@/post/utils/slug";

type PostFacts = Pick<
  Post,
  "slug" | "title" | "summary" | "publishedAt" | "updatedAt"
>;

const BLOG_PATH = "/posts";
const blogRef = { "@id": absoluteUrl(`${BLOG_PATH}#blog`) } as const;

const postingIdOf = (url: string) => `${url}#post`;

/** The Post on its Post Detail. `image` is its OG Card, a crawlable PNG. */
export const createBlogPosting = (post: PostFacts): BlogPosting => {
  const url = absoluteUrl(postPath(post.slug));
  return {
    "@type": "BlogPosting",
    "@id": postingIdOf(url),
    url,
    mainEntityOfPage: url,
    headline: post.title,
    description: post.summary,
    image: ogCardUrl({ kind: "post", slug: post.slug }),
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    inLanguage: CONTENT_LANGUAGE,
    author: personRef,
    publisher: personRef,
    isPartOf: blogRef,
  };
};

/**
 * The posts index as one Blog. Each entry names its Post by the same `@id` as
 * the Post Detail, so a crawler joins the two.
 */
export const createBlog = ({
  title,
  description,
  posts,
}: {
  title: string;
  description: string;
  posts: readonly PostFacts[];
}): Blog => ({
  "@type": "Blog",
  ...blogRef,
  url: absoluteUrl(BLOG_PATH),
  name: title,
  description,
  inLanguage: CONTENT_LANGUAGE,
  author: personRef,
  publisher: personRef,
  isPartOf: webSiteRef,
  blogPost: posts.map((post) => {
    const url = absoluteUrl(postPath(post.slug));
    return {
      "@type": "BlogPosting",
      "@id": postingIdOf(url),
      url,
      headline: post.title,
      datePublished: post.publishedAt,
    };
  }),
});
