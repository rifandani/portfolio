import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
} from "@/components/ui/popover";
import {
  Variant,
  VariantGrid,
} from "@/features/master-design/components/variant";

export const PopoverShowcase = () => {
  const t = useTranslations();

  return (
    <VariantGrid>
      <Variant label="default">
        <Popover>
          <Button intent="outline">{t("catalogShowcaseOpen")}</Button>
          <PopoverContent>
            <PopoverHeader>
              <PopoverTitle>{t("catalogShowcasePopover")}</PopoverTitle>
            </PopoverHeader>
            <PopoverBody>{t("catalogShowcasePopoverBody")}</PopoverBody>
          </PopoverContent>
        </Popover>
      </Variant>
    </VariantGrid>
  );
};
