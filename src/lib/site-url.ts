/**
 * URL publik situs untuk metadata & Open Graph. Tidak wajib di-set:
 * - NEXT_PUBLIC_SITE_URL  (opsional, mis. domain custom)
 * - VERCEL_PROJECT_PRODUCTION_URL (otomatis tersedia di Vercel)
 * - fallback localhost saat development
 */
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}
