import { useTranslations } from "next-intl";

import {
  Leaderboard,
  LeaderboardContent,
  LeaderboardEnd,
  LeaderboardHeader,
  LeaderboardItem,
  LeaderboardStart,
  LeaderboardTitle,
} from "@/core/components/ui/leaderboard";

import { Variant, VariantGrid } from "@/master-design/components/variant";

export const LeaderboardShowcase = () => {
  const t = useTranslations();

  return (
    <VariantGrid>
      <Variant className="w-72" label="sources">
        <Leaderboard className="w-72">
          <LeaderboardHeader>
            <LeaderboardTitle>
              {t("catalogShowcaseTopSources")}
            </LeaderboardTitle>
          </LeaderboardHeader>
          <LeaderboardContent>
            <LeaderboardItem maxValue={100} value={82}>
              <LeaderboardStart>{t("catalogShowcaseDirect")}</LeaderboardStart>
              <LeaderboardEnd>82</LeaderboardEnd>
            </LeaderboardItem>
            <LeaderboardItem maxValue={100} value={64}>
              <LeaderboardStart>{t("catalogShowcaseOrganic")}</LeaderboardStart>
              <LeaderboardEnd>64</LeaderboardEnd>
            </LeaderboardItem>
            <LeaderboardItem maxValue={100} value={41}>
              <LeaderboardStart>
                {t("catalogShowcaseReferral")}
              </LeaderboardStart>
              <LeaderboardEnd>41</LeaderboardEnd>
            </LeaderboardItem>
          </LeaderboardContent>
        </Leaderboard>
      </Variant>
    </VariantGrid>
  );
};
