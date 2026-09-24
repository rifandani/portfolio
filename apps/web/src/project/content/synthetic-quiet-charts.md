---
slug: synthetic-quiet-charts
title: "[Synthetic] Quiet Charts"
description: Restrained data display for status and trend reading.
tags: [Recharts, SVG, Design tokens]
order: 4
previewSrc: /placeholders/project-og-4.svg
previewAlt: Synthetic preview artwork for Quiet Charts
demoUrl: https://quiet-charts.example.com
githubUrl: https://github.com/rifandani/portfolio
---

This is a synthetic placeholder Project. It shows how a Project Detail renders until a real write-up replaces it.

## The problem

Dashboards used many colors, so the reader could not find the one value that changed.

## The approach

Charts use one accent color for the series that matters. All other series use neutral tokens.

```css title="chart.css"
.chart-series {
  stroke: var(--color-muted-fg);
}
```

## Results

- A reader finds the important series first.
- The charts use the same tokens in all themes.
