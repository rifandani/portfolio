"use client";

import { useTranslations } from "next-intl";
import type { CSSProperties } from "react";
import { useLayoutEffect, useRef, useState } from "react";
import { twJoin } from "tailwind-merge";

import {
  Disclosure,
  DisclosureGroup,
  DisclosurePanel,
  DisclosureTrigger,
} from "@/core/components/ui/disclosure-group";
import { categories } from "@/master-design/constants/registry";
import type { Category, ComponentEntry } from "@/master-design/types/types";

interface CatalogNavProps {
  activeId: string | null;
  filter: string;
  onNavigate: (_sectionId: string) => void;
  /** Link size: 14px in the side column, 16px in the mobile disclosure. */
  density?: "compact" | "comfortable";
}

const categoryIds = (cats: Category[]) =>
  new Set(cats.map((category) => category.id));

const categoryOf = (entryId: string) =>
  categories.find((category) =>
    category.entries.some((entry) => entry.id === entryId)
  )?.id;

/** Small spaced caps in the mono face, like the footer colophon. */
export const catalogMetaClass =
  "text-muted-fg font-mono text-xs/5 tracking-[0.08em] uppercase";

/** A click that follows the link in this tab. Modified clicks keep their own meaning. */
const MODIFIER_KEYS = ["metaKey", "ctrlKey", "shiftKey", "altKey"] as const;

export const isPlainClick = (event: React.MouseEvent) =>
  event.button === 0 && !MODIFIER_KEYS.some((key) => event[key]);

/** Categories with only the entries that match, and no empty groups. */
const filterCategories = (
  query: string,
  matches: (_entry: ComponentEntry) => boolean
) =>
  categories.flatMap((category) => {
    const entries = query ? category.entries.filter(matches) : category.entries;
    return entries.length === 0 ? [] : [{ ...category, entries }];
  });

const LINK_SIZE = {
  compact: "py-1 text-sm/6",
  comfortable: "py-2 text-base/6",
} satisfies Record<NonNullable<CatalogNavProps["density"]>, string>;

/** Room kept above and below the current link when the column follows it. */
const FOLLOW_MARGIN = 48;

const navLink = (rail: HTMLElement, activeId: string) =>
  rail.querySelector<HTMLElement>(`[data-nav-id="${CSS.escape(activeId)}"]`);

/** A collapsed group's links have no box. */
const isRendered = (el: HTMLElement | null): el is HTMLElement =>
  el !== null && el.getClientRects().length > 0;

/**
 * The bottom of the current link, in px from the top of the rail. When its
 * group is collapsed the link has no box, so the trace stops at the group.
 */
const reachOf = (rail: HTMLElement, activeId: string) => {
  const link = navLink(rail, activeId);
  const target = isRendered(link)
    ? link
    : rail.querySelector<HTMLElement>(
        `[data-nav-group="${CSS.escape(categoryOf(activeId) ?? "")}"]`
      );
  if (!target) {
    return null;
  }
  return (
    target.getBoundingClientRect().bottom - rail.getBoundingClientRect().top
  );
};

/** The scroll change that brings `box` inside `view`, less the follow margin. */
const followDelta = (view: DOMRect, box: DOMRect) => {
  if (box.top < view.top + FOLLOW_MARGIN) {
    return box.top - (view.top + FOLLOW_MARGIN);
  }
  if (box.bottom > view.bottom - FOLLOW_MARGIN) {
    return box.bottom - (view.bottom - FOLLOW_MARGIN);
  }
  return 0;
};

/**
 * Keeps the current link in view inside its scroll column. It sets
 * `scrollTop` directly: `scrollIntoView` would cancel the page's own smooth
 * scroll to the section.
 */
const followLink = (rail: HTMLElement, activeId: string) => {
  const scroller = rail.closest<HTMLElement>("[data-nav-scroller]");
  const link = navLink(rail, activeId);
  if (!scroller || !isRendered(link)) {
    return;
  }
  scroller.scrollTop += followDelta(
    scroller.getBoundingClientRect(),
    link.getBoundingClientRect()
  );
};

/**
 * How far down the index the trace reaches, and the column following the
 * current link. `null` until measured, so the first paint draws no trace.
 * The rail's own resizes (a group opening, a filter) re-measure it.
 */
const useTraceReach = (
  railRef: React.RefObject<HTMLDivElement | null>,
  activeId: string | null
) => {
  const [reach, setReach] = useState<number | null>(null);

  useLayoutEffect(() => {
    const rail = railRef.current;
    if (!rail || !activeId) {
      return;
    }
    const measure = () => {
      setReach(reachOf(rail, activeId));
    };
    measure();
    followLink(rail, activeId);
    const observer = new ResizeObserver(measure);
    observer.observe(rail);
    return () => observer.disconnect();
  }, [railRef, activeId]);

  return reach;
};

