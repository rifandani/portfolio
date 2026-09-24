import { notFound } from "next/navigation";

import { getProject, getProjects } from "@/project/services/projects";

/**
 * The Project Markdown as plain text. Readers and Assistants reach it at
 * `/projects/{slug}.md`: a rewrite in `next.config.ts` sends that URL here,
 * because the `[slug]` page would take `{slug}.md` as a Slug (ADR-0004).
 */
export const dynamicParams = false;

// fallow-ignore-next-line unused-export -- Next.js reads it from a route handler to prerender each Slug
export const generateStaticParams = () =>
  getProjects().map((project) => ({ slug: project.slug }));

export const GET = async (
  _request: Request,
  { params }: RouteContext<"/projects/[slug]/markdown">
) => {
  const { slug } = await params;
  const project = getProject(slug) ?? notFound();
  return new Response(project.markdown, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
