import { ColorWheel } from "@/core/components/ui/color-wheel";
import { Variant } from "@/master-design/components/variant";
import { brandHsl } from "@/master-design/constants/fixtures";

export const ColorWheelShowcase = () => (
  <Variant label="default">
    <ColorWheel defaultValue={brandHsl} />
  </Variant>
);
