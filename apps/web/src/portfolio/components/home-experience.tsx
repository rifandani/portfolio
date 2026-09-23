import { getTranslations } from "next-intl/server";

import {
  HomeSection,
  HomeSectionEmpty,
} from "@/core/components/home/home-section";
import { WorkRailList } from "@/portfolio/components/work-rail-list.client";
import { WorkTimelineItem } from "@/portfolio/components/work-timeline-item";
import { experienceEntries } from "@/portfolio/constants/portfolio";

export const HomeExperience = async () => {
  const t = await getTranslations();
  return (
    <HomeSection
      id="home-experience-heading"
      title={t("homeWorkExperience")}
      // The rail runs unbroken between rows, so the spacing lives on each row
      // instead of in a list gap the line would have to jump.
      listClassName="gap-0"
      listAs={WorkRailList}
    >
      {experienceEntries.length === 0 ? (
        <HomeSectionEmpty>{t("homeNoRoles")}</HomeSectionEmpty>
      ) : (
        experienceEntries.map((entry, index) => (
          <WorkTimelineItem
            key={entry.id}
            entry={entry}
            isFirst={index === 0}
            isLast={index === experienceEntries.length - 1}
          />
        ))
      )}
    </HomeSection>
  );
};
