import { getTranslations } from "next-intl/server";

import { Heading } from "@/core/components/ui/heading";
import { Link } from "@/core/components/ui/link";
import { Text } from "@/core/components/ui/text";
import {
  portfolioIdentity,
  socialLinks,
} from "@/portfolio/constants/portfolio";

export const HomeIdentity = async () => {
  const t = await getTranslations();
  return (
    <section aria-labelledby="home-identity-heading">
      <Heading
        id="home-identity-heading"
        level={1}
        className="max-w-3xl text-3xl/10 text-pretty sm:text-5xl/14"
      >
        {portfolioIdentity.roleSentence}
      </Heading>

      <Text className="text-fg mt-6 max-w-prose text-base/7 text-pretty">
        {portfolioIdentity.summary}
      </Text>

      <ul className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2">
        {socialLinks.map((social) => (
          <li key={social.id}>
            <Link
              href={social.href}
              className="text-muted-fg hover:text-fg font-mono text-sm/6 underline underline-offset-4 transition-colors"
            >
              {t(social.labelKey)}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
