import { useTranslations } from "next-intl";

import { PieChart } from "@/core/components/ui/pie-chart";

import { createShareConfig, createShareData } from "@/master-design/constants/fixtures";
import { Variant } from "@/master-design/components/variant";

export const PieChartShowcase = () => {
  const t = useTranslations();
  const shareData = createShareData(t);
  const shareConfig = createShareConfig(t);

  return (
    <div className="flex w-full flex-col gap-12">
      <Variant className="w-full" label="pie">
        <PieChart
          className="w-full"
          config={shareConfig}
          data={shareData}
          dataKey="value"
          nameKey="name"
        />
      </Variant>

      <Variant className="w-full" label="donut">
        <PieChart
          className="w-full"
          config={shareConfig}
          data={shareData}
          dataKey="value"
          nameKey="name"
          showLabel
          variant="donut"
        />
      </Variant>
    </div>
  );
};
