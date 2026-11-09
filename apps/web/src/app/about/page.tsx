import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { SiteShell } from "@/app/_components/site-shell";
import { SiteContainer } from "@/components/site-container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { CvLink } from "@/features/portfolio/components/cv-link.client";
import { IdBadge } from "@/features/portfolio/components/id-badge.client";
import { SkillNet } from "@/features/portfolio/components/skill-net";
import { TechStack } from "@/features/portfolio/components/tech-stack";
import {
  aboutContent,
  experienceEntries,
} from "@/features/portfolio/constants/portfolio";
import { portfolioIdentity } from "@/shared/constants/identity";
import { createMetadata } from "@/utils/seo";

/** The job title from the CV */
const currentRole =
  experienceEntries.find((entry) => entry.isCurrent)?.role ??
  portfolioIdentity.role;

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations();
  return createMetadata({
    title: t("aboutTitle"),
    description: t("aboutDescription"),
    path: "/about",
  });
};

export default async function AboutPage() {
  const t = await getTranslations();
  return (
    <SiteShell>
      <SiteContainer className="py-16 sm:py-24">
        {/*
         * From `lg` the ID badge takes the right four columns beside the
         * headline and the biography, and holds still while the biography
         * scrolls. Below `lg` it steps in between the two, centred, with the
         * CV link below it at the same width, so the one action on the page is
         * on the first screen.
         */}
        <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-10">
          <Heading
            level={1}
            className="text-3xl/10 text-pretty sm:text-5xl/14 lg:col-span-7 lg:max-w-3xl"
          >
            {t("aboutHeadline")}
          </Heading>

          <div className="flex w-60 flex-col gap-5 justify-self-center sm:w-64 lg:sticky lg:top-20 lg:col-span-4 lg:col-start-9 lg:row-span-2 lg:row-start-1 lg:w-auto lg:gap-6 lg:self-start lg:justify-self-stretch">
            <IdBadge
              portraitSrc={aboutContent.portraitSrc}
              fullName={portfolioIdentity.fullName}
              shortName={portfolioIdentity.shortName}
              role={currentRole}
              email={aboutContent.email}
              birthMonth={aboutContent.birthMonth}
              countryCode={aboutContent.countryCode}
              className="w-full"
            />
            <CvLink href={aboutContent.cvHref} />
          </div>

          <div className="space-y-5 lg:col-span-7 lg:max-w-prose">
            {aboutContent.paragraphKeys.map((key) => (
              <Text key={key} className="text-base/7 text-pretty">
                {t(key)}
              </Text>
            ))}
          </div>
        </div>

        <SkillNet />

        <TechStack />
      </SiteContainer>
    </SiteShell>
  );
}
