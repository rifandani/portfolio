interface NetworkTarget {
  name: string;
  url: string;
  /** Query parameter that takes the Post Detail address. */
  urlParam: string;
  /** Query parameter that takes the Post title, if the Network has a text box. */
  textParam?: string;
}

/**
 * The Social Networks a reader can share a Post Detail to, in menu order. Each
 * one opens its compose page with the address filled in; none posts it without
 * the reader.
 */
const NETWORKS = {
  x: {
    name: "X",
    url: "https://x.com/intent/tweet",
    urlParam: "url",
    textParam: "text",
  },
  linkedin: {
    name: "LinkedIn",
    // LinkedIn reads the title and summary from the page's Open Graph tags.
    url: "https://www.linkedin.com/sharing/share-offsite/",
    urlParam: "url",
  },
  threads: {
    name: "Threads",
    url: "https://www.threads.com/intent/post",
    urlParam: "url",
    textParam: "text",
  },
} satisfies Record<string, NetworkTarget>;

export type Network = keyof typeof NETWORKS;

export const networks =
  // SAFETY: `NETWORKS` is a literal with no prototype keys, so `Object.keys` returns exactly the `Network` names.
  Object.keys(NETWORKS) as Network[];

export const networkName = (network: Network) => NETWORKS[network].name;

/**
 * The URL of a Share Intent: the Network's compose page with the Post Detail
 * address and, where the Network takes text, the Post title.
 */
export const shareIntentUrl = (
  network: Network,
  { url, title }: { url: string; title: string }
) => {
  const target: NetworkTarget = NETWORKS[network];
  const intent = new URL(target.url);
  if (target.textParam) {
    intent.searchParams.set(target.textParam, title);
  }
  intent.searchParams.set(target.urlParam, url);
  return intent.href;
};
