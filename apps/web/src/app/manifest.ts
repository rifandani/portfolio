import type { MetadataRoute } from "next";

const manifest = (): MetadataRoute.Manifest => ({
  background_color: "#fbfaf7", // Splash canvas — matches `--canvas` in globals.css
  description:
    "Personal portfolio for Tri Rizeki Rifandani — work experience, projects, and writing.",
  display: "browser", // Explicitly use the browser UI
  display_override: ["window-controls-overlay"],
  icons: [
    {
      sizes: "64x64",
      src: "/pwa-64x64.png",
      type: "image/png",
    },
    {
      sizes: "192x192",
      src: "/pwa-192x192.png",
      type: "image/png",
    },
    {
      purpose: "any",
      sizes: "512x512",
      src: "/pwa-512x512.png",
      type: "image/png",
    },
    {
      purpose: "maskable",
      sizes: "512x512",
      src: "/maskable-icon-512x512.png",
      type: "image/png",
    },
  ],
  name: "Tri Rizeki Rifandani",
  short_name: "Tri Rizeki Rifandani",
  start_url: "/", // Or your preferred landing page
  theme_color: "#009689", // `--primary` in globals.css, as hex
});
export default manifest;
