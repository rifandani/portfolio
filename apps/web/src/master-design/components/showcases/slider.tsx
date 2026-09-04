import { useTranslations } from "next-intl";

import { Label } from "@/core/components/ui/field";
import { Slider, SliderOutput, SliderTrack } from "@/core/components/ui/slider";

import { Variant, VariantGrid } from "@/master-design/components/variant";

export const SliderShowcase = () => {
  const t = useTranslations();

  return (
    <VariantGrid>
      <Variant label="default">
        <Slider className="w-56" defaultValue={40}>
          <div className="flex justify-between">
            <Label>{t("catalogShowcaseVolume")}</Label>
            <SliderOutput />
          </div>
          <SliderTrack />
        </Slider>
      </Variant>

      <Variant label="isDisabled">
        <Slider className="w-56" defaultValue={40} isDisabled>
          <div className="flex justify-between">
            <Label>{t("catalogShowcaseVolume")}</Label>
            <SliderOutput />
          </div>
          <SliderTrack />
        </Slider>
      </Variant>
    </VariantGrid>
  );
};
