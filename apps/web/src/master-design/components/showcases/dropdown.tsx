import { useTranslations } from "next-intl";

import {
  DropdownItem,
  DropdownLabel,
  DropdownSection,
} from "@/core/components/ui/dropdown";
import { ListBox } from "@/core/components/ui/list-box";

import { Variant, VariantGrid } from "@/master-design/components/variant";

export const DropdownShowcase = () => {
  const t = useTranslations();

  return (
    <VariantGrid>
      <Variant label="in ListBox">
        <ListBox
          aria-label={t("catalogShowcaseFruits")}
          className="w-48"
          selectionMode="single"
        >
          <DropdownSection title={t("catalogShowcaseFruits")}>
            <DropdownItem id="apple">
              <DropdownLabel>{t("catalogShowcaseApple")}</DropdownLabel>
            </DropdownItem>
            <DropdownItem id="banana">
              <DropdownLabel>{t("catalogShowcaseBanana")}</DropdownLabel>
            </DropdownItem>
          </DropdownSection>
        </ListBox>
      </Variant>
    </VariantGrid>
  );
};
