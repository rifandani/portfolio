---
slug: synthetic-typescript-lessons-from-real-builds
title: "[Synthetic] TypeScript lessons from real builds"
summary: Practical typing patterns that keep RSC boundaries honest.
publishedAt: 2023-11-07
previewSrc: /placeholders/post-og-4.svg
previewAlt: Synthetic preview art for TypeScript lessons
---

This is a synthetic placeholder Post. It shows how a Post Detail renders until real writing replaces it.

## Parse at the boundary

Data that crosses a boundary gets a schema. Inside the boundary, the type is a fact, not a hope.

```ts title="post.ts" {8} mark="z.infer"
import { z } from "zod";

const postSchema = z.object({
  slug: z.string(),
  publishedAt: z.iso.date(),
});

export type Post = z.infer<typeof postSchema>;
```

## Props that serialize

A Server Component can pass only serializable props to a Client Component. Keep functions on the server side, and pass plain data across.[^1]

[^1]: Server Actions are the exception: React passes a reference, not the function.
