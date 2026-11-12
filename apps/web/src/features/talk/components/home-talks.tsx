import { getTranslations } from "next-intl/server";

import { HomeSection, HomeSectionEmpty } from "@/components/home/home-section";
import { Link } from "@/components/ui/link";
import { TalkEntry } from "@/features/talk/components/talk-entry";
import { getTalks } from "@/features/talk/services/talks";

const HOME_PREVIEW_COUNT = 3;

export const HomeTalks = async () => {
  const t = await getTranslations();
  const talks = getTalks(HOME_PREVIEW_COUNT);
  return (
    <HomeSection
      id="home-talks-heading"
      title={t("talksPageTitle")}
      action={
        <Link
          href="/talks"
          className="text-muted-fg hover:text-fg shrink-0 text-sm/6"
        >
          {t("homeAllTalks")}
        </Link>
      }
      listClassName="gap-0"
    >
      {talks.length === 0 ? (
        <HomeSectionEmpty>{t("talksEmpty")}</HomeSectionEmpty>
      ) : (
        talks.map((talk, index) => (
          <li key={talk.link}>
            <TalkEntry
              talk={talk}
              className={index === 0 ? "border-t-0" : undefined}
            />
          </li>
        ))
      )}
    </HomeSection>
  );
};
