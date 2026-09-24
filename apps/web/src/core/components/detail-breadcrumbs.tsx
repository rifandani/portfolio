import { getTranslations } from "next-intl/server";
import { twMerge } from "tailwind-merge";

import { Breadcrumbs, BreadcrumbsItem } from "@/core/components/ui/breadcrumbs";

/**
 * Ancestors read like the Post Outline entries: Muted Ink at rest, Warm
 * Graphite on hover. Color only, never weight, so no crumb re-wraps. The
 * Link carries no color of its own, so the crumb sets it and the Link inherits.
 */
const crumbClass = "text-muted-fg shrink-0 text-sm/6 [&_a:hover]:text-fg";

/**
 * The trail above a Post Detail: Posts › the Post. The last crumb is
 * the current page (`aria-current="page"`, not a link). It truncates to one
 * line, because the full title is the `h1` right below it.
 */
export const PostBreadcrumbs = async ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => {
  const t = await getTranslations();
  const label = t("navBreadcrumb");
  return (
    <nav aria-label={label} className={twMerge("flex", className)}>
      {/* React Aria labels the list too, in English unless told otherwise. */}
      <Breadcrumbs aria-label={label} className="min-w-0">
        <BreadcrumbsItem href="/posts" className={crumbClass}>
          {t("siteNavPosts")}
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
