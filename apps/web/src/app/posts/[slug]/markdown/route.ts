import { notFound } from "next/navigation";

import { getPost, getPosts } from "@/post/services/posts";

/**
 * The Post Markdown as plain text. Readers and Assistants reach it at
 * `/posts/{slug}.md`: a rewrite in `next.config.ts` sends that URL here,
 * because the `[slug]` page would take `{slug}.md` as a Slug (ADR-0004).
 */
export const dynamicParams = false;

// fallow-ignore-next-line unused-export -- Next.js reads it from a route handler to prerender each Slug
export const generateStaticParams = () =>
  getPosts().map((post) => ({ slug: post.slug }));

export const GET = async (
  _request: Request,
  { params }: RouteContext<"/posts/[slug]/markdown">
) => {
  const { slug } = await params;
  const post = getPost(slug) ?? notFound();
  return new Response(post.markdown, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
