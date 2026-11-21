import {
  parseProjectSource,
  parseProjectTranslationSource,
} from "@/features/project/utils/project-source";
import type { Project } from "@/features/project/utils/project-source";
import type { I18NLocale } from "@/shared/constants/i18n";
import type { MarkdownSourceFile } from "@/utils/markdown-source";
import { collectTranslatedSources } from "@/utils/markdown-translation";

/** Throws when two Project Sources claim the same `order`, naming both files. */
const assertUniqueOrder = (
  sources: readonly { project: Project; path: string }[]
) => {
  const pathByOrder = new Map<number, string>();
  for (const { project, path } of sources) {
    const claimedBy = pathByOrder.get(project.order);
    if (claimedBy) {
      throw new Error(
        `Duplicate order "${project.order}" in ${claimedBy} and ${path}`
      );
    }
    pathByOrder.set(project.order, path);
  }
};

/**
 * Parse every Project Source and return the Projects in one Locale, in their
 * `order`. Every Project must have a Project Translation for every Locale
 * (ADR-0004), so all files are checked whatever the Locale. Throws, naming
 * the file, on a duplicate Slug, as a silent suffix would change a URL
 * (ADR-0005), on a duplicate `order`, as the list order would then be a
 * guess, and on a missing, orphan, or stale Translation.
 */
export const collectProjects = (
  files: readonly MarkdownSourceFile[],
  locale: I18NLocale
): Project[] => {
  const sources = collectTranslatedSources(files, {
    name: "Project",
    parse: parseProjectSource,
    parseTranslation: parseProjectTranslationSource,
  }).map(({ path, inLocale }) => ({ path, project: inLocale(locale) }));
  assertUniqueOrder(sources);
  return sources
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
