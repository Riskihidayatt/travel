import { toUtcDate } from "./dates";

const numberFormatter = new Intl.NumberFormat("id-ID", { maximumFractionDigits: 0 });

/**
 * Format angka ke Rupiah, contoh: 1250000 -> "Rp1.250.000".
 * Opsi `compact` -> "Rp1,25 jt" / "Rp850 rb" (untuk chip & badge yang sempit).
 */
export function formatRupiah(value: number, options: { compact?: boolean } = {}): string {
  if (!Number.isFinite(value)) return "Rp0";
  const rounded = Math.round(value);
  const sign = rounded < 0 ? "-" : "";
  const abs = Math.abs(rounded);

  if (options.compact) {
    if (abs >= 1_000_000) {
      const juta = new Intl.NumberFormat("id-ID", { maximumFractionDigits: 2 }).format(abs / 1_000_000);
      return `${sign}Rp${juta} jt`;
    }
    if (abs >= 1_000) {
      const ribu = new Intl.NumberFormat("id-ID", { maximumFractionDigits: 1 }).format(abs / 1_000);
      return `${sign}Rp${ribu} rb`;
    }
  }

  return `${sign}Rp${numberFormatter.format(abs)}`;
}

/** Format angka biasa dengan pemisah ribuan Indonesia: 12500 -> "12.500". */
export function formatNumber(value: number, decimals = 0): string {
  return new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

/** "2026-11-07" -> "7 Nov 2026" (atau tanpa tahun). */
export function formatDate(iso: string, options: { withYear?: boolean } = {}): string {
  const d = toUtcDate(iso);
  const base = `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]}`;
  return options.withYear === false ? base : `${base} ${d.getUTCFullYear()}`;
}

/**
 * Rentang tanggal ringkas:
 * - bulan sama  : "7–9 Nov 2026"
 * - beda bulan  : "30 Nov – 2 Des 2026"
 * - beda tahun  : "30 Des 2026 – 2 Jan 2027"
 * - satu hari   : "7 Nov 2026"
 */
export function formatDateRange(startIso: string, endIso: string, options: { withYear?: boolean } = {}): string {
  const withYear = options.withYear !== false;
  const start = toUtcDate(startIso);
  const end = toUtcDate(endIso);
  const sameYear = start.getUTCFullYear() === end.getUTCFullYear();
  const sameMonth = sameYear && start.getUTCMonth() === end.getUTCMonth();
  const year = withYear ? ` ${end.getUTCFullYear()}` : "";

  if (startIso === endIso) return formatDate(startIso, { withYear });
  if (sameMonth) return `${start.getUTCDate()}–${end.getUTCDate()} ${MONTHS[end.getUTCMonth()]}${year}`;
  if (sameYear) return `${formatDate(startIso, { withYear: false })} – ${formatDate(endIso, { withYear: false })}${year}`;
  return `${formatDate(startIso)} – ${formatDate(endIso)}`;
}
