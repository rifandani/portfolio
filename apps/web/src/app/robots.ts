import type { MetadataRoute } from "next";

import { ENV } from "@/shared/constants/env";

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: "/",
    // disallow: '/private-page',
  },
  sitemap: new URL("/sitemap.xml", ENV.NEXT_PUBLIC_APP_URL).href,
});
export default robots;
