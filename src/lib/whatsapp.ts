import type { AvailabilityStatus } from "./availability";

/**
 * Normalisasi nomor WA ke format internasional tanpa simbol (yang diminta wa.me).
 * "0812-3456-7890" -> "6281234567890", "+62 812 3456 7890" -> "6281234567890".
 */
export function normalizeWhatsAppNumber(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.startsWith("0")) return `62${digits.slice(1)}`;
  if (digits.startsWith("8")) return `62${digits}`;
  return digits;
}

/** Bangun link wa.me dengan pesan otomatis (sudah di-encode). */
export function buildWhatsAppLink(phone: string, message?: string): string {
  const number = normalizeWhatsAppNumber(phone);
  if (!number) throw new Error("Nomor WhatsApp kosong atau tidak valid");
  const base = `https://wa.me/${number}`;
  const text = message?.trim();
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export interface TripMessageInput {
  brandName: string;
  tripTitle: string;
  dateLabel: string;
  status: AvailabilityStatus;
}

/** Pesan otomatis sesuai status trip: daftar biasa, waiting list, atau tanya jadwal berikutnya. */
export function buildTripMessage({ brandName, tripTitle, dateLabel, status }: TripMessageInput): string {
  switch (status) {
    case "full":
      return `Halo ${brandName}! Trip *${tripTitle}* (${dateLabel}) udah full ya? Aku mau masuk waiting list dong. Kabarin kalau ada seat kosong ya!`;
    case "finished":
      return `Halo ${brandName}! Aku tertarik sama trip *${tripTitle}*. Kapan jadwal berikutnya dibuka?`;
    default:
      return `Halo ${brandName}! Aku mau daftar open trip *${tripTitle}* tanggal ${dateLabel}. Masih ada seat? Info cara bayarnya dong.`;
  }
}

export function getTripCtaLabel(status: AvailabilityStatus): string {
  if (status === "full") return "Masuk waiting list";
  if (status === "finished") return "Tanya jadwal berikutnya";
  return "Daftar via WhatsApp";
}
