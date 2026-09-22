import { getTranslations } from "next-intl/server";

import {
  HomeSection,
  HomeSectionEmpty,
} from "@/core/components/home/home-section";
import { WorkCard } from "@/portfolio/components/work-card";
import { experienceEntries } from "@/portfolio/constants/portfolio";

export const HomeExperience = async () => {
  const t = await getTranslations();
  return (
    <HomeSection id="home-experience-heading" title={t("homeWorkExperience")}>
      {experienceEntries.length === 0 ? (
        <HomeSectionEmpty>{t("homeNoRoles")}</HomeSectionEmpty>
      ) : (
        experienceEntries.map((entry) => (
          <li key={entry.id}>
            <WorkCard entry={entry} />
          </li>
        ))
      )}
    </HomeSection>
  );
};
