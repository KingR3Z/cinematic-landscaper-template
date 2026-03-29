import type { MetadataRoute } from "next";
import { client } from "@/config/client";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = `https://${client.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.vercel.app`;

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
