import Image from "next/image";

import { Badge } from "@/core/components/ui/badge";
import {
  cardBodyClass,
  cardMediaClass,
} from "@/portfolio/components/card-shell";
import { LitCard } from "@/portfolio/components/lit-card.client";
import { PreviewMorph } from "@/portfolio/components/preview-morph";
import { projectPath } from "@/project/utils/project-path";
import type { Project } from "@/project/utils/project-source";

/**
 * One project. The whole card is the link target. Carries the same wide
 * preview image as the post card, so both card lists read as one system.
 */
export const ProjectCard = ({ project }: { project: Project }) => (
  <LitCard href={projectPath(project.slug)}>
    <div className={cardBodyClass}>
      <PreviewMorph kind="project" slug={project.slug}>
        <div className={cardMediaClass}>
          <Image
            src={project.previewSrc}
            alt={project.previewAlt}
            width={160}
            height={84}
            className="size-full object-cover"
            data-lit-print
            unoptimized
          />
        </div>
      </PreviewMorph>
      <div className="min-w-0 flex-1">
        <h3 className="text-fg font-display text-base/6 font-semibold text-pretty">
          {project.title}
        </h3>
        <p className="text-muted-fg mt-1 text-base/6 text-pretty sm:text-sm/6">
          {project.description}
        </p>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <li key={tag} className="flex">
              <Badge intent="primary" className="font-mono">
                {tag}
              </Badge>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </LitCard>
);
