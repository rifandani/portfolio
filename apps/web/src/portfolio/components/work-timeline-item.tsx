import { twMerge } from "tailwind-merge";

import { WorkCard } from "@/portfolio/components/work-card";
import type { ExperienceEntry } from "@/portfolio/constants/portfolio";

/**
 * One role on the work rail: a node in the left gutter, the unchanged work
 * card beside it.
 *
 * The rail is drawn per row rather than as one line behind the list. Each row
 * owns the segment above its own node and the segment down to the next node,
 * so the line begins and ends exactly on a node whatever height the cards
 * take. A single absolute line behind a list of variable-height cards cannot
 * do that without measuring them.
 *
 * The node sits 7px down so it centres on the role title's first line, which
 * is the row's first mark now that no card padding precedes it.
 *
 * Rail and node ride on Muted Ink rather than Hairline: Hairline is tuned to
 * separate a card from the canvas it sits on, and on the dark canvas it drops
 * out of sight when it has to carry a 1px line on its own.
 *
 * `data-rail-row` and `data-rail-node` are what `WorkRailList` measures to send
 * its bead down the rail. The node sits one layer up so the lit trace runs
 * behind it, the way the resting line does.
 */
export const WorkTimelineItem = ({
  entry,
  isFirst,
  isLast,
}: {
  entry: ExperienceEntry;
  isFirst: boolean;
  isLast: boolean;
}) => (
  <li data-rail-row className="group/row flex gap-4 sm:gap-5">
    <div
      aria-hidden="true"
      className="flex w-2.5 shrink-0 flex-col items-center"
    >
      <span className={twMerge("h-[7px] w-px", !isFirst && "bg-muted-fg/30")} />
      <span
        data-rail-node
        className={twMerge(
          "relative z-[1] size-2.5 shrink-0 rounded-full border",
          entry.isCurrent
            ? "bg-primary border-primary ring-primary/20 ring-2"
            : "bg-canvas border-muted-fg/45"
        )}
      />
      {!isLast && <span className="bg-muted-fg/30 w-px flex-1" />}
    </div>

    <div className={twMerge("min-w-0 flex-1", !isLast && "pb-8 sm:pb-10")}>
      <WorkCard entry={entry} />
    </div>
  </li>
);
