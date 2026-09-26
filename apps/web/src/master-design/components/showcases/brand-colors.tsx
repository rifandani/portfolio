import { useTranslations } from "next-intl";
import { HiOutlineCheck, HiOutlineSquare2Stack } from "react-icons/hi2";
import { twJoin } from "tailwind-merge";

import type { MessageKey } from "@/core/feature-flags/registry";
import { useClipboard } from "@/core/hooks/use-clipboard";
import { GuideLead } from "@/master-design/components/showcases/brand-art";

interface LogoColor {
  nameKey: MessageKey;
  roleKey: MessageKey;
  /** Fixed fill: the logo does not change with the theme. */
  swatch: string;
  values: { label: string; value: string }[];
}

/** The logo's own fills (`BRAND_LOGO_FILLS`), with the white of its disc. */
const LOGO_COLORS: LogoColor[] = [
  {
    nameKey: "brandColorNavy",
    roleKey: "brandColorNavyRole",
    swatch: "bg-[#0E2137]",
    values: [
      { label: "HEX", value: "#0E2137" },
      { label: "RGB", value: "14 33 55" },
      { label: "OKLCH", value: "0.244 0.049 253.4" },
    ],
  },
  {
    nameKey: "brandColorTeal",
    roleKey: "brandColorTealRole",
    swatch: "bg-[#03A0A7]",
    values: [
      { label: "HEX", value: "#03A0A7" },
      { label: "RGB", value: "3 160 167" },
      { label: "OKLCH", value: "0.642 0.109 200.3" },
    ],
  },
  {
    nameKey: "brandColorWhite",
    roleKey: "brandColorWhiteRole",
    swatch: "bg-white",
    values: [
      { label: "HEX", value: "#FFFFFF" },
      { label: "RGB", value: "255 255 255" },
      { label: "OKLCH", value: "1 0 0" },
    ],
  },
];

const FADE =
  "col-start-1 row-start-1 size-4 transition-[opacity,scale] duration-180 ease-out motion-reduce:transition-none";

/** One value row: a button that copies the value, with the kit's check fade. */
const CopyValue = ({ label, value }: { label: string; value: string }) => {
  const t = useTranslations();
  const { copied, copy } = useClipboard();

  return (
    <div className="grid grid-cols-[3.5rem_minmax(0,1fr)] items-center">
      <dt className="text-muted-fg font-mono text-xs/5 tracking-[0.08em] uppercase">
        {label}
      </dt>
      <dd>
        <button
          aria-label={t("brandColorCopy", { label, value })}
          className={twJoin(
            "group/value -mx-2 flex min-h-9 w-full items-center justify-between gap-3 rounded-md px-2 text-start",
            "hover:bg-secondary transition-colors duration-150 motion-reduce:transition-none",
            "focus-visible:outline-ring outline-0 focus-visible:outline-2 focus-visible:outline-offset-1 forced-colors:focus-visible:outline-[Highlight]"
          )}
          onClick={() => {
            void copy(value);
          }}
          type="button"
        >
          <span className="text-fg truncate font-mono text-sm/6 tabular-nums">
            {value}
          </span>
          <span aria-hidden="true" className="grid shrink-0">
            <HiOutlineSquare2Stack
              className={twJoin(
                FADE,
                "text-muted-fg",
                copied
                  ? "scale-75 opacity-0"
                  : "opacity-0 group-hover/value:opacity-100 group-focus-visible/value:opacity-100 pointer-coarse:opacity-100"
              )}
            />
            <HiOutlineCheck
              className={twJoin(
                FADE,
                "text-success-subtle-fg",
                copied ? "scale-100 opacity-100" : "scale-75 opacity-0"
              )}
            />
          </span>
        </button>
        <output className="sr-only">
          {copied ? t("brandColorCopied", { value }) : ""}
        </output>
      </dd>
    </div>
  );
};

/**
 * The three colors the logo is made of, each as a swatch over its values.
 * They are logo colors, not UI tokens, so the swatches hold their fill in
 * both themes, as the logo does.
 */
export const BrandColorsShowcase = () => {
  const t = useTranslations();

  return (
    <div className="flex flex-col gap-8">
      <GuideLead>{t("brandColorsDescription")}</GuideLead>
      <div className="grid gap-x-6 gap-y-10 sm:grid-cols-3">
        {LOGO_COLORS.map((color) => (
          <section
            aria-label={t(color.nameKey)}
            className="flex flex-col gap-4"
            key={color.nameKey}
          >
            <div
              className={twJoin(
                "border-border aspect-[3/1] rounded-lg border sm:aspect-[4/3] forced-colors:border-[CanvasText]",
                color.swatch
              )}
            />
            <div>
              <p className="font-display text-base/6 font-semibold tracking-tight">
                {t(color.nameKey)}
              </p>
              <p className="text-muted-fg mt-1 text-base/6 text-pretty sm:text-sm/6">
                {t(color.roleKey)}
              </p>
            </div>
            <dl className="border-border divide-border divide-y border-y">
              {color.values.map((item) => (
                <CopyValue key={item.label} {...item} />
              ))}
            </dl>
          </section>
        ))}
      </div>
    </div>
  );
};
