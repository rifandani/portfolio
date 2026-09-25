---
slug: synthetic-signal-kit
title: "[Synthetic] Signal Kit"
description: Accessible component patterns for portfolio and product shells.
tags: [React Aria, Tailwind, TypeScript]
order: 1
previewSrc: /placeholders/project-og-1.svg
previewAlt: Synthetic preview artwork for Signal Kit
demoUrl: https://signal-kit.example.com
githubUrl: https://github.com/rifandani/portfolio
---

This is a synthetic placeholder Project. It shows how a Project Detail renders until a real write-up replaces it.

## The problem

Each product shell had its own buttons, menus, and dialogs. Each copy had different keyboard behavior, and some copies had none.

## The approach

The kit wraps React Aria primitives and gives them one set of styles. A component owns its behavior, and the page owns only its layout.

```ts title="button.tsx" mark="intent"
export const Button = ({ intent = "primary", ...props }: ButtonProps) => (
  <RacButton {...props} className={buttonStyles({ intent })} />
);
```

## Results

- One keyboard model for every menu and dialog.
- Focus rings that show in forced-colors mode.
- Fewer one-off components in each product.
