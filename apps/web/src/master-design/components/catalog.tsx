"use client";

import { useMount } from "@reactuses/core";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import { twJoin } from "tailwind-merge";

import { BrandLogo } from "@/core/components/brand-logo";
import { LanguageToggle } from "@/core/components/language-toggle.client";
import { ThemeToggle } from "@/core/components/theme-toggle.client";
import { Heading } from "@/core/components/ui/heading";
import { Link } from "@/core/components/ui/link";
import { SearchField, SearchInput } from "@/core/components/ui/search-field";
import { Text } from "@/core/components/ui/text";
import {
  categories,
  componentCount,
  entryIds,
} from "@/master-design/constants/registry";
import { useScrollSpy } from "@/master-design/hooks/use-scroll-spy";
import { portfolioIdentity } from "@/portfolio/constants/portfolio";

import { CatalogNav, catalogMetaClass, isPlainClick } from "./catalog-nav";

interface FilterProps {
  value: string;
  onChange: (_value: string) => void;
}

const CatalogFilter = ({ value, onChange }: FilterProps) => {
  const t = useTranslations();
  return (
    <SearchField
      aria-label={t("catalogFilterAria")}
      className="w-full"
      onChange={onChange}
      value={value}
    >
      <SearchInput placeholder={t("catalogFilterPlaceholder")} />
    </SearchField>
  );
};

/**
 * The Master Design: the kit laid out on the site's own canvas, so every
 * component is seen on the surface it ships on. The index stands in a side
 * column from `lg` and folds into a disclosure below it, as the Post Outline
 * does. Each category heads its entries the way the posts index heads a year;
 * each entry is a Hairline row with its name in a gutter that stays in view.
 */
