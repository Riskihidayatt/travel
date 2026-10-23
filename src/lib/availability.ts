import { diffInDays } from "./dates";

export type AvailabilityStatus = "open" | "almost-full" | "full" | "finished";

export interface Quota {
  total: number;
  booked: number;
}

export interface Availability {
  status: AvailabilityStatus;
  label: string;
  seatsLeft: number;
  /** 0–1, porsi kuota yang sudah terisi (untuk progress bar). */
  filledRatio: number;
  /** Masih bisa daftar langsung (Open / Hampir Penuh). */
  isBookable: boolean;
  /** Hari menuju keberangkatan (negatif jika sudah lewat). */
  daysUntilDeparture: number;
}

export const STATUS_LABEL: Record<AvailabilityStatus, string> = {
  open: "Open",
  "almost-full": "Hampir Penuh",
  full: "Full",
  finished: "Selesai",
};

/** Sisa seat, tidak pernah negatif walau data booked > total. */
export function getSeatsLeft(quota: Quota): number {
  const total = Math.max(0, Math.floor(quota.total));
  const booked = Math.max(0, Math.floor(quota.booked));
  return Math.max(0, total - booked);
}

/**
 * Ambang "Hampir Penuh": sisa seat <= 20% kuota, minimal 3 seat.
 * Contoh: kuota 14 -> hampir penuh saat sisa <= 3; kuota 30 -> saat sisa <= 6.
 */
export function getAlmostFullThreshold(total: number): number {
  return Math.max(3, Math.ceil(total * 0.2));
}

/**
 * Hitung status ketersediaan trip.
 * Urutan prioritas:
 * 1. Selesai  -> hari ini sudah >= tanggal berangkat (pendaftaran ditutup).
 * 2. Full     -> sisa seat 0.
 * 3. Hampir Penuh -> sisa seat <= ambang.
 * 4. Open.
 */
export function getAvailability(params: { quota: Quota; startDate: string; today: string }): Availability {
  const { quota, startDate, today } = params;
  const seatsLeft = getSeatsLeft(quota);
  const total = Math.max(0, Math.floor(quota.total));
  const filledRatio = total === 0 ? 1 : Math.min(1, (total - seatsLeft) / total);
  const daysUntilDeparture = diffInDays(today, startDate);

  let status: AvailabilityStatus;
  if (daysUntilDeparture <= 0) status = "finished";
  else if (seatsLeft === 0) status = "full";
  else if (seatsLeft <= getAlmostFullThreshold(total)) status = "almost-full";
  else status = "open";

  return {
    status,
    label: STATUS_LABEL[status],
    seatsLeft,
    filledRatio,
    isBookable: status === "open" || status === "almost-full",
    daysUntilDeparture,
  };
}
