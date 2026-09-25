"use client";

import { useTranslations } from "next-intl";
import { HiOutlineArrowUpRight, HiOutlineDocumentText } from "react-icons/hi2";

import { buttonStyles } from "@/core/components/ui/button";
import { Link } from "@/core/components/ui/link";
import { cx } from "@/core/utils/primitive";

/**
 * "View CV": a link in the outline button form, the same quiet form as the
 * Post Detail actions, so Helm Teal stays off the About page. It opens the PDF
 * in a new tab, so the page stays where the visitor left it. The trailing
 * arrow says so to the eye; the visually hidden suffix says so to a screen
 * reader.
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
      className={cx(buttonStyles({ intent: "outline" }), className)}
    >
      <HiOutlineDocumentText aria-hidden="true" data-slot="icon" />
      <span className="flex-1 text-start">{t("aboutViewCv")}</span>
      <span className="sr-only">{t("opensInNewTab")}</span>
      <HiOutlineArrowUpRight aria-hidden="true" data-slot="icon" />
    </Link>
  );
};
