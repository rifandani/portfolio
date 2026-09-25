import { getTranslations } from "next-intl/server";

import {
  HomeSection,
  HomeSectionEmpty,
} from "@/core/components/home/home-section";
import { Link } from "@/core/components/ui/link";
import { ProjectCard } from "@/project/components/project-card";
import { getProjects } from "@/project/services/projects";

const HOME_PREVIEW_COUNT = 3;

export const HomeProjects = async () => {
  const t = await getTranslations();
  const allProjects = getProjects();
  const projects = allProjects.slice(0, HOME_PREVIEW_COUNT);
  return (
    <HomeSection
      id="home-projects-heading"
      title={t("homeProjects")}
      action={
        <Link
          href="/projects"
          className="text-muted-fg hover:text-fg shrink-0 text-sm/6"
        >
          {t("homeAllProjects")}
        </Link>
      }
    >
      {projects.length === 0 ? (
        <HomeSectionEmpty>{t("homeNoProjects")}</HomeSectionEmpty>
      ) : (
        projects.map((project, index) => (
          <li key={project.slug}>
            <ProjectCard
              project={project}
              index={index + 1}
              total={allProjects.length}
            />
          </li>
        ))
      )}
    </HomeSection>
  );
};
