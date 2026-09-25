import { getTranslations } from "next-intl/server";
import { HiOutlineTag } from "react-icons/hi2";
import { twMerge } from "tailwind-merge";

import type { Project } from "@/project/utils/project-source";

/**
 * The Meta line of a Project: its tags, where a Post has its publish date and
 * reading time. It is inline text, not flex, so it follows the text alignment
 * of its parent, as the Post Meta line does.
 */
export const ProjectMeta = async ({
  project,
  className,
}: {
  project: Pick<Project, "tags">;
  className?: string;
}) => {
  const t = await getTranslations();
  return (
    <div
      className={twMerge(
        "text-muted-fg font-mono text-xs/5 sm:text-sm/6",
        className
      )}
    >
      <HiOutlineTag
        data-slot="icon"
        aria-hidden="true"
        className="mr-1.5 inline size-3.5 shrink-0 align-[-0.125em]"
      />
      <ul aria-label={t("projectTags")} className="inline">
        {project.tags.map((tag, index) => (
          <li key={tag} className="inline">
            {index > 0 && <span aria-hidden="true"> · </span>}
            {tag}
          </li>
        ))}
      </ul>
    </div>
  );
};
