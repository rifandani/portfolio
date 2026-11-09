import { getTranslations } from "next-intl/server";

import { SiteShell } from "@/app/_components/site-shell";
import { SiteContainer } from "@/components/site-container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { ProjectCard } from "@/features/project/components/project-card";
import { getProjects } from "@/features/project/services/projects";
import { createProjectCollection } from "@/features/project/utils/project-ld";
import {
  createMetadata,
  createPerson,
  createWebSite,
  JsonLd,
} from "@/utils/seo";

const title = "Projects";
const description = "Projects by Tri Rizeki Rifandani";

export const metadata = createMetadata({
  title,
  description,
  path: "/projects",
});

export default async function ProjectsPage() {
  const t = await getTranslations();
  const projects = getProjects();
  return (
    <SiteShell>
      <JsonLd
        graphs={[
          createWebSite(),
          createPerson(),
          createProjectCollection({ title, description, projects }),
        ]}
      />
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
