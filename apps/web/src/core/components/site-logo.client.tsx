"use client";

import { useTranslations } from "next-intl";
import { HiOutlineSwatch } from "react-icons/hi2";

import { BrandLogo } from "@/core/components/brand-logo";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuDescription,
  ContextMenuItem,
  ContextMenuLabel,
} from "@/core/components/ui/context-menu";
import { Link } from "@/core/components/ui/link";
import { useFeatureEnabled } from "@/core/feature-flags/use-feature-enabled";
import { portfolioIdentity } from "@/portfolio/constants/portfolio";

/**
 * The topbar logo: the home link, with the short name as its accessible name.
 *
 * When the Master Design flag is on, a right-click (or Shift+F10) on the
 * logo opens a menu that links to the catalog.
 * When the flag is off — always, in production — the logo keeps the
 * browser's own link menu, because a menu that only points at a 404 is no
 * menu at all.
 */
export const SiteLogo = () => {
  const t = useTranslations();
  const catalogEnabled = useFeatureEnabled("componentCatalog");

  const logo = (
    <Link
      aria-label={portfolioIdentity.shortName}
      className="flex rounded-full outline-offset-4"
      href="/"
      variant="plain"
    >
      <BrandLogo className="size-8" />
    </Link>
  );

  if (!catalogEnabled) {
    return logo;
  }

  return (
    <ContextMenu>
      {logo}
      <ContextMenuContent aria-label={t("logoMenuLabel")} className="min-w-64">
        <ContextMenuItem href="/master-design" textValue={t("catalogTitle")}>
          <HiOutlineSwatch aria-hidden="true" data-slot="icon" />
          <ContextMenuLabel className="font-medium">
            {t("catalogTitle")}
          </ContextMenuLabel>
          <ContextMenuDescription>
            {t("logoMenuCatalogDescription")}
          </ContextMenuDescription>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};
