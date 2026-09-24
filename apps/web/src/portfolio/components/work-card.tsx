import Image from "next/image";

import type { ExperienceEntry } from "@/portfolio/constants/portfolio";

/**
 * One role, as an open row on the work rail. Static — a work entry has
 * nowhere to navigate to.
 *
 * This is the one public row that carries no card shell. Boxing a dated entry
 * that already hangs off a rail gives it two containers for one job, and the
 * borders fight the line. Separation here comes from the rail and the row
 * interval instead.
 *
 * A role holds its projects below the header. Each project is a small heading
 * and its outcomes as a list. Projects are not boxed either: the interval
 * between them is the only separation, as it is between rows. On a phone they
 * run under the logo too, so the lists get the full width; from `sm` they
 * indent to the title's edge (48px logo + 20px gap).
 */
export const WorkCard = ({ entry }: { entry: ExperienceEntry }) => (
  <article>
    <div className="flex gap-4 sm:gap-5">
      <Image
        src={entry.logoSrc}
        alt={entry.logoAlt}
        width={48}
        height={48}
        className="border-border bg-card size-12 shrink-0 rounded-lg border"
        unoptimized
      />
      <div className="min-w-0 flex-1">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
          <div className="min-w-0">
            <h3 className="text-fg font-display text-base/6 font-semibold text-pretty">
              {entry.role}
            </h3>
            <p className="text-muted-fg text-base/6 sm:text-sm/6">
              {entry.company}
            </p>
          </div>
          <p className="text-muted-fg group-hover/row:text-fg shrink-0 font-mono text-xs/5 transition-colors duration-200 sm:text-sm/6">
            {entry.start} –{" "}
            {entry.isCurrent ? (
              <span className="text-primary">{entry.end}</span>
            ) : (
              entry.end
            )}
          </p>
        </div>
      </div>
    </div>

    <div className="mt-5 flex flex-col gap-6 sm:pl-17">
      {entry.projects.map((project) => (
        <div key={project.id}>
          <h4 className="text-fg font-display text-sm/6 font-semibold text-pretty">
            {project.name}
          </h4>
          <ul className="text-muted-fg marker:text-muted-fg/50 mt-2 flex max-w-[70ch] list-disc flex-col gap-2 pl-4 text-base/6 sm:text-sm/6">
            {project.highlights.map((highlight) => (
              <li key={highlight} className="pl-1 text-pretty">
                {highlight}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </article>
);
