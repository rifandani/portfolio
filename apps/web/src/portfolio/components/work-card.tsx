import Image from "next/image";

import { Text } from "@/core/components/ui/text";
import type { ExperienceEntry } from "@/portfolio/constants/portfolio";

/**
 * One role, as an open row on the work rail. Static — a work entry has
 * nowhere to navigate to.
 *
 * This is the one public row that carries no card shell. Boxing a dated entry
 * that already hangs off a rail gives it two containers for one job, and the
 * borders fight the line. Separation here comes from the rail and the row
 * interval instead.
 */
export const WorkCard = ({ entry }: { entry: ExperienceEntry }) => (
  <article className="flex gap-4 sm:gap-5">
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
      <Text className="text-muted-fg mt-3 text-base/6 text-pretty sm:text-sm/6">
        {entry.summary}
      </Text>
    </div>
  </article>
);
