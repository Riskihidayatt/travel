/**
 * Util tanggal murni. Semua tanggal trip disimpan sebagai string ISO `YYYY-MM-DD`
 * (tanpa jam) supaya aman dari perbedaan zona waktu server (UTC) dan browser.
 */

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

export function isIsoDate(value: string): boolean {
  return ISO_DATE.test(value) && !Number.isNaN(Date.parse(`${value}T00:00:00Z`));
}

/** Tanggal "hari ini" dalam zona waktu tertentu (default WIB), format `YYYY-MM-DD`. */
export function todayISO(now: Date = new Date(), timeZone = "Asia/Jakarta"): string {
  // en-CA menghasilkan format YYYY-MM-DD
  return new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

export function toUtcDate(iso: string): Date {
  return new Date(`${iso}T00:00:00Z`);
}

export function addDays(iso: string, days: number): string {
  const date = toUtcDate(iso);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

/** Selisih hari kalender `to - from`. */
export function diffInDays(from: string, to: string): number {
  return Math.round((toUtcDate(to).getTime() - toUtcDate(from).getTime()) / 86_400_000);
}
