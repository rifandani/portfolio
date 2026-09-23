import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { SiteContainer } from "@/core/components/site-container";
import { SiteShell } from "@/core/components/site-shell";
import { Heading } from "@/core/components/ui/heading";
import { Link } from "@/core/components/ui/link";
import { Text } from "@/core/components/ui/text";
import { createMetadata } from "@/core/utils/seo";
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
        <Heading
          level={1}
          className="max-w-3xl text-3xl/10 text-pretty sm:text-5xl/14"
        >
          {t("aboutHeadline")}
        </Heading>

        <div className="mt-10 max-w-prose space-y-5">
          {aboutContent.paragraphKeys.map((key) => (
            <Text key={key} className="text-base/7 text-pretty">
              {t(key)}
            </Text>
          ))}
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
