import { BASE_URL } from "@/lib/constants";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: `${BASE_URL}/auth/login`,
    },
    // {
    //   url: `${BASE_URL}/user/links`,
    // },
    // {
    //   url: `${BASE_URL}/user/preview`,
    // },
    // {
    //   url: `${BASE_URL}/user/profile`,
    // },
  ];
}
