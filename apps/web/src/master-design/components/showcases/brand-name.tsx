import { useTranslations } from "next-intl";
import { HiMiniXMark } from "react-icons/hi2";

import { GuideLead } from "@/master-design/components/showcases/brand-art";
import { portfolioIdentity } from "@/portfolio/constants/portfolio";

/** Spellings that are wrong: the common respelling of the short form. */
const WRONG_SPELLINGS = ["Rizky"] as const;

const ROW =
  "grid gap-2 py-5 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-6 sm:py-6";
const LABEL =
  "text-muted-fg font-mono text-xs/5 tracking-[0.08em] uppercase sm:pt-1.5";

/** How the name is written: in full first, then the short form. */
export const BrandNameShowcase = () => {
  const t = useTranslations();

  return (
    <div className="flex flex-col gap-6">
      <GuideLead>{t("brandNameDescription")}</GuideLead>
      <dl className="border-border divide-border divide-y border-y">
        <div className={ROW}>
          <dt className={LABEL}>{t("brandNameFull")}</dt>
          <dd>
            <p className="font-display text-2xl/8 font-semibold tracking-tight">
              {portfolioIdentity.fullName}
            </p>
            <p className="text-muted-fg mt-1 text-base/6 text-pretty sm:text-sm/6">
              {t("brandNameFullUse")}
            </p>
          </dd>
        </div>
        <div className={ROW}>
          <dt className={LABEL}>{t("brandNameShort")}</dt>
          <dd>
            <p className="font-display text-2xl/8 font-semibold tracking-tight">
              {portfolioIdentity.shortName}
            </p>
            <p className="text-muted-fg mt-1 text-base/6 text-pretty sm:text-sm/6">
              {t("brandNameShortUse")}
            </p>
          </dd>
        </div>
        <div className={ROW}>
          <dt className={LABEL}>{t("brandNameAvoid")}</dt>
          <dd>
            {/* `role="list"`: Safari drops list semantics from a list without markers. */}
            {/* oxlint-disable-next-line jsx-a11y/no-redundant-roles */}
            <ul className="flex flex-wrap gap-x-8 gap-y-2" role="list">
              {WRONG_SPELLINGS.map((spelling) => (
                <li className="flex items-center gap-2" key={spelling}>
                  <HiMiniXMark
                    aria-hidden="true"
                    className="text-danger-subtle-fg size-4 shrink-0"
                  />
                  <s className="font-display text-muted-fg decoration-danger-subtle-fg/70 text-xl/8 font-semibold tracking-tight">
                    {spelling}
                  </s>
                </li>
              ))}
            </ul>
          </dd>
        </div>
      </dl>
    </div>
  );
};
