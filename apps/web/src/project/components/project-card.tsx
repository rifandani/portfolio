import Image from "next/image";

import { Link } from "@/core/components/ui/link";
import { cardLinkClass } from "@/portfolio/components/card-shell";
import type { ProjectEntry } from "@/project/constants/projects";

/** One project. The whole card is the link target. */
export const ProjectCard = ({ entry }: { entry: ProjectEntry }) => (
  <Link href={entry.href} className={cardLinkClass}>
    <div className="flex gap-4 sm:gap-5">
      <Image
        src={entry.logoSrc}
        alt={entry.logoAlt}
        width={48}
        height={48}
        className="border-border size-12 shrink-0 rounded-lg border"
        unoptimized
      />
      <div className="min-w-0 flex-1">
        <h3 className="text-fg font-display text-base/6 font-semibold text-pretty">
          {entry.title}
        </h3>
        <p className="text-muted-fg mt-1 text-base/6 text-pretty sm:text-sm/6">
          {entry.description}
        </p>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {entry.tags.map((tag) => (
            <li
              key={tag}
              className="bg-muted text-muted-fg rounded-full px-2.5 py-0.5 font-mono text-xs/5"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </Link>
);
