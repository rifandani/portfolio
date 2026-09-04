"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

import { Button } from "@/core/components/ui/button";
import {
  CommandMenu,
  CommandMenuItem,
  CommandMenuLabel,
  CommandMenuList,
  CommandMenuSearch,
  CommandMenuSection,
} from "@/core/components/ui/command-menu";
import { Variant, VariantGrid } from "@/master-design/components/variant";

export const CommandMenuShowcase = () => {
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <VariantGrid>
      <Variant label="default">
        <Button
          intent="outline"
          onPress={() => {
            setIsOpen(true);
          }}
        >
          {t("catalogShowcaseOpen")}
        </Button>
        <CommandMenu isOpen={isOpen} onOpenChange={setIsOpen}>
          <CommandMenuSearch placeholder={t("catalogShowcaseSearchEllipsis")} />
          <CommandMenuList>
            <CommandMenuSection label={t("catalogShowcasePages")}>
              <CommandMenuItem textValue={t("catalogShowcaseHome")}>
                <CommandMenuLabel>{t("catalogShowcaseHome")}</CommandMenuLabel>
              </CommandMenuItem>
              <CommandMenuItem textValue={t("settings")}>
                <CommandMenuLabel>{t("settings")}</CommandMenuLabel>
              </CommandMenuItem>
            </CommandMenuSection>
          </CommandMenuList>
        </CommandMenu>
      </Variant>
    </VariantGrid>
  );
};
