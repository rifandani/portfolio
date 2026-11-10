import { useTranslations } from "next-intl";

import { BarChart } from "@/components/ui/bar-chart";
import { Variant } from "@/features/master-design/components/variant";
import {
  createRevenueConfig,
  createRevenueData,
} from "@/features/master-design/constants/fixtures";

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
