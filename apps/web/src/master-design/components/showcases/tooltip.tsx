import { useTranslations } from "next-intl";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/core/components/ui/tooltip";
import { Variant, VariantGrid } from "@/master-design/components/variant";

export const TooltipShowcase = () => {
  const t = useTranslations();

  return (
    <VariantGrid>
      <Variant label="default">
        <Tooltip>
          <TooltipTrigger>{t("catalogShowcaseHoverMe")}</TooltipTrigger>
          <TooltipContent>{t("catalogShowcaseHelpfulHint")}</TooltipContent>
        </Tooltip>
      </Variant>

      <Variant label="inverse">
        <Tooltip>
          <TooltipTrigger>{t("catalogShowcaseInverse")}</TooltipTrigger>
          <TooltipContent inverse>
            {t("catalogShowcaseHighContrastHint")}
          </TooltipContent>
        </Tooltip>
      </Variant>
    </VariantGrid>
  );
};
