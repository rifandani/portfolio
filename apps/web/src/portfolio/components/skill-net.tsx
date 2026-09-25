import { getTranslations } from "next-intl/server";
import type { CSSProperties, ReactNode } from "react";

import { Heading } from "@/core/components/ui/heading";
import { aboutContent } from "@/portfolio/constants/portfolio";

/**
 * What I bring, drawn as a schematic. Curiosity is the source: one trace runs
 * from its pad to a bus, and the bus feeds the other four. The drawing says
 * what the order alone could not — the four are what the curiosity turns
 * into — and it acts out the biography's start on an Arduino board.
 *
 * Below `lg` the net stands up: a trunk down the left gutter, with one branch
 * to each item. From `lg` it lies down: the bus runs under the source, and one
 * drop falls to each of four columns.
 *
 * Every trace is drawn per item, the way the work rail is, so the net starts
 * and ends exactly on a pad whatever height the copy takes. The geometry and
 * the lit path live in the `.skill-net` rules. Nothing here is a link, so the
 * pointer never washes an item: it lights the trace from the source to the
 * item under it, and the source lights the whole net.
 */
const titleClass =
  "text-fg font-display mb-1 block font-semibold tracking-tight";

/** The source's name, one step up: it is what the other four come from. */
const SourceTitle = (chunks: ReactNode) => (
  <strong className={`${titleClass} text-lg/7 sm:text-xl/7`}>{chunks}</strong>
);

const OutputTitle = (chunks: ReactNode) => (
  <strong className={`${titleClass} text-base/6`}>{chunks}</strong>
);

export const SkillNet = async () => {
  const t = await getTranslations();
  const { sourceKey, outputKeys } = aboutContent.skills;

  return (
    <section aria-labelledby="about-skills-heading" className="mt-16">
      <Heading id="about-skills-heading" level={2}>
        {t("aboutSkills")}
      </Heading>

      <div className="skill-net mt-8">
        <p className="skill-net-source text-muted-fg text-base/7 text-pretty">
          <span aria-hidden="true" className="skill-net-pad" />
          {t.rich(sourceKey, { b: SourceTitle })}
        </p>

        <ul className="skill-net-outputs">
          {outputKeys.map((key, index) => (
            <li
              key={key}
              // SAFETY: `CSSProperties` has no index for custom properties; the
              // one key is a CSS custom property, which React sets as written.
              style={{ "--i": index } as CSSProperties}
              className="skill-net-output text-muted-fg text-base/6 text-pretty max-lg:max-w-prose sm:text-sm/6"
            >
              <span aria-hidden="true" className="skill-net-joint" />
              <span aria-hidden="true" className="skill-net-pad" />
              {t.rich(key, { b: OutputTitle })}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
