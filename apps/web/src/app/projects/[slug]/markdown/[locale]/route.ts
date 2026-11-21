import { notFound } from "next/navigation";

import { getProject, getProjects } from "@/features/project/services/projects";
import {
  I18N_DEFAULT_LOCALE,
  I18N_LOCALES,
  isI18NLocale,
} from "@/shared/constants/i18n";

/**
 * The Project Markdown of one Project Translation as plain text. Readers and
 * Assistants reach it at `/projects/{slug}.md` (English) or
 * `/projects/{slug}.{locale}.md`: rewrites in `next.config.ts` send those URLs
 * here, because the `[slug]` page would take `{slug}.md` as a Slug. It is
 * prerendered, so it never reads the Locale cookie (ADR-0004).
 */
export const dynamicParams = false;

// fallow-ignore-next-line unused-export -- Next.js reads it from a route handler to prerender each Slug and Locale
export const generateStaticParams = () =>
  getProjects(I18N_DEFAULT_LOCALE).flatMap((project) =>
    I18N_LOCALES.map((locale) => ({ slug: project.slug, locale }))
  );

export const GET = async (
  _request: Request,
  { params }: RouteContext<"/projects/[slug]/markdown/[locale]">
) => {
  const { slug, locale } = await params;
  const project =
    (isI18NLocale(locale) && getProject(slug, locale)) || notFound();
  return new Response(project.markdown, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
