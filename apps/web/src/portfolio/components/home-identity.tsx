import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";

import { SpriteIcon } from "@/core/components/icon-sprite";
import { Heading } from "@/core/components/ui/heading";
import { Link } from "@/core/components/ui/link";
import { Text } from "@/core/components/ui/text";
import { GlyphEngine } from "@/portfolio/components/glyph-engine.client";
import { socialLinks } from "@/portfolio/constants/portfolio";
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
    <section
      aria-labelledby="home-identity-heading"
      className="relative isolate lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-10"
    >
      {/*
       * Desktop: the engine takes the right five columns. Below `lg` there is
       * no right side, so it drops behind the headline as a faint print,
       * masked off before it reaches the summary so body text keeps contrast.
       */}
      <GlyphEngine className="pointer-events-none absolute -top-10 right-0 -z-10 w-[min(19rem,80%)] [mask-image:radial-gradient(closest-side,black_60%,transparent)] opacity-20 lg:relative lg:top-auto lg:z-auto lg:order-last lg:col-span-5 lg:w-full lg:[mask-image:none] lg:opacity-100 dark:opacity-30 lg:dark:opacity-100" />

      <div className="lg:col-span-7">
        <Heading
          id="home-identity-heading"
          level={1}
          className="max-w-3xl text-3xl/10 text-pretty sm:text-5xl/14"
        >
          {t("homeHeadline")}
        </Heading>

        <Text className="text-fg mt-6 max-w-3xl text-base/7 text-pretty">
          {t("homeSummary")}
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
      </div>
    </section>
  );
};
