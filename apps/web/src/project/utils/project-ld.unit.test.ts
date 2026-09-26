import { describe, expect, it, vi } from "vitest";

import {
  createProjectCollection,
  createProjectCreativeWork,
} from "./project-ld";

vi.mock("@/core/constants/env", () => ({
  ENV: {
    NEXT_PUBLIC_APP_TITLE: "Test App",
    NEXT_PUBLIC_APP_URL: "https://web.test",
  },
}));

const project = {
  slug: "signal-kit",
  title: "Signal Kit",
  description: "Accessible patterns.",
  tags: ["React Aria", "TypeScript"],
};

describe("createProjectCreativeWork", () => {
  it("describes the Project with its OG Card, its Tags, and the person as author", () => {
    expect(
      createProjectCreativeWork({
        ...project,
        demoUrl: "https://signal-kit.example.com",
        githubUrl: "https://github.com/rifandani/signal-kit",
      })
    ).toEqual({
      "@type": "CreativeWork",
      "@id": "https://web.test/projects/signal-kit#project",
      url: "https://web.test/projects/signal-kit",
      mainEntityOfPage: "https://web.test/projects/signal-kit",
      name: "Signal Kit",
      description: "Accessible patterns.",
      image: "https://web.test/api/og?project=signal-kit",
      keywords: "React Aria, TypeScript",
      inLanguage: "en",
      author: { "@id": "https://web.test/#person" },
      sameAs: [
        "https://signal-kit.example.com",
        "https://github.com/rifandani/signal-kit",
      ],
    });
  });

  it("gives no sameAs to a Project without Project Links", () => {
    expect(createProjectCreativeWork(project)).not.toHaveProperty("sameAs");
  });
});

describe("createProjectCollection", () => {
  it("lists each Project in the order given", () => {
    const collection = createProjectCollection({
      title: "Projects",
      description: "Work.",
      projects: [
        project,
        { ...project, slug: "quiet-charts", title: "Quiet Charts" },
      ],
    });

    expect(collection).toEqual({
      "@type": "CollectionPage",
      "@id": "https://web.test/projects#webpage",
      url: "https://web.test/projects",
      name: "Projects",
      description: "Work.",
      isPartOf: { "@id": "https://web.test/#website" },
      author: { "@id": "https://web.test/#person" },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Signal Kit",
            url: "https://web.test/projects/signal-kit",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Quiet Charts",
            url: "https://web.test/projects/quiet-charts",
          },
        ],
      },
    });
  });
});
