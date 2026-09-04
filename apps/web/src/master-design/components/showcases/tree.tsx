import { useTranslations } from "next-intl";

import { Tree, TreeContent, TreeItem } from "@/core/components/ui/tree";
import { Variant, VariantGrid } from "@/master-design/components/variant";

export const TreeShowcase = () => {
  const t = useTranslations();

  return (
    <VariantGrid>
      <Variant label="nested">
        <Tree
          aria-label={t("catalogShowcaseFiles")}
          className="w-64 rounded-lg border p-1"
          defaultExpandedKeys={["docs"]}
        >
          <TreeItem id="docs" textValue={t("catalogShowcaseDocuments")}>
            <TreeContent>{t("catalogShowcaseDocuments")}</TreeContent>
            <TreeItem id="report" textValue={t("catalogShowcaseReportPdf")}>
              <TreeContent>{t("catalogShowcaseReportPdf")}</TreeContent>
            </TreeItem>
          </TreeItem>
        </Tree>
      </Variant>
    </VariantGrid>
  );
};
