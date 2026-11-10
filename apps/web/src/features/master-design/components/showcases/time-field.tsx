import { Time } from "@internationalized/date";
import { useTranslations } from "next-intl";

import { Label } from "@/components/ui/field";
import { TimeField, TimeInput } from "@/components/ui/time-field";
import {
  Variant,
  VariantGrid,
} from "@/features/master-design/components/variant";

export const TimeFieldShowcase = () => {
  const t = useTranslations();

  return (
    <VariantGrid>
      <Variant label="default">
        <TimeField defaultValue={new Time(9, 30)}>
          <Label>{t("catalogShowcaseStartTime")}</Label>
          <TimeInput />
        </TimeField>
      </Variant>

      <Variant label="isDisabled">
        <TimeField defaultValue={new Time(9, 30)} isDisabled>
          <Label>{t("catalogShowcaseStartTime")}</Label>
          <TimeInput />
        </TimeField>
      </Variant>
    </VariantGrid>
  );
};
