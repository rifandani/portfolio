import { useTranslations } from "next-intl";

import { BarChart } from "@/core/components/ui/bar-chart";

import {
  createRevenueConfig,
  createRevenueData,
} from "@/master-design/constants/fixtures";
import { Variant } from "@/master-design/components/variant";

export const BarChartShowcase = () => {
  const t = useTranslations();
  const revenueData = createRevenueData(t);
  const revenueConfig = createRevenueConfig(t);

  return (
    <div className="flex w-full flex-col gap-12">
      <Variant className="w-full" label="default">
        <BarChart
          className="w-full"
          config={revenueConfig}
          data={revenueData}
          dataKey="month"
        />
      </Variant>

      <Variant className="w-full" label="vertical">
        <BarChart
          className="w-full"
          config={revenueConfig}
          data={revenueData}
          dataKey="month"
          layout="vertical"
        />
      </Variant>
    </div>
  );
};
