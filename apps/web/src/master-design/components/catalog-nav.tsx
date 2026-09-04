"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

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
}

const categoryIds = (cats: Category[]) =>
  new Set(cats.map((category) => category.id));

const CatalogNavItem = ({
  entry,
  isActive,
  onNavigate,
  label,
}: {
  entry: ComponentEntry;
  isActive: boolean;
  onNavigate: (_sectionId: string) => void;
  label: string;
}) => (
  <li>
    <button
      className={twMerge(
        "text-muted-fg hover:bg-secondary hover:text-fg w-full rounded-md px-3 py-1.5 text-left text-sm transition-colors",
        isActive &&
          "bg-primary text-primary-fg hover:bg-primary hover:text-primary-fg font-medium"
      )}
      data-active={isActive || undefined}
      onClick={() => {
        onNavigate(entry.id);
      }}
      type="button"
    >
      {label}
    </button>
  </li>
);

/**
 * Left navigation for the Component Catalog: collapsible category groups whose
 * items highlight as the reader scrolls. Built on the Disclosure primitives
 * that the Sidebar itself uses, so it stays visually consistent with the app.
 */
export const CatalogNav = ({
  activeId,
  filter,
  onNavigate,
}: CatalogNavProps) => {
  const t = useTranslations();
  const query = filter.trim().toLowerCase();

  const visible = categories.flatMap((category) => {
    const entries = query
      ? category.entries.filter((entry) =>
          t(entry.nameKey).toLowerCase().includes(query)
        )
      : category.entries;
    return entries.length === 0 ? [] : [{ ...category, entries }];
  });

  const [expanded, setExpanded] = useState<Set<string>>(() =>
    categoryIds(categories)
  );

  // While filtering, force every matching group open regardless of user state.
  const expandedKeys = query ? categoryIds(visible) : expanded;

  if (visible.length === 0) {
    return (
      <nav aria-label={t("catalogNavAria")} className="p-3">
        <p className="text-muted-fg px-3 py-2 text-sm">
          {t("catalogNoMatches")}
        </p>
      </nav>
    );
  }

  return (
    <nav aria-label={t("catalogNavAria")} className="p-3">
      <DisclosureGroup
        allowsMultipleExpanded
        expandedKeys={expandedKeys}
        onExpandedChange={(keys) => {
          setExpanded(new Set([...keys].map(String)));
        }}
      >
        {visible.map((category) => (
          <Disclosure id={category.id} key={category.id}>
            <DisclosureTrigger>{t(category.nameKey)}</DisclosureTrigger>
            <DisclosurePanel>
              <ul className="flex flex-col gap-0.5">
                {category.entries.map((entry) => (
                  <CatalogNavItem
                    entry={entry}
                    isActive={entry.id === activeId}
                    key={entry.id}
                    label={t(entry.nameKey)}
                    onNavigate={onNavigate}
                  />
                ))}
              </ul>
            </DisclosurePanel>
          </Disclosure>
        ))}
      </DisclosureGroup>
    </nav>
  );
};
