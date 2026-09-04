import { useTranslations } from "next-intl";

import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@/core/components/ui/tabs";

import { Variant, VariantGrid } from "@/master-design/components/variant";

export const TabsShowcase = () => {
  const t = useTranslations();

  return (
    <VariantGrid>
      <Variant label="default">
        <Tabs>
          <TabList>
            <Tab id="overview">{t("catalogShowcaseOverview")}</Tab>
            <Tab id="analytics">{t("catalogShowcaseAnalytics")}</Tab>
            <Tab id="reports">{t("catalogShowcaseReports")}</Tab>
          </TabList>
          <TabPanels>
            <TabPanel id="overview">
              {t("catalogShowcaseOverviewContent")}
            </TabPanel>
            <TabPanel id="analytics">
              {t("catalogShowcaseAnalyticsContent")}
            </TabPanel>
            <TabPanel id="reports">
              {t("catalogShowcaseReportsContent")}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Variant>
    </VariantGrid>
  );
};
