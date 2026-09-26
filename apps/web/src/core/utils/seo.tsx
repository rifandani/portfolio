/* oxlint-disable react-doctor/only-export-components react/no-danger */
import type { Metadata } from "next";
import { assign } from "radashi";
import type {
  BreadcrumbList,
  Graph,
  Person,
  Thing,
  WebPage,
  WebSite,
} from "schema-dts";

import { OG_SIZE, ogImagePath } from "@/app/api/og/og-params";
import type { OgCard } from "@/app/api/og/og-params";
import { ENV } from "@/core/constants/env";
import { I18N_LOCALES } from "@/core/constants/i18n";
import {
  portfolioIdentity,
  socialLinks,
} from "@/portfolio/constants/portfolio";

const applicationName = ENV.NEXT_PUBLIC_APP_TITLE;
const appUrl = ENV.NEXT_PUBLIC_APP_URL;
const publisher = portfolioIdentity.fullName;
const xHandle = `@${portfolioIdentity.xHandle}`;

/**
 * The language of every Post and every Project. A Locale changes the UI around
 * them, not their text, so their JSON-LD and `og:locale` stay the same.
 */
export const CONTENT_LANGUAGE = "en";
/** `CONTENT_LANGUAGE` in the `language_TERRITORY` form Open Graph wants. */
const CONTENT_OG_LOCALE = "en_US";

/** The absolute form of a site path: Link Previews and crawlers need it. */
export const absoluteUrl = (path: string) => new URL(path, appUrl).href;

const author = {
  name: publisher,
  url: absoluteUrl("/about"),
} satisfies Metadata["authors"];

interface MetadataParts {
  title: string;
  parsedTitle: string;
  description: string;
  ogCard: string;
  /** The absolute address of the page; `null` for a page with no own address. */
  url: string | null;
}

/**
 * A Link Preview shows `og:site_name` beside the title, so the title stays
 * bare here. Only `<title>` carries the site name.
 */
const buildOpenGraph = ({
  title,
  description,
  ogCard,
  url,
}: MetadataParts): Metadata["openGraph"] => ({
  countryName: "Indonesia",
  description,
  images: [
    {
      alt: title,
      ...OG_SIZE,
      url: ogCard,
    },
  ],
  locale: CONTENT_OG_LOCALE,
  siteName: applicationName,
  title,
  type: "website",
  ...(url && { url }),
});

/** X takes numeric account ids too; the site knows only the handle. */
const buildTwitter = ({
  title,
  description,
  ogCard,
}: MetadataParts): Metadata["twitter"] => ({
  card: "summary_large_image",
  creator: xHandle,
  description,
  images: [ogCard],
  site: xHandle,
  title,
});

const buildDefaultMetadata = (parts: MetadataParts): Metadata => {
  const { parsedTitle, description, url } = parts;
  return {
    // Makes the relative OG Card URL absolute. Without it, Next.js falls back
    // to localhost on a self-hosted build and no Link Preview loads the image.
    metadataBase: new URL(appUrl),
    title: parsedTitle,
    description,
    applicationName,
    publisher,
    authors: author,
    creator: author.name,
    category: "Personal Blog or Website",
    icons: "/favicon.ico",
    generator: "Next.js",
    // keywords: [publisher, 'web.com'], // no longer recommended by Google
    robots: {
      follow: true, // allow all search engines to follow the links on the site
      index: true, // allow all search engines to index the site
    },
    formatDetection: {
      telephone: true,
    },
    appleWebApp: {
      capable: true,
      statusBarStyle: "default",
      title: parsedTitle,
    },
    openGraph: buildOpenGraph(parts),
    twitter: buildTwitter(parts),
    // Every page names the Post feed, so a feed reader finds it from any URL.
    // `createMetadata` deep-merges, so a page that adds its own
    // `alternates.types` keeps this one and its canonical address.
    alternates: {
      ...(url && { canonical: url }),
      types: {
        "application/rss+xml": [
          {
            title: `${publisher} · Posts`,
            url: absoluteUrl("/rss.xml"),
          },
        ],
      },
    },
  };
};

/**
 * `path` is the address of the page: it becomes the canonical address and the
 * `og:url`. A page with no own address (a 404, the root layout) passes `null`.
 *
 * `card` picks the generated OG card: a Post or a Project names its slug and
 * gets its own card, and every other page gets a page card of its title and
 * description. `image` replaces the generated card with a fixed image.
 */
