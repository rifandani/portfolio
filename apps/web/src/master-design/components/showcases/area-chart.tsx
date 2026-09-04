// Deep import: AreaChart is intentionally not re-exported from the `ui` barrel
// (keeps recharts out of the main chunk), so the catalog imports it directly.
import { useTranslations } from "next-intl";

import { AreaChart } from "@/core/components/ui/area-chart";
import { Variant } from "@/master-design/components/variant";
import {
  createRevenueConfig,
  createRevenueData,
} from "@/master-design/constants/fixtures";

export const AreaChartShowcase = () => {
  const t = useTranslations();
  const revenueData = createRevenueData(t);
  const revenueConfig = createRevenueConfig(t);

  return (
    <div className="flex w-full flex-col gap-12">
      <Variant className="w-full" label="gradient">
        <AreaChart
          className="w-full"
          config={revenueConfig}
          data={revenueData}
          dataKey="month"
          fillType="gradient"
        />
      </Variant>

      <Variant className="w-full" label="stacked">
        <AreaChart
          className="w-full"
          config={revenueConfig}
          data={revenueData}
          dataKey="month"
          type="stacked"
        />
      </Variant>
    </div>
  );
};
