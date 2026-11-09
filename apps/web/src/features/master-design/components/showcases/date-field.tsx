import { CalendarDate } from "@internationalized/date";
import { useTranslations } from "next-intl";

import { DateField, DateInput } from "@/components/ui/date-field";
import { Label } from "@/components/ui/field";
import {
  Variant,
  VariantGrid,
} from "@/features/master-design/components/variant";

export const DateFieldShowcase = () => {
  const t = useTranslations();

  return (
    <VariantGrid>
      <Variant label="default">
        <DateField defaultValue={new CalendarDate(2026, 8, 11)}>
          <Label>{t("catalogShowcaseEventDate")}</Label>
          <DateInput />
        </DateField>
      </Variant>

      <Variant label="isDisabled">
        <DateField defaultValue={new CalendarDate(2026, 8, 11)} isDisabled>
          <Label>{t("catalogShowcaseEventDate")}</Label>
          <DateInput />
        </DateField>
      </Variant>
    </VariantGrid>
  );
};
