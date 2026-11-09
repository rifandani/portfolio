import { useTranslations } from "next-intl";

import { ColorArea } from "@/components/ui/color-area";
import { ColorField } from "@/components/ui/color-field";
import { ColorPicker } from "@/components/ui/color-picker";
import {
  ColorSlider,
  ColorSliderOutput,
  ColorSliderTrack,
} from "@/components/ui/color-slider";
import { ColorThumb } from "@/components/ui/color-thumb";
import { Label } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Variant } from "@/features/master-design/components/variant";
import { brandHsl } from "@/features/master-design/constants/fixtures";

export const ColorPickerShowcase = () => {
  const t = useTranslations();

  return (
    <Variant label="default">
      <ColorPicker defaultValue={brandHsl}>
        <Label>{t("catalogShowcaseBrand")}</Label>
        <div className="flex flex-col gap-3">
          <ColorArea />
          <ColorSlider channel="hue">
            <ColorSliderOutput />
            <ColorSliderTrack>
              <ColorThumb />
            </ColorSliderTrack>
          </ColorSlider>
          <ColorField>
            <Input />
          </ColorField>
        </div>
      </ColorPicker>
    </Variant>
  );
};
