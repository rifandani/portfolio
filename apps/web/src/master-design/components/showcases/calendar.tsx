import { CalendarDate } from "@internationalized/date";
import { useTranslations } from "next-intl";

import { Calendar } from "@/core/components/ui/calendar";
import { Variant, VariantGrid } from "@/master-design/components/variant";

export const CalendarShowcase = () => {
  const t = useTranslations();

  return (
    <VariantGrid>
      <Variant label="default">
        <Calendar
          aria-label={t("catalogShowcaseEventDate")}
          defaultValue={new CalendarDate(2026, 8, 11)}
        />
      </Variant>
    </VariantGrid>
  );
};
