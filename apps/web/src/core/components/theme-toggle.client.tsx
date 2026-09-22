"use client";

import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";

import { Button } from "@/core/components/ui/button";

/**
 * Two-state theme switch. The first paint has no resolved theme, so both icons
 * ship and the `dark` class on `<html>` picks one — that keeps the markup
 * identical on server and client instead of forcing a mount guard.
 */
export const ThemeToggle = () => {
  const t = useTranslations();
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <Button
      intent="outline"
      aria-label={t("toggleTheme")}
      onPress={() => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
      }}
    >
      <SunIcon className="size-6 dark:hidden" />
      <MoonIcon className="hidden size-6 dark:block" />
    </Button>
  );
};