export const MasterDesignCatalog = () => {
  const t = useTranslations();
  const [filter, setFilter] = useState("");
  const { activeId, scrollTo } = useScrollSpy(entryIds);
  const mobileIndexRef = useRef<HTMLDetailsElement>(null);

  // Honor deep links like /master-design#combo-box once sections have painted.
  useMount(() => {
    const hash = window.location.hash.slice(1);
    if (hash && entryIds.includes(hash)) {
      requestAnimationFrame(() => {
        scrollTo(hash);
      });
    }
  });

  const navigateFromMobile = (id: string) => {
    if (mobileIndexRef.current) {
      mobileIndexRef.current.open = false;
    }
    scrollTo(id);
  };

  return (
    <div className="text-fg min-h-svh">
      <header className="border-border bg-navbar/90 sticky top-0 z-20 border-b backdrop-blur-md">
        <div className="flex h-14 items-center gap-3 px-4 sm:px-6">
          <Link
            aria-label={portfolioIdentity.shortName}
            className="flex shrink-0 rounded-full outline-offset-4"
            href="/"
            variant="plain"
          >
            <BrandLogo className="size-8" />
          </Link>
          <span aria-hidden="true" className="bg-border h-5 w-px" />
          <span className="font-display truncate text-sm/6 font-semibold tracking-tight">
            {t("catalogTitle")}
          </span>
          <div className="ml-auto flex items-center gap-x-1">
            <ThemeToggle />
            <LanguageToggle />
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className="border-border sticky top-14 hidden h-[calc(100svh-3.5rem)] w-64 shrink-0 flex-col border-r lg:flex">
          <div className="px-5 pt-6 pb-4">
            <CatalogFilter onChange={setFilter} value={filter} />
          </div>
          <div
            className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pt-2 pb-10"
            data-nav-scroller
          >
            <CatalogNav
              activeId={activeId}
              filter={filter}
              onNavigate={scrollTo}
            />
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-10">
            <div className="max-w-2xl">
              <Heading
                className="text-3xl/10 text-balance sm:text-4xl/12"
                level={1}
              >
                {t("catalogTitle")}
              </Heading>
              <p className="text-muted-fg mt-3 font-mono text-xs/5 sm:text-sm/6">
                {t("catalogSubtitle", { count: componentCount })}
              </p>
              <Text className="mt-6 max-w-prose text-base/7 text-pretty sm:text-base/7">
                {t("catalogDescription")}
              </Text>
            </div>

            <details
              className="group border-border mt-10 border-y lg:hidden"
              ref={mobileIndexRef}
            >
              <summary
                className={twJoin(
                  "flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden",
                  "focus-visible:outline-ring outline-0 focus-visible:outline-2 focus-visible:outline-offset-2",
                  catalogMetaClass
                )}
              >
                {t("catalogNavAria")}
                <span
                  aria-hidden="true"
                  className="text-muted-fg relative flex size-6 shrink-0 items-center justify-center"
                >
                  <span className="absolute h-[1.5px] w-2.5 rotate-90 bg-current transition-transform duration-300 group-open:rotate-0 motion-reduce:transition-none" />
                  <span className="absolute h-[1.5px] w-2.5 bg-current" />
                </span>
              </summary>
              <div className="flex flex-col gap-5 pt-2 pb-6">
                <CatalogFilter onChange={setFilter} value={filter} />
                <CatalogNav
                  activeId={activeId}
                  density="comfortable"
                  filter={filter}
                  onNavigate={navigateFromMobile}
                />
              </div>
            </details>

            {categories.map((category) => (
              <section
                aria-labelledby={`category-${category.id}`}
                className="mt-16 sm:mt-20"
                key={category.id}
              >
                <div className="flex items-baseline gap-4">
                  <Heading
                    className="text-xl/8 sm:text-2xl/8"
                    id={`category-${category.id}`}
                    level={2}
                  >
                    {t(category.nameKey)}
                  </Heading>
                  <span
                    aria-hidden="true"
                    className="bg-muted-fg/30 h-px flex-1 self-center"
                  />
                  <span className={twJoin(catalogMetaClass, "tabular-nums")}>
                    {t(category.guide?.countKey ?? "catalogCategoryCount", {
                      count: category.entries.length,
                    })}
                  </span>
                </div>
                {category.guide && (
                  <Text className="mt-4 max-w-prose text-base/7 text-pretty sm:text-base/7">
                    {t(category.guide.descriptionKey)}
                  </Text>
                )}

                <div className="divide-border divide-y">
                  {category.entries.map((entry) => (
                    <section
                      aria-labelledby={`entry-${entry.id}`}
                      className="grid scroll-mt-20 gap-6 py-10 xl:grid-cols-[10rem_minmax(0,1fr)] xl:gap-10"
                      data-md-section
                      id={entry.id}
                      key={entry.id}
                    >
                      <div className="self-start xl:sticky xl:top-24">
                        <Heading
                          className="text-base/6 sm:text-lg/6"
                          id={`entry-${entry.id}`}
                          level={3}
                        >
                          {t(entry.nameKey)}
                        </Heading>
                        <a
                          className={twJoin(
                            "text-muted-fg hover:text-fg mt-1 inline-block font-mono text-xs/5",
                            "bg-[linear-gradient(currentColor,currentColor)] bg-[size:0%_1px] bg-[position:0_100%] bg-no-repeat",
                            "transition-[background-size,color] duration-300 ease-out motion-reduce:transition-none",
                            "hover:bg-[size:100%_1px] focus-visible:bg-[size:100%_1px]",
                            "focus-visible:outline-ring outline-0 focus-visible:outline-2 focus-visible:outline-offset-4 forced-colors:outline-[Highlight]"
                          )}
                          href={`#${entry.id}`}
                          onClick={(event) => {
                            if (isPlainClick(event)) {
                              event.preventDefault();
                              scrollTo(entry.id);
                            }
                          }}
                        >
                          #{entry.id}
                        </a>
                      </div>
                      <div className="min-w-0">
                        <entry.Showcase />
                      </div>
                    </section>
                  ))}
                </div>
              </section>
            ))}
            <div aria-hidden className="h-[40vh]" />
          </div>
        </main>
      </div>
    </div>
  );
};
