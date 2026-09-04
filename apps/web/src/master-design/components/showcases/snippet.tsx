import { useTranslations } from "next-intl";

import {
  Snippet,
  SnippetTab,
  SnippetTabPanel,
  SnippetTabPanels,
  SnippetTabsList,
} from "@/core/components/ui/snippet";

import { Variant, VariantGrid } from "@/master-design/components/variant";

export const SnippetShowcase = () => {
  const t = useTranslations();

  return (
    <VariantGrid>
      <Variant className="w-full max-w-md" label="tabs">
        <Snippet defaultSelectedKey="ts">
          <SnippetTabsList>
            <SnippetTab id="ts">{t("catalogShowcaseTypeScript")}</SnippetTab>
            <SnippetTab id="js">{t("catalogShowcaseJavaScript")}</SnippetTab>
          </SnippetTabsList>
          <SnippetTabPanels>
            <SnippetTabPanel id="ts">
              {'const greet = (name: string) => "hi";'}
            </SnippetTabPanel>
            <SnippetTabPanel id="js">
              {'const greet = (name) => "hi";'}
            </SnippetTabPanel>
          </SnippetTabPanels>
        </Snippet>
      </Variant>
    </VariantGrid>
  );
};
