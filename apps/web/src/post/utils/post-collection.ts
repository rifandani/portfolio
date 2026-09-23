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
