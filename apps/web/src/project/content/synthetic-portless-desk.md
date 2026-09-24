---
slug: synthetic-portless-desk
title: "[Synthetic] Portless Desk"
description: Local-first tooling notes and developer workflow experiments.
tags: [Bun, CLI, TypeScript]
order: 2
previewSrc: /placeholders/project-og-2.svg
previewAlt: Synthetic preview artwork for Portless Desk
---

This is a synthetic placeholder Project. It shows how a Project Detail renders until a real write-up replaces it.

## The problem

Each worktree needed its own port, and developers had to remember which port went with which branch.

## The approach

A small CLI gives each worktree a stable name and serves it at that name. No developer types a port number.

```ts title="serve.ts"
const url = `https://${name}.localhost`;
console.log(`Serving ${branch} at ${url}`);
```

## Results

- Links that stay the same when the branch changes.
- No port collisions between worktrees.
