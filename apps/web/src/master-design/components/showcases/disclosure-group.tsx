import { useTranslations } from "next-intl";

import {
  Disclosure,
  DisclosureGroup,
  DisclosurePanel,
  DisclosureTrigger,
} from "@/core/components/ui/disclosure-group";

import { Variant, VariantGrid } from "@/master-design/components/variant";

export const DisclosureGroupShowcase = () => {
  const t = useTranslations();

  return (
    <VariantGrid>
      <Variant className="w-72" label="default">
        <DisclosureGroup>
          <Disclosure id="shipping">
            <DisclosureTrigger>
              {t("catalogShowcaseShipping")}
            </DisclosureTrigger>
            <DisclosurePanel>
              {t("catalogShowcaseShippingDesc")}
            </DisclosurePanel>
          </Disclosure>
          <Disclosure id="returns">
            <DisclosureTrigger>{t("catalogShowcaseReturns")}</DisclosureTrigger>
            <DisclosurePanel>{t("catalogShowcaseReturnsDesc")}</DisclosurePanel>
          </Disclosure>
        </DisclosureGroup>
      </Variant>
    </VariantGrid>
  );
};
