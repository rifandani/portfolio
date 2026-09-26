import { describe, expect, it, vi } from "vitest";

import { createBlog, createBlogPosting } from "./post-ld";

vi.mock("@/core/constants/env", () => ({
  ENV: {
    NEXT_PUBLIC_APP_TITLE: "Test App",
    NEXT_PUBLIC_APP_URL: "https://web.test",
  },
}));

const post = {
  slug: "a-post",
  title: "A Post",
  summary: "A summary.",
  publishedAt: "2024-05-12",
  updatedAt: "2024-06-01",
};

describe("createBlogPosting", () => {
  it("describes the Post with its OG Card, its dates, and the person as author", () => {
    expect(createBlogPosting(post)).toEqual({
      "@type": "BlogPosting",
      "@id": "https://web.test/posts/a-post#post",
      url: "https://web.test/posts/a-post",
      mainEntityOfPage: "https://web.test/posts/a-post",
      headline: "A Post",
      description: "A summary.",
      image: "https://web.test/api/og?post=a-post",
      datePublished: "2024-05-12",
      dateModified: "2024-06-01",
      inLanguage: "en",
      author: { "@id": "https://web.test/#person" },
      publisher: { "@id": "https://web.test/#person" },
      isPartOf: { "@id": "https://web.test/posts#blog" },
    });
  });
});

describe("createBlog", () => {
  it("lists each Post of the Blog in the order given", () => {
    const blog = createBlog({
      title: "Posts",
      description: "Writing.",
      posts: [post, { ...post, slug: "b-post", title: "B Post" }],
    });

    expect(blog).toEqual({
      "@type": "Blog",
      "@id": "https://web.test/posts#blog",
      url: "https://web.test/posts",
      name: "Posts",
      description: "Writing.",
      inLanguage: "en",
      author: { "@id": "https://web.test/#person" },
      publisher: { "@id": "https://web.test/#person" },
      isPartOf: { "@id": "https://web.test/#website" },
      blogPost: [
        {
          "@type": "BlogPosting",
          "@id": "https://web.test/posts/a-post#post",
          url: "https://web.test/posts/a-post",
          headline: "A Post",
          datePublished: "2024-05-12",
        },
        {
          "@type": "BlogPosting",
          "@id": "https://web.test/posts/b-post#post",
          url: "https://web.test/posts/b-post",
          headline: "B Post",
          datePublished: "2024-05-12",
        },
      ],
    });
  });
});
