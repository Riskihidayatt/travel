import type { MetadataRoute } from "next";
import { getTrips } from "@/content";
import { todayISO } from "@/lib/dates";
import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const trips = getTrips(todayISO());
  return [
    { url: base, changeFrequency: "daily", priority: 1 },
    ...trips.map((t) => ({ url: `${base}/trips/${t.slug}`, changeFrequency: "daily" as const, priority: 0.8 })),
  ];
}
