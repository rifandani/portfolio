import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  createBreadcrumbList,
  createMetadata,
  createPerson,
  createWebPage,
  createWebSite,
  JsonLd,
  jsonLdEscapeInternals,
  ogCardUrl,
} from "./seo";

vi.mock("@/core/constants/env", () => ({
  ENV: {
    NEXT_PUBLIC_APP_TITLE: "Test App",
    NEXT_PUBLIC_APP_URL: "https://web.test",
  },
}));

describe("createMetadata", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("builds default metadata with branded title", () => {
    const metadata = createMetadata({
      title: "Home",
      description: "Welcome",
      path: "/",
    });

    expect(metadata).toMatchObject({
      title: "Home | Test App",
      description: "Welcome",
      applicationName: "Test App",
      publisher: "Tri Rizeki Rifandani",
      authors: { name: "Tri Rizeki Rifandani", url: "https://web.test/about" },
      creator: "Tri Rizeki Rifandani",
      robots: { follow: true, index: true },
      appleWebApp: {
        capable: true,
        statusBarStyle: "default",
        title: "Home | Test App",
      },
      openGraph: {
        description: "Welcome",
        images: [
          {
            alt: "Home",
            height: 630,
            url: "/api/og?title=Home&description=Welcome",
            width: 1200,
          },
        ],
        locale: "en_US",
        siteName: "Test App",
        title: "Home",
        type: "website",
        url: "https://web.test/",
      },
      twitter: {
        card: "summary_large_image",
        creator: "@tri_rizeki",
        description: "Welcome",
        images: ["/api/og?title=Home&description=Welcome"],
        site: "@tri_rizeki",
        title: "Home",
      },
    });
  });

  it("resolves every relative metadata URL against the app URL", () => {
    const metadata = createMetadata({
      title: "Home",
      description: "Welcome",
      path: "/",
    });

    expect(String(metadata.metadataBase)).toBe("https://web.test/");
  });

  it("names the page address as the canonical address and the og:url", () => {
    const metadata = createMetadata({
      title: "A Post",
      description: "A summary",
      path: "/posts/a-post",
    });

    expect(metadata.alternates?.canonical).toBe(
      "https://web.test/posts/a-post"
    );
    expect(metadata.openGraph?.url).toBe("https://web.test/posts/a-post");
  });

  it("gives no canonical address to a page without its own path", () => {
    const metadata = createMetadata({
      title: "Not found",
      description: "No page here",
      path: null,
    });

    expect(metadata.alternates).not.toHaveProperty("canonical");
    expect(metadata.openGraph).not.toHaveProperty("url");
  });

  it("gives no numeric X account ids, because the site knows only the handle", () => {
    const { twitter } = createMetadata({
      title: "Home",
      description: "Welcome",
      path: "/",
    });

    expect(twitter).not.toHaveProperty("siteId");
    expect(twitter).not.toHaveProperty("creatorId");
  });

  it("keeps the feed and the canonical address when a page adds an alternate type", () => {
    const metadata = createMetadata({
      title: "A Post",
      description: "A summary",
      path: "/posts/a-post",
      alternates: {
        types: { "text/markdown": "https://web.test/posts/a-post.md" },
      },
    });

    expect(metadata.alternates).toEqual({
      canonical: "https://web.test/posts/a-post",
      types: {
        "application/rss+xml": [
          {
            title: "Tri Rizeki Rifandani · Posts",
            url: "https://web.test/rss.xml",
          },
        ],
        "text/markdown": "https://web.test/posts/a-post.md",
      },
    });
  });

  it("keeps the default OG image when no image override is passed", () => {
    const metadata = createMetadata({
      title: "Home",
      description: "Welcome",
      path: "/",
    });

    // Pins `image && metadata.openGraph` — `image || …` would overwrite with
    // an undefined url; `true` would always enter the override branch.
    expect(metadata.openGraph?.images).toEqual([
      {
        alt: "Home",
        height: 630,
        url: "/api/og?title=Home&description=Welcome",
        width: 1200,
      },
    ]);
  });

  it("points a Post at its own card by slug", () => {
    const metadata = createMetadata({
      title: "A Post",
      description: "A summary",
      path: "/posts/a-post",
      card: { kind: "post", slug: "a-post" },
    });

    expect(metadata.twitter?.images).toEqual(["/api/og?post=a-post"]);
  });

  it("overrides openGraph image when image is provided", () => {
    const metadata = createMetadata({
      title: "Post",
      description: "A post",
      path: "/posts/post",
      image: "https://cdn.test/cover.png",
    });

    expect(metadata.openGraph?.images).toEqual([
      {
        alt: "Post",
        height: 630,
        url: "https://cdn.test/cover.png",
        width: 1200,
      },
    ]);
  });

  it("merges additional metadata properties", () => {
    const metadata = createMetadata({
      title: "About",
      description: "About page",
      path: "/about",
      category: "Tri Rizeki Rifandani",
    });

    expect(metadata.category).toBe("Tri Rizeki Rifandani");
  });
});

