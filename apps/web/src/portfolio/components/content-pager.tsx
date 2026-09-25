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
const pagerCardLayouts = {
  previous: {
    Arrow: HiOutlineArrowLeft,
    columnClass: "",
    labelClass: "",
    itemClass: "grid",
  },
  next: {
    Arrow: HiOutlineArrowRight,
    columnClass: "sm:items-end sm:text-right",
    // Reversed so the arrow trails the label, pointing the way the reader goes.
    labelClass: "flex-row-reverse",
    itemClass: "grid sm:col-start-2",
  },
};

type PagerDirection = keyof typeof pagerCardLayouts;

const PagerCard = ({
  side,
  direction,
}: {
  side: PagerSide;
  direction: PagerDirection;
}) => {
  const { Arrow, columnClass, labelClass } = pagerCardLayouts[direction];
  return (
    <LitCard href={side.href} className="h-full">
      <div
        className={twMerge("relative flex flex-col items-start", columnClass)}
      >
        <span
          className={twMerge(
            "text-muted-fg inline-flex items-center gap-1.5 font-mono text-xs/5 sm:text-sm/6",
            labelClass
          )}
        >
          <Arrow aria-hidden="true" className="size-3.5 shrink-0" />
          {side.label}
        </span>
        <span className="text-fg font-display mt-2 text-base/6 font-semibold text-pretty">
          {side.title}
        </span>
        {side.meta}
      </div>
    </LitCard>
  );
};

/** One column of the pager. A missing side renders nothing. */
const PagerItem = ({
  side,
  direction,
}: {
  side?: PagerSide;
  direction: PagerDirection;
}) =>
  side ? (
    <li className={pagerCardLayouts[direction].itemClass}>
      <PagerCard side={side} direction={direction} />
    </li>
  ) : null;

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
        <PagerItem side={previous} direction="previous" />
        <PagerItem side={next} direction="next" />
      </ul>
    </nav>
  );
};
