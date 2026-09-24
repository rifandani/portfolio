import { describe, expect, it } from "vitest";

import { networks, shareIntentUrl } from "./share-intent";

const POST = {
  url: "https://example.com/posts/clarity",
  title: "Clarity over complexity",
};

const parts = (href: string) => {
  const url = new URL(href);
  return {
    page: `${url.origin}${url.pathname}`,
    params: Object.fromEntries(url.searchParams),
  };
};

describe("shareIntentUrl", () => {
  it("puts the address and title in the parameters each Network reads", () => {
    expect(
      networks.map((network) => parts(shareIntentUrl(network, POST)))
    ).toEqual([
      {
        page: "https://x.com/intent/tweet",
        params: { text: POST.title, url: POST.url },
      },
      {
        page: "https://www.linkedin.com/sharing/share-offsite/",
        params: { url: POST.url },
      },
      {
        page: "https://www.threads.com/intent/post",
        params: { text: POST.title, url: POST.url },
      },
    ]);
  });

  it("encodes characters that would end the title early", () => {
    const title = "A & B = C? #1, at 100%";

    expect(parts(shareIntentUrl("x", { ...POST, title })).params).toEqual({
      text: title,
      url: POST.url,
    });
  });
});
