"use client";

import { cn } from "cn";
import type { Route } from "next";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

import { Link } from "@/components/ui/link";

const navLinkClass = cn(
  // No padding: the sweeping rule is drawn on the link box, so any padding
  // would push the rule off the text and stretch it past the label.
  "text-muted-fg hover:text-fg inline-flex min-h-11 items-center text-xs/5 font-medium sm:text-sm/6 md:min-h-0",
  // The current page holds the rule open and keeps the brighter foreground.
  "aria-[current=page]:text-fg aria-[current=page]:bg-[size:100%_1px]",
  "focus-visible:outline-ring outline-0 focus-visible:outline-2 focus-visible:outline-offset-4"
);

const navItems = [
  { href: "/about", labelKey: "siteNavAbout" },
  { href: "/projects", labelKey: "siteNavProjects" },
  { href: "/posts", labelKey: "siteNavPosts" },
  { href: "/talks", labelKey: "siteNavTalks" },
  { href: "/gallery", labelKey: "siteNavGallery" },
] as const satisfies readonly { href: Route; labelKey: string }[];

/**
 * Primary nav. Client-side because the current route is the only thing that
 * decides which item is highlighted, and only the browser knows it after a
 * client navigation.
 */
export const SiteNav = () => {
  const t = useTranslations();
  const pathname = usePathname();

  return (
    <nav
      aria-label={t("navPrimary")}
      className="order-last flex w-full flex-wrap items-center justify-center gap-x-3 gap-y-1 pb-2 sm:gap-x-5 md:absolute md:left-1/2 md:order-none md:w-auto md:-translate-x-1/2 md:flex-nowrap md:pb-0"
    >
      {navItems.map(({ href, labelKey }) => (
        <Link
          aria-current={
            // A post or project detail page still belongs to its section.
            pathname === href || pathname.startsWith(`${href}/`)
              ? "page"
              : undefined
          }
          className={navLinkClass}
          href={href}
          key={href}
        >
          {t(labelKey)}
        </Link>
      ))}
    </nav>
  );
};
