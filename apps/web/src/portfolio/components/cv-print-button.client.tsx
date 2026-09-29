"use client";

import { useTranslations } from "next-intl";
import { HiOutlinePrinter } from "react-icons/hi2";

import { buttonStyles } from "@/core/components/ui/button";

/** Opens the browser's native print dialog. Choose “Save as PDF” there. */
export const CvPrintButton = () => {
  const t = useTranslations();

  return (
    <button
      className={buttonStyles({ intent: "primary" })}
      onClick={() => window.print()}
      type="button"
    >
      <HiOutlinePrinter aria-hidden="true" data-slot="icon" />
      {t("cvPrint")}
    </button>
  );
};
