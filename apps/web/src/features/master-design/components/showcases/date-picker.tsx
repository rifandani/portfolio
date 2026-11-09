import { CalendarDate } from "@internationalized/date";
import { useTranslations } from "next-intl";

import { DatePicker, DatePickerTrigger } from "@/components/ui/date-picker";
import { Label } from "@/components/ui/field";
import {
  Variant,
  VariantGrid,
} from "@/features/master-design/components/variant";

export const DatePickerShowcase = () => {
  const t = useTranslations();

  return (
    <VariantGrid>
      <Variant label="default">
        <DatePicker defaultValue={new CalendarDate(2026, 8, 11)}>
          <Label>{t("catalogShowcaseEventDate")}</Label>
          <DatePickerTrigger />
        </DatePicker>
      </Variant>

      <Variant label="isDisabled">
        <DatePicker defaultValue={new CalendarDate(2026, 8, 11)} isDisabled>
          <Label>{t("catalogShowcaseEventDate")}</Label>
          <DatePickerTrigger />
        </DatePicker>
      </Variant>
    </VariantGrid>
  );
};
