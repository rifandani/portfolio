import { useTranslations } from "next-intl";

import { Button } from "@/core/components/ui/button";
import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/core/components/ui/sheet";
import { Variant, VariantGrid } from "@/master-design/components/variant";

export const SheetShowcase = () => {
  const t = useTranslations();

  return (
    <VariantGrid>
      <Variant label="right">
        <Sheet>
          <Button intent="outline">{t("catalogShowcaseOpenRight")}</Button>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>{t("catalogShowcaseRightSheet")}</SheetTitle>
              <SheetDescription>
                {t("catalogShowcaseDefaultSideRight")}
              </SheetDescription>
            </SheetHeader>
            <SheetBody>{t("catalogShowcaseSlideOverRight")}</SheetBody>
            <SheetFooter>
              <SheetClose>{t("catalogShowcaseClose")}</SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </Variant>

      <Variant label="left">
        <Sheet>
          <Button intent="outline">{t("catalogShowcaseOpenLeft")}</Button>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>{t("catalogShowcaseLeftSheet")}</SheetTitle>
              <SheetDescription>
                {t("catalogShowcaseOpensFromLeft")}
              </SheetDescription>
            </SheetHeader>
            <SheetBody>{t("catalogShowcaseUsefulNavFilters")}</SheetBody>
            <SheetFooter>
              <SheetClose>{t("catalogShowcaseClose")}</SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </Variant>
    </VariantGrid>
  );
};
