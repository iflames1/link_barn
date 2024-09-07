import { BASE_URL } from "@/lib/constants";
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/user", "/terms-and-conditions"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
