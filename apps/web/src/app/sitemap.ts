import type { MetadataRoute } from "next";

import { pageRoutes } from "@/app/page-routes";
import { ENV } from "@/core/constants/env";
import { getPosts } from "@/post/services/posts";
import { postPath } from "@/post/utils/slug";
import { getProjects } from "@/project/services/projects";
import { projectPath } from "@/project/utils/project-path";

const absoluteUrl = (route: string) =>
  new URL(route, ENV.NEXT_PUBLIC_APP_URL).href;

/**
 * Only a Post has a real date: its last update, or its publish date. A page or a Project gets no `lastModified`: the
 * build time would change on each deploy, and crawlers learn to ignore a
 * `lastmod` that is always new.
 */
const sitemap = (): MetadataRoute.Sitemap => [
  ...pageRoutes().map((route) => ({ url: absoluteUrl(route) })),
  ...getPosts().map((post) => ({
    lastModified: post.updatedAt,
    url: absoluteUrl(postPath(post.slug)),
  })),
  ...getProjects().map((project) => ({
    url: absoluteUrl(projectPath(project.slug)),
  })),
];
export default sitemap;
