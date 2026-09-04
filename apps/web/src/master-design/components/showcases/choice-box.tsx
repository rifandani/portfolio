import { useTranslations } from "next-intl";

import {
  ChoiceBox,
  ChoiceBoxDescription,
  ChoiceBoxItem,
  ChoiceBoxLabel,
} from "@/core/components/ui/choice-box";

import { Variant, VariantGrid } from "@/master-design/components/variant";

export const ChoiceBoxShowcase = () => {
  const t = useTranslations();

  return (
    <VariantGrid>
      <Variant label="default">
        <ChoiceBox
          aria-label={t("catalogShowcasePlan")}
          className="w-72"
          defaultSelectedKeys={["starter"]}
        >
          <ChoiceBoxItem id="starter">
            <ChoiceBoxLabel>{t("catalogShowcaseStarter")}</ChoiceBoxLabel>
            <ChoiceBoxDescription>
              {t("catalogShowcaseForIndividuals")}
            </ChoiceBoxDescription>
          </ChoiceBoxItem>
          <ChoiceBoxItem id="pro">
            <ChoiceBoxLabel>{t("catalogShowcasePro")}</ChoiceBoxLabel>
            <ChoiceBoxDescription>
              {t("catalogShowcaseForGrowingTeams")}
            </ChoiceBoxDescription>
          </ChoiceBoxItem>
        </ChoiceBox>
      </Variant>

      <Variant label="isDisabled">
        <ChoiceBox
          aria-label={t("catalogShowcasePlan")}
          className="w-72"
          defaultSelectedKeys={["starter"]}
        >
          <ChoiceBoxItem id="starter">
            <ChoiceBoxLabel>{t("catalogShowcaseStarter")}</ChoiceBoxLabel>
            <ChoiceBoxDescription>
              {t("catalogShowcaseForIndividuals")}
            </ChoiceBoxDescription>
          </ChoiceBoxItem>
          <ChoiceBoxItem id="enterprise" isDisabled>
            <ChoiceBoxLabel>{t("catalogShowcaseEnterprise")}</ChoiceBoxLabel>
            <ChoiceBoxDescription>
              {t("catalogShowcaseContactSales")}
            </ChoiceBoxDescription>
          </ChoiceBoxItem>
        </ChoiceBox>
      </Variant>
    </VariantGrid>
  );
};
