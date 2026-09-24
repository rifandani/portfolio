import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

import { SiteContainer } from "@/core/components/site-container";
import { SiteShell } from "@/core/components/site-shell";
import { Heading } from "@/core/components/ui/heading";
import { Link } from "@/core/components/ui/link";
import { Text } from "@/core/components/ui/text";
import { createMetadata } from "@/core/utils/seo";
import { CvLink } from "@/portfolio/components/cv-link.client";
import { aboutContent } from "@/portfolio/constants/portfolio";

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
         * From `lg` the portrait takes the right four columns beside the
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

          <div className="flex items-end gap-5 lg:sticky lg:top-24 lg:col-span-4 lg:col-start-9 lg:row-span-2 lg:row-start-1 lg:flex-col lg:items-stretch lg:gap-4 lg:self-start">
            <div className="border-border bg-card aspect-4/5 w-28 shrink-0 overflow-hidden rounded-lg border shadow-xs sm:w-36 lg:w-full">
              <Image
                src={aboutContent.portraitSrc}
                alt={t("aboutPortraitAlt")}
                width={320}
                height={400}
                className="size-full object-cover"
                loading="eager"
                unoptimized
              />
            </div>
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
                {t(key)}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="about-contact-heading" className="mt-16">
          <Heading id="about-contact-heading" level={2}>
            {t("aboutContact")}
          </Heading>
          <Text className="mt-4 max-w-prose text-base/7">
            <Link
              href={`mailto:${aboutContent.email}`}
              className="text-primary-subtle-fg"
            >
              {t("aboutEmailMe")}
            </Link>
          </Text>
        </section>
      </SiteContainer>
    </SiteShell>
  );
}
