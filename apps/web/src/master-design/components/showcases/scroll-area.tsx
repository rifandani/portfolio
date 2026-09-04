import { useTranslations } from "next-intl";

import { ScrollArea } from "@/core/components/ui/scroll-area";

import { Variant, VariantGrid } from "@/master-design/components/variant";

export const ScrollAreaShowcase = () => {
  const t = useTranslations();
  const lines = [
    t("catalogShowcaseAlpha"),
    t("catalogShowcaseBravo"),
    t("catalogShowcaseCharlie"),
    t("catalogShowcaseDelta"),
    t("catalogShowcaseEcho"),
    t("catalogShowcaseFoxtrot"),
    t("catalogShowcaseGolf"),
    t("catalogShowcaseHotel"),
    t("catalogShowcaseIndia"),
    t("catalogShowcaseJuliet"),
  ];

  return (
    <VariantGrid>
      <Variant label="vertical">
        <ScrollArea
          className="h-32 w-56 rounded-lg border"
          orientation="vertical"
        >
          <div className="space-y-2 p-3 text-sm">
            {lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </ScrollArea>
      </Variant>
    </VariantGrid>
  );
};
