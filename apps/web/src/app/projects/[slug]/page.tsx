import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { BreadcrumbList, CreativeWork } from "schema-dts";

import { DetailBreadcrumbs } from "@/core/components/detail-breadcrumbs";
import { SiteContainer } from "@/core/components/site-container";
import { SiteShell } from "@/core/components/site-shell";
import { Heading } from "@/core/components/ui/heading";
import { ENV } from "@/core/constants/env";
import { createMetadata, JsonLd } from "@/core/utils/seo";
import { PreviewMorph } from "@/portfolio/components/preview-morph";
import { portfolioIdentity } from "@/portfolio/constants/portfolio";
import { PageActions } from "@/post/components/page-actions.client";
import { PostDocument } from "@/post/components/post-document";
import { PostOutline } from "@/post/components/post-outline.client";
import { ShareActions } from "@/post/components/share-actions.client";
import { outlineOf, POST_TITLE_ID } from "@/post/utils/post-outline";
import { ProjectLinkButtons } from "@/project/components/project-link-buttons.client";
import { ProjectMeta } from "@/project/components/project-meta";
import { ProjectPager } from "@/project/components/project-pager";
import { getProject, getProjects } from "@/project/services/projects";
import { adjacentProjects } from "@/project/utils/project-collection";
import { projectLinksOf } from "@/project/utils/project-links";
import { projectMarkdownPath, projectPath } from "@/project/utils/project-path";

/** Every Slug is known at build time; any other Slug is a 404. */
export const dynamicParams = false;

export const generateStaticParams = () =>
  getProjects().map((project) => ({ slug: project.slug }));

/** Absolute, because an Assistant fetches it from outside the site. */
const markdownUrlOf = (slug: string) =>
  new URL(projectMarkdownPath(slug), ENV.NEXT_PUBLIC_APP_URL).href;

const findProject = async (params: PageProps<"/projects/[slug]">["params"]) => {
  const { slug } = await params;
  return getProject(slug) ?? notFound();
};

export const generateMetadata = async ({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> => {
  const project = await findProject(params);
  return createMetadata({
    title: project.title,
    card: { kind: "project", slug: project.slug },
    description: project.description,
    alternates: { types: { "text/markdown": markdownUrlOf(project.slug) } },
  });
};

/**
 * The Project Detail. It has the form of the Post Detail, but the Meta line
 * shows the tags of the Project, not a publish date and a reading time. The
 * Project Links show as buttons under the description, so a visitor can open
 * the Project at once.
 */
export default async function ProjectDetailPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const [t, project] = await Promise.all([
    getTranslations(),
    findProject(params),
  ]);
  const { previous, next } = adjacentProjects(getProjects(), project.slug);
  const url = new URL(projectPath(project.slug), ENV.NEXT_PUBLIC_APP_URL).href;
  const links = projectLinksOf(project);
  const creativeWork: CreativeWork = {
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    keywords: project.tags.join(", "),
    url,
    ...(links.length > 0 && { sameAs: links.map((link) => link.href) }),
    author: { "@type": "Person", name: portfolioIdentity.fullName },
  };
  const breadcrumbList: BreadcrumbList = {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        name: t("siteNavProjects"),
        item: new URL("/projects", ENV.NEXT_PUBLIC_APP_URL).href,
      },
      { name: project.title, item: url },
    ].map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      ...crumb,
    })),
  };
  const outline = outlineOf(project.document);
  return (
    <SiteShell>
      <JsonLd graphs={[creativeWork, breadcrumbList]} />
      <SiteContainer className="py-16 sm:py-24">
        <article>
          <DetailBreadcrumbs parent="/projects" title={project.title} />
          <header className="mt-6">
            <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
              <ProjectMeta project={project} />
              <div className="flex flex-wrap items-center gap-2">
                <ShareActions url={url} title={project.title} />
                <PageActions
                  markdown={project.markdown}
                  markdownUrl={markdownUrlOf(project.slug)}
                />
              </div>
            </div>
            <Heading
              level={1}
              id={POST_TITLE_ID}
              className="mt-6 scroll-mt-20 text-3xl/10 outline-none sm:text-4xl/12"
            >
              {project.title}
            </Heading>
            <p className="text-muted-fg mt-4 text-lg/8 text-pretty">
              {project.description}
            </p>
            {links.length > 0 && (
              <ProjectLinkButtons links={links} className="mt-6" />
            )}
            <PreviewMorph kind="project" slug={project.slug}>
              <Image
                src={project.previewSrc}
                alt={project.previewAlt}
                width={1200}
                height={630}
                className="border-border mt-8 aspect-1200/630 w-full rounded-lg border object-cover"
                priority
                unoptimized
              />
            </PreviewMorph>
          </header>
          <div className="mt-10 lg:grid lg:grid-cols-[minmax(0,1fr)_13rem] lg:gap-16">
            {outline.length > 0 && (
              <PostOutline
                entries={[
                  { id: POST_TITLE_ID, text: project.title, level: 2 },
                  ...outline,
                ]}
                className="mb-10 lg:order-last lg:mb-0"
              />
            )}
            <PostDocument document={project.document} />
          </div>
        </article>
        <ProjectPager previous={previous} next={next} className="mt-24" />
      </SiteContainer>
    </SiteShell>
  );
}
