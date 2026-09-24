---
slug: synthetic-lattice-forms
title: "[Synthetic] Lattice Forms"
description: Form patterns with clear errors, focus, and validation states.
tags: [React, TanStack Form, Zod]
order: 3
previewSrc: /placeholders/project-og-3.svg
previewAlt: Synthetic preview artwork for Lattice Forms
demoUrl: https://lattice-forms.example.com
githubUrl: https://github.com/rifandani/portfolio
---

This is a synthetic placeholder Project. It shows how a Project Detail renders until a real write-up replaces it.

## The problem

Forms showed errors at different times and in different places. Screen reader users often did not know that a field had an error.

## The approach

One schema checks the form on the client and on the server. Each field shows its error below it and links the error to the input.

### Error timing

A field shows its error after the user leaves it, not while the user types.

## Results

- The same error text on the client and the server.
- Focus moves to the first field with an error on submit.
