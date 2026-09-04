import { CalendarDate } from "@internationalized/date";
import { useTranslations } from "next-intl";

import { RangeCalendar } from "@/core/components/ui/range-calendar";
import { Variant, VariantGrid } from "@/master-design/components/variant";

export const RangeCalendarShowcase = () => {
  const t = useTranslations();

  return (
    <VariantGrid>
      <Variant label="default">
        <RangeCalendar
          aria-label={t("catalogShowcaseStayDates")}
          defaultValue={{
            end: new CalendarDate(2026, 8, 18),
            start: new CalendarDate(2026, 8, 11),
          }}
        />
      </Variant>
    </VariantGrid>
  );
};
