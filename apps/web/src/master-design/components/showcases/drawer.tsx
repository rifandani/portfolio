import { useTranslations } from "next-intl";

import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/core/components/ui/drawer";
import { Variant, VariantGrid } from "@/master-design/components/variant";

export const DrawerShowcase = () => {
  const t = useTranslations();

  return (
    <VariantGrid>
      <Variant label="bottom">
        <Drawer>
          <DrawerTrigger>{t("catalogShowcaseOpenBottom")}</DrawerTrigger>
          <DrawerContent side="bottom">
            <DrawerHeader>
              <DrawerTitle>{t("catalogShowcaseBottomDrawer")}</DrawerTitle>
              <DrawerDescription>
                {t("catalogShowcaseDefaultSideBottom")}
              </DrawerDescription>
            </DrawerHeader>
            <DrawerBody>{t("catalogShowcaseDragDismiss")}</DrawerBody>
            <DrawerFooter>
              <DrawerClose>{t("catalogShowcaseClose")}</DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Variant>

      <Variant label="right">
        <Drawer>
          <DrawerTrigger>{t("catalogShowcaseOpenRight")}</DrawerTrigger>
          <DrawerContent side="right">
            <DrawerHeader>
              <DrawerTitle>{t("catalogShowcaseRightDrawer")}</DrawerTitle>
              <DrawerDescription>
                {t("catalogShowcaseSidePanelDrag")}
              </DrawerDescription>
            </DrawerHeader>
            <DrawerBody>{t("catalogShowcaseMobileSheets")}</DrawerBody>
            <DrawerFooter>
              <DrawerClose>{t("catalogShowcaseClose")}</DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Variant>
    </VariantGrid>
  );
};
