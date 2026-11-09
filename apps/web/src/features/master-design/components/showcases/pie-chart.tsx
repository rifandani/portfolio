import { useTranslations } from "next-intl";

import { PieChart } from "@/components/ui/pie-chart";
import { Variant } from "@/features/master-design/components/variant";
import {
  createShareConfig,
  createShareData,
} from "@/features/master-design/constants/fixtures";

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
