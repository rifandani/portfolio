import { Keyboard } from "@/components/ui/keyboard";
import {
  Variant,
  VariantGrid,
} from "@/features/master-design/components/variant";

export const KeyboardShowcase = () => (
  <VariantGrid>
    <Variant label="shortcut">
      <Keyboard className="inline">⌘K</Keyboard>
    </Variant>
  </VariantGrid>
);