export const createMetadata = ({
  title,
  description,
  path,
  image,
  card = { kind: "page", title, description },
  ...properties
}: Omit<Metadata, "description" | "title"> & {
  title: string;
  description: string;
  path: string | null;
  image?: string;
  card?: OgCard;
}) => {
  const parsedTitle = `${title} | ${applicationName}`;
  const ogCard = ogImagePath(card);
  const url = path === null ? null : absoluteUrl(path);
  // Merge the default metadata with any additional properties passed in
  const metadata = assign(
    buildDefaultMetadata({ title, description, ogCard, parsedTitle, url }),
    properties
  );
  // If an image URL was provided and OpenGraph metadata exists,
  // override the default OG image with the provided image details
  if (image && metadata.openGraph) {
    metadata.openGraph.images = [
      {
        alt: title,
        height: 630,
        url: image,
        width: 1200,
      },
    ];
  }
  // SAFETY: `assign` erases the declared shape into a structural intersection of
  // the Metadata defaults and the caller's `Omit<Metadata, ...>` extras, so every
  // member of the result already comes from Metadata.
  return metadata as Metadata;
};
/**
 * The ids of the two nodes every graph can point at. They are stable, so a
 * crawler joins the same Person and WebSite across all pages of the site.
 */
const PERSON_ID = absoluteUrl("/#person");
const WEBSITE_ID = absoluteUrl("/#website");

/** A pointer to the Person node, as the author or the publisher of a node. */
export const personRef = { "@id": PERSON_ID } as const;

/** A pointer to the WebSite node, for a node that is part of the site. */
export const webSiteRef = { "@id": WEBSITE_ID } as const;

/** The absolute address of an OG Card, for the `image` of a JSON-LD node. */
export const ogCardUrl = (card: OgCard) => absoluteUrl(ogImagePath(card));

/**
 * The person the Public Site is about. `sameAs` names the public profiles, so
 * a crawler knows they are the same person; an email address is not a profile.
 */
export const createPerson = (): Person => ({
  "@type": "Person",
  "@id": PERSON_ID,
  name: portfolioIdentity.fullName,
  url: absoluteUrl("/about"),
  sameAs: [
    ...socialLinks.flatMap((link) =>
      link.href.startsWith("https://") ? [link.href] : []
    ),
    `https://x.com/${portfolioIdentity.xHandle}`,
  ],
});

/** The site. Its UI comes in each Locale; Posts and Projects keep one language. */
export const createWebSite = (): WebSite => ({
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: absoluteUrl("/"),
  name: applicationName,
  description: portfolioIdentity.siteDescription,
  inLanguage: [...I18N_LOCALES],
  publisher: personRef,
});

/** A page of the site that is about the person, such as Home or About. */
export const createWebPage = ({
  path,
  title,
  description,
}: {
  path: string;
  title: string;
  description: string;
}): WebPage => {
  const url = absoluteUrl(path);
  return {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    isPartOf: webSiteRef,
    about: personRef,
  };
};

/** The trail a detail page shows above its title, in the same order. */
export const createBreadcrumbList = (
  crumbs: readonly { name: string; path: string }[]
): BreadcrumbList => ({
  "@type": "BreadcrumbList",
  itemListElement: crumbs.map((crumb, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: crumb.name,
    item: absoluteUrl(crumb.path),
  })),
});

/**
 * `JSON.stringify` leaves `<`, `>` and the U+2028/U+2029 line separators raw,
 * so a graph value containing `</script>` would break out of the tag. Escaping
 * them as JSON string escapes keeps the payload byte-identical after parsing.
 */
const JSON_LD_ESCAPES = {
  "<": "\\u003c",
  ">": "\\u003e",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029",
} as const;
type JsonLdUnsafeChar = keyof typeof JSON_LD_ESCAPES;
// A literal rather than `new RegExp(Object.keys(...))`: a computed class would
// need every key escaped, so adding `]`, `\`, `^` or `-` to the map above would
// silently corrupt the pattern. The cost is that the two can drift, so
// `seo.unit.test.ts` asserts the pattern matches every key of the map.
const JSON_LD_UNSAFE = /[<>\u2028\u2029]/gu;

/** Exposed so `seo.unit.test.ts` can assert the pattern covers every key. */
export const jsonLdEscapeInternals = {
  escapes: JSON_LD_ESCAPES,
  pattern: JSON_LD_UNSAFE,
} as const;

/** Serialize a JSON-LD payload safely for embedding in an inline `<script>`. */
const serializeJsonLd = (payload: Graph): string =>
  JSON.stringify(payload).replace(
    JSON_LD_UNSAFE,
    // SAFETY: `JSON_LD_UNSAFE` only matches the characters keyed in JSON_LD_ESCAPES.
    (char) => JSON_LD_ESCAPES[char as JsonLdUnsafeChar]
  );

export const JsonLd = ({ graphs }: { graphs: readonly Thing[] }) => {
  const payload: Graph = {
    "@context": "https://schema.org",
    "@graph": graphs,
  };
  return (
    <script
      data-testid="schema-org-graph"
      type="application/ld+json"
      // fallow-ignore-next-line security-sink -- serializeJsonLd escapes <, > and U+2028/U+2029; covered by seo.unit.test.ts
      dangerouslySetInnerHTML={{
        __html: serializeJsonLd(payload),
      }}
    />
  );
};
