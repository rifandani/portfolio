import { useTranslations } from "next-intl";

import { LineChart } from "@/core/components/ui/line-chart";

import {
  createRevenueConfig,
  createRevenueData,
} from "@/master-design/constants/fixtures";
import { Variant } from "@/master-design/components/variant";

export const LineChartShowcase = () => {
  const t = useTranslations();
  const revenueData = createRevenueData(t);
  const revenueConfig = createRevenueConfig(t);

  return (
    <div className="flex w-full flex-col gap-12">
      <Variant className="w-full" label="default">
        <LineChart
          className="w-full"
          config={revenueConfig}
          data={revenueData}
          dataKey="month"
        />
      </Variant>
    </div>
  );
};
