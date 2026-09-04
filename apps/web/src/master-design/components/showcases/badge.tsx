import { useTranslations } from "next-intl";

import { Badge } from "@/core/components/ui/badge";
import { Variant, VariantGrid } from "@/master-design/components/variant";

const intents = [
  "primary",
  "secondary",
  "success",
  "info",
  "warning",
  "danger",
  "outline",
] as const;

export const BadgeShowcase = () => {
  const t = useTranslations();

  return (
    <div className="flex flex-col gap-8">
      <VariantGrid>
        {intents.map((intent) => (
          <Variant key={intent} label={intent}>
            <Badge intent={intent}>{intent}</Badge>
          </Variant>
        ))}
      </VariantGrid>

      <VariantGrid>
        <Variant label="isCircle">
          <Badge isCircle>{t("catalogShowcaseCircle")}</Badge>
        </Variant>
        <Variant label="square">
          <Badge isCircle={false}>{t("catalogShowcaseSquare")}</Badge>
        </Variant>
      </VariantGrid>
    </div>
  );
};
