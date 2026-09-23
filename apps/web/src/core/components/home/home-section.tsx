import type { ComponentType, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import { Heading } from "@/core/components/ui/heading";
import { Text } from "@/core/components/ui/text";

/**
 * One home section: a labelled heading row over a card stack. Experience,
 * Projects, and Posts had three byte-identical copies of this scaffolding,
 * each with an `allHref` + `allLabel` pair that only meant anything when both
 * were passed. The trailing link is one `action` slot instead, so a caller
 * composes the link it wants rather than describing one through props.
 *
 * `listClassName` and `listAs` exist for the one section whose stack is not a
 * plain gap: work experience draws a rail between its rows, owns its own
 * spacing, and swaps in a list that the pointer can scrub.
 */
export const HomeSection = ({
  id,
  title,
  action,
  listClassName,
  listAs: List = "ul",
  children,
}: {
  id: string;
  title: string;
  action?: ReactNode;
  listClassName?: string;
  listAs?: "ul" | ComponentType<{ className?: string; children: ReactNode }>;
  children: ReactNode;
}) => (
  <section aria-labelledby={id} className="mt-24">
    <div className="flex items-baseline justify-between gap-4">
      <Heading id={id} level={2}>
        {title}
      </Heading>
      {action}
    </div>
    <List className={twMerge("mt-6 flex flex-col gap-4", listClassName)}>
      {children}
    </List>
  </section>
);

/** Placeholder row for a section with nothing to list yet. */
export const HomeSectionEmpty = ({ children }: { children: string }) => (
  <li>
    <Text className="text-muted-fg font-mono text-xs/5 sm:text-sm/6">
      {children}
    </Text>
  </li>
);
