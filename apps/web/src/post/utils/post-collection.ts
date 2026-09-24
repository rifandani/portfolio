import { parsePostSource } from "@/post/utils/post-source";
import type { Post, PostSourceFile } from "@/post/utils/post-source";

/**
 * Parse every Post Source into Posts, most recent first. Throws when two
 * Post Sources claim the same Slug, as a silent suffix would change a URL
 * (ADR-0005).
 */
export const collectPosts = (files: readonly PostSourceFile[]): Post[] => {
  const pathBySlug = new Map<string, string>();
  const posts = files.map((file) => {
    const post = parsePostSource(file);
    const claimedBy = pathBySlug.get(post.slug);
    if (claimedBy) {
      throw new Error(
        `Duplicate Slug "${post.slug}" in ${claimedBy} and ${file.path}`
      );
    }
    pathBySlug.set(post.slug, file.path);
    return post;
  });
  return posts.toSorted(
    (a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt)
  );
};

/** The Posts beside one Post in publish order, as the Post Pager shows them. */
export interface AdjacentPosts<TPost> {
  /** Published just before. */
  previous?: TPost;
  /** Published just after. */
  next?: TPost;
}

/**
 * The Posts beside one Post in publish order, for the Post Pager. `posts` is
 * the `collectPosts` order (most recent first), so the previous Post — the one
 * published just before — comes after it, and the next Post comes before it.
 */
export const adjacentPosts = <TPost extends Pick<Post, "slug">>(
  posts: readonly TPost[],
  slug: string
): AdjacentPosts<TPost> => {
  const index = posts.findIndex((post) => post.slug === slug);
  if (index === -1) {
    return {};
  }
  return { previous: posts[index + 1], next: posts[index - 1] };
};

/** The Posts of one publish year, as the posts index files them. */
export interface PostYear<TPost> {
  /** Four digits, read from the ISO date, so no time zone can move a Post. */
  year: string;
  posts: TPost[];
}

/**
 * File Posts under their publish year. `posts` is the `collectPosts` order
 * (most recent first), so the years come out newest first and each year keeps
 * that order inside it.
 */
export const postsByYear = <TPost extends Pick<Post, "publishedAt">>(
  posts: readonly TPost[]
): PostYear<TPost>[] => {
  const years: PostYear<TPost>[] = [];
  for (const post of posts) {
    const year = post.publishedAt.slice(0, 4);
    const last = years.at(-1);
    if (last?.year === year) {
      last.posts.push(post);
    } else {
      years.push({ year, posts: [post] });
    }
  }
  return years;
};
