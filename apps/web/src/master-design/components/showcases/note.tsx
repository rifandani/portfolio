import { useTranslations } from "next-intl";

import { Note } from "@/core/components/ui/note";
import { Variant, VariantGrid } from "@/master-design/components/variant";

const intents = ["default", "info", "warning", "danger", "success"] as const;

export const NoteShowcase = () => {
  const t = useTranslations();

  return (
    <VariantGrid>
      {intents.map((intent) => (
        <Variant className="w-64" key={intent} label={intent}>
          <Note intent={intent}>
            {t("catalogShowcaseNoteSuffix", { intent })}
          </Note>
        </Variant>
      ))}
    </VariantGrid>
  );
};
