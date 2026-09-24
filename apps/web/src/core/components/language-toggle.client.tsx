"use client";
// fallow-ignore-file security-client-server-leak -- a `use server` import is an RPC boundary: the bundler emits a server reference, never the action's code or its env reads

import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { HiOutlineGlobeAlt } from "react-icons/hi2";
import type { Selection } from "react-stately";
import { toast } from "sonner";

import { setUserLocaleAction } from "@/core/actions/i18n";
import { Button } from "@/core/components/ui/button";
import { Menu, MenuContent, MenuItem } from "@/core/components/ui/menu";
import type { I18NLocale } from "@/core/constants/i18n";

export const LanguageToggle = () => {
  const locale = useLocale();
  const t = useTranslations();
  const [isPending, startTransition] = useTransition();
  return (
    <Menu>
      <Button intent="outline" data-slot="menu-trigger">
        <HiOutlineGlobeAlt
          aria-hidden="true"
          data-slot="icon"
          className="size-6"
        />
        {/* The label is chrome, not information: it drops below `sm` so the
            public topbar fits one row at 390px. */}
        <span className="hidden sm:inline">
          {locale === "en" ? "English" : "Indonesia"}
        </span>
      </Button>

      <MenuContent
        aria-label={t("language")}
        selectionMode="single"
        selectedKeys={new Set([locale])}
        onSelectionChange={(_selection) => {
          // SAFETY: `selectionMode="single"` rules out the "all" sentinel, and every
          // menu item below is keyed by one of the values named here.
          const selection = _selection as Exclude<Selection, "all"> & {
            currentKey: I18NLocale;
          };
          startTransition(async () => {
            const result = await setUserLocaleAction(selection.currentKey);
            if (result?.error) {
              toast.error(result.error);
            }
          });
        }}
      >
        <MenuItem id="en" isDisabled={isPending}>
          English
        </MenuItem>
        <MenuItem id="id" isDisabled={isPending}>
          Indonesia
        </MenuItem>
      </MenuContent>
    </Menu>
  );
};
