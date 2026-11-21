import type { Formats, Locale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

import {
  I18N_COOKIE_NAME,
  I18N_DEFAULT_LOCALE,
  isI18NLocale,
} from "@/shared/constants/i18n";
import "server-only";

export const formats = {
  dateTime: {
    short: {
      day: "numeric",
      month: "short",
      year: "numeric",
    },
  },
  list: {
    enumeration: {
      style: "long",
      type: "conjunction",
    },
  },
  number: {
    precise: {
      maximumFractionDigits: 5,
    },
  },
} satisfies Formats;

export default getRequestConfig(async () => {
  const cookie = await cookies();
  const cookieLocale = cookie.get(I18N_COOKIE_NAME)?.value;
  // The cookie is client-controlled and feeds a dynamic import path below, so
  // only a value from the supported list is ever honored.
  const locale: Locale = isI18NLocale(cookieLocale)
    ? cookieLocale
    : I18N_DEFAULT_LOCALE;
  const messages = await import(`../../../messages/${locale}.json`);

  return {
    locale,
    messages: messages.default,
  };
});
