import { getTranslations } from "next-intl/server";
import { twMerge } from "tailwind-merge";

import { Breadcrumbs, BreadcrumbsItem } from "@/core/components/ui/breadcrumbs";

/**
 * Ancestors read like the Post Outline entries: Muted Ink at rest, Warm
 * Graphite on hover. Color only, never weight, so no crumb re-wraps. The
 * Link carries no color of its own, so the crumb sets it and the Link inherits.
 */
const crumbClass = "text-muted-fg shrink-0 text-sm/6 [&_a:hover]:text-fg";

/** The index each detail page belongs to, and the Translation Key of its name. */
const PARENTS = {
  "/posts": "siteNavPosts",
  "/projects": "siteNavProjects",
} as const;

/**
 * The trail above a Post Detail or a Project Detail: the index › the entry.
 * The last crumb is the current page (`aria-current="page"`, not a link). It
 * truncates to one line, because the full title is the `h1` right below it.
 */
export const DetailBreadcrumbs = async ({
  parent,
  title,
  className,
}: {
  parent: keyof typeof PARENTS;
  title: string;
  className?: string;
}) => {
  const t = await getTranslations();
  const label = t("navBreadcrumb");
  return (
    <nav aria-label={label} className={twMerge("flex", className)}>
      {/* React Aria labels the list too, in English unless told otherwise. */}
      <Breadcrumbs aria-label={label} className="min-w-0">
        <BreadcrumbsItem href={parent} className={crumbClass}>
          {t(PARENTS[parent])}
        </BreadcrumbsItem>
        <BreadcrumbsItem
          className={twMerge(
            crumbClass,
            // React Aria marks the current crumb disabled, and the kit Link
            // dims disabled links to 50%. It is not disabled, only current.
            // It holds no hover rule either: it goes nowhere.
            "text-fg min-w-0 shrink *:block *:truncate *:bg-none *:opacity-100!"
          )}
        >
          {title}
        </BreadcrumbsItem>
      </Breadcrumbs>
    </nav>
  );
};
