import type { Trip } from "@/content/types";
import { getAvailability, type Availability } from "./availability";
import { formatDateRange } from "./format";

/** Trip + data turunan yang sudah dihitung di server (siap jadi props). */
export interface TripView extends Trip {
  availability: Availability;
  dateLabel: string;
  dateLabelShort: string;
}

export function toTripView(trip: Trip, today: string): TripView {
  return {
    ...trip,
    availability: getAvailability({ quota: trip.quota, startDate: trip.startDate, today }),
    dateLabel: formatDateRange(trip.startDate, trip.endDate),
    dateLabelShort: formatDateRange(trip.startDate, trip.endDate, { withYear: false }),
  };
}

/**
 * Urutkan trip untuk ditampilkan: yang masih bisa dipesan / full berdasarkan
 * tanggal terdekat, trip yang sudah lewat (Selesai) di paling akhir.
 */
export function sortTripsForDisplay(trips: TripView[]): TripView[] {
  return [...trips].sort((a, b) => {
    const aDone = a.availability.status === "finished" ? 1 : 0;
    const bDone = b.availability.status === "finished" ? 1 : 0;
    if (aDone !== bDone) return aDone - bDone;
    return aDone ? b.startDate.localeCompare(a.startDate) : a.startDate.localeCompare(b.startDate);
  });
}

export function buildTripViews(trips: Trip[], today: string): TripView[] {
  return sortTripsForDisplay(trips.map((trip) => toTripView(trip, today)));
}

/** Trip yang masih bisa didaftar, urut dari tanggal terdekat. */
export function getUpcomingBookableTrips(trips: TripView[], limit = Infinity): TripView[] {
  return trips
    .filter((t) => t.availability.isBookable)
    .sort((a, b) => a.startDate.localeCompare(b.startDate))
    .slice(0, limit);
}

/** Rekomendasi: kategori sama dulu, lalu trip lain yang masih bookable. */
export function getRelatedTrips(trips: TripView[], current: TripView, limit = 3): TripView[] {
  const others = trips.filter((t) => t.slug !== current.slug && t.availability.status !== "finished");
  const sameCategory = others.filter((t) => t.category === current.category);
  const rest = others.filter((t) => t.category !== current.category);
  return [...sameCategory, ...rest].slice(0, limit);
}

export const CATEGORY_LABEL: Record<Trip["category"], string> = {
  gunung: "Gunung",
  sailing: "Sailing",
  pulau: "Pulau",
  budaya: "Budaya",
};
