import { getTranslations } from "next-intl/server";

import { SiteContainer } from "@/core/components/site-container";
import { SiteShell } from "@/core/components/site-shell";
import { Heading } from "@/core/components/ui/heading";
import { Text } from "@/core/components/ui/text";
import { createMetadata } from "@/core/utils/seo";
import { ProjectCard } from "@/project/components/project-card";
import { getProjects } from "@/project/services/projects";

export const metadata = createMetadata({
  title: "Projects",
  description: "Projects by Tri Rizeki Rifandani (synthetic placeholders).",
});

export default async function ProjectsPage() {
  const t = await getTranslations();
  const projects = getProjects();
  return (
    <SiteShell>
      <SiteContainer className="py-16 sm:py-24">
        <Heading level={1} className="text-3xl/10 sm:text-4xl/12">
          {t("projectsPageTitle")}
        </Heading>
        <Text className="mt-4 text-base/7 text-pretty">
          {t("projectsPageIntro")}
        </Text>

        <ul className="mt-10 flex flex-col gap-4">
          {projects.map((project, index) => (
            <li key={project.slug}>
              <ProjectCard
                project={project}
                index={index + 1}
                total={projects.length}
              />
            </li>
          ))}
        </ul>
      </SiteContainer>
    </SiteShell>
  );
}
