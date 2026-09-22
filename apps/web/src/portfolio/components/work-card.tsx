import Image from "next/image";

import { Text } from "@/core/components/ui/text";
import { cardShellClass } from "@/portfolio/components/card-shell";
import type { ExperienceEntry } from "@/portfolio/constants/portfolio";

/** One role. Static — a work entry has nowhere to navigate to. */
export const WorkCard = ({ entry }: { entry: ExperienceEntry }) => (
  <article className={cardShellClass}>
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
        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
          <div className="min-w-0">
            <h3 className="text-fg font-display text-base/6 font-semibold text-pretty">
              {entry.role}
            </h3>
            <p className="text-muted-fg text-base/6 sm:text-sm/6">
              {entry.company}
            </p>
          </div>
          <p className="text-muted-fg shrink-0 font-mono text-xs/5 sm:text-sm/6">
            {entry.start} – {entry.end}
          </p>
        </div>
        <Text className="text-muted-fg mt-3 text-base/6 text-pretty sm:text-sm/6">
          {entry.summary}
        </Text>
      </div>
    </div>
  </article>
);
