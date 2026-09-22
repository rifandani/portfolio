import Image from "next/image";

import { Badge } from "@/core/components/ui/badge";
import {
  cardBodyClass,
  cardMediaClass,
} from "@/portfolio/components/card-shell";
import { LitCard } from "@/portfolio/components/lit-card.client";
import type { ProjectEntry } from "@/project/constants/projects";

/**
 * One project. The whole card is the link target. Carries the same wide
 * preview image as the post card, so both card lists read as one system.
 */
export const ProjectCard = ({ entry }: { entry: ProjectEntry }) => (
  <LitCard href={entry.href}>
    <div className={cardBodyClass}>
      <div className={cardMediaClass}>
        <Image
          src={entry.previewSrc}
          alt={entry.previewAlt}
          width={160}
          height={84}
          className="size-full object-cover"
          data-lit-print
          unoptimized
        />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-fg font-display text-base/6 font-semibold text-pretty">
          {entry.title}
        </h3>
        <p className="text-muted-fg mt-1 text-base/6 text-pretty sm:text-sm/6">
          {entry.description}
        </p>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {entry.tags.map((tag) => (
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
