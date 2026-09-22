import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";

import { SpriteIcon } from "@/core/components/icon-sprite";
import { Heading } from "@/core/components/ui/heading";
import { Link } from "@/core/components/ui/link";
import { Text } from "@/core/components/ui/text";
import {
  portfolioIdentity,
  socialLinks,
} from "@/portfolio/constants/portfolio";
import type { SocialLink } from "@/portfolio/constants/portfolio";

/**
 * Mark for each social link, keyed by `SocialLink.id`. The two brand marks come
 * out of the sprite; email has no brand, so it borrows the Heroicons envelope
 * the rest of the chrome already uses.
 */
const socialIcons = {
  github: <SpriteIcon className="size-4" id="icon-github" />,
  linkedin: <SpriteIcon className="size-4" id="icon-linkedin" />,
  email: <EnvelopeIcon className="size-4" />,
} satisfies Record<SocialLink["id"], ReactNode>;

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

      <Text className="text-fg mt-6 max-w-3xl text-base/7 text-pretty">
        {portfolioIdentity.summary}
      </Text>

      <ul className="mt-8 flex max-w-3xl flex-wrap items-center gap-x-5 gap-y-2">
        {socialLinks.map((social) => (
          <li key={social.id}>
            <Link
              href={social.href}
              className="text-muted-fg hover:text-fg flex items-center gap-2 font-mono text-sm/6"
            >
              {socialIcons[social.id]}
              <span>{t(social.labelKey)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
