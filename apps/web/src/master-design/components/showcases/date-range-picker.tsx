import { CalendarDate } from "@internationalized/date";
import { useTranslations } from "next-intl";

import {
  DateRangePicker,
  DateRangePickerTrigger,
} from "@/core/components/ui/date-range-picker";
import { Label } from "@/core/components/ui/field";

import { Variant, VariantGrid } from "@/master-design/components/variant";

const range = {
  end: new CalendarDate(2026, 8, 18),
  start: new CalendarDate(2026, 8, 11),
};

export const DateRangePickerShowcase = () => {
  const t = useTranslations();

  return (
    <VariantGrid>
      <Variant label="default">
        <DateRangePicker defaultValue={range}>
          <Label>{t("catalogShowcaseDates")}</Label>
          <DateRangePickerTrigger />
        </DateRangePicker>
      </Variant>

      <Variant label="isDisabled">
        <DateRangePicker defaultValue={range} isDisabled>
          <Label>{t("catalogShowcaseDates")}</Label>
          <DateRangePickerTrigger />
        </DateRangePicker>
      </Variant>
    </VariantGrid>
  );
};
