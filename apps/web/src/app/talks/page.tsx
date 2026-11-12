import { getTranslations } from "next-intl/server";

import { SiteShell } from "@/app/_components/site-shell";
import { SiteContainer } from "@/components/site-container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { TalkEntry } from "@/features/talk/components/talk-entry";
import { getTalks } from "@/features/talk/services/talks";
import { talksByYear } from "@/features/talk/utils/talk-collection";
import { createTalkCollection } from "@/features/talk/utils/talk-ld";
import {
  createMetadata,
  createPerson,
  createWebSite,
  JsonLd,
} from "@/utils/seo";

const title = "Talks";
const description =
  "Slides created by Tri Rizeki Rifandani during his work at a company.";

export const metadata = createMetadata({ title, description, path: "/talks" });

export default async function TalksPage() {
  const t = await getTranslations();
  const talks = getTalks();
  const years = talksByYear(talks);

  return (
    <SiteShell>
      <JsonLd
        graphs={[
          createWebSite(),
          createPerson(),
          createTalkCollection({ title, description, talks }),
        ]}
      />
      <SiteContainer className="py-16 sm:py-24">
        <Heading level={1} className="text-3xl/10 sm:text-4xl/12">
          {t("talksPageTitle")}
        </Heading>
        <Text className="mt-4 text-base/7 text-pretty">
          {t("talksPageIntro")}
        </Text>

        {years.length === 0 ? (
          <Text className="text-muted-fg mt-10 font-mono text-xs/5 sm:text-sm/6">
            {t("talksEmpty")}
          </Text>
        ) : (
          <div className="mt-12 flex flex-col gap-12 sm:mt-16 sm:gap-16">
            {years.map(({ year, talks: yearTalks }) => (
              <section
                key={year}
                aria-labelledby={`talks-${year}`}
                className="grid gap-4 lg:grid-cols-[6rem_minmax(0,1fr)] lg:gap-x-8"
              >
                <h2
                  id={`talks-${year}`}
                  className="text-fg font-mono text-xl/7 font-medium tracking-tight tabular-nums sm:text-2xl/8 lg:sticky lg:top-24 lg:-translate-y-1/2 lg:self-start"
                >
                  {year}
                </h2>
                <ul className="min-w-0">
                  {yearTalks.map((talk) => (
                    <li key={talk.link}>
                      <TalkEntry talk={talk} />
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}
      </SiteContainer>
    </SiteShell>
  );
}
