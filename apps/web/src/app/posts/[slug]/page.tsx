import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import type { BlogPosting } from "schema-dts";

import { SiteContainer } from "@/core/components/site-container";
import { SiteShell } from "@/core/components/site-shell";
import { Heading } from "@/core/components/ui/heading";
import { Link } from "@/core/components/ui/link";
import { Text } from "@/core/components/ui/text";
import { ENV } from "@/core/constants/env";
import { createMetadata, JsonLd } from "@/core/utils/seo";
import { portfolioIdentity } from "@/portfolio/constants/portfolio";
import { PageActions } from "@/post/components/page-actions.client";
import { PostDocument } from "@/post/components/post-document";
import { PostMeta } from "@/post/components/post-meta";
import { getPost, getPosts } from "@/post/services/posts";
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
  const blogPosting: BlogPosting = {
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary,
    datePublished: post.publishedAt,
    url: new URL(postPath(post.slug), ENV.NEXT_PUBLIC_APP_URL).href,
    author: { "@type": "Person", name: portfolioIdentity.fullName },
  };
  return (
    <SiteShell>
      <JsonLd graphs={[blogPosting]} />
      <SiteContainer className="py-16 sm:py-24">
        <article>
          <Link href="/posts" className="text-primary-subtle-fg text-sm/6">
            {t("homeAllPosts")}
          </Link>
          <header className="mt-6">
            <Heading level={1} className="text-3xl/10 sm:text-4xl/12">
              {post.title}
            </Heading>
            <Text className="mt-4 max-w-prose text-base/7 text-pretty">
              {post.summary}
            </Text>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
              <PostMeta post={post} />
              <PageActions
                markdown={post.markdown}
                markdownUrl={markdownUrlOf(post.slug)}
              />
            </div>
          </header>
          <div className="mt-10">
            <PostDocument document={post.document} />
          </div>
        </article>
      </SiteContainer>
    </SiteShell>
  );
}
