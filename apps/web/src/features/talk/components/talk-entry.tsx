import { cn } from "cn";
import { getLocale, getTranslations } from "next-intl/server";
import { HiOutlineArrowUpRight } from "react-icons/hi2";

import { Link } from "@/components/ui/link";
import type { Talk } from "@/features/talk/data/talks";

const dateOptions = {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
} satisfies Intl.DateTimeFormatOptions;

const dateFormats = {
  en: new Intl.DateTimeFormat("en", dateOptions),
  id: new Intl.DateTimeFormat("id", dateOptions),
};

export const TalkEntry = async ({
  talk,
  className,
}: {
  talk: Talk;
  className?: string;
}) => {
  const [t, locale] = await Promise.all([getTranslations(), getLocale()]);
  const date = dateFormats[locale].format(
    new Date(`${talk.createdAt}T00:00:00Z`)
  );

  return (
    <article
      className={cn("border-border min-w-0 border-t py-6 sm:py-8", className)}
    >
      <h3 className="text-fg font-display text-xl/7 font-semibold tracking-tight text-pretty wrap-anywhere sm:text-2xl/8">
        {talk.title}
      </h3>
      <p className="text-muted-fg mt-2 text-base/7 text-pretty wrap-anywhere">
        {talk.description}
      </p>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
        <p className="text-muted-fg font-mono text-xs/6 tabular-nums sm:text-sm/6">
          {t("talkCreatedOn")} <time dateTime={talk.createdAt}>{date}</time>
        </p>
        <Link
          href={talk.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-subtle-fg inline-flex min-h-11 items-center gap-2 text-sm/6"
        >
          {t("talkViewSlides")}
          <span className="sr-only">
            {` — ${talk.title} ${t("opensInNewTab")}`}
          </span>
          <HiOutlineArrowUpRight aria-hidden="true" className="size-4" />
        </Link>
      </div>
    </article>
  );
};
