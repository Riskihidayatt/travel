import { describe, expect, it } from "vitest";
import type { Trip } from "@/content/types";
import { buildTripViews, getRelatedTrips, getUpcomingBookableTrips } from "./trips";

const base: Omit<Trip, "slug" | "startDate" | "endDate" | "category" | "quota"> = {
  title: "T",
  destination: "D",
  tagline: "",
  description: "",
  coverImage: { src: "x", alt: "x" },
  gallery: [],
  durationLabel: "2D1N",
  meetingPoint: { name: "", address: "", time: "" },
  price: 1,
  highlights: [],
  itinerary: [],
  includes: [],
  excludes: [],
  tags: [],
  featured: false,
};

const make = (slug: string, startDate: string, booked: number, category: Trip["category"] = "gunung"): Trip => ({
  ...base,
  slug,
  startDate,
  endDate: startDate,
  category,
  quota: { total: 10, booked },
});

const today = "2026-10-23";
const trips = buildTripViews(
  [
    make("selesai", "2026-10-10", 2),
    make("jauh", "2026-12-01", 1, "pulau"),
    make("full", "2026-11-01", 10),
    make("dekat", "2026-10-30", 2),
  ],
  today,
);

describe("trip selectors", () => {
  it("urutan tampil: terdekat dulu, trip selesai paling akhir", () => {
    expect(trips.map((t) => t.slug)).toEqual(["dekat", "full", "jauh", "selesai"]);
  });

  it("upcoming bookable melewati Full & Selesai", () => {
    expect(getUpcomingBookableTrips(trips).map((t) => t.slug)).toEqual(["dekat", "jauh"]);
    expect(getUpcomingBookableTrips(trips, 1).map((t) => t.slug)).toEqual(["dekat"]);
  });

  it("rekomendasi mengutamakan kategori sama & tanpa trip selesai", () => {
    const current = trips.find((t) => t.slug === "dekat")!;
    expect(getRelatedTrips(trips, current).map((t) => t.slug)).toEqual(["full", "jauh"]);
  });
});
