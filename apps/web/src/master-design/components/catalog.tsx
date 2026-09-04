"use client";

import { useMount } from "@reactuses/core";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { ThemeToggle } from "@/core/components/theme-toggle.client";
import { SearchField, SearchInput } from "@/core/components/ui/search-field";
import { categories, entryIds } from "@/master-design/constants/registry";
import { useScrollSpy } from "@/master-design/hooks/use-scroll-spy";

import { CatalogNav } from "./catalog-nav";

export const MasterDesignCatalog = () => {
  const t = useTranslations();
  const [filter, setFilter] = useState("");
  const { activeId, scrollTo } = useScrollSpy(entryIds);

  // Honor deep links like /master-design#combo-box once sections have painted.
  useMount(() => {
    const hash = window.location.hash.slice(1);
    if (hash && entryIds.includes(hash)) {
      requestAnimationFrame(() => {
        scrollTo(hash);
      });
    }
  });

  return (
    <div className="bg-bg text-fg flex min-h-svh w-full">
      <aside className="bg-sidebar sticky top-0 hidden h-svh w-64 shrink-0 overflow-y-auto border-r md:block">
        <CatalogNav activeId={activeId} filter={filter} onNavigate={scrollTo} />
      </aside>

      <main className="min-w-0 flex-1">
        <header className="bg-bg/80 sticky top-0 z-20 flex items-center gap-4 border-b px-6 py-3 backdrop-blur">
          <div>
            <h1 className="text-lg font-semibold">{t("catalogTitle")}</h1>
            <p className="text-muted-fg text-xs">
              {t("catalogSubtitle", { count: entryIds.length })}
            </p>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <SearchField
              aria-label={t("catalogFilterAria")}
              className="w-56"
              onChange={setFilter}
              value={filter}
            >
              <SearchInput placeholder={t("catalogFilterPlaceholder")} />
            </SearchField>
            <ThemeToggle />
          </div>
        </header>

        <div className="mx-auto flex max-w-7xl flex-col gap-16 px-6 py-10">
          {categories.map((category) => (
            <section key={category.id}>
              <h2 className="text-muted-fg mb-6 border-b pb-2 text-sm font-semibold tracking-wide uppercase">
                {t(category.nameKey)}
              </h2>
              <div className="flex flex-col gap-12">
                {category.entries.map((entry) => (
                  <section
                    className="scroll-mt-24"
                    data-md-section
                    id={entry.id}
                    key={entry.id}
                  >
                    <h3 className="mb-4 text-xl font-semibold">
                      {t(entry.nameKey)}
                    </h3>
                    <entry.Showcase />
                  </section>
                ))}
              </div>
            </section>
          ))}
          <div aria-hidden className="h-[50vh]" />
        </div>
      </main>
    </div>
  );
};
