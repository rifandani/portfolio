import { getTranslations } from "next-intl/server";

import { ContentPager } from "@/portfolio/components/content-pager";
import type { PagerSide } from "@/portfolio/components/content-pager";
import { ProjectMeta } from "@/project/components/project-meta";
import { projectPath } from "@/project/utils/project-path";
import type { Project } from "@/project/utils/project-source";

type PagerProject = Pick<Project, "slug" | "title" | "tags">;

const sideOf = (project: PagerProject, label: string): PagerSide => ({
  href: projectPath(project.slug),
  title: project.title,
  label,
  meta: <ProjectMeta project={project} className="mt-1" />,
});

/**
 * The Project Pager at the end of a Project Detail. Previous is the Project
 * just before this one in list order and next is the one just after, so the
 * first Project has no previous and the last has no next.
 */
export const ProjectPager = async ({
  previous,
  next,
  className,
}: {
  previous?: PagerProject;
  next?: PagerProject;
  className?: string;
}) => {
  if (!previous && !next) {
    return null;
  }
  const t = await getTranslations();
  return (
    <ContentPager
      label={t("projectPager")}
      previous={previous && sideOf(previous, t("projectPrevious"))}
      next={next && sideOf(next, t("projectNext"))}
      className={className}
    />
  );
};
