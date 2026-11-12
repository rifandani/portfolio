import { describe, expect, it, vi } from "vitest";

import { createTalkCollection } from "./talk-ld";

vi.mock("@/shared/constants/env", () => ({
  ENV: {
    NEXT_PUBLIC_APP_TITLE: "Test App",
    NEXT_PUBLIC_APP_URL: "https://web.test",
  },
}));

const talk = {
  title: "Agent Readiness",
  description: "Making websites and codebases work for AI agents.",
  createdAt: "2026-11-10",
  link: "https://slides.example/agent-readiness",
};

describe("createTalkCollection", () => {
  it("lists Talks in order with their creation dates and authors", () => {
    expect(
      createTalkCollection({
        title: "Talks",
        description: "Slide decks.",
        talks: [talk, { ...talk, title: "Observability" }],
      })
    ).toEqual({
      "@type": "CollectionPage",
      "@id": "https://web.test/talks#webpage",
      url: "https://web.test/talks",
      name: "Talks",
      description: "Slide decks.",
      isPartOf: { "@id": "https://web.test/#website" },
      author: { "@id": "https://web.test/#person" },
      mainEntity: {
        "@type": "ItemList",
        itemListOrder: "https://schema.org/ItemListOrderDescending",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            item: {
              "@type": "PresentationDigitalDocument",
              name: "Agent Readiness",
              description: "Making websites and codebases work for AI agents.",
              dateCreated: "2026-11-10",
              url: "https://slides.example/agent-readiness",
              inLanguage: "en",
              author: { "@id": "https://web.test/#person" },
            },
          },
          {
            "@type": "ListItem",
            position: 2,
            item: {
              "@type": "PresentationDigitalDocument",
              name: "Observability",
              description: "Making websites and codebases work for AI agents.",
              dateCreated: "2026-11-10",
              url: "https://slides.example/agent-readiness",
              inLanguage: "en",
              author: { "@id": "https://web.test/#person" },
            },
          },
        ],
      },
    });
  });

  it("returns an empty ItemList when there are no Talks", () => {
    expect(
      createTalkCollection({
        title: "Talks",
        description: "Slide decks.",
        talks: [],
      }).mainEntity
    ).toMatchObject({ itemListElement: [] });
  });
});
