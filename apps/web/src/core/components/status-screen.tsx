import type { Route } from "next";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import { HiOutlineArrowRight } from "react-icons/hi2";
import { twMerge } from "tailwind-merge";

import { SiteContainer } from "@/core/components/site-container";
import { SiteShell } from "@/core/components/site-shell";
import { Heading } from "@/core/components/ui/heading";
import { Link } from "@/core/components/ui/link";
import { Text } from "@/core/components/ui/text";

/**
 * The three public areas, in the topbar's order. Kept here instead of imported
 * from `site-nav.client`: a value read out of a client module is a client
 * reference on the server, not the array.
 */
const destinations = [
  { href: "/about", labelKey: "siteNavAbout", hintKey: "statusAboutHint" },
  {
    href: "/projects",
    labelKey: "siteNavProjects",
    hintKey: "projectsPageIntro",
  },
  { href: "/posts", labelKey: "siteNavPosts", hintKey: "postsPageIntro" },
] as const satisfies readonly {
  href: Route;
  labelKey: string;
  hintKey: string;
}[];

/**
 * One row per area. Below `sm` the hint wraps under the name; from `sm` the
 * name holds a fixed column so the three hints start on one line. The name
 * takes the same sweeping rule as the `underline` Link, driven by the row.
 */
const destinationLinkClass = twMerge(
  "group grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 py-4",
  "sm:grid-cols-[10rem_1fr_auto]",
  "focus-visible:outline-offset-4"
);

const destinationNameClass = twMerge(
  "text-fg font-display justify-self-start text-base/6 font-semibold",
  "bg-[linear-gradient(currentColor,currentColor)] bg-[size:0%_1px] bg-[position:0_100%] bg-no-repeat",
  "transition-[background-size] duration-300 ease-out motion-reduce:transition-none",
  "group-hover:bg-[size:100%_1px] group-focus-visible:bg-[size:100%_1px]"
);

export interface StatusScreenProps {
  title: string;
  description: string;
  /** One mono line of record under the title: a status and path, a reference. */
  detail?: ReactNode;
  /** The recovery actions, primary first. */
  actions: ReactNode;
  /**
   * `false` drops the header and footer. Only `global-error` needs it: when
   * the chrome is what threw, the page must still render.
   */
  withChrome?: boolean;
}

/**
 * The page a visitor gets when a route cannot answer: not found, a render
 * error, a gated route. It keeps the site chrome, so the visitor is never
 * stranded, and it ends in the three public areas as the way on.
 *
 * Shared, not client-only: `not-found` renders it on the server, while
 * `error` and the catalog gate render it in the browser.
 */
export const StatusScreen = ({
  title,
  description,
  detail,
  actions,
  withChrome = true,
}: StatusScreenProps) => {
  const t = useTranslations();
  const content = (
    <SiteContainer className="py-16 sm:py-24">
      <div className="max-w-2xl">
        <Heading level={1} className="text-3xl/10 text-balance sm:text-4xl/12">
          {title}
        </Heading>
        {detail && (
          <p className="text-muted-fg mt-3 font-mono text-xs/5 break-all sm:text-sm/6">
            {detail}
          </p>
        )}
        <Text className="mt-6 max-w-prose text-base/7 text-pretty sm:text-base/7">
          {description}
        </Text>
        <div className="mt-8 flex flex-wrap items-center gap-3">{actions}</div>
      </div>

      <nav aria-labelledby="status-destinations-heading" className="mt-16">
        <Heading
          id="status-destinations-heading"
          level={2}
          className="text-base/6 sm:text-base/6"
        >
          {t("statusDestinations")}
        </Heading>
        <ul className="divide-border border-border mt-4 divide-y border-y">
          {destinations.map(({ href, labelKey, hintKey }) => (
            <li key={href}>
              <Link
                href={href}
                variant="plain"
                className={destinationLinkClass}
              >
                <span className={destinationNameClass}>{t(labelKey)}</span>
                <span className="text-muted-fg col-start-1 row-start-2 text-base/6 text-pretty sm:col-start-2 sm:row-start-1 sm:text-sm/6">
                  {t(hintKey)}
                </span>
                <HiOutlineArrowRight
                  data-slot="icon"
                  aria-hidden="true"
                  className="text-muted-fg group-hover:text-fg col-start-2 row-span-2 row-start-1 size-4 self-center transition-[translate,color] duration-300 ease-out group-hover:translate-x-0.5 motion-reduce:transition-none sm:col-start-3 sm:row-span-1"
                />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </SiteContainer>
  );
  return withChrome ? <SiteShell>{content}</SiteShell> : <main>{content}</main>;
};
