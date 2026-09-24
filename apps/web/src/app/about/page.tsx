import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { SiteContainer } from "@/core/components/site-container";
import { SiteShell } from "@/core/components/site-shell";
import { Heading } from "@/core/components/ui/heading";
import { Text } from "@/core/components/ui/text";
import { createMetadata } from "@/core/utils/seo";
import { CvLink } from "@/portfolio/components/cv-link.client";
import { IdBadge } from "@/portfolio/components/id-badge.client";
import {
  aboutContent,
  experienceEntries,
  portfolioIdentity,
} from "@/portfolio/constants/portfolio";

/** The job title from the CV, not the synthetic identity role. */
const currentRole =
  experienceEntries.find((entry) => entry.isCurrent)?.role ??
  portfolioIdentity.role;

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations();
  return createMetadata({
    title: t("aboutTitle"),
    description: t("aboutDescription"),
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
         * scrolls. Below `lg` it steps in between the two, beside the CV link,
         * so the one action on the page is on the first screen.
         */}
        <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-10">
          <Heading
            level={1}
            className="max-w-3xl text-3xl/10 text-pretty sm:text-5xl/14 lg:col-span-7"
          >
            {t("aboutHeadline")}
          </Heading>

          <div className="flex items-end gap-5 lg:sticky lg:top-20 lg:col-span-4 lg:col-start-9 lg:row-span-2 lg:row-start-1 lg:flex-col lg:items-stretch lg:gap-6 lg:self-start">
            <IdBadge
              portraitSrc={aboutContent.portraitSrc}
              fullName={portfolioIdentity.fullName}
              shortName={portfolioIdentity.shortName}
              role={currentRole}
              email={aboutContent.email}
              birthMonth={aboutContent.birthMonth}
              countryCode={aboutContent.countryCode}
              className="w-40 shrink-0 sm:w-48 lg:w-full"
            />
            <CvLink href={aboutContent.cvHref} />
          </div>

          <div className="max-w-prose space-y-5 lg:col-span-7">
            {aboutContent.paragraphKeys.map((key) => (
              <Text key={key} className="text-base/7 text-pretty">
                {t(key)}
              </Text>
            ))}
          </div>
        </div>

        <section aria-labelledby="about-skills-heading" className="mt-16">
          <Heading id="about-skills-heading" level={2}>
            {t("aboutSkills")}
          </Heading>
          <ul className="divide-border border-border mt-6 divide-y border-y">
            {aboutContent.skillKeys.map((key) => (
              <li
                key={key}
                className="text-muted-fg py-4 text-base/6 text-pretty sm:text-sm/6"
              >
                {t.rich(key, {
                  b: (chunks) => (
                    <strong className="text-fg font-medium">{chunks}</strong>
                  ),
                })}
              </li>
            ))}
          </ul>
        </section>
      </SiteContainer>
    </SiteShell>
  );
}
