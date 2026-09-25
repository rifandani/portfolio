import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { HiOutlineArrowRight } from "react-icons/hi2";

import { LitCard } from "@/portfolio/components/lit-card.client";
import { PreviewMorph } from "@/portfolio/components/preview-morph";
import { projectPath } from "@/project/utils/project-path";
import type { Project } from "@/project/utils/project-source";

/** Meta spaced caps: the footer's colophon voice, here as the title block's field labels. */
const fieldLabelClass =
  "text-muted-fg font-mono text-xs/5 tracking-[0.08em] uppercase";

/** Two digits, because a Project list stays under a hundred sheets. */
const sheetNumberOf = (value: number) => String(value).padStart(2, "0");

/**
 * One Project, drawn as a Drawing Sheet: the preview is the drawing, held in
 * registration marks, and a title block beside it records the sheet number,
 * the title, the stack, and what the Project opens. The whole sheet is one link.
 *
 * `index` and `total` place the sheet in the full Project list, so a preview
 * of three on Home still says how many sheets the register holds.
 */
export const ProjectCard = async ({
  project,
  index,
  total,
}: {
  project: Project;
  index: number;
  total: number;
}) => {
  const t = await getTranslations();
  const opens = [
    project.demoUrl && t("projectCardDemo"),
    project.githubUrl && t("projectCardSource"),
  ].filter(Boolean);

  return (
    <LitCard href={projectPath(project.slug)} className="group">
      <div className="relative grid gap-6 lg:grid-cols-[minmax(0,8fr)_minmax(0,7fr)] lg:gap-0">
        <div className="relative self-start lg:mr-8">
          <span aria-hidden="true" className="sheet-marks" />
          <PreviewMorph kind="project" slug={project.slug}>
            <div className="border-border aspect-1200/630 overflow-hidden rounded-lg border">
              <Image
                src={project.previewSrc}
                alt={project.previewAlt}
                width={600}
                height={315}
                className="size-full object-cover"
                data-lit-print
                unoptimized
              />
            </div>
          </PreviewMorph>
        </div>

        <div className="border-border flex min-w-0 flex-col border-t pt-5 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-6">
          <div
            aria-hidden="true"
            className="flex items-baseline justify-between gap-4 font-mono"
          >
            <span className="flex items-baseline gap-2">
              <span className={fieldLabelClass}>{t("projectCardSheet")}</span>
              <span className="text-fg text-3xl/none font-medium tracking-tight tabular-nums">
                {sheetNumberOf(index)}
              </span>
            </span>
            <span className="text-muted-fg text-xs/5 tabular-nums sm:text-sm/6">
              / {sheetNumberOf(total)}
            </span>
          </div>

          <h3 className="text-fg font-display mt-4 text-lg/7 font-semibold tracking-tight text-balance">
            {project.title}
          </h3>
          <p className="text-muted-fg mt-1 text-base/6 text-pretty sm:text-sm/6">
            {project.description}
          </p>

          <dl className="divide-border border-border mt-5 divide-y border-y">
            <div className="grid grid-cols-[4.5rem_minmax(0,1fr)] gap-x-3 py-2.5">
              <dt className={fieldLabelClass}>{t("projectCardStack")}</dt>
              <dd className="text-fg font-mono text-xs/5 sm:text-[0.8125rem]/5">
                <ul className="inline">
                  {project.tags.map((tag, position) => (
                    <li key={tag} className="inline">
                      {position > 0 && (
                        <span aria-hidden="true" className="text-muted-fg">
                          {" · "}
                        </span>
                      )}
                      {tag}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
            {opens.length > 0 && (
              <div className="grid grid-cols-[4.5rem_minmax(0,1fr)] gap-x-3 py-2.5">
                <dt className={fieldLabelClass}>{t("projectCardOpens")}</dt>
                <dd className="text-fg font-mono text-xs/5 sm:text-[0.8125rem]/5">
                  {opens.join(" · ")}
                </dd>
              </div>
            )}
          </dl>

          <span
            aria-hidden="true"
            className="text-muted-fg group-hover:text-fg group-focus-visible:text-fg mt-auto flex items-center justify-between gap-4 pt-4 text-sm/6 font-medium transition-colors duration-300 ease-out motion-reduce:transition-none"
          >
            {t("projectCardView")}
            <HiOutlineArrowRight
              data-slot="icon"
              className="size-4 transition-[translate] duration-300 ease-out group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5 motion-reduce:transition-none"
            />
          </span>
        </div>
      </div>
    </LitCard>
  );
};
