import type { CollectionPage } from "schema-dts";

import type { TalkInLocale } from "@/features/talk/data/talks";
import {
  absoluteUrl,
  CONTENT_LANGUAGE,
  personRef,
  webSiteRef,
} from "@/utils/seo";

export const createTalkCollection = ({
  title,
  description,
  talks,
}: {
  title: string;
  description: string;
  talks: readonly TalkInLocale[];
}): CollectionPage => {
  const url = absoluteUrl("/talks");
  return {
    "@type": "CollectionPage",
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    isPartOf: webSiteRef,
    author: personRef,
    mainEntity: {
      "@type": "ItemList",
      itemListOrder: "https://schema.org/ItemListOrderDescending",
      itemListElement: talks.map((talk, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "PresentationDigitalDocument",
          name: talk.title,
          description: talk.description,
          dateCreated: talk.createdAt,
          url: talk.link,
          // The language of the slides, which stay in English.
          inLanguage: CONTENT_LANGUAGE,
          author: personRef,
        },
      })),
    },
  };
};