describe("createPerson", () => {
  it("names the person with a stable id and links each public profile", () => {
    expect(createPerson()).toEqual({
      "@type": "Person",
      "@id": "https://web.test/#person",
      name: "Tri Rizeki Rifandani",
      url: "https://web.test/about",
      sameAs: [
        "https://github.com/rifandani",
        "https://linkedin.com/in/rifandani",
        "https://x.com/tri_rizeki",
      ],
    });
  });
});

describe("createWebSite", () => {
  it("names the site with a stable id and the person as its publisher", () => {
    expect(createWebSite()).toEqual({
      "@type": "WebSite",
      "@id": "https://web.test/#website",
      url: "https://web.test/",
      name: "Test App",
      description:
        "Personal portfolio for Tri Rizeki Rifandani — work experience, projects, and writing.",
      inLanguage: ["en", "id"],
      publisher: { "@id": "https://web.test/#person" },
    });
  });
});

describe("createWebPage", () => {
  it("makes a page of the site about the person, with an id from its address", () => {
    expect(
      createWebPage({ path: "/about", title: "About", description: "Desc" })
    ).toEqual({
      "@type": "WebPage",
      "@id": "https://web.test/about#webpage",
      url: "https://web.test/about",
      name: "About",
      description: "Desc",
      isPartOf: { "@id": "https://web.test/#website" },
      about: { "@id": "https://web.test/#person" },
    });
  });
});

describe("createBreadcrumbList", () => {
  it("numbers each crumb from 1 with its absolute address", () => {
    expect(
      createBreadcrumbList([
        { name: "Posts", path: "/posts" },
        { name: "A Post", path: "/posts/a-post" },
      ])
    ).toEqual({
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Posts",
          item: "https://web.test/posts",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "A Post",
          item: "https://web.test/posts/a-post",
        },
      ],
    });
  });
});

describe("ogCardUrl", () => {
  it("gives the absolute address of an OG Card", () => {
    expect(ogCardUrl({ kind: "post", slug: "a-post" })).toBe(
      "https://web.test/api/og?post=a-post"
    );
  });
});

// SAFETY: React types `__html` as `string | TrustedHTML`; `JsonLd` always assigns
// the `JSON.stringify` output of `serializeJsonLd`.
const jsonLdHtml = (graphs: Parameters<typeof JsonLd>[0]["graphs"]): string =>
  JsonLd({ graphs }).props.dangerouslySetInnerHTML.__html as string;

// SAFETY: the HTML under test is always a `serializeJsonLd` payload, so the parse
// yields the graph shape these assertions read.
const parseJsonLd = (html: string) =>
  JSON.parse(html) as { "@graph": [{ name: string }] };

describe("JsonLd", () => {
  it("serializes the graph into a ld+json script element", () => {
    const graphs = [
      createWebPage({ path: "/about", title: "About", description: "Desc" }),
    ];
    const element = JsonLd({ graphs });

    expect(element.type).toBe("script");
    expect(element.props.type).toBe("application/ld+json");
    expect(JSON.parse(jsonLdHtml(graphs))).toMatchObject({
      "@context": "https://schema.org",
      "@graph": [{ "@type": "WebPage", url: "https://web.test/about" }],
    });
  });

  it("escapes characters that would break out of the script tag", () => {
    const graphs = [
      createWebPage({
        path: "/about",
        title: "</script><script>alert(1)</script>",
        description: "Desc",
      }),
    ];
    const html = jsonLdHtml(graphs);

    // No literal tag delimiters survive, so the payload cannot escape the tag.
    expect(html).not.toContain("</script");
    expect(html).not.toContain("<");
    expect(html).not.toContain(">");
    expect(html).toContain("\\u003c");

    // Escaping is transparent: the parsed value is still the original string.
    const parsed = parseJsonLd(html);
    expect(parsed["@graph"][0].name).toBe("</script><script>alert(1)</script>");
  });

  // End-to-end cover for each character currently escaped. The map/pattern
  // sync invariant itself is asserted structurally in the test below.
  it.each([
    ["<", "less-than"],
    [">", "greater-than"],
    ["\u2028", "U+2028 line separator"],
    ["\u2029", "U+2029 paragraph separator"],
  ])("escapes %s (%s) without leaving a gap", (char) => {
    const title = `a${char}b`;
    const graphs = [
      createWebPage({ path: "/about", title, description: "Desc" }),
    ];
    const html = jsonLdHtml(graphs);

    expect(html).not.toContain(char);
    expect(html).not.toContain("undefined");

    const parsed = parseJsonLd(html);
    expect(parsed["@graph"][0].name).toBe(title);
  });

  // The pattern and the escape map are declared separately, so a key added to
  // the map without a matching character-class entry would go unescaped. This
  // catches that drift for any future key, not just the ones tabled above.
  it("matches every character the escape map declares", () => {
    const { escapes, pattern } = jsonLdEscapeInternals;
    // Fresh non-global copy: `pattern` is /g and .test() would advance lastIndex.
    const probe = new RegExp(pattern.source, "u");

    for (const char of Object.keys(escapes)) {
      expect(probe.test(char)).toBe(true);
    }
  });
});
