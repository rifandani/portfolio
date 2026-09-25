import type { CollectionPage, CreativeWork } from "schema-dts";

import {
  absoluteUrl,
  CONTENT_LANGUAGE,
  ogCardUrl,
  personRef,
  webSiteRef,
} from "@/core/utils/seo";
import { projectLinksOf } from "@/project/utils/project-links";
import { projectPath } from "@/project/utils/project-path";
import type { Project } from "@/project/utils/project-source";

type ProjectFacts = Pick<Project, "slug" | "title" | "description" | "tags"> &
  Partial<Pick<Project, "demoUrl" | "githubUrl">>;

const COLLECTION_PATH = "/projects";

/**
 * The Project on its Project Detail. A `CreativeWork`, not a
 * `SoftwareApplication`: Google wants ratings or offers for that type, and a
 * Project has neither. The Project Links go in `sameAs`.
 */
export const createProjectCreativeWork = (
  project: ProjectFacts
): CreativeWork => {
  const url = absoluteUrl(projectPath(project.slug));
  const links = projectLinksOf(project);
  return {
    "@type": "CreativeWork",
    "@id": `${url}#project`,
    url,
    mainEntityOfPage: url,
    name: project.title,
    description: project.description,
    image: ogCardUrl({ kind: "project", slug: project.slug }),
    keywords: project.tags.join(", "),
    inLanguage: CONTENT_LANGUAGE,
    author: personRef,
    ...(links.length > 0 && { sameAs: links.map((link) => link.href) }),
  };
};

/** The projects index: one list of the Projects, in Project Order. */
export const createProjectCollection = ({
  title,
  description,
  projects,
}: {
  title: string;
  description: string;
  projects: readonly ProjectFacts[];
}): CollectionPage => {
  const url = absoluteUrl(COLLECTION_PATH);
  return {
    "@type": "CollectionPage",
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    isPartOf: webSiteRef,
    author: personRef,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: project.title,
        url: absoluteUrl(projectPath(project.slug)),
      })),
    },
  };
};
