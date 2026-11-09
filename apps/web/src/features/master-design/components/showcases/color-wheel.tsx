import { ColorWheel } from "@/components/ui/color-wheel";
import { Variant } from "@/features/master-design/components/variant";
import { brandHsl } from "@/features/master-design/constants/fixtures";

export const ColorWheelShowcase = () => (
  <Variant label="default">
    <ColorWheel defaultValue={brandHsl} />
  </Variant>
);
