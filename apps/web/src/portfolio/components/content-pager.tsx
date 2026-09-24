import type { ReactNode } from "react";
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi2";
import { twMerge } from "tailwind-merge";

import { LitCard } from "@/portfolio/components/lit-card.client";

/** One side of a pager: where it goes, what it says, and its meta line. */
export interface PagerSide {
  href: string;
  title: string;
  /** "Previous post", "Next project", … */
  label: string;
  /** The meta line under the title, such as a Post Meta line. */
  meta: ReactNode;
}

/**
 * One side of the pager: the Content Card with a text-only filling. Each arrow
 * points the way the reader goes. From `sm` the next entry sits on the right
 * and aligns to the right; stacked, both align left.
 */
const PagerCard = ({
  side,
  isNext = false,
}: {
  side: PagerSide;
  isNext?: boolean;
}) => {
  const Arrow = isNext ? HiOutlineArrowRight : HiOutlineArrowLeft;
  return (
    <LitCard href={side.href} className="h-full">
      <div
        className={twMerge(
          "relative flex flex-col items-start",
          isNext && "sm:items-end sm:text-right"
        )}
      >
        <span className="text-muted-fg inline-flex items-center gap-1.5 font-mono text-xs/5 sm:text-sm/6">
          {!isNext && (
            <Arrow aria-hidden="true" className="size-3.5 shrink-0" />
          )}
          {side.label}
          {isNext && <Arrow aria-hidden="true" className="size-3.5 shrink-0" />}
        </span>
        <span className="text-fg font-display mt-2 text-base/6 font-semibold text-pretty">
          {side.title}
        </span>
        {side.meta}
      </div>
    </LitCard>
  );
};

/**
 * The two links at the end of a detail page to the entries beside it: the
 * Post Pager and the Project Pager. A missing side leaves its column empty.
 */
export const ContentPager = ({
  label,
  previous,
  next,
  className,
}: {
  /** The accessible name of the pager `nav`. */
  label: string;
  previous?: PagerSide;
  next?: PagerSide;
  className?: string;
}) => {
  if (!previous && !next) {
    return null;
  }
  return (
    <nav aria-label={label} className={className}>
      <ul className="grid gap-4 sm:grid-cols-2">
        {previous && (
          <li className="grid">
            <PagerCard side={previous} />
          </li>
        )}
        {next && (
          <li className="grid sm:col-start-2">
            <PagerCard side={next} isNext />
          </li>
        )}
      </ul>
    </nav>
  );
};
