import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { BlogPosting, BreadcrumbList } from "schema-dts";

import { SiteContainer } from "@/core/components/site-container";
import { SiteShell } from "@/core/components/site-shell";
import { Heading } from "@/core/components/ui/heading";
import { ENV } from "@/core/constants/env";
import { createMetadata, JsonLd } from "@/core/utils/seo";
import { portfolioIdentity } from "@/portfolio/constants/portfolio";
import { PageActions } from "@/post/components/page-actions.client";
import { PostBreadcrumbs } from "@/post/components/post-breadcrumbs";
import { PostDocument } from "@/post/components/post-document";
import { PostMeta } from "@/post/components/post-meta";
import { PostOutline } from "@/post/components/post-outline.client";
import { PostPager } from "@/post/components/post-pager";
import { ShareActions } from "@/post/components/share-actions.client";
import { getPost, getPosts } from "@/post/services/posts";
import { adjacentPosts } from "@/post/utils/post-collection";
import { outlineOf, POST_TITLE_ID } from "@/post/utils/post-outline";
import { postMarkdownPath, postPath } from "@/post/utils/slug";

/** Every Slug is known at build time; any other Slug is a 404. */
export const dynamicParams = false;

export const generateStaticParams = () =>
  getPosts().map((post) => ({ slug: post.slug }));

/** Absolute, because an Assistant fetches it from outside the site. */
const markdownUrlOf = (slug: string) =>
  new URL(postMarkdownPath(slug), ENV.NEXT_PUBLIC_APP_URL).href;

const findPost = async (params: PageProps<"/posts/[slug]">["params"]) => {
  const { slug } = await params;
  return getPost(slug) ?? notFound();
};

export const generateMetadata = async ({
  params,
}: PageProps<"/posts/[slug]">): Promise<Metadata> => {
  const post = await findPost(params);
  return createMetadata({
    title: post.title,
    description: post.summary,
    openGraph: { type: "article", publishedTime: post.publishedAt },
    alternates: { types: { "text/markdown": markdownUrlOf(post.slug) } },
  });
};

export default async function PostDetailPage({
  params,
}: PageProps<"/posts/[slug]">) {
  const [t, post] = await Promise.all([getTranslations(), findPost(params)]);
  const { previous, next } = adjacentPosts(getPosts(), post.slug);
  const url = new URL(postPath(post.slug), ENV.NEXT_PUBLIC_APP_URL).href;
  const blogPosting: BlogPosting = {
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary,
    datePublished: post.publishedAt,
    url,
    author: { "@type": "Person", name: portfolioIdentity.fullName },
  };
  const breadcrumbList: BreadcrumbList = {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        name: t("siteNavPosts"),
        item: new URL("/posts", ENV.NEXT_PUBLIC_APP_URL).href,
      },
      { name: post.title, item: url },
    ].map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      ...crumb,
    })),
  };
  const outline = outlineOf(post.document);
  return (
    <SiteShell>
      <JsonLd graphs={[blogPosting, breadcrumbList]} />
      <SiteContainer className="py-16 sm:py-24">
        <article>
          <PostBreadcrumbs title={post.title} />
          <header className="mt-6">
            <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
              <PostMeta post={post} />
              <div className="flex flex-wrap items-center gap-2">
                <ShareActions url={url} title={post.title} />
                <PageActions
                  markdown={post.markdown}
                  markdownUrl={markdownUrlOf(post.slug)}
                />
              </div>
            </div>
            <Heading
              level={1}
              id={POST_TITLE_ID}
              className="mt-6 scroll-mt-20 text-3xl/10 outline-none sm:text-4xl/12"
            >
              {post.title}
            </Heading>
            <p className="text-muted-fg mt-4 text-lg/8 text-pretty">
              {post.summary}
            </p>
            <Image
              src={post.ogImageSrc}
              alt={post.ogImageAlt}
              width={1200}
              height={630}
              className="border-border mt-8 aspect-1200/630 w-full rounded-lg border object-cover"
              priority
              unoptimized
            />
          </header>
          <div className="mt-10 lg:grid lg:grid-cols-[minmax(0,1fr)_13rem] lg:gap-16">
            {outline.length > 0 && (
              <PostOutline
                entries={[
                  { id: POST_TITLE_ID, text: post.title, level: 2 },
                  ...outline,
                ]}
                className="mb-10 lg:order-last lg:mb-0"
              />
            )}
            <PostDocument document={post.document} />
          </div>
        </article>
        <PostPager previous={previous} next={next} className="mt-24" />
      </SiteContainer>
    </SiteShell>
  );
}
