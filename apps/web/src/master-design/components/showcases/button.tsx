import { ArrowRightIcon } from "@heroicons/react/16/solid";
import { useTranslations } from "next-intl";

import { Button } from "@/core/components/ui/button";
import { Variant, VariantGrid } from "@/master-design/components/variant";

const intents = [
  "primary",
  "secondary",
  "outline",
  "plain",
  "success",
  "warning",
  "danger",
] as const;

const sizes = ["xs", "sm", "md", "lg"] as const;

export const ButtonShowcase = () => {
  const t = useTranslations();

  return (
    <div className="flex flex-col gap-8">
      <VariantGrid>
        {intents.map((intent) => (
          <Variant key={intent} label={intent}>
            <Button intent={intent}>{t("catalogShowcaseButton")}</Button>
          </Variant>
        ))}
      </VariantGrid>

      <VariantGrid>
        {sizes.map((size) => (
          <Variant key={size} label={size}>
            <Button size={size}>{t("catalogShowcaseButton")}</Button>
          </Variant>
        ))}
      </VariantGrid>

      <VariantGrid>
        <Variant label="with icon">
          <Button>
            {t("continue")}
            <ArrowRightIcon />
          </Button>
        </Variant>
        <Variant label="isCircle">
          <Button isCircle>{t("catalogShowcaseRounded")}</Button>
        </Variant>
        <Variant label="isPending">
          <Button isPending>{t("catalogShowcaseSaving")}</Button>
        </Variant>
        <Variant label="isDisabled">
          <Button isDisabled>{t("catalogShowcaseDisabled")}</Button>
        </Variant>
      </VariantGrid>
    </div>
  );
};
