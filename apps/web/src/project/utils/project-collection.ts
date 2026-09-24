import type { MarkdownSourceFile } from "@/post/utils/markdown-source";
import { parseProjectSource } from "@/project/utils/project-source";
import type { Project } from "@/project/utils/project-source";

/** Throws when two Project Sources claim the same value of `key`, naming both files. */
const assertUnique = (
  projects: readonly { project: Project; path: string }[],
  key: "slug" | "order",
  label: string
) => {
  const pathByValue = new Map<string | number, string>();
  for (const { project, path } of projects) {
    const claimedBy = pathByValue.get(project[key]);
    if (claimedBy) {
      throw new Error(
        `Duplicate ${label} "${project[key]}" in ${claimedBy} and ${path}`
      );
    }
    pathByValue.set(project[key], path);
  }
};

/**
 * Parse every Project Source into Projects, in their `order`. Throws when two
 * Project Sources claim the same Slug, as a silent suffix would change a URL
 * (ADR-0005), or the same `order`, as the list order would then be a guess.
 */
export const collectProjects = (
  files: readonly MarkdownSourceFile[]
): Project[] => {
  const parsed = files.map((file) => ({
    project: parseProjectSource(file),
    path: file.path,
  }));
  assertUnique(parsed, "slug", "Slug");
  assertUnique(parsed, "order", "order");
  return parsed
    .map(({ project }) => project)
    .toSorted((a, b) => a.order - b.order);
};

/** The Projects beside one Project in list order, as the Project Pager shows them. */
export interface AdjacentProjects<TProject> {
  /** Just before in the list. */
  previous?: TProject;
  /** Just after in the list. */
  next?: TProject;
}

/**
 * The Projects beside one Project in list order, for the Project Pager.
 * `projects` is the `collectProjects` order, so the first Project has no
 * previous Project and the last has no next Project.
 */
export const adjacentProjects = <TProject extends Pick<Project, "slug">>(
  projects: readonly TProject[],
  slug: string
): AdjacentProjects<TProject> => {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) {
    return {};
  }
  return { previous: projects[index - 1], next: projects[index + 1] };
};
