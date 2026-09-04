import { useTranslations } from "next-intl";

import { Tracker } from "@/core/components/ui/tracker";
import { Variant, VariantGrid } from "@/master-design/components/variant";

export const TrackerShowcase = () => {
  const t = useTranslations();
  const blocks = [
    { color: "bg-success", tooltip: t("catalogShowcaseOperational") },
    { color: "bg-success", tooltip: t("catalogShowcaseOperational") },
    { color: "bg-success", tooltip: t("catalogShowcaseOperational") },
    { color: "bg-warning", tooltip: t("catalogShowcaseDegraded") },
    { color: "bg-success", tooltip: t("catalogShowcaseOperational") },
    { color: "bg-danger", tooltip: t("catalogShowcaseOutage") },
    { color: "bg-success", tooltip: t("catalogShowcaseOperational") },
    { color: "bg-success", tooltip: t("catalogShowcaseOperational") },
  ];

  return (
    <VariantGrid>
      <Variant className="w-72" label="status">
        <Tracker className="w-72" data={blocks} />
      </Variant>
    </VariantGrid>
  );
};
