import { notFound } from "next/navigation";

import { getPost, getPosts } from "@/features/post/services/posts";
import {
  I18N_DEFAULT_LOCALE,
  I18N_LOCALES,
  isI18NLocale,
} from "@/shared/constants/i18n";

/**
 * The Post Markdown of one Post Translation as plain text. Readers and
 * Assistants reach it at `/posts/{slug}.md` (English) or
 * `/posts/{slug}.{locale}.md`: rewrites in `next.config.ts` send those URLs
 * here, because the `[slug]` page would take `{slug}.md` as a Slug. It is
 * prerendered, so it never reads the Locale cookie (ADR-0004).
 */
export const dynamicParams = false;

// fallow-ignore-next-line unused-export -- Next.js reads it from a route handler to prerender each Slug and Locale
export const generateStaticParams = () =>
  getPosts(I18N_DEFAULT_LOCALE).flatMap((post) =>
    I18N_LOCALES.map((locale) => ({ slug: post.slug, locale }))
  );

export const GET = async (
  _request: Request,
  { params }: RouteContext<"/posts/[slug]/markdown/[locale]">
) => {
  const { slug, locale } = await params;
  const post = (isI18NLocale(locale) && getPost(slug, locale)) || notFound();
  return new Response(post.markdown, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