/** The 1px rail and the Helm Teal trace down to the current link. */
const CatalogTrace = ({ reach }: { reach: number | null }) => (
  <>
    <span
      aria-hidden="true"
      className="bg-muted-fg/30 pointer-events-none absolute inset-y-0 start-0 w-px"
    />
    <span
      aria-hidden="true"
      className={twJoin(
        "from-primary/45 to-primary pointer-events-none absolute start-0 top-0 h-(--nav-reach) w-px bg-linear-to-b forced-colors:hidden",
        "transition-[height] duration-[360ms] ease-[cubic-bezier(0.25,1,0.5,1)] motion-reduce:transition-none",
        reach === null && "opacity-0"
      )}
      // SAFETY: `CSSProperties` has no index for custom properties; the
      // one key is a CSS custom property, which React sets as written.
      style={{ "--nav-reach": `${reach ?? 0}px` } as CSSProperties}
    />
  </>
);

/** One entry in the index: a plain `#id` link that the page scrolls to. */
const CatalogNavLink = ({
  density,
  entry,
  isCurrent,
  onNavigate,
}: Pick<CatalogNavProps, "onNavigate"> & {
  density: keyof typeof LINK_SIZE;
  entry: ComponentEntry;
  isCurrent: boolean;
}) => {
  const t = useTranslations();

  return (
    <a
      aria-current={isCurrent ? "location" : undefined}
      className={twJoin(
        "text-muted-fg hover:text-fg aria-[current=location]:text-fg block rounded-sm ps-4 transition-colors duration-150 ease-out motion-reduce:transition-none",
        "focus-visible:outline-ring outline-0 focus-visible:outline-2 focus-visible:outline-offset-2 forced-colors:focus-visible:outline-[Highlight]",
        "forced-colors:aria-[current=location]:underline",
        LINK_SIZE[density]
      )}
      data-nav-id={entry.id}
      href={`#${entry.id}`}
      onClick={(event) => {
        if (isPlainClick(event)) {
          event.preventDefault();
          onNavigate(entry.id);
        }
      }}
    >
      {t(entry.nameKey)}
    </a>
  );
};

/**
 * The Master Design index, drawn like the Post Outline: a 1px rail, the
 * entries in Muted Ink, the current one in Warm Graphite, and a Helm Teal
 * trace down to it, so its length is how far down the catalog the reader is.
 * Groups collapse on the kit Disclosure; a filter opens every group it
 * matches. Entries are plain `#id` links, so the index works with no script.
 */
export const CatalogNav = ({
  activeId,
  filter,
  onNavigate,
  density = "compact",
}: CatalogNavProps) => {
  const t = useTranslations();
  const query = filter.trim().toLowerCase();
  const railRef = useRef<HTMLDivElement>(null);
  const reach = useTraceReach(railRef, activeId);

  const visible = filterCategories(query, (entry) =>
    t(entry.nameKey).toLowerCase().includes(query)
  );

  const [expanded, setExpanded] = useState<Set<string>>(() =>
    categoryIds(categories)
  );

  // While filtering, force every matching group open regardless of user state.
  const expandedKeys = query ? categoryIds(visible) : expanded;

  if (visible.length === 0) {
    return (
      <nav aria-label={t("catalogNavAria")}>
        <p className="text-muted-fg py-2 text-sm/6">{t("catalogNoMatches")}</p>
      </nav>
    );
  }

  return (
    <nav aria-label={t("catalogNavAria")}>
      <div className="relative" ref={railRef}>
        <CatalogTrace reach={reach} />
        <DisclosureGroup
          allowsMultipleExpanded
          className={twJoin(
            "[--disclosure-collapsed-bg:transparent] [--disclosure-collapsed-border:transparent] [--disclosure-expanded-bg:transparent] [--disclosure-expanded-border:transparent] [--disclosure-gutter-x:0px] [--disclosure-radius:0px]",
            "gap-y-4"
          )}
          expandedKeys={expandedKeys}
          onExpandedChange={(keys) => {
            setExpanded(new Set([...keys].map(String)));
          }}
        >
          {visible.map((category) => (
            <Disclosure id={category.id} key={category.id}>
              <DisclosureTrigger
                className={twJoin(
                  "min-h-8 rounded-sm py-1 ps-4 transition-colors duration-150 motion-reduce:transition-none",
                  "data-focus-visible:outline-ring data-focus-visible:outline-2 data-focus-visible:outline-offset-2 data-focus-visible:outline-solid",
                  catalogMetaClass,
                  "hover:text-fg"
                )}
                data-nav-group={category.id}
              >
                <span className="flex flex-1 items-baseline justify-between gap-3">
                  {t(category.nameKey)}
                  <span className="tabular-nums opacity-70">
                    {category.entries.length}
                  </span>
                </span>
              </DisclosureTrigger>
              <DisclosurePanel className="text-inherit">
                {/* `role="list"`: Safari drops list semantics from a list without markers. */}
                {/* oxlint-disable-next-line jsx-a11y/no-redundant-roles */}
                <ul role="list">
                  {category.entries.map((entry) => (
                    <li key={entry.id}>
                      <CatalogNavLink
                        density={density}
                        entry={entry}
                        isCurrent={entry.id === activeId}
                        onNavigate={onNavigate}
                      />
                    </li>
                  ))}
                </ul>
              </DisclosurePanel>
            </Disclosure>
          ))}
        </DisclosureGroup>
      </div>
    </nav>
  );
};
