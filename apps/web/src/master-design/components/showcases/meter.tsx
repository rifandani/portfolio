import { useTranslations } from "next-intl";

import {
  Meter,
  MeterHeader,
  MeterTrack,
  MeterValue,
} from "@/core/components/ui/meter";
import { Variant, VariantGrid } from "@/master-design/components/variant";

export const MeterShowcase = () => {
  const t = useTranslations();

  return (
    <VariantGrid>
      <Variant className="w-56" label="value 70">
        <Meter
          aria-label={t("catalogShowcaseStorage")}
          className="w-56"
          value={70}
        >
          <MeterHeader>
            <span>{t("catalogShowcaseStorage")}</span>
            <MeterValue />
          </MeterHeader>
          <MeterTrack />
        </Meter>
      </Variant>
    </VariantGrid>
  );
};
