import { ColorArea } from "@/components/ui/color-area";
import { Variant } from "@/features/master-design/components/variant";
import { brandHsl } from "@/features/master-design/constants/fixtures";

export const ColorAreaShowcase = () => (
  <Variant label="default">
    <ColorArea defaultValue={brandHsl} />
  </Variant>
);
