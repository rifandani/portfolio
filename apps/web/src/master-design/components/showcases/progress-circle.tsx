import { useTranslations } from "next-intl";

import { ProgressCircle } from "@/core/components/ui/progress-circle";
import { Variant, VariantGrid } from "@/master-design/components/variant";

export const ProgressCircleShowcase = () => {
  const t = useTranslations();

  return (
    <VariantGrid>
      <Variant label="value 60">
        <ProgressCircle
          aria-label={t("catalogShowcaseProgress")}
          className="size-8"
          value={60}
        />
      </Variant>
    </VariantGrid>
  );
};
