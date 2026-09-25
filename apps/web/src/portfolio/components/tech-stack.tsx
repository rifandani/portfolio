import { getTranslations } from "next-intl/server";
import type { ComponentType } from "react";
import {
  SiClaude,
  SiCloudflare,
  SiCursor,
  SiDocker,
  SiDrizzle,
  SiEffect,
  SiExpo,
  SiHono,
  SiNextdotjs,
  SiOpentelemetry,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiSass,
  SiShadcnui,
  SiTailwindcss,
  SiTanstack,
  SiTypescript,
  SiVercel,
  SiVitest,
} from "react-icons/si";

import { SpriteIcon } from "@/core/components/icon-sprite";
import { Heading } from "@/core/components/ui/heading";
import { Text } from "@/core/components/ui/text";
import type { TechId } from "@/portfolio/constants/portfolio";
import { techStack } from "@/portfolio/constants/portfolio";

type Mark = ComponentType<{ className?: string; "aria-hidden"?: boolean }>;

/** `react-icons/si` does not ship Playwright, so its mark comes from the sprite. */
const PlaywrightMark: Mark = ({ className }) => (
  <SpriteIcon id="icon-playwright" className={className} />
);

/** Monochrome marks: they take `currentColor`, never the brand colors. */
const TECH_MARKS = {
  typescript: SiTypescript,
  react: SiReact,
  nextjs: SiNextdotjs,
  expo: SiExpo,
  tanstack: SiTanstack,
  shadcn: SiShadcnui,
  tailwindcss: SiTailwindcss,
  sass: SiSass,
  hono: SiHono,
  effect: SiEffect,
  prisma: SiPrisma,
  drizzle: SiDrizzle,
  postgresql: SiPostgresql,
  cloudflare: SiCloudflare,
  vercel: SiVercel,
  docker: SiDocker,
  opentelemetry: SiOpentelemetry,
  vitest: SiVitest,
  playwright: PlaywrightMark,
  "claude-code": SiClaude,
  cursor: SiCursor,
} satisfies Record<TechId, Mark>;

const layerLabelClass =
  "text-muted-fg font-mono text-xs/5 tracking-[0.08em] uppercase";

/**
 * The About tech stack, drawn as a cross-section. The layers stack from the
 * button down to the platform as Hairline rows. TypeScript is the spine beside
 * them: one strap, in the ID Badge lanyard's graphite, that runs the full
 * height, because every layer is written in it.
 */
export const TechStack = async () => {
  const t = await getTranslations();
  const { spine, layers } = techStack;
  const SpineMark = TECH_MARKS[spine.tool.id];

  return (
    <section aria-labelledby="about-stack-heading" className="mt-16">
      <Heading id="about-stack-heading" level={2}>
        {t("aboutStack")}
      </Heading>
      <Text className="mt-2 text-pretty">{t("aboutStackLead")}</Text>

      <div className="mt-6 grid grid-cols-[3.5rem_minmax(0,1fr)] gap-x-4 sm:grid-cols-[4.5rem_minmax(0,1fr)] sm:gap-x-6">
        <dl className="tech-spine flex flex-col items-center gap-4 rounded-lg px-2 pt-4 pb-3 sm:pt-5">
          <dt className="tech-spine-label order-last">{t(spine.labelKey)}</dt>
          <dd className="flex min-h-0 flex-1 flex-col items-center gap-3">
            <SpineMark aria-hidden className="size-6 shrink-0 sm:size-7" />
            <span className="font-display text-lg/none font-semibold tracking-tight [writing-mode:vertical-rl] sm:text-xl/none">
              {spine.tool.name}
            </span>
            <span aria-hidden="true" className="tech-spine-weave">
              {`${spine.tool.name} · `.repeat(12)}
            </span>
          </dd>
        </dl>

        <dl className="divide-border border-border divide-y border-y">
          {layers.map((layer) => (
            <div
              key={layer.id}
              className="grid gap-3 py-4 sm:grid-cols-[7rem_minmax(0,1fr)] sm:items-center sm:gap-6 sm:py-5"
            >
              <dt className={layerLabelClass}>{t(layer.labelKey)}</dt>
              <dd>
                <ul className="flex flex-wrap gap-x-5 gap-y-3">
                  {layer.tools.map((tool) => {
                    const ToolMark = TECH_MARKS[tool.id];
                    return (
                      <li key={tool.id} className="flex items-center gap-2.5">
                        <span className="bg-bg border-border grid size-9 shrink-0 place-items-center rounded-lg border shadow-xs">
                          <ToolMark
                            aria-hidden
                            className="text-fg size-[18px]"
                          />
                        </span>
                        <span className="text-fg font-mono text-sm/5">
                          {tool.name}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};
