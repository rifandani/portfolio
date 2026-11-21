import { talks } from "@/features/talk/data/talks";
import { collectTalks } from "@/features/talk/utils/talk-collection";
import type { I18NLocale } from "@/shared/constants/i18n";

export const getTalks = (locale: I18NLocale, limit?: number) =>
  collectTalks(talks, locale, limit);
