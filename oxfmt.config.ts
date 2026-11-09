import { defineConfig } from "oxfmt";
import ultracite from "ultracite/oxfmt";

export default defineConfig({
  ...ultracite,
  ignorePatterns: [
    ...(ultracite.ignorePatterns ?? []),
    "**/apps/*/src/components/ui/**",
    "**/.agents",
    "**/.claude",
    "**/.cursor",
    "**/.impeccable",
    "**/.repos",
    "**/docs",
  ],
});
