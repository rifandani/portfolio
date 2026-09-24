"use client";

import { useTranslations } from "next-intl";

import { buttonStyles } from "@/core/components/ui/button";
import { Link } from "@/core/components/ui/link";

/**
 * "Go to home page", as a link that looks like a button. Client-side because
 * `buttonStyles` lives in a client module, and the server cannot call it.
 */
export const HomeLink = ({
  intent = "primary",
}: {
  intent?: "primary" | "outline";
}) => {
  const t = useTranslations();
  return (
    <Link href="/" variant="plain" className={buttonStyles({ intent })}>
      {t("statusGoHome")}
    </Link>
  );
};
