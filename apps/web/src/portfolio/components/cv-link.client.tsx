"use client";

import {
  ArrowUpRightIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";

import { buttonStyles } from "@/core/components/ui/button";
import { Link } from "@/core/components/ui/link";
import { cx } from "@/core/utils/primitive";

/**
 * "View CV": a link that looks like the primary button, because it is the one
 * action the About page asks of a hiring manager. It opens the PDF in a new
 * tab, so the page stays where the visitor left it. The trailing arrow says so
 * to the eye; the visually hidden suffix says so to a screen reader.
 */
export const CvLink = ({
  href,
  className,
}: {
  href: string;
  className?: string;
}) => {
  const t = useTranslations();
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      variant="plain"
      className={cx(buttonStyles({ intent: "primary" }), className)}
    >
      <DocumentTextIcon />
      <span className="flex-1 text-start">{t("aboutViewCv")}</span>
      <span className="sr-only">{t("opensInNewTab")}</span>
      <ArrowUpRightIcon />
    </Link>
  );
};
