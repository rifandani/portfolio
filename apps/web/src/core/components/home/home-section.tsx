import type { ReactNode } from "react";

import { Heading } from "@/core/components/ui/heading";
import { Text } from "@/core/components/ui/text";

/**
 * One home section: a labelled heading row over a card stack. Experience,
 * Projects, and Posts had three byte-identical copies of this scaffolding,
 * each with an `allHref` + `allLabel` pair that only meant anything when both
 * were passed. The trailing link is one `action` slot instead, so a caller
 * composes the link it wants rather than describing one through props.
 */
export const HomeSection = ({
  id,
  title,
  action,
  children,
}: {
  id: string;
  title: string;
  action?: ReactNode;
  children: ReactNode;
}) => (
  <section aria-labelledby={id} className="mt-24">
    <div className="flex items-baseline justify-between gap-4">
      <Heading id={id} level={2}>
        {title}
      </Heading>
      {action}
    </div>
    <ul className="mt-6 flex flex-col gap-4">{children}</ul>
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
